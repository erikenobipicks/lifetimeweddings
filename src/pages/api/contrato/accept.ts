// POST /api/contrato/accept
//
// Records the couple's electronic acceptance of the (own) contract, then
// generates the filled contract PDF and emails a copy to the couple + the
// studio. Gated: deposit paid, contract DATA already submitted
// (contractReadyAt set), and not already accepted.
//
// Acceptance model: ticking "Accepto el contracte" + this timestamped,
// IP-stamped record. Mirrors the GDPR-acceptance pattern already used on
// /contrato data submit.

export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import {
  getBookingBySlug,
  getFormResponseForBooking,
  markContractAccepted,
} from '~/lib/bookings/repository';
import { verifyTurnstile } from '~/lib/captcha';
import { contractDataFromBooking } from '~/lib/contracts/fromBooking';
import { buildContractHtml } from '~/lib/contracts/generate';
import { generateContractPdf } from '~/lib/contracts/pdf';
import { sendContractAcceptedCopy } from '~/lib/bookings/emails';
import { formatWeddingDateLong } from '~/lib/bookings/format';

function clientIp(headers: Headers): string {
  const cf = headers.get('cf-connecting-ip');
  if (cf) return cf;
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const schema = z.object({
  slug: z.string().trim().min(1).max(100),
  accepted: z.literal(true),
  captchaToken: z.string().optional(),
});

function acceptanceLine(lang: 'ca' | 'es' | 'en', n1: string, n2: string, when: Date, ip: string): string {
  const date = formatWeddingDateLong(when, lang);
  const time = when.toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' });
  if (lang === 'es') return `Aceptado electrónicamente por ${n1} y ${n2} el ${date} a las ${time} (IP ${ip}).`;
  if (lang === 'en') return `Accepted electronically by ${n1} and ${n2} on ${date} at ${time} (IP ${ip}).`;
  return `Acceptat electrònicament per ${n1} i ${n2} el ${date} a les ${time} (IP ${ip}).`;
}

export const POST: APIRoute = async ({ request }) => {
  const ip = clientIp(request.headers);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return json({ error: 'validation' }, 400);
  }
  const d = parsed.data;

  const captchaOk = await verifyTurnstile(d.captchaToken, ip === 'unknown' ? undefined : ip);
  if (!captchaOk) {
    return json({ error: 'captcha_failed' }, 403);
  }

  const booking = await getBookingBySlug(d.slug);
  if (!booking || booking.status === 'archived') {
    return json({ error: 'not_found' }, 404);
  }
  if (!booking.depositPaidAt) {
    return json({ error: 'deposit_pending' }, 409);
  }
  if (!booking.contractReadyAt) {
    // Couple hasn't submitted the contract data yet.
    return json({ error: 'data_pending' }, 409);
  }
  if (booking.contractAcceptedAt) {
    return json({ error: 'already_accepted' }, 409);
  }

  const fr = await getFormResponseForBooking(booking.id);
  if (!fr) {
    return json({ error: 'data_pending' }, 409);
  }

  // Record acceptance first (idempotent — only the first wins).
  const stamped = await markContractAccepted(booking.id, ip);
  if (!stamped) {
    return json({ error: 'already_accepted' }, 409);
  }

  // Generate the filled contract PDF with the acceptance footer, then email
  // copies. PDF / email failures are logged but don't undo the acceptance.
  try {
    const data = contractDataFromBooking(booking, fr);
    const { html } = buildContractHtml(data);
    const line = acceptanceLine(
      booking.preferredLanguage,
      booking.coupleName1,
      booking.coupleName2,
      new Date(),
      ip,
    );
    const pdf = await generateContractPdf({ html, acceptanceLine: line });
    await sendContractAcceptedCopy(booking, fr, pdf);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contrato.accept] PDF/email failed (acceptance kept)', err);
  }

  return json({ ok: true, redirect: `/contrato/${d.slug}` }, 200);
};
