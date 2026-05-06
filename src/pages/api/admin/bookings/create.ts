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
      const m = line.match(/^(.+?)\s*\|\s*(\d+(?:[.,]\d+)?)$/);
      if (!m) return null;
      const name = m[1].trim();
      const euros = parseFloat(m[2].replace(',', '.'));
      if (Number.isNaN(euros) || euros < 0) return null;
      return { name, price_cents: Math.round(euros * 100) };
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
  coupleEmailPrimary: z.string().email().max(120),
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
  packPriceEuros: z.string().regex(/^\d+(?:[.,]\d+)?$/, 'Format: 1500 or 1500.00'),
  depositEuros: z.string().regex(/^\d+(?:[.,]\d+)?$/, 'Format: 500 or 500.00'),
  paymentTerms: z.string().max(200).optional(),

  customIntro: z.string().max(2000).optional(),
  testimonialQuote: z.string().max(2000).optional(),
  testimonialAuthor: z.string().max(120).optional(),
  testimonialContext: z.string().max(120).optional(),

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
    coupleEmailPrimary: d.coupleEmailPrimary.trim(),
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
    packPriceCents: Math.round(parseFloat(d.packPriceEuros.replace(',', '.')) * 100),
    depositCents: Math.round(parseFloat(d.depositEuros.replace(',', '.')) * 100),
    paymentTerms: d.paymentTerms?.trim() || undefined,

    customIntro: d.customIntro?.trim() || undefined,
    referenceTestimonial: parseTestimonial(d.testimonialQuote, d.testimonialAuthor, d.testimonialContext),

    expiresAt: d.expiresAt && d.expiresAt.length > 0
      ? new Date(`${d.expiresAt}T23:59:59Z`)
      : undefined,
  };

  const booking = await createBooking(input);
  return redirect(`/admin/bookings/${booking.id}?ok=created`, 303);
};
