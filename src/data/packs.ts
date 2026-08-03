import type { Lang } from '~/i18n/ui';

export type PackType = 'photo' | 'video' | 'combo';

/**
 * Visual priority on the /packs page.
 *   - 'star'          → strong highlight, only ONE pack should use this.
 *   - 'picked-photo'  → subtle "most picked in photography" label.
 *   - 'picked-video'  → subtle "most picked in video" label.
 *   - undefined       → default card, no badge.
 */
export type PackHighlight = 'star' | 'picked-photo' | 'picked-video';

export interface Pack {
  id: string;
  type: PackType;
  name: Record<Lang, string>;
  /** Functional, plain-language subtitle shown as the prominent label on
   *  the quote page, with `name` demoted to a small italic kicker above
   *  it. The series-style names (How I Met…, This Is Us…) have personality
   *  but force the couple to decode what each pack actually is at the exact
   *  moment they're comparing prices; the subtitle removes that friction
   *  ("Fotografia · El reportatge complet del dia"). */
  subtitle?: Record<Lang, string>;
  /** Formatted price string, IVA included (Spanish B2C law requires
   *  tax-included display for consumer prices — no "+ IVA" suffix). */
  price: string;
  includes: Record<Lang, string[]>;
  highlight?: PackHighlight;
  /** Combo packs only: the IDs of the base packs they bundle. When set,
   *  the renderer expands these into their own sub-sections (mirrors how
   *  our FotoStudio quotes break a combo down line-by-line instead of
   *  saying "everything in pack X"). The combo's own `includes` stays
   *  for the synergy bullets only ("coordinated by two brothers"). */
  composedOf?: string[];
}

/** Optional add-ons that couples can layer on top of any base pack.
 *  Mirrors the "Extra" page in the Canva tarifes PDF (DAHBl3CKN-U).
 *  Surfaced on /p/<token> so couples can see the menu without asking,
 *  and on /admin/new so the team has the list at hand while quoting. */
export interface PackExtra {
  id: string;
  name: Record<Lang, string>;
  /** Formatted price string, IVA included. */
  price: string;
  /** Short clarification — drone weather caveat, preboda travel area,
   *  etc. Optional. */
  note?: Record<Lang, string>;
}

export const PACKS: Pack[] = [
  // ─── PHOTO ─────────────────────────────────────────────
  {
    id: 'como-conoci',
    type: 'photo',
    name: {
      es: 'Cómo conocí a vuestra madre',
      ca: 'Com vaig conèixer la vostra mare',
      en: 'How I Met Your Mother',
    },
    subtitle: {
      es: 'Fotografía · El reportaje completo del día',
      ca: 'Fotografia · El reportatge complet del dia',
      en: 'Photography · The full coverage of the day',
    },
    price: '1.290 €',
    highlight: 'picked-photo',
    includes: {
      es: [
        'Cobertura completa del día: desde los preparativos hasta 45 min – 1 h después del primer baile (máximo 14 h)',
        '700–1.200 fotos editadas en alta resolución, sin marca de agua',
        'Galería privada online para compartir con familia y amigos',
        'Caja de madera personalizada con 9 copias seleccionadas',
        'Pendrive con todas las fotografías',
        'Galería privada online en un máximo de 60 días (2 meses)',
      ],
      ca: [
        'Cobertura completa del dia: des dels preparatius fins a 45 min – 1 h després del primer ball (màxim 14 h)',
        '700–1.200 fotos editades en alta resolució, sense marca d’aigua',
        'Galeria privada online per compartir amb família i amics',
        'Caixa de fusta personalitzada amb 9 còpies seleccionades',
        'Pendrive amb totes les fotografies',
        'Galeria privada online en un màxim de 60 dies (2 mesos)',
      ],
      en: [
        'Full-day coverage: from prep to 45 min – 1 h after the first dance (max 14 h)',
        '700–1,200 edited photos in high resolution, no watermark',
        'Private online gallery to share with family and friends',
        'Personalised wooden box with 9 selected prints',
        'USB drive with all photographs',
        'Private online gallery within 60 days (2 months)',
      ],
    },
  },
  {
    id: 'lqsa',
    type: 'photo',
    name: { es: '¡La que se avecina!', ca: '¡La que se avecina!', en: '¡La que se avecina!' },
    subtitle: {
      es: 'Fotografía · Reportaje completo + álbum de madera',
      ca: 'Fotografia · Reportatge complet + àlbum de fusta',
      en: 'Photography · Full coverage + wooden album',
    },
    price: '1.740 €',
    includes: {
      es: [
        'Todo lo del pack "Cómo conocí a vuestra madre"',
        'Álbum de madera personalizado de 30×40 cm con 30 páginas',
      ],
      ca: [
        'Tot el del pack "Com vaig conèixer la vostra mare"',
        'Àlbum de fusta personalitzat de 30×40 cm amb 30 pàgines',
      ],
      en: [
        'Everything in the "How I Met Your Mother" pack',
        'Personalised wooden album 30×40 cm with 30 pages',
      ],
    },
  },

  // ─── VIDEO ─────────────────────────────────────────────
  {
    id: 'this-is-us',
    type: 'video',
    name: { es: 'This Is Us', ca: 'This Is Us', en: 'This Is Us' },
    subtitle: {
      es: 'Vídeo · Película documental de la boda',
      ca: 'Vídeo · Pel·lícula documental del casament',
      en: 'Film · Documentary wedding film',
    },
    price: '1.290 €',
    highlight: 'picked-video',
    includes: {
      es: [
        'Cobertura completa con 1 cámara: desde los preparativos hasta 45 min después del primer baile',
        'Vídeo documental de 25–35 minutos en HD',
        'Dron incluido (sujeto a condiciones meteorológicas y normativa AESA)',
        'Edición documental sin marca de agua',
        'Entrega en MP4 (HD)',
        'Película de boda entregada en un máximo de 150 días (5 meses)',
      ],
      ca: [
        'Cobertura completa amb 1 càmera: des dels preparatius fins a 45 min després del primer ball',
        'Vídeo documental de 25–35 minuts en HD',
        'Dron inclòs (segons condicions meteorològiques i normativa AESA)',
        'Edició documental sense marca d’aigua',
        'Entrega en MP4 (HD)',
        'Pel·lícula de casament entregada en un màxim de 150 dies (5 mesos)',
      ],
      en: [
        'Full-day coverage with 1 camera: from prep to 45 min after the first dance',
        '25–35 min documentary film in HD',
        'Drone included (weather and AESA regulation permitting)',
        'Documentary edit, no watermark',
        'Delivered in MP4 (HD)',
        'Wedding film delivered within 150 days (5 months)',
      ],
    },
  },
  {
    id: 'outlander',
    type: 'video',
    name: { es: 'Outlander', ca: 'Outlander', en: 'Outlander' },
    subtitle: {
      es: 'Vídeo · Documental completo con dron',
      ca: 'Vídeo · Documental complet amb dron',
      en: 'Film · Full documentary with drone',
    },
    price: '1.590 €',
    includes: {
      es: [
        'Todo lo del pack "This Is Us"',
        'Extras: ceremonia completa, discursos y primer baile sin cortes',
        'Tráiler de boda de 3–5 min (ideal para redes y compartir)',
      ],
      ca: [
        'Tot el del pack "This Is Us"',
        'Extres: cerimònia completa, discursos i primer ball sense talls',
        'Tràiler de boda de 3–5 min (ideal per a xarxes i compartir)',
      ],
      en: [
        'Everything in the "This Is Us" pack',
        'Extras: full ceremony, speeches, and first dance uncut',
        'Wedding trailer of 3–5 min (ideal for socials and sharing)',
      ],
    },
  },

  // ─── COMBO (foto + vídeo) ──────────────────────────────
  {
    id: 'combo-cc-tu',
    type: 'combo',
    composedOf: ['como-conoci', 'this-is-us'],
    name: {
      es: 'Cómo conocí + This Is Us',
      ca: 'Com vaig conèixer + This Is Us',
      en: 'How I Met + This Is Us',
    },
    subtitle: {
      es: 'Foto + Vídeo · Reportaje y película del día',
      ca: 'Foto + Vídeo · Reportatge i pel·lícula del dia',
      en: 'Photo + Film · Coverage and film of the day',
    },
    price: '2.480 €',
    includes: {
      es: [
        'Foto + vídeo coordinados por dos hermanos en un solo equipo',
        'Sin necesidad de coordinar dos proveedores externos',
      ],
      ca: [
        'Foto + vídeo coordinats per dos germans en un sol equip',
        'Sense haver de coordinar dos proveïdors externs',
      ],
      en: [
        'Photo + video coordinated by two brothers as one crew',
        'No need to coordinate two separate vendors',
      ],
    },
  },
  {
    id: 'combo-cc-ol',
    type: 'combo',
    composedOf: ['como-conoci', 'outlander'],
    name: {
      es: 'Cómo conocí + Outlander',
      ca: 'Com vaig conèixer + Outlander',
      en: 'How I Met + Outlander',
    },
    subtitle: {
      es: 'Foto + Vídeo · Reportaje y documental con dron',
      ca: 'Foto + Vídeo · Reportatge i documental amb dron',
      en: 'Photo + Film · Coverage and documentary with drone',
    },
    price: '2.750 €',
    includes: {
      es: ['Foto + vídeo coordinados por dos hermanos en un solo equipo'],
      ca: ['Foto + vídeo coordinats per dos germans en un sol equip'],
      en: ['Photo + video coordinated by two brothers as one crew'],
    },
  },
  {
    id: 'combo-lqsa-tu',
    type: 'combo',
    composedOf: ['lqsa', 'this-is-us'],
    name: {
      es: '¡La que se avecina! + This Is Us',
      ca: '¡La que se avecina! + This Is Us',
      en: '¡La que se avecina! + This Is Us',
    },
    subtitle: {
      es: 'Foto + Vídeo · Todo completo, con álbum y película',
      ca: 'Foto + Vídeo · Tot complet, amb àlbum i pel·lícula',
      en: 'Photo + Film · Everything, with album and film',
    },
    price: '2.900 €',
    highlight: 'star',
    includes: {
      es: [
        'Foto + vídeo coordinados por dos hermanos en un solo equipo',
        'El pack más completo y elegido por las parejas',
      ],
      ca: [
        'Foto + vídeo coordinats per dos germans en un sol equip',
        'El pack més complet i triat per les parelles',
      ],
      en: [
        'Photo + video coordinated by two brothers as one crew',
        'The most complete and most-picked pack',
      ],
    },
  },
  {
    id: 'combo-lqsa-ol',
    type: 'combo',
    composedOf: ['lqsa', 'outlander'],
    name: {
      es: '¡La que se avecina! + Outlander',
      ca: '¡La que se avecina! + Outlander',
      en: '¡La que se avecina! + Outlander',
    },
    subtitle: {
      es: 'Foto + Vídeo · La cobertura más completa',
      ca: 'Foto + Vídeo · La cobertura més completa',
      en: 'Photo + Film · Our most complete coverage',
    },
    price: '3.170 €',
    includes: {
      es: [
        'Foto + vídeo coordinados por dos hermanos en un solo equipo',
        'La cobertura más completa que ofrecemos',
      ],
      ca: [
        'Foto + vídeo coordinats per dos germans en un sol equip',
        'La cobertura més completa que oferim',
      ],
      en: [
        'Photo + video coordinated by two brothers as one crew',
        'The most complete coverage we offer',
      ],
    },
  },

  // ─── SHORT COVERAGE (ceremony + couple shoot, no prep / no reception) ─
  // Designed for civil weddings, small town-hall ceremonies, vow renewals,
  // and other intimate events where 2-3 hours of coverage covers everything
  // that matters. Time window is approximate — Eric tailors it per couple
  // in the proposal copy ("from arrival to end of aperitivo", etc.).
  {
    id: 'short-photo',
    type: 'photo',
    name: {
      ca: 'Reportatge curt',
      es: 'Reportaje corto',
      en: 'Short coverage',
    },
    subtitle: {
      ca: 'Fotografia · Cobertura essencial',
      es: 'Fotografía · Cobertura esencial',
      en: 'Photography · Essential coverage',
    },
    price: '500 €',
    includes: {
      es: [
        'Cobertura de ~2,5 horas: ceremonia + sesión de novios + aperitivo',
        'Sin preparativos, sin banquete',
        'Mínimo 200 fotografías editadas en alta resolución',
        'Galería privada online para compartir con familia y amigos',
        'Sneak peek de 15 fotos en 48h',
        'Entrega de la galería completa en un máximo de 60 días (2 meses)',
      ],
      ca: [
        'Cobertura de ~2,5 hores: cerimònia + sessió de nuvis + aperitiu',
        'Sense preparatius, sense banquet',
        'Mínim 200 fotografies editades en alta resolució',
        'Galeria privada online per compartir amb família i amics',
        'Sneak peek de 15 fotos en 48h',
        'Entrega de la galeria completa en un màxim de 60 dies (2 mesos)',
      ],
      en: [
        '~2.5 h coverage: ceremony + couple shoot + aperitivo',
        'No prep, no reception',
        'Minimum of 200 professionally edited high-resolution photographs',
        'Private online gallery to share with family and friends',
        'Sneak peek of 15 photos within 48 h',
        'Full gallery delivered within 60 days (2 months)',
      ],
    },
  },
  {
    id: 'short-video',
    type: 'video',
    name: {
      ca: 'Vídeo curt',
      es: 'Vídeo corto',
      en: 'Short video coverage',
    },
    subtitle: {
      ca: 'Vídeo · Cobertura essencial',
      es: 'Vídeo · Cobertura esencial',
      en: 'Film · Essential coverage',
    },
    price: '550 €',
    includes: {
      es: [
        'Cobertura de ~2,5 horas: ceremonia + sesión de novios + aperitivo',
        'Sin preparativos, sin banquete',
        'Vídeo cinematográfico de 8-12 minutos',
        'Audio de la ceremonia incluido',
        'Edición sin marca de agua',
        'Entrega online en un máximo de 150 días (5 meses)',
      ],
      ca: [
        'Cobertura de ~2,5 hores: cerimònia + sessió de nuvis + aperitiu',
        'Sense preparatius, sense banquet',
        'Vídeo cinematogràfic de 8-12 minuts',
        'Àudio de la cerimònia inclòs',
        'Edició sense marca d\'aigua',
        'Entrega online en un màxim de 150 dies (5 mesos)',
      ],
      en: [
        '~2.5 h coverage: ceremony + couple shoot + aperitivo',
        'No prep, no reception',
        'Cinematic highlight film of 8-12 minutes',
        'Ceremony audio included',
        'Edited, no watermark',
        'Online delivery within 150 days (5 months)',
      ],
    },
  },
  {
    id: 'short-combo',
    type: 'combo',
    composedOf: ['short-photo', 'short-video'],
    name: {
      ca: 'Reportatge curt foto + vídeo',
      es: 'Reportaje corto foto + vídeo',
      en: 'Short coverage photo + film',
    },
    subtitle: {
      ca: 'Foto + Vídeo · Cobertura essencial',
      es: 'Foto + Vídeo · Cobertura esencial',
      en: 'Photo + Film · Essential coverage',
    },
    price: '900 €',
    includes: {
      es: [
        'Foto + vídeo coordinados por dos hermanos en un solo equipo',
        'Ventaja del bundle: ahorro de 150 € vs contratar por separado',
      ],
      ca: [
        'Foto + vídeo coordinats per dos germans en un sol equip',
        'Avantatge del bundle: estalvi de 150 € vs contractar per separat',
      ],
      en: [
        'Photo + video coordinated by two brothers as one crew',
        'Bundle advantage: save 150 € vs booking each separately',
      ],
    },
  },
];

/** Resolve the composedOf chain to the actual sub-packs, in the order
 *  the combo lists them. Returns [] for non-combo or unresolved packs.
 *  Both renderers (web /p/<token>) and the booking-form auto-populate
 *  (/admin/bookings/new) share this so the breakdown stays consistent. */
export function getComposedSubpacks(pack: Pack): Pack[] {
  if (!pack.composedOf || pack.composedOf.length === 0) return [];
  return pack.composedOf
    .map((id) => PACKS.find((p) => p.id === id))
    .filter((p): p is Pack => p !== undefined);
}

/** Optional add-ons quoted on top of any base pack. Order matches the
 *  Canva "Extra" page (DAHBl3CKN-U) — first the staffing add-ons, then
 *  preboda/postboda services, then physical print products, then the
 *  weather-dependent drone op. */
export const EXTRAS: PackExtra[] = [
  {
    id: 'extra-videographer',
    name: {
      ca: 'Operador de vídeo professional addicional',
      es: 'Operador de vídeo profesional adicional',
      en: 'Additional professional videographer',
    },
    price: '545 €',
    note: {
      ca: 'Inclou el segon operador de càmera',
      es: 'Incluye el segundo operador de cámara',
      en: 'Includes the second camera operator',
    },
  },
  {
    id: 'extra-photographer',
    name: {
      ca: 'Segon fotògraf professional addicional',
      es: 'Segundo fotógrafo profesional adicional',
      en: 'Additional professional second photographer',
    },
    price: '425 €',
  },
  {
    id: 'extra-preboda-photo',
    name: {
      ca: 'Sessió de fotos preboda',
      es: 'Sesión de fotos preboda',
      en: 'Pre-wedding photo session',
    },
    price: '300 €',
    note: {
      ca: 'A la zona de Reus o fins a 15 km i entre setmana. Per a desplaçaments més llargs o cap de setmana, es pressuposta a part.',
      es: 'En la zona de Reus o hasta 15 km y entre semana. Para desplazamientos más largos o fin de semana, se presupuesta aparte.',
      en: 'Within Reus or up to 15 km, weekdays only. Longer trips or weekends are quoted separately.',
    },
  },
  {
    id: 'extra-signature-book',
    name: {
      ca: 'Llibre de signatures amb les fotos de la preboda',
      es: 'Libro de firmas con las fotos de la preboda',
      en: 'Guest signature book with pre-wedding photos',
    },
    price: '125 €',
  },
  {
    id: 'extra-preboda-video',
    name: {
      ca: 'Vídeo preboda',
      es: 'Vídeo preboda',
      en: 'Pre-wedding video',
    },
    price: '545 €',
  },
  {
    id: 'extra-sde',
    name: {
      ca: 'SDE — muntatge de vídeo/tràiler el mateix dia',
      es: 'SDE — montaje de vídeo/tráiler el mismo día',
      en: 'SDE — same-day edit video/trailer',
    },
    price: '908 €',
  },
  {
    id: 'extra-album-30x40',
    name: {
      ca: 'Àlbum de casament de fusta personalitzat 30×40 cm (30 pàgines)',
      es: 'Álbum de boda de madera personalizado 30×40 cm (30 páginas)',
      en: 'Personalised 30×40 cm wooden wedding album (30 pages)',
    },
    price: '545 €',
    note: {
      ca: '20 € per cada pàgina extra',
      es: '20 € por cada página extra',
      en: '20 € per extra page',
    },
  },
  {
    id: 'extra-album-parents',
    name: {
      ca: 'Àlbums per als pares (2 unitats 20×30 cm)',
      es: 'Álbumes para los padres (2 unidades 20×30 cm)',
      en: 'Parents albums (2 units, 20×30 cm)',
    },
    price: '400 €',
  },
  {
    id: 'extra-drone',
    name: {
      ca: 'Operador professional de dron',
      es: 'Operador profesional de dron',
      en: 'Professional drone operator',
    },
    price: '484 €',
    note: {
      ca: 'Depèn del lloc del casament i de les condicions meteorològiques i normativa AESA',
      es: 'Depende del lugar de la boda y de las condiciones meteorológicas y normativa AESA',
      en: 'Subject to venue location, weather conditions and AESA regulations',
    },
  },

  // ─── Fotomatón i complements (Tomafoton by Fotomarbis) ────────────────────
  // Photo-booth / 360-video / etc. add-ons resold as event extras. Catalogue
  // prices are quoted WITHOUT VAT (sin IVA); the amounts below already include
  // 21% VAT. Per-service durations, hour extras, packs, tiers and discounts
  // live in the notes since a PackExtra is a single price + note.
  {
    id: 'tomafoton-fotomaton',
    name: {
      ca: 'Fotomatón (fotos i impressions il·limitades)',
      es: 'Fotomatón (fotos e impresiones ilimitadas)',
      en: 'Photo booth (unlimited photos & prints)',
    },
    price: '423,50 €',
    note: {
      ca: '2 h. Hora extra 96,80 €. 3 h: 520,30 €. Llibre de signatures i galeria online inclosos.',
      es: '2 h. Hora extra 96,80 €. 3 h: 520,30 €. Libro de firmas y galería online incluidos.',
      en: '2 h. Extra hour €96.80. 3 h: €520.30. Guest book and online gallery included.',
    },
  },
  {
    id: 'tomafoton-360',
    name: {
      ca: 'Videomatón 360º',
      es: 'Videomatón 360º',
      en: '360º video booth',
    },
    price: '580,80 €',
    note: {
      ca: '2 h. Hora extra 96,80 €. Pack Fotomatón + 360º: 955,90 €.',
      es: '2 h. Hora extra 96,80 €. Pack Fotomatón + 360º: 955,90 €.',
      en: '2 h. Extra hour €96.80. Photo booth + 360º bundle: €955.90.',
    },
  },
  {
    id: 'tomafoton-360-aeri',
    name: {
      ca: 'Videomatón 360º aeri (fins a 15 persones)',
      es: 'Videomatón 360º aéreo (hasta 15 personas)',
      en: 'Aerial 360º video booth (up to 15 people)',
    },
    price: '701,80 €',
    note: {
      ca: '2 h, sense plataforma. Hora extra 96,80 €. Pack Fotomatón + 360º aeri: 1.076,90 €.',
      es: '2 h, sin plataforma. Hora extra 96,80 €. Pack Fotomatón + 360º aéreo: 1.076,90 €.',
      en: '2 h, no platform. Extra hour €96.80. Photo booth + aerial 360º bundle: €1,076.90.',
    },
  },
  {
    id: 'tomafoton-slowmotion',
    name: {
      ca: 'Vídeo slow motion',
      es: 'Vídeo slow motion',
      en: 'Slow-motion video',
    },
    price: '423,50 €',
    note: {
      ca: '2 h. Hora extra 96,80 €. Combinable en pack amb un altre servei.',
      es: '2 h. Hora extra 96,80 €. Combinable en pack con otro servicio.',
      en: '2 h. Extra hour €96.80. Can be bundled with another service.',
    },
  },
  {
    id: 'tomafoton-confe',
    name: {
      ca: 'El Confe — confessionari de videomissatges',
      es: 'El Confe — confesionario de videomensajes',
      en: 'The Confessional — video-message booth',
    },
    price: '423,50 €',
    note: {
      ca: '2 h. Hora extra 96,80 €. Micròfons sense fils. Combinable en pack.',
      es: '2 h. Hora extra 96,80 €. Micrófonos inalámbricos. Combinable en pack.',
      en: '2 h. Extra hour €96.80. Wireless mics. Can be bundled.',
    },
  },
  {
    id: 'tomafoton-caricatures',
    name: {
      ca: 'Caricatures robotitzades (2 robots)',
      es: 'Caricaturas robotizadas (2 robots)',
      en: 'Robot caricatures (2 robots)',
    },
    price: '726 €',
    note: {
      ca: '2 h. Hora extra 121 €. Opció de còpia en paper de totes les caricatures.',
      es: '2 h. Hora extra 121 €. Opción de copia en papel de todas las caricaturas.',
      en: '2 h. Extra hour €121. Optional paper copies of every caricature.',
    },
  },
  {
    id: 'tomafoton-espejo',
    name: {
      ca: 'Mirall Tomaselfie',
      es: 'Espejo Tomaselfie',
      en: 'Selfie mirror',
    },
    price: '363 €',
    note: {
      ca: '2 h. Sense impressió 363 €, amb impressió 423,50 €. Hora extra 96,80 €. Descompte de 50 € si es contracta algun altre Tomafoton.',
      es: '2 h. Sin impresión 363 €, con impresión 423,50 €. Hora extra 96,80 €. Descuento de 50 € al contratar algún otro Tomafoton.',
      en: '2 h. Without prints €363, with prints €423.50. Extra hour €96.80. €50 off when booking another Tomafoton.',
    },
  },
  {
    id: 'tomafoton-clauers',
    name: {
      ca: 'Quiosc de clauers amb les fotos',
      es: 'Kiosco de llaveros con las fotos',
      en: 'Keychain kiosk with the photos',
    },
    price: '242 €',
    note: {
      ca: '50 clauers 242 €, 100 clauers 338,80 €. Com a detall per als convidats: 50 clauers 302,50 €, clauer extra 4,24 €.',
      es: '50 llaveros 242 €, 100 llaveros 338,80 €. Como detalle para los invitados: 50 llaveros 302,50 €, llavero extra 4,24 €.',
      en: '50 keychains €242, 100 keychains €338.80. As a guest favour: 50 keychains €302.50, extra keychain €4.24.',
    },
  },
  {
    id: 'tomafoton-caravana',
    name: {
      ca: 'Caravana vintage «Day Sí Van»',
      es: 'Caravana vintage «Day Sí Van»',
      en: 'Vintage caravan “Day Sí Van”',
    },
    price: '713,90 €',
    note: {
      ca: 'Decoració durant l\'esdeveniment + 3 h de servei. Hora extra 96,80 €. Inclou fotomatón amb impressions i confessionari.',
      es: 'Decoración durante el evento + 3 h de servicio. Hora extra 96,80 €. Incluye fotomatón con impresiones y confesionario.',
      en: 'Decoration during the event + 3 h of service. Extra hour €96.80. Includes photo booth with prints and confessional.',
    },
  },
  {
    id: 'tomafoton-telefon-vintage',
    name: {
      ca: 'Telèfon vintage gravador d\'àudios',
      es: 'Teléfono vintage grabador de audios',
      en: 'Vintage audio-recording phone',
    },
    price: '181,50 €',
    note: {
      ca: 'Durada de l\'aperitiu o 2 h al ball. Descompte de 30 € amb un altre Tomafoton. Enviament segons distància.',
      es: 'Duración del aperitivo o 2 h en el baile. Descuento de 30 € con otro Tomafoton. Envío según distancia.',
      en: 'Duration of the aperitif or 2 h during the party. €30 off with another Tomafoton. Shipping by distance.',
    },
  },
  {
    id: 'tomafoton-neon',
    name: {
      ca: 'Cartells de neó (Toma Neón)',
      es: 'Carteles de neón (Toma Neón)',
      en: 'Neon signs (Toma Neón)',
    },
    price: '181,50 €',
    note: {
      ca: 'Per dia, lloguer durant tot el dia. Descompte de 30 € amb un altre Tomafoton. Enviament segons distància.',
      es: 'Por día, alquiler durante todo el día. Descuento de 30 € con otro Tomafoton. Envío según distancia.',
      en: 'Per day, all-day rental. €30 off with another Tomafoton. Shipping by distance.',
    },
  },
  {
    id: 'tomafoton-imants',
    name: {
      ca: 'Pack de 80 imants per al fotomatón',
      es: 'Pack de 80 imanes para el fotomatón',
      en: 'Pack of 80 magnets for the photo booth',
    },
    price: '36,30 €',
  },
  {
    id: 'tomafoton-tires-10x15',
    name: {
      ca: 'Tires de fotos en mida 10×15 cm',
      es: 'Tiras de fotos en tamaño 10×15 cm',
      en: 'Photo strips in 10×15 cm size',
    },
    price: '36,30 €',
  },
  {
    id: 'tomafoton-360-xl',
    name: {
      ca: 'Plataforma del videomatón 360º mida XL',
      es: 'Plataforma del videomatón 360º tamaño XL',
      en: 'XL-size 360º video-booth platform',
    },
    price: '48,40 €',
  },
  {
    id: 'tomafoton-desplacament',
    name: {
      ca: 'Desplaçament a més de 50 km d\'El Morell',
      es: 'Desplazamiento a más de 50 km de El Morell',
      en: 'Travel beyond 50 km from El Morell',
    },
    price: '48,40 €',
  },
];
