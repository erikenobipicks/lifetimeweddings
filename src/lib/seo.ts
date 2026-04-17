import { SITE } from '~/data/site';
import type { Lang } from '~/i18n/ui';

export function localBusinessJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}#business`,
    name: 'Lifetime Weddings',
    image: `${SITE.url}/og-default.jpg`,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    sameAs: [SITE.social.instagram, SITE.social.youtube, SITE.social.pinterest].filter(Boolean),
    inLanguage: lang,
  };
}

export function personJsonLd(opts: { name: string; role: string; url?: string; sameAs?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: opts.name,
    jobTitle: opts.role,
    worksFor: { '@type': 'Organization', name: 'Lifetime Weddings' },
    url: opts.url,
    sameAs: opts.sameAs,
  };
}
