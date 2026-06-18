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
  BookingKind,
  BookingStatus,
  Lang,
  PackAddon,
  PublicationChannel,
  ServiceType,
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

/** Narrow JSON parse for checklist_state — only keeps `key: string` pairs.
 *  An empty or malformed cell normalises to {}. */
function parseChecklistJson(raw: unknown): Record<string, string> {
  if (typeof raw !== 'string' || raw.length === 0) return {};
  try {
    const v = JSON.parse(raw);
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {};
    const out: Record<string, string> = {};
    for (const [k, value] of Object.entries(v)) {
      if (typeof value === 'string') out[k] = value;
    }
    return out;
  } catch {
    return {};
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
    source: row.source ? String(row.source) : null,
    kind: ((row.kind as BookingKind) || 'own') as BookingKind,
    collaboratorName: row.collaborator_name ? String(row.collaborator_name) : null,
    serviceType: (row.service_type as ServiceType | null) || null,

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
    internalNotes: row.internal_notes ? String(row.internal_notes) : null,
    referenceTestimonial: safeParseJson<ReferenceTestimonial | null>(
      row.reference_testimonial,
      null,
    ),
    flagshipVideoId: row.flagship_video_id ? String(row.flagship_video_id) : null,

    discountCents: Number(row.discount_cents ?? 0),

    incentiveBody: row.incentive_body ? String(row.incentive_body) : null,
    incentiveOriginalPriceCents:
      row.incentive_original_price_cents == null
        ? null
        : Number(row.incentive_original_price_cents) || null,
    incentiveDeadline: fromIso(row.incentive_deadline),

    status: String(row.status) as BookingStatus,
    expiresAt: fromIso(row.expires_at),

    createdAt: fromIso(row.created_at) ?? new Date(),
    updatedAt: fromIso(row.updated_at) ?? new Date(),
    firstViewedAt: fromIso(row.first_viewed_at),
    formSubmittedAt: fromIso(row.form_submitted_at),
    depositPaidAt: fromIso(row.deposit_paid_at),
    contractReadyAt: fromIso(row.contract_ready_at),
    contractAcceptedAt: fromIso(row.contract_accepted_at),
    contractAcceptedIp: row.contract_accepted_ip ? String(row.contract_accepted_ip) : null,
    facturadirectaInvoiceId: row.facturadirecta_invoice_id
      ? String(row.facturadirecta_invoice_id)
      : null,
    facturadirectaInvoiceNumber: row.facturadirecta_invoice_number
      ? String(row.facturadirecta_invoice_number)
      : null,
    fotostudioProjectId:
      row.fotostudio_project_id == null
        ? null
        : Number(row.fotostudio_project_id) || null,
    cancelledAt: fromIso(row.cancelled_at),
    cancellationReason: row.cancellation_reason ? String(row.cancellation_reason) : null,
    cancellationRetainedCents:
      row.cancellation_retained_cents != null ? Number(row.cancellation_retained_cents) : null,
    cancellationSignedAt: fromIso(row.cancellation_signed_at),
    cancellationSignedIp: row.cancellation_signed_ip ? String(row.cancellation_signed_ip) : null,
    checklistState: parseChecklistJson(row.checklist_state),
    preweddingTelegramSentAt: fromIso(row.prewedding_telegram_sent_at),
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
    billingContact: (row.billing_contact as 'c1' | 'c2' | null) ?? null,

    weddingDateConfirmed: toBool(row.wedding_date_confirmed),
    weddingDateAlt: fromIso(row.wedding_date_alt),
    venueConfirmed: toBool(row.venue_confirmed),
    venueAltName: row.venue_alt_name ? String(row.venue_alt_name) : null,
    ceremonyTime: row.ceremony_time ? String(row.ceremony_time) : null,
    serviceEndTime: row.service_end_time ? String(row.service_end_time) : null,
    guestCountEstimate:
      row.guest_count_estimate != null ? Number(row.guest_count_estimate) : null,
    weddingTimeSlot: (row.wedding_time_slot as BookingFormResponse['weddingTimeSlot']) ?? null,

    preferredCommunication: (row.preferred_communication as BookingFormResponse['preferredCommunication']) ?? null,
    preferredLanguage: (row.preferred_language as Lang | null) ?? null,
    preferredPaymentMethod: (row.preferred_payment_method as BookingFormResponse['preferredPaymentMethod']) ?? null,

    howDidYouFindUs: row.how_did_you_find_us ? String(row.how_did_you_find_us) : null,
    importantNotes: row.important_notes ? String(row.important_notes) : null,

    submittedAt: fromIso(row.submitted_at) ?? new Date(),
    ipAddress: row.ip_address ? String(row.ip_address) : null,
    userAgent: row.user_agent ? String(row.user_agent) : null,

    languageBetween: row.language_between ? String(row.language_between) : null,
    ceremonyLocationText: row.ceremony_location_text ? String(row.ceremony_location_text) : null,
    receptionLocationText: row.reception_location_text ? String(row.reception_location_text) : null,
    ceremonyType: (row.ceremony_type as BookingFormResponse['ceremonyType']) ?? null,
    ceremonyTypeOther: row.ceremony_type_other ? String(row.ceremony_type_other) : null,
    firstLook: (row.first_look as BookingFormResponse['firstLook']) ?? null,
    publicationConsent: safeParseJson<PublicationChannel[] | null>(row.publication_consent, null),
    gdprAcceptedAt: fromIso(row.gdpr_accepted_at),
    c1PrepAddress: row.c1_prep_address ? String(row.c1_prep_address) : null,
    c2PrepAddress: row.c2_prep_address ? String(row.c2_prep_address) : null,
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
      source, kind, collaborator_name, service_type,
      wedding_date, venue_name, venue_city, venue_address,
      pack_name, pack_description, pack_includes, pack_excludes, pack_addons,
      pack_price_cents, deposit_cents, payment_terms,
      custom_intro, internal_notes, reference_testimonial, flagship_video_id,
      discount_cents,
      incentive_body, incentive_original_price_cents, incentive_deadline,
      status, expires_at,
      created_at, updated_at
    ) VALUES (
      ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?,
      ?, ?, ?,
      'draft', ?,
      ?, ?
    )`,
    args: [
      id, slug,
      input.coupleName1, input.coupleName2, input.coupleEmailPrimary,
      input.couplePhonePrimary ?? null, input.preferredLanguage ?? 'ca',
      input.source ?? null, input.kind ?? 'own', input.collaboratorName ?? null, input.serviceType ?? null,
      weddingDateIso, input.venueName, input.venueCity ?? null, input.venueAddress ?? null,
      input.packName, input.packDescription ?? null,
      JSON.stringify(input.packIncludes ?? []),
      JSON.stringify(input.packExcludes ?? []),
      JSON.stringify(input.packAddons ?? []),
      input.packPriceCents, input.depositCents, input.paymentTerms ?? null,
      input.customIntro ?? null,
      input.internalNotes ?? null,
      input.referenceTestimonial ? JSON.stringify(input.referenceTestimonial) : null,
      input.flagshipVideoId ?? null,
      input.discountCents ?? 0,
      input.incentiveBody ?? null,
      input.incentiveOriginalPriceCents ?? null,
      toIso(input.incentiveDeadline ?? null),
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

/** Non-archived bookings whose wedding falls within the next `withinDays`
 *  days (inclusive of today) and that haven't had the pre-wedding Telegram
 *  digest sent yet. Drives the cron sweep that fires ~2 days before each
 *  wedding. `todayYmd` is the cron's notion of "today" (UTC YYYY-MM-DD). */
export async function listBookingsForPreweddingDigest(
  todayYmd: string,
  withinDays: number,
): Promise<Booking[]> {
  await initSchema();
  const until = new Date(`${todayYmd}T00:00:00Z`);
  until.setUTCDate(until.getUTCDate() + withinDays);
  const untilYmd = until.toISOString().slice(0, 10);
  const res = await db.execute({
    sql: `SELECT * FROM bookings
          WHERE status != 'archived'
            AND prewedding_telegram_sent_at IS NULL
            AND substr(wedding_date, 1, 10) >= ?
            AND substr(wedding_date, 1, 10) <= ?
          ORDER BY wedding_date ASC`,
    args: [todayYmd, untilYmd],
  });
  return res.rows.map((r) => rowToBooking(r as unknown as Record<string, unknown>));
}

/** Stamp the pre-wedding Telegram digest as sent (once-only guard). */
export async function markPreweddingTelegramSent(bookingId: string): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE bookings SET prewedding_telegram_sent_at = ? WHERE id = ?',
    args: [nowIso(), bookingId],
  });
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
  source: string | null;
  kind: BookingKind;
  collaboratorName: string | null;
  serviceType: ServiceType | null;
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
  internalNotes: string | null;
  referenceTestimonial: ReferenceTestimonial | null;
  flagshipVideoId: string | null;
  discountCents: number;
  incentiveBody: string | null;
  incentiveOriginalPriceCents: number | null;
  incentiveDeadline: Date | null;
  expiresAt: Date | null;
}>;

const COLUMN_FOR: Record<keyof BookingUpdate, string> = {
  coupleName1: 'couple_name_1',
  coupleName2: 'couple_name_2',
  coupleEmailPrimary: 'couple_email_primary',
  couplePhonePrimary: 'couple_phone_primary',
  preferredLanguage: 'preferred_language',
  source: 'source',
  kind: 'kind',
  collaboratorName: 'collaborator_name',
  serviceType: 'service_type',
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
  internalNotes: 'internal_notes',
  referenceTestimonial: 'reference_testimonial',
  flagshipVideoId: 'flagship_video_id',
  discountCents: 'discount_cents',
  incentiveBody: 'incentive_body',
  incentiveOriginalPriceCents: 'incentive_original_price_cents',
  incentiveDeadline: 'incentive_deadline',
  expiresAt: 'expires_at',
};

const JSON_FIELDS: Set<keyof BookingUpdate> = new Set([
  'packIncludes',
  'packExcludes',
  'packAddons',
  'referenceTestimonial',
]);
const DATE_FIELDS: Set<keyof BookingUpdate> = new Set([
  'weddingDate',
  'expiresAt',
  'incentiveDeadline',
]);

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

/** Publication consent for every booking that has a form response, in one
 *  query — for the bookings-list badge/filter. Returns a Map keyed by
 *  booking_id with the latest response's consent (null when the /contrato
 *  step isn't done). Bookings without any form response are simply absent
 *  from the map (caller treats that as "pending"). */
export async function listPublicationConsentByBooking(): Promise<Map<string, PublicationChannel[] | null>> {
  await initSchema();
  const res = await db.execute(
    `SELECT booking_id, publication_consent, submitted_at
       FROM booking_form_responses
      ORDER BY submitted_at ASC`,
  );
  // Iterating ASC and overwriting leaves the latest response per booking.
  const out = new Map<string, PublicationChannel[] | null>();
  for (const r of res.rows) {
    const row = r as unknown as Record<string, unknown>;
    out.set(String(row.booking_id), safeParseJson<PublicationChannel[] | null>(row.publication_consent, null));
  }
  return out;
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
  billingContact?: 'c1' | 'c2' | null;

  weddingDateConfirmed: boolean;
  weddingDateAlt?: Date | null;
  venueConfirmed: boolean;
  venueAltName?: string | null;
  ceremonyTime?: string | null;
  serviceEndTime?: string | null;
  guestCountEstimate?: number | null;
  weddingTimeSlot?: 'morning' | 'afternoon' | null;

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
          billing_address_same, billing_name, billing_dni, billing_address, billing_contact,
          wedding_date_confirmed, wedding_date_alt, venue_confirmed, venue_alt_name,
          ceremony_time, service_end_time, guest_count_estimate, wedding_time_slot,
          preferred_communication, preferred_language, preferred_payment_method,
          how_did_you_find_us, important_notes,
          submitted_at, ip_address, user_agent
        ) VALUES (
          ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?,
          ?, ?,
          ?, ?, ?
        )`,
        args: [
          id, input.bookingId,
          input.c1FullName, input.c1Dni, toIso(input.c1BirthDate ?? null), input.c1Address, input.c1Email, input.c1Phone,
          input.c2FullName, input.c2Dni, toIso(input.c2BirthDate ?? null), input.c2Address, input.c2Email, input.c2Phone,
          toBoolInt(input.billingAddressSame),
          input.billingName ?? null, input.billingDni ?? null, input.billingAddress ?? null, input.billingContact ?? null,
          toBoolInt(input.weddingDateConfirmed, true),
          toIso(input.weddingDateAlt ?? null),
          toBoolInt(input.venueConfirmed, true),
          input.venueAltName ?? null,
          input.ceremonyTime ?? null, input.serviceEndTime ?? null, input.guestCountEstimate ?? null, input.weddingTimeSlot ?? null,
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

// ─── /contrato post-deposit flow ─────────────────────────────────────────

/** Mark the deposit as received. Idempotent (sets the timestamp only the
 *  first time). Called from /admin when the operator confirms the bank
 *  transfer / contract platform reports the deposit cleared. */
export async function markDepositPaid(bookingId: string): Promise<void> {
  await initSchema();
  const now = nowIso();
  await db.execute({
    sql: `UPDATE bookings
          SET deposit_paid_at = COALESCE(deposit_paid_at, ?)
          WHERE id = ?`,
    args: [now, bookingId],
  });
}

/** Persist the FacturaDirecta deposit-invoice reference on a booking. Called
 *  after a successful invoice issue; the id then gates re-invoicing. */
export async function setFacturadirectaInvoice(
  bookingId: string,
  invoiceId: string,
  invoiceNumber?: string | null,
): Promise<void> {
  await initSchema();
  await db.execute({
    sql: `UPDATE bookings
          SET facturadirecta_invoice_id = ?, facturadirecta_invoice_number = ?
          WHERE id = ?`,
    args: [invoiceId, invoiceNumber ?? null, bookingId],
  });
}

/** Record the couple's electronic acceptance of the contract. Idempotent:
 *  only stamps if not already accepted (first acceptance wins). Returns
 *  true if it set the acceptance now, false if it was already accepted. */
export async function markContractAccepted(bookingId: string, ip: string | null): Promise<boolean> {
  await initSchema();
  const now = nowIso();
  const res = await db.execute({
    sql: `UPDATE bookings
          SET contract_accepted_at = ?, contract_accepted_ip = ?
          WHERE id = ? AND contract_accepted_at IS NULL`,
    args: [now, ip, bookingId],
  });
  return (res.rowsAffected ?? 0) > 0;
}

/** Record the FotoStudio project id the booking was pushed to. Set
 *  once at /reserva submit time so /contrato submit can later update the
 *  same project's description with the publication-consent block. */
export async function setFotostudioProjectId(
  bookingId: string,
  projectId: number,
): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE bookings SET fotostudio_project_id = ? WHERE id = ?',
    args: [projectId, bookingId],
  });
}

/** Clear the deposit flag (admin un-marks). Also clears every downstream
 *  stamp that doesn't make sense without a paid deposit: contract data,
 *  contract acceptance, and the FacturaDirecta invoice reference (so
 *  re-marking later re-issues correctly). The invoice ITSELF is NOT
 *  deleted from FacturaDirecta — that's intentional, the operator must
 *  void or credit-note it manually if needed. */
export async function unmarkDepositPaid(bookingId: string): Promise<void> {
  await initSchema();
  await db.execute({
    sql: `UPDATE bookings
          SET deposit_paid_at = NULL,
              contract_ready_at = NULL,
              contract_accepted_at = NULL,
              contract_accepted_ip = NULL,
              facturadirecta_invoice_id = NULL,
              facturadirecta_invoice_number = NULL
          WHERE id = ?`,
    args: [bookingId],
  });
}

// ─── Payments ledger (operator bookkeeping) ──────────────────────────────────
export interface BookingPayment {
  id: string;
  bookingId: string;
  amountCents: number;
  /** YYYY-MM-DD, or null if not specified. */
  paidOn: string | null;
  method: string | null;
  note: string | null;
  createdAt: Date;
}

export interface PaymentCreateInput {
  bookingId: string;
  amountCents: number;
  paidOn?: string | null;
  method?: string | null;
  note?: string | null;
}

export async function listPayments(bookingId: string): Promise<BookingPayment[]> {
  await initSchema();
  const res = await db.execute({
    sql: `SELECT * FROM booking_payments WHERE booking_id = ?
          ORDER BY COALESCE(paid_on, created_at) ASC, created_at ASC`,
    args: [bookingId],
  });
  return res.rows.map((row) => ({
    id: String(row.id),
    bookingId: String(row.booking_id),
    amountCents: Number(row.amount_cents),
    paidOn: row.paid_on ? String(row.paid_on) : null,
    method: row.method ? String(row.method) : null,
    note: row.note ? String(row.note) : null,
    createdAt: fromIso(row.created_at) ?? new Date(),
  }));
}

export async function addPayment(input: PaymentCreateInput): Promise<string> {
  await initSchema();
  const id = randomUUID();
  await db.execute({
    sql: `INSERT INTO booking_payments (id, booking_id, amount_cents, paid_on, method, note, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.bookingId,
      input.amountCents,
      input.paidOn ?? null,
      input.method ?? null,
      input.note ?? null,
      nowIso(),
    ],
  });
  return id;
}

/** Delete a payment, scoped by booking so a stray id can't touch another row. */
export async function deletePayment(paymentId: string, bookingId: string): Promise<void> {
  await initSchema();
  await db.execute({
    sql: `DELETE FROM booking_payments WHERE id = ? AND booking_id = ?`,
    args: [paymentId, bookingId],
  });
}

// ─── Change log: date / price addendums ──────────────────────────────────────
export interface BookingChange {
  id: string;
  bookingId: string;
  /** YYYY-MM-DD or null when the date wasn't part of this change. */
  oldWeddingDate: string | null;
  newWeddingDate: string | null;
  oldPriceCents: number | null;
  newPriceCents: number | null;
  note: string | null;
  createdAt: Date;
}

export interface BookingChangeCreateInput {
  bookingId: string;
  oldWeddingDate?: string | null;
  newWeddingDate?: string | null;
  oldPriceCents?: number | null;
  newPriceCents?: number | null;
  note?: string | null;
}

function hydrateChange(row: Record<string, unknown>): BookingChange {
  return {
    id: String(row.id),
    bookingId: String(row.booking_id),
    oldWeddingDate: row.old_wedding_date ? String(row.old_wedding_date) : null,
    newWeddingDate: row.new_wedding_date ? String(row.new_wedding_date) : null,
    oldPriceCents: row.old_price_cents != null ? Number(row.old_price_cents) : null,
    newPriceCents: row.new_price_cents != null ? Number(row.new_price_cents) : null,
    note: row.note ? String(row.note) : null,
    createdAt: fromIso(row.created_at) ?? new Date(),
  };
}

export async function addBookingChange(input: BookingChangeCreateInput): Promise<string> {
  await initSchema();
  const id = randomUUID();
  await db.execute({
    sql: `INSERT INTO booking_changes
            (id, booking_id, old_wedding_date, new_wedding_date, old_price_cents, new_price_cents, note, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.bookingId,
      input.oldWeddingDate ?? null,
      input.newWeddingDate ?? null,
      input.oldPriceCents ?? null,
      input.newPriceCents ?? null,
      input.note ?? null,
      nowIso(),
    ],
  });
  return id;
}

export async function listBookingChanges(bookingId: string): Promise<BookingChange[]> {
  await initSchema();
  const res = await db.execute({
    sql: `SELECT * FROM booking_changes WHERE booking_id = ? ORDER BY created_at DESC`,
    args: [bookingId],
  });
  return res.rows.map((r) => hydrateChange(r as Record<string, unknown>));
}

export async function getBookingChange(id: string, bookingId: string): Promise<BookingChange | null> {
  await initSchema();
  const res = await db.execute({
    sql: `SELECT * FROM booking_changes WHERE id = ? AND booking_id = ?`,
    args: [id, bookingId],
  });
  const row = res.rows[0];
  return row ? hydrateChange(row as Record<string, unknown>) : null;
}

// ─── Cancellation (Fase B) ───────────────────────────────────────────────────
export async function cancelBooking(
  id: string,
  opts: { reason?: string | null; retainedCents?: number | null } = {},
): Promise<void> {
  await initSchema();
  await db.execute({
    sql: `UPDATE bookings
          SET cancelled_at = ?, cancellation_reason = ?, cancellation_retained_cents = ?
          WHERE id = ?`,
    args: [nowIso(), opts.reason ?? null, opts.retainedCents ?? null, id],
  });
}

/** Undo a cancellation (operator mistake). Clears all cancellation fields. */
export async function uncancelBooking(id: string): Promise<void> {
  await initSchema();
  await db.execute({
    sql: `UPDATE bookings
          SET cancelled_at = NULL, cancellation_reason = NULL,
              cancellation_retained_cents = NULL,
              cancellation_signed_at = NULL, cancellation_signed_ip = NULL
          WHERE id = ?`,
    args: [id],
  });
}

/** Record the couple's e-signature of the cancellation agreement. Idempotent:
 *  returns true only the first time (so the caller can email a copy once). */
export async function markCancellationSigned(id: string, ip: string | null): Promise<boolean> {
  await initSchema();
  const existing = await getBookingById(id);
  if (!existing || !existing.cancelledAt) return false;
  if (existing.cancellationSignedAt) return false;
  await db.execute({
    sql: `UPDATE bookings SET cancellation_signed_at = ?, cancellation_signed_ip = ? WHERE id = ?`,
    args: [nowIso(), ip ?? null, id],
  });
  return true;
}

export interface ContractDataInput {
  bookingId: string;
  languageBetween?: string | null;
  ceremonyLocationText: string;
  receptionLocationText: string;
  ceremonyType: 'civil' | 'religious' | 'other';
  ceremonyTypeOther?: string | null;
  firstLook: 'yes' | 'no' | 'not_sure';
  publicationConsent: PublicationChannel[];
  gdprAcceptedAt: Date;
  c1PrepAddress?: string | null;
  c2PrepAddress?: string | null;
}

/** Update the booking_form_responses row with /contrato data and stamp
 *  bookings.contract_ready_at in a single batch. Requires a pre-existing
 *  form response row (the couple must have submitted /reserva first). */
export async function submitContractData(input: ContractDataInput): Promise<void> {
  await initSchema();
  const now = nowIso();

  await db.batch(
    [
      {
        sql: `UPDATE booking_form_responses
              SET language_between = ?,
                  ceremony_location_text = ?,
                  reception_location_text = ?,
                  ceremony_type = ?,
                  ceremony_type_other = ?,
                  first_look = ?,
                  publication_consent = ?,
                  gdpr_accepted_at = ?,
                  c1_prep_address = ?,
                  c2_prep_address = ?
              WHERE booking_id = ?`,
        args: [
          input.languageBetween ?? null,
          input.ceremonyLocationText,
          input.receptionLocationText,
          input.ceremonyType,
          input.ceremonyType === 'other' ? (input.ceremonyTypeOther ?? null) : null,
          input.firstLook,
          JSON.stringify(input.publicationConsent),
          toIso(input.gdprAcceptedAt),
          input.c1PrepAddress ?? null,
          input.c2PrepAddress ?? null,
          input.bookingId,
        ],
      },
      {
        sql: `UPDATE bookings SET contract_ready_at = ? WHERE id = ?`,
        args: [now, input.bookingId],
      },
    ],
    'write',
  );
}

/** Hard-delete a booking and ALL its dependents. Irreversible. Use only
 *  for cleanup of test/demo data — archiving (status='archived') is
 *  preferred for real bookings because it keeps the historical record
 *  AND the FacturaDirecta invoice link.
 *
 *  We delete the dependent rows explicitly (in a transactional batch)
 *  rather than relying purely on `ON DELETE CASCADE`: older deployments
 *  may have tables that pre-date the CASCADE clause being added, and
 *  before this fix the database also wasn't enforcing FKs at all
 *  (`PRAGMA foreign_keys=ON` is now set in initSchema). Belt + braces
 *  keeps cleanup reliable regardless of when the DB was first created. */
export async function deleteBooking(bookingId: string): Promise<void> {
  await initSchema();
  await db.batch(
    [
      { sql: 'DELETE FROM booking_form_responses WHERE booking_id = ?', args: [bookingId] },
      { sql: 'DELETE FROM bookings WHERE id = ?', args: [bookingId] },
    ],
    'write',
  );
}

/** Update one checklist item for a booking. `checked=true` stamps the
 *  current ISO timestamp; `checked=false` removes the key. Returns the
 *  fresh full state so the caller can re-render without a second read. */
export async function setBookingChecklistItem(
  bookingId: string,
  key: string,
  checked: boolean,
): Promise<Record<string, string>> {
  await initSchema();
  const current = await db.execute({
    sql: 'SELECT checklist_state FROM bookings WHERE id = ?',
    args: [bookingId],
  });
  const row = current.rows[0];
  if (!row) throw new Error('booking_not_found');
  const state = parseChecklistJson(row.checklist_state);
  if (checked) {
    state[key] = new Date().toISOString();
  } else {
    delete state[key];
  }
  await db.execute({
    sql: 'UPDATE bookings SET checklist_state = ? WHERE id = ?',
    args: [JSON.stringify(state), bookingId],
  });
  return state;
}
