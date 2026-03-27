import { db } from "@irazz.lol/db";
import { eq } from "drizzle-orm";
import * as schema from "@irazz.lol/db/schema/auth";
import { env } from "@irazz.lol/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { stripe } from "@irazz.lol/stripe";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [env.CORS_ORIGIN],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      stripe_customer_id: {
        type: "string",
        input: false,
      },
    }
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if(ctx.path.startsWith("/sign-up")){
        const newSession = ctx.context.newSession;
        if (newSession) {
          console.log("creating customer")
          const customer = await stripe.customers.create({
            name: newSession.user.name,
            email: newSession.user.email,
          })
          console.log("updating db")
          await db
            .update(schema.user)
            .set({ stripe_customer_id: customer.id })
            .where(eq(schema.user.email, newSession.user.email))
        }
      }
    })
  },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  plugins: [tanstackStartCookies()],
});
