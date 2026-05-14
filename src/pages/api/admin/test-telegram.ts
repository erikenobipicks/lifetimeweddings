// Admin-only: send a test Telegram message so the operator can verify the
// TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID env vars without waiting for a
// real lead. Returns JSON with the same shape as sendTelegramNotification
// so any failure mode is surfaced (not_configured / http_error /
// network_error) along with the Telegram API response body when
// applicable — that's typically where the real diagnosis lives.

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { sendTelegramNotification } from '~/lib/email';

export const POST: APIRoute = async ({ cookies }) => {
  const user = await getUser(cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const now = new Date().toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' });
  const result = await sendTelegramNotification(
    `🧪 <b>Test des de admin</b>\nEnviat per <b>${user}</b>\n🕐 ${now}`,
  );

  // Always 200 with the result — easier to consume in fetch().
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
