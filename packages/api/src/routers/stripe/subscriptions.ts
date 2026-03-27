import { protectedProcedure } from "../..";
import { stripe } from "@irazz.lol/stripe";

export const stripeSubscriptionsRouter = {
  getSubscriptions: protectedProcedure.handler(async ({ context }) => {
    const customerId = context.session.user.stripe_customer_id;

    if (!customerId) {
      return [];
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      expand: ["data.items.data.price"],
      limit: 24,
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

    const products = await Promise.all(
      productIds.map(async (productId) => {
        const product = await stripe.products.retrieve(productId);

        return [productId, product.deleted ? "Untitled product" : product.name] as const;
      }),
    );

    const productNames = new Map(products);

    return subscriptions.data.map((subscription) => ({
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
        productId: typeof item.price.product === "string" ? item.price.product : item.price.product.id,
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
    }));
  }),
};
