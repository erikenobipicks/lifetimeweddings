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
import type { BookingCreateInput, ReferenceTestimonial } from '~/lib/bookings/types';
import {
  SPANISH_EUROS_RE,
  eurosStringToCents,
  computeDiscountCents,
  parseLines,
  parseAddons,
} from '~/lib/payments/money';

// ─── Field parsers (form-data → typed) ────────────────────────────────────
// Euro parsing, the accepted price format (SPANISH_EUROS_RE) and the
// discount/add-on parsers all live in ~/lib/payments/money now.

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
  // Required — needed by every downstream email (proposal link, /reserva
  // confirmation, /contrato invite, contract copy) AND by the follow-up
  // questionnaires Eric is planning. Skipping it here used to crash the
  // contrato-invite send (recipient: "") on Resend's side.
  coupleEmailPrimary: z.string().email().max(120),
  couplePhonePrimary: z.string().max(40).optional(),
  preferredLanguage: z.enum(['ca', 'es', 'en']).default('ca'),

  source: z.string().max(120).optional(),
  kind: z.enum(['own', 'collab', 'external']).optional(),
  collaboratorName: z.string().max(120).optional(),
  serviceType: z.enum(['photo', 'video', 'combo']).optional().or(z.literal('')),

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

  // Discount: type ('percent' or 'amount') + numeric value. Server computes
  // discount_cents. Empty / missing = no discount.
  discountType: z.enum(['percent', 'amount']).optional().or(z.literal('')),
  discountValue: z.string().optional(),

  // Reservation incentive ("caramel"). All optional. Original price is a
  // euro string like the pack price; empty string means "not set".
  incentiveBody: z.string().max(1000).optional(),
  incentiveOriginalPriceEuros: z
    .string()
    .regex(SPANISH_EUROS_RE, 'Format: 1500, 1.500, 1500,00 o 1.500,00')
    .optional()
    .or(z.literal('')),
  incentiveDeadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format: YYYY-MM-DD')
    .optional()
    .or(z.literal('')),

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
    coupleEmailPrimary: d.coupleEmailPrimary.trim(),
    couplePhonePrimary: d.couplePhonePrimary?.trim() || undefined,
    preferredLanguage: d.preferredLanguage,
    source: d.source?.trim() || null,
    kind: d.kind ?? 'own',
    collaboratorName: d.collaboratorName?.trim() || null,
    serviceType: d.serviceType ? d.serviceType : null,

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

    discountCents: computeDiscountCents(d.discountType || '', d.discountValue || '', eurosStringToCents(d.packPriceEuros)),

    incentiveBody: d.incentiveBody?.trim() || undefined,
    incentiveOriginalPriceCents:
      d.incentiveOriginalPriceEuros && d.incentiveOriginalPriceEuros.length > 0
        ? eurosStringToCents(d.incentiveOriginalPriceEuros)
        : undefined,
    incentiveDeadline:
      d.incentiveDeadline && d.incentiveDeadline.length > 0
        ? new Date(`${d.incentiveDeadline}T23:59:59Z`)
        : undefined,

    expiresAt: d.expiresAt && d.expiresAt.length > 0
      ? new Date(`${d.expiresAt}T23:59:59Z`)
      : undefined,
  };

  const booking = await createBooking(input);
  return redirect(`/admin/bookings/${booking.id}?ok=created`, 303);
};
