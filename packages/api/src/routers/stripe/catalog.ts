import { protectedProcedure } from "../..";
import { stripe } from "@irazz.lol/stripe";
import { getProductDescription, getProductName } from "./shared";

export const stripeCatalogRouter = {
  listProducts: protectedProcedure.handler(async () => {
    const prices = await stripe.prices.list({
      active: true,
      type: "recurring",
      expand: ["data.product"],
      limit: 100,
    });

    return prices.data
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

        // Uncomment this check again if the catalog needs to be user-scoped later.
        // return (
        //   price.product.metadata["irazz.lol"] === "true" &&
        //   price.product.metadata.assigned_user === context.session.user.id
        // );
        return price.product.metadata["irazz.lol"] === "true";
      })
      .map((price) => ({
        priceId: price.id,
        productId: typeof price.product === "string" ? price.product : price.product.id,
        productName: getProductName(price.product),
        productDescription: getProductDescription(price.product),
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
  }),
};
