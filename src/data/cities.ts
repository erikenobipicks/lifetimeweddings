// Registry for the per-city photo + video wedding clusters.
//
// Non-copy base data lives here; per-city trilingual copy lives in
// ./cities/<slug>.photo.ts and ./cities/<slug>.video.ts. The pillar copy is in
// ./cities/pillars.ts.

import type { CityBase, CityPage } from './cities/types';
export type { CityPage, CityBase, CityServiceCopy, CityPillarCopy, CitySpot, CityFaq, Service } from './cities/types';
export { PHOTO_PILLAR, VIDEO_PILLAR } from './cities/pillars';

import { TARRAGONA_PHOTO } from './cities/tarragona.photo';
import { TARRAGONA_VIDEO } from './cities/tarragona.video';
import { REUS_PHOTO } from './cities/reus.photo';
import { REUS_VIDEO } from './cities/reus.video';
import { LLEIDA_PHOTO } from './cities/lleida.photo';
import { LLEIDA_VIDEO } from './cities/lleida.video';
import { CAMBRILS_PHOTO } from './cities/cambrils.photo';
import { CAMBRILS_VIDEO } from './cities/cambrils.video';
import { SALOU_PHOTO } from './cities/salou.photo';
import { SALOU_VIDEO } from './cities/salou.video';
import { MONTBLANC_PHOTO } from './cities/montblanc.photo';
import { MONTBLANC_VIDEO } from './cities/montblanc.video';
import { TORTOSA_PHOTO } from './cities/tortosa.photo';
import { TORTOSA_VIDEO } from './cities/tortosa.video';

// Display / grid order.
const CITY_BASE: CityBase[] = [
  {
    slug: 'tarragona',
    name: 'Tarragona',
    province: 'Tarragona',
    areaServed: ['Tarragona', 'Camp de Tarragona', 'Costa Daurada', 'Tamarit'],
    locationPrefill: 'Tarragona',
    imageIndices: [1, 2, 3, 4, 5, 6, 7, 8],
    relatedWeddingSlugs: ['cristina-daniel-mas-la-boella', 'elena-jordi-masia-san-antonio', 'vanesa-david-forti-del-rourell'],
    videoId: 'gXpPjD_APAE',
    legacyZoneSlug: 'tarragona',
  },
  {
    slug: 'reus',
    name: 'Reus',
    province: 'Tarragona',
    areaServed: ['Reus', 'Baix Camp', 'Camp de Tarragona'],
    locationPrefill: 'Reus',
    imageIndices: [9, 10, 11, 12, 13, 14, 15, 16],
    relatedWeddingSlugs: ['idoya-pau-dosterras', 'aaron-marta'],
    videoId: 'WOxFlnAVJ8c',
    legacyZoneSlug: 'reus',
  },
  {
    slug: 'lleida',
    name: 'Lleida',
    province: 'Lleida',
    areaServed: ['Lleida', 'Segrià', 'Terres de Lleida', 'Ponent'],
    locationPrefill: 'Lleida',
    imageIndices: [17, 18, 19, 20, 21, 22, 23, 24],
    relatedWeddingSlugs: ['jennifer-albert-can-marti', 'marta-adria'],
    legacyZoneSlug: 'lleida',
  },
  {
    slug: 'cambrils',
    name: 'Cambrils',
    province: 'Tarragona',
    areaServed: ['Cambrils', 'Baix Camp', 'Costa Daurada'],
    locationPrefill: 'Cambrils',
    imageIndices: [25, 26, 27, 28, 29, 30],
    relatedWeddingSlugs: ['idoya-pau-dosterras', 'aaron-marta'],
  },
  {
    slug: 'salou',
    name: 'Salou',
    province: 'Tarragona',
    areaServed: ['Salou', 'Cap de Salou', 'Costa Daurada'],
    locationPrefill: 'Salou',
    imageIndices: [31, 32, 33, 1, 2, 3],
    relatedWeddingSlugs: ['aaron-marta', 'javi-olaya'],
  },
  {
    slug: 'montblanc',
    name: 'Montblanc',
    province: 'Tarragona',
    areaServed: ['Montblanc', 'Conca de Barberà', 'Camp de Tarragona'],
    locationPrefill: 'Montblanc',
    imageIndices: [4, 5, 6, 7, 8, 9],
    relatedWeddingSlugs: ['jennifer-albert-can-marti', 'elena-jordi-masia-san-antonio'],
  },
  {
    slug: 'tortosa',
    name: 'Tortosa',
    province: 'Tarragona',
    areaServed: ['Tortosa', 'Baix Ebre', "Terres de l'Ebre"],
    locationPrefill: 'Tortosa',
    imageIndices: [10, 11, 12, 13, 14, 15],
    relatedWeddingSlugs: ['elisabet-josep-orangerie-clos-barenys', 'idoya-pau-dosterras'],
  },
];

const COPY: Record<string, { photo: CityPage['copy']['photo']; video: CityPage['copy']['video'] }> = {
  tarragona: { photo: TARRAGONA_PHOTO, video: TARRAGONA_VIDEO },
  reus: { photo: REUS_PHOTO, video: REUS_VIDEO },
  lleida: { photo: LLEIDA_PHOTO, video: LLEIDA_VIDEO },
  cambrils: { photo: CAMBRILS_PHOTO, video: CAMBRILS_VIDEO },
  salou: { photo: SALOU_PHOTO, video: SALOU_VIDEO },
  montblanc: { photo: MONTBLANC_PHOTO, video: MONTBLANC_VIDEO },
  tortosa: { photo: TORTOSA_PHOTO, video: TORTOSA_VIDEO },
};

export const CITIES: CityPage[] = CITY_BASE.map((base) => ({
  ...base,
  copy: COPY[base.slug],
}));

export function getCity(slug: string): CityPage | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/** Old /zones slug -> new photo child slug, for the 301 map. */
export const ZONE_REDIRECTS: Record<string, string> = Object.fromEntries(
  CITIES.filter((c) => c.legacyZoneSlug).map((c) => [c.legacyZoneSlug as string, c.slug]),
);
