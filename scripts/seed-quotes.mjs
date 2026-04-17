// Seed script: populates the local SQLite with 5 fake quotes + events.
// Usage: node scripts/seed-quotes.mjs

import 'dotenv/config';
import { createClient } from '@libsql/client';
import { randomBytes } from 'node:crypto';
import { mkdirSync } from 'node:fs';

const url = process.env.DATABASE_URL ?? 'file:./data/quotes.db';
if (url.startsWith('file:')) {
  try { mkdirSync('data', { recursive: true }); } catch {}
}
const db = createClient({ url });

const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
function token(len = 10) {
  const b = randomBytes(len);
  let s = '';
  for (let i = 0; i < len; i++) s += ALPHA[b[i] % ALPHA.length];
  return s;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

// Schema (idempotent)
await db.batch([
  `CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT UNIQUE NOT NULL, couple_name TEXT NOT NULL,
    couple_email TEXT, packs_json TEXT NOT NULL, notes TEXT, password_hash TEXT,
    expires_at TEXT, created_at TEXT NOT NULL, created_by TEXT, archived INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT, quote_id INTEGER NOT NULL, kind TEXT NOT NULL,
    user_agent TEXT, ip_hash TEXT, time_on_page INTEGER DEFAULT 0, max_scroll INTEGER DEFAULT 0,
    session_id TEXT, created_at TEXT NOT NULL, FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY, user TEXT NOT NULL, created_at TEXT NOT NULL, expires_at TEXT NOT NULL
  )`,
], 'write');

const couples = [
  {
    name: 'Anna & Marc', email: 'anna.marc@gmail.com', packs: ['como-conoci', 'this-is-us'],
    notes: 'Hola Anna i Marc! Us hem preparat aquesta proposta combinada de foto + vídeo. Qualsevol dubte, estem a la vostra disposició.',
    createdDaysAgo: 14, createdBy: 'ferran',
    views: 5, timeOnPage: 720, maxScroll: 95,
  },
  {
    name: 'Laia & Pol', email: 'laiapol.boda@gmail.com', packs: ['lqsa', 'outlander'],
    notes: null, createdDaysAgo: 7, createdBy: 'eric',
    views: 3, timeOnPage: 180, maxScroll: 60,
  },
  {
    name: 'Marta & Adrià', email: 'marta.adria2026@gmail.com', packs: ['combo-lqsa-ol'],
    notes: 'Marta i Adrià, aquí teniu el pack més complet amb àlbum i tràiler inclosos. Una abraçada!',
    createdDaysAgo: 3, createdBy: 'ferran',
    views: 0, timeOnPage: 0, maxScroll: 0,
  },
  {
    name: 'Cristina & Dani', email: 'cris.dani.wedding@gmail.com', packs: ['como-conoci', 'outlander'],
    notes: null, createdDaysAgo: 30, createdBy: 'eric',
    views: 8, timeOnPage: 1200, maxScroll: 100,
  },
  {
    name: 'Gessamí & Francesc', email: null, packs: ['combo-cc-tu'],
    notes: null, createdDaysAgo: 5, createdBy: 'ferran',
    views: 1, timeOnPage: 30, maxScroll: 15,
  },
];

for (const c of couples) {
  const tk = token();
  const created = daysAgo(c.createdDaysAgo);
  await db.execute({
    sql: `INSERT INTO quotes (token, couple_name, couple_email, packs_json, notes, created_at, created_by)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [tk, c.name, c.email, JSON.stringify(c.packs), c.notes, created, c.createdBy],
  });
  const qRes = await db.execute({ sql: 'SELECT id FROM quotes WHERE token = ?', args: [tk] });
  const qid = Number(qRes.rows[0].id);

  for (let v = 0; v < c.views; v++) {
    const viewDate = new Date(new Date(created).getTime() + (v + 1) * 3600_000 * 12).toISOString();
    await db.execute({
      sql: `INSERT INTO events (quote_id, kind, user_agent, ip_hash, session_id, created_at)
            VALUES (?, 'view', 'Mozilla/5.0 (seed)', ?, ?, ?)`,
      args: [qid, `hash_${v % 3}`, `seed_ses_${v}`, viewDate],
    });
  }

  if (c.timeOnPage > 0) {
    const hbDate = new Date(new Date(created).getTime() + c.views * 3600_000 * 12 + 60_000).toISOString();
    await db.execute({
      sql: `INSERT INTO events (quote_id, kind, session_id, time_on_page, max_scroll, created_at)
            VALUES (?, 'heartbeat', 'seed_hb', ?, ?, ?)`,
      args: [qid, c.timeOnPage, c.maxScroll, hbDate],
    });
  }

  console.log(`✓ ${c.name} (${tk}) — ${c.views} views, ${c.timeOnPage}s, ${c.maxScroll}%`);
}

const count = await db.execute('SELECT count(*) AS n FROM quotes');
console.log(`\nTotal quotes in DB: ${count.rows[0].n}`);
