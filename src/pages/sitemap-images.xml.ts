// Google Image Sitemap.
//
// Lists every wedding-gallery photo against the canonical /bodas/<slug> URL
// it lives on, with caption + title context. This is what Google Images uses
// to surface our portfolio in Search — filenames like `001-lg.jpg` carry no
// signal on their own. One `<url>` per wedding page, with up to 1000 nested
// `<image:image>` entries (Google's limit).
//
// Served at /sitemap-images.xml; referenced from public/robots.txt.

import type { APIRoute } from 'astro';
import { WEDDINGS, weddingGallery } from '~/data/weddings';
import { SITE } from '~/data/site';

export const prerender = true;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function abs(path: string): string {
  return path.startsWith('http') ? path : `${SITE.url}${path}`;
}

export const GET: APIRoute = () => {
  const urls: string[] = [];

  for (const w of WEDDINGS) {
    const gallery = weddingGallery(w);
    if (gallery.length === 0) continue;

    const hasVenue = w.venue && w.venue !== '—';
    const hasLocation = w.location && w.location !== '—';
    const pageUrl = `${SITE.url}/bodas/${w.slug}`;
    const total = gallery.length;
    const totalStr = String(total).padStart(2, '0');

    const images = gallery
      .map((img, i) => {
        const nn = String(i + 1).padStart(2, '0');
        const caption =
          hasVenue && hasLocation
            ? `Boda de ${w.couple} a ${w.venue} · ${w.location} · Foto ${nn} de ${totalStr}`
            : hasVenue
              ? `Boda de ${w.couple} a ${w.venue} · Foto ${nn} de ${totalStr}`
              : `Boda de ${w.couple} · Lifetime Weddings · Foto ${nn} de ${totalStr}`;
        const title = hasVenue
          ? `${w.couple} · ${w.venue}`
          : `${w.couple} · Lifetime Weddings`;
        return `    <image:image>
      <image:loc>${escapeXml(abs(img.variants.lg))}</image:loc>
      <image:caption>${escapeXml(caption)}</image:caption>
      <image:title>${escapeXml(title)}</image:title>
    </image:image>`;
      })
      .join('\n');

    urls.push(`  <url>
    <loc>${escapeXml(pageUrl)}</loc>
${images}
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
