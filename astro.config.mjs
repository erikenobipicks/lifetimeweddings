import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
// Tailwind is wired via PostCSS (postcss.config.mjs) since Astro 6 dropped
// the @astrojs/tailwind integration.

// https://astro.build/config
export default defineConfig({
  site: 'https://www.lifetime.photo',
  trailingSlash: 'never',
  output: 'server',
  // The old /zones geographic pages were superseded by the richer, trilingual
  // photo cluster at /fotograf-boda-<city>. 301 the legacy URLs so their SEO
  // equity flows to the new pages (costa-daurada -> the pillar, no 1:1 city).
  redirects: {
    '/zones': '/fotograf-boda-tarragona-lleida',
    '/zones/tarragona': '/fotograf-boda-tarragona',
    '/zones/reus': '/fotograf-boda-reus',
    '/zones/lleida': '/fotograf-boda-lleida',
    '/zones/costa-daurada': '/fotograf-boda-tarragona-lleida',
  },
  adapter: node({ mode: 'standalone' }),
  // Disable Astro's built-in CSRF origin check. It defaults to `true` and
  // rejects POSTs with `multipart/form-data`, `application/x-www-form-urlencoded`
  // or `text/plain` bodies with 403 "Cross-site POST form submissions are
  // forbidden" — which breaks our form submissions behind Cloudflare/Railway
  // regardless of the Origin header. We have our own honeypot in the contact
  // endpoint, and the endpoints only accept a tight allow-list of fields.
  security: { checkOrigin: false },
  i18n: {
    defaultLocale: 'ca',
    locales: ['ca', 'es', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ca',
        locales: { ca: 'ca-ES', es: 'es-ES', en: 'en-US' },
      },
      // Exclude routes that are noindex or shared privately, so we don't
      // waste Google's crawl budget on URLs that won't show up in results.
      // `sitemap-images.xml` is a sibling sitemap (referenced from robots.txt),
      // not a regular page — it must never appear inside the URL sitemap.
      filter: (page) =>
        !page.includes('/p/') &&
        !page.includes('/admin') &&
        !page.includes('/packs') &&
        !page.includes('/ofertes') &&
        !page.includes('/showcase/') &&
        !page.includes('/reserva/') &&
        !page.includes('/preview-weddings/') &&
        !page.includes('/sitemap-images'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
