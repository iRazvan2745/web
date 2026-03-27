import { stripeCatalogRouter } from "./catalog";
import { stripeCheckoutRouter } from "./checkout";
import { stripeInvoicesRouter } from "./invoices";
import { stripePortalRouter } from "./portal";
import { stripeSubscriptionsRouter } from "./subscriptions";

export const stripeRouter = {
  catalog: stripeCatalogRouter,
  checkout: stripeCheckoutRouter,
  invoices: stripeInvoicesRouter,
  portal: stripePortalRouter,
  subscriptions: stripeSubscriptionsRouter,
};
