// ────────────────────────────────────────────────────────────────
// Entregues / Lliurament de fotos — private post-wedding delivery pages
// for couples at /galeria/<slug> (noindex).
//
// A lightweight, static sibling of the DB-backed /entrega system: a single
// shareable page with a few featured photos, a button to the full gallery
// (FotoStudio) and a Google-review request. Content is written in the
// couple's own language per entry (Cristian & Flavia are Romanian).
//
// Photos: `photoSet` points at a couple folder in photos.generated.ts.
// Drop the files under public/photos/<slug>/ and run
// scripts/process-couple.mjs to generate the web variants.
// ────────────────────────────────────────────────────────────────

/** Optional explicit featured-photo picks (image id suffix, e.g. "003"). */
export interface EntregaPhotos {
  hero?: string;
  featured?: string[];
}

export interface EntregaSite {
  slug: string;
  /** BCP-47 code for the <html lang> attribute (content is hardcoded). */
  lang: string;
  couple: { a: string; b: string };
  /** Separator between the two names, e.g. "&" or "și". */
  nameSep: string;
  dateLabel: string;
  place?: string;
  email: string;

  photoSet: string;
  photos?: EntregaPhotos;

  /** Full-gallery link (FotoStudio) and the Google reviews link. */
  galleryUrl: string;
  reviewUrl: string;

  // ── Copy (in the couple's language) ──────────────────────────────
  pageTitle: string;
  eyebrow: string;
  intro: string;

  featuredEyebrow: string;
  featuredHeading: string;

  galleryEyebrow: string;
  galleryHeading: string;
  galleryBody: string;
  galleryCta: string;

  reviewEyebrow: string;
  reviewHeading: string;
  reviewBody: string;
  reviewCta: string;

  footerContact: string;
  footerNote?: string;
}

export const ENTREGUES: EntregaSite[] = [
  {
    slug: 'cristian-flavia',
    lang: 'ro',
    couple: { a: 'Cristian', b: 'Flavia' },
    nameSep: '&',
    dateLabel: '30 iulie 2026',
    place: 'Costa Daurada',
    email: 'hola@lifetime.photo',
    photoSet: 'cristian-flavia',
    // 005 = posed sunset portrait · 004 = golden backlit kiss
    // 001 = embrace · 003 = bouquet toss · 002 = group photo
    photos: {
      hero: '005',
      featured: ['004', '001', '003', '002'],
    },
    galleryUrl: 'https://gallery.fotostudio.io/objectiu-fotografs/cristian-flavia',
    reviewUrl: 'https://www.google.com/maps?cid=9550864279818307584',

    pageTitle: 'Fotografiile voastre',
    eyebrow: 'Ne-am căsătorit',
    intro:
      'Vă mulțumim că ne-ați lăsat să povestim una dintre cele mai frumoase zile din viața voastră. A fost o onoare să fim acolo. Aici găsiți o mică selecție — și, mai jos, galeria completă.',

    featuredEyebrow: 'Ziua voastră',
    featuredHeading: 'Câteva momente preferate',

    galleryEyebrow: 'Toate fotografiile',
    galleryHeading: 'Galeria completă',
    galleryBody:
      'Toate fotografiile din ziua voastră, gata de vizionat, descărcat și distribuit cu cei dragi.',
    galleryCta: 'Vezi toate fotografiile',

    reviewEyebrow: 'O mică favoare',
    reviewHeading: 'Ne lăsați o recenzie pe Google?',
    reviewBody:
      'Suntem o echipă mică și de familie. Dacă v-a plăcut munca noastră, o recenzie din partea voastră pe Google ne ajută enorm să ajungem la alte cupluri. Cu cuvintele voastre, în doar două minute.',
    reviewCta: 'Lăsați o recenzie pe Google',

    footerContact: 'Pentru orice întrebare, scrieți-ne la',
  },
];

export function getEntrega(slug: string): EntregaSite | undefined {
  return ENTREGUES.find((e) => e.slug === slug);
}
