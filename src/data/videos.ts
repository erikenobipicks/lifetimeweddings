// Wedding trailer YouTube videos. Each entry becomes a card on /videos
// and a VideoObject in the page's JSON-LD so Google can surface the clip
// enriched in search results.
//
// Thumbnail is pulled automatically from YouTube:
//   https://i.ytimg.com/vi/<id>/maxresdefault.jpg  (HD, falls back to hq)
// Embed URL uses youtube-nocookie.com to avoid setting tracking cookies
// until the viewer actively plays the video.

export interface VideoTrailer {
  /** YouTube video ID, e.g. the `Q8mJr2BnfUc` in youtu.be/Q8mJr2BnfUc */
  youtubeId: string;
  /** Couple name as shown on the card, in the language of the wedding. */
  coupleName: string;
  /** Venue + (optional) town/region. */
  venue: string;
  /** Wedding date as ISO YYYY-MM-DD. */
  date: string;
}

export const videos: VideoTrailer[] = [
  {
    youtubeId: 'gXpPjD_APAE',
    coupleName: 'Elena i Jordi',
    venue: 'Montferri i Masia San Antonio',
    date: '2025-06-21',
  },
  {
    youtubeId: 'hM2h9zJ6e3k',
    coupleName: 'Marta & Adrià',
    venue: 'Ca n’Alzina',
    date: '2025-05-17',
  },
  {
    youtubeId: 'Q8mJr2BnfUc',
    coupleName: 'Vanesa i David',
    venue: 'Castell del Rourell',
    date: '2024-06-15',
  },
  {
    youtubeId: 'WOxFlnAVJ8c',
    coupleName: 'Katrika y Adrián',
    venue: 'Hotel Termes de Montbrió',
    date: '2024-05-17',
  },
];

/** Preferred YouTube thumbnail (HD when available). */
export function videoThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

/** Thumbnail fallback — always exists for every public video. */
export function videoThumbFallback(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/** Privacy-friendlier embed URL (no tracking cookies until play). */
export function videoEmbed(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}

/** Canonical watch URL (used in schema.contentUrl). */
export function videoWatch(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}
