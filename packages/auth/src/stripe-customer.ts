import { db } from "@irazz.lol/db";
import * as authSchema from "@irazz.lol/db/schema/auth";
import { stripe } from "@irazz.lol/stripe";
import { eq } from "drizzle-orm";

export async function ensureStripeCustomer({
  userId,
  email,
  name,
  stripeCustomerId,
}: {
  userId: string;
  email: string;
  name?: string | null;
  stripeCustomerId?: string | null;
}) {
  if (stripeCustomerId) {
    return stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email,
    name: name ?? undefined,
    metadata: {
      userId,
    },
  });

  await db
    .update(authSchema.user)
    .set({ stripe_customer_id: customer.id })
    .where(eq(authSchema.user.id, userId));

  return customer.id;
}
