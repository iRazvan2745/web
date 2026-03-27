import { stripe } from "@irazz.lol/stripe";
import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/middleware/auth";

export const getBillingData = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.session?.user;

    if (!user) {
      return {
        products: [],
        subscriptions: [],
        invoices: [],
      };
    }

    const customerId = user.stripe_customer_id;

    const [prices, subscriptions, invoices] = await Promise.all([
      stripe.prices.list({
        active: true,
        type: "recurring",
        expand: ["data.product"],
        limit: 100,
      }),
      customerId
        ? stripe.subscriptions.list({
            customer: customerId,
            status: "all",
            expand: ["data.items.data.price"],
            limit: 24,
          })
        : Promise.resolve({ data: [] }),
      customerId
        ? stripe.invoices.list({
            customer: customerId,
            limit: 24,
          })
        : Promise.resolve({ data: [] }),
    ]);

    const products = prices.data
      .filter((price) => {
        if (!price.active || !price.recurring) {
          return false;
        }

        if (typeof price.product === "string") {
          return false;
        }

        if (price.product.deleted || !price.product.active) {
          return false;
        }

        return price.product.metadata["irazz.lol"] === "true";
      })
      .map((price) => ({
        priceId: price.id,
        productId: typeof price.product === "string" ? price.product : price.product.id,
        productName:
          typeof price.product === "string" || price.product.deleted
            ? "Untitled product"
            : price.product.name,
        productDescription:
          typeof price.product === "string" || price.product.deleted
            ? null
            : price.product.description,
        currency: price.currency,
        unitAmount: price.unit_amount,
        interval: price.recurring?.interval ?? null,
        intervalCount: price.recurring?.interval_count ?? null,
        trialPeriodDays: price.recurring?.trial_period_days ?? null,
      }))
      .sort((a, b) => {
        const byName = a.productName.localeCompare(b.productName);

        if (byName !== 0) {
          return byName;
        }

        return (a.unitAmount ?? 0) - (b.unitAmount ?? 0);
      });

    const productIds = Array.from(
      new Set(
        subscriptions.data.flatMap((subscription) =>
          subscription.items.data
            .map((item) => item.price.product)
            .filter((product): product is string => typeof product === "string"),
        ),
      ),
    );

    const subscriptionProducts = await Promise.all(
      productIds.map(async (productId) => {
        const product = await stripe.products.retrieve(productId);

        return [productId, product.deleted ? "Untitled product" : product.name] as const;
      }),
    );

    const productNames = new Map(subscriptionProducts);

    return {
      products,
      subscriptions: subscriptions.data.map((subscription) => ({
        id: subscription.id,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        canceledAt: subscription.canceled_at,
        currentPeriodStart: subscription.items.data[0]?.current_period_start ?? null,
        currentPeriodEnd: subscription.items.data[0]?.current_period_end ?? null,
        items: subscription.items.data.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          priceId: item.price.id,
          productId:
            typeof item.price.product === "string" ? item.price.product : item.price.product.id,
          productName:
            typeof item.price.product === "string"
              ? productNames.get(item.price.product) ?? "Untitled product"
              : item.price.product.deleted
                ? "Untitled product"
                : item.price.product.name,
          currency: item.price.currency,
          unitAmount: item.price.unit_amount,
          interval: item.price.recurring?.interval ?? null,
          intervalCount: item.price.recurring?.interval_count ?? null,
        })),
      })),
      invoices: invoices.data.map((invoice) => ({
        id: invoice.id,
        status: invoice.status,
        currency: invoice.currency,
        number: invoice.number,
        createdAt: invoice.created,
        dueDate: invoice.due_date,
        paidAt: invoice.status_transitions.paid_at,
        subtotal: invoice.subtotal,
        total: invoice.total,
        amountPaid: invoice.amount_paid,
        amountRemaining: invoice.amount_remaining,
        hostedInvoiceUrl: invoice.hosted_invoice_url,
        invoicePdf: invoice.invoice_pdf,
      })),
    };
  });
