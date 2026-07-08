// Shared types for the "Elopement a Catalunya" topic cluster.
//
// One pillar page (/elopement-catalunya) + N child pages
// (/elopement-<slug>). Every child is data-driven from one object per
// locality so the copy is genuinely unique per place (concrete spots,
// permits, best season, logistics) instead of a template with the name
// swapped in.
//
// Honesty rule (agreed with Eric): for localities where we do NOT yet
// have a real on-location gallery, `hasRealGallery` is false. Those
// pages use real portfolio imagery (PHOTOS['generic']) with honest alt
// text — never a faked "real elopement in <town>" claim — and link out
// to real work (the Siurana elopement + nearby real weddings) as
// "related posts".

import type { Lang } from '~/i18n/ui';

export interface ElopeSpot {
  /** Name of the concrete place (e.g. "Búnquers del Carmel"). */
  name: string;
  /** 1–3 sentences on why it works for an elopement + the photographer POV. */
  body: string;
}

export interface ElopeFaq {
  q: string;
  a: string;
}

/** Per-language copy for one child locality page. */
export interface ElopeSectionCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; sub: string; heroAlt: string };
  /** Card teaser shown on the pillar page grid. */
  cardTitle: string;
  cardBlurb: string;
  /** Why an elopement here — the opening editorial block. */
  intro: { title: string; paras: string[] };
  /** Concrete spots — the heart of the page's uniqueness. */
  places: { title: string; intro: string; items: ElopeSpot[] };
  /** Permits / regulations where they apply. */
  permits: { title: string; paras: string[] };
  /** Best time of year. */
  season: { title: string; paras: string[] };
  /** Logistics — access, timing, how the day flows. */
  logistics: { title: string; paras: string[] };
  /** Why this place is special for an elopement (emotional close). */
  special: { title: string; paras: string[] };
  gallery: { title: string; intro: string };
  faqTitle: string;
  faqs: ElopeFaq[];
  finalCta: { h2: string; body: string };
  /** Lead-qualifying form heading + intro. */
  formTitle: string;
  formIntro: string;
  whatsAppMessage: string;
  breadcrumbCurrent: string;
}

export interface ElopementPage {
  /** URL slug — final route is /elopement-<slug>. */
  slug: string;
  /** Region label for schema areaServed + breadcrumb context. */
  region: string;
  /** Full areaServed list for Service JSON-LD. */
  areaServed: string[];
  /** Locality keyword used in alt text (only when it genuinely fits). */
  locationKeyword: string;
  /** Prefill value for the qualifying form's "location" field. */
  locationPrefill: string;
  /** Indices into PHOTOS['generic'] (1-based) — distinct per page so no
   *  two locality pages open with the same portfolio image. */
  photoIndices: number[];
  /** True only when a real on-location gallery exists. False → generic
   *  portfolio imagery + honest alt, no "real elopement here" block. */
  hasRealGallery: boolean;
  /** Real wedding slugs (weddings.ts) to surface as related real work. */
  relatedWeddingSlugs: string[];
  /** Sibling elopement slugs to cross-link (bidirectional). */
  siblingSlugs: string[];
  copy: Record<Lang, ElopeSectionCopy>;
}

export interface ElopementPillarCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; sub: string; heroAlt: string };
  intro: { title: string; paras: string[] };
  whatIs: { title: string; paras: string[] };
  whyCatalonia: { title: string; intro: string; bullets: string[] };
  childrenTitle: string;
  childrenIntro: string;
  process: { title: string; bullets: string[] };
  faqTitle: string;
  faqs: ElopeFaq[];
  finalCta: { h2: string; body: string };
  formTitle: string;
  formIntro: string;
  whatsAppMessage: string;
  breadcrumbCurrent: string;
}
