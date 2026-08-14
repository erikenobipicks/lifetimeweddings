// POST /api/quotes/<token>/session-pay
//
// Behind the "Reservar con depósito (50%)" button on a session-mode
// /p/<token> proposal. Resolves the couple's selection server-side (so the
// amount can't be tampered with), charges 50% of the total via Stripe
// Checkout, and returns the hosted-checkout URL. Records the selection as a
// quote_response so Eric sees what they're reserving.
//
// This endpoint does NOT mark anything paid — only the webhook
// (/api/webhooks/stripe) does, after Stripe confirms the charge. Session
// deposits are lightweight: no booking, no contract, no auto-invoice.

export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getQuoteByToken, createQuoteResponse } from '~/lib/quotes';
import { PACKS, EXTRAS, contextOf } from '~/data/packs';
import { calculateSelectionTotals, sumCustomLines } from '~/lib/pricing';
import { createSessionDepositCheckout } from '~/lib/payments/stripe';
import { isStripeEnabled } from '~/lib/payments/config';
import { createRateLimiter, clientIpFrom } from '~/lib/rate-limit';

const rateLimit = createRateLimiter({ limit: 10, windowMs: 60 * 60 * 1000 });

const schema = z.object({
  packIds: z.array(z.string().min(1).max(60)).max(1).default([]),
  extraIds: z.array(z.string().min(1).max(60)).max(20).default([]),
  optionIndex: z.number().int().min(0).max(50).optional(),
});

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function clientIp(headers: Headers): string {
  const cf = headers.get('cf-connecting-ip');
  if (cf) return cf;
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}

export const POST: APIRoute = async ({ request, params, url }) => {
  if (!rateLimit(clientIpFrom(request.headers))) {
    return json({ error: 'rate_limited' }, 429);
  }
  if (!isStripeEnabled()) {
    return json({ error: 'stripe_disabled' }, 503);
  }

  const token = String(params.token ?? '');
  if (!token) return json({ error: 'no_token' }, 400);

  let body: unknown;
  try { body = await request.json(); }
  catch { return json({ error: 'invalid_json' }, 400); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: 'validation' }, 400);
  const { packIds, extraIds, optionIndex } = parsed.data;

  const quote = await getQuoteByToken(token);
  if (!quote || quote.archived) return json({ error: 'not_found' }, 404);
  if (quote.expiresAt && new Date(quote.expiresAt) < new Date()) {
    return json({ error: 'expired' }, 410);
  }
  if (quote.sessionDepositPaidAt) return json({ error: 'already_paid' }, 409);

  // Resolve the selection server-side. Multi-option accept → resolve from the
  // option; otherwise the posted ids (or the quote's own packs as fallback).
  const chosenOption = optionIndex != null ? quote.options[optionIndex] ?? null : null;
  const srcPackIds = chosenOption ? chosenOption.packIds : (packIds.length ? packIds : quote.packIds);
  const srcExtraIds = chosenOption ? chosenOption.extraIds : extraIds;

  const validPackIds = srcPackIds.filter((id) => PACKS.some((p) => p.id === id));
  const validExtraIds = srcExtraIds.filter((id) => EXTRAS.some((e) => e.id === id));

  if (validPackIds.length === 0) return json({ error: 'empty_selection' }, 400);

  // This endpoint only pays couple-session quotes — the selected packs must
  // all be session-context. Guards against pointing it at a wedding quote.
  const allSession = validPackIds.every((id) => {
    const p = PACKS.find((x) => x.id === id);
    return p && contextOf(p) === 'session';
  });
  if (!allSession) return json({ error: 'not_session' }, 400);

  const customLinesCents = sumCustomLines(chosenOption ? chosenOption.customLines : quote.customLines);
  const totals = calculateSelectionTotals(
    validPackIds,
    validExtraIds,
    quote.adminDiscountCents,
    customLinesCents,
  );
  const depositCents = Math.round(totals.totalCents / 2);
  if (depositCents <= 0) return json({ error: 'no_amount' }, 400);

  // Record what they're reserving so it shows in the admin (fail-soft — a
  // failure here shouldn't block the payment).
  try {
    await createQuoteResponse({
      quoteId: quote.id,
      packIds: validPackIds,
      extraIds: validExtraIds,
      message: `Reserva sessió · dipòsit 50% iniciat${chosenOption ? ` · ${chosenOption.label}` : ''}`,
      totalCents: totals.totalCents,
      customLines: chosenOption ? chosenOption.customLines : quote.customLines,
      optionLabel: chosenOption?.label ?? null,
      ipAddress: clientIp(request.headers),
      userAgent: request.headers.get('user-agent') ?? undefined,
    });
  } catch (err) {
    console.error('[session-pay] recording response failed (non-fatal)', err);
  }

  const origin = (process.env.PUBLIC_SITE_URL ?? `${url.protocol}//${url.host}`).replace(/\/$/, '');

  try {
    const checkoutUrl = await createSessionDepositCheckout({
      quote: { id: quote.id, token: quote.token, coupleName: quote.coupleName },
      depositCents,
      totalCents: totals.totalCents,
      origin,
      lang: quote.preferredLanguage,
    });
    return json({ ok: true, url: checkoutUrl }, 200);
  } catch (err) {
    console.error('[session-pay] checkout creation failed', err);
    return json({ error: 'checkout_failed' }, 502);
  }
};
