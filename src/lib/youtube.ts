// Pull the latest videos from the Lifetime Weddings YouTube channel using
// YouTube's public Atom feed (no API key needed, no auth).
//
// Channel handle: @lifetime.weddings  → channel ID UCuJ0g4nYwjGB1PIeWlTrOlg
// Feed URL:      https://www.youtube.com/feeds/videos.xml?channel_id=...
//
// Results are cached in-memory for 6 hours so we don't hammer YouTube on
// every page render. If the fetch fails (offline, rate-limited), the last
// known good response is served — and if there's never been one, an empty
// array so the component falls back to a single manual embed.

import './env';

export interface YouTubeVideo {
  id: string;           // 11-char YouTube video id
  title: string;
  publishedAt: string;  // ISO
  thumbnailUrl: string; // i.ytimg.com/vi/.../hqdefault.jpg
  url: string;          // https://www.youtube.com/watch?v=...
}

const DEFAULT_CHANNEL_ID = 'UCuJ0g4nYwjGB1PIeWlTrOlg';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

let cache: { at: number; videos: YouTubeVideo[] } | null = null;

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function parseFeed(xml: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  // The channel's own <entry> for the channel itself has no videoId, so it
  // gets naturally skipped by the regex below (which requires <yt:videoId>).
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(xml))) {
    const entry = m[1];
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    if (!id) continue;
    const title = decodeEntities(entry.match(/<title>([^<]+)<\/title>/)?.[1] ?? '');
    const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? '';
    videos.push({
      id,
      title,
      publishedAt,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`,
    });
  }
  return videos;
}

export async function getLatestVideos(limit = 6): Promise<YouTubeVideo[]> {
  const channelId = process.env.YT_CHANNEL_ID ?? DEFAULT_CHANNEL_ID;
  if (cache && Date.now() - cache.at < CACHE_TTL_MS && cache.videos.length >= limit) {
    return cache.videos.slice(0, limit);
  }

  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LifetimeWeb/1.0)' },
    });
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('[youtube] HTTP error', res.status);
      return cache?.videos ?? [];
    }
    const xml = await res.text();
    const videos = parseFeed(xml);
    cache = { at: Date.now(), videos };
    return videos.slice(0, limit);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[youtube] fetch failed', err);
    return cache?.videos ?? [];
  }
}
