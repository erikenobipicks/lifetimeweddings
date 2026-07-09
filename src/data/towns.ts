// Registry for the coastal micro-niche town cluster.
// Non-copy base data here; per-town trilingual copy in ./towns/<slug>.ts.

import type { TownBase, TownPage } from './towns/types';
export type { TownPage, TownBase, TownServiceCopy, TownSpot, TownVenue, TownFaq } from './towns/types';

import { SALOU_TOWN } from './towns/salou';
import { CAMBRILS_TOWN } from './towns/cambrils';
import { VILAFORTUNY_TOWN } from './towns/vilafortuny';
import { MONT_ROIG_TOWN } from './towns/mont-roig-del-camp';
import { HOSPITALET_TOWN } from './towns/hospitalet-de-linfant';
import { MIAMI_PLATJA_TOWN } from './towns/miami-platja';
import { ALTAFULLA_TOWN } from './towns/altafulla';
import { VILA_SECA_TOWN } from './towns/vila-seca';
import { TORREDEMBARRA_TOWN } from './towns/torredembarra';
import { AMETLLA_DE_MAR_TOWN } from './towns/ametlla-de-mar';

const BASE: TownBase[] = [
  { slug: 'salou', name: 'Salou', comarca: 'Tarragonès · Costa Daurada', province: 'Tarragona', areaServed: ['Salou', 'Cap de Salou', 'Tarragonès', 'Costa Daurada'], locationPrefill: 'Salou', imageIndices: [1, 2, 3, 4, 5, 6, 7], relatedWeddingSlugs: ['aaron-marta', 'javi-olaya'], siblingSlugs: ['cambrils', 'vilafortuny', 'vila-seca', 'miami-platja'] },
  { slug: 'cambrils', name: 'Cambrils', comarca: 'Baix Camp · Costa Daurada', province: 'Tarragona', areaServed: ['Cambrils', 'Baix Camp', 'Costa Daurada'], locationPrefill: 'Cambrils', imageIndices: [8, 9, 10, 11, 12, 13, 14], relatedWeddingSlugs: ['idoya-pau-dosterras', 'aaron-marta'], siblingSlugs: ['salou', 'vilafortuny', 'miami-platja', 'altafulla'] },
  { slug: 'vilafortuny', name: 'Vilafortuny', comarca: 'Cambrils · Baix Camp', province: 'Tarragona', areaServed: ['Vilafortuny', 'Cambrils', 'Baix Camp', 'Costa Daurada'], locationPrefill: 'Vilafortuny', imageIndices: [15, 16, 17, 18, 19, 20, 21], relatedWeddingSlugs: ['javi-olaya', 'marta-adria'], siblingSlugs: ['cambrils', 'salou', 'miami-platja', 'vila-seca'] },
  { slug: 'mont-roig-del-camp', name: 'Mont-roig del Camp', comarca: 'Baix Camp', province: 'Tarragona', areaServed: ['Mont-roig del Camp', 'Baix Camp'], locationPrefill: 'Mont-roig del Camp', imageIndices: [22, 23, 24, 25, 26, 27, 28], relatedWeddingSlugs: ['idoya-pau-dosterras', 'aaron-marta'], siblingSlugs: ['miami-platja', 'cambrils', 'hospitalet-de-linfant', 'ametlla-de-mar'] },
  { slug: 'hospitalet-de-linfant', name: "L'Hospitalet de l'Infant", comarca: 'Baix Camp · Costa Daurada', province: 'Tarragona', areaServed: ["L'Hospitalet de l'Infant", 'Vandellòs', 'Baix Camp', 'Costa Daurada'], locationPrefill: "L'Hospitalet de l'Infant", imageIndices: [29, 30, 31, 32, 33, 1, 2], relatedWeddingSlugs: ['aaron-marta', 'javi-olaya'], siblingSlugs: ['miami-platja', 'mont-roig-del-camp', 'ametlla-de-mar', 'cambrils'] },
  { slug: 'miami-platja', name: 'Miami Platja', comarca: 'Mont-roig del Camp · Costa Daurada', province: 'Tarragona', areaServed: ['Miami Platja', 'Mont-roig del Camp', 'Baix Camp', 'Costa Daurada'], locationPrefill: 'Miami Platja', imageIndices: [3, 4, 5, 6, 7, 8, 9], relatedWeddingSlugs: ['idoya-pau-dosterras', 'marta-adria'], siblingSlugs: ['mont-roig-del-camp', 'hospitalet-de-linfant', 'cambrils', 'salou'] },
  { slug: 'altafulla', name: 'Altafulla', comarca: 'Tarragonès · Costa Daurada', province: 'Tarragona', areaServed: ['Altafulla', 'Tamarit', 'Tarragonès', 'Costa Daurada'], locationPrefill: 'Altafulla', imageIndices: [10, 11, 12, 13, 14, 15, 16], relatedWeddingSlugs: ['cristina-daniel-mas-la-boella', 'vanesa-david-forti-del-rourell'], siblingSlugs: ['torredembarra', 'vila-seca', 'salou', 'cambrils'] },
  { slug: 'vila-seca', name: 'Vila-seca i La Pineda', comarca: 'Tarragonès · Costa Daurada', province: 'Tarragona', areaServed: ['Vila-seca', 'La Pineda', 'Tarragonès', 'Costa Daurada'], locationPrefill: 'Vila-seca / La Pineda', imageIndices: [17, 18, 19, 20, 21, 22, 23], realPhotoSlug: 'josep-eli', relatedWeddingSlugs: ['elisabet-josep-orangerie-clos-barenys', 'idoya-pau-dosterras'], siblingSlugs: ['salou', 'cambrils', 'altafulla', 'torredembarra'] },
  { slug: 'torredembarra', name: 'Torredembarra', comarca: 'Tarragonès · Costa Daurada', province: 'Tarragona', areaServed: ['Torredembarra', 'Els Muntanyans', 'Tarragonès', 'Costa Daurada'], locationPrefill: 'Torredembarra', imageIndices: [24, 25, 26, 27, 28, 29, 30], relatedWeddingSlugs: ['elena-jordi-masia-san-antonio', 'cristina-daniel-mas-la-boella'], siblingSlugs: ['altafulla', 'vila-seca', 'salou', 'cambrils'] },
  { slug: 'ametlla-de-mar', name: "L'Ametlla de Mar", comarca: "Baix Ebre · Costa Daurada", province: 'Tarragona', areaServed: ["L'Ametlla de Mar", 'Baix Ebre', "Terres de l'Ebre", 'Costa Daurada'], locationPrefill: "L'Ametlla de Mar", imageIndices: [1, 9, 17, 25, 2, 10, 18], relatedWeddingSlugs: ['jennifer-albert-can-marti', 'idoya-pau-dosterras'], siblingSlugs: ['hospitalet-de-linfant', 'mont-roig-del-camp', 'miami-platja', 'cambrils'] },
];

const COPY: Record<string, TownPage['copy']> = {
  salou: SALOU_TOWN,
  cambrils: CAMBRILS_TOWN,
  vilafortuny: VILAFORTUNY_TOWN,
  'mont-roig-del-camp': MONT_ROIG_TOWN,
  'hospitalet-de-linfant': HOSPITALET_TOWN,
  'miami-platja': MIAMI_PLATJA_TOWN,
  altafulla: ALTAFULLA_TOWN,
  'vila-seca': VILA_SECA_TOWN,
  torredembarra: TORREDEMBARRA_TOWN,
  'ametlla-de-mar': AMETLLA_DE_MAR_TOWN,
};

export const TOWNS: TownPage[] = BASE.map((b) => ({ ...b, copy: COPY[b.slug] }));

export function getTown(slug: string): TownPage | undefined {
  return TOWNS.find((tn) => tn.slug === slug);
}
