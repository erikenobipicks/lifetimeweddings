// Blog posts catalogued from the legacy Wix blog-posts-sitemap.xml.
// `legacySlug` is what the old URL used; `slug` is our cleaner new URL.
// Body content lives in src/content/blog/*.md (Astro content collection)
// and covers are rehosted under public/blog/<slug>/cover.webp.

export type BlogCategory = 'bodas' | 'fotografia';

export interface BlogPost {
  slug: string;
  legacySlug: string;
  title: string;
  /** Optional per-language title. When present, the post page uses it for the
   *  <title>, the <h1> and the BlogPosting headline in that language; when
   *  absent it falls back to `title`. Descriptions are localised separately
   *  via each Markdown variant's frontmatter. */
  titleByLang?: Partial<Record<'ca' | 'es' | 'en', string>>;
  author: 'eric' | 'ferran' | null;
  publishedAt: string | null; // ISO date
  updatedAt: string; // ISO date
  readingTime?: number; // minutes
  category: BlogCategory;
  cover?: string; // absolute path under /public, e.g. /blog/<slug>/cover.webp
}

export const BLOG_CATEGORIES: Record<BlogCategory, { es: string; ca: string; en: string; slug: string }> = {
  bodas: { es: 'Bodas', ca: 'Bodes', en: 'Weddings', slug: 'bodas' },
  fotografia: { es: 'Fotografía', ca: 'Fotografia', en: 'Photography', slug: 'fotografia' },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'sesion-de-fotos-de-pareja',
    legacySlug: 'sesion-de-fotos-de-pareja',
    title: 'Sesión de fotos de pareja: no hace falta casarse para tener fotos que enamoran',
    titleByLang: {
      es: 'Sesión de fotos de pareja: no hace falta casarse para tener fotos que enamoran',
      ca: 'Sessió de fotos de parella: no cal casar-se per tenir fotos que enamoren',
    },
    author: 'eric',
    publishedAt: '2026-07-08',
    updatedAt: '2026-07-08',
    readingTime: 7,
    category: 'fotografia',
    cover: '/blog/sesion-de-fotos-de-pareja/cover.webp',
  },
  {
    slug: 'fotografia-boda-documental-vs-tradicional',
    legacySlug: 'fotografia-boda-documental-vs-tradicional',
    title: 'Fotografía de boda documental vs tradicional: cuál va con vosotros (guía honesta)',
    titleByLang: {
      es: 'Fotografía de boda documental vs tradicional: cuál va con vosotros (guía honesta)',
      ca: 'Fotografia de casament documental vs tradicional: quina va amb vosaltres (guia honesta)',
      en: 'Documentary vs traditional wedding photography: which one is for you (an honest guide)',
    },
    author: 'ferran',
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 8,
    category: 'fotografia',
    cover: '/blog/fotografia-boda-documental-vs-tradicional/cover.webp',
  },
  {
    slug: 'bodas-en-otono-en-tarragona',
    legacySlug: 'bodas-en-otono-en-tarragona',
    title: 'Bodas en otoño en Tarragona: la estación más fotogénica del año',
    author: 'eric',
    publishedAt: '2026-05-29',
    updatedAt: '2026-05-29',
    readingTime: 5,
    category: 'bodas',
    cover: '/blog/bodas-en-otono-en-tarragona/cover.webp',
  },
  {
    slug: '7-errores-al-contratar-fotografo-de-boda',
    legacySlug: 'errores-al-contratar-fotógrafo-de-boda',
    title: '7 errores al contratar fotógrafo y videógrafo de boda (y cómo evitarlos)',
    author: 'eric',
    publishedAt: '2026-01-20',
    updatedAt: '2026-01-21',
    readingTime: 4,
    category: 'bodas',
    cover: '/blog/7-errores-al-contratar-fotografo-de-boda/cover.webp',
  },
  {
    slug: 'ferran-y-eric-fotografo-videografo-tarragona',
    legacySlug: 'ferran-y-eric-fotógrafo-y-videógrafo-de-bodas-en-tarragona',
    title: 'Ferran y Eric: fotógrafo y videógrafo de bodas en Tarragona',
    author: 'eric',
    publishedAt: '2025-10-22',
    updatedAt: '2025-10-22',
    readingTime: 3,
    category: 'bodas',
    cover: '/blog/ferran-y-eric-fotografo-videografo-tarragona/cover.webp',
  },
  {
    slug: 'bodas-con-dron-en-tarragona',
    legacySlug: 'bodas-con-dron-en-tarragona-la-forma-más-espectacular-de-recordar-tu-día',
    title: 'Bodas con dron en Tarragona: la forma más espectacular de recordar tu día',
    author: 'eric',
    publishedAt: '2025-09-03',
    updatedAt: '2026-05-29',
    readingTime: 4,
    category: 'bodas',
  },
  {
    slug: 'los-7-mejores-fotografos-de-boda-en-tarragona-2025',
    legacySlug: 'los-7-mejores-fotógrafos-de-boda-en-tarragona-actualizado-2025',
    title: 'Los 7 mejores fotógrafos de boda en Tarragona (actualizado 2025)',
    author: 'ferran',
    publishedAt: '2025-07-29',
    updatedAt: '2025-07-29',
    readingTime: 4,
    category: 'bodas',
    cover: '/blog/los-7-mejores-fotografos-de-boda-en-tarragona-2025/cover.webp',
  },
  {
    slug: 'gafas-personalizadas-fotos-epicas-boda',
    legacySlug: 'gafas-personalizadas-la-manera-más-divertida-de-tener-fotos-épicas-en-tu-boda',
    title: 'Gafas personalizadas: la manera más divertida de tener fotos épicas en tu boda',
    author: 'ferran',
    publishedAt: '2025-07-15',
    updatedAt: '2025-07-19',
    readingTime: 2,
    category: 'bodas',
  },
  {
    slug: 'chupitos-tequila-rosa-tendencia-bodas-2025',
    legacySlug: 'chupitos-de-tequila-rosa-la-tendencia-más-loca-y-divertida-en-bodas-2025',
    title: 'Chupitos de tequila rosa: la tendencia más loca (y divertida) en bodas 2025',
    author: 'ferran',
    publishedAt: '2025-07-10',
    updatedAt: '2025-07-10',
    readingTime: 2,
    category: 'bodas',
    cover: '/blog/chupitos-tequila-rosa-tendencia-bodas-2025/cover.webp',
  },
  {
    slug: '10-fotos-imprescindibles-sesion-boda',
    legacySlug: '10-fotos-imprescindibles-de-la-sesión-de-boda-las-imágenes-que-toda-novia-quiere-tener-en-su-álb',
    title: '10 fotos imprescindibles de la sesión de boda',
    author: null,
    publishedAt: null,
    updatedAt: '2025-07-03',
    category: 'fotografia',
    cover: '/blog/10-fotos-imprescindibles-sesion-boda/cover.webp',
  },
  {
    slug: 'sesion-preboda-siurana-picnic-pizza',
    legacySlug: 'sesión-de-preboda-en-tarragona-ideas-originales-en-siurana-con-picnic-y-pizza',
    title: 'Sesión de preboda en Tarragona: ideas originales en Siurana con picnic y pizza',
    author: 'ferran',
    publishedAt: '2025-06-18',
    updatedAt: '2025-06-18',
    readingTime: 2,
    category: 'bodas',
    cover: '/blog/sesion-preboda-siurana-picnic-pizza/cover.webp',
  },
  {
    slug: 'como-elegir-fotografo-videografo-bodas-tarragona',
    legacySlug: 'cómo-elegir-el-mejor-fotógrafo-y-videógrafo-de-bodas-en-tarragona',
    title: 'Cómo elegir el mejor fotógrafo y videógrafo de bodas en Tarragona',
    author: 'eric',
    publishedAt: '2025-03-12',
    updatedAt: '2025-03-20',
    readingTime: 3,
    category: 'bodas',
    cover: '/blog/como-elegir-fotografo-videografo-bodas-tarragona/cover.webp',
  },
  {
    slug: 'boda-masia-can-marti-dani-marta',
    legacySlug: 'boda-en-masia-can-martí-de-dani-marta-una-celebración-única-en-un-encantador-espacio-histórico',
    title: 'Boda en Masia Can Martí: Dani & Marta',
    author: null,
    publishedAt: null,
    updatedAt: '2026-03-12',
    category: 'bodas',
    cover: '/blog/boda-masia-can-marti-dani-marta/cover.webp',
  },
  {
    slug: 'boda-masia-can-marti-jennifer-albert',
    legacySlug: 'boda-en-masia-can-martí-jennifer-albert-una-historia-de-amor-entre-culturas',
    title: 'Boda en Masia Can Martí: Jennifer & Albert',
    author: null,
    publishedAt: null,
    updatedAt: '2025-03-31',
    category: 'bodas',
    cover: '/blog/boda-masia-can-marti-jennifer-albert/cover.webp',
  },
  {
    slug: 'boda-masia-heretat-sabartes-aitor-mariona',
    legacySlug: 'boda-en-masia-heretats-sabartés-aitor-mariona-boda-en-santuario-de-montferri-tarragona',
    title: 'Boda en Masia Heretat Sabartés: Aitor & Mariona',
    author: 'eric',
    publishedAt: '2023-02-01',
    updatedAt: '2026-04-09',
    readingTime: 3,
    category: 'bodas',
    cover: '/blog/boda-masia-heretat-sabartes-aitor-mariona/cover.webp',
  },
  {
    slug: 'boda-dosterras-wine-garden-idoya-pau',
    legacySlug: 'boda_dosterras_wine_garden',
    title: 'Boda de Idoya & Pau en Dosterras Wine Garden',
    author: 'eric',
    publishedAt: '2025-03-21',
    updatedAt: '2025-03-21',
    readingTime: 2,
    category: 'bodas',
    cover: '/blog/boda-dosterras-wine-garden-idoya-pau/cover.webp',
  },
  {
    slug: 'boda-masia-can-marti-lifetime',
    legacySlug: 'boda_en_masía_can_martí',
    title: 'Boda en Masía Can Martí: experiencia única y mágica en Tarragona',
    author: null,
    publishedAt: null,
    updatedAt: '2025-03-20',
    category: 'bodas',
    cover: '/blog/boda-masia-can-marti-lifetime/cover.webp',
  },
  {
    slug: 'review-sony-sel50f18f',
    legacySlug: '50-mm-de-sony-una-ganga-de-objetivo-que-hay-que-tener-en-tu-equipo-review-sony-sel50f18f-syx',
    title: 'Review Sony SEL50F18F: 50 mm, una ganga que debes tener',
    author: null,
    publishedAt: null,
    updatedAt: '2025-03-20',
    category: 'fotografia',
    cover: '/blog/review-sony-sel50f18f/cover.webp',
  },
  {
    slug: 'boda-lgtb-bea-bea',
    legacySlug: 'boda-lgtb-boda-intima-bea-bea',
    title: 'Boda LGTB íntima: Bea & Bea',
    author: 'ferran',
    publishedAt: '2020-03-07',
    updatedAt: '2025-03-19',
    category: 'bodas',
    cover: '/blog/boda-lgtb-bea-bea/cover.webp',
  },
];
