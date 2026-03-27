import { protectedProcedure } from "../..";
import { stripe } from "@irazz.lol/stripe";

export const stripeInvoicesRouter = {
  getInvoices: protectedProcedure.handler(async ({ context }) => {
    const customerId = context.session.user.stripe_customer_id;

    if (!customerId) {
      return [];
    }

    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 24,
    });

    return invoices.data.map((invoice) => ({
      id: invoice.id,
      status: invoice.status,
      currency: invoice.currency,
      number: invoice.number,
      createdAt: invoice.created,
      dueDate: invoice.due_date,
      paidAt: invoice.status_transitions.paid_at,
      subtotal: invoice.subtotal,
      total: invoice.total,
      amountPaid: invoice.amount_paid,
      amountRemaining: invoice.amount_remaining,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
    }));
  }),
};
