// Material delivery landing pages ("entrega"). A public page per wedding
// pointing at externally-hosted material — no self-hosting yet:
//   - an unlisted YouTube video (embedded)
//   - a time-limited download link (SwissTransfer, ~30 days)
//   - a photo gallery link (FotoStudio)
//
// Can be created from an existing booking (pre-fills couple/date/venue) or
// standalone with just the basics. Slug scheme mirrors bookings — the
// random suffix is the only secret protecting the page (couple names +
// wedding date are often guessable), so entropy has to live there.

import { randomInt, randomUUID } from 'node:crypto';
import { db, initSchema } from './db';
import type { Lang } from '~/i18n/ui';

export interface Delivery {
  id: string;
  slug: string;
  bookingId: string | null;
  coupleName1: string;
  coupleName2: string;
  weddingDate: Date;
  venueName: string | null;
  preferredLanguage: Lang;
  youtubeVideoId: string | null;
  swisstransferUrl: string | null;
  swisstransferExpiresAt: Date | null;
  galleryUrl: string | null;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryCreateInput {
  bookingId?: string | null;
  coupleName1: string;
  coupleName2: string;
  weddingDate: Date;
  venueName?: string | null;
  preferredLanguage?: Lang;
  youtubeVideoId?: string | null;
  swisstransferUrl?: string | null;
  swisstransferExpiresAt?: Date | null;
  galleryUrl?: string | null;
}

export type DeliveryUpdateInput = Partial<Omit<DeliveryCreateInput, 'bookingId'>>;

const nowIso = () => new Date().toISOString();
function fromIso(s: unknown): Date | null {
  if (typeof s !== 'string' || !s) return null;
  const d = new Date(s);
  return Number.isFinite(d.getTime()) ? d : null;
}
function langOrDefault(v: unknown): Lang {
  return v === 'es' || v === 'en' ? v : 'ca';
}

// ─── Slug generation ────────────────────────────────────────────────────
// Same scheme as booking slugs ({name1}-{name2}-{year}-{12charRandom}),
// duplicated here (rather than imported from ~/lib/bookings/slug) so this
// module doesn't couple to bookings internals — it checks uniqueness
// against `deliveries`, a different table.

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

function normalize(name: string): string {
  const stripped = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  return stripped.length === 0 ? 'x' : stripped;
}

function randomSuffix(len = 12): string {
  let out = '';
  for (let i = 0; i < len; i += 1) {
    out += ALPHABET[randomInt(0, ALPHABET.length)];
  }
  return out;
}

async function slugExists(slug: string): Promise<boolean> {
  const res = await db.execute({ sql: 'SELECT 1 FROM deliveries WHERE slug = ? LIMIT 1', args: [slug] });
  return res.rows.length > 0;
}

export async function generateDeliverySlug(name1: string, name2: string, weddingDate: Date): Promise<string> {
  const base = `${normalize(name1)}-${normalize(name2)}-${weddingDate.getUTCFullYear()}`;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = `${base}-${randomSuffix(12)}`;
    if (!(await slugExists(candidate))) return candidate;
  }
  throw new Error(`Could not generate a unique delivery slug after 5 attempts (base="${base}")`);
}

// ─── YouTube id parsing ─────────────────────────────────────────────────
// Admins tend to paste a full URL rather than the bare id. Accepts a bare
// 11-char id, youtu.be/<id>, youtube.com/watch?v=<id>, or /embed/<id>.

export function extractYoutubeId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.slice(1);
      return /^[\w-]{11}$/.test(id) ? id : null;
    }
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v && /^[\w-]{11}$/.test(v)) return v;
      const m = /\/embed\/([\w-]{11})/.exec(u.pathname);
      if (m) return m[1];
    }
  } catch {
    /* not a URL — fall through */
  }
  return null;
}

// ─── Row mapping ────────────────────────────────────────────────────────

function rowToDelivery(r: Record<string, unknown>): Delivery {
  return {
    id: String(r.id),
    slug: String(r.slug),
    bookingId: r.booking_id ? String(r.booking_id) : null,
    coupleName1: String(r.couple_name_1),
    coupleName2: String(r.couple_name_2),
    weddingDate: fromIso(r.wedding_date) ?? new Date(`${r.wedding_date}T00:00:00Z`),
    venueName: r.venue_name ? String(r.venue_name) : null,
    preferredLanguage: langOrDefault(r.preferred_language),
    youtubeVideoId: r.youtube_video_id ? String(r.youtube_video_id) : null,
    swisstransferUrl: r.swisstransfer_url ? String(r.swisstransfer_url) : null,
    swisstransferExpiresAt: fromIso(r.swisstransfer_expires_at),
    galleryUrl: r.gallery_url ? String(r.gallery_url) : null,
    archived: Number(r.archived) === 1,
    createdAt: fromIso(r.created_at) ?? new Date(),
    updatedAt: fromIso(r.updated_at) ?? new Date(),
  };
}

// ─── CRUD ───────────────────────────────────────────────────────────────

export async function createDelivery(input: DeliveryCreateInput): Promise<Delivery> {
  await initSchema();
  const id = randomUUID();
  const slug = await generateDeliverySlug(input.coupleName1, input.coupleName2, input.weddingDate);
  const now = nowIso();
  const weddingDateIso = input.weddingDate.toISOString().slice(0, 10);

  await db.execute({
    sql: `INSERT INTO deliveries (
      id, slug, booking_id,
      couple_name_1, couple_name_2, wedding_date, venue_name, preferred_language,
      youtube_video_id, swisstransfer_url, swisstransfer_expires_at, gallery_url,
      archived, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)`,
    args: [
      id,
      slug,
      input.bookingId ?? null,
      input.coupleName1,
      input.coupleName2,
      weddingDateIso,
      input.venueName ?? null,
      input.preferredLanguage ?? 'ca',
      input.youtubeVideoId ?? null,
      input.swisstransferUrl ?? null,
      input.swisstransferExpiresAt ? input.swisstransferExpiresAt.toISOString().slice(0, 10) : null,
      input.galleryUrl ?? null,
      now,
      now,
    ],
  });
  const res = await db.execute({ sql: 'SELECT * FROM deliveries WHERE id = ?', args: [id] });
  return rowToDelivery(res.rows[0] as unknown as Record<string, unknown>);
}

export async function getDeliveryBySlug(slug: string): Promise<Delivery | null> {
  await initSchema();
  const res = await db.execute({ sql: 'SELECT * FROM deliveries WHERE slug = ?', args: [slug] });
  return res.rows[0] ? rowToDelivery(res.rows[0] as unknown as Record<string, unknown>) : null;
}

export async function getDeliveryById(id: string): Promise<Delivery | null> {
  await initSchema();
  const res = await db.execute({ sql: 'SELECT * FROM deliveries WHERE id = ?', args: [id] });
  return res.rows[0] ? rowToDelivery(res.rows[0] as unknown as Record<string, unknown>) : null;
}

export async function listDeliveries(opts: { includeArchived?: boolean } = {}): Promise<Delivery[]> {
  await initSchema();
  const sql = opts.includeArchived
    ? 'SELECT * FROM deliveries ORDER BY wedding_date DESC'
    : 'SELECT * FROM deliveries WHERE archived = 0 ORDER BY wedding_date DESC';
  const res = await db.execute(sql);
  return res.rows.map((r) => rowToDelivery(r as unknown as Record<string, unknown>));
}

export async function updateDelivery(id: string, patch: DeliveryUpdateInput): Promise<void> {
  await initSchema();
  const sets: string[] = [];
  const args: unknown[] = [];
  const col = (name: string, value: unknown) => {
    sets.push(`${name} = ?`);
    args.push(value);
  };
  if (patch.coupleName1 !== undefined) col('couple_name_1', patch.coupleName1);
  if (patch.coupleName2 !== undefined) col('couple_name_2', patch.coupleName2);
  if (patch.weddingDate !== undefined) col('wedding_date', patch.weddingDate.toISOString().slice(0, 10));
  if (patch.venueName !== undefined) col('venue_name', patch.venueName);
  if (patch.preferredLanguage !== undefined) col('preferred_language', patch.preferredLanguage);
  if (patch.youtubeVideoId !== undefined) col('youtube_video_id', patch.youtubeVideoId);
  if (patch.swisstransferUrl !== undefined) col('swisstransfer_url', patch.swisstransferUrl);
  if (patch.swisstransferExpiresAt !== undefined) {
    col('swisstransfer_expires_at', patch.swisstransferExpiresAt ? patch.swisstransferExpiresAt.toISOString().slice(0, 10) : null);
  }
  if (patch.galleryUrl !== undefined) col('gallery_url', patch.galleryUrl);
  if (sets.length === 0) return;
  col('updated_at', nowIso());
  args.push(id);
  await db.execute({ sql: `UPDATE deliveries SET ${sets.join(', ')} WHERE id = ?`, args });
}

export async function setDeliveryArchived(id: string, archived: boolean): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE deliveries SET archived = ?, updated_at = ? WHERE id = ?',
    args: [archived ? 1 : 0, nowIso(), id],
  });
}

export async function deleteDelivery(id: string): Promise<void> {
  await initSchema();
  await db.execute({ sql: 'DELETE FROM deliveries WHERE id = ?', args: [id] });
}
