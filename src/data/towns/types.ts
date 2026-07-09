// Coastal micro-niche town landings (Costa Daurada). Richer than the city
// cluster: each page is a sales funnel (CTA at hero / mid / end) built around
// the town's own nearby venues and photo spots.
//
// URLs: /fotograf-boda-<slug> (+ /es, /en). For Salou and Cambrils this
// supersedes the thinner city-cluster page at the same URL (upgrade in place);
// the video cluster and the photo pillar are unaffected.
//
// Honesty rule: no faked real weddings. Towns with a real gallery use it
// (`realPhotoSlug`); the rest use varied portfolio imagery (`imageIndices`)
// with neutral alt. Nearby venues are described from public knowledge and
// linked INTERNALLY to our own venue fiche when we have one; external venue
// sites only when genuinely useful (and rel="nofollow").

import type { Lang } from '~/i18n/ui';

export interface TownSpot {
  name: string;
  body: string;
}

export interface TownVenue {
  name: string;
  body: string;
  /** Slug of our own /venues/<slug> fiche, if we have one (preferred link). */
  internalSlug?: string;
  /** Official external site — only when it adds user value; rendered nofollow. */
  externalUrl?: string;
}

export interface TownFaq {
  q: string;
  a: string;
}

/** Per-language copy for one town. */
export interface TownServiceCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; sub: string; heroAlt: string; cta1: string };
  cardTitle: string;
  cardBlurb: string;
  intro: { title: string; paras: string[] };
  nearbyVenues: { title: string; intro: string; items: TownVenue[] };
  /** Mid-funnel CTA band. */
  midCta: { title: string; body: string; label: string };
  photoSpots: { title: string; intro: string; items: TownSpot[] };
  /** The extra-value section unique to this town. */
  valueExtra: { title: string; paras: string[] };
  gallery: { title: string; intro: string };
  faqTitle: string;
  faqs: TownFaq[];
  finalCta: { h2: string; body: string; label: string };
  formTitle: string;
  formIntro: string;
  whatsAppMessage: string;
  breadcrumbCurrent: string;
}

export interface TownBase {
  slug: string;
  name: string;
  /** Comarca / zone label. */
  comarca: string;
  province: 'Tarragona' | 'Lleida';
  areaServed: string[];
  locationPrefill: string;
  /** Distinct portfolio image window (1-based indices into PHOTOS['generic']). */
  imageIndices: number[];
  /** If set, use this real PHOTOS[slug] gallery instead of portfolio imagery. */
  realPhotoSlug?: string;
  /** Real wedding slugs (weddings.ts) to surface as related real work. */
  relatedWeddingSlugs: string[];
  /** Sibling town slugs to cross-link. */
  siblingSlugs: string[];
}

export interface TownPage extends TownBase {
  copy: Record<Lang, TownServiceCopy>;
}
