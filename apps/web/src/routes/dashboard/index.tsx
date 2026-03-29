import { Button } from "@irazz.lol/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@irazz.lol/ui/components/card";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  CreditCardIcon,
  ExternalLinkIcon,
  LoaderCircleIcon,
  ReceiptTextIcon,
  RefreshCcwIcon,
} from "lucide-react";
import { toast } from "sonner";

import { getBillingData } from "@/functions/get-billing-data";
import { client } from "@/utils/orpc";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/dashboard/")({
  loader: () => getBillingData(),
  component: RouteComponent,
});

const ACTIVE_SUBSCRIPTION_STATUSES = new Set(["active", "trialing", "past_due", "incomplete"]);

function RouteComponent() {
  const { products, subscriptions, invoices } = Route.useLoaderData();

  const checkoutMutation = useMutation({
    mutationFn: ({ priceId }: { priceId: string }) =>
      client.stripe.checkout.createCheckoutSession({
        priceId,
      }),
    onSuccess: ({ url }) => {
      window.location.assign(url);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const portalMutation = useMutation({
    mutationFn: () => client.stripe.portal.createPortalSession(),
    onSuccess: ({ url }) => {
      window.location.assign(url);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const activeSubscriptions = subscriptions.filter((subscription) =>
    ACTIVE_SUBSCRIPTION_STATUSES.has(subscription.status),
  );
  const activeProductIds = new Set(
    activeSubscriptions.flatMap((subscription) => subscription.items.map((item) => item.productId)),
  );
  const user = authClient.useSession().data?.user

  return (
    <div className="flex-1 p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Card className="">
          <CardHeader className="items-center flex justify-between">
            <CardTitle className="font-mono text-xl">Hi {user?.name?.split(" ")[0]}</CardTitle>
            <CardAction>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  <RefreshCcwIcon />
                  Refresh
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    portalMutation.mutate();
                  }}
                  disabled={portalMutation.isPending}
                >
                  {portalMutation.isPending ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    <CreditCardIcon />
                  )}
                  Manage billing
                </Button>
              </div>
            </CardAction>
          </CardHeader>
        </Card>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Available plans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {products.length > 0 ? (
                products.map((product) => {
                  const isCurrent = activeProductIds.has(product.productId);
                  const isSubmitting =
                    checkoutMutation.isPending &&
                    checkoutMutation.variables?.priceId === product.priceId;

                  return (
                    <div
                      key={product.priceId}
                      className="grid gap-3 border border-border/70 p-4 md:grid-cols-[1fr_auto]"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-medium">{product.productName}</h3>
                          <span className="border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {formatInterval(product.interval, product.intervalCount)}
                          </span>
                        </div>
                        {product.productDescription ? (
                          <p className="text-xs text-muted-foreground">
                            {product.productDescription}
                          </p>
                        ) : null}
                        <p className="font-mono text-lg">
                          {formatCurrency(product.unitAmount, product.currency)}
                        </p>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button
                          type="button"
                          onClick={() => {
                            checkoutMutation.mutate({ priceId: product.priceId });
                          }}
                          disabled={isCurrent || isSubmitting}
                        >
                          {isSubmitting ? (
                            <LoaderCircleIcon className="animate-spin" />
                          ) : isCurrent ? (
                            <CreditCardIcon />
                          ) : (
                            <ExternalLinkIcon />
                          )}
                          {isCurrent ? "Current plan" : "Subscribe"}
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyState label="No plans are available for you" />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle>Current subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-px p-0 -mt-4 -mb-4 bg-border">
              {subscriptions.length > 0 ? (
                subscriptions.map((subscription) => (
                  <div key={subscription.id} className="space-y-2 p-4 bg-card">
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                      <h3 className="font-medium">
                        {subscription.items.map((item) => item.productName).join(", ")}
                      </h3>
                      <span className="relative -right-4 -top-4 border-b border-l px-2 py-0.5 font-mono text-[10px] bg-foregrond bg-background text-muted-foreground">
                        {subscription.status.replaceAll("_", " ")[0].toUpperCase() + subscription.status.replaceAll("_", " ").slice(1)}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>
                        Renews on{" "}
                        {subscription.currentPeriodEnd
                          ? formatDate(subscription.currentPeriodEnd)
                          : "unknown"}
                      </p>
                      {subscription.cancelAtPeriodEnd ? (
                        <p>Cancels at period end</p>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState label="No subscriptions yet" />
              )}
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Need to update a card or cancel? Use the billing portal
              </p>
            </CardFooter>
          </Card>
        </section>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-px p-0 -mt-4 -mb-4 bg-border">
            {invoices.length > 0 ? (
              invoices.map((invoice) => {
                const invoiceUrl = invoice.hostedInvoiceUrl ?? invoice.invoicePdf;
                const canOpen = Boolean(invoiceUrl);

                if (!canOpen) {
                  return (
                    <div
                      key={invoice.id}
                      className="grid gap-3 bg-card p-4 text-left md:grid-cols-[1fr_auto]"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{invoice.number ?? invoice.id}</h3>
                          <span className="border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {invoice?.status
                              ? invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)
                              : "Draft"}
                          </span>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>Created {formatDate(invoice.createdAt)}</p>
                          <p>Total {formatCurrency(invoice.total, invoice.currency)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end text-xs text-muted-foreground">
                        Draft invoice, no public link yet
                      </div>
                    </div>
                  );
                }

                const url = invoiceUrl ?? "";

                return (
                  <button
                    key={invoice.id}
                    type="button"
                    className="grid w-full gap-3 bg-card p-4 text-left transition-colors hover:bg-muted/30 md:grid-cols-[1fr_auto]"
                    onClick={() => {
                      window.location.assign(url);
                    }}
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium">{invoice.number ?? invoice.id}</h3>
                        <span className="border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                          {invoice?.status
                            ? invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)
                            : "Draft"}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>Created {formatDate(invoice.createdAt)}</p>
                        <p>Total {formatCurrency(invoice.total, invoice.currency)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <ReceiptTextIcon className="size-4" />
                        {invoice.hostedInvoiceUrl ? "Open invoice" : "Open PDF"}
                      </span>
                      <ExternalLinkIcon className="size-4" />
                    </div>
                  </button>
                );
              })
            ) : (
              <EmptyState label="No invoices yet." />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return <div className="border border-dashed border-border/70 p-6 text-sm text-muted-foreground">{label}</div>;
}

function formatCurrency(amount: number | null, currency: string) {
  if (amount === null) {
    return "Custom pricing";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(timestamp * 1000));
}

function formatInterval(interval: string | null, intervalCount: number | null) {
  if (!interval) {
    return "custom";
  }

  if (!intervalCount || intervalCount === 1) {
    return `every ${interval}`;
  }

  return `every ${intervalCount} ${interval}s`;
}
