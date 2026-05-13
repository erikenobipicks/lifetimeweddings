// Admin endpoint: edit an existing booking. Two distinct intents are
// handled, dispatched by the `_action` field on the form body:
//
//   _action=update  → partial update of editable fields (uses the same
//                     form schema as create, all fields optional)
//   _action=status  → transition booking.status. Allowed transitions:
//                       draft → sent
//                       any   → archived
//                       (other transitions kept simple — admins can already
//                        get any status by hand if needed)
//
// In both cases we redirect back to the detail page on success or with an
// `?error=...` on failure.

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import {
  getBookingById,
  setBookingStatus,
  updateBooking,
  type BookingUpdate,
} from '~/lib/bookings/repository';
import type { BookingStatus, PackAddon } from '~/lib/bookings/types';

function parseLines(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

function parseAddons(raw: string | null | undefined): PackAddon[] {
  return parseLines(raw)
    .map((line): PackAddon | null => {
      const m = line.match(/^(.+?)\s*\|\s*(\d+(?:[.,]\d+)?)$/);
      if (!m) return null;
      const euros = parseFloat(m[2].replace(',', '.'));
      if (Number.isNaN(euros) || euros < 0) return null;
      return { name: m[1].trim(), price_cents: Math.round(euros * 100) };
    })
    .filter((x): x is PackAddon => x !== null);
}

const updateSchema = z.object({
  coupleName1: z.string().min(1).max(60).optional(),
  coupleName2: z.string().min(1).max(60).optional(),
  coupleEmailPrimary: z.string().email().max(120).optional(),
  couplePhonePrimary: z.string().max(40).optional(),
  preferredLanguage: z.enum(['ca', 'es', 'en']).optional(),

  weddingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  venueName: z.string().min(1).max(120).optional(),
  venueCity: z.string().max(80).optional(),
  venueAddress: z.string().max(200).optional(),

  packName: z.string().min(1).max(80).optional(),
  packDescription: z.string().max(2000).optional(),
  packIncludes: z.string().optional(),
  packExcludes: z.string().optional(),
  packAddons: z.string().optional(),
  packPriceEuros: z.string().regex(/^\d+(?:[.,]\d+)?$/).optional(),
  depositEuros: z.string().regex(/^\d+(?:[.,]\d+)?$/).optional(),
  paymentTerms: z.string().max(200).optional(),

  customIntro: z.string().max(2000).optional(),
  testimonialQuote: z.string().max(2000).optional(),
  testimonialAuthor: z.string().max(120).optional(),
  testimonialContext: z.string().max(120).optional(),

  flagshipVideoId: z.string().max(40).optional(),

  expiresAt: z.string().optional(),
});

const statusSchema = z.object({
  status: z.enum(['draft', 'sent', 'viewed', 'form_submitted', 'archived']),
});

export const POST: APIRoute = async ({ request, params, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const id = params.id!;
  const booking = await getBookingById(id);
  if (!booking) return new Response('Not found', { status: 404 });

  const form = await request.formData();
  const action = String(form.get('_action') ?? '');
  const back = (qs: string) => redirect(`/admin/bookings/${id}${qs}`, 303);

  if (action === 'status') {
    const next = statusSchema.safeParse({ status: form.get('status') });
    if (!next.success) return back('?error=Estat+invàlid');

    // Light transition guard: admins shouldn't accidentally clobber a real
    // 'form_submitted' or 'viewed' back to 'draft'. Allow any → archived
    // explicitly; otherwise only forward transitions.
    const target = next.data.status;
    if (target !== 'archived' && rank(target) < rank(booking.status)) {
      return back('?error=Transició+no+permesa');
    }
    await setBookingStatus(id, target);
    return back(`?ok=status:${target}`);
  }

  // Default: content update.
  const raw: Record<string, string> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === 'string' && k !== '_action') raw[k] = v;
  }
  const parsed = updateSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' · ');
    return back(`?error=${encodeURIComponent(msg)}`);
  }
  const d = parsed.data;
  const patch: BookingUpdate = {};

  // Strings — empty string clears the field except for required ones.
  if (d.coupleName1 !== undefined) patch.coupleName1 = d.coupleName1.trim();
  if (d.coupleName2 !== undefined) patch.coupleName2 = d.coupleName2.trim();
  if (d.coupleEmailPrimary !== undefined) patch.coupleEmailPrimary = d.coupleEmailPrimary.trim();
  if (d.couplePhonePrimary !== undefined)
    patch.couplePhonePrimary = d.couplePhonePrimary.trim() || null;
  if (d.preferredLanguage !== undefined) patch.preferredLanguage = d.preferredLanguage;

  if (d.weddingDate !== undefined) patch.weddingDate = new Date(`${d.weddingDate}T00:00:00Z`);
  if (d.venueName !== undefined) patch.venueName = d.venueName.trim();
  if (d.venueCity !== undefined) patch.venueCity = d.venueCity.trim() || null;
  if (d.venueAddress !== undefined) patch.venueAddress = d.venueAddress.trim() || null;

  if (d.packName !== undefined) patch.packName = d.packName.trim();
  if (d.packDescription !== undefined) patch.packDescription = d.packDescription.trim() || null;
  if (d.packIncludes !== undefined) patch.packIncludes = parseLines(d.packIncludes);
  if (d.packExcludes !== undefined) patch.packExcludes = parseLines(d.packExcludes);
  if (d.packAddons !== undefined) patch.packAddons = parseAddons(d.packAddons);
  if (d.packPriceEuros !== undefined)
    patch.packPriceCents = Math.round(parseFloat(d.packPriceEuros.replace(',', '.')) * 100);
  if (d.depositEuros !== undefined)
    patch.depositCents = Math.round(parseFloat(d.depositEuros.replace(',', '.')) * 100);
  if (d.paymentTerms !== undefined) patch.paymentTerms = d.paymentTerms.trim() || null;

  if (d.customIntro !== undefined) patch.customIntro = d.customIntro.trim() || null;

  // Flagship video: empty string means "go back to default" → null.
  if (d.flagshipVideoId !== undefined) patch.flagshipVideoId = d.flagshipVideoId.trim() || null;

  // Testimonial: any of the three fields touching → rebuild the object.
  // A single empty `testimonialQuote` field clears it.
  if (
    d.testimonialQuote !== undefined ||
    d.testimonialAuthor !== undefined ||
    d.testimonialContext !== undefined
  ) {
    const q = (d.testimonialQuote ?? '').trim();
    const a = (d.testimonialAuthor ?? '').trim();
    if (!q && !a) patch.referenceTestimonial = null;
    else if (q && a)
      patch.referenceTestimonial = {
        quote: q,
        author: a,
        context: (d.testimonialContext ?? '').trim() || undefined,
      };
    // partial input → ignore (don't half-update)
  }

  if (d.expiresAt !== undefined) {
    patch.expiresAt = d.expiresAt.length > 0 ? new Date(`${d.expiresAt}T23:59:59Z`) : null;
  }

  await updateBooking(id, patch);
  return back('?ok=updated');
};

const RANK: Record<BookingStatus, number> = {
  draft: 0,
  sent: 1,
  viewed: 2,
  form_submitted: 3,
  archived: 99,
};
function rank(s: BookingStatus): number {
  return RANK[s];
}
