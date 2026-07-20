// Email-sequence engine.
//
// Two responsibilities:
//   1. Materialise (= schedule) the queue of follow-up emails for a
//      booking once it hits the trigger event (today: deposit paid).
//   2. Send everything that's due today, idempotently.
//
// Triggers supported (extensible via the `trigger_kind` CHECK constraint
// in db.ts): days_after_deposit, days_before_wedding, days_after_wedding.
//
// Sending is gated by RESEND_API_KEY (same as every other email path) and
// the per-row UNIQUE (booking_id, sequence_id) — re-running materialise on
// the same booking is safe.

import { randomUUID } from 'node:crypto';
import { db, initSchema } from '~/lib/db';
import { resend } from '~/lib/email';
import { getBookingById, getFormResponseForBooking } from '~/lib/bookings/repository';
import { inferServiceType } from '~/lib/contracts/generate';
import type { Booking, BookingFormResponse, Lang, ServiceType } from './types';
import { SITE } from '~/data/site';

const FROM_HELLO = process.env.EMAIL_FROM_HELLO ?? 'Lifetime Weddings <hola@lifetime.photo>';
const SITE_URL = process.env.PUBLIC_SITE_URL ?? SITE.url;

export type TriggerKind = 'days_after_deposit' | 'days_before_wedding' | 'days_after_wedding';
export type FormKind = 'timeline' | 'guest_list' | 'music' | 'wedding_details' | 'inspiration' | 'basic_info'; // expand as Eric adds forms

// Which couples a sequence targets, by service type:
//   'any'   — everyone (the default; pre-migration rows behave this way too)
//   'photo' — photo-only AND combo bookings
//   'video' — video-only AND combo bookings
//   'combo' — combo bookings only
// A combo booking therefore receives photo + video + common sequences (so
// nothing photo- or video-specific is missed); a 'combo'-scoped sequence is
// for things that ONLY make sense when both services are contracted.
export type ServiceScope = 'any' | 'photo' | 'video' | 'combo';

export interface EmailSequence {
  id: number;
  slug: string;
  enabled: boolean;
  triggerKind: TriggerKind;
  triggerOffsetDays: number;
  formKind: FormKind | null;
  serviceScope: ServiceScope;
  subject: Record<Lang, string>;
  bodyHtml: Record<Lang, string>;
  createdAt: Date;
  updatedAt: Date;
}

/** A booking's effective service type: the explicit override when set,
 *  otherwise inferred from the pack (same logic the contract uses). Used to
 *  decide which sequences a booking should receive. */
export function resolveBookingServiceType(booking: Booking): ServiceType {
  return booking.serviceType ?? inferServiceType(booking.packName, booking.packIncludes);
}

/** Does a sequence's scope apply to a booking of the given service type?
 *  Combo bookings match photo- and video-scoped sequences (they get both
 *  worlds); a combo-scoped sequence only fires for combo bookings. */
export function scopeMatchesService(scope: ServiceScope, service: ServiceType): boolean {
  switch (scope) {
    case 'any': return true;
    case 'photo': return service === 'photo' || service === 'combo';
    case 'video': return service === 'video' || service === 'combo';
    case 'combo': return service === 'combo';
  }
}

export interface EmailScheduleRow {
  id: number;
  bookingId: string;
  sequenceId: number;
  scheduledFor: string; // YYYY-MM-DD
  sentAt: Date | null;
  cancelledAt: Date | null;
  lastError: string | null;
  formToken: string | null;
  createdAt: Date;
}

function toIso(d: Date): string {
  return d.toISOString();
}
function fromIso(s: unknown): Date | null {
  if (typeof s !== 'string' || !s) return null;
  const d = new Date(s);
  return Number.isFinite(d.getTime()) ? d : null;
}
function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function mapSequence(r: Record<string, unknown>): EmailSequence {
  return {
    id: Number(r.id),
    slug: String(r.slug),
    enabled: Number(r.enabled) === 1,
    triggerKind: r.trigger_kind as TriggerKind,
    triggerOffsetDays: Number(r.trigger_offset_days),
    formKind: (r.form_kind as FormKind | null) || null,
    serviceScope: ((r.service_scope as ServiceScope) || 'any') as ServiceScope,
    subject: {
      ca: String(r.subject_ca ?? ''),
      es: String(r.subject_es ?? ''),
      en: String(r.subject_en ?? ''),
    },
    bodyHtml: {
      ca: String(r.body_html_ca ?? ''),
      es: String(r.body_html_es ?? ''),
      en: String(r.body_html_en ?? ''),
    },
    createdAt: fromIso(r.created_at) ?? new Date(),
    updatedAt: fromIso(r.updated_at) ?? new Date(),
  };
}

function mapSchedule(r: Record<string, unknown>): EmailScheduleRow {
  return {
    id: Number(r.id),
    bookingId: String(r.booking_id),
    sequenceId: Number(r.sequence_id),
    scheduledFor: String(r.scheduled_for),
    sentAt: fromIso(r.sent_at),
    cancelledAt: fromIso(r.cancelled_at),
    lastError: r.last_error ? String(r.last_error) : null,
    formToken: r.form_token ? String(r.form_token) : null,
    createdAt: fromIso(r.created_at) ?? new Date(),
  };
}

// ─── CRUD ─────────────────────────────────────────────────────────────────

export async function listSequences(includeDisabled = true): Promise<EmailSequence[]> {
  await initSchema();
  const res = await db.execute({
    sql: `SELECT * FROM email_sequences ${includeDisabled ? '' : 'WHERE enabled = 1'} ORDER BY trigger_kind, trigger_offset_days`,
    args: [],
  });
  return res.rows.map((r) => mapSequence(r as unknown as Record<string, unknown>));
}

export async function getSequenceById(id: number): Promise<EmailSequence | null> {
  await initSchema();
  const res = await db.execute({ sql: 'SELECT * FROM email_sequences WHERE id = ?', args: [id] });
  if (res.rows.length === 0) return null;
  return mapSequence(res.rows[0] as unknown as Record<string, unknown>);
}

export interface SequenceInput {
  slug: string;
  enabled?: boolean;
  triggerKind: TriggerKind;
  triggerOffsetDays: number;
  formKind?: FormKind | null;
  serviceScope?: ServiceScope;
  subject: Record<Lang, string>;
  bodyHtml: Record<Lang, string>;
}

export async function createSequence(input: SequenceInput): Promise<number> {
  await initSchema();
  const now = toIso(new Date());
  const res = await db.execute({
    sql: `INSERT INTO email_sequences (
        slug, enabled, trigger_kind, trigger_offset_days, form_kind, service_scope,
        subject_ca, subject_es, subject_en,
        body_html_ca, body_html_es, body_html_en,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      input.slug.trim(),
      input.enabled === false ? 0 : 1,
      input.triggerKind,
      input.triggerOffsetDays,
      input.formKind ?? null,
      input.serviceScope ?? 'any',
      input.subject.ca, input.subject.es, input.subject.en,
      input.bodyHtml.ca, input.bodyHtml.es, input.bodyHtml.en,
      now, now,
    ],
  });
  return Number(res.lastInsertRowid ?? 0);
}

export async function updateSequence(id: number, input: SequenceInput): Promise<void> {
  await initSchema();
  await db.execute({
    sql: `UPDATE email_sequences SET
      slug = ?, enabled = ?, trigger_kind = ?, trigger_offset_days = ?, form_kind = ?, service_scope = ?,
      subject_ca = ?, subject_es = ?, subject_en = ?,
      body_html_ca = ?, body_html_es = ?, body_html_en = ?,
      updated_at = ?
    WHERE id = ?`,
    args: [
      input.slug.trim(),
      input.enabled === false ? 0 : 1,
      input.triggerKind,
      input.triggerOffsetDays,
      input.formKind ?? null,
      input.serviceScope ?? 'any',
      input.subject.ca, input.subject.es, input.subject.en,
      input.bodyHtml.ca, input.bodyHtml.es, input.bodyHtml.en,
      toIso(new Date()),
      id,
    ],
  });
}

/** Seed the studio's starter templates, skipping any whose slug already
 *  exists. Returns the slugs that were actually inserted (so the caller
 *  can tell "created 1" from "all already present"). Idempotent — safe to
 *  call as many times as you like. */
export async function seedDefaultSequences(): Promise<{ created: string[]; skipped: string[] }> {
  await initSchema();
  // Imported lazily to avoid a static import cycle (defaultSequences imports
  // the SequenceInput type from this module).
  const { DEFAULT_SEQUENCES } = await import('./defaultSequences');
  const created: string[] = [];
  const skipped: string[] = [];
  for (const seq of DEFAULT_SEQUENCES) {
    const existing = await db.execute({
      sql: 'SELECT id FROM email_sequences WHERE slug = ?',
      args: [seq.slug],
    });
    if (existing.rows.length > 0) {
      skipped.push(seq.slug);
      continue;
    }
    await createSequence(seq);
    created.push(seq.slug);
  }
  return { created, skipped };
}

export async function deleteSequence(id: number): Promise<void> {
  await initSchema();
  await db.execute({ sql: 'DELETE FROM email_sequences WHERE id = ?', args: [id] });
}

// ─── Schedule materialisation ────────────────────────────────────────────

/** Compute the date a sequence fires for a given booking. Returns YYYY-MM-DD
 *  in UTC; cron compares against today's UTC date. */
function computeScheduleDate(seq: EmailSequence, booking: Booking): string | null {
  const off = seq.triggerOffsetDays;
  if (seq.triggerKind === 'days_after_deposit') {
    if (!booking.depositPaidAt) return null;
    const d = new Date(booking.depositPaidAt);
    d.setUTCDate(d.getUTCDate() + off);
    return ymd(d);
  }
  if (seq.triggerKind === 'days_before_wedding') {
    const d = new Date(booking.weddingDate);
    d.setUTCDate(d.getUTCDate() - off);
    return ymd(d);
  }
  if (seq.triggerKind === 'days_after_wedding') {
    const d = new Date(booking.weddingDate);
    d.setUTCDate(d.getUTCDate() + off);
    return ymd(d);
  }
  return null;
}

/** Materialise the queue of follow-up emails for a booking. Idempotent:
 *  the UNIQUE (booking_id, sequence_id) constraint means re-running it
 *  after a sequence is added later will add the new row but won't dupe
 *  the existing ones. Past dates are scheduled "for today" so they fire
 *  on the very next cron run instead of being lost. */
export async function materialiseSchedulesForBooking(bookingId: string): Promise<{ created: number }> {
  await initSchema();
  const booking = await getBookingById(bookingId);
  if (!booking) return { created: 0 };
  // White-label bookings for another studio don't get LifeTime's automated
  // mailing flow — we only track their date + billing.
  if (booking.kind === 'external') return { created: 0 };
  const sequences = await listSequences(false); // enabled only
  const service = resolveBookingServiceType(booking);
  const now = toIso(new Date());
  const today = ymd(new Date());
  let created = 0;
  for (const seq of sequences) {
    // Skip sequences whose service scope doesn't apply to this booking
    // (e.g. a video-only preparation email for a photo-only couple).
    if (!scopeMatchesService(seq.serviceScope, service)) continue;
    const date = computeScheduleDate(seq, booking);
    if (!date) continue;
    const scheduledFor = date < today ? today : date;
    const token = seq.formKind ? randomUUID() : null;
    try {
      await db.execute({
        sql: `INSERT INTO email_schedules (
          booking_id, sequence_id, scheduled_for, form_token, created_at
        ) VALUES (?, ?, ?, ?, ?)`,
        args: [bookingId, seq.id, scheduledFor, token, now],
      });
      created++;
    } catch (err) {
      // UNIQUE (booking_id, sequence_id) — already materialised, skip.
      const msg = String((err as Error)?.message ?? '');
      if (!/UNIQUE/i.test(msg)) {
        // eslint-disable-next-line no-console
        console.error('[email-sequences] materialise insert failed', { bookingId, seqId: seq.id, err });
      }
    }
  }
  return { created };
}

/** Cancel every pending schedule for a booking. Called when the booking
 *  is archived or hard-deleted. Sent ones stay as audit trail. */
export async function cancelPendingSchedules(bookingId: string): Promise<void> {
  await initSchema();
  const now = toIso(new Date());
  await db.execute({
    sql: `UPDATE email_schedules SET cancelled_at = ?
          WHERE booking_id = ? AND sent_at IS NULL AND cancelled_at IS NULL`,
    args: [now, bookingId],
  });
}

// ─── Sending ─────────────────────────────────────────────────────────────

export interface SendDueOptions {
  /** Override "today" — useful for tests / dry runs. */
  asOf?: Date;
  /** Hard limit on rows per invocation to keep cron runs predictable. */
  limit?: number;
}

/** Per-email outcome, surfaced so the cron can push a Telegram summary
 *  (who got what, and what failed) instead of the send being invisible. */
export interface SentEmailDetail {
  couple: string;
  subject: string;
  ok: boolean;
  error?: string;
}

export interface SendDueResult {
  due: number;
  sent: number;
  failed: number;
  skipped: number;
  details: SentEmailDetail[];
}

/** Substitute the {variables} a sequence may reference. Kept tiny — every
 *  variable resolves from booking + form_response. Token uses
 *  PUBLIC_SITE_URL so links point at the deployed host. */
function substituteVariables(html: string, ctx: {
  booking: Booking;
  fr: BookingFormResponse | null;
  formUrl: string | null;
}): string {
  const b = ctx.booking;
  const fr = ctx.fr;
  const vars: Record<string, string> = {
    coupleName1: b.coupleName1,
    coupleName2: b.coupleName2,
    weddingDate: b.weddingDate.toISOString().slice(0, 10),
    venueName: b.venueName,
    packName: b.packName,
    c1FullName: fr?.c1FullName ?? b.coupleName1,
    c2FullName: fr?.c2FullName ?? b.coupleName2,
    formUrl: ctx.formUrl ?? '',
  };
  let out = html;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{${k}}`).join(v);
  }
  return out;
}

/** Send every email_schedules row due on `asOf` (default: today UTC).
 *  Idempotent: only rows with sent_at IS NULL are processed; on success
 *  sent_at is stamped; on failure last_error is set and the row is
 *  retried on the next cron run. */
export async function sendDueEmails(opts: SendDueOptions = {}): Promise<SendDueResult> {
  await initSchema();
  const today = ymd(opts.asOf ?? new Date());
  const limit = opts.limit ?? 200;
  const res = await db.execute({
    sql: `SELECT * FROM email_schedules
          WHERE scheduled_for <= ? AND sent_at IS NULL AND cancelled_at IS NULL
          ORDER BY scheduled_for ASC, id ASC
          LIMIT ?`,
    args: [today, limit],
  });
  let sent = 0, failed = 0, skipped = 0;
  const details: SentEmailDetail[] = [];
  for (const row of res.rows) {
    const sch = mapSchedule(row as unknown as Record<string, unknown>);
    // Hoisted so the catch block can still label the failure with who/what.
    let couple = sch.bookingId;
    let subjectLabel = '';
    try {
      const seq = await getSequenceById(sch.sequenceId);
      if (!seq || !seq.enabled) { skipped++; continue; }
      const booking = await getBookingById(sch.bookingId);
      if (!booking) { skipped++; continue; }
      couple = `${booking.coupleName1} & ${booking.coupleName2}`;
      const fr = await getFormResponseForBooking(booking.id);

      const lang = booking.preferredLanguage;
      const formUrl = sch.formToken ? `${SITE_URL}/formulari/${sch.formToken}` : null;
      // Run the subject through the same substitution as the body so {variables}
      // resolve there too (e.g. {coupleName1}); plain subjects pass untouched.
      const subject = substituteVariables(seq.subject[lang] || seq.subject.ca, { booking, fr, formUrl });
      subjectLabel = subject;
      const html = substituteVariables(seq.bodyHtml[lang] || seq.bodyHtml.ca, { booking, fr, formUrl });

      // Recipients: primary + c1Email + c2Email (deduped).
      const to = new Set<string>();
      if (booking.coupleEmailPrimary) to.add(booking.coupleEmailPrimary.toLowerCase());
      if (fr?.c1Email) to.add(fr.c1Email.toLowerCase());
      if (fr?.c2Email) to.add(fr.c2Email.toLowerCase());
      if (to.size === 0) {
        await db.execute({
          sql: `UPDATE email_schedules SET last_error = ? WHERE id = ?`,
          args: ['no_recipients', sch.id],
        });
        failed++;
        details.push({ couple, subject: subjectLabel, ok: false, error: 'no_recipients' });
        continue;
      }

      if (!resend) {
        // eslint-disable-next-line no-console
        console.log('[email-sequences] (dev) would send', { to: Array.from(to), subject, scheduleId: sch.id });
      } else {
        await resend.emails.send({ from: FROM_HELLO, to: Array.from(to), subject, html });
      }

      await db.execute({
        sql: `UPDATE email_schedules SET sent_at = ?, last_error = NULL WHERE id = ?`,
        args: [toIso(new Date()), sch.id],
      });
      sent++;
      details.push({ couple, subject: subjectLabel, ok: true });
    } catch (err) {
      failed++;
      const msg = String((err as Error)?.message ?? 'unknown error').slice(0, 500);
      await db.execute({
        sql: `UPDATE email_schedules SET last_error = ? WHERE id = ?`,
        args: [msg, sch.id],
      });
      details.push({ couple, subject: subjectLabel, ok: false, error: msg });
      // eslint-disable-next-line no-console
      console.error('[email-sequences] send failed', { scheduleId: sch.id, err });
    }
  }
  return { due: res.rows.length, sent, failed, skipped, details };
}

// ─── Admin helpers ───────────────────────────────────────────────────────

export async function listSchedulesForBooking(bookingId: string): Promise<EmailScheduleRow[]> {
  await initSchema();
  const res = await db.execute({
    sql: `SELECT * FROM email_schedules WHERE booking_id = ?
          ORDER BY scheduled_for ASC, id ASC`,
    args: [bookingId],
  });
  return res.rows.map((r) => mapSchedule(r as unknown as Record<string, unknown>));
}

export async function cancelSchedule(id: number): Promise<void> {
  await initSchema();
  await db.execute({
    sql: `UPDATE email_schedules SET cancelled_at = ?
          WHERE id = ? AND sent_at IS NULL`,
    args: [toIso(new Date()), id],
  });
}

export async function reactivateSchedule(id: number, dateYmd?: string): Promise<void> {
  await initSchema();
  await db.execute({
    sql: `UPDATE email_schedules SET cancelled_at = NULL, sent_at = NULL, last_error = NULL,
                                     scheduled_for = COALESCE(?, scheduled_for)
          WHERE id = ?`,
    args: [dateYmd ?? null, id],
  });
}

/** Force a schedule to fire on the next cron run by setting scheduled_for
 *  to today. Used by the "Enviar ya" button. */
export async function fastForwardSchedule(id: number): Promise<void> {
  await initSchema();
  await db.execute({
    sql: `UPDATE email_schedules SET scheduled_for = ?, sent_at = NULL WHERE id = ?`,
    args: [ymd(new Date()), id],
  });
}

/** Look up a sequence by its stable slug. Used by the manual "generate
 *  form link" flow to resolve a form kind (e.g. 'formulari-basic-info')
 *  to its id without hard-coding the numeric id. */
export async function getSequenceBySlug(slug: string): Promise<EmailSequence | null> {
  await initSchema();
  const res = await db.execute({ sql: 'SELECT * FROM email_sequences WHERE slug = ?', args: [slug] });
  if (res.rows.length === 0) return null;
  return mapSequence(res.rows[0] as unknown as Record<string, unknown>);
}

/** Generate (or refresh) a shareable form link for a booking WITHOUT
 *  sending any email. Used for the basic-info form on collab / external
 *  (white-label) bookings, where Eric copies the link and sends it
 *  himself (WhatsApp etc.) — no Lifetime-branded email goes out.
 *
 *  Mechanics: creates or reactivates the (booking, sequence) schedule with
 *  a fresh form_token and stamps `sent_at = now`. Stamping sent_at keeps
 *  the daily cron from ever emailing it (sendDueEmails filters sent_at IS
 *  NULL), while the token still resolves on /formulari/<token>.
 *
 *  Returns the fresh form_token so the caller can build the URL. Throws if
 *  the sequence has no form_kind (a link would render nothing). */
export async function generateFormLink(bookingId: string, sequenceId: number): Promise<string> {
  await initSchema();
  const seq = await getSequenceById(sequenceId);
  if (!seq) throw new Error(`Sequence ${sequenceId} not found`);
  if (!seq.formKind) throw new Error(`Sequence ${sequenceId} has no form_kind — cannot generate a link`);
  const now = toIso(new Date());
  const today = ymd(new Date());
  const token = randomUUID();

  const existing = await db.execute({
    sql: 'SELECT id FROM email_schedules WHERE booking_id = ? AND sequence_id = ?',
    args: [bookingId, sequenceId],
  });

  if (existing.rows.length === 0) {
    await db.execute({
      sql: `INSERT INTO email_schedules (
        booking_id, sequence_id, scheduled_for, form_token, sent_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [bookingId, sequenceId, today, token, now, now],
    });
  } else {
    // Refresh the token (invalidates any previous link) and re-stamp
    // sent_at so the cron never picks it up. Clear cancelled_at defensively.
    const id = Number((existing.rows[0] as Record<string, unknown>).id);
    await db.execute({
      sql: `UPDATE email_schedules SET
              form_token = ?,
              sent_at = ?,
              cancelled_at = NULL,
              last_error = NULL
            WHERE id = ?`,
      args: [token, now, id],
    });
  }
  return token;
}

export async function getScheduleByToken(token: string): Promise<EmailScheduleRow | null> {
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT * FROM email_schedules WHERE form_token = ?',
    args: [token],
  });
  if (res.rows.length === 0) return null;
  return mapSchedule(res.rows[0] as unknown as Record<string, unknown>);
}

/** Manually send a sequence to a booking RIGHT NOW, regardless of its
 *  trigger date. Use case: Eric wants to push out a form questionnaire to
 *  a couple ahead of schedule (or after — e.g. the wedding's a month
 *  away and the timeline form is the most urgent thing pending).
 *
 *  Behaviour:
 *  - If no schedule exists for (booking, sequence), create one with
 *    scheduled_for=today and a fresh form_token (when form-kind).
 *  - If one exists and is pending, fast-forward it to today.
 *  - If one was sent or cancelled, reactivate it with today's date AND a
 *    NEW form_token (so the previous link is invalidated — important so
 *    a re-sent form gets a fresh accept window).
 *  Returns the schedule id so the caller can immediately dispatch the
 *  queue (`sendDueEmails`) to fire it on the spot.
 */
export async function manualSendSequence(bookingId: string, sequenceId: number): Promise<number> {
  await initSchema();
  const seq = await getSequenceById(sequenceId);
  if (!seq) throw new Error(`Sequence ${sequenceId} not found`);
  const today = ymd(new Date());
  const now = toIso(new Date());

  const existing = await db.execute({
    sql: 'SELECT id, sent_at, cancelled_at FROM email_schedules WHERE booking_id = ? AND sequence_id = ?',
    args: [bookingId, sequenceId],
  });

  if (existing.rows.length === 0) {
    // Fresh — insert one with today's date.
    const token = seq.formKind ? randomUUID() : null;
    const res = await db.execute({
      sql: `INSERT INTO email_schedules (
        booking_id, sequence_id, scheduled_for, form_token, created_at
      ) VALUES (?, ?, ?, ?, ?)`,
      args: [bookingId, sequenceId, today, token, now],
    });
    return Number(res.lastInsertRowid ?? 0);
  }

  // One already exists. Reset it to "pending today", clear sent/cancelled
  // markers, and refresh the token so a previously-sent form link is
  // invalidated (the new send carries a new URL).
  const row = existing.rows[0] as Record<string, unknown>;
  const id = Number(row.id);
  const wasFinalised = row.sent_at != null || row.cancelled_at != null;
  const newToken = seq.formKind ? randomUUID() : null;
  await db.execute({
    sql: `UPDATE email_schedules SET
            scheduled_for = ?,
            sent_at = NULL,
            cancelled_at = NULL,
            last_error = NULL,
            form_token = COALESCE(?, form_token)
          WHERE id = ?`,
    args: [today, wasFinalised ? newToken : null, id],
  });
  return id;
}
