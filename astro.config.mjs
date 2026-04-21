import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.lifetime.photo',
  trailingSlash: 'never',
  output: 'server',
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
    tailwind({ applyBaseStyles: true }),
    sitemap({
      i18n: {
        defaultLocale: 'ca',
        locales: { ca: 'ca-ES', es: 'es-ES', en: 'en-US' },
      },
      filter: (page) => !page.includes('/p/') && !page.includes('/admin'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
