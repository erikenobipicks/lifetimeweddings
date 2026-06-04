// POST /api/webhooks/stripe
//
// Stripe webhook receiver. The ONLY place that marks a reserva deposit as
// paid from the online-card flow. Mirrors the admin "confirm offline" /
// "mark deposit received" pipeline:
//
//   markDepositPaid → issueDepositInvoiceForBooking → sendContratoInvite
//
// All three are idempotent / fail-soft, so Stripe re-delivering an event
// (which it does on any non-2xx, and sometimes just because) won't
// double-charge state or double-invoice.
//
// Security: the raw body is verified against STRIPE_WEBHOOK_SECRET. An
// unverified or unconfigured webhook is rejected — we never trust the
// payload otherwise.

export const prerender = false;

import type { APIRoute } from 'astro';
import { stripe, getWebhookSecret } from '~/lib/payments/stripe';
import {
  getBookingById,
  getBookingBySlug,
  markDepositPaid,
} from '~/lib/bookings/repository';
import { issueDepositInvoiceForBooking } from '~/lib/bookings/invoicing';
import { sendContratoInvite } from '~/lib/bookings/emails';
import { materialiseSchedulesForBooking } from '~/lib/bookings/sequences';

export const POST: APIRoute = async ({ request }) => {
  const webhookSecret = getWebhookSecret();
  if (!stripe || !webhookSecret) {
    return new Response('Stripe webhook not configured', { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  // Raw body is required for signature verification — read it as text.
  const rawBody = await request.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[stripe-webhook] signature verification failed', err);
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as {
      payment_status?: string;
      client_reference_id?: string | null;
      metadata?: { bookingId?: string; slug?: string; kind?: string } | null;
    };

    // Only act on our reserva-deposit sessions that actually completed.
    const isDeposit = session.metadata?.kind === 'reserva_deposit';
    const paid = session.payment_status === 'paid' || session.payment_status === undefined;
    if (isDeposit && paid) {
      const bookingId = session.metadata?.bookingId || session.client_reference_id || '';
      const slug = session.metadata?.slug || '';

      const booking = bookingId
        ? await getBookingById(bookingId)
        : slug
          ? await getBookingBySlug(slug)
          : null;

      if (booking && !booking.depositPaidAt) {
        await markDepositPaid(booking.id);
        // Idempotent (guarded by facturadirectaInvoiceId) + fail-soft.
        await issueDepositInvoiceForBooking(booking.id);
        const fresh = await getBookingById(booking.id);
        if (fresh) await sendContratoInvite(fresh);
        // Materialise follow-up emails (deposit-paid trigger). Idempotent.
        try {
          await materialiseSchedulesForBooking(booking.id);
        } catch (err) {
          console.error('[stripe-webhook] materialise schedules failed (non-fatal)', err);
        }
        // eslint-disable-next-line no-console
        console.log('[stripe-webhook] deposit marked paid for booking', booking.id);
      }
    }
  }

  // Always 200 the events we don't care about so Stripe stops retrying.
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
