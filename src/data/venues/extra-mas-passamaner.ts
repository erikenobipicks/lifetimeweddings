// Mas Passamaner landing — La Selva del Camp, Baix Camp.
//
// HONESTY NOTE: we cover this venue but do NOT yet have a real wedding
// gallery shot at Mas Passamaner. This copy describes the space (public
// knowledge: an early-20th-century modernist mansion, today a 5-star
// boutique hotel and fine-dining restaurant) and how we WOULD shoot
// there. It never claims a real wedding we photographed on site and
// never invents a couple. Imagery falls back to portfolioIndices with
// neutral alt text.

import type { Venue } from '~/data/venues';
import type { VenueLocaleCopy } from '~/data/venues.i18n';

export const MAS_PASSAMANER: { base: Venue; es: VenueLocaleCopy; en: VenueLocaleCopy } = {
  // ─── Base (Catalan copy + non-copy fields) ────────────────────────
  base: {
    slug: 'mas-passamaner',
    name: 'Mas Passamaner',
    region: 'La Selva del Camp · Baix Camp',
    portfolioIndices: [9, 10, 11, 12, 13, 14, 15],

    metaTitle: 'Fotografia i vídeo de boda a Mas Passamaner | Lifetime Weddings',
    metaDescription:
      'Fotògrafs i càmera de vídeo de boda a Mas Passamaner, la finca modernista de La Selva del Camp. Dos germans, foto i vídeo, a pocs minuts. Parleu-nos.',
    eyebrow: 'La Selva del Camp · Baix Camp · des de 2020',
    h1: 'Fotografia i vídeo de boda a Mas Passamaner',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera de foto i de vídeo. Encara no hi hem documentat cap boda, però coneixem l'espai: la façana modernista, els jardins amb palmeres i la piscina, els salons interiors. Us expliquem, amb honestedat, com el fotografiaríem.",
    realWeddingIntro:
      "Mas Passamaner és una casa senyorial modernista dels anys vint, avui hotel de cinc estrelles i restaurant gastronòmic, envoltada de jardins amb palmeres i una piscina. Encara no hi hem fet cap boda —no us ensenyarem imatges que no siguin nostres—, però l'hem visitat i sabem què hi buscaríem: el detall arquitectònic, la llum del jardí i l'ambient dels salons al vespre.",
    whatItOffersIntro:
      'Mas Passamaner és un espai refinat, i això marca com el treballaríem. Aquests són els punts on posaríem l\'ull des del primer moment:',
    whatItOffersBullets: [
      'La façana modernista i els seus detalls —ceràmica, forja, línies de l\'època— demanen un retrat de parella net, aprofitant l\'ombra suau del matí',
      'Els jardins amb palmeres i gespa, ideals per al còctel i per a les fotos de grup amb llum natural',
      'Els salons interiors per al banquet: sostres alts i llum càlida, perfectes per al vídeo documental sense flaix',
      'La zona de la piscina, un escenari elegant per al còctel i per a plans amplis al capvespre',
      'La millor llum: última hora de la tarda al jardí, quan el sol baix daura la façana i suavitza els retrats',
    ],
    whyChooseIntro: 'Tres motius senzills:',
    whyChoosePoints: [
      'Som dos germans i dos formats: un filma, l\'altre fotografia. Sortiu amb el dia documentat en foto i vídeo sense haver de coordinar dos equips externs.',
      'Som del Baix Camp. Mas Passamaner ens queda a pocs minuts, així que no us cobrem cap desplaçament ni dieta per venir fins aquí.',
      'Treballem en clau documental i us lliurem la galeria en una setmana: res d\'esperar mesos per veure el vostre dia.',
    ],
    faqs: [
      {
        question: 'Cobriu bodes a Mas Passamaner?',
        answer:
          'Sí. És una de les finques que cobrim al Baix Camp. Per ser honestos: encara no hi hem documentat cap boda, però coneixem l\'espai i us expliquem obertament com el fotografiaríem.',
      },
      {
        question: 'Feu foto i vídeo alhora?',
        answer:
          'Sí. Som dos germans: en Ferran fa la fotografia i l\'Eric el vídeo. Amb un sol equip us emporteu el dia documentat en tots dos formats, ben coordinat.',
      },
      {
        question: 'Quan tindríem les fotos?',
        answer:
          'Us lliurem la galeria en aproximadament una setmana. El vídeo documental arriba una mica després, segons el muntatge que acordem.',
      },
      {
        question: 'Teniu la nostra data lliure?',
        answer:
          'Depèn del calendari. Escriviu-nos amb la vostra data i us confirmem la disponibilitat en menys de 24 hores, sense compromís.',
      },
    ],
    finalCtaH2: 'Us imaginem Mas Passamaner ben fotografiat',
    finalCtaBody:
      'Digueu-nos la vostra data i us confirmem disponibilitat en menys d\'un dia. Sense formularis llargs —només una conversa pel WhatsApp per veure com us agradaria explicar el vostre dia.',
  },

  // ─── ES (peninsular Spanish) ──────────────────────────────────────
  es: {
    metaTitle: 'Fotografía y vídeo de boda en Mas Passamaner | Lifetime Weddings',
    metaDescription:
      'Fotógrafos y cámara de vídeo de boda en Mas Passamaner, la finca modernista de La Selva del Camp. Dos hermanos, foto y vídeo, a pocos minutos.',
    eyebrow: 'La Selva del Camp · Baix Camp · desde 2020',
    h1: 'Fotografía y vídeo de boda en Mas Passamaner',
    subtitle:
      'Somos Eric y Ferran, dos hermanos con cámara de foto y de vídeo. Todavía no hemos documentado ninguna boda allí, pero conocemos el espacio: la fachada modernista, los jardines con palmeras y la piscina, los salones interiores. Os contamos, con honestidad, cómo lo fotografiaríamos.',
    realWeddingIntro:
      'Mas Passamaner es una casa señorial modernista de los años veinte, hoy hotel de cinco estrellas y restaurante gastronómico, rodeada de jardines con palmeras y una piscina. Todavía no hemos hecho ninguna boda aquí —no os enseñaremos imágenes que no sean nuestras—, pero lo hemos visitado y sabemos qué buscaríamos: el detalle arquitectónico, la luz del jardín y el ambiente de los salones al anochecer.',
    whatItOffersIntro:
      'Mas Passamaner es un espacio refinado, y eso marca cómo lo trabajaríamos. Estos son los puntos donde pondríamos el ojo desde el primer momento:',
    whatItOffersBullets: [
      'La fachada modernista y sus detalles —cerámica, forja, líneas de época— piden un retrato de pareja limpio, aprovechando la sombra suave de la mañana',
      'Los jardines con palmeras y césped, ideales para el cóctel y para las fotos de grupo con luz natural',
      'Los salones interiores para el banquete: techos altos y luz cálida, perfectos para el vídeo documental sin flash',
      'La zona de la piscina, un escenario elegante para el cóctel y para planos amplios al atardecer',
      'La mejor luz: última hora de la tarde en el jardín, cuando el sol bajo dora la fachada y suaviza los retratos',
    ],
    whyChooseIntro: 'Tres motivos sencillos:',
    whyChoosePoints: [
      'Somos dos hermanos y dos formatos: uno filma, el otro fotografía. Os vais con el día documentado en foto y vídeo sin tener que coordinar dos equipos externos.',
      'Somos del Baix Camp. Mas Passamaner nos queda a pocos minutos, así que no os cobramos desplazamiento ni dietas por venir hasta aquí.',
      'Trabajamos en clave documental y os entregamos la galería en una semana: nada de esperar meses para ver vuestro día.',
    ],
    faqs: [
      {
        question: '¿Cubrís bodas en Mas Passamaner?',
        answer:
          'Sí. Es una de las fincas que cubrimos en el Baix Camp. Para ser honestos: todavía no hemos documentado ninguna boda allí, pero conocemos el espacio y os contamos abiertamente cómo lo fotografiaríamos.',
      },
      {
        question: '¿Hacéis foto y vídeo a la vez?',
        answer:
          'Sí. Somos dos hermanos: Ferran hace la fotografía y Eric el vídeo. Con un solo equipo os lleváis el día documentado en ambos formatos, bien coordinado.',
      },
      {
        question: '¿Cuándo tendríamos las fotos?',
        answer:
          'Os entregamos la galería en aproximadamente una semana. El vídeo documental llega algo después, según el montaje que acordemos.',
      },
      {
        question: '¿Tenéis nuestra fecha libre?',
        answer:
          'Depende del calendario. Escribidnos con vuestra fecha y os confirmamos la disponibilidad en menos de 24 horas, sin compromiso.',
      },
    ],
    finalCtaH2: 'Os imaginamos Mas Passamaner bien fotografiado',
    finalCtaBody:
      'Decidnos vuestra fecha y os confirmamos disponibilidad en menos de un día. Sin formularios largos —solo una conversación por WhatsApp para ver cómo os gustaría contar vuestro día.',
  },

  // ─── EN (editorial) ───────────────────────────────────────────────
  en: {
    metaTitle: 'Wedding photo and video at Mas Passamaner | Lifetime Weddings',
    metaDescription:
      'Wedding photographers and videographers at Mas Passamaner, the modernist estate in La Selva del Camp. Two brothers, photo and video, minutes away.',
    eyebrow: 'La Selva del Camp · Baix Camp · since 2020',
    h1: 'Wedding photo and video at Mas Passamaner',
    subtitle:
      "We're Eric and Ferran, two brothers — one shooting photo, the other video. We haven't documented a wedding here yet, but we know the space: the modernist façade, the palm-lined gardens and pool, the interior salons. Here's an honest look at how we'd shoot it.",
    realWeddingIntro:
      "Mas Passamaner is a modernist country mansion from the 1920s, today a five-star boutique hotel and fine-dining restaurant, set in landscaped gardens with palm trees and a pool. We haven't shot a wedding here yet — we won't show you images that aren't ours — but we've visited, and we know what we'd look for: the architectural detail, the garden light, and the evening mood of the salons.",
    whatItOffersIntro:
      "Mas Passamaner is a refined space, and that shapes how we'd work it. These are the spots we'd have our eye on from the start:",
    whatItOffersBullets: [
      'The modernist façade and its details — tilework, ironwork, period lines — call for a clean couple portrait in the soft morning shade',
      'The palm-lined lawns and gardens, ideal for the cocktail hour and natural-light group shots',
      'The interior salons for the banquet: high ceilings and warm light, perfect for flash-free documentary video',
      'The pool area, an elegant setting for the cocktail and for wide frames at dusk',
      'The best light: late afternoon in the garden, when the low sun gilds the façade and softens every portrait',
    ],
    whyChooseIntro: 'Three simple reasons:',
    whyChoosePoints: [
      "We're two brothers in two formats — one films, the other shoots stills. You leave with the full day in photo and video, no need to coordinate two separate vendors.",
      "We're based in the Baix Camp. Mas Passamaner is minutes away, so there's no travel or per-diem surcharge for coming out here.",
      "We work documentary-style and deliver the gallery within a week — no waiting months to see your day.",
    ],
    faqs: [
      {
        question: 'Do you cover weddings at Mas Passamaner?',
        answer:
          "Yes. It's one of the estates we cover in the Baix Camp. To be honest: we haven't documented a wedding there yet, but we know the space and we'll tell you openly how we'd photograph it.",
      },
      {
        question: 'Do you shoot photo and video together?',
        answer:
          'Yes. We\'re two brothers: Ferran shoots the photography and Eric the video. With a single team you get the day documented in both formats, fully coordinated.',
      },
      {
        question: 'When would we get the photos?',
        answer:
          'We deliver the gallery in about a week. The documentary video follows a little later, depending on the edit we agree on.',
      },
      {
        question: 'Is our date free?',
        answer:
          'It depends on the calendar. Send us your date and we\'ll confirm availability within 24 hours, no obligation.',
      },
    ],
    finalCtaH2: 'We can already picture Mas Passamaner beautifully shot',
    finalCtaBody:
      "Tell us your date and we'll confirm availability within a day. No long forms — just a WhatsApp conversation to talk through how you'd like your day told.",
  },
};
