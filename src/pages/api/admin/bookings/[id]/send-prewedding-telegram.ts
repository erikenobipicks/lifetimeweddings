// POST /api/admin/bookings/[id]/send-prewedding-telegram
//
// Manual "send the pre-wedding digest to Telegram now" — for when Eric
// wants it without waiting for the automatic ~2-days-before sweep. Sends
// the details message + the supplier-instagram copy-paste block, and
// stamps prewedding_telegram_sent_at so the cron won't also fire it.

export const prerender = false;

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { markPreweddingTelegramSent } from '~/lib/bookings/repository';
import { sendPreweddingDigest } from '~/lib/bookings/preweddingDigest';

export const POST: APIRoute = async ({ params, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const bookingId = params.id!;
  try {
    const result = await sendPreweddingDigest(bookingId);
    if (!result.ok) {
      return redirect(`/admin/bookings/${bookingId}?error=Reserva+no+trobada`, 303);
    }
    await markPreweddingTelegramSent(bookingId);
    return redirect(`/admin/bookings/${bookingId}?ok=tg:${result.messages}`, 303);
  } catch (err) {
    console.error('[admin.send-prewedding-telegram] failed', { bookingId, err });
    const msg = err instanceof Error ? err.message : 'error';
    return redirect(
      `/admin/bookings/${bookingId}?error=${encodeURIComponent('No s\'ha pogut enviar a Telegram: ' + msg)}`,
      303,
    );
  }
};
