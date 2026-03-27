import { ORPCError } from "@orpc/server";
import { z } from "zod";

import { env } from "@irazz.lol/env/server";
import { stripe } from "@irazz.lol/stripe";

import { protectedProcedure } from "../..";
import { ensureStripeCustomer } from "./shared";

const STRIPE_MANAGED_PAYMENTS_API_VERSION = "2026-03-04.preview";

export const stripeCheckoutRouter = {
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        priceId: z.string().min(1),
      }),
    )
    .handler(async ({ context, input }) => {
      const customerId = await ensureStripeCustomer({
        userId: context.session.user.id,
        email: context.session.user.email,
        name: context.session.user.name,
        stripeCustomerId: context.session.user.stripe_customer_id,
      });

      const price = await stripe.prices.retrieve(input.priceId, {
        expand: ["product"],
      });

      if (!price.active || !price.recurring) {
        throw new ORPCError("BAD_REQUEST", {
          message: "This price is not a recurring subscription price.",
        });
      }

      const productId = typeof price.product === "string" ? price.product : price.product.id;
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "all",
        expand: ["data.items.data.price"],
        limit: 100,
      });

      const hasMatchingSubscription = subscriptions.data.some((subscription) => {
        if (subscription.status === "canceled" || subscription.status === "incomplete_expired") {
          return false;
        }

        return subscription.items.data.some((item) => {
          const itemProductId =
            typeof item.price.product === "string" ? item.price.product : item.price.product.id;

          return item.price.id === input.priceId || itemProductId === productId;
        });
      });

      if (hasMatchingSubscription) {
        throw new ORPCError("CONFLICT", {
          message: "You already have a subscription for this product.",
        });
      }

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customerId,
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        managed_payments: {
          enabled: true,
        },
        success_url: `${env.BETTER_AUTH_URL}/dashboard?checkout=success`,
        cancel_url: `${env.BETTER_AUTH_URL}/dashboard?checkout=canceled`,
        allow_promotion_codes: true,
        metadata: {
          userId: context.session.user.id,
          productId,
          priceId: input.priceId,
        },
        subscription_data: {
          metadata: {
            userId: context.session.user.id,
            productId,
            priceId: input.priceId,
          },
        },
      }, {
        apiVersion: STRIPE_MANAGED_PAYMENTS_API_VERSION,
      });

      if (!session.url) {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "Stripe did not return a checkout URL.",
        });
      }

      return {
        url: session.url,
      };
    }),
};
