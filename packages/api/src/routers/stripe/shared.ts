export { ensureStripeCustomer } from "@irazz.lol/auth/stripe-customer";
import type Stripe from "stripe";

export function getProductName(
  product: string | Stripe.Product | Stripe.DeletedProduct | null | undefined,
) {
  if (!product || typeof product === "string" || product.deleted) {
    return "Untitled product";
  }

  return product.name;
}

export function getProductDescription(
  product: string | Stripe.Product | Stripe.DeletedProduct | null | undefined,
) {
  if (!product || typeof product === "string" || product.deleted) {
    return null;
  }

  return product.description;
}
