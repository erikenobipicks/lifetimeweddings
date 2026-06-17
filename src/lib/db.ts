// SQLite-backed database using @libsql/client (works with local file).
// For Railway, mount a persistent volume and point DATABASE_URL to the file.
//   DATABASE_URL=file:/data/quotes.db   (Railway volume)
//   DATABASE_URL=file:./data/quotes.db  (local dev — default)

import './env';
import { createClient, type Client } from '@libsql/client';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const url = process.env.DATABASE_URL ?? 'file:./data/quotes.db';

// Ensure the data directory exists when using a local file.
if (url.startsWith('file:')) {
  const path = url.replace(/^file:/, '');
  try {
    mkdirSync(dirname(path), { recursive: true });
  } catch {
    /* ignore */
  }
}

export const db: Client = createClient({ url });

let initialised = false;

export async function initSchema() {
  if (initialised) return;
  initialised = true;

  // libsql/Turso disables foreign-key enforcement by default. Without this
  // PRAGMA, `ON DELETE CASCADE` clauses are silently ignored, so deleting
  // a booking left its `booking_form_response` row orphaned (or — with FKs
  // enforced at the server level — failed outright). Enabling it here
  // covers every connection that goes through initSchema, which is the
  // entry point every other helper awaits.
  await db.execute('PRAGMA foreign_keys = ON');
  await db.batch(
    [
      `CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT UNIQUE NOT NULL,
        couple_name TEXT NOT NULL,
        couple_email TEXT,
        packs_json TEXT NOT NULL,
        notes TEXT,
        password_hash TEXT,
        expires_at TEXT,
        created_at TEXT NOT NULL,
        created_by TEXT,
        archived INTEGER NOT NULL DEFAULT 0,
        flagship_video_id TEXT
      )`,
      `CREATE INDEX IF NOT EXISTS idx_quotes_token ON quotes(token)`,
      `CREATE INDEX IF NOT EXISTS idx_quotes_created ON quotes(created_at)`,

      `CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quote_id INTEGER NOT NULL,
        kind TEXT NOT NULL,
        user_agent TEXT,
        ip_hash TEXT,
        time_on_page INTEGER DEFAULT 0,
        max_scroll INTEGER DEFAULT 0,
        session_id TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE
      )`,
      `CREATE INDEX IF NOT EXISTS idx_events_quote ON events(quote_id)`,
      `CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at)`,

      `CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL
      )`,

      // Per-IP login throttle. Moved out of the in-process Map so the limit
      // survives deploys/restarts and would hold across multiple instances.
      // `reset_at` is the ISO timestamp at which the window (and count) lapses.
      `CREATE TABLE IF NOT EXISTS login_attempts (
        ip TEXT PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0,
        reset_at TEXT NOT NULL
      )`,

      `CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quote_id INTEGER,
        couple_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        wedding_date TEXT,
        location TEXT,
        ceremony_type TEXT,
        service_interest TEXT,
        budget_range TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE SET NULL
      )`,
      `CREATE INDEX IF NOT EXISTS idx_leads_quote ON leads(quote_id)`,
      `CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at)`,

      // ─── Booking system (Fase 1) ─────────────────────────────────────────
      // Snapshot-style: pack and venue data are stored inline as JSON/text on
      // the booking row, so a sent proposal cannot drift if catalog data
      // changes later. SQLite-adapted from the original Postgres spec —
      // see docs/booking-spec.md §7.
      //   - UUIDs generated in JS at insert time (TEXT PRIMARY KEY).
      //   - JSONB → TEXT (JSON.stringify/parse with defensive try/catch).
      //   - TIMESTAMPTZ → TEXT ISO-8601, BOOLEAN → INTEGER 0/1.
      //   - DATE → TEXT YYYY-MM-DD, TIME → TEXT HH:MM.
      `CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,

        couple_name_1 TEXT NOT NULL,
        couple_name_2 TEXT NOT NULL,
        couple_email_primary TEXT NOT NULL,
        couple_phone_primary TEXT,
        preferred_language TEXT NOT NULL DEFAULT 'ca'
          CHECK (preferred_language IN ('ca', 'es', 'en')),

        wedding_date TEXT NOT NULL,
        venue_name TEXT NOT NULL,
        venue_city TEXT,
        venue_address TEXT,

        pack_name TEXT NOT NULL,
        pack_description TEXT,
        pack_includes TEXT NOT NULL DEFAULT '[]',
        pack_excludes TEXT NOT NULL DEFAULT '[]',
        pack_addons TEXT NOT NULL DEFAULT '[]',
        pack_price_cents INTEGER NOT NULL,
        deposit_cents INTEGER NOT NULL,
        payment_terms TEXT,

        custom_intro TEXT,
        reference_testimonial TEXT,

        /* Optional override for the embedded "flagship" trailer on the
           public proposal page. Stores a YouTube id from src/data/videos.ts.
           When NULL, the page falls back to a hard-coded default. */
        flagship_video_id TEXT,

        status TEXT NOT NULL DEFAULT 'draft'
          CHECK (status IN ('draft', 'sent', 'viewed', 'form_submitted', 'archived')),
        expires_at TEXT,

        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        first_viewed_at TEXT,
        form_submitted_at TEXT
      )`,
      `CREATE INDEX IF NOT EXISTS idx_bookings_slug ON bookings(slug)`,
      `CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)`,
      `CREATE INDEX IF NOT EXISTS idx_bookings_wedding_date ON bookings(wedding_date)`,

      // Auto-touch updated_at on every row update.
      `CREATE TRIGGER IF NOT EXISTS trg_bookings_updated_at
       AFTER UPDATE ON bookings
       FOR EACH ROW
       BEGIN
         UPDATE bookings
         SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')
         WHERE id = OLD.id;
       END`,

      `CREATE TABLE IF NOT EXISTS booking_form_responses (
        id TEXT PRIMARY KEY,
        booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,

        c1_full_name TEXT NOT NULL,
        c1_dni TEXT NOT NULL,
        c1_birth_date TEXT,
        c1_address TEXT NOT NULL,
        c1_email TEXT NOT NULL,
        c1_phone TEXT NOT NULL,

        c2_full_name TEXT NOT NULL,
        c2_dni TEXT NOT NULL,
        c2_birth_date TEXT,
        c2_address TEXT NOT NULL,
        c2_email TEXT NOT NULL,
        c2_phone TEXT NOT NULL,

        billing_address_same INTEGER NOT NULL DEFAULT 1
          CHECK (billing_address_same IN (0, 1)),
        billing_name TEXT,
        billing_dni TEXT,
        billing_address TEXT,

        wedding_date_confirmed INTEGER NOT NULL DEFAULT 1
          CHECK (wedding_date_confirmed IN (0, 1)),
        wedding_date_alt TEXT,
        venue_confirmed INTEGER NOT NULL DEFAULT 1
          CHECK (venue_confirmed IN (0, 1)),
        venue_alt_name TEXT,
        ceremony_time TEXT,
        service_end_time TEXT,
        guest_count_estimate INTEGER,

        preferred_communication TEXT
          CHECK (preferred_communication IN ('email', 'whatsapp', 'phone')),
        preferred_language TEXT
          CHECK (preferred_language IN ('ca', 'es', 'en')),
        preferred_payment_method TEXT
          CHECK (preferred_payment_method IN ('card', 'transfer')),

        how_did_you_find_us TEXT,
        important_notes TEXT,

        submitted_at TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT
      )`,
      `CREATE INDEX IF NOT EXISTS idx_form_responses_booking ON booking_form_responses(booking_id)`,

      // ── Payments ledger (operator bookkeeping) ─────────────────────────
      // Manual record of money received per booking ("pagaments a compte").
      // The pending balance is computed as effective price (pack − discount)
      // minus the sum of these rows. Independent from the Stripe deposit /
      // FacturaDirecta flow on the public /reserva page.
      `CREATE TABLE IF NOT EXISTS booking_payments (
        id TEXT PRIMARY KEY,
        booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        amount_cents INTEGER NOT NULL,
        paid_on TEXT,
        method TEXT,
        note TEXT,
        created_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS idx_booking_payments_booking ON booking_payments(booking_id)`,

      // ── Change log (date / price addendums) ────────────────────────────
      // One row per recorded change of wedding date and/or price, so we can
      // render an addendum PDF and keep a history on the booking.
      `CREATE TABLE IF NOT EXISTS booking_changes (
        id TEXT PRIMARY KEY,
        booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        old_wedding_date TEXT,
        new_wedding_date TEXT,
        old_price_cents INTEGER,
        new_price_cents INTEGER,
        note TEXT,
        created_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS idx_booking_changes_booking ON booking_changes(booking_id)`,

      // ── Email sequences ────────────────────────────────────────────────
      // Catalogue of recurring/follow-up email templates Eric can manage
      // from /admin/sequences. Each row is one "kind of email" (e.g.
      // "Falten 6 mesos") with a trigger (offset relative to a booking
      // milestone) + localised subject/body. Optionally points at a form
      // (form_kind) — when present, a per-booking token gets generated so
      // the email can link to /formulari/<token>.
      //
      // Schedules live in `email_schedules`: one row per booking ×
      // sequence, materialised when the booking hits the trigger event.
      // The cron walks `email_schedules` daily.
      `CREATE TABLE IF NOT EXISTS email_sequences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1)),
        -- Trigger: 'days_after_deposit' | 'days_before_wedding' | 'days_after_wedding'.
        trigger_kind TEXT NOT NULL
          CHECK (trigger_kind IN ('days_after_deposit', 'days_before_wedding', 'days_after_wedding')),
        -- Positive integer days offset. With 'days_before_wedding' the
        -- effective date is wedding_date − offset; with the _after kinds
        -- it's the reference date + offset.
        trigger_offset_days INTEGER NOT NULL,
        -- Optional form to attach. Null → informational email only.
        -- Today: 'timeline' is planned. New kinds are added in code.
        form_kind TEXT,
        -- Which couples receive this, by service type:
        -- 'any' (everyone) | 'photo' (photo+combo) | 'video' (video+combo)
        -- | 'combo' (combo only). Default 'any' = no behaviour change.
        service_scope TEXT NOT NULL DEFAULT 'any'
          CHECK (service_scope IN ('any', 'photo', 'video', 'combo')),
        subject_ca TEXT NOT NULL,
        subject_es TEXT NOT NULL,
        subject_en TEXT NOT NULL,
        body_html_ca TEXT NOT NULL,
        body_html_es TEXT NOT NULL,
        body_html_en TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS idx_email_sequences_enabled ON email_sequences(enabled)`,

      `CREATE TABLE IF NOT EXISTS email_schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        sequence_id INTEGER NOT NULL REFERENCES email_sequences(id) ON DELETE CASCADE,
        -- Date the cron should pick it up (UTC date, YYYY-MM-DD).
        scheduled_for TEXT NOT NULL,
        sent_at TEXT,
        cancelled_at TEXT,
        last_error TEXT,
        -- Unique per (booking, sequence) — generated when the schedule is
        -- materialised so the email can deep-link to /formulari/<token>.
        form_token TEXT UNIQUE,
        created_at TEXT NOT NULL,
        UNIQUE (booking_id, sequence_id)
      )`,
      `CREATE INDEX IF NOT EXISTS idx_email_schedules_due
         ON email_schedules(scheduled_for) WHERE sent_at IS NULL AND cancelled_at IS NULL`,
      `CREATE INDEX IF NOT EXISTS idx_email_schedules_booking ON email_schedules(booking_id)`,

      `CREATE TABLE IF NOT EXISTS form_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        schedule_id INTEGER REFERENCES email_schedules(id) ON DELETE SET NULL,
        form_kind TEXT NOT NULL,
        data_json TEXT NOT NULL,
        submitted_at TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT
      )`,
      `CREATE INDEX IF NOT EXISTS idx_form_submissions_booking ON form_submissions(booking_id, form_kind)`,

      // ── Interactive quote configurator (couple-side responses) ─────────
      // Each row captures one snapshot of what the couple selected on the
      // public /p/<token> page when they hit "Enviar la meva configuració".
      // We keep a history (no UPDATE) so Eric can see how the couple's
      // thinking evolved. The latest row is what matters for the admin
      // review panel; older rows are reference.
      `CREATE TABLE IF NOT EXISTS quote_responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quote_id INTEGER NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
        pack_ids_json TEXT NOT NULL,
        extra_ids_json TEXT NOT NULL,
        message TEXT,
        total_cents INTEGER NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        created_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS idx_quote_responses_quote
         ON quote_responses(quote_id, created_at DESC)`,
    ],
    'write',
  );

  // ── Lightweight migrations for evolving columns ───────────────────────
  // SQLite's CREATE TABLE IF NOT EXISTS doesn't add new columns to existing
  // tables. For each column added after the initial release we run an
  // ALTER TABLE here, swallowing the "duplicate column" error so subsequent
  // boots are idempotent.
  await ensureColumn('quotes', 'flagship_video_id', 'TEXT');
  await ensureColumn('bookings', 'flagship_video_id', 'TEXT');
  // Featured-photography overrides on the quote, mirroring flagship_video_id.
  // Either or both can be set; when both are empty the page falls back to
  // the lead-based recommendation (no breaking change for existing rows).
  await ensureColumn('quotes', 'flagship_showcase_slug', 'TEXT');
  await ensureColumn('quotes', 'flagship_wedding_slug', 'TEXT');
  // Optional external gallery URL (typically a FotoStudio gallery). When
  // set, /p/<token> shows an iframe embed of it; if the gallery refuses
  // to be embedded (X-Frame-Options/CSP), the client script falls back
  // to a "open in new tab" button automatically.
  await ensureColumn('quotes', 'flagship_external_gallery_url', 'TEXT');
  // ── Interactive quote configurator (admin side) ─────────────────────
  // Eric can grant an ad-hoc discount when the couple returns their
  // configuration (e.g. referral gift, friends-and-family). Cents +
  // human-readable reason. Both nullable so existing quotes don't change.
  await ensureColumn('quotes', 'admin_discount_cents', 'INTEGER');
  await ensureColumn('quotes', 'admin_discount_reason', 'TEXT');
  // When set, the couple can still view the quote but cannot submit
  // further configurations. Eric closes the quote once they've agreed.
  await ensureColumn('quotes', 'quote_closed_at', 'TEXT');
  // Service interest carried over from the lead (or set manually in
  // /admin/new). Drives the configurator filter on /p/<token>:
  //   'photo'     — only photo packs + photo extras visible
  //   'video'     — only video packs + video extras visible
  //   'both'      — combos + everything else (the default)
  //   'undecided' — same surface as 'both' but tagged so we know they
  //                 explicitly said "still mulling it over"
  // NULL on pre-migration rows → treated as 'both' at read time.
  await ensureColumn('quotes', 'service_interest', 'TEXT');
  // ── Quote follow-up tracking ───────────────────────────────────────
  // `sent_at`           — stamped when Eric clicks "📧 Enviar" on the
  //                       quote (POST /api/admin/send-quote). Drives the
  //                       7-day follow-up cron + the "send reminder"
  //                       button gating in /admin/[id].
  // `follow_up_sent_at` — stamped when the follow-up email goes out
  //                       (manual button or cron). Prevents duplicates.
  await ensureColumn('quotes', 'sent_at', 'TEXT');
  await ensureColumn('quotes', 'follow_up_sent_at', 'TEXT');
  // Manually skip the 7-day follow-up — set when Eric clicks "Saltar
  // recordatori" on a quote where the couple has already re-engaged (so
  // a "just checking in" email would be noise). The cron filter skips
  // any row with this set; an admin action can clear it again.
  await ensureColumn('quotes', 'follow_up_skipped_at', 'TEXT');
  // Preferred language for the couple. Drives /p/<token> localisation and
  // is pre-filled on the lead row when contact/quiz tell us via `lang`.
  // Nullable — pre-existing rows default to 'ca' at read time in the
  // domain layer (see rowToQuote / rowToLead) so old proposals still render.
  await ensureColumn('quotes', 'preferred_language', 'TEXT');
  await ensureColumn('leads', 'preferred_language', 'TEXT');
  // Free-text venue / finca the couple typed in the quiz. Distinct from
  // `location` (which is the broad region: tarragona / barcelona / …) so
  // we can keep both — region for pack recommendation, venue for the
  // operator to see at a glance whether the place is one we already know.
  await ensureColumn('leads', 'venue_name', 'TEXT');

  // ─── /contrato post-deposit flow ───────────────────────────────────────
  // After the couple has filled /reserva and we've received the deposit,
  // they fill a second form at /contrato/[slug] with the data we need to
  // draft the contract: image-rights consent, exact ceremony vs reception
  // locations, ceremony type, First Look, GDPR. These columns are nullable
  // because they're only filled in the second step — a booking in
  // form_submitted state without /contrato data is a valid intermediate
  // state ("paid deposit, awaiting contract data").
  await ensureColumn('bookings', 'deposit_paid_at', 'TEXT');
  await ensureColumn('bookings', 'contract_ready_at', 'TEXT');
  // Electronic acceptance of the (own) contract: timestamp + the IP it was
  // accepted from. Set by /api/contrato/accept once the couple ticks
  // "Accepto el contracte". Null until then.
  await ensureColumn('bookings', 'contract_accepted_at', 'TEXT');
  await ensureColumn('bookings', 'contract_accepted_ip', 'TEXT');
  // FacturaDirecta deposit-invoice reference. Set when the operator marks the
  // deposit received and the anticipo invoice is issued; doubles as the
  // re-invoicing idempotency guard. Nullable — bookings created before this
  // (or with FacturaDirecta unconfigured) simply stay null.
  await ensureColumn('bookings', 'facturadirecta_invoice_id', 'TEXT');
  await ensureColumn('bookings', 'facturadirecta_invoice_number', 'TEXT');
  // FotoStudio project id (numeric) — set when /reserva pushes the booking
  // into the CRM, used by /contrato submit to update the project description
  // with the couple's publication-consent choices. Nullable: bookings made
  // before this migration / when FotoStudio is unconfigured stay null.
  await ensureColumn('bookings', 'fotostudio_project_id', 'INTEGER');
  // Booking incentive ("caramel"): an optional reservation reward shown on
  // the public /reserva page to nudge the couple to book before they've
  // confirmed. incentive_body is free text (the gift/discount in the
  // operator's words); incentive_original_price_cents, when > pack price,
  // renders the old price struck through so the discount is visible;
  // incentive_deadline is an optional urgency date. All nullable.
  await ensureColumn('bookings', 'incentive_body', 'TEXT');
  await ensureColumn('bookings', 'incentive_original_price_cents', 'INTEGER');
  await ensureColumn('bookings', 'incentive_deadline', 'TEXT');
  // Absolute discount in cents applied to the pack price. 0 = no discount.
  // The effective price shown to the couple is pack_price_cents - discount_cents.
  await ensureColumn('bookings', 'discount_cents', 'INTEGER NOT NULL DEFAULT 0');
  // Cancellation (Fase B). cancelled_at acts as the "is cancelled" flag; the
  // couple e-signs the cancellation agreement at /cancellacio/[slug], which
  // stamps cancellation_signed_at/ip. retained_cents snapshots the amount kept
  // (paga i senyal) so the document is stable even if the price changes later.
  // Procedència (referral) + tipus de servei + propietat de la boda.
  // kind: 'own' (LifeTime), 'collab' (LifeTime + col·laborador extern),
  //       'external' (per a un altre estudi → mailing desactivat).
  // service_type override: 'photo' | 'video' | 'combo' (null → inferit del pack).
  await ensureColumn('bookings', 'source', 'TEXT');
  await ensureColumn('bookings', 'kind', "TEXT NOT NULL DEFAULT 'own'");
  await ensureColumn('bookings', 'collaborator_name', 'TEXT');
  await ensureColumn('bookings', 'service_type', 'TEXT');
  await ensureColumn('bookings', 'cancelled_at', 'TEXT');
  await ensureColumn('bookings', 'cancellation_reason', 'TEXT');
  await ensureColumn('bookings', 'cancellation_retained_cents', 'INTEGER');
  await ensureColumn('bookings', 'cancellation_signed_at', 'TEXT');
  await ensureColumn('bookings', 'cancellation_signed_ip', 'TEXT');
  await ensureColumn('booking_form_responses', 'language_between', 'TEXT');
  await ensureColumn('booking_form_responses', 'ceremony_location_text', 'TEXT');
  await ensureColumn('booking_form_responses', 'reception_location_text', 'TEXT');
  await ensureColumn('booking_form_responses', 'ceremony_type', 'TEXT');
  await ensureColumn('booking_form_responses', 'ceremony_type_other', 'TEXT');
  await ensureColumn('booking_form_responses', 'first_look', 'TEXT');
  await ensureColumn('booking_form_responses', 'publication_consent', 'TEXT');
  await ensureColumn('booking_form_responses', 'gdpr_accepted_at', 'TEXT');
  // Morning/afternoon slot collected on /reserva (step 1) — the exact
  // ceremony time may not be known months out; this lets the couple commit
  // to half-day so the operator can plan staffing before /contrato.
  await ensureColumn('booking_form_responses', 'wedding_time_slot', 'TEXT');
  // Preparation addresses per partner — collected on /contrato (step 2)
  // because the operator needs to know where to drive at sunrise on the day.
  // Distinct from c1_address / c2_address (which are tax/billing addresses).
  await ensureColumn('booking_form_responses', 'c1_prep_address', 'TEXT');
  await ensureColumn('booking_form_responses', 'c2_prep_address', 'TEXT');
  // Which of the two contraents the contract + invoice should be addressed
  // to ('c1' or 'c2'). Distinct from billingAddressSame, which still gates a
  // fully external billing identity override. NULL → fall back to c1.
  await ensureColumn('booking_form_responses', 'billing_contact', 'TEXT');
  // Operator-only free text on the booking — context for the team that
  // must never leak to the couple. Used for referrals, special arrangements,
  // anything the operator wants to remember when reopening months later.
  await ensureColumn('bookings', 'internal_notes', 'TEXT');

  // Per-booking checklist state. JSON object: `{ "key": "iso-timestamp" }`
  // when checked, key absent when unchecked. Lets us add/retire checklist
  // items in code (catalogue lives in src/data/bookingChecklist.ts) without
  // a schema migration each time the studio's workflow evolves. NULL on
  // pre-existing rows → treated as "nothing ticked".
  await ensureColumn('bookings', 'checklist_state', 'TEXT');

  // Timestamp of the pre-wedding Telegram digest (details + supplier
  // instagrams), fired ~2 days before the wedding (or manually). NULL =
  // not sent yet; the cron sweep uses it as the once-only guard.
  await ensureColumn('bookings', 'prewedding_telegram_sent_at', 'TEXT');

  // Per-sequence service scope (Fase A of the photo/video/combo mailing
  // split). 'any' on pre-migration rows → keeps sending to everyone, so the
  // existing default templates (2nd-payment reminder, info form, inspiration)
  // are unaffected until Eric narrows them. See ServiceScope in sequences.ts.
  await ensureColumn('email_sequences', 'service_scope', "TEXT NOT NULL DEFAULT 'any'");

  // ── Retention sweep (boot-time) ───────────────────────────────────────
  // Data-minimisation per RGPD: keep personal data only as long as needed.
  // Runs on each boot; safe to no-op when the DB is empty.
  //
  // Bounds chosen for a small wedding-photography studio:
  //   - quotes:                 6 months  (sales lifecycle; if not converted
  //                                       by then it's stale)
  //   - leads:                 12 months  (un-converted lead from the quiz
  //                                       / contact form — by then the
  //                                       couple either booked or moved on)
  //   - events (analytics):    12 months  (per-quote view + heartbeat)
  //   - bookings (archived):    6 months  (operator already archived
  //                                       them; only kept around for short
  //                                       audit / undo window)
  //   - booking_form_responses: wedding_date + 6 years  (Spanish tax law
  //                                       requires keeping invoicing-
  //                                       relevant data this long; we
  //                                       purge the row entirely once we
  //                                       cross the threshold, since the
  //                                       parent `bookings` row already
  //                                       carries the commercial info
  //                                       without the sensitive PII)
  //
  // We DELETE rather than pseudonymise because the NOT NULL constraints
  // on DNI / address / email make NULL-out non-trivial, and the parent
  // bookings row keeps the commercial trace.
  const now = Date.now();
  const months = (n: number) => new Date(now - n * 30 * 24 * 60 * 60 * 1000).toISOString();
  const years = (n: number) =>
    new Date(now - n * 365 * 24 * 60 * 60 * 1000).toISOString();

  await db.execute({
    sql: 'DELETE FROM quotes WHERE created_at < ?',
    args: [months(6)],
  });
  await db.execute({
    sql: 'DELETE FROM leads WHERE created_at < ?',
    args: [months(12)],
  });
  await db.execute({
    sql: 'DELETE FROM events WHERE created_at < ?',
    args: [months(12)],
  });
  // Expired login-throttle rows — keep the table from accreting one row per
  // distinct attacker IP forever. Safe to run every boot.
  await db.execute({
    sql: 'DELETE FROM login_attempts WHERE reset_at < ?',
    args: [new Date(now).toISOString()],
  });
  await db.execute({
    sql: "DELETE FROM bookings WHERE status = 'archived' AND updated_at < ?",
    args: [months(6)],
  });
  // Wedding date stored as 'YYYY-MM-DD' (no time component) so a string
  // comparison against the date prefix of `years(6)` works correctly.
  await db.execute({
    sql: `DELETE FROM booking_form_responses
          WHERE booking_id IN (
            SELECT id FROM bookings WHERE wedding_date < ?
          )`,
    args: [years(6).slice(0, 10)],
  });
}

/** Add a column to a table if it doesn't already exist. SQLite has no
 *  "ADD COLUMN IF NOT EXISTS" so we just attempt and swallow the dup error. */
async function ensureColumn(table: string, column: string, definition: string): Promise<void> {
  try {
    await db.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  } catch (err) {
    const msg = String((err as Error)?.message ?? '');
    if (msg.includes('duplicate column')) return;
    throw err;
  }
}
