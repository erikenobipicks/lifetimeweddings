// Instagram feed via Behold (https://behold.so).
// Behold handles all the Meta Graph API auth/tokens complexity for us and
// exposes a simple JSON endpoint: https://feeds.behold.so/<feedId>
// Images are also served from a stable CDN (behold.pictures) so URLs don't
// expire like raw Instagram CDN URLs do.
//
// Required env var (see .env.example):
//   BEHOLD_FEED_ID  — the feed ID shown in your Behold dashboard
//
// If BEHOLD_FEED_ID is missing, getRecentPosts() returns [] and the component
// falls back to placeholder images, so the site never breaks.

import './env';
import { db } from './db';

export type IgMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

export interface IgPost {
  id: string;
  caption: string | null;
  permalink: string;
  mediaUrl: string;
  thumbnailUrl: string;
  /** Responsive `srcset` built from Behold's size variants (`<url> <w>w`).
   *  Empty string when no sized variants are available. */
  thumbnailSrcset: string;
  mediaType: IgMediaType;
  timestamp: string;
}

interface BeholdSize { mediaUrl: string; width: number; height: number }
interface BeholdPost {
  id: string;
  timestamp: string;
  permalink: string;
  mediaType: IgMediaType;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  prunedCaption?: string;
  sizes?: {
    small?: BeholdSize;
    medium?: BeholdSize;
    large?: BeholdSize;
    full?: BeholdSize;
  };
}
interface BeholdResponse {
  username?: string;
  biography?: string;
  profilePictureUrl?: string;
  followersCount?: number;
  posts: BeholdPost[];
}

// Refresh Behold at most twice a day. The fetched feed is persisted in the DB
// (`instagram_cache` table) so it survives restarts and redeploys — without
// that persistence, every redeploy cleared the in-memory cache and re-fetched
// Behold, and a busy month could blow past their free-tier quota
// (1,200 "views"/month = JSON requests) and pause the feed. With this, Behold
// is hit ~2×/day regardless of traffic or how often we deploy; page renders
// read from the DB (and an in-process memo), not from Behold.
const REFRESH_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

// Per-process memo so repeated renders don't even touch the DB.
let mem: { feedId: string; at: number; posts: IgPost[] } | null = null;

function mapPosts(body: BeholdResponse): IgPost[] {
  return body.posts.map((p) => {
    // Prefer the stable behold.pictures CDN image over raw IG CDN (which expires).
    const stableImg =
      p.sizes?.large?.mediaUrl ??
      p.sizes?.medium?.mediaUrl ??
      p.sizes?.full?.mediaUrl ??
      p.mediaUrl;
    const thumb =
      p.sizes?.medium?.mediaUrl ??
      p.sizes?.small?.mediaUrl ??
      p.thumbnailUrl ??
      stableImg;
    // Responsive srcset so small grid cells (½ width on mobile, ¼ on
    // desktop) fetch a small variant instead of the large one — saves
    // bandwidth and speeds up the below-the-fold grid. Dedupe by width.
    const seen = new Set<number>();
    const thumbnailSrcset = [p.sizes?.small, p.sizes?.medium, p.sizes?.large]
      .filter((s): s is BeholdSize => !!s?.mediaUrl && !!s.width)
      .filter((s) => (seen.has(s.width) ? false : (seen.add(s.width), true)))
      .map((s) => `${s.mediaUrl} ${s.width}w`)
      .join(', ');
    return {
      id: p.id,
      caption: (p.prunedCaption ?? p.caption ?? null) || null,
      permalink: p.permalink,
      mediaUrl: p.mediaType === 'VIDEO' ? p.mediaUrl : stableImg,
      thumbnailUrl: thumb,
      thumbnailSrcset,
      mediaType: p.mediaType,
      timestamp: p.timestamp,
    };
  });
}

async function fetchFromBehold(feedId: string): Promise<IgPost[]> {
  const res = await fetch(`https://feeds.behold.so/${feedId}`);
  if (!res.ok) throw new Error(`behold HTTP ${res.status}`);
  return mapPosts((await res.json()) as BeholdResponse);
}

// ── DB-persisted cache ──────────────────────────────────────────────────────
let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await db.execute(
    `CREATE TABLE IF NOT EXISTS instagram_cache (
       feed_id TEXT PRIMARY KEY,
       posts_json TEXT NOT NULL,
       fetched_at INTEGER NOT NULL
     )`,
  );
  tableReady = true;
}

async function readCache(feedId: string): Promise<{ at: number; posts: IgPost[] } | null> {
  try {
    await ensureTable();
    const r = await db.execute({
      sql: 'SELECT posts_json, fetched_at FROM instagram_cache WHERE feed_id = ?',
      args: [feedId],
    });
    const row = r.rows[0];
    if (!row) return null;
    return { at: Number(row.fetched_at), posts: JSON.parse(String(row.posts_json)) as IgPost[] };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[behold] DB read failed', err);
    return null;
  }
}

async function writeCache(feedId: string, posts: IgPost[], at: number): Promise<void> {
  try {
    await ensureTable();
    await db.execute({
      sql: `INSERT INTO instagram_cache (feed_id, posts_json, fetched_at) VALUES (?, ?, ?)
            ON CONFLICT(feed_id) DO UPDATE SET posts_json = excluded.posts_json, fetched_at = excluded.fetched_at`,
      args: [feedId, JSON.stringify(posts), at],
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[behold] DB write failed', err);
  }
}

export async function getRecentPosts(limit = 12): Promise<IgPost[]> {
  const feedId = process.env.BEHOLD_FEED_ID;
  if (!feedId) return [];
  const now = Date.now();

  // 1) in-process memo
  if (mem && mem.feedId === feedId && now - mem.at < REFRESH_TTL_MS) {
    return mem.posts.slice(0, limit);
  }

  // 2) DB cache — survives restarts/redeploys, so they don't burn Behold quota
  const cached = await readCache(feedId);
  if (cached && now - cached.at < REFRESH_TTL_MS) {
    mem = { feedId, at: cached.at, posts: cached.posts };
    return cached.posts.slice(0, limit);
  }

  // 3) stale or missing → refresh from Behold (at most once per REFRESH_TTL_MS)
  try {
    const posts = await fetchFromBehold(feedId);
    if (posts.length > 0) {
      await writeCache(feedId, posts, now);
      mem = { feedId, at: now, posts };
      return posts.slice(0, limit);
    }
    // Behold returned 0 posts (e.g. feed paused on the free plan). Keep the
    // last good data rather than blanking the section, and throttle so we
    // don't re-poll every render while it stays empty.
    const fallback = cached?.posts ?? [];
    mem = { feedId, at: now, posts: fallback };
    return fallback.slice(0, limit);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[behold] fetch failed', err);
    const fallback = cached?.posts ?? mem?.posts ?? [];
    // Soft-throttle retries on persistent failure (~5 min) without holding a
    // full 12h, so a transient outage recovers quickly.
    mem = { feedId, at: now - REFRESH_TTL_MS + 5 * 60 * 1000, posts: fallback };
    return fallback.slice(0, limit);
  }
}
