// POST /api/cancellacio/accept  { slug, signerName, signatureImage }
// Records the couple's e-signature of the cancellation agreement (typed name
// + drawn signature + IP/UA/hash audit), then generates a signed PDF and
// emails a copy to the couple + studio. Gated by the booking being cancelled
// and not yet signed. Idempotent.

export const prerender = false;

import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { z } from 'zod';
import { getBookingBySlug, markCancellationSigned } from '~/lib/bookings/repository';
import { clientIp } from '~/lib/captcha';
import { buildCancellationHtml } from '~/lib/contracts/cancellation';
import { generateContractPdf } from '~/lib/contracts/pdf';
import { sendCancellationSignedCopy } from '~/lib/bookings/emails';
import { formatWeddingDateLong } from '~/lib/bookings/format';

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const schema = z.object({
  slug: z.string().trim().min(1).max(100),
  signerName: z.string().trim().min(1).max(120),
  signatureImage: z.string().min(1).max(400_000),
});

const SIGNED_BY_LABEL = { ca: 'Signat per', es: 'Firmado por', en: 'Signed by' } as const;

function acceptanceLine(
  lang: 'ca' | 'es' | 'en',
  signerName: string,
  couple: string,
  when: Date,
  ip: string,
  uaHash: string,
): string {
  const date = formatWeddingDateLong(when, lang);
  const localeMap = { ca: 'ca-ES', es: 'es-ES', en: 'en-GB' } as const;
  const time = when.toLocaleTimeString(localeMap[lang], { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' });
  if (lang === 'es') return `Firmado electrónicamente por ${signerName} (${couple}) el ${date} a las ${time}. IP ${ip} · dispositivo ${uaHash}.`;
  if (lang === 'en') return `Signed electronically by ${signerName} (${couple}) on ${date} at ${time}. IP ${ip} · device ${uaHash}.`;
  return `Signat electrònicament per ${signerName} (${couple}) el ${date} a les ${time}. IP ${ip} · dispositiu ${uaHash}.`;
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: 'validation' }, 400);
  const d = parsed.data;

  const booking = await getBookingBySlug(d.slug);
  if (!booking || !booking.cancelledAt) return json({ error: 'not_found' }, 404);
  if (booking.cancellationSignedAt) return json({ error: 'already_signed' }, 409);

  const ip = clientIp(request) ?? 'unknown';
  const ua = request.headers.get('user-agent') ?? null;
  const lang = booking.preferredLanguage;
  const html = buildCancellationHtml(booking);
  const when = new Date();
  const uaHash = ua ? createHash('sha256').update(ua).digest('hex').slice(0, 12) : '—';
  const docHash = createHash('sha256')
    .update(`${html}|${d.signerName}|${ip}|${ua ?? ''}|${when.toISOString()}`)
    .digest('hex');

  const ok = await markCancellationSigned(booking.id, {
    ip,
    name: d.signerName,
    userAgent: ua,
    hash: docHash,
    signature: d.signatureImage,
  });
  if (!ok) return json({ error: 'already_signed' }, 409);

  // Generate the signed cancellation PDF and email a copy. Failures here
  // don't undo the signature (it's already recorded).
  try {
    const couple = `${booking.coupleName1}${booking.coupleName2 ? ' & ' + booking.coupleName2 : ''}`;
    const line = acceptanceLine(lang, d.signerName, couple, when, ip, uaHash);
    const pdf = await generateContractPdf({
      html,
      acceptanceLine: line,
      signatureImage: d.signatureImage,
      signerName: d.signerName,
      signedByLabel: SIGNED_BY_LABEL[lang],
    });
    await sendCancellationSignedCopy(booking, pdf);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[cancellacio.accept] PDF/email failed (signature kept)', err);
  }

  return json({ ok: true }, 200);
};
