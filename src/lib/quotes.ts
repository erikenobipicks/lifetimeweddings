import { db, initSchema } from './db';
import { generateToken, hashIp } from './tokens';
import { sendNotification, sendTelegramNotification } from './email';
import type { Lang } from '~/i18n/ui';
import bcrypt from 'bcryptjs';

/** Coerce an unknown db value into a known Lang, falling back to 'ca' for
 *  rows that pre-date the preferred_language column. */
function langOrDefault(v: unknown): Lang {
  return v === 'es' || v === 'en' || v === 'ca' ? v : 'ca';
}

export type ServiceInterest = 'photo' | 'video' | 'both' | 'undecided';

/** Coerce an unknown db value into a known ServiceInterest, falling back
 *  to 'both' for rows that pre-date the column (or anything malformed). */
function serviceInterestOrDefault(v: unknown): ServiceInterest {
  return v === 'photo' || v === 'video' || v === 'both' || v === 'undecided' ? v : 'both';
}

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
  /** Optional Showcase slug (from src/data/showcases.ts) to feature on the
   *  public /p/<token> page. When set, overrides the lead-based
   *  recommendation. Null → fall back to the auto-pick from the lead. */
  flagshipShowcaseSlug: string | null;
  /** Optional Wedding slug (from src/data/weddings.ts) to feature a real
   *  wedding's gallery on the public /p/<token> page. Takes priority over
   *  showcase when both are set — a real wedding is more personal. */
  flagshipWeddingSlug: string | null;
  /** Optional external gallery URL (FotoStudio gallery, Pic-Time, Pixieset,
   *  etc.). When set, /p/<token> embeds it via iframe (with a fallback
   *  "open in new tab" button if the host refuses framing). Independent
   *  from wedding/showcase — they can coexist. */
  flagshipExternalGalleryUrl: string | null;
  /** Couple's preferred language. Drives the /p/<token> page locale.
   *  Pre-migration rows default to 'ca' via langOrDefault(). */
  preferredLanguage: Lang;
  /** Operator-granted discount in cents (>0 when applied). Set from the
   *  admin response review when the couple returns their configuration —
   *  e.g. a referral gift or friends-and-family rebate. The configurator
   *  on /p/<token> echoes this back so the couple sees the new total. */
  adminDiscountCents: number;
  /** Free-text reason for the discount, shown in the admin panel only.
   *  Optional even when a discount is set. */
  adminDiscountReason: string | null;
  /** ISO timestamp when Eric closes the quote — the couple can still see
   *  their last submitted configuration but cannot send a new one. Null
   *  while the quote is still open to changes. */
  closedAt: string | null;
  /** What the couple is asking for — 'photo', 'video', 'both', or
   *  'undecided'. Carried over from the lead at quote-creation time but
   *  editable from /admin/[id] if the couple changes their mind. Drives
   *  the configurator filter on /p/<token>. Default 'both' on pre-
   *  migration rows. */
  serviceInterest: ServiceInterest;
  /** ISO timestamp when Eric explicitly emailed the quote to the couple
   *  (POST /api/admin/send-quote). Drives the follow-up cron and the
   *  "send reminder" button. Null = link never sent by email (e.g. Eric
   *  copied it and pasted in WhatsApp). */
  sentAt: string | null;
  /** ISO timestamp when the 7-day follow-up email was sent (manual or
   *  cron). Null until it goes out; prevents duplicate reminders. */
  followUpSentAt: string | null;
  /** ISO timestamp when Eric explicitly disabled the 7-day follow-up
   *  for this quote — typically because the couple already re-engaged
   *  and another "just checking in" email would be noise. The cron
   *  excludes rows where this is set. */
  followUpSkippedAt: string | null;
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
  flagshipShowcaseSlug?: string;
  flagshipWeddingSlug?: string;
  flagshipExternalGalleryUrl?: string;
  /** Defaults to 'ca' when omitted. */
  preferredLanguage?: Lang;
  /** Defaults to 'both' when omitted. */
  serviceInterest?: ServiceInterest;
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
    flagshipShowcaseSlug: r.flagship_showcase_slug ? String(r.flagship_showcase_slug) : null,
    flagshipWeddingSlug: r.flagship_wedding_slug ? String(r.flagship_wedding_slug) : null,
    flagshipExternalGalleryUrl: r.flagship_external_gallery_url ? String(r.flagship_external_gallery_url) : null,
    preferredLanguage: langOrDefault(r.preferred_language),
    adminDiscountCents: r.admin_discount_cents != null ? Number(r.admin_discount_cents) : 0,
    adminDiscountReason: r.admin_discount_reason ?? null,
    closedAt: r.quote_closed_at ?? null,
    sentAt: r.sent_at ?? null,
    followUpSentAt: r.follow_up_sent_at ?? null,
    followUpSkippedAt: r.follow_up_skipped_at ?? null,
    serviceInterest: serviceInterestOrDefault(r.service_interest),
  };
}

export async function createQuote(input: CreateQuoteInput): Promise<Quote> {
  await initSchema();
  const token = generateToken(10);
  const now = new Date().toISOString();
  const passwordHash = input.password ? await bcrypt.hash(input.password, 10) : null;
  await db.execute({
    sql: `INSERT INTO quotes (token, couple_name, couple_email, packs_json, notes, password_hash, expires_at, created_at, created_by, flagship_video_id, flagship_showcase_slug, flagship_wedding_slug, flagship_external_gallery_url, preferred_language, service_interest)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      input.flagshipShowcaseSlug ?? null,
      input.flagshipWeddingSlug ?? null,
      input.flagshipExternalGalleryUrl ?? null,
      input.preferredLanguage ?? 'ca',
      input.serviceInterest ?? 'both',
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

/** Wedding date (YYYY-MM-DD, as captured by the quiz's date input) per
 *  quote, in one query. Returns a Map of quote_id → wedding_date; quotes
 *  with no linked lead or no date typed are absent. Used by the quotes
 *  list so the operator has the date at hand without opening each quote. */
export async function listWeddingDatesByQuote(): Promise<Map<number, string>> {
  await initSchema();
  const res = await db.execute({
    sql: `SELECT quote_id, wedding_date FROM leads
          WHERE quote_id IS NOT NULL AND wedding_date IS NOT NULL AND wedding_date != ''`,
    args: [],
  });
  const map = new Map<number, string>();
  for (const row of res.rows) {
    map.set(Number(row.quote_id), String(row.wedding_date));
  }
  return map;
}

/** Hard-delete a quote and its dependent rows. Irreversible. Use only for
 *  cleanup of test/demo data — archiving is preferred for real quotes
 *  because it keeps the historical record.
 *
 *  Belt + braces: we delete dependents explicitly (events) and null out
 *  `leads.quote_id` before dropping the row, instead of relying purely
 *  on the schema's CASCADE/SET NULL. Older databases may pre-date those
 *  clauses, and FK enforcement is now also turned on in initSchema. */
export async function deleteQuote(id: number): Promise<void> {
  await initSchema();
  await db.batch(
    [
      { sql: 'UPDATE leads SET quote_id = NULL WHERE quote_id = ?', args: [id] },
      { sql: 'DELETE FROM events WHERE quote_id = ?', args: [id] },
      { sql: 'DELETE FROM quotes WHERE id = ?', args: [id] },
    ],
    'write',
  );
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
  /** Free-text venue / finca name the couple typed in the quiz (e.g.
   *  "Mas la Boella"). Distinct from `location` which is the broad
   *  region used by the pack recommender. Optional. */
  venueName: string | null;
  ceremonyType: string | null;
  serviceInterest: string | null;
  budgetRange: string | null;
  createdAt: string;
  /** UI language the lead was using when they submitted the form. Drives
   *  the default for /p/<token> language when admin creates the quote. */
  preferredLanguage: Lang;
}

export interface CreateLeadInput {
  quoteId?: number;
  coupleName: string;
  email: string;
  phone?: string;
  weddingDate?: string;
  location?: string;
  venueName?: string;
  ceremonyType?: string;
  serviceInterest?: string;
  budgetRange?: string;
  preferredLanguage?: Lang;
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
    venueName: r.venue_name ?? null,
    ceremonyType: r.ceremony_type ?? null,
    serviceInterest: r.service_interest ?? null,
    budgetRange: r.budget_range ?? null,
    createdAt: r.created_at,
    preferredLanguage: langOrDefault(r.preferred_language),
  };
}

/** Lead creation result. `deduplicated=true` means we returned a row that
 *  was already in the table (same email within the last 24h) instead of
 *  inserting a new one. Callers should suppress side-effects (auto-reply,
 *  Telegram, internal alert) in that case so the couple doesn't get
 *  flooded when they double-tap submit or come back the same day. */
export interface CreateLeadResult {
  lead: Lead;
  deduplicated: boolean;
}

const LEAD_DEDUP_WINDOW_MS = 24 * 60 * 60 * 1000;

export async function createLead(input: CreateLeadInput): Promise<CreateLeadResult> {
  await initSchema();

  // Dedup window: any lead with the same email submitted in the last 24h
  // collapses into the existing row. Case-insensitive match — addresses
  // are stored as typed but uniqueness is a lower-case property.
  const since = new Date(Date.now() - LEAD_DEDUP_WINDOW_MS).toISOString();
  const existing = await db.execute({
    sql: `SELECT * FROM leads WHERE LOWER(email) = LOWER(?) AND created_at > ? ORDER BY created_at DESC LIMIT 1`,
    args: [input.email, since],
  });
  if (existing.rows[0]) {
    return { lead: rowToLead(existing.rows[0]), deduplicated: true };
  }

  const now = new Date().toISOString();
  await db.execute({
    sql: `INSERT INTO leads (quote_id, couple_name, email, phone, wedding_date, location, ceremony_type, service_interest, budget_range, created_at, preferred_language, venue_name)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      input.preferredLanguage ?? 'ca',
      input.venueName ?? null,
    ],
  });
  const res = await db.execute({ sql: 'SELECT * FROM leads WHERE rowid = last_insert_rowid()', args: [] });
  return { lead: rowToLead(res.rows[0]), deduplicated: false };
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

/** Hard-delete a lead. Irreversible — meant for cleanup of obvious spam /
 *  duplicate quiz submissions / test data. The optional FK link to a
 *  quote (`leads.quote_id`) is ON DELETE SET NULL on the quote side, so
 *  removing the lead doesn't affect any quote that came out of it; here
 *  we just drop the row. */
export async function deleteLead(id: number): Promise<void> {
  await initSchema();
  await db.execute({ sql: 'DELETE FROM leads WHERE id = ?', args: [id] });
}

// ─── Quote follow-up tracking ───────────────────────────────────────────────

/** Stamp the quote as "emailed by Eric" so the follow-up clock starts.
 *  Idempotent on re-send: we overwrite to the latest send time so the
 *  follow-up window resets if Eric re-sends days later. */
export async function markQuoteSent(id: number, at: Date = new Date()): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE quotes SET sent_at = ? WHERE id = ?',
    args: [at.toISOString(), id],
  });
}

/** Stamp the follow-up email as sent so neither the cron nor the manual
 *  button re-sends it. */
export async function markQuoteFollowUpSent(id: number, at: Date = new Date()): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE quotes SET follow_up_sent_at = ? WHERE id = ?',
    args: [at.toISOString(), id],
  });
}

/** Quotes ready for a follow-up email: sent >= `daysSince` ago, no
 *  follow-up yet, not archived, not explicitly skipped, and we actually
 *  have a recipient. */
export async function listQuotesPendingFollowUp(daysSince = 7): Promise<Quote[]> {
  await initSchema();
  const cutoff = new Date(Date.now() - daysSince * 24 * 60 * 60 * 1000).toISOString();
  const res = await db.execute({
    sql: `SELECT * FROM quotes
          WHERE archived = 0
            AND couple_email IS NOT NULL AND couple_email <> ''
            AND sent_at IS NOT NULL
            AND sent_at <= ?
            AND follow_up_sent_at IS NULL
            AND follow_up_skipped_at IS NULL
          ORDER BY sent_at ASC`,
    args: [cutoff],
  });
  return res.rows.map(rowToQuote);
}

/** Disable the 7-day follow-up for a single quote — used when the
 *  couple has already re-engaged so an automatic "checking in" email
 *  would be redundant. Idempotent: re-stamping just overwrites. */
export async function skipQuoteFollowUp(id: number, at: Date = new Date()): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE quotes SET follow_up_skipped_at = ? WHERE id = ?',
    args: [at.toISOString(), id],
  });
}

/** Reverse skipQuoteFollowUp — the quote becomes eligible for the cron
 *  again (assuming sent_at is still in the past by the threshold). */
export async function restoreQuoteFollowUp(id: number): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE quotes SET follow_up_skipped_at = NULL WHERE id = ?',
    args: [id],
  });
}

// ─── Interactive quote responses ────────────────────────────────────────────

export interface QuoteResponse {
  id: number;
  quoteId: number;
  packIds: string[];
  extraIds: string[];
  message: string | null;
  totalCents: number;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

function rowToQuoteResponse(r: any): QuoteResponse {
  const safeArr = (raw: unknown): string[] => {
    if (typeof raw !== 'string') return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch { return []; }
  };
  return {
    id: Number(r.id),
    quoteId: Number(r.quote_id),
    packIds: safeArr(r.pack_ids_json),
    extraIds: safeArr(r.extra_ids_json),
    message: r.message ?? null,
    totalCents: Number(r.total_cents ?? 0),
    ipAddress: r.ip_address ?? null,
    userAgent: r.user_agent ?? null,
    createdAt: r.created_at,
  };
}

export interface CreateQuoteResponseInput {
  quoteId: number;
  packIds: string[];
  extraIds: string[];
  message?: string;
  totalCents: number;
  ipAddress?: string;
  userAgent?: string;
}

export async function createQuoteResponse(input: CreateQuoteResponseInput): Promise<QuoteResponse> {
  await initSchema();
  const now = new Date().toISOString();
  await db.execute({
    sql: `INSERT INTO quote_responses
            (quote_id, pack_ids_json, extra_ids_json, message, total_cents, ip_address, user_agent, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      input.quoteId,
      JSON.stringify(input.packIds),
      JSON.stringify(input.extraIds),
      input.message ?? null,
      input.totalCents,
      input.ipAddress ?? null,
      input.userAgent ?? null,
      now,
    ],
  });
  const res = await db.execute({
    sql: 'SELECT * FROM quote_responses WHERE rowid = last_insert_rowid()',
    args: [],
  });
  return rowToQuoteResponse(res.rows[0]);
}

export async function listQuoteResponses(quoteId: number): Promise<QuoteResponse[]> {
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT * FROM quote_responses WHERE quote_id = ? ORDER BY created_at DESC',
    args: [quoteId],
  });
  return res.rows.map(rowToQuoteResponse);
}

export async function getLatestQuoteResponse(quoteId: number): Promise<QuoteResponse | null> {
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT * FROM quote_responses WHERE quote_id = ? ORDER BY created_at DESC LIMIT 1',
    args: [quoteId],
  });
  return res.rows[0] ? rowToQuoteResponse(res.rows[0]) : null;
}

/** Set or clear the operator-granted discount on a quote. Pass cents=0 to
 *  clear; reason is ignored when cents=0. */
export async function setAdminDiscount(
  quoteId: number,
  cents: number,
  reason: string | null,
): Promise<void> {
  await initSchema();
  const safeCents = Math.max(0, Math.floor(cents));
  await db.execute({
    sql: 'UPDATE quotes SET admin_discount_cents = ?, admin_discount_reason = ? WHERE id = ?',
    args: [safeCents, safeCents > 0 ? (reason ?? null) : null, quoteId],
  });
}

/** Close a quote — the couple can still view it but no more responses. */
export async function closeQuote(quoteId: number): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE quotes SET quote_closed_at = ? WHERE id = ?',
    args: [new Date().toISOString(), quoteId],
  });
}

/** Re-open a previously closed quote so the couple can submit again. */
export async function reopenQuote(quoteId: number): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE quotes SET quote_closed_at = NULL WHERE id = ?',
    args: [quoteId],
  });
}

/** Update the service-interest filter on a quote. Drives what the
 *  configurator shows on /p/<token>. */
export async function setServiceInterest(
  quoteId: number,
  value: ServiceInterest,
): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE quotes SET service_interest = ? WHERE id = ?',
    args: [value, quoteId],
  });
}
