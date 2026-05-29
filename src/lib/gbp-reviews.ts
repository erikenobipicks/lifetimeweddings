// Google Business Profile reviews — fetched from the Places API (New).
//
// Mirrors the pattern of `gbp-rating.ts`: per-locale cache, 24h TTL +
// stale-while-revalidate, empty-array fallback when the API is unreachable
// or env is missing.
//
// Translation strategy: the Places API translates review text on the server
// side when we pass `languageCode=<lang>` (Google Translate under the hood).
// We fetch and cache once per locale. Quality is decent but rougher than the
// hand-curated TESTIMONIALS in `src/data/testimonials.ts` — those stay
// authoritative and are placed first in the UI; GBP reviews are appended.
//
// Only the home renders this (via Testimonials.astro). Do NOT import from
// other pages — we don't want every request on the site to depend on it.
//
// We do NOT pipe these into JSON-LD: Google's structured-data guidance
// discourages republishing third-party reviews you obtained from another
// platform (it can dilute review-snippet eligibility). The 3 curated
// testimonials remain the only Review children of LocalBusiness.
//
// Endpoint: GET https://places.googleapis.com/v1/places/{placeId}?languageCode=<lang>
// Field mask: reviews
// Docs: https://developers.google.com/maps/documentation/places/web-service/place-details
//
// Env vars (same as gbp-rating.ts — no new credentials needed):
//   - GOOGLE_PLACES_API_KEY
//   - GOOGLE_PLACES_ID

import './env';
import type { Lang } from '~/i18n/ui';

export interface GbpReview {
  /** Stable identifier derived from the Places API review resource name. */
  id: string;
  /** Display name as Google returns it (typically "First L."). */
  author: string;
  /** Star rating 1-5. We only surface 5★. */
  rating: number;
  /** Review text in the requested locale (Google-translated when needed). */
  text: string;
  /** ISO publication date. */
  publishedAt: string;
}

const TTL_MS = 24 * 60 * 60 * 1000; // 24h
const FETCH_TIMEOUT_MS = 3000;
/** Places API returns at most 5 reviews per place. */
const MAX_REVIEWS = 5;

interface CacheEntry {
  data: GbpReview[];
  expiresAt: number;
}

const cacheByLang = new Map<Lang, CacheEntry>();
const refreshingByLang = new Map<Lang, Promise<GbpReview[]>>();

interface PlacesReview {
  name?: string;
  rating?: number;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
}

async function fetchFromApi(lang: Lang): Promise<GbpReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_ID;
  if (!apiKey || !placeId) throw new Error('missing env');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${lang}`,
      {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'reviews',
        },
      },
    );
    if (!res.ok) throw new Error(`places api ${res.status}`);
    const data = (await res.json()) as { reviews?: PlacesReview[] };
    return (data.reviews ?? [])
      .filter((r) => r.rating === 5)
      .map((r): GbpReview => ({
        id: (r.name ?? '').split('/').pop() ?? '',
        author: r.authorAttribution?.displayName ?? 'Google',
        rating: r.rating!,
        text: (r.text?.text ?? r.originalText?.text ?? '').trim(),
        publishedAt: r.publishTime ?? '',
      }))
      .filter((r) => r.text.length > 0)
      .slice(0, MAX_REVIEWS);
  } finally {
    clearTimeout(timer);
  }
}

function triggerRefresh(lang: Lang): Promise<GbpReview[]> {
  const existing = refreshingByLang.get(lang);
  if (existing) return existing;
  const job = (async () => {
    try {
      const fresh = await fetchFromApi(lang);
      cacheByLang.set(lang, { data: fresh, expiresAt: Date.now() + TTL_MS });
      return fresh;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        `[gbp-reviews:${lang}] fetch failed, keeping previous/fallback:`,
        err instanceof Error ? err.message : String(err),
      );
      return cacheByLang.get(lang)?.data ?? [];
    } finally {
      refreshingByLang.delete(lang);
    }
  })();
  refreshingByLang.set(lang, job);
  return job;
}

/**
 * Returns the GBP reviews for a locale with stale-while-revalidate.
 *
 *   - Fresh cache: returned immediately, no network.
 *   - Stale cache: returned immediately, background refresh kicked off.
 *   - Empty cache: awaits the fetch; returns [] on failure (caller renders
 *     the curated testimonials alone).
 */
export async function getGbpReviews(lang: Lang): Promise<GbpReview[]> {
  const now = Date.now();
  const cached = cacheByLang.get(lang);
  if (cached && cached.expiresAt > now) return cached.data;
  if (cached) {
    void triggerRefresh(lang);
    return cached.data;
  }
  try {
    return await triggerRefresh(lang);
  } catch {
    return [];
  }
}
