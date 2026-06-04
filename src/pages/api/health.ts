// Simple health check endpoint for Railway's healthcheck probe.
// Also surfaces the deposit-payment configuration state so Eric can verify
// from a phone in 5 seconds whether Stripe is actually picked up by the
// deploy (env vars set in Railway sometimes look set but require a redeploy
// to be visible to the running process). No secret values are returned —
// only booleans + whether the IBAN is the built-in placeholder.

import type { APIRoute } from 'astro';
import {
  isStripeEnabled,
  isStripeTestMode,
  getBankTransferDetails,
} from '~/lib/payments/config';

export const GET: APIRoute = () => {
  const transfer = getBankTransferDetails();
  return new Response(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      payments: {
        stripeEnabled: isStripeEnabled(),
        stripeTestMode: isStripeTestMode(),
        bankTransferConfigured: !transfer.isPlaceholder,
      },
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    },
  );
};
