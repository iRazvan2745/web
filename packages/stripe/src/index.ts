import { env } from "@irazz.lol/env/server";
import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-03-25.dahlia"
});

export class StripeWebhookError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StripeWebhookError";
  }
}

export function verifyStripeWebhook({
  body,
  signature,
}: {
  body: string | Buffer;
  signature: string | null;
}) {
  if (!signature) {
    throw new StripeWebhookError("Missing Stripe-Signature header");
  }

  return stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
}
