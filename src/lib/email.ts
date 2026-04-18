// Thin wrapper around Resend. If RESEND_API_KEY is not set, emails are logged
// to the console instead (useful for dev).

import './env';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM ?? 'Lifetime Weddings <notifications@lifetime.photo>';
const TO = process.env.EMAIL_TO ?? 'hola@lifetime.photo';

const resend = apiKey ? new Resend(apiKey) : null;

export interface EmailPayload {
  subject: string;
  html: string;
  to?: string | string[];
  /** If present, replying from Gmail goes straight to this address (the lead). */
  replyTo?: string;
}

export async function sendNotification(payload: EmailPayload): Promise<void> {
  const to = payload.to ?? TO;
  if (!resend) {
    // eslint-disable-next-line no-console
    console.log('[email] (dev) would send:', { to, subject: payload.subject, replyTo: payload.replyTo });
    return;
  }
  try {
    await resend.emails.send({
      from: FROM,
      to: Array.isArray(to) ? to : [to],
      subject: payload.subject,
      html: payload.html,
      ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[email] send failed', err);
  }
}

// ─── Telegram notification ──────────────────────────────────────────────────
const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? '';
const TG_CHAT = process.env.TELEGRAM_CHAT_ID ?? '';

export async function sendTelegramNotification(message: string): Promise<void> {
  if (!TG_TOKEN || !TG_CHAT) {
    // eslint-disable-next-line no-console
    console.log('[telegram] (dev) would send:', message.replace(/<[^>]+>/g, ''));
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[telegram] send failed', err);
  }
}
