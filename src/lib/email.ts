// Thin wrapper around Resend. If RESEND_API_KEY is not set, emails are logged
// to the console instead (useful for dev).

import './env';
import { Resend } from 'resend';
import type { Lang } from '~/i18n/ui';
import { renderAutoReply } from './auto-reply-template';
import { SITE } from '~/data/site';
import { slugForLead } from '~/data/landings';

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM ?? 'Lifetime Weddings <notifications@lifetime.photo>';
// Separate `from` for customer-facing auto-replies so the message looks like
// it came from hola@ (not from the generic `notifications@` alias used for
// internal pings). Any reply from the lead lands directly in hola@'s inbox.
const FROM_HELLO = process.env.EMAIL_FROM_HELLO ?? 'Lifetime Weddings <hola@lifetime.photo>';
const TO = process.env.EMAIL_TO ?? 'hola@lifetime.photo';
const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL ?? SITE.url;

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

// ─── Auto-reply to the lead ─────────────────────────────────────────────────
// Sent from hola@ the moment a lead submits a form, so the couple doesn't
// wait in silence. Includes a link to the landing that best matches their
// answers (via `slugForLead`), or a fallback if we don't have enough info.

export interface AutoReplyInput {
  /** The lead's email address. */
  email: string;
  /** First part of the couple's name, as they typed it. */
  name: string;
  lang: Lang;
  /** Quiz answers; only present for /api/quiz. */
  ceremonyType?: string | null;
  serviceInterest?: string | null;
  location?: string | null;
}

/** Build the absolute URL for the CTA button given the lead's answers. */
function landingUrlFor(input: AutoReplyInput): string {
  const slug = slugForLead(input.ceremonyType, input.serviceInterest, input.location);
  // Landings under /ofertes/<slug>, localised for CA (no prefix), ES, EN.
  if (slug) {
    const prefix = input.lang === 'ca' ? '' : `/${input.lang}`;
    return `${PUBLIC_SITE_URL}${prefix}/ofertes/${slug}`;
  }
  // No clear typology (mainly /contacto where we don't ask about ceremony
  // type yet) — fall back to the generic packs page. It's `noindex` but
  // fully accessible by direct URL.
  const prefix = input.lang === 'ca' ? '' : `/${input.lang}`;
  return `${PUBLIC_SITE_URL}${prefix}/packs`;
}

export async function sendAutoReplyToLead(input: AutoReplyInput): Promise<void> {
  const ctaUrl = landingUrlFor(input);
  const { subject, html, text } = renderAutoReply({ lang: input.lang, name: input.name, ctaUrl });

  if (!resend) {
    // eslint-disable-next-line no-console
    console.log('[auto-reply] (dev) would send:', { to: input.email, subject, ctaUrl });
    return;
  }
  try {
    await resend.emails.send({
      from: FROM_HELLO,
      to: [input.email],
      subject,
      html,
      text,
      replyTo: TO,
    });
  } catch (err) {
    // Auto-reply is nice-to-have; never fail the request if delivery fails.
    // eslint-disable-next-line no-console
    console.error('[auto-reply] send failed', err);
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
