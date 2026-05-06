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

/** Partial update for the editable fields of a booking. Slug, id, status,
 *  timestamps and tracking fields are deliberately NOT exposed here — those
 *  have their own helpers (markBookingViewed, setBookingStatus) so the call
 *  sites stay obvious. JSON fields are serialised internally. */
export type BookingUpdate = Partial<{
  coupleName1: string;
  coupleName2: string;
  coupleEmailPrimary: string;
  couplePhonePrimary: string | null;
  preferredLanguage: Lang;
  weddingDate: Date;
  venueName: string;
  venueCity: string | null;
  venueAddress: string | null;
  packName: string;
  packDescription: string | null;
  packIncludes: string[];
  packExcludes: string[];
  packAddons: PackAddon[];
  packPriceCents: number;
  depositCents: number;
  paymentTerms: string | null;
  customIntro: string | null;
  referenceTestimonial: ReferenceTestimonial | null;
  expiresAt: Date | null;
}>;

const COLUMN_FOR: Record<keyof BookingUpdate, string> = {
  coupleName1: 'couple_name_1',
  coupleName2: 'couple_name_2',
  coupleEmailPrimary: 'couple_email_primary',
  couplePhonePrimary: 'couple_phone_primary',
  preferredLanguage: 'preferred_language',
  weddingDate: 'wedding_date',
  venueName: 'venue_name',
  venueCity: 'venue_city',
  venueAddress: 'venue_address',
  packName: 'pack_name',
  packDescription: 'pack_description',
  packIncludes: 'pack_includes',
  packExcludes: 'pack_excludes',
  packAddons: 'pack_addons',
  packPriceCents: 'pack_price_cents',
  depositCents: 'deposit_cents',
  paymentTerms: 'payment_terms',
  customIntro: 'custom_intro',
  referenceTestimonial: 'reference_testimonial',
  expiresAt: 'expires_at',
};

const JSON_FIELDS: Set<keyof BookingUpdate> = new Set([
  'packIncludes',
  'packExcludes',
  'packAddons',
  'referenceTestimonial',
]);
const DATE_FIELDS: Set<keyof BookingUpdate> = new Set(['weddingDate', 'expiresAt']);

export async function updateBooking(id: string, patch: BookingUpdate): Promise<void> {
  await initSchema();
  const setClauses: string[] = [];
  const args: (string | number | null)[] = [];

  for (const [key, value] of Object.entries(patch) as [keyof BookingUpdate, unknown][]) {
    if (value === undefined) continue;
    const column = COLUMN_FOR[key];
    setClauses.push(`${column} = ?`);

    if (value === null) {
      args.push(null);
    } else if (JSON_FIELDS.has(key)) {
      args.push(JSON.stringify(value));
    } else if (DATE_FIELDS.has(key)) {
      const d = value as Date;
      // weddingDate stored as YYYY-MM-DD; expiresAt as full ISO.
      args.push(key === 'weddingDate' ? d.toISOString().slice(0, 10) : d.toISOString());
    } else {
      args.push(value as string | number);
    }
  }

  if (setClauses.length === 0) return; // No-op patch.

  args.push(id);
  await db.execute({
    sql: `UPDATE bookings SET ${setClauses.join(', ')} WHERE id = ?`,
    args,
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

/** Input shape for creating a form response (matches the public form
 *  exactly). Repository validates structure but NOT business rules — that
 *  belongs in the API endpoint (DNI regex, idempotency, etc.). */
export interface FormResponseCreateInput {
  bookingId: string;

  c1FullName: string;
  c1Dni: string;
  c1BirthDate?: Date | null;
  c1Address: string;
  c1Email: string;
  c1Phone: string;

  c2FullName: string;
  c2Dni: string;
  c2BirthDate?: Date | null;
  c2Address: string;
  c2Email: string;
  c2Phone: string;

  billingAddressSame: boolean;
  billingName?: string | null;
  billingDni?: string | null;
  billingAddress?: string | null;

  weddingDateConfirmed: boolean;
  weddingDateAlt?: Date | null;
  venueConfirmed: boolean;
  venueAltName?: string | null;
  ceremonyTime?: string | null;
  serviceEndTime?: string | null;
  guestCountEstimate?: number | null;

  preferredCommunication?: 'email' | 'whatsapp' | 'phone' | null;
  preferredLanguage?: Lang | null;
  preferredPaymentMethod?: 'card' | 'transfer' | null;

  howDidYouFindUs?: string | null;
  importantNotes?: string | null;

  ipAddress?: string | null;
  userAgent?: string | null;
}

/** Insert a form response AND transition the parent booking to
 *  'form_submitted' in a single libSQL batch (the closest thing we have to
 *  a transaction here). If either statement fails, neither commits.
 *
 *  Returns the booking.id whose form was recorded (for symmetry — caller
 *  already has it but it makes the flow obvious). */
export async function createFormResponse(input: FormResponseCreateInput): Promise<string> {
  await initSchema();
  const id = randomUUID();
  const now = nowIso();

  await db.batch(
    [
      {
        sql: `INSERT INTO booking_form_responses (
          id, booking_id,
          c1_full_name, c1_dni, c1_birth_date, c1_address, c1_email, c1_phone,
          c2_full_name, c2_dni, c2_birth_date, c2_address, c2_email, c2_phone,
          billing_address_same, billing_name, billing_dni, billing_address,
          wedding_date_confirmed, wedding_date_alt, venue_confirmed, venue_alt_name,
          ceremony_time, service_end_time, guest_count_estimate,
          preferred_communication, preferred_language, preferred_payment_method,
          how_did_you_find_us, important_notes,
          submitted_at, ip_address, user_agent
        ) VALUES (
          ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?,
          ?, ?, ?
        )`,
        args: [
          id, input.bookingId,
          input.c1FullName, input.c1Dni, toIso(input.c1BirthDate ?? null), input.c1Address, input.c1Email, input.c1Phone,
          input.c2FullName, input.c2Dni, toIso(input.c2BirthDate ?? null), input.c2Address, input.c2Email, input.c2Phone,
          toBoolInt(input.billingAddressSame),
          input.billingName ?? null, input.billingDni ?? null, input.billingAddress ?? null,
          toBoolInt(input.weddingDateConfirmed, true),
          toIso(input.weddingDateAlt ?? null),
          toBoolInt(input.venueConfirmed, true),
          input.venueAltName ?? null,
          input.ceremonyTime ?? null, input.serviceEndTime ?? null, input.guestCountEstimate ?? null,
          input.preferredCommunication ?? null, input.preferredLanguage ?? null, input.preferredPaymentMethod ?? null,
          input.howDidYouFindUs ?? null, input.importantNotes ?? null,
          now, input.ipAddress ?? null, input.userAgent ?? null,
        ],
      },
      {
        sql: `UPDATE bookings
              SET status = 'form_submitted', form_submitted_at = ?
              WHERE id = ?`,
        args: [now, input.bookingId],
      },
    ],
    'write',
  );

  return id;
}
