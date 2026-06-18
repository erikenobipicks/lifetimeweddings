// Wedding YouTube videos. Two kinds:
//
//   - `trailer` — public catalog. Shown on /videos and in VideoObject
//     JSON-LD so Google can surface them. Used as the flagship trailer
//     on /p/<token> when no override is set.
//   - `full`    — full-length wedding films. Unlisted on YouTube so they
//     don't surface organically. Eric picks them in /admin/new when a
//     lead is engaged enough to want to see a complete wedding (typical
//     after a videocall). NOT shown on /videos.
//
// Thumbnail is pulled automatically from YouTube:
//   https://i.ytimg.com/vi/<id>/maxresdefault.jpg  (HD, falls back to hq)
// Embed URL uses youtube-nocookie.com to avoid setting tracking cookies
// until the viewer actively plays the video.

export type VideoKind = 'trailer' | 'full';

export interface Video {
  /** YouTube video ID, e.g. the `Q8mJr2BnfUc` in youtu.be/Q8mJr2BnfUc */
  youtubeId: string;
  /** Couple name as shown on the card, in the language of the wedding. */
  coupleName: string;
  /** Venue + (optional) town/region. */
  venue: string;
  /** Wedding date as ISO YYYY-MM-DD. */
  date: string;
  /** Trailer (public) vs full wedding film (unlisted on YouTube). */
  kind: VideoKind;
  /** Free-text "vibe" tag shown in the admin picker only — useful when
   *  Eric has 5+ full films and wants to remember which one matches the
   *  lead's style (e.g. "boda al aire libre, cerimònia civil, masia"). */
  adminNote?: string;
}

/** Backwards-compat alias. Older imports keep working without changes. */
export type VideoTrailer = Video;

export const videos: Video[] = [
  {
    youtubeId: 'gXpPjD_APAE',
    coupleName: 'Elena i Jordi',
    venue: 'Montferri i Masia San Antonio',
    date: '2025-06-21',
    kind: 'trailer',
  },
  {
    youtubeId: 'hM2h9zJ6e3k',
    coupleName: 'Marta & Adrià',
    venue: 'Ca n’Alzina',
    date: '2025-05-17',
    kind: 'trailer',
  },
  {
    youtubeId: 'Q8mJr2BnfUc',
    coupleName: 'Vanesa i David',
    venue: 'Castell del Rourell',
    date: '2024-06-15',
    kind: 'trailer',
  },
  {
    youtubeId: 'WOxFlnAVJ8c',
    coupleName: 'Katrika y Adrián',
    venue: 'Hotel Termes de Montbrió',
    date: '2024-05-17',
    kind: 'trailer',
  },

  // ─── Full wedding films (unlisted on YouTube) ───────────────────────
  {
    youtubeId: 'HLfJXOpZ8L0',
    coupleName: 'Marta i Adrià',
    venue: 'Ca n’Alzina',
    date: '2025-05-17',
    kind: 'full',
    adminNote: 'Cerimònia civil, masia entorn natural, tot al mateix lloc',
  },
  {
    youtubeId: 'XFIO1aeeQjQ',
    coupleName: 'Esther i Jesús',
    venue: 'Heretat Sabartés',
    date: '2024-06-15',
    kind: 'full',
    adminNote: 'Mostra Heretat Sabartés — per a parelles interessades en aquesta finca',
  },
];

/** Public-facing list — what we show on /videos and JSON-LD. Drops the
 *  full-length films (which live unlisted on YouTube anyway). */
export const publicVideos: Video[] = videos.filter((v) => v.kind === 'trailer');

/** Full wedding films catalogue — admin-only picker uses this. */
export const fullVideos: Video[] = videos.filter((v) => v.kind === 'full');

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
