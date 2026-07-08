// Registry for the "Elopement a Catalunya" topic cluster.
//
// Pillar copy lives in ./elopements/pillar.ts; each locality child is one
// file under ./elopements/. The child templates read ELOPEMENTS; the pillar
// template reads ELOPEMENTS (for the cards) + PILLAR (for its own copy).

import type { ElopementPage } from './elopements/types';
import { BARCELONA } from './elopements/barcelona';
import { TARRAGONA } from './elopements/tarragona';
import { COSTA_DAURADA } from './elopements/costa-daurada';
import { DELTA_EBRE } from './elopements/delta-ebre';

export { PILLAR } from './elopements/pillar';
export type { ElopementPage, ElopementPillarCopy, ElopeSectionCopy, ElopeFaq, ElopeSpot } from './elopements/types';

// Order = display order in the pillar grid (after the real Siurana flagship).
export const ELOPEMENTS: ElopementPage[] = [BARCELONA, TARRAGONA, COSTA_DAURADA, DELTA_EBRE];

export function getElopement(slug: string): ElopementPage | undefined {
  return ELOPEMENTS.find((e) => e.slug === slug);
}
