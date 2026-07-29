// POST /api/entrega/pay
//
// Creates a Stripe Checkout Session for a delivery's pending balance and
// returns its hosted-checkout URL. The couple is redirected there by the
// client (same pattern as /api/reserva/pay).
//
// Gating: the delivery must exist, be active (not archived), carry a pending
// balance (balanceDueCents > 0) that hasn't been paid yet. Stripe must be
// configured.
//
// This endpoint does NOT mark anything paid. Only the webhook
// (/api/webhooks/stripe) does, after Stripe confirms the charge.

export const prerender = false;

import type { APIRoute } from 'astro';
import { getDeliveryBySlug } from '~/lib/deliveries';
import { createBalanceCheckout } from '~/lib/payments/stripe';
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

  const delivery = await getDeliveryBySlug(slug);
  if (!delivery || delivery.archived) {
    return json({ error: 'not_found' }, 404);
  }
  if (delivery.balancePaidAt) {
    return json({ error: 'already_paid' }, 409);
  }
  if (!delivery.balanceDueCents || delivery.balanceDueCents <= 0) {
    return json({ error: 'no_balance_amount' }, 409);
  }

  // Build the absolute origin from the configured site URL (preferred) or
  // the request URL as a fallback — Stripe needs absolute return URLs.
  const origin = (process.env.PUBLIC_SITE_URL ?? `${url.protocol}//${url.host}`).replace(/\/$/, '');

  try {
    const checkoutUrl = await createBalanceCheckout({
      delivery,
      origin,
      lang: delivery.preferredLanguage,
      amountCents: delivery.balanceDueCents,
    });
    return json({ ok: true, url: checkoutUrl }, 200);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[entrega.pay] checkout creation failed', err);
    return json({ error: 'checkout_failed' }, 502);
  }
};
