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

export type IgMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

export interface IgPost {
  id: string;
  caption: string | null;
  permalink: string;
  mediaUrl: string;
  thumbnailUrl: string;
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

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
let cache: { at: number; posts: IgPost[] } | null = null;

export async function getRecentPosts(limit = 12): Promise<IgPost[]> {
  const feedId = process.env.BEHOLD_FEED_ID;
  if (!feedId) return [];

  if (cache && Date.now() - cache.at < CACHE_TTL_MS && cache.posts.length >= limit) {
    return cache.posts.slice(0, limit);
  }

  try {
    const res = await fetch(`https://feeds.behold.so/${feedId}`);
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('[behold] HTTP error', res.status);
      return cache?.posts ?? [];
    }
    const body = (await res.json()) as BeholdResponse;
    const posts: IgPost[] = body.posts.map((p) => {
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
      return {
        id: p.id,
        caption: (p.prunedCaption ?? p.caption ?? null) || null,
        permalink: p.permalink,
        mediaUrl: p.mediaType === 'VIDEO' ? (p.mediaUrl) : stableImg,
        thumbnailUrl: thumb,
        mediaType: p.mediaType,
        timestamp: p.timestamp,
      };
    });
    cache = { at: Date.now(), posts };
    return posts.slice(0, limit);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[behold] fetch failed', err);
    return cache?.posts ?? [];
  }
}
