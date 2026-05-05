// CRUD layer for bookings + booking_form_responses.
//
// Conventions:
//   - All dates leave the repository as JS Date (or null). They go in as
//     ISO-8601 TEXT.
//   - All JSON fields (packIncludes/Excludes/Addons, referenceTestimonial)
//     leave the repository hydrated. They go in as JSON.stringify and come
//     out via safeParseJson() with a default fallback.
//   - Booleans are stored as INTEGER 0/1.
//   - The repository never throws on read of a single missing row; it returns
//     null. Callers decide whether that's a 404 or something else.

import { randomUUID } from 'node:crypto';
import { db, initSchema } from '../db';
import { generateBookingSlug } from './slug';
import type {
  Booking,
  BookingCreateInput,
  BookingFormResponse,
  BookingStatus,
  Lang,
  PackAddon,
  ReferenceTestimonial,
} from './types';

// ─── Helpers ─────────────────────────────────────────────────────────────
const nowIso = () => new Date().toISOString();
const toIso = (d: Date | null | undefined): string | null => (d ? d.toISOString() : null);
const fromIso = (s: unknown): Date | null => {
  if (typeof s !== 'string' || s.length === 0) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
};
const toBool = (n: unknown): boolean => Number(n) === 1;
const toBoolInt = (b: boolean | undefined, defaultTrue = false): number =>
  (b ?? defaultTrue) ? 1 : 0;

function safeParseJson<T>(raw: unknown, fallback: T): T {
  if (typeof raw !== 'string' || raw.length === 0) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// ─── Booking row → typed object ──────────────────────────────────────────
function rowToBooking(row: Record<string, unknown>): Booking {
  return {
    id: String(row.id),
    slug: String(row.slug),

    coupleName1: String(row.couple_name_1),
    coupleName2: String(row.couple_name_2),
    coupleEmailPrimary: String(row.couple_email_primary),
    couplePhonePrimary: row.couple_phone_primary ? String(row.couple_phone_primary) : null,
    preferredLanguage: String(row.preferred_language) as Lang,

    weddingDate: fromIso(row.wedding_date) ?? new Date(`${row.wedding_date}T00:00:00Z`),
    venueName: String(row.venue_name),
    venueCity: row.venue_city ? String(row.venue_city) : null,
    venueAddress: row.venue_address ? String(row.venue_address) : null,

    packName: String(row.pack_name),
    packDescription: row.pack_description ? String(row.pack_description) : null,
    packIncludes: safeParseJson<string[]>(row.pack_includes, []),
    packExcludes: safeParseJson<string[]>(row.pack_excludes, []),
    packAddons: safeParseJson<PackAddon[]>(row.pack_addons, []),
    packPriceCents: Number(row.pack_price_cents),
    depositCents: Number(row.deposit_cents),
    paymentTerms: row.payment_terms ? String(row.payment_terms) : null,

    customIntro: row.custom_intro ? String(row.custom_intro) : null,
    referenceTestimonial: safeParseJson<ReferenceTestimonial | null>(
      row.reference_testimonial,
      null,
    ),

    status: String(row.status) as BookingStatus,
    expiresAt: fromIso(row.expires_at),

    createdAt: fromIso(row.created_at) ?? new Date(),
    updatedAt: fromIso(row.updated_at) ?? new Date(),
    firstViewedAt: fromIso(row.first_viewed_at),
    formSubmittedAt: fromIso(row.form_submitted_at),
  };
}

function rowToFormResponse(row: Record<string, unknown>): BookingFormResponse {
  return {
    id: String(row.id),
    bookingId: String(row.booking_id),

    c1FullName: String(row.c1_full_name),
    c1Dni: String(row.c1_dni),
    c1BirthDate: fromIso(row.c1_birth_date),
    c1Address: String(row.c1_address),
    c1Email: String(row.c1_email),
    c1Phone: String(row.c1_phone),

    c2FullName: String(row.c2_full_name),
    c2Dni: String(row.c2_dni),
    c2BirthDate: fromIso(row.c2_birth_date),
    c2Address: String(row.c2_address),
    c2Email: String(row.c2_email),
    c2Phone: String(row.c2_phone),

    billingAddressSame: toBool(row.billing_address_same),
    billingName: row.billing_name ? String(row.billing_name) : null,
    billingDni: row.billing_dni ? String(row.billing_dni) : null,
    billingAddress: row.billing_address ? String(row.billing_address) : null,

    weddingDateConfirmed: toBool(row.wedding_date_confirmed),
    weddingDateAlt: fromIso(row.wedding_date_alt),
    venueConfirmed: toBool(row.venue_confirmed),
    venueAltName: row.venue_alt_name ? String(row.venue_alt_name) : null,
    ceremonyTime: row.ceremony_time ? String(row.ceremony_time) : null,
    serviceEndTime: row.service_end_time ? String(row.service_end_time) : null,
    guestCountEstimate:
      row.guest_count_estimate != null ? Number(row.guest_count_estimate) : null,

    preferredCommunication: (row.preferred_communication as BookingFormResponse['preferredCommunication']) ?? null,
    preferredLanguage: (row.preferred_language as Lang | null) ?? null,
    preferredPaymentMethod: (row.preferred_payment_method as BookingFormResponse['preferredPaymentMethod']) ?? null,

    howDidYouFindUs: row.how_did_you_find_us ? String(row.how_did_you_find_us) : null,
    importantNotes: row.important_notes ? String(row.important_notes) : null,

    submittedAt: fromIso(row.submitted_at) ?? new Date(),
    ipAddress: row.ip_address ? String(row.ip_address) : null,
    userAgent: row.user_agent ? String(row.user_agent) : null,
  };
}

// ─── Booking CRUD ────────────────────────────────────────────────────────

export async function createBooking(input: BookingCreateInput): Promise<Booking> {
  await initSchema();
  const id = randomUUID();
  const slug = await generateBookingSlug(input.coupleName1, input.coupleName2, input.weddingDate);
  const now = nowIso();
  const weddingDateIso = input.weddingDate.toISOString().slice(0, 10); // YYYY-MM-DD

  await db.execute({
    sql: `INSERT INTO bookings (
      id, slug,
      couple_name_1, couple_name_2, couple_email_primary, couple_phone_primary, preferred_language,
      wedding_date, venue_name, venue_city, venue_address,
      pack_name, pack_description, pack_includes, pack_excludes, pack_addons,
      pack_price_cents, deposit_cents, payment_terms,
      custom_intro, reference_testimonial,
      status, expires_at,
      created_at, updated_at
    ) VALUES (
      ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?,
      'draft', ?,
      ?, ?
    )`,
    args: [
      id, slug,
      input.coupleName1, input.coupleName2, input.coupleEmailPrimary,
      input.couplePhonePrimary ?? null, input.preferredLanguage ?? 'ca',
      weddingDateIso, input.venueName, input.venueCity ?? null, input.venueAddress ?? null,
      input.packName, input.packDescription ?? null,
      JSON.stringify(input.packIncludes ?? []),
      JSON.stringify(input.packExcludes ?? []),
      JSON.stringify(input.packAddons ?? []),
      input.packPriceCents, input.depositCents, input.paymentTerms ?? null,
      input.customIntro ?? null,
      input.referenceTestimonial ? JSON.stringify(input.referenceTestimonial) : null,
      toIso(input.expiresAt ?? null),
      now, now,
    ],
  });

  const created = await getBookingBySlug(slug);
  if (!created) throw new Error(`createBooking: insert succeeded but lookup failed for slug=${slug}`);
  return created;
}

export async function getBookingBySlug(slug: string): Promise<Booking | null> {
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT * FROM bookings WHERE slug = ? LIMIT 1',
    args: [slug],
  });
  const row = res.rows[0];
  return row ? rowToBooking(row as unknown as Record<string, unknown>) : null;
}

export async function getBookingById(id: string): Promise<Booking | null> {
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT * FROM bookings WHERE id = ? LIMIT 1',
    args: [id],
  });
  const row = res.rows[0];
  return row ? rowToBooking(row as unknown as Record<string, unknown>) : null;
}

export async function listBookings(opts: { includeArchived?: boolean } = {}): Promise<Booking[]> {
  await initSchema();
  const sql = opts.includeArchived
    ? 'SELECT * FROM bookings ORDER BY created_at DESC'
    : "SELECT * FROM bookings WHERE status != 'archived' ORDER BY created_at DESC";
  const res = await db.execute(sql);
  return res.rows.map((r) => rowToBooking(r as unknown as Record<string, unknown>));
}

/** Mark a booking as viewed (idempotent). Sets first_viewed_at the first
 *  time only. Only transitions sent → viewed; other statuses are a no-op. */
export async function markBookingViewed(slug: string): Promise<void> {
  await initSchema();
  const now = nowIso();
  await db.execute({
    sql: `UPDATE bookings
          SET status = 'viewed',
              first_viewed_at = COALESCE(first_viewed_at, ?)
          WHERE slug = ? AND status = 'sent'`,
    args: [now, slug],
  });
}

export async function setBookingStatus(id: string, status: BookingStatus): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE bookings SET status = ? WHERE id = ?',
    args: [status, id],
  });
}

// ─── Form responses ──────────────────────────────────────────────────────
export async function getFormResponseForBooking(
  bookingId: string,
): Promise<BookingFormResponse | null> {
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT * FROM booking_form_responses WHERE booking_id = ? ORDER BY submitted_at DESC LIMIT 1',
    args: [bookingId],
  });
  const row = res.rows[0];
  return row ? rowToFormResponse(row as unknown as Record<string, unknown>) : null;
}
