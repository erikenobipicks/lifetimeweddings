// POST /api/reserva/submit
//
// Public endpoint. Receives the JSON payload from ReservationForm.astro
// for a given booking slug, validates strictly, persists, and dispatches
// the two emails + Telegram. Always returns JSON.
//
// Lifecycle:
//   1. Look up the booking by slug.
//   2. Status check:
//        - missing / archived → 404
//        - form_submitted     → 409 (idempotent — no double-submit)
//        - sent / viewed      → proceed
//        - draft              → 409 (the link wasn't formally sent yet)
//   3. Rate limit per IP: 3 submits / hour, in-memory Map.
//   4. zod validation, coercing dates/booleans/numbers.
//   5. createFormResponse() — atomic batch (insert + status transition).
//   6. Fire emails fail-soft (couple confirmation + internal alert + telegram).
//   7. Return { ok: true, redirect: '/reserva/<slug>' }.
//
// Privacy: ip_address is stored on the form_response row (raw, not hashed),
// matching the schema. user_agent likewise. These are operational data
// (audit + abuse), not marketing.

import type { APIRoute } from 'astro';
import { z } from 'zod';
import {
  getBookingBySlug,
  createFormResponse,
} from '~/lib/bookings/repository';
import {
  sendCoupleConfirmation,
  sendInternalAlert,
  sendBookingTelegram,
} from '~/lib/bookings/emails';

// ─── Rate limit ──────────────────────────────────────────────────────────
// In-memory, per-process. For Railway's single-instance Node deployment
// this is sufficient. If we ever scale to N instances, swap for the DB
// (a `rate_limits` table keyed by ip+endpoint+window).

interface RateRecord { count: number; resetAt: number }
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1h
const attempts = new Map<string, RateRecord>();

function clientIp(headers: Headers): string {
  // Trust the standard forward-proxy headers — Railway / Cloudflare both
  // populate them. Fall back to a synthetic key so the limiter still
  // applies when behind something that strips them.
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

// Periodically prune expired records so the Map doesn't grow unbounded.
// Cheap O(n) pass; n stays tiny in practice.
let lastPrune = 0;
function maybePrune() {
  const now = Date.now();
  if (now - lastPrune < 5 * 60 * 1000) return;
  lastPrune = now;
  for (const [ip, rec] of attempts) {
    if (rec.resetAt <= now) attempts.delete(ip);
  }
}

// ─── Validation ──────────────────────────────────────────────────────────
// DNI: 8 digits + letter; NIE: X/Y/Z + 7 digits + letter. Case-insensitive.
const DNI_REGEX = /^([0-9]{8}[A-Za-z]|[XYZxyz][0-9]{7}[A-Za-z])$/;
// Phone: international with optional +, separators allowed, length 6–20.
const PHONE_REGEX = /^\+?[\d\s\-()]{6,20}$/;
// HH:MM (24h) — input type=time can also be "HH:MM:SS"; normalise.
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;

const personSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  dni: z.string().trim().regex(DNI_REGEX, 'DNI/NIE inválido').transform((s) => s.toUpperCase()),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  address: z.string().trim().min(5).max(200),
  email: z.string().trim().toLowerCase().email().max(120),
  phone: z.string().trim().regex(PHONE_REGEX, 'Teléfono inválido').max(40),
});

const submitSchema = z.object({
  slug: z.string().trim().min(1).max(100),

  // Couple data — flat keys map directly from the form.
  c1FullName: z.string().trim().min(2).max(120),
  c1Dni: z.string().trim().regex(DNI_REGEX).transform((s) => s.toUpperCase()),
  c1BirthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  c1Address: z.string().trim().min(5).max(200),
  c1Email: z.string().trim().toLowerCase().email().max(120),
  c1Phone: z.string().trim().regex(PHONE_REGEX).max(40),

  c2FullName: z.string().trim().min(2).max(120),
  c2Dni: z.string().trim().regex(DNI_REGEX).transform((s) => s.toUpperCase()),
  c2BirthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  c2Address: z.string().trim().min(5).max(200),
  c2Email: z.string().trim().toLowerCase().email().max(120),
  c2Phone: z.string().trim().regex(PHONE_REGEX).max(40),

  billingAddressSame: z.boolean(),
  billingName: z.string().trim().max(120).optional(),
  billingDni: z.string().trim().max(12).optional(),
  billingAddress: z.string().trim().max(200).optional(),

  weddingDateConfirmed: z.boolean(),
  weddingDateAlt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  venueConfirmed: z.boolean(),
  venueAltName: z.string().trim().max(120).optional(),
  ceremonyTime: z.string().regex(TIME_REGEX).optional(),
  serviceEndTime: z.string().regex(TIME_REGEX).optional(),
  guestCountEstimate: z.coerce.number().int().positive().max(2000).optional(),

  preferredCommunication: z.enum(['email', 'whatsapp', 'phone']).optional(),
  preferredLanguage: z.enum(['ca', 'es', 'en']).optional(),
  preferredPaymentMethod: z.enum(['card', 'transfer']).optional(),

  howDidYouFindUs: z.string().trim().max(500).optional(),
  importantNotes: z.string().trim().max(2000).optional(),
});

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Normalise time strings to HH:MM (drop seconds if present).
function normaliseTime(s: string | undefined): string | undefined {
  if (!s) return undefined;
  const m = s.match(/^([01]\d|2[0-3]):([0-5]\d)/);
  return m ? `${m[1]}:${m[2]}` : undefined;
}

// Parse YYYY-MM-DD into a Date at UTC midnight.
function dateOnly(s: string | undefined): Date | undefined {
  if (!s) return undefined;
  return new Date(`${s}T00:00:00Z`);
}

export const POST: APIRoute = async ({ request }) => {
  maybePrune();

  // Rate limit FIRST — protects against bots hammering with garbage
  // payloads. Counts every attempt regardless of outcome.
  const ip = clientIp(request.headers);
  if (!checkRateLimit(ip)) {
    return jsonResponse({ error: 'rate_limited' }, 429);
  }

  // Body must be JSON. Fail loud if not — the form always posts JSON.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse(
      { error: 'validation', issues: parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })) },
      400,
    );
  }
  const d = parsed.data;

  // Look up booking and gate by status.
  const booking = await getBookingBySlug(d.slug);
  if (!booking || booking.status === 'archived') {
    return jsonResponse({ error: 'not_found' }, 404);
  }
  if (booking.status === 'form_submitted') {
    return jsonResponse({ error: 'already_submitted' }, 409);
  }
  if (booking.status !== 'sent' && booking.status !== 'viewed') {
    // 'draft' — admin hasn't sent it yet. Couple shouldn't have the URL.
    return jsonResponse({ error: 'not_active' }, 409);
  }

  // Check expiry.
  if (booking.expiresAt && booking.expiresAt.getTime() < Date.now()) {
    return jsonResponse({ error: 'expired' }, 410);
  }

  // Persist form response + transition status atomically.
  await createFormResponse({
    bookingId: booking.id,
    c1FullName: d.c1FullName,
    c1Dni: d.c1Dni,
    c1BirthDate: dateOnly(d.c1BirthDate) ?? null,
    c1Address: d.c1Address,
    c1Email: d.c1Email,
    c1Phone: d.c1Phone,
    c2FullName: d.c2FullName,
    c2Dni: d.c2Dni,
    c2BirthDate: dateOnly(d.c2BirthDate) ?? null,
    c2Address: d.c2Address,
    c2Email: d.c2Email,
    c2Phone: d.c2Phone,
    billingAddressSame: d.billingAddressSame,
    billingName: d.billingAddressSame ? null : d.billingName ?? null,
    billingDni: d.billingAddressSame ? null : d.billingDni ?? null,
    billingAddress: d.billingAddressSame ? null : d.billingAddress ?? null,
    weddingDateConfirmed: d.weddingDateConfirmed,
    weddingDateAlt: d.weddingDateConfirmed ? null : dateOnly(d.weddingDateAlt) ?? null,
    venueConfirmed: d.venueConfirmed,
    venueAltName: d.venueConfirmed ? null : d.venueAltName ?? null,
    ceremonyTime: normaliseTime(d.ceremonyTime) ?? null,
    serviceEndTime: normaliseTime(d.serviceEndTime) ?? null,
    guestCountEstimate: d.guestCountEstimate ?? null,
    preferredCommunication: d.preferredCommunication ?? null,
    preferredLanguage: d.preferredLanguage ?? null,
    preferredPaymentMethod: d.preferredPaymentMethod ?? null,
    howDidYouFindUs: d.howDidYouFindUs ?? null,
    importantNotes: d.importantNotes ?? null,
    ipAddress: ip,
    userAgent: request.headers.get('user-agent'),
  });

  // Re-fetch the booking + form response so emails see the post-transition
  // state (status, form_submitted_at) and correct values.
  const updated = await getBookingBySlug(d.slug);
  if (updated) {
    // Build a synthetic FormResponse view from `d` since we don't need a
    // round-trip just for the email payload — keeps it cheap.
    const formView = {
      id: '',
      bookingId: updated.id,
      c1FullName: d.c1FullName,
      c1Dni: d.c1Dni,
      c1BirthDate: dateOnly(d.c1BirthDate) ?? null,
      c1Address: d.c1Address,
      c1Email: d.c1Email,
      c1Phone: d.c1Phone,
      c2FullName: d.c2FullName,
      c2Dni: d.c2Dni,
      c2BirthDate: dateOnly(d.c2BirthDate) ?? null,
      c2Address: d.c2Address,
      c2Email: d.c2Email,
      c2Phone: d.c2Phone,
      billingAddressSame: d.billingAddressSame,
      billingName: d.billingAddressSame ? null : d.billingName ?? null,
      billingDni: d.billingAddressSame ? null : d.billingDni ?? null,
      billingAddress: d.billingAddressSame ? null : d.billingAddress ?? null,
      weddingDateConfirmed: d.weddingDateConfirmed,
      weddingDateAlt: d.weddingDateConfirmed ? null : dateOnly(d.weddingDateAlt) ?? null,
      venueConfirmed: d.venueConfirmed,
      venueAltName: d.venueConfirmed ? null : d.venueAltName ?? null,
      ceremonyTime: normaliseTime(d.ceremonyTime) ?? null,
      serviceEndTime: normaliseTime(d.serviceEndTime) ?? null,
      guestCountEstimate: d.guestCountEstimate ?? null,
      preferredCommunication: d.preferredCommunication ?? null,
      preferredLanguage: d.preferredLanguage ?? null,
      preferredPaymentMethod: d.preferredPaymentMethod ?? null,
      howDidYouFindUs: d.howDidYouFindUs ?? null,
      importantNotes: d.importantNotes ?? null,
      submittedAt: new Date(),
      ipAddress: ip,
      userAgent: request.headers.get('user-agent'),
    };

    // Fire-and-await but each helper is fail-soft internally, so a delivery
    // failure won't break the response. We parallelise to keep the request
    // snappy from the couple's perspective.
    await Promise.all([
      sendCoupleConfirmation(updated, formView),
      sendInternalAlert(updated, formView),
      sendBookingTelegram(updated, formView),
    ]);
  }

  return jsonResponse({ ok: true, redirect: `/reserva/${d.slug}` }, 200);
};
