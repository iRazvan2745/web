import { ORPCError } from "@orpc/server";

import { env } from "@irazz.lol/env/server";
import { stripe } from "@irazz.lol/stripe";

import { protectedProcedure } from "../..";
import { ensureStripeCustomer } from "./shared";

export const stripePortalRouter = {
  createPortalSession: protectedProcedure.handler(async ({ context }) => {
    const customerId = await ensureStripeCustomer({
      userId: context.session.user.id,
      email: context.session.user.email,
      name: context.session.user.name,
      stripeCustomerId: context.session.user.stripe_customer_id,
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${env.BETTER_AUTH_URL}/dashboard`,
    });

    if (!session.url) {
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Stripe did not return a billing portal URL.",
      });
    }

    return {
      url: session.url,
    };
  }),
};
