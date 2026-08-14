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
import { getDeliveryById, setDeliveryBalancePaid } from '~/lib/deliveries';
import { getQuoteById, markSessionDepositPaid } from '~/lib/quotes';
import { sendNotification, sendTelegramNotification } from '~/lib/email';
import { formatEuros } from '~/lib/payments/money';

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
      id?: string;
      amount_total?: number | null;
      payment_status?: string;
      client_reference_id?: string | null;
      metadata?: { bookingId?: string; deliveryId?: string; quoteId?: string; slug?: string; token?: string; kind?: string; totalCents?: string } | null;
    };

    const paid = session.payment_status === 'paid' || session.payment_status === undefined;

    // Couple-session deposit: lightweight — record it on the quote + ping Eric.
    // No booking, no contract, no auto-invoice.
    if (session.metadata?.kind === 'session_deposit' && paid) {
      const quoteId = Number(session.metadata?.quoteId || session.client_reference_id || 0);
      const quote = quoteId ? await getQuoteById(quoteId) : null;
      if (quote && !quote.sessionDepositPaidAt) {
        const depositCents = typeof session.amount_total === 'number' ? session.amount_total : 0;
        const totalCents = Number(session.metadata?.totalCents ?? 0);
        const recorded = await markSessionDepositPaid(quote.id, {
          depositCents,
          totalCents,
          stripeId: session.id ?? '',
        });
        if (recorded) {
          const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const amount = depositCents ? formatEuros(depositCents) : '';
          try {
            await sendTelegramNotification(
              `📸 <b>Reserva de sessió pagada</b>\n` +
                `${esc(quote.coupleName)}` +
                (amount ? ` — dipòsit <b>${esc(amount)}</b>` : '') +
                (totalCents ? ` (total ${esc(formatEuros(totalCents))})` : '') +
                `\nPressupost: /admin/${quote.id}`,
            );
          } catch (err) {
            console.error('[stripe-webhook] session-deposit telegram failed (non-fatal)', err);
          }
          try {
            await sendNotification({
              subject: `📸 ${quote.coupleName} han reservat la sessió (dipòsit ${amount})`,
              html:
                `<p><strong>${esc(quote.coupleName)}</strong> han pagat el dipòsit del 50% de la seva sessió de parella.</p>` +
                (amount ? `<p>Dipòsit: <strong>${esc(amount)}</strong>${totalCents ? ` · Total: ${esc(formatEuros(totalCents))}` : ''}</p>` : '') +
                `<p><a href="${(process.env.PUBLIC_SITE_URL ?? '')}/admin/${quote.id}">Revisa-ho a l'admin →</a></p>`,
            });
          } catch (err) {
            console.error('[stripe-webhook] session-deposit email failed (non-fatal)', err);
          }
          console.log('[stripe-webhook] session deposit marked paid for quote', quote.id);
        }
      }
    }

    // Delivery pending-balance sessions: just record the payment + ping
    // Telegram. No auto-invoice — Eric issues the FacturaDirecta invoice
    // manually from the admin when he wants one.
    if (session.metadata?.kind === 'delivery_balance' && paid) {
      const deliveryId = session.metadata?.deliveryId || session.client_reference_id || '';
      const delivery = deliveryId ? await getDeliveryById(deliveryId) : null;
      if (delivery && !delivery.balancePaidAt) {
        await setDeliveryBalancePaid(delivery.id);
        const amount = delivery.balanceDueCents ? formatEuros(delivery.balanceDueCents) : '';
        const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        try {
          await sendTelegramNotification(
            `💶 <b>Pagament pendent rebut</b>\n` +
              `${esc(delivery.coupleName1)} & ${esc(delivery.coupleName2)}` +
              (amount ? ` — <b>${esc(amount)}</b>` : '') +
              `\nEntrega: /admin/deliveries/${delivery.id}`,
          );
        } catch (err) {
          console.error('[stripe-webhook] delivery-balance telegram failed (non-fatal)', err);
        }
        // eslint-disable-next-line no-console
        console.log('[stripe-webhook] delivery balance marked paid', delivery.id);
      }
    }

    // Only act on our reserva-deposit sessions that actually completed.
    const isDeposit = session.metadata?.kind === 'reserva_deposit';
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
