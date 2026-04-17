// Known wedding galleries from the legacy site + new entries with real photos.
// `photoSlug` links to `PHOTOS[photoSlug]` in photos.generated.ts — the cover
// and gallery thumbnails are derived from there. `legacyUrl` is preserved for
// 301 redirects from the old Wix site.

import { PHOTOS } from './photos.generated';

export interface Wedding {
  slug: string;
  couple: string;
  venue: string;
  location: string;
  /** Key into PHOTOS; if present the gallery is auto-populated. */
  photoSlug?: string;
  /** Original Wix URL — keep for redirects. */
  legacyUrl: string;
}

export const WEDDINGS: Wedding[] = [
  {
    slug: 'elisabet-josep-orangerie-clos-barenys',
    couple: 'Elisabet & Josep',
    venue: 'L’Orangerie Clos Barenys',
    location: 'Tarragona',
    photoSlug: 'josep-eli',
    legacyUrl: '/boda-elisabet-josep-orangerie-clos-barenys-tarragona',
  },
  {
    slug: 'cristina-daniel-mas-la-boella',
    couple: 'Cristina & Daniel',
    venue: 'Mas La Boella',
    location: 'Tarragona',
    photoSlug: 'cristina-daniel',
    legacyUrl: '/boda-mas-la-boella-cristina-daniel-tarragona',
  },
  {
    slug: 'elena-jordi-masia-san-antonio',
    couple: 'Elena & Jordi',
    venue: 'Masia San Antonio',
    location: 'Tarragona',
    photoSlug: 'elena-jordi',
    legacyUrl: '/elena-jordi-boda-en-masia-san-antonio',
  },
  {
    slug: 'javi-olaya',
    couple: 'Javi & Olaya',
    venue: '—',
    location: 'Tarragona',
    photoSlug: 'javi-olaya',
    legacyUrl: '/javi-olaya', // not in legacy list, so just the new slug
  },
  {
    slug: 'marta-adria',
    couple: 'Marta & Adrià',
    venue: '—',
    location: 'Tarragona',
    photoSlug: 'marta-adria',
    legacyUrl: '/marta-adria',
  },
  {
    slug: 'idoya-pau-dosterras',
    couple: 'Idoya & Pau',
    venue: 'Dosterras Wine Garden',
    location: 'Tarragona',
    photoSlug: 'idoya-pau',
    legacyUrl: '/boda-idoya-pau-dosterras-wine-garden',
  },
  {
    slug: 'aaron-marta',
    couple: 'Aaron & Marta',
    venue: '—',
    location: 'Tarragona',
    photoSlug: 'aaron-marta',
    legacyUrl: '/aaron-marta',
  },
  {
    slug: 'jennifer-albert-can-marti',
    couple: 'Jennifer & Albert',
    venue: 'Masia Can Martí',
    location: 'Tarragona',
    photoSlug: 'jennifer-albert',
    legacyUrl: '/boda-masia-can-marti-jennifer-albert',
  },
  // Legacy entries without photos (placeholders — kept for redirect purposes)
  {
    slug: 'anika-alvaro-h10',
    couple: 'Anika & Álvaro',
    venue: 'H10',
    location: 'Tarragona',
    legacyUrl: '/boda-tarragona-h10-anika-alvaro',
  },
  {
    slug: 'gessami-francesc',
    couple: 'Gessamí & Francesc',
    venue: '—',
    location: 'Tarragona',
    legacyUrl: '/gessamifrancesc',
  },
  {
    slug: 'luis-craig-casa-joan-miret',
    couple: 'Luis & Craig',
    venue: 'Casa Joan Miret',
    location: 'Tarragona',
    legacyUrl: '/boda-luis-craig-casa-joan-miret-tarragona',
  },
  {
    slug: 'casablanca-cristal-miami-platja',
    couple: 'Casablanca Cristal',
    venue: 'Casablanca Cristal',
    location: 'Miami Platja',
    legacyUrl: '/fotografo-boda-casablanca-cristal-miami-platja',
  },
  {
    slug: 'jud-kike',
    couple: 'Jud & Kike',
    venue: '—',
    location: '—',
    legacyUrl: '/jud-kike-7-6-25',
  },
  {
    slug: 'josep-laura',
    couple: 'Josep & Laura',
    venue: '—',
    location: '—',
    legacyUrl: '/josep-laura',
  },
];

/** Cover image URL (medium size) for a wedding, or null if no photos. */
export function weddingCover(w: Wedding): string | null {
  if (!w.photoSlug) return null;
  const set = PHOTOS[w.photoSlug];
  if (!set || set.images.length === 0) return null;
  return set.images[0].variants.md;
}

/** Gallery images for a wedding (returns empty array if no photos). */
export function weddingGallery(w: Wedding) {
  if (!w.photoSlug) return [];
  return PHOTOS[w.photoSlug]?.images ?? [];
}
