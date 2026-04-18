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
  price: string; // formatted
  includes: Record<Lang, string[]>;
  highlight?: PackHighlight;
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
    price: '1.290 € + IVA',
    highlight: 'picked-photo',
    includes: {
      es: [
        'Cobertura completa del día',
        '700–1.200 fotos en galería privada online',
        'Caja de madera personalizada con 9 copias',
        'Pendrive con todas las fotografías',
      ],
      ca: [
        'Cobertura completa del dia',
        '700–1.200 fotos en galeria privada online',
        'Caixa de fusta personalitzada amb 9 còpies',
        'Pendrive amb totes les fotografies',
      ],
      en: [
        'Full-day coverage',
        '700–1,200 photos in a private online gallery',
        'Personalised wooden box with 9 prints',
        'USB drive with all photographs',
      ],
    },
  },
  {
    id: 'lqsa',
    type: 'photo',
    name: { es: '¡La que se avecina!', ca: 'La que s’atansa!', en: 'Here It Comes!' },
    price: '1.740 € + IVA',
    includes: {
      es: ['Todo lo del pack anterior', 'Álbum de madera personalizado 30×40 cm (30 páginas)'],
      ca: ['Tot el del pack anterior', 'Àlbum de fusta personalitzat 30×40 cm (30 pàgines)'],
      en: ['Everything in the previous pack', 'Personalised wooden album 30×40 cm (30 pages)'],
    },
  },

  // ─── VIDEO ─────────────────────────────────────────────
  {
    id: 'this-is-us',
    type: 'video',
    name: { es: 'This Is Us', ca: 'This Is Us', en: 'This Is Us' },
    price: '1.290 € + IVA',
    highlight: 'picked-video',
    includes: {
      es: [
        'Cobertura completa con 1 cámara',
        'Vídeo documental de 25–35 min',
        'Dron (según condiciones meteorológicas y legales)',
      ],
      ca: [
        'Cobertura completa amb 1 càmera',
        'Vídeo documental de 25–35 min',
        'Dron (segons condicions meteorològiques i legals)',
      ],
      en: [
        'Full-day coverage with 1 camera',
        '25–35 min documentary film',
        'Drone (weather/legal conditions permitting)',
      ],
    },
  },
  {
    id: 'outlander',
    type: 'video',
    name: { es: 'Outlander', ca: 'Outlander', en: 'Outlander' },
    price: '1.590 € + IVA',
    includes: {
      es: ['Todo lo de This Is Us', 'Extras (discursos, ceremonia completa…)', 'Tráiler de boda'],
      ca: ['Tot el de This Is Us', 'Extres (discursos, cerimònia completa…)', 'Tràiler de boda'],
      en: ['Everything in This Is Us', 'Extras (speeches, full ceremony…)', 'Wedding trailer'],
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
    price: '2.480 € + IVA',
    includes: {
      es: ['Fotos', 'Caja Vintage', 'Galería online', 'Vídeo', 'Edición documental'],
      ca: ['Fotos', 'Caixa Vintage', 'Galeria online', 'Vídeo', 'Edició documental'],
      en: ['Photos', 'Vintage box', 'Online gallery', 'Video', 'Documentary edit'],
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
    price: '2.750 € + IVA',
    includes: {
      es: ['Fotos', 'Caja Vintage', 'Galería online', 'Vídeo', 'Edición documental', 'Tráiler', 'Extras'],
      ca: ['Fotos', 'Caixa Vintage', 'Galeria online', 'Vídeo', 'Edició documental', 'Tràiler', 'Extres'],
      en: ['Photos', 'Vintage box', 'Online gallery', 'Video', 'Documentary edit', 'Trailer', 'Extras'],
    },
  },
  {
    id: 'combo-lqsa-tu',
    type: 'combo',
    name: {
      es: '¡La que se avecina! + This Is Us',
      ca: 'La que s’atansa! + This Is Us',
      en: 'Here It Comes! + This Is Us',
    },
    price: '2.900 € + IVA',
    highlight: 'star',
    includes: {
      es: ['Fotos', 'Caja Vintage', 'Galería online', 'Álbum de boda', 'Vídeo', 'Edición documental'],
      ca: ['Fotos', 'Caixa Vintage', 'Galeria online', 'Àlbum de boda', 'Vídeo', 'Edició documental'],
      en: ['Photos', 'Vintage box', 'Online gallery', 'Wedding album', 'Video', 'Documentary edit'],
    },
  },
  {
    id: 'combo-lqsa-ol',
    type: 'combo',
    name: {
      es: '¡La que se avecina! + Outlander',
      ca: 'La que s’atansa! + Outlander',
      en: 'Here It Comes! + Outlander',
    },
    price: '3.170 € + IVA',
    includes: {
      es: ['Fotos', 'Caja Vintage', 'Galería online', 'Álbum de boda', 'Vídeo', 'Edición documental', 'Tráiler', 'Extras'],
      ca: ['Fotos', 'Caixa Vintage', 'Galeria online', 'Àlbum de boda', 'Vídeo', 'Edició documental', 'Tràiler', 'Extres'],
      en: ['Photos', 'Vintage box', 'Online gallery', 'Wedding album', 'Video', 'Documentary edit', 'Trailer', 'Extras'],
    },
  },
];
