import { StripeWebhookError, verifyStripeWebhook } from "@irazz.lol/stripe";
import { createFileRoute } from "@tanstack/react-router";

async function handle({ request }: { request: Request }) {
  const body = await request.text();

  try {
    const event = verifyStripeWebhook({
      body,
      signature: request.headers.get("stripe-signature"),
    });

    switch (event.type) {
      case "checkout.session.completed":
      case "invoice.payment_succeeded":
        console.info("stripe webhook received", {
          id: event.id,
          type: event.type,
        });
        break;
      default:
        console.info("stripe webhook ignored", {
          id: event.id,
          type: event.type,
        });
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    if (error instanceof StripeWebhookError) {
      return new Response(error.message, { status: 400 });
    }

    if (error instanceof Error) {
      console.error("stripe webhook verification failed", error);
      return new Response(error.message, { status: 400 });
    }

    return new Response("Invalid webhook payload", { status: 400 });
  }
}

export const Route = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      POST: handle,
    },
  },
});
