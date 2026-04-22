// Hidden typology-specific landing pages.
//
// One landing per (ceremony type × service) combination. Each landing is a
// tightly-focused page we share privately with a lead by email / WhatsApp
// after they submit the contact form (or the quiz). They are `noindex`,
// not in the navigation, and excluded from the sitemap — crawlers don't
// see them, but the URLs are plain and shareable.
//
// The `slugForLead(...)` helper below maps the values the form captures
// (ceremonyType + serviceInterest + location) to the right slug, so the
// auto-reply email in PR C can drop the correct link in the message.

import type { Lang } from '~/i18n/ui';

export type Ceremony = 'civil' | 'religious' | 'symbolic' | 'destination';
export type Service = 'photo' | 'photo-video';

export interface LandingCopy {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  h1: string;
  intro: string;
  deliverables: string[];
  packsLead: string;
  closing: string;
}

export interface Landing {
  slug: string;
  ceremony: Ceremony;
  service: Service;
  heroImage: string;
  galleryImages: string[];
  /** Pack IDs from src/data/packs.ts, in display order. */
  recommendedPackIds: string[];
  copy: Record<Lang, LandingCopy>;
}

const g = (n: number) => `/photos/generic/${String(n).padStart(3, '0')}-lg.jpg`;

export const LANDINGS: Landing[] = [
  // ─── CIVIL · FOTO ────────────────────────────────────────────────────
  {
    slug: 'boda-civil-foto',
    ceremony: 'civil',
    service: 'photo',
    heroImage: g(5),
    galleryImages: [g(1), g(11), g(18), g(23), g(28), g(32)],
    recommendedPackIds: ['como-conoci', 'lqsa'],
    copy: {
      ca: {
        metaTitle: 'Fotografia per a boda civil · Lifetime Weddings',
        metaDesc: 'Proposta de fotografia per a la vostra boda civil. Cobertura completa, galeria privada en 3–4 setmanes, caixa de fusta personalitzada.',
        eyebrow: 'Proposta per a la vostra boda',
        h1: 'Fotografia per a la vostra boda civil',
        intro: 'Us acompanyem des dels preparatius fins al final de la festa. Estil documental, sense posats forçats, respectant el ritme del dia. L’objectiu és que d’aquí 20 anys reviviu la boda — no que recordeu el fotògraf.',
        deliverables: [
          'Cobertura completa del dia: preparatius, cerimònia civil, còctel, sopar i festa',
          '700–1.200 fotos editades en galeria privada online',
          'Entrega en 3–4 setmanes des de la boda',
          'Caixa de fusta personalitzada amb 9 còpies',
          'Pendrive amb totes les fotografies',
          'Sessió pre-boda opcional inclosa si reserveu abans del 31/12/2026',
        ],
        packsLead: 'Aquests són els packs que millor encaixen amb una boda civil només amb fotografia. Tots es poden personalitzar.',
        closing: 'Si us quadra, ens escriviu i us confirmem disponibilitat en menys de 24h.',
      },
      es: {
        metaTitle: 'Fotografía para boda civil · Lifetime Weddings',
        metaDesc: 'Propuesta de fotografía para vuestra boda civil. Cobertura completa, galería privada en 3–4 semanas, caja de madera personalizada.',
        eyebrow: 'Propuesta para vuestra boda',
        h1: 'Fotografía para vuestra boda civil',
        intro: 'Os acompañamos desde los preparativos hasta el final de la fiesta. Estilo documental, sin poses forzadas, respetando el ritmo del día. El objetivo es que dentro de 20 años reviváis la boda — no que recordéis al fotógrafo.',
        deliverables: [
          'Cobertura completa del día: preparativos, ceremonia civil, cóctel, cena y fiesta',
          '700–1.200 fotos editadas en galería privada online',
          'Entrega en 3–4 semanas desde la boda',
          'Caja de madera personalizada con 9 copias',
          'Pendrive con todas las fotografías',
          'Sesión pre-boda opcional incluida si reserváis antes del 31/12/2026',
        ],
        packsLead: 'Estos son los packs que mejor encajan con una boda civil solo con fotografía. Todos se pueden personalizar.',
        closing: 'Si os cuadra, nos escribís y os confirmamos disponibilidad en menos de 24h.',
      },
      en: {
        metaTitle: 'Photography for civil weddings · Lifetime Weddings',
        metaDesc: 'Photography proposal for your civil wedding. Full-day coverage, private gallery in 3–4 weeks, personalised wooden box.',
        eyebrow: 'Proposal for your wedding',
        h1: 'Photography for your civil wedding',
        intro: 'We’re with you from the getting-ready until the end of the party. Documentary style, no forced poses, respecting the rhythm of the day. The goal is that 20 years from now you relive the wedding — not remember the photographer.',
        deliverables: [
          'Full-day coverage: getting ready, civil ceremony, cocktail, dinner and party',
          '700–1,200 edited photos in a private online gallery',
          'Delivery in 3–4 weeks from the wedding',
          'Personalised wooden box with 9 prints',
          'USB drive with all photographs',
          'Optional pre-wedding session included if you book before 31/12/2026',
        ],
        packsLead: 'These are the packs that best fit a civil wedding with photography only. All of them can be personalised.',
        closing: 'If it works for you, drop us a line — we’ll confirm availability within 24h.',
      },
    },
  },

  // ─── CIVIL · FOTO + VÍDEO ────────────────────────────────────────────
  {
    slug: 'boda-civil-foto-video',
    ceremony: 'civil',
    service: 'photo-video',
    heroImage: g(8),
    galleryImages: [g(3), g(14), g(19), g(22), g(27), g(31)],
    recommendedPackIds: ['combo-cc-tu', 'combo-lqsa-tu', 'combo-lqsa-ol'],
    copy: {
      ca: {
        metaTitle: 'Foto + vídeo per a boda civil · Lifetime Weddings',
        metaDesc: 'Proposta de fotografia i vídeo per a la vostra boda civil. Pel·lícula documental de 25–35 min, 700–1.200 fotos, dron inclòs.',
        eyebrow: 'Proposta per a la vostra boda',
        h1: 'Foto + vídeo per a la vostra boda civil',
        intro: 'Dos germans, dues càmeres, la mateixa mirada. Un fa foto i l’altre vídeo, al mateix temps, sense molestar-nos. El resultat és una cobertura doble sense sensació de "dos equips" donant voltes al banquet.',
        deliverables: [
          'Cobertura completa del dia amb foto + vídeo simultanis',
          '700–1.200 fotos editades en galeria privada online (3–4 setmanes)',
          'Pel·lícula documental de 25–35 min (8–10 setmanes)',
          'Dron (segons condicions meteorològiques i legals)',
          'Caixa de fusta personalitzada amb 9 còpies',
          'Sessió pre-boda opcional inclosa si reserveu abans del 31/12/2026',
        ],
        packsLead: 'Aquests són els packs foto+vídeo que més recomanem per a una boda civil.',
        closing: 'Si us quadra, ens escriviu i us confirmem disponibilitat en menys de 24h.',
      },
      es: {
        metaTitle: 'Foto + vídeo para boda civil · Lifetime Weddings',
        metaDesc: 'Propuesta de fotografía y vídeo para vuestra boda civil. Película documental de 25–35 min, 700–1.200 fotos, dron incluido.',
        eyebrow: 'Propuesta para vuestra boda',
        h1: 'Foto + vídeo para vuestra boda civil',
        intro: 'Dos hermanos, dos cámaras, la misma mirada. Uno hace foto y el otro vídeo, al mismo tiempo, sin molestarnos. El resultado es cobertura doble sin sensación de "dos equipos" dando vueltas al banquete.',
        deliverables: [
          'Cobertura completa del día con foto + vídeo simultáneos',
          '700–1.200 fotos editadas en galería privada online (3–4 semanas)',
          'Película documental de 25–35 min (8–10 semanas)',
          'Dron (según condiciones meteorológicas y legales)',
          'Caja de madera personalizada con 9 copias',
          'Sesión pre-boda opcional incluida si reserváis antes del 31/12/2026',
        ],
        packsLead: 'Estos son los packs foto+vídeo que más recomendamos para una boda civil.',
        closing: 'Si os cuadra, nos escribís y os confirmamos disponibilidad en menos de 24h.',
      },
      en: {
        metaTitle: 'Photo + video for civil weddings · Lifetime Weddings',
        metaDesc: 'Photo and video proposal for your civil wedding. 25–35 min documentary film, 700–1,200 photos, drone included.',
        eyebrow: 'Proposal for your wedding',
        h1: 'Photo + video for your civil wedding',
        intro: 'Two brothers, two cameras, one eye. One of us shoots photo and the other video, at the same time, never in each other’s way. The result is double coverage without the feeling of "two teams" circling the reception.',
        deliverables: [
          'Full-day coverage with simultaneous photo + video',
          '700–1,200 edited photos in a private online gallery (3–4 weeks)',
          '25–35 min documentary film (8–10 weeks)',
          'Drone (weather/legal conditions permitting)',
          'Personalised wooden box with 9 prints',
          'Optional pre-wedding session included if you book before 31/12/2026',
        ],
        packsLead: 'These are the photo+video packs we most recommend for a civil wedding.',
        closing: 'If it works for you, drop us a line — we’ll confirm availability within 24h.',
      },
    },
  },

  // ─── RELIGIOSA · FOTO ────────────────────────────────────────────────
  {
    slug: 'boda-religiosa-foto',
    ceremony: 'religious',
    service: 'photo',
    heroImage: g(12),
    galleryImages: [g(2), g(7), g(15), g(21), g(26), g(33)],
    recommendedPackIds: ['como-conoci', 'lqsa'],
    copy: {
      ca: {
        metaTitle: 'Fotografia per a boda religiosa · Lifetime Weddings',
        metaDesc: 'Proposta de fotografia per a la vostra boda religiosa. Cobertura a l’església + celebració, galeria privada en 3–4 setmanes.',
        eyebrow: 'Proposta per a la vostra boda',
        h1: 'Fotografia per a la vostra boda religiosa',
        intro: 'Treballem a les esglésies amb respecte i discreció. Sense flaix durant la cerimònia, sense passar per davant dels convidats ni dels mossens, captant els moments importants des del lloc correcte. Després, a la celebració, seguim el ritme del dia.',
        deliverables: [
          'Cobertura completa: preparatius, església, còctel, sopar i festa',
          '700–1.200 fotos editades en galeria privada online',
          'Entrega en 3–4 setmanes des de la boda',
          'Caixa de fusta personalitzada amb 9 còpies',
          'Pendrive amb totes les fotografies',
          'Coneixement de la litúrgia catòlica i civil per no perdre’ns cap moment clau',
        ],
        packsLead: 'Packs de fotografia recomanats per a la vostra boda religiosa.',
        closing: 'Si us quadra, ens escriviu i us confirmem disponibilitat en menys de 24h.',
      },
      es: {
        metaTitle: 'Fotografía para boda religiosa · Lifetime Weddings',
        metaDesc: 'Propuesta de fotografía para vuestra boda religiosa. Cobertura en iglesia + celebración, galería privada en 3–4 semanas.',
        eyebrow: 'Propuesta para vuestra boda',
        h1: 'Fotografía para vuestra boda religiosa',
        intro: 'Trabajamos en las iglesias con respeto y discreción. Sin flash durante la ceremonia, sin pasar por delante de los invitados ni de los celebrantes, captando los momentos importantes desde el sitio correcto. Después, en la celebración, seguimos el ritmo del día.',
        deliverables: [
          'Cobertura completa: preparativos, iglesia, cóctel, cena y fiesta',
          '700–1.200 fotos editadas en galería privada online',
          'Entrega en 3–4 semanas desde la boda',
          'Caja de madera personalizada con 9 copias',
          'Pendrive con todas las fotografías',
          'Conocimiento de la liturgia católica y civil para no perdernos ningún momento clave',
        ],
        packsLead: 'Packs de fotografía recomendados para vuestra boda religiosa.',
        closing: 'Si os cuadra, nos escribís y os confirmamos disponibilidad en menos de 24h.',
      },
      en: {
        metaTitle: 'Photography for religious weddings · Lifetime Weddings',
        metaDesc: 'Photography proposal for your religious wedding. Church + reception coverage, private gallery in 3–4 weeks.',
        eyebrow: 'Proposal for your wedding',
        h1: 'Photography for your religious wedding',
        intro: 'We work inside churches with respect and discretion. No flash during the ceremony, never walking in front of guests or officiants, catching the important moments from the right spot. Then at the reception we flow with the day.',
        deliverables: [
          'Full-day coverage: getting ready, church, cocktail, dinner and party',
          '700–1,200 edited photos in a private online gallery',
          'Delivery in 3–4 weeks from the wedding',
          'Personalised wooden box with 9 prints',
          'USB drive with all photographs',
          'Familiar with Catholic and civil liturgy so we never miss a key moment',
        ],
        packsLead: 'Photography packs we recommend for your religious wedding.',
        closing: 'If it works for you, drop us a line — we’ll confirm availability within 24h.',
      },
    },
  },

  // ─── RELIGIOSA · FOTO + VÍDEO ────────────────────────────────────────
  {
    slug: 'boda-religiosa-foto-video',
    ceremony: 'religious',
    service: 'photo-video',
    heroImage: g(16),
    galleryImages: [g(4), g(10), g(17), g(20), g(25), g(29)],
    recommendedPackIds: ['combo-cc-tu', 'combo-lqsa-tu', 'combo-lqsa-ol'],
    copy: {
      ca: {
        metaTitle: 'Foto + vídeo per a boda religiosa · Lifetime Weddings',
        metaDesc: 'Fotografia i vídeo per a la vostra boda religiosa. Cerimònia completa a l’església + celebració, pel·lícula documental 25–35 min.',
        eyebrow: 'Proposta per a la vostra boda',
        h1: 'Foto + vídeo per a la vostra boda religiosa',
        intro: 'A la cerimònia religiosa, la pel·lícula documental necessita un equip que sàpiga moure’s sense interrompre. Nosaltres ja hem fet aquest treball moltes vegades: situem les càmeres als llocs correctes, sense creuar-nos amb els mossens, i capturem la cerimònia completa amb so net.',
        deliverables: [
          'Cobertura completa del dia amb foto + vídeo simultanis',
          'Cerimònia religiosa completa gravada sense talls (àudio net)',
          '700–1.200 fotos editades en galeria privada online (3–4 setmanes)',
          'Pel·lícula documental de 25–35 min (8–10 setmanes)',
          'Dron (segons condicions meteorològiques i legals)',
          'Extres opcionals: discursos, tràiler de 2–3 min',
        ],
        packsLead: 'Packs foto+vídeo recomanats per a boda religiosa.',
        closing: 'Si us quadra, ens escriviu i us confirmem disponibilitat en menys de 24h.',
      },
      es: {
        metaTitle: 'Foto + vídeo para boda religiosa · Lifetime Weddings',
        metaDesc: 'Fotografía y vídeo para vuestra boda religiosa. Ceremonia completa en iglesia + celebración, película documental 25–35 min.',
        eyebrow: 'Propuesta para vuestra boda',
        h1: 'Foto + vídeo para vuestra boda religiosa',
        intro: 'En la ceremonia religiosa, la película documental necesita un equipo que sepa moverse sin interrumpir. Nosotros ya hemos hecho este trabajo muchas veces: situamos las cámaras en los sitios correctos, sin cruzarnos con los celebrantes, y grabamos la ceremonia completa con audio limpio.',
        deliverables: [
          'Cobertura completa del día con foto + vídeo simultáneos',
          'Ceremonia religiosa completa grabada sin cortes (audio limpio)',
          '700–1.200 fotos editadas en galería privada online (3–4 semanas)',
          'Película documental de 25–35 min (8–10 semanas)',
          'Dron (según condiciones meteorológicas y legales)',
          'Extras opcionales: discursos, tráiler de 2–3 min',
        ],
        packsLead: 'Packs foto+vídeo recomendados para boda religiosa.',
        closing: 'Si os cuadra, nos escribís y os confirmamos disponibilidad en menos de 24h.',
      },
      en: {
        metaTitle: 'Photo + video for religious weddings · Lifetime Weddings',
        metaDesc: 'Photo and video for your religious wedding. Full church ceremony + reception, 25–35 min documentary film.',
        eyebrow: 'Proposal for your wedding',
        h1: 'Photo + video for your religious wedding',
        intro: 'At a religious ceremony, documentary film needs a crew that knows how to move without interrupting. We’ve done this many times: cameras placed in the right spots, never crossing paths with the officiants, recording the full ceremony with clean audio.',
        deliverables: [
          'Full-day coverage with simultaneous photo + video',
          'Full religious ceremony recorded uncut (clean audio)',
          '700–1,200 edited photos in a private online gallery (3–4 weeks)',
          '25–35 min documentary film (8–10 weeks)',
          'Drone (weather/legal conditions permitting)',
          'Optional extras: speeches, 2–3 min trailer',
        ],
        packsLead: 'Photo + video packs we recommend for a religious wedding.',
        closing: 'If it works for you, drop us a line — we’ll confirm availability within 24h.',
      },
    },
  },

  // ─── SIMBÒLICA · FOTO + VÍDEO ────────────────────────────────────────
  {
    slug: 'boda-simbolica-foto-video',
    ceremony: 'symbolic',
    service: 'photo-video',
    heroImage: g(24),
    galleryImages: [g(6), g(13), g(22), g(27), g(30), g(33)],
    recommendedPackIds: ['combo-cc-tu', 'combo-lqsa-tu'],
    copy: {
      ca: {
        metaTitle: 'Foto + vídeo per a boda simbòlica · Lifetime Weddings',
        metaDesc: 'Fotografia i vídeo per a boda simbòlica. Cerimònies a l’aire lliure, rituals personalitzats, sense encotillaments religiosos ni burocràcia.',
        eyebrow: 'Proposta per a la vostra boda',
        h1: 'Foto + vídeo per a la vostra boda simbòlica',
        intro: 'Les bodes simbòliques són les més lliures — rituals inventats per vosaltres, lectures, música, llocs insòlits. A nosaltres ens encanta aquesta llibertat perquè ens permet fer la nostra feina sense protocols: estar on toca, en el moment just, sense que ningú us digui "ara no es pot".',
        deliverables: [
          'Cobertura completa del dia amb foto + vídeo simultanis',
          '700–1.200 fotos editades en galeria privada online (3–4 setmanes)',
          'Pel·lícula documental de 25–35 min (8–10 setmanes)',
          'Rituals personalitzats capturats amb temps i sense presses',
          'Dron (segons condicions meteorològiques i legals)',
          'Sessió pre-boda opcional inclosa si reserveu abans del 31/12/2026',
        ],
        packsLead: 'Packs foto+vídeo recomanats per a boda simbòlica.',
        closing: 'Si us quadra, ens escriviu i us confirmem disponibilitat en menys de 24h.',
      },
      es: {
        metaTitle: 'Foto + vídeo para boda simbólica · Lifetime Weddings',
        metaDesc: 'Fotografía y vídeo para boda simbólica. Ceremonias al aire libre, rituales personalizados, sin encorsetamientos religiosos ni burocracia.',
        eyebrow: 'Propuesta para vuestra boda',
        h1: 'Foto + vídeo para vuestra boda simbólica',
        intro: 'Las bodas simbólicas son las más libres — rituales inventados por vosotros, lecturas, música, lugares insólitos. A nosotros nos encanta esa libertad porque nos permite hacer nuestro trabajo sin protocolos: estar donde toca, en el momento justo, sin que nadie os diga "ahora no se puede".',
        deliverables: [
          'Cobertura completa del día con foto + vídeo simultáneos',
          '700–1.200 fotos editadas en galería privada online (3–4 semanas)',
          'Película documental de 25–35 min (8–10 semanas)',
          'Rituales personalizados capturados con tiempo y sin prisas',
          'Dron (según condiciones meteorológicas y legales)',
          'Sesión pre-boda opcional incluida si reserváis antes del 31/12/2026',
        ],
        packsLead: 'Packs foto+vídeo recomendados para boda simbólica.',
        closing: 'Si os cuadra, nos escribís y os confirmamos disponibilidad en menos de 24h.',
      },
      en: {
        metaTitle: 'Photo + video for symbolic weddings · Lifetime Weddings',
        metaDesc: 'Photo and video for a symbolic wedding. Outdoor ceremonies, personalised rituals, no religious constraints, no paperwork.',
        eyebrow: 'Proposal for your wedding',
        h1: 'Photo + video for your symbolic wedding',
        intro: 'Symbolic weddings are the freest — rituals you invent, readings, music, unusual venues. We love that freedom because it lets us do our job without protocols: being where we need to be, exactly when, with nobody telling us "not now".',
        deliverables: [
          'Full-day coverage with simultaneous photo + video',
          '700–1,200 edited photos in a private online gallery (3–4 weeks)',
          '25–35 min documentary film (8–10 weeks)',
          'Personalised rituals captured with time and no rush',
          'Drone (weather/legal conditions permitting)',
          'Optional pre-wedding session included if you book before 31/12/2026',
        ],
        packsLead: 'Photo + video packs we recommend for a symbolic wedding.',
        closing: 'If it works for you, drop us a line — we’ll confirm availability within 24h.',
      },
    },
  },

  // ─── DESTINATION · FOTO + VÍDEO ──────────────────────────────────────
  {
    slug: 'boda-destination-foto-video',
    ceremony: 'destination',
    service: 'photo-video',
    heroImage: g(9),
    galleryImages: [g(2), g(11), g(16), g(21), g(28), g(33)],
    recommendedPackIds: ['combo-lqsa-tu', 'combo-lqsa-ol'],
    copy: {
      ca: {
        metaTitle: 'Foto + vídeo per a destination wedding · Lifetime Weddings',
        metaDesc: 'Fotografia i vídeo per a destination weddings. Nova York, Osca, Màlaga, o on calgui. Equip complet foto+vídeo amb logística resolta.',
        eyebrow: 'Proposta per a la vostra boda',
        h1: 'Foto + vídeo per a la vostra destination wedding',
        intro: 'Hem filmat bodes a Nova York, Màlaga, Osca, Castelló i Brooklyn. Viatjar no és l’excepció; és una part natural de la nostra feina. Ho organitzem tot: equip amb mans lliures per a facturació, backup complet de material i coneixement de com es treballa en llocs on no tenim una base a 30 min de distància.',
        deliverables: [
          'Cobertura completa del dia amb foto + vídeo simultanis',
          '700–1.200 fotos editades en galeria privada online (3–4 setmanes)',
          'Pel·lícula documental de 25–35 min (8–10 setmanes)',
          'Equip portable optimitzat per a viatges + backup complet',
          'Dron (segons condicions meteorològiques i legals)',
          'Tràiler de boda inclòs',
        ],
        packsLead: 'Els desplaçaments fora de Catalunya es pressuposten a part. Aquests són els packs foto+vídeo que recomanem com a base.',
        closing: 'Digueu-nos la data i el lloc i us fem una proposta amb desplaçament en menys de 24h.',
      },
      es: {
        metaTitle: 'Foto + vídeo para destination wedding · Lifetime Weddings',
        metaDesc: 'Fotografía y vídeo para destination weddings. Nueva York, Huesca, Málaga, o donde haga falta. Equipo completo foto+vídeo con logística resuelta.',
        eyebrow: 'Propuesta para vuestra boda',
        h1: 'Foto + vídeo para vuestra destination wedding',
        intro: 'Hemos rodado bodas en Nueva York, Málaga, Huesca, Castellón y Brooklyn. Viajar no es la excepción; es parte natural de nuestro trabajo. Lo organizamos todo: equipaje con manos libres para facturación, backup completo de material y el oficio de saber trabajar en lugares donde no tenemos una base a 30 min.',
        deliverables: [
          'Cobertura completa del día con foto + vídeo simultáneos',
          '700–1.200 fotos editadas en galería privada online (3–4 semanas)',
          'Película documental de 25–35 min (8–10 semanas)',
          'Equipo portable optimizado para viajes + backup completo',
          'Dron (según condiciones meteorológicas y legales)',
          'Tráiler de boda incluido',
        ],
        packsLead: 'Los desplazamientos fuera de Cataluña se presupuestan aparte. Estos son los packs foto+vídeo que recomendamos como base.',
        closing: 'Decidnos la fecha y el lugar y os hacemos una propuesta con desplazamiento en menos de 24h.',
      },
      en: {
        metaTitle: 'Photo + video for destination weddings · Lifetime Weddings',
        metaDesc: 'Photo and video for destination weddings. New York, Huesca, Málaga, or wherever. Full photo+video crew with logistics handled.',
        eyebrow: 'Proposal for your wedding',
        h1: 'Photo + video for your destination wedding',
        intro: 'We’ve shot weddings in New York, Málaga, Huesca, Castellón and Brooklyn. Travelling isn’t the exception; it’s a natural part of our job. We handle it all: hand-luggage kits sized for check-in, full gear backup, and the craft of knowing how to work somewhere we don’t have a base 30 minutes away.',
        deliverables: [
          'Full-day coverage with simultaneous photo + video',
          '700–1,200 edited photos in a private online gallery (3–4 weeks)',
          '25–35 min documentary film (8–10 weeks)',
          'Travel-optimised kit + full gear backup',
          'Drone (weather/legal conditions permitting)',
          'Wedding trailer included',
        ],
        packsLead: 'Travel outside Catalonia is quoted separately. These are the photo + video packs we recommend as a base.',
        closing: 'Tell us the date and the place — we’ll send a proposal with travel within 24h.',
      },
    },
  },
];

export function landingBySlug(slug: string): Landing | undefined {
  return LANDINGS.find((l) => l.slug === slug);
}

/**
 * Map a lead's form values to the right landing slug.
 *
 *  - `location === 'international'` wins over ceremony (destination weddings
 *    get their own landing regardless of civil/religious/symbolic).
 *  - `serviceInterest === 'video'` collapses onto `photo-video` because we
 *    don't sell video-only landings (and the client nearly always wants both
 *    when they pick video). This keeps the 6 landings cover the whole space.
 *  - Anything unrecognised returns `null` — caller should fall back to /packs.
 */
export function slugForLead(
  ceremonyType: string | undefined | null,
  serviceInterest: string | undefined | null,
  location?: string | undefined | null,
): string | null {
  if (location === 'international') return 'boda-destination-foto-video';

  const svc: Service = serviceInterest === 'photo' ? 'photo' : 'photo-video';

  switch (ceremonyType) {
    case 'civil':
      return svc === 'photo' ? 'boda-civil-foto' : 'boda-civil-foto-video';
    case 'religious':
      return svc === 'photo' ? 'boda-religiosa-foto' : 'boda-religiosa-foto-video';
    case 'symbolic':
      return 'boda-simbolica-foto-video';
    default:
      return null;
  }
}
