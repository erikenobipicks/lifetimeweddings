// Catalogue of full-wedding photo galleries hosted on external providers
// (mostly FotoStudio so far) that Eric can attach to a quote.
//
// Same shape and intent as `src/data/videos.ts`:
//
//   - The public site never enumerates these (galleries are visible by
//     URL only — they live on the host with their own access rules).
//   - The admin UI on /admin/new shows them in a dropdown above the
//     free-text URL input. Selecting one pastes its URL into the input;
//     leaving the dropdown on "—" keeps the input editable so we can
//     still send a one-off gallery URL (e.g. a fresh wedding not yet in
//     the catalogue) without having to add an entry first.
//   - On /p/<token>, ExternalGalleryEmbed renders the URL stored in
//     `quotes.flagship_external_gallery_url` regardless of whether it
//     came from this catalogue or was typed by hand.
//
// Adding entries is intentionally a code change — same pattern as videos
// — because each gallery represents real work and we want the list to
// stay curated.

export interface ExternalGallery {
  /** Full gallery URL (will be iframed on /p/<token>). */
  url: string;
  /** Couple name as it should show in the picker. */
  coupleName: string;
  /** Venue + (optional) town/region. */
  venue: string;
  /** Wedding date as ISO YYYY-MM-DD. Optional — helps Eric pick the
   *  freshest gallery when several leads have similar profiles. */
  date?: string;
  /** Free-text "vibe" tag shown in the admin picker only — context to
   *  help Eric remember which gallery matches each lead's style. */
  adminNote?: string;
}

export const externalGalleries: ExternalGallery[] = [
  {
    url: 'https://gallery.fotostudio.io/objectiu-fotografs/eli-josep-1',
    coupleName: 'Eli i Josep',
    venue: 'Orangerie Clos Barenys',
    adminNote: 'Boda civil, tot al mateix lloc',
  },
];
