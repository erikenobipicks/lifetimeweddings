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
import { createHash } from 'node:crypto';
import { z } from 'zod';
import {
  getBookingBySlug,
  getFormResponseForBooking,
  markContractAccepted,
  MANUAL_CONTRACT_IP,
} from '~/lib/bookings/repository';
import { verifyTurnstile } from '~/lib/captcha';
import { contractDataFromBooking } from '~/lib/contracts/fromBooking';
import { buildContractHtml } from '~/lib/contracts/generate';
import { generateContractPdf } from '~/lib/contracts/pdf';
import { sendContractAcceptedCopy } from '~/lib/bookings/emails';
import { acceptanceLine, SIGNED_BY_LABEL } from '~/lib/contracts/acceptance';

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
  signerName: z.string().trim().min(1).max(120),
  // PNG data URL of the drawn signature. Cap the length so a malicious
  // client can't push an unbounded blob into the DB.
  signatureImage: z.string().min(1).max(400_000),
  captchaToken: z.string().optional(),
});

export const POST: APIRoute = async ({ request }) => {
  let ip = clientIp(request.headers);
  // `MANUAL_CONTRACT_IP` ('manual') is the sentinel that flags an operator
  // "signed outside the app" mark. A real signer must never be able to forge it
  // via x-forwarded-for and disguise a genuine e-signature as a manual mark —
  // clearManualContractSignature would then silently wipe it. It's never a
  // valid IP, so collapse it to 'unknown'.
  if (ip === MANUAL_CONTRACT_IP) ip = 'unknown';

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    console.warn('[contrato.accept] validation failed', parsed.error.issues);
    return json({ error: 'validation' }, 400);
  }
  const d = parsed.data;

  const captchaOk = await verifyTurnstile(d.captchaToken, ip === 'unknown' ? undefined : ip);
  if (!captchaOk) {
    console.warn('[contrato.accept] captcha_failed', { slug: d.slug });
    return json({ error: 'captcha_failed' }, 403);
  }

  const booking = await getBookingBySlug(d.slug);
  if (!booking || booking.status === 'archived') {
    console.warn('[contrato.accept] not_found', { slug: d.slug });
    return json({ error: 'not_found' }, 404);
  }
  if (!booking.depositPaidAt) {
    console.warn('[contrato.accept] deposit_pending', { slug: d.slug });
    return json({ error: 'deposit_pending' }, 409);
  }
  if (!booking.contractReadyAt) {
    console.warn('[contrato.accept] data_pending', { slug: d.slug });
    return json({ error: 'data_pending' }, 409);
  }
  if (booking.contractAcceptedAt) {
    console.warn('[contrato.accept] already_accepted', { slug: d.slug });
    return json({ error: 'already_accepted' }, 409);
  }

  const fr = await getFormResponseForBooking(booking.id);
  if (!fr) {
    console.warn('[contrato.accept] data_pending (no formResponse)', { slug: d.slug });
    return json({ error: 'data_pending' }, 409);
  }

  // Build the contract HTML up front so we can hash it as part of the
  // signing proof (document + signer + ip + ua + timestamp).
  const lang = booking.preferredLanguage;
  const ua = request.headers.get('user-agent') ?? null;
  const data = contractDataFromBooking(booking, fr);
  const { html } = buildContractHtml(data);
  const when = new Date();
  const uaHash = ua ? createHash('sha256').update(ua).digest('hex').slice(0, 12) : '—';
  const docHash = createHash('sha256')
    .update(`${html}|${d.signerName}|${ip}|${ua ?? ''}|${when.toISOString()}`)
    .digest('hex');

  // Record acceptance first (idempotent — only the first wins).
  const stamped = await markContractAccepted(booking.id, {
    ip,
    name: d.signerName,
    userAgent: ua,
    hash: docHash,
    signature: d.signatureImage,
  });
  if (!stamped) {
    console.warn('[contrato.accept] already_accepted (race)', { slug: d.slug });
    return json({ error: 'already_accepted' }, 409);
  }
  console.log('[contrato.accept] stamped', { slug: d.slug, ip, signer: d.signerName });

  // Generate the filled contract PDF (with the drawn signature + acceptance
  // footer), then email copies. PDF / email failures don't undo acceptance.
  try {
    const line = acceptanceLine(lang, d.signerName, booking.coupleName1, booking.coupleName2, when, ip, uaHash);
    const pdf = await generateContractPdf({
      html,
      acceptanceLine: line,
      signatureImage: d.signatureImage,
      signerName: d.signerName,
      signedByLabel: SIGNED_BY_LABEL[lang],
    });
    await sendContractAcceptedCopy(booking, fr, pdf);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contrato.accept] PDF/email failed (acceptance kept)', err);
  }

  return json({ ok: true, redirect: `/contrato/${d.slug}` }, 200);
};
