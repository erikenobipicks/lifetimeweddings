import { db, initSchema } from './db';
import { generateToken, hashIp } from './tokens';
import { sendNotification, sendTelegramNotification } from './email';
import bcrypt from 'bcryptjs';

export interface Quote {
  id: number;
  token: string;
  coupleName: string;
  coupleEmail: string | null;
  packIds: string[];
  notes: string | null;
  hasPassword: boolean;
  expiresAt: string | null;
  createdAt: string;
  createdBy: string | null;
  archived: boolean;
  /** Optional YouTube id (from src/data/videos.ts) to feature on the
   *  public /p/<token> page. null → hard-coded default fallback. */
  flagshipVideoId: string | null;
}

export interface QuoteStats {
  views: number;
  uniqueVisitors: number;
  firstViewAt: string | null;
  lastViewAt: string | null;
  totalTimeSeconds: number;
  maxScroll: number;
}

export interface CreateQuoteInput {
  coupleName: string;
  coupleEmail?: string;
  packIds: string[];
  notes?: string;
  password?: string;
  expiresAt?: string; // ISO
  createdBy?: string;
  flagshipVideoId?: string;
}

const IP_SALT = process.env.IP_HASH_SALT ?? 'lifetime-dev-salt';
const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

function rowToQuote(r: any): Quote {
  return {
    id: Number(r.id),
    token: r.token,
    coupleName: r.couple_name,
    coupleEmail: r.couple_email ?? null,
    packIds: JSON.parse(r.packs_json ?? '[]'),
    notes: r.notes ?? null,
    hasPassword: !!r.password_hash,
    expiresAt: r.expires_at ?? null,
    createdAt: r.created_at,
    createdBy: r.created_by ?? null,
    archived: !!r.archived,
    flagshipVideoId: r.flagship_video_id ?? null,
  };
}

export async function createQuote(input: CreateQuoteInput): Promise<Quote> {
  await initSchema();
  const token = generateToken(10);
  const now = new Date().toISOString();
  const passwordHash = input.password ? await bcrypt.hash(input.password, 10) : null;
  await db.execute({
    sql: `INSERT INTO quotes (token, couple_name, couple_email, packs_json, notes, password_hash, expires_at, created_at, created_by, flagship_video_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      token,
      input.coupleName,
      input.coupleEmail ?? null,
      JSON.stringify(input.packIds),
      input.notes ?? null,
      passwordHash,
      input.expiresAt ?? null,
      now,
      input.createdBy ?? null,
      input.flagshipVideoId ?? null,
    ],
  });
  const res = await db.execute({ sql: 'SELECT * FROM quotes WHERE token = ?', args: [token] });
  return rowToQuote(res.rows[0]);
}

export async function listQuotes(opts: { includeArchived?: boolean } = {}): Promise<Quote[]> {
  await initSchema();
  const res = await db.execute({
    sql: `SELECT * FROM quotes ${opts.includeArchived ? '' : 'WHERE archived = 0'} ORDER BY created_at DESC`,
    args: [],
  });
  return res.rows.map(rowToQuote);
}

export async function getQuoteByToken(token: string): Promise<Quote | null> {
  await initSchema();
  const res = await db.execute({ sql: 'SELECT * FROM quotes WHERE token = ?', args: [token] });
  const row = res.rows[0];
  return row ? rowToQuote(row) : null;
}

export async function getQuoteById(id: number): Promise<Quote | null> {
  await initSchema();
  const res = await db.execute({ sql: 'SELECT * FROM quotes WHERE id = ?', args: [id] });
  const row = res.rows[0];
  return row ? rowToQuote(row) : null;
}

export async function archiveQuote(id: number): Promise<void> {
  await initSchema();
  await db.execute({ sql: 'UPDATE quotes SET archived = 1 WHERE id = ?', args: [id] });
}

export async function verifyQuotePassword(token: string, password: string): Promise<boolean> {
  const res = await db.execute({ sql: 'SELECT password_hash FROM quotes WHERE token = ?', args: [token] });
  const hash = res.rows[0]?.password_hash as string | null;
  if (!hash) return false;
  return await bcrypt.compare(password, hash);
}

export async function getQuoteStats(quoteId: number): Promise<QuoteStats> {
  await initSchema();
  const [views, agg] = await db.batch(
    [
      { sql: `SELECT COUNT(*) AS n FROM events WHERE quote_id = ? AND kind = 'view'`, args: [quoteId] },
      {
        sql: `SELECT
                COUNT(DISTINCT ip_hash) AS uniq,
                MIN(created_at) AS first_view,
                MAX(created_at) AS last_view,
                COALESCE(MAX(time_on_page), 0) AS total_time,
                COALESCE(MAX(max_scroll), 0) AS max_scroll
              FROM events WHERE quote_id = ?`,
        args: [quoteId],
      },
    ],
    'read',
  );
  const row = agg.rows[0] ?? ({} as Record<string, unknown>);
  return {
    views: Number(views.rows[0]?.n ?? 0),
    uniqueVisitors: Number(row.uniq ?? 0),
    firstViewAt: (row.first_view as string) ?? null,
    lastViewAt: (row.last_view as string) ?? null,
    totalTimeSeconds: Number(row.total_time ?? 0),
    maxScroll: Number(row.max_scroll ?? 0),
  };
}

export interface EventRow {
  id: number;
  kind: string;
  userAgent: string | null;
  ipHash: string | null;
  timeOnPage: number;
  maxScroll: number;
  sessionId: string | null;
  createdAt: string;
}

export async function getQuoteEvents(quoteId: number, limit = 200): Promise<EventRow[]> {
  await initSchema();
  const res = await db.execute({
    sql: `SELECT * FROM events WHERE quote_id = ? ORDER BY created_at DESC LIMIT ?`,
    args: [quoteId, limit],
  });
  return res.rows.map((r: any) => ({
    id: Number(r.id),
    kind: r.kind,
    userAgent: r.user_agent ?? null,
    ipHash: r.ip_hash ?? null,
    timeOnPage: Number(r.time_on_page ?? 0),
    maxScroll: Number(r.max_scroll ?? 0),
    sessionId: r.session_id ?? null,
    createdAt: r.created_at,
  }));
}

/** Log a page view and (possibly) notify. Returns the new event id. */
export async function recordView(
  token: string,
  info: { userAgent?: string; ip?: string; sessionId: string },
): Promise<{ eventId: number; quoteId: number } | null> {
  await initSchema();
  const quote = await getQuoteByToken(token);
  if (!quote || quote.archived) return null;

  const ipHash = hashIp(info.ip, IP_SALT);
  const now = new Date().toISOString();
  await db.execute({
    sql: `INSERT INTO events (quote_id, kind, user_agent, ip_hash, session_id, created_at) VALUES (?, 'view', ?, ?, ?, ?)`,
    args: [quote.id, info.userAgent ?? null, ipHash, info.sessionId, now],
  });
  const res = await db.execute({ sql: 'SELECT last_insert_rowid() AS id', args: [] });
  const eventId = Number(res.rows[0]?.id ?? 0);

  // Notify on every open, with a 1-hour throttle per session+quote to avoid reload spam.
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const dupCheck = await db.execute({
    sql: `SELECT COUNT(*) AS n FROM events WHERE quote_id = ? AND session_id = ? AND kind = 'view' AND created_at > ? AND id <> ?`,
    args: [quote.id, info.sessionId, oneHourAgo, eventId],
  });
  const isFreshOpen = Number(dupCheck.rows[0]?.n ?? 0) === 0;
  if (isFreshOpen) {
    const previousViews = await db.execute({
      sql: `SELECT COUNT(*) AS n FROM events WHERE quote_id = ? AND kind = 'view' AND id < ?`,
      args: [quote.id, eventId],
    });
    const opensBefore = Number(previousViews.rows[0]?.n ?? 0);
    const label = opensBefore === 0 ? '🔥 Primera obertura' : `📬 Obertura #${opensBefore + 1}`;
    const url = `${SITE_URL}/p/${quote.token}`;
    const hora = new Date(now).toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' });
    await sendNotification({
      subject: `${label} · ${quote.coupleName}`,
      html: `
        <p>${label} del pressupost per a <strong>${quote.coupleName}</strong>.</p>
        <ul>
          <li><strong>Enllaç:</strong> <a href="${url}">${url}</a></li>
          <li><strong>User-Agent:</strong> ${info.userAgent ?? '(desconegut)'}</li>
          <li><strong>Hora:</strong> ${hora}</li>
        </ul>
        <p>Mira el detall al panel d'administració.</p>
      `,
    });
    await sendTelegramNotification(
      `${label}\n<b>${quote.coupleName}</b> han obert el pressupost\n🕐 ${hora}`,
    );
  }
  return { eventId, quoteId: quote.id };
}

/** Update the "heartbeat" event: keep the maximum time-on-page and scroll for the session. */
export async function recordHeartbeat(
  token: string,
  info: { sessionId: string; timeOnPage: number; maxScroll: number },
): Promise<boolean> {
  await initSchema();
  const quote = await getQuoteByToken(token);
  if (!quote || quote.archived) return false;

  const now = new Date().toISOString();
  // If a heartbeat for this session already exists, update it. Otherwise insert one.
  const existing = await db.execute({
    sql: `SELECT id, time_on_page, max_scroll FROM events WHERE quote_id = ? AND session_id = ? AND kind = 'heartbeat' LIMIT 1`,
    args: [quote.id, info.sessionId],
  });
  const row = existing.rows[0];
  if (row) {
    const newTime = Math.max(Number(row.time_on_page ?? 0), info.timeOnPage);
    const newScroll = Math.max(Number(row.max_scroll ?? 0), info.maxScroll);
    await db.execute({
      sql: `UPDATE events SET time_on_page = ?, max_scroll = ?, created_at = ? WHERE id = ?`,
      args: [newTime, newScroll, now, Number(row.id)],
    });
  } else {
    await db.execute({
      sql: `INSERT INTO events (quote_id, kind, session_id, time_on_page, max_scroll, created_at) VALUES (?, 'heartbeat', ?, ?, ?, ?)`,
      args: [quote.id, info.sessionId, info.timeOnPage, info.maxScroll, now],
    });
  }
  return true;
}

// ─── Leads ──────────────────────────────────────────────────────────────────

export interface Lead {
  id: number;
  quoteId: number | null;
  coupleName: string;
  email: string;
  phone: string | null;
  weddingDate: string | null;
  location: string | null;
  ceremonyType: string | null;
  serviceInterest: string | null;
  budgetRange: string | null;
  createdAt: string;
}

export interface CreateLeadInput {
  quoteId?: number;
  coupleName: string;
  email: string;
  phone?: string;
  weddingDate?: string;
  location?: string;
  ceremonyType?: string;
  serviceInterest?: string;
  budgetRange?: string;
}

function rowToLead(r: any): Lead {
  return {
    id: Number(r.id),
    quoteId: r.quote_id != null ? Number(r.quote_id) : null,
    coupleName: r.couple_name,
    email: r.email,
    phone: r.phone ?? null,
    weddingDate: r.wedding_date ?? null,
    location: r.location ?? null,
    ceremonyType: r.ceremony_type ?? null,
    serviceInterest: r.service_interest ?? null,
    budgetRange: r.budget_range ?? null,
    createdAt: r.created_at,
  };
}

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  await initSchema();
  const now = new Date().toISOString();
  await db.execute({
    sql: `INSERT INTO leads (quote_id, couple_name, email, phone, wedding_date, location, ceremony_type, service_interest, budget_range, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      input.quoteId ?? null,
      input.coupleName,
      input.email,
      input.phone ?? null,
      input.weddingDate ?? null,
      input.location ?? null,
      input.ceremonyType ?? null,
      input.serviceInterest ?? null,
      input.budgetRange ?? null,
      now,
    ],
  });
  const res = await db.execute({ sql: 'SELECT * FROM leads WHERE rowid = last_insert_rowid()', args: [] });
  return rowToLead(res.rows[0]);
}

export async function listLeads(limit = 100): Promise<Lead[]> {
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT * FROM leads ORDER BY created_at DESC LIMIT ?',
    args: [limit],
  });
  return res.rows.map(rowToLead);
}

export async function getLeadByQuoteId(quoteId: number): Promise<Lead | null> {
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT * FROM leads WHERE quote_id = ? LIMIT 1',
    args: [quoteId],
  });
  return res.rows[0] ? rowToLead(res.rows[0]) : null;
}

export async function getLeadById(id: number): Promise<Lead | null> {
  await initSchema();
  const res = await db.execute({ sql: 'SELECT * FROM leads WHERE id = ?', args: [id] });
  return res.rows[0] ? rowToLead(res.rows[0]) : null;
}

/** Link a newly created quote to an existing lead (set leads.quote_id). */
export async function linkLeadToQuote(leadId: number, quoteId: number): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE leads SET quote_id = ? WHERE id = ?',
    args: [quoteId, leadId],
  });
}
