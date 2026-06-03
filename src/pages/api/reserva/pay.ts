// POST /api/reserva/pay
//
// Creates a Stripe Checkout Session for a booking's deposit and returns its
// hosted-checkout URL. The couple is redirected there by the client.
//
// Gating: the booking must exist, be active (not archived/expired), have
// its /reserva data already submitted (status form_submitted) — we want the
// couple's billing data captured before they pay — and not have a deposit
// already recorded. Stripe must be configured.
//
// This endpoint does NOT mark anything paid. Only the webhook
// (/api/webhooks/stripe) does, after Stripe confirms the charge.

export const prerender = false;

import type { APIRoute } from 'astro';
import { getBookingBySlug } from '~/lib/bookings/repository';
import { createDepositCheckout } from '~/lib/payments/stripe';
import { isStripeEnabled } from '~/lib/payments/config';

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, url }) => {
  if (!isStripeEnabled()) {
    return json({ error: 'stripe_disabled' }, 503);
  }

  let body: { slug?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const slug = (body.slug ?? '').trim();
  if (!slug) return json({ error: 'missing_slug' }, 400);

  const booking = await getBookingBySlug(slug);
  if (!booking || booking.status === 'archived') {
    return json({ error: 'not_found' }, 404);
  }
  if (booking.expiresAt && booking.expiresAt.getTime() < Date.now()) {
    return json({ error: 'expired' }, 410);
  }
  // Require the data step to be done first so the invoice has billing info.
  if (booking.status !== 'form_submitted') {
    return json({ error: 'data_pending' }, 409);
  }
  if (booking.depositPaidAt) {
    return json({ error: 'already_paid' }, 409);
  }
  if (booking.depositCents <= 0) {
    return json({ error: 'no_deposit_amount' }, 409);
  }

  // Build the absolute origin from the configured site URL (preferred) or
  // the request URL as a fallback — Stripe needs absolute return URLs.
  const origin = (process.env.PUBLIC_SITE_URL ?? `${url.protocol}//${url.host}`).replace(/\/$/, '');

  try {
    const checkoutUrl = await createDepositCheckout({
      booking,
      origin,
      lang: booking.preferredLanguage,
    });
    return json({ ok: true, url: checkoutUrl }, 200);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[reserva.pay] checkout creation failed', err);
    return json({ error: 'checkout_failed' }, 502);
  }
};
