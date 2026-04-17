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
