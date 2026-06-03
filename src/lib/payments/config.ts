// Deposit-payment configuration. Two channels are offered to the couple
// once they've filled their /reserva data:
//
//   1. Bank transfer — always available. Details come from env so Eric can
//      set the real IBAN in Railway without a code change. Falls back to a
//      clearly-marked placeholder so a misconfigured deploy is obvious
//      rather than silently wrong.
//   2. Card (Stripe) — only offered when STRIPE_SECRET_KEY is configured.
//      See src/lib/payments/stripe.ts.
//
// Both are optional at the infra level: the page renders whatever is
// available. Bank transfer with a placeholder IBAN still renders (so the
// flow is visible in dev) but should be filled before going live.

import type { Booking } from '~/lib/bookings/types';

export interface BankTransferDetails {
  beneficiary: string;
  iban: string;
  bank: string | null;
  /** True when the IBAN is still the built-in placeholder — surfaced so the
   *  UI/admin can warn instead of shipping a fake account number. */
  isPlaceholder: boolean;
}

const PLACEHOLDER_IBAN = 'ES00 0000 0000 0000 0000 0000';

export function getBankTransferDetails(): BankTransferDetails {
  const iban = (process.env.BANK_TRANSFER_IBAN ?? '').trim();
  return {
    beneficiary: (process.env.BANK_TRANSFER_BENEFICIARY ?? 'Objectiu SCP').trim(),
    iban: iban || PLACEHOLDER_IBAN,
    bank: (process.env.BANK_TRANSFER_BANK ?? 'BBVA').trim() || null,
    isPlaceholder: iban.length === 0,
  };
}

/** Human-readable transfer reference so Eric can match an incoming wire to
 *  a booking. Kept short and ASCII-safe — bank concept fields are picky. */
export function transferReferenceFor(booking: Pick<Booking, 'coupleName1' | 'coupleName2'>): string {
  const clean = (s: string) => s.replace(/[^\p{L}\p{N} ]/gu, '').trim();
  return `Reserva ${clean(booking.coupleName1)} & ${clean(booking.coupleName2)}`.slice(0, 60);
}

/** Whether Stripe card payments are wired (secret key present). */
export function isStripeEnabled(): boolean {
  return Boolean((process.env.STRIPE_SECRET_KEY ?? '').trim());
}

/** True when the configured Stripe key is a TEST key (`sk_test_…`). Lets
 *  admin views warn loudly so we never quietly serve test checkouts in
 *  what looks like a live deployment. */
export function isStripeTestMode(): boolean {
  const key = (process.env.STRIPE_SECRET_KEY ?? '').trim();
  return key.startsWith('sk_test_');
}
