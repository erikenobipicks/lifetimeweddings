// Video-only collaboration landings ("/videograf/<slug>"). A private link Eric
// creates in the admin and sends to a photographer who offers him as their
// videographer. Each row captures: language, whether the video packs + quote
// show, which trailer/full film to feature, and the referring photographer's
// contact — so, when set, every CTA on that link routes back to the
// photographer (they keep the couple).
//
// Slug scheme mirrors deliveries ({label}-{6charRandom}); the random suffix is
// the only secret protecting the page, so entropy lives there.

import { randomInt, randomUUID } from 'node:crypto';
import { db, initSchema } from './db';
import type { Lang } from '~/i18n/ui';

export type PhotographerContactType = 'whatsapp' | 'email' | 'web';

export interface VideoLink {
  id: string;
  slug: string;
  /** Internal label to recognise the link in the admin list (e.g. the
   *  photographer/studio name). Not shown on the public page. */
  label: string | null;
  lang: Lang;
  showQuote: boolean;
  /** YouTube ids to feature; null → the landing falls back to the first
   *  trailer / first full film in the catalog. */
  trailerId: string | null;
  fullId: string | null;
  photographerName: string | null;
  photographerContactType: PhotographerContactType | null;
  photographerContactValue: string | null;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoLinkCreateInput {
  label?: string | null;
  lang?: Lang;
  showQuote?: boolean;
  trailerId?: string | null;
  fullId?: string | null;
  photographerName?: string | null;
  photographerContactType?: PhotographerContactType | null;
  photographerContactValue?: string | null;
}

const nowIso = () => new Date().toISOString();
function fromIso(s: unknown): Date | null {
  if (typeof s !== 'string' || !s) return null;
  const d = new Date(s);
  return Number.isFinite(d.getTime()) ? d : null;
}
function langOrDefault(v: unknown): Lang {
  return v === 'es' || v === 'en' ? v : 'ca';
}
function contactTypeOrNull(v: unknown): PhotographerContactType | null {
  return v === 'whatsapp' || v === 'email' || v === 'web' ? v : null;
}

// ─── Slug generation (mirrors deliveries) ───────────────────────────────
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

function normalize(name: string): string {
  const stripped = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  return stripped.length === 0 ? 'video' : stripped;
}

function randomSuffix(len = 8): string {
  let out = '';
  for (let i = 0; i < len; i += 1) out += ALPHABET[randomInt(0, ALPHABET.length)];
  return out;
}

async function slugExists(slug: string): Promise<boolean> {
  const res = await db.execute({ sql: 'SELECT 1 FROM video_links WHERE slug = ? LIMIT 1', args: [slug] });
  return res.rows.length > 0;
}

export async function generateVideoLinkSlug(label: string | null | undefined): Promise<string> {
  const base = normalize(label || 'video');
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = `${base}-${randomSuffix(8)}`;
    if (!(await slugExists(candidate))) return candidate;
  }
  throw new Error(`Could not generate a unique video-link slug after 5 attempts (base="${base}")`);
}

// ─── Row mapping ────────────────────────────────────────────────────────
function rowToVideoLink(r: Record<string, unknown>): VideoLink {
  return {
    id: String(r.id),
    slug: String(r.slug),
    label: r.label ? String(r.label) : null,
    lang: langOrDefault(r.lang),
    showQuote: Number(r.show_quote) === 1,
    trailerId: r.trailer_id ? String(r.trailer_id) : null,
    fullId: r.full_id ? String(r.full_id) : null,
    photographerName: r.photographer_name ? String(r.photographer_name) : null,
    photographerContactType: contactTypeOrNull(r.photographer_contact_type),
    photographerContactValue: r.photographer_contact_value ? String(r.photographer_contact_value) : null,
    archived: Number(r.archived) === 1,
    createdAt: fromIso(r.created_at) ?? new Date(),
    updatedAt: fromIso(r.updated_at) ?? new Date(),
  };
}

/** Build the outbound href for the referring photographer's contact, or null
 *  when the link has no usable photographer contact. Used by the public page
 *  to route every CTA back to the photographer. */
export function photographerContactHref(link: VideoLink): string | null {
  const { photographerContactType: type, photographerContactValue: value } = link;
  if (!type || !value) return null;
  const v = value.trim();
  if (!v) return null;
  if (type === 'email') return `mailto:${v}`;
  if (type === 'web') return /^https?:\/\//i.test(v) ? v : `https://${v}`;
  // whatsapp: accept a full URL, or a phone number → wa.me/<digits>.
  if (/^https?:\/\//i.test(v)) return v;
  const digits = v.replace(/[^\d]/g, '');
  return digits ? `https://wa.me/${digits}` : null;
}

// ─── CRUD ───────────────────────────────────────────────────────────────
export async function createVideoLink(input: VideoLinkCreateInput): Promise<VideoLink> {
  await initSchema();
  const id = randomUUID();
  const slug = await generateVideoLinkSlug(input.label);
  const now = nowIso();

  await db.execute({
    sql: `INSERT INTO video_links (
      id, slug, label, lang, show_quote, trailer_id, full_id,
      photographer_name, photographer_contact_type, photographer_contact_value,
      archived, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)`,
    args: [
      id,
      slug,
      input.label?.trim() || null,
      input.lang ?? 'ca',
      input.showQuote === false ? 0 : 1,
      input.trailerId || null,
      input.fullId || null,
      input.photographerName?.trim() || null,
      input.photographerContactType ?? null,
      input.photographerContactValue?.trim() || null,
      now,
      now,
    ],
  });
  const res = await db.execute({ sql: 'SELECT * FROM video_links WHERE id = ?', args: [id] });
  return rowToVideoLink(res.rows[0] as unknown as Record<string, unknown>);
}

export async function getVideoLinkBySlug(slug: string): Promise<VideoLink | null> {
  await initSchema();
  const res = await db.execute({ sql: 'SELECT * FROM video_links WHERE slug = ?', args: [slug] });
  return res.rows[0] ? rowToVideoLink(res.rows[0] as unknown as Record<string, unknown>) : null;
}

export async function getVideoLinkById(id: string): Promise<VideoLink | null> {
  await initSchema();
  const res = await db.execute({ sql: 'SELECT * FROM video_links WHERE id = ?', args: [id] });
  return res.rows[0] ? rowToVideoLink(res.rows[0] as unknown as Record<string, unknown>) : null;
}

export async function listVideoLinks(opts: { includeArchived?: boolean } = {}): Promise<VideoLink[]> {
  await initSchema();
  const sql = opts.includeArchived
    ? 'SELECT * FROM video_links ORDER BY created_at DESC'
    : 'SELECT * FROM video_links WHERE archived = 0 ORDER BY created_at DESC';
  const res = await db.execute(sql);
  return res.rows.map((r) => rowToVideoLink(r as unknown as Record<string, unknown>));
}

export async function setVideoLinkArchived(id: string, archived: boolean): Promise<void> {
  await initSchema();
  await db.execute({
    sql: 'UPDATE video_links SET archived = ?, updated_at = ? WHERE id = ?',
    args: [archived ? 1 : 0, nowIso(), id],
  });
}

export async function deleteVideoLink(id: string): Promise<void> {
  await initSchema();
  await db.execute({ sql: 'DELETE FROM video_links WHERE id = ?', args: [id] });
}
