// Stripe client + Checkout helpers for the reserva deposit.
//
// Gated on STRIPE_SECRET_KEY like every other external integration in this
// repo (Resend, Turnstile, FacturaDirecta): absent key → `stripe` is null
// and callers degrade gracefully (the card button simply isn't offered).
//
// We only ever charge the deposit (booking.depositCents) here — never the
// full balance. The webhook (src/pages/api/webhooks/stripe.ts) is what
// actually marks the deposit paid, so a Checkout Session being created is
// not itself proof of payment.

import Stripe from 'stripe';
import type { Booking } from '~/lib/bookings/types';

const secretKey = (process.env.STRIPE_SECRET_KEY ?? '').trim();

// No explicit apiVersion — the installed SDK pins its own default, and
// pinning a literal here would couple the build to a version string that
// drifts every SDK bump.
export const stripe: Stripe | null = secretKey ? new Stripe(secretKey) : null;

export function getWebhookSecret(): string | null {
  return (process.env.STRIPE_WEBHOOK_SECRET ?? '').trim() || null;
}

interface CheckoutInput {
  booking: Booking;
  /** Absolute origin, e.g. https://www.lifetime.photo — used to build the
   *  success/cancel return URLs. */
  origin: string;
  lang: 'ca' | 'es' | 'en';
}

const PRODUCT_NAME: Record<'ca' | 'es' | 'en', (n: string) => string> = {
  ca: (n) => `Dipòsit de reserva · ${n}`,
  es: (n) => `Depósito de reserva · ${n}`,
  en: (n) => `Booking deposit · ${n}`,
};

const STRIPE_LOCALE: Record<'ca' | 'es' | 'en', Stripe.Checkout.SessionCreateParams.Locale> = {
  ca: 'auto', // Stripe Checkout has no Catalan locale; 'auto' → browser/ES.
  es: 'es',
  en: 'en',
};

/**
 * Create a Stripe Checkout Session for the booking's deposit. Returns the
 * hosted-checkout URL the couple is redirected to. Throws if Stripe isn't
 * configured (callers must check isStripeEnabled() first).
 */
export async function createDepositCheckout({ booking, origin, lang }: CheckoutInput): Promise<string> {
  if (!stripe) throw new Error('Stripe not configured');

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: STRIPE_LOCALE[lang],
    // Idempotent at the booking level — re-creating a session for the same
    // booking is fine; only one will be paid and the webhook is idempotent.
    client_reference_id: booking.id,
    metadata: { bookingId: booking.id, slug: booking.slug, kind: 'reserva_deposit' },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: booking.depositCents,
          product_data: {
            name: PRODUCT_NAME[lang](`${booking.coupleName1} & ${booking.coupleName2}`),
            description: booking.packName,
          },
        },
      },
    ],
    success_url: `${origin}/reserva/${booking.slug}?paid=success`,
    cancel_url: `${origin}/reserva/${booking.slug}?paid=cancel`,
  });

  if (!session.url) throw new Error('Stripe session created without a URL');
  return session.url;
}
