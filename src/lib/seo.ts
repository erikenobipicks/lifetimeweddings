// Central JSON-LD builders. Import these from pages that need structured data.
//
// Conventions:
//  - Every entity that is referenced elsewhere gets a stable `@id` URL fragment
//    anchored at SITE.url. We kept `#business` for the Org/LocalBusiness node
//    to avoid invalidating any external references Google or others may have
//    already indexed. See PR description for full rationale.
//  - Translations live in the i18n dictionary (schema.*) and are resolved per
//    locale at page level. This module is locale-aware where needed.
//  - We never mix languages inside a single JSON-LD block: each page emits the
//    block in its own locale.
//
// Author: Eric + Ferran Blasco / Lifetime Weddings

import { SITE } from '~/data/site';
import { TEAM } from '~/data/team';
import { TESTIMONIALS } from '~/data/testimonials';
import type { BlogPost } from '~/data/blog';
import { useTranslations, type Lang } from '~/i18n/ui';

// ─── IDs ────────────────────────────────────────────────────────────────────
// Stable identifiers used to cross-reference nodes across the graph.
// `#business` is kept for back-compat — do not rename.
export const ID = {
  business: `${SITE.url}/#business`,
  website: `${SITE.url}/#website`,
  personEric: `${SITE.url}/#person-eric`,
  personFerran: `${SITE.url}/#person-ferran`,
  serviceFoto: `${SITE.url}/#service-foto`,
  serviceVideo: `${SITE.url}/#service-video`,
  servicePreboda: `${SITE.url}/#service-preboda`,
  serviceCombo: `${SITE.url}/#service-combo`,
} as const;

function abs(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`;
}

// ─── Organization + LocalBusiness (home only) ───────────────────────────────
/**
 * Combined Organization / LocalBusiness / ProfessionalService node. Lives in
 * the home of every locale. All other pages reference it by `@id`.
 *
 * Includes the 3 testimonials as `Review` children so `LocalBusiness` can
 * surface rich-result stars in the SERP.
 */
export function organizationJsonLd(lang: Lang) {
  const t = useTranslations(lang);
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': ID.business,
    name: SITE.name,
    legalName: SITE.name,
    description: t('schema.org.description'),
    url: SITE.url,
    logo: abs('/logos/logo-circle-color.png'),
    image: abs('/og-default.jpg'),
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '€€€',
    foundingDate: String(SITE.copyrightSince),
    knowsLanguage: ['ca', 'es', 'en'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: ['Tarragona', 'Reus', 'Lleida', 'Barcelona', 'Catalunya', 'España'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    founder: [{ '@id': ID.personFerran }, { '@id': ID.personEric }],
    sameAs: [
      SITE.social.instagram,
      SITE.social.instagramFerran,
      SITE.social.youtube,
      SITE.social.pinterest,
    ].filter(Boolean),
    review: TESTIMONIALS.map((testi) => ({
      '@type': 'Review',
      '@id': `${SITE.url}/#review-${testi.id}`,
      author: { '@type': 'Person', name: testi.author },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: testi.quote[lang],
      itemReviewed: { '@id': ID.business },
      inLanguage: lang,
    })),
    inLanguage: lang,
  };
}

// ─── Person (Eric, Ferran) ──────────────────────────────────────────────────
function personForMember(memberId: 'eric' | 'ferran', lang: Lang) {
  const member = TEAM.find((m) => m.id === memberId);
  if (!member) throw new Error(`TEAM member not found: ${memberId}`);
  const id = memberId === 'eric' ? ID.personEric : ID.personFerran;
  const knowsAbout =
    memberId === 'eric'
      ? ['wedding videography', 'documentary filmmaking', 'cinematic editing', 'drone cinematography']
      : ['wedding photography', 'photojournalism', 'documentary photography', 'portrait photography'];
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': id,
    name: member.name,
    jobTitle: member.role[lang],
    image: abs(member.photo),
    worksFor: { '@id': ID.business },
    sameAs: [member.instagram].filter(Boolean),
    knowsAbout,
    knowsLanguage: ['ca', 'es', 'en'],
  };
}

export function personJsonLd(memberId: 'eric' | 'ferran', lang: Lang) {
  return personForMember(memberId, lang);
}

// ─── Service (4× — foto, vídeo, pre-boda, combo foto+vídeo) ─────────────────
// The 4th Service (photo+video combo) reflects the headline `2.480 € +IVA`
// combo pack offered on the home. It lives as its own Service rather than a
// nested Offer so it surfaces cleanly in Google service carousels and is
// referenceable on its own (`#service-combo`).

interface ServiceSpec {
  id: string;
  serviceType: string;
  nameKey: `schema.service.${string}.name`;
  descKey: `schema.service.${string}.description`;
  performerId: string; // @id ref of Person
  priceMin: number; // EUR, sin IVA
}

const SERVICES: ServiceSpec[] = [
  {
    id: ID.serviceFoto,
    serviceType: 'Wedding photography',
    nameKey: 'schema.service.foto.name',
    descKey: 'schema.service.foto.description',
    performerId: ID.personFerran,
    priceMin: 1290,
  },
  {
    id: ID.serviceVideo,
    serviceType: 'Wedding videography',
    nameKey: 'schema.service.video.name',
    descKey: 'schema.service.video.description',
    performerId: ID.personEric,
    priceMin: 1290,
  },
  {
    id: ID.servicePreboda,
    serviceType: 'Engagement photography session',
    nameKey: 'schema.service.preboda.name',
    descKey: 'schema.service.preboda.description',
    performerId: ID.personFerran,
    priceMin: 290,
  },
  {
    id: ID.serviceCombo,
    serviceType: 'Wedding photography and videography package',
    nameKey: 'schema.service.combo.name',
    descKey: 'schema.service.combo.description',
    performerId: ID.personFerran, // headline performer; Eric referenced via description
    priceMin: 2480,
  },
];

export function servicesJsonLd(lang: Lang) {
  const t = useTranslations(lang);
  return SERVICES.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': s.id,
    name: t(s.nameKey as any),
    description: t(s.descKey as any),
    serviceType: s.serviceType,
    provider: { '@id': ID.business },
    performer: { '@id': s.performerId },
    areaServed: ['Tarragona', 'Reus', 'Lleida', 'Barcelona', 'Catalunya'],
    offers: {
      '@type': 'Offer',
      price: String(s.priceMin),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: s.priceMin,
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: false,
      },
      availability: 'https://schema.org/InStock',
      url: `${SITE.url}/#services`,
    },
    inLanguage: lang,
  }));
}

// ─── WebSite (home only) ────────────────────────────────────────────────────
// No SearchAction — the site has no internal search endpoint.
export function websiteJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ID.website,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': ID.business },
    inLanguage: lang,
  };
}

// ─── BreadcrumbList (internal pages) ────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  /** Absolute URL. */
  url: string;
}
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

// ─── BlogPosting (blog/[slug] pages) ────────────────────────────────────────
export function blogPostingJsonLd(args: {
  post: BlogPost;
  lang: Lang;
  description: string;
  /** Path without locale prefix, starting with /blog/... */
  canonicalPath: string;
}) {
  const { post, lang, description, canonicalPath } = args;
  const localePrefix = lang === 'ca' ? '' : `/${lang}`;
  const pageUrl = `${SITE.url}${localePrefix}${canonicalPath}`;
  const authorRef =
    post.author === 'eric'
      ? { '@id': ID.personEric }
      : post.author === 'ferran'
        ? { '@id': ID.personFerran }
        : { '@id': ID.business };
  const published = post.publishedAt ?? post.updatedAt;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    headline: post.title,
    description,
    image: post.cover ? [abs(post.cover)] : undefined,
    datePublished: published,
    dateModified: post.updatedAt,
    author: authorRef,
    publisher: { '@id': ID.business },
    inLanguage: lang,
  };
}

// ─── Convenience: full home-page JSON-LD bundle ─────────────────────────────
/**
 * Returns the full array of JSON-LD blocks emitted on the home in a given
 * locale. Index pages should pass this directly to BaseLayout's `jsonLd` prop.
 * The FAQPage block is NOT included here — it is emitted by `Faq.astro`
 * itself (unchanged).
 */
export function homeJsonLd(lang: Lang) {
  return [
    organizationJsonLd(lang),
    personJsonLd('eric', lang),
    personJsonLd('ferran', lang),
    websiteJsonLd(lang),
    ...servicesJsonLd(lang),
  ];
}
