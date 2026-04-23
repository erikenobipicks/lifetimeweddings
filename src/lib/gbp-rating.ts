// Google Business Profile rating — fetched from the Places API (New) at render
// time, cached in-memory with a 24h TTL + stale-while-revalidate semantics,
// and a hard-coded fallback so the schema block always has a sensible value.
//
// Used exclusively by the home SSR in the 3 locales. Do NOT import from any
// other page — we don't want every request on the site to depend on this.
//
// Endpoint: GET https://places.googleapis.com/v1/places/{placeId}
// Field mask: rating, userRatingCount
// Docs: https://developers.google.com/maps/documentation/places/web-service/place-details
//
// Env vars (Railway):
//   - GOOGLE_PLACES_API_KEY  — Places API (New) key, must have "Places API (New)" enabled
//   - GOOGLE_PLACES_ID       — Place ID (starts with ChIJ…) for the Lifetime Weddings GBP
//
// If either env var is missing, we return the fallback immediately without
// making any network request. Same if the request fails or times out.

import './env';

export interface GbpRating {
  ratingValue: number;
  reviewCount: number;
  /** Where the value came from. Useful for debugging in logs. */
  source: 'live' | 'stale' | 'fallback';
}

// Hard-coded fallback values. Update these when the real GBP rating changes
// and we can't wait for the 24h cache to refresh.
const FALLBACK: Omit<GbpRating, 'source'> = {
  ratingValue: 5.0,
  reviewCount: 23,
};

const TTL_MS = 24 * 60 * 60 * 1000; // 24h
const FETCH_TIMEOUT_MS = 3000;

interface CacheEntry {
  data: Omit<GbpRating, 'source'>;
  expiresAt: number;
}

let cache: CacheEntry | null = null;
let refreshing: Promise<Omit<GbpRating, 'source'>> | null = null;

async function fetchFromApi(): Promise<Omit<GbpRating, 'source'>> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_ID;
  if (!apiKey || !placeId) {
    // Caller handles the "no env" case; we still throw here so the
    // refresh pipeline knows to keep fallback.
    throw new Error('missing env');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
    });
    if (!res.ok) {
      throw new Error(`places api ${res.status}`);
    }
    const data = (await res.json()) as { rating?: number; userRatingCount?: number };
    return {
      ratingValue: typeof data.rating === 'number' ? data.rating : FALLBACK.ratingValue,
      reviewCount: typeof data.userRatingCount === 'number' ? data.userRatingCount : FALLBACK.reviewCount,
    };
  } finally {
    clearTimeout(timer);
  }
}

function triggerRefresh(): Promise<Omit<GbpRating, 'source'>> {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    try {
      const fresh = await fetchFromApi();
      cache = { data: fresh, expiresAt: Date.now() + TTL_MS };
      return fresh;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        '[gbp-rating] fetch failed, keeping previous/fallback:',
        err instanceof Error ? err.message : String(err),
      );
      return cache?.data ?? FALLBACK;
    } finally {
      refreshing = null;
    }
  })();
  return refreshing;
}

/**
 * Returns the current GBP rating with stale-while-revalidate semantics.
 *
 *   - If cache is fresh (<= 24h): return cached, no network.
 *   - If cache is stale (> 24h): return stale, trigger background refresh.
 *   - If cache is empty: await fetch, fall back on failure.
 */
export async function getGbpRating(): Promise<GbpRating> {
  const now = Date.now();

  if (cache && cache.expiresAt > now) {
    return { ...cache.data, source: 'live' };
  }

  if (cache) {
    // Stale: refresh in the background without blocking.
    void triggerRefresh();
    return { ...cache.data, source: 'stale' };
  }

  // Cold start: must wait.
  try {
    const data = await triggerRefresh();
    // If this came from the fallback (no env / failed fetch), mark it as such.
    const isLive = cache != null && cache.expiresAt > now;
    return { ...data, source: isLive ? 'live' : 'fallback' };
  } catch {
    return { ...FALLBACK, source: 'fallback' };
  }
}
