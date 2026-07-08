// Extra venue landings for spaces we cover but don't yet have a real
// wedding gallery for. Each fragment carries the Catalan `base` (a Venue with
// no realWeddingSlug + portfolioIndices) and the es/en VenueLocaleCopy.
//
// These are merged into VENUES (venues.ts) and VENUES_I18N (venues.i18n.ts) so
// they flow through the same /venues/<slug> templates and the /venues pillar.
// Swap a venue to a real gallery later by giving its base a `realWeddingSlug`
// and removing `portfolioIndices`.

import type { Venue } from './venues';
import type { VenueLocaleMap } from './venues.i18n';

import { PARC_SAMA } from './venues/extra-parc-sama';
import { CASTELL_DE_TAMARIT } from './venues/extra-castell-de-tamarit';
import { MAS_PASSAMANER } from './venues/extra-mas-passamaner';
import { TERMES_MONTBRIO } from './venues/extra-termes-montbrio';
import { CASTELL_DE_LA_SUDA } from './venues/extra-castell-de-la-suda';

const FRAGMENTS = [PARC_SAMA, CASTELL_DE_TAMARIT, MAS_PASSAMANER, TERMES_MONTBRIO, CASTELL_DE_LA_SUDA];

export const EXTRA_VENUES: Venue[] = FRAGMENTS.map((f) => f.base);

export const EXTRA_VENUES_I18N: Record<string, VenueLocaleMap> = Object.fromEntries(
  FRAGMENTS.map((f) => [f.base.slug, { es: f.es, en: f.en }]),
);

/** Slugs that have their own fiche now (used by the pillar to link them). */
export const EXTRA_VENUE_SLUGS = new Set(EXTRA_VENUES.map((v) => v.slug));
