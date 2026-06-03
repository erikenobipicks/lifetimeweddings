// Admin endpoint: create a new booking from the /admin/bookings/new form.
// Accepts form-data (URL-encoded). Validates with zod. On success redirects
// to the new booking's detail page; on validation error redirects back to
// the form with the error message + the original values preserved via
// query string (so the user doesn't lose their typing).
//
// Auth: middleware already protects /api/admin/*. Belt-and-suspenders check
// inline mirrors the pattern in send-quote.ts.

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import { createBooking } from '~/lib/bookings/repository';
import type { BookingCreateInput, PackAddon, ReferenceTestimonial } from '~/lib/bookings/types';

// ─── Field parsers (form-data → typed) ────────────────────────────────────
// Each list field comes as a textarea with one line per item; addons come
// as "Name | 290" lines (name pipe price-in-euros). Empty lines ignored.

// Accepted price formats (Spanish-first, US fallback):
//   "3170"   "3170.00"   "3170,00"
//   "3.170"  "3.170,00"  "1.500.000,00"
// Spanish convention: "." = thousands separator, "," = decimal.
// US fallback: a bare "1500.00" with 1–2 trailing digits is treated as
// decimal so old quotes / picker output keep working.
const SPANISH_EUROS_RE = /^(?:\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?|\d+(?:[.,]\d{1,2})?)$/;

/** Parse a Spanish (or US-style) euro string into cents. Returns NaN if
 *  the input is unparseable so the caller can reject it. */
function eurosStringToCents(raw: string): number {
  const s = raw.trim();
  if (!SPANISH_EUROS_RE.test(s)) return NaN;
  // If a comma is present, it's the decimal — strip all dots (thousands)
  // and swap the comma. Without a comma, ".\d{3}" groups are thousands;
  // a lone ".\d{1,2}" tail is a decimal (US fallback).
  let normalized: string;
  if (s.includes(',')) {
    normalized = s.replace(/\./g, '').replace(',', '.');
  } else if (/^\d{1,3}(?:\.\d{3})+$/.test(s)) {
    normalized = s.replace(/\./g, '');
  } else {
    normalized = s;
  }
  const n = parseFloat(normalized);
  if (!Number.isFinite(n) || n < 0) return NaN;
  return Math.round(n * 100);
}

function parseLines(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function parseAddons(raw: string | null | undefined): PackAddon[] {
  return parseLines(raw)
    .map((line): PackAddon | null => {
      // Split on the last "|" so names containing the pipe character
      // (unlikely but possible) don't break the parse.
      const idx = line.lastIndexOf('|');
      if (idx < 0) return null;
      const name = line.slice(0, idx).trim();
      const priceStr = line.slice(idx + 1).trim();
      if (!name) return null;
      const cents = eurosStringToCents(priceStr);
      if (Number.isNaN(cents)) return null;
      return { name, price_cents: cents };
    })
    .filter((x): x is PackAddon => x !== null);
}

function parseTestimonial(
  quote: string | null | undefined,
  author: string | null | undefined,
  context: string | null | undefined,
): ReferenceTestimonial | undefined {
  const q = quote?.trim();
  const a = author?.trim();
  if (!q || !a) return undefined;
  return { quote: q, author: a, context: context?.trim() || undefined };
}

// Form schema: validates raw form-data strings and coerces to the shape
// createBooking() expects. Numeric fields come as text from the browser.
const formSchema = z.object({
  coupleName1: z.string().min(1).max(60),
  coupleName2: z.string().min(1).max(60),
  // Optional — Eric sometimes doesn't have the email when creating the
  // booking; the couple supplies c1Email/c2Email later via /reserva.
  // Treats empty string as "missing" so the form can submit without a
  // value (`<input type="email">` reports empty as `""`).
  coupleEmailPrimary: z.union([
    z.literal(''),
    z.string().email().max(120),
  ]).optional(),
  couplePhonePrimary: z.string().max(40).optional(),
  preferredLanguage: z.enum(['ca', 'es', 'en']).default('ca'),

  weddingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format: YYYY-MM-DD'),
  venueName: z.string().min(1).max(120),
  venueCity: z.string().max(80).optional(),
  venueAddress: z.string().max(200).optional(),

  packName: z.string().min(1).max(80),
  packDescription: z.string().max(2000).optional(),
  packIncludes: z.string().optional(),
  packExcludes: z.string().optional(),
  packAddons: z.string().optional(),
  packPriceEuros: z
    .string()
    .regex(SPANISH_EUROS_RE, 'Format: 1500, 1.500, 1500,00 o 1.500,00'),
  depositEuros: z
    .string()
    .regex(SPANISH_EUROS_RE, 'Format: 500, 500,00 o 1.500,00'),
  paymentTerms: z.string().max(200).optional(),

  customIntro: z.string().max(2000).optional(),
  internalNotes: z.string().max(4000).optional(),
  testimonialQuote: z.string().max(2000).optional(),
  testimonialAuthor: z.string().max(120).optional(),
  testimonialContext: z.string().max(120).optional(),

  // YouTube id chosen from the admin dropdown. Format is loose on purpose
  // — empty string means "use default", any other value is treated as a
  // YouTube id (validated against the catalog at render time, not here).
  flagshipVideoId: z.string().max(40).optional(),

  expiresAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format: YYYY-MM-DD')
    .optional()
    .or(z.literal('')),
});

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const form = await request.formData();
  const raw: Record<string, string> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === 'string') raw[k] = v;
  }

  const parsed = formSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' · ');
    // Bounce back to the form with error in query string. Keep the typed
    // values around so the user doesn't have to retype.
    const params = new URLSearchParams({ error: msg });
    for (const [k, v] of Object.entries(raw)) params.set(`v_${k}`, v);
    return redirect(`/admin/bookings/new?${params}`, 303);
  }

  const d = parsed.data;
  const input: BookingCreateInput = {
    coupleName1: d.coupleName1.trim(),
    coupleName2: d.coupleName2.trim(),
    coupleEmailPrimary: d.coupleEmailPrimary?.trim() ?? '',
    couplePhonePrimary: d.couplePhonePrimary?.trim() || undefined,
    preferredLanguage: d.preferredLanguage,

    weddingDate: new Date(`${d.weddingDate}T00:00:00Z`),
    venueName: d.venueName.trim(),
    venueCity: d.venueCity?.trim() || undefined,
    venueAddress: d.venueAddress?.trim() || undefined,

    packName: d.packName.trim(),
    packDescription: d.packDescription?.trim() || undefined,
    packIncludes: parseLines(d.packIncludes),
    packExcludes: parseLines(d.packExcludes),
    packAddons: parseAddons(d.packAddons),
    packPriceCents: eurosStringToCents(d.packPriceEuros),
    depositCents: eurosStringToCents(d.depositEuros),
    paymentTerms: d.paymentTerms?.trim() || undefined,

    customIntro: d.customIntro?.trim() || undefined,
    internalNotes: d.internalNotes?.trim() || undefined,
    referenceTestimonial: parseTestimonial(d.testimonialQuote, d.testimonialAuthor, d.testimonialContext),
    flagshipVideoId: d.flagshipVideoId?.trim() || undefined,

    expiresAt: d.expiresAt && d.expiresAt.length > 0
      ? new Date(`${d.expiresAt}T23:59:59Z`)
      : undefined,
  };

  const booking = await createBooking(input);
  return redirect(`/admin/bookings/${booking.id}?ok=created`, 303);
};
