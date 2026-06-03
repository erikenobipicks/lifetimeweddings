// POST /api/contrato/submit
//
// Public endpoint paralleling /api/reserva/submit. Receives the contract
// data form for a given booking slug, validates strictly, persists, and
// fires the internal + couple notifications.
//
// Gating order (matches the page):
//   1. Booking missing / archived          → 404
//   2. Form response missing               → 409 (must complete /reserva first)
//   3. deposit_paid_at is NULL             → 409 deposit_pending
//   4. contract_ready_at already set       → 409 already_submitted
//   5. otherwise                           → persist + notify

import type { APIRoute } from 'astro';
import { z } from 'zod';
import {
  getBookingBySlug,
  getFormResponseForBooking,
  submitContractData,
} from '~/lib/bookings/repository';
import { verifyTurnstile } from '~/lib/captcha';
import {
  sendContratoCoupleConfirmation,
  sendContratoInternalAlert,
} from '~/lib/bookings/emails';
import { updateFotostudioProjectDescription } from '~/lib/fotostudio';

interface RateRecord { count: number; resetAt: number }
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const attempts = new Map<string, RateRecord>();

function clientIp(headers: Headers): string {
  const cf = headers.get('cf-connecting-ip');
  if (cf) return cf;
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (rec.count >= RATE_LIMIT) return false;
  rec.count += 1;
  return true;
}

let lastPrune = 0;
function maybePrune() {
  const now = Date.now();
  if (now - lastPrune < 5 * 60 * 1000) return;
  lastPrune = now;
  for (const [ip, rec] of attempts) {
    if (rec.resetAt <= now) attempts.delete(ip);
  }
}

/** Human-readable Catalan labels for each consent channel — dumped into
 *  the FotoStudio project description so the contract body
 *  ({shoot_description}) lists the channels the couple authorised. Kept
 *  separate from the i18n labels in ui.ts because that file is browser-
 *  facing and trilingual; the contract is always in CA/ES (we use CA here
 *  as the canonical wording, mirroring the contract templates). */
const CONSENT_CONTRACT_LABEL: Record<string, string> = {
  display: 'Aparador físic de l\'estudi',
  facebook: 'Facebook professional',
  website: 'Pàgina web (lifetime.photo)',
  instagram: 'Instagram (@lifetime.weddings)',
  instagram_reel: 'Reel d\'Instagram',
  instagram_stories: 'Stories d\'Instagram el mateix dia de la boda',
  blog_real_wedding: 'Article "real wedding" al blog',
  paid_ads: 'Anuncis pagats (Meta / Google)',
  venue_partners: 'Compartir amb el venue / wedding planner',
  private_video: 'Vídeo privat amb altres parelles',
};

function buildConsentBlockCa(consent: readonly string[], couple: string): string {
  const header = `Boda de ${couple}`;
  if (consent.length === 0) {
    return `${header}\n\nDrets d'imatge: la parella NO autoritza la publicació del reportatge per cap canal.`;
  }
  const lines = consent.map((ch) => `- ${CONSENT_CONTRACT_LABEL[ch] ?? ch}`);
  return `${header}\n\nDrets d'imatge — canals autoritzats per la parella:\n${lines.join('\n')}`;
}

const PUBLICATION_CHANNELS = [
  'display',
  'facebook',
  'website',
  'instagram',
  'instagram_reel',
  'instagram_stories',
  'blog_real_wedding',
  'paid_ads',
  'venue_partners',
  'private_video',
] as const;

const submitSchema = z.object({
  slug: z.string().trim().min(1).max(100),
  languageBetween: z.string().trim().max(80).optional(),
  ceremonyLocationText: z.string().trim().min(2).max(200),
  receptionLocationText: z.string().trim().min(2).max(200),
  ceremonyType: z.enum(['civil', 'religious', 'other']),
  ceremonyTypeOther: z.string().trim().max(120).optional(),
  firstLook: z.enum(['yes', 'no', 'not_sure']),
  c1PrepAddress: z.string().trim().max(300).optional(),
  c2PrepAddress: z.string().trim().max(300).optional(),
  publicationConsent: z.array(z.enum(PUBLICATION_CHANNELS)).default([]),
  // Mandatory true — the form HTML requires the checkbox, but we re-check
  // server-side so the legal consent is durable and not bypassable.
  gdprAccepted: z.literal(true),
  captchaToken: z.string().optional(),
});

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  maybePrune();

  const ip = clientIp(request.headers);
  if (!checkRateLimit(ip)) {
    return jsonResponse({ error: 'rate_limited' }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }));
    console.warn('[contrato.submit] validation failed:', issues.map((i) => `${i.path}: ${i.message}`).join(' · '));
    return jsonResponse({ error: 'validation', issues }, 400);
  }
  const d = parsed.data;

  const captchaOk = await verifyTurnstile(d.captchaToken, ip === 'unknown' ? undefined : ip);
  if (!captchaOk) {
    console.warn('[contrato.submit] captcha_failed', { slug: d.slug });
    return jsonResponse({ error: 'captcha_failed' }, 403);
  }

  const booking = await getBookingBySlug(d.slug);
  if (!booking || booking.status === 'archived') {
    console.warn('[contrato.submit] not_found', { slug: d.slug, exists: Boolean(booking), status: booking?.status });
    return jsonResponse({ error: 'not_found' }, 404);
  }

  // Must have submitted /reserva first (i.e. form_response row exists). If
  // not, this is an out-of-order access — gracefully tell them.
  const formResponse = await getFormResponseForBooking(booking.id);
  if (!formResponse) {
    console.warn('[contrato.submit] reserva_not_submitted', { slug: d.slug });
    return jsonResponse({ error: 'reserva_not_submitted' }, 409);
  }

  if (!booking.depositPaidAt) {
    console.warn('[contrato.submit] deposit_pending', { slug: d.slug });
    return jsonResponse({ error: 'deposit_pending' }, 409);
  }
  if (booking.contractReadyAt) {
    console.warn('[contrato.submit] already_submitted', { slug: d.slug });
    return jsonResponse({ error: 'already_submitted' }, 409);
  }

  console.log('[contrato.submit] persisting', { slug: d.slug });

  await submitContractData({
    bookingId: booking.id,
    languageBetween: d.languageBetween ?? null,
    ceremonyLocationText: d.ceremonyLocationText,
    receptionLocationText: d.receptionLocationText,
    ceremonyType: d.ceremonyType,
    ceremonyTypeOther: d.ceremonyType === 'other' ? d.ceremonyTypeOther ?? null : null,
    firstLook: d.firstLook,
    publicationConsent: d.publicationConsent,
    gdprAcceptedAt: new Date(),
    c1PrepAddress: d.c1PrepAddress ?? null,
    c2PrepAddress: d.c2PrepAddress ?? null,
  });

  // Re-fetch + dispatch notifications fail-soft (same pattern as
  // /api/reserva/submit). Errors here never break the response — the form
  // data is already persisted.
  const updatedBooking = await getBookingBySlug(d.slug);
  const updatedFormResponse = updatedBooking
    ? await getFormResponseForBooking(updatedBooking.id)
    : null;
  if (updatedBooking && updatedFormResponse) {
    // Push the publication-consent block into the FotoStudio project's
    // description so the contract body picks it up via {shoot_description}.
    // Only fires when /reserva managed to create the FotoStudio project and
    // we persisted its id at that time. Always fail-soft.
    const fotostudioUpdate = updatedBooking.fotostudioProjectId
      ? updateFotostudioProjectDescription(
          updatedBooking.fotostudioProjectId,
          buildConsentBlockCa(
            d.publicationConsent,
            `${updatedFormResponse.c1FullName} i ${updatedFormResponse.c2FullName}`,
          ),
        )
      : Promise.resolve();
    await Promise.all([
      sendContratoCoupleConfirmation(updatedBooking),
      sendContratoInternalAlert(updatedBooking, updatedFormResponse),
      fotostudioUpdate,
    ]);
  }

  return jsonResponse({ ok: true, redirect: `/contrato/${d.slug}` }, 200);
};
