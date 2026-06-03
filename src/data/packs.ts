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
  /** Formatted price string, IVA included (Spanish B2C law requires
   *  tax-included display for consumer prices — no "+ IVA" suffix). */
  price: string;
  includes: Record<Lang, string[]>;
  highlight?: PackHighlight;
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
    price: '1.290 €',
    highlight: 'picked-photo',
    includes: {
      es: [
        'Cobertura completa del día: desde los preparativos hasta 45 min – 1 h después del primer baile (máximo 14 h)',
        '700–1.200 fotos editadas en alta resolución, sin marca de agua',
        'Galería privada online para compartir con familia y amigos',
        'Caja de madera personalizada con 9 copias seleccionadas',
        'Pendrive con todas las fotografías',
        'Entrega en máximo 90 días',
      ],
      ca: [
        'Cobertura completa del dia: des dels preparatius fins a 45 min – 1 h després del primer ball (màxim 14 h)',
        '700–1.200 fotos editades en alta resolució, sense marca d’aigua',
        'Galeria privada online per compartir amb família i amics',
        'Caixa de fusta personalitzada amb 9 còpies seleccionades',
        'Pendrive amb totes les fotografies',
        'Entrega en màxim 90 dies',
      ],
      en: [
        'Full-day coverage: from prep to 45 min – 1 h after the first dance (max 14 h)',
        '700–1,200 edited photos in high resolution, no watermark',
        'Private online gallery to share with family and friends',
        'Personalised wooden box with 9 selected prints',
        'USB drive with all photographs',
        'Delivered within 90 days',
      ],
    },
  },
  {
    id: 'lqsa',
    type: 'photo',
    name: { es: '¡La que se avecina!', ca: '¡La que se avecina!', en: '¡La que se avecina!' },
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
    price: '1.290 €',
    highlight: 'picked-video',
    includes: {
      es: [
        'Cobertura completa con 1 cámara: desde los preparativos hasta 45 min después del primer baile',
        'Vídeo documental de 25–35 minutos en HD',
        'Dron incluido (sujeto a condiciones meteorológicas y normativa AESA)',
        'Edición documental sin marca de agua',
        'Entrega en MP4 (HD)',
        'Entrega en máximo 5 meses',
      ],
      ca: [
        'Cobertura completa amb 1 càmera: des dels preparatius fins a 45 min després del primer ball',
        'Vídeo documental de 25–35 minuts en HD',
        'Dron inclòs (segons condicions meteorològiques i normativa AESA)',
        'Edició documental sense marca d’aigua',
        'Entrega en MP4 (HD)',
        'Entrega en màxim 5 mesos',
      ],
      en: [
        'Full-day coverage with 1 camera: from prep to 45 min after the first dance',
        '25–35 min documentary film in HD',
        'Drone included (weather and AESA regulation permitting)',
        'Documentary edit, no watermark',
        'Delivered in MP4 (HD)',
        'Delivered within 5 months',
      ],
    },
  },
  {
    id: 'outlander',
    type: 'video',
    name: { es: 'Outlander', ca: 'Outlander', en: 'Outlander' },
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
    name: {
      es: 'Cómo conocí + This Is Us',
      ca: 'Com vaig conèixer + This Is Us',
      en: 'How I Met + This Is Us',
    },
    price: '2.480 €',
    includes: {
      es: [
        'Todo del pack "Cómo conocí a vuestra madre" (foto)',
        'Todo del pack "This Is Us" (vídeo)',
        'Foto + vídeo coordinados por dos hermanos en un solo equipo',
        'Sin necesidad de coordinar dos proveedores externos',
      ],
      ca: [
        'Tot del pack "Com vaig conèixer la vostra mare" (foto)',
        'Tot del pack "This Is Us" (vídeo)',
        'Foto + vídeo coordinats per dos germans en un sol equip',
        'Sense haver de coordinar dos proveïdors externs',
      ],
      en: [
        'Everything in the "How I Met Your Mother" pack (photo)',
        'Everything in the "This Is Us" pack (video)',
        'Photo + video coordinated by two brothers as one crew',
        'No need to coordinate two separate vendors',
      ],
    },
  },
  {
    id: 'combo-cc-ol',
    type: 'combo',
    name: {
      es: 'Cómo conocí + Outlander',
      ca: 'Com vaig conèixer + Outlander',
      en: 'How I Met + Outlander',
    },
    price: '2.750 €',
    includes: {
      es: [
        'Todo del pack "Cómo conocí a vuestra madre" (foto)',
        'Todo del pack "Outlander" (vídeo con extras y tráiler)',
        'Foto + vídeo coordinados por dos hermanos en un solo equipo',
      ],
      ca: [
        'Tot del pack "Com vaig conèixer la vostra mare" (foto)',
        'Tot del pack "Outlander" (vídeo amb extres i tràiler)',
        'Foto + vídeo coordinats per dos germans en un sol equip',
      ],
      en: [
        'Everything in the "How I Met Your Mother" pack (photo)',
        'Everything in the "Outlander" pack (video with extras and trailer)',
        'Photo + video coordinated by two brothers as one crew',
      ],
    },
  },
  {
    id: 'combo-lqsa-tu',
    type: 'combo',
    name: {
      es: '¡La que se avecina! + This Is Us',
      ca: '¡La que se avecina! + This Is Us',
      en: '¡La que se avecina! + This Is Us',
    },
    price: '2.900 €',
    highlight: 'star',
    includes: {
      es: [
        'Todo del pack "¡La que se avecina!" (foto + álbum de madera 30×40)',
        'Todo del pack "This Is Us" (vídeo documental)',
        'Foto + vídeo coordinados por dos hermanos en un solo equipo',
        'El pack más completo y elegido por las parejas',
      ],
      ca: [
        'Tot del pack "¡La que se avecina!" (foto + àlbum de fusta 30×40)',
        'Tot del pack "This Is Us" (vídeo documental)',
        'Foto + vídeo coordinats per dos germans en un sol equip',
        'El pack més complet i triat per les parelles',
      ],
      en: [
        'Everything in the "¡La que se avecina!" pack (photo + 30×40 wooden album)',
        'Everything in the "This Is Us" pack (documentary film)',
        'Photo + video coordinated by two brothers as one crew',
        'The most complete and most-picked pack',
      ],
    },
  },
  {
    id: 'combo-lqsa-ol',
    type: 'combo',
    name: {
      es: '¡La que se avecina! + Outlander',
      ca: '¡La que se avecina! + Outlander',
      en: '¡La que se avecina! + Outlander',
    },
    price: '3.170 €',
    includes: {
      es: [
        'Todo del pack "¡La que se avecina!" (foto + álbum de madera 30×40)',
        'Todo del pack "Outlander" (vídeo con extras y tráiler)',
        'Foto + vídeo coordinados por dos hermanos en un solo equipo',
        'La cobertura más completa que ofrecemos',
      ],
      ca: [
        'Tot del pack "¡La que se avecina!" (foto + àlbum de fusta 30×40)',
        'Tot del pack "Outlander" (vídeo amb extres i tràiler)',
        'Foto + vídeo coordinats per dos germans en un sol equip',
        'La cobertura més completa que oferim',
      ],
      en: [
        'Everything in the "¡La que se avecina!" pack (photo + 30×40 wooden album)',
        'Everything in the "Outlander" pack (video with extras and trailer)',
        'Photo + video coordinated by two brothers as one crew',
        'The most complete coverage we offer',
      ],
    },
  },
];

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
];
