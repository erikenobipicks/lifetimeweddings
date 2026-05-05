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
        archived INTEGER NOT NULL DEFAULT 0
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
    ],
    'write',
  );

  // Retention cleanup: drop quotes older than 6 months at boot.
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 6);
  await db.execute({
    sql: `DELETE FROM quotes WHERE created_at < ?`,
    args: [cutoff.toISOString()],
  });
}
