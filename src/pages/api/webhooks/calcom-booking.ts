// POST /api/webhooks/calcom-booking
//
// Receives webhook events from Cal.com when something happens on the
// "lifetime-weddings-366ynh" account — primarily BOOKING_CREATED (a
// couple has reserved a videocall slot) but also BOOKING_RESCHEDULED
// and BOOKING_CANCELLED. Fires a Telegram alert with the relevant info
// so Eric / Ferran see it on their phone within seconds.
//
// Auth: Cal.com signs each webhook with HMAC-SHA256 of the raw body,
// using the secret you configure in Cal.com → Settings → Developer →
// Webhooks. The signature comes in header `X-Cal-Signature-256`. We
// validate with timingSafeEqual.
//
// Setup (one-time):
//   1. Cal.com → Settings → Developer → Webhooks → "+ New webhook"
//   2. Subscriber URL: https://www.lifetime.photo/api/webhooks/calcom-booking
//   3. Event Triggers: tick BOOKING_CREATED, BOOKING_RESCHEDULED,
//      BOOKING_CANCELLED
//   4. Secret: generate a random string (e.g. `openssl rand -hex 32`)
//   5. Put the same value in Railway as CALCOM_WEBHOOK_SECRET
//
// Cal.com's payload shape is documented at
// https://cal.com/docs/api-reference/v2/webhooks — we read the fields
// defensively because the API has evolved over time.

export const prerender = false;

import type { APIRoute } from 'astro';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { sendTelegramNotification } from '~/lib/email';

function esc(s: string | undefined | null): string {
  return (s ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));
}

/** Format ISO timestamp into "DD/MM/YYYY · HH:MM" Europe/Madrid. */
function fmtSlot(iso: string | undefined): string {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return d.toLocaleString('ca-ES', {
      timeZone: 'Europe/Madrid',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

/** Constant-time HMAC comparison so we don't leak the secret one byte
 *  at a time via response timing. */
function verifySignature(rawBody: string, signatureHex: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected, 'hex');
  // Cal.com may prefix the signature with "sha256=" historically; tolerate.
  const cleaned = signatureHex.replace(/^sha256=/i, '').trim();
  const b = Buffer.from(cleaned, 'hex');
  if (a.length !== b.length || a.length === 0) return false;
  return timingSafeEqual(a, b);
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

interface CalcomAttendee {
  name?: string;
  email?: string;
  timeZone?: string;
}

interface CalcomPayload {
  triggerEvent?: string;
  payload?: {
    title?: string;
    type?: string;
    additionalNotes?: string;
    startTime?: string;
    endTime?: string;
    attendees?: CalcomAttendee[];
    organizer?: { name?: string; email?: string };
    uid?: string;
    videoCallData?: { type?: string; url?: string };
    location?: string;
    rescheduleId?: string;
    cancellationReason?: string;
  };
}

export const POST: APIRoute = async ({ request }) => {
  const secret = (process.env.CALCOM_WEBHOOK_SECRET ?? '').trim();
  if (!secret) {
    // Don't accept unsigned webhooks — would let anyone Telegram-spam Eric.
    return json({ error: 'webhook_not_configured' }, 503);
  }

  // Read the raw body BEFORE JSON.parse so the HMAC matches what Cal.com signed.
  const raw = await request.text();
  const sig = request.headers.get('x-cal-signature-256') ?? '';
  if (!sig || !verifySignature(raw, sig, secret)) {
    console.warn('[calcom.webhook] invalid signature');
    return json({ error: 'unauthorized' }, 401);
  }

  let body: CalcomPayload;
  try { body = JSON.parse(raw); }
  catch { return json({ error: 'invalid_json' }, 400); }

  const event = body.triggerEvent ?? '';
  const p = body.payload ?? {};
  const attendee = p.attendees?.[0];
  const name = attendee?.name ?? '(sense nom)';
  const email = attendee?.email ?? '(sense email)';
  const slot = fmtSlot(p.startTime);
  const meetUrl = p.videoCallData?.url ?? p.location ?? '';

  // Compose the Telegram message per event type. Skip events we don't care
  // about (Cal.com may send FORM_SUBMITTED, MEETING_ENDED etc. depending
  // on what you ticked — those just fall through to 200 OK silently).
  let message: string | null = null;
  if (event === 'BOOKING_CREATED') {
    const lines = [
      '📅 <b>Nova videocall reservada</b>',
      `${esc(name)} — ${esc(email)}`,
      `${esc(slot)} (Europe/Madrid)`,
    ];
    if (meetUrl) lines.push(`📹 <a href="${esc(meetUrl)}">Meet link</a>`);
    if (p.additionalNotes) lines.push(`📝 ${esc(p.additionalNotes).slice(0, 300)}`);
    message = lines.join('\n');
  } else if (event === 'BOOKING_RESCHEDULED') {
    message = [
      '🔄 <b>Videocall reprogramada</b>',
      `${esc(name)} — ${esc(email)}`,
      `Nova hora: ${esc(slot)} (Europe/Madrid)`,
      meetUrl ? `📹 <a href="${esc(meetUrl)}">Meet link</a>` : '',
    ].filter(Boolean).join('\n');
  } else if (event === 'BOOKING_CANCELLED') {
    message = [
      '❌ <b>Videocall cancel·lada</b>',
      `${esc(name)} — ${esc(email)}`,
      `Era: ${esc(slot)}`,
      p.cancellationReason ? `Motiu: ${esc(p.cancellationReason)}` : '',
    ].filter(Boolean).join('\n');
  }

  if (message) {
    try {
      await sendTelegramNotification(message);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[calcom.webhook] telegram send failed (non-fatal)', err);
    }
  }

  return json({ ok: true, handled: !!message, event }, 200);
};
