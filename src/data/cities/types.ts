// Shared types for the per-city photo + video wedding clusters.
//
// One CityPage per locality (Tarragona + Lleida provinces). Each carries a
// `photo` and a `video` copy block, both trilingual, so the two service
// clusters stay in lockstep and cross-link cleanly (foto <-> vídeo per city).
//
// Photo pages live at /fotograf-boda-<slug>, video pages at
// /videograf-boda-<slug>. The photo cluster supersedes the old /zones pages
// (301-redirected in astro.config.mjs).
//
// Honesty rule (same as the elopement cluster): where we have no real gallery
// tied to the city we use real portfolio imagery (PHOTOS['generic']) with
// neutral alt text and link out to genuine real work — never a faked "real
// wedding in <town>".

import type { Lang } from '~/i18n/ui';

export type Service = 'photo' | 'video';

export interface CitySpot {
  /** Iconic place in/near the city to shoot a wedding or session. */
  name: string;
  /** 1–3 sentences: why it works + the photographer/videographer POV. */
  body: string;
}

export interface CityFaq {
  q: string;
  a: string;
}

/** Per-(service, language) copy for one city. */
export interface CityServiceCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; sub: string; heroAlt: string };
  /** Teaser for the pillar grid. */
  cardTitle: string;
  cardBlurb: string;
  /** Opening editorial block (we, in this city, this craft). */
  intro: { title: string; paras: string[] };
  /** Iconic spots — the city-specific heart of the page. */
  spots: { title: string; intro: string; items: CitySpot[] };
  /** Ambience / style of the area and how it shapes the coverage. */
  style: { title: string; paras: string[] };
  /** How we shoot photo / film video here (bullets). */
  approach: { title: string; bullets: string[] };
  /** Optional: nearby venues / restaurants we work at, with internal links to
   *  our own fiches or other landings (preferred) or an external site
   *  (rendered nofollow). Used to broaden a city page across its whole area. */
  areaVenues?: {
    title: string;
    intro: string;
    items: Array<{ name: string; body: string; href?: string; externalUrl?: string }>;
  };
  /** Optional mid-funnel CTA band. */
  midCta?: { title: string; body: string; label: string };
  gallery: { title: string; intro: string };
  faqTitle: string;
  faqs: CityFaq[];
  finalCta: { h2: string; body: string };
  formTitle: string;
  formIntro: string;
  whatsAppMessage: string;
  breadcrumbCurrent: string;
}

export interface CityBase {
  /** URL slug — routes: /fotograf-boda-<slug> and /videograf-boda-<slug>. */
  slug: string;
  /** Display name. */
  name: string;
  /** Province for grouping + schema. */
  province: 'Tarragona' | 'Lleida';
  /** areaServed list for Service JSON-LD. */
  areaServed: string[];
  /** Prefill for the qualifying form's location field. */
  locationPrefill: string;
  /** Indices into PHOTOS['generic'] (1-based) for imagery. */
  imageIndices: number[];
  /** Real wedding slugs (weddings.ts) to surface as related real work. */
  relatedWeddingSlugs: string[];
  /** Optional real YouTube film id to feature on the VIDEO page. */
  videoId?: string;
  /** Old /zones slug this city supersedes, if any (for the redirect map). */
  legacyZoneSlug?: string;
}

export interface CityPage extends CityBase {
  copy: {
    photo: Record<Lang, CityServiceCopy>;
    video: Record<Lang, CityServiceCopy>;
  };
}

export interface CityPillarCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; sub: string; heroAlt: string };
  intro: { title: string; paras: string[] };
  why: { title: string; intro: string; bullets: string[] };
  childrenTitle: string;
  childrenIntro: string;
  process: { title: string; bullets: string[] };
  faqTitle: string;
  faqs: CityFaq[];
  finalCta: { h2: string; body: string };
  formTitle: string;
  formIntro: string;
  whatsAppMessage: string;
  breadcrumbCurrent: string;
}
