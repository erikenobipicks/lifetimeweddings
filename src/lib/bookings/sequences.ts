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
import type { Booking, BookingFormResponse, Lang } from './types';
import { SITE } from '~/data/site';

const FROM_HELLO = process.env.EMAIL_FROM_HELLO ?? 'Lifetime Weddings <hola@lifetime.photo>';
const SITE_URL = process.env.PUBLIC_SITE_URL ?? SITE.url;

export type TriggerKind = 'days_after_deposit' | 'days_before_wedding' | 'days_after_wedding';
export type FormKind = 'timeline' | 'guest_list' | 'music'; // expand as Eric adds forms

export interface EmailSequence {
  id: number;
  slug: string;
  enabled: boolean;
  triggerKind: TriggerKind;
  triggerOffsetDays: number;
  formKind: FormKind | null;
  subject: Record<Lang, string>;
  bodyHtml: Record<Lang, string>;
  createdAt: Date;
  updatedAt: Date;
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
  subject: Record<Lang, string>;
  bodyHtml: Record<Lang, string>;
}

export async function createSequence(input: SequenceInput): Promise<number> {
  await initSchema();
  const now = toIso(new Date());
  const res = await db.execute({
    sql: `INSERT INTO email_sequences (
        slug, enabled, trigger_kind, trigger_offset_days, form_kind,
        subject_ca, subject_es, subject_en,
        body_html_ca, body_html_es, body_html_en,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      input.slug.trim(),
      input.enabled === false ? 0 : 1,
      input.triggerKind,
      input.triggerOffsetDays,
      input.formKind ?? null,
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
      slug = ?, enabled = ?, trigger_kind = ?, trigger_offset_days = ?, form_kind = ?,
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
      input.subject.ca, input.subject.es, input.subject.en,
      input.bodyHtml.ca, input.bodyHtml.es, input.bodyHtml.en,
      toIso(new Date()),
      id,
    ],
  });
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
  const sequences = await listSequences(false); // enabled only
  const now = toIso(new Date());
  const today = ymd(new Date());
  let created = 0;
  for (const seq of sequences) {
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

export interface SendDueResult {
  due: number;
  sent: number;
  failed: number;
  skipped: number;
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
  for (const row of res.rows) {
    const sch = mapSchedule(row as unknown as Record<string, unknown>);
    try {
      const seq = await getSequenceById(sch.sequenceId);
      if (!seq || !seq.enabled) { skipped++; continue; }
      const booking = await getBookingById(sch.bookingId);
      if (!booking) { skipped++; continue; }
      const fr = await getFormResponseForBooking(booking.id);

      const lang = booking.preferredLanguage;
      const formUrl = sch.formToken ? `${SITE_URL}/formulari/${sch.formToken}` : null;
      const subject = seq.subject[lang];
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
    } catch (err) {
      failed++;
      const msg = String((err as Error)?.message ?? 'unknown error').slice(0, 500);
      await db.execute({
        sql: `UPDATE email_schedules SET last_error = ? WHERE id = ?`,
        args: [msg, sch.id],
      });
      // eslint-disable-next-line no-console
      console.error('[email-sequences] send failed', { scheduleId: sch.id, err });
    }
  }
  return { due: res.rows.length, sent, failed, skipped };
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

export async function getScheduleByToken(token: string): Promise<EmailScheduleRow | null> {
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT * FROM email_schedules WHERE form_token = ?',
    args: [token],
  });
  if (res.rows.length === 0) return null;
  return mapSchedule(res.rows[0] as unknown as Record<string, unknown>);
}
