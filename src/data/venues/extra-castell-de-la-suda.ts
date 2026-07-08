import type { Venue } from '~/data/venues';
import type { VenueLocaleCopy } from '~/data/venues.i18n';

// Castell de la Suda (Parador de Tortosa) — a venue we cover but do
// NOT yet have a real wedding gallery for. Copy describes the space
// (public knowledge) and how we WOULD shoot there. No invented couple.

export const CASTELL_DE_LA_SUDA: { base: Venue; es: VenueLocaleCopy; en: VenueLocaleCopy } = {
  base: {
    slug: 'castell-de-la-suda',
    name: 'Castell de la Suda (Parador de Tortosa)',
    region: "Tortosa · Terres de l'Ebre",
    portfolioIndices: [10, 11, 12, 13, 14, 15],

    // ─── Copy (Catalan) ───────────────────────────────────────────────
    metaTitle: 'Fotografia i vídeo de boda al Castell de la Suda | Lifetime Weddings',
    metaDescription:
      "Fotografia i vídeo de boda al Castell de la Suda, el Parador de Tortosa. Castell medieval sobre l'Ebre. Cobrim les Terres de l'Ebre. Parla amb nosaltres.",
    eyebrow: "Reus · Terres de l'Ebre · foto + vídeo",
    h1: 'Fotografia i vídeo de boda al Castell de la Suda',
    subtitle: `Som l'Eric i en Ferran, dos germans de Reus: un filma, l'altre fotografia. El Castell de la Suda —avui el Parador de Tortosa— és un dels escenaris més espectaculars de les Terres de l'Ebre, i us expliquem amb honestedat com el treballaríem.`,
    realWeddingIntro: `Encara no hem documentat cap boda al Castell de la Suda, i no us farem creure el contrari. El que sí que coneixem és l'espai: un castell d'origen andalusí que corona el nucli antic de Tortosa, amb la pedra medieval, els patis i unes vistes obertes sobre el riu Ebre i la ciutat. La nostra manera de treballar és documental —seguim el dia sense interrompre'l— i aquí tindríem un marc immillorable per fer-ho.`,
    whatItOffersIntro:
      "El Castell de la Suda demana ull i coneixement de la llum. Aquestes són les coses que, com a fotògraf i càmera, no perdríem de vista:",
    whatItOffersBullets: [
      `Les vistes panoràmiques sobre l'Ebre i Tortosa — el fons natural per als retrats de parella, sobretot a l'hora daurada`,
      `El pati de pedra i els jardins, ideals per a una cerimònia amb el castell com a teló de fons`,
      `La pedra medieval i els murs antics, que donen textura i cos al reportatge en blanc i negre`,
      `Les muralles al capvespre, quan el sol es pon sobre el riu — el millor moment del dia per al vídeo`,
      `Les sales històriques del Parador per al banquet — llum càlida, perfecta per filmar sense flaix`,
    ],
    whyChooseIntro: 'Tres motius senzills:',
    whyChoosePoints: [
      `Som dos germans amb dos formats: un fotografia, l'altre filma. Sortiu amb tot el dia documentat en foto i vídeo sense coordinar dos equips externs.`,
      `Cobrim tota la demarcació, i les Terres de l'Ebre entren de ple: Tortosa és a poc més d'una hora de Reus, així que arribar al Castell de la Suda no és cap problema.`,
      `Treballem en clau documental i us lliurem la galeria en aproximadament una setmana, mentre encara teniu el dia fresc al cap.`,
    ],
    faqs: [
      {
        question: 'Cobriu bodes al Castell de la Suda?',
        answer:
          "Sí. És un dels venues de les Terres de l'Ebre que cobrim. Per honestedat: encara no hi hem fotografiat cap boda, però coneixem l'espai i ens encantaria ser-hi.",
      },
      {
        question: 'Feu foto i vídeo alhora?',
        answer:
          "Sí. Som dos germans: en Ferran fa la fotografia i l'Eric el vídeo. Amb un sol equip us emporteu el dia documentat en tots dos formats.",
      },
      {
        question: 'Quant trigueu a lliurar el material?',
        answer:
          "Normalment lliurem la galeria de fotos en aproximadament una setmana. El vídeo triga una mica més segons el muntatge, i us n'anem informant.",
      },
      {
        question: 'Tortosa us queda lluny? Teniu disponibilitat?',
        answer:
          "Gens. Des de Reus, Tortosa és a poc més d'una hora. Escriviu-nos amb la data i us diem la disponibilitat de seguida per WhatsApp.",
      },
    ],
    finalCtaH2: "Us imaginem casant-vos amb l'Ebre als peus",
    finalCtaBody:
      "Si el Castell de la Suda és el vostre lloc, expliqueu-nos-ho. Us diem si tenim la data lliure en menys d'un dia, sense compromís ni formularis llargs — només una conversa per WhatsApp.",
  },

  es: {
    metaTitle: 'Fotografía y vídeo de boda en el Castell de la Suda | Lifetime Weddings',
    metaDescription:
      "Fotografía y vídeo de boda en el Castell de la Suda, el Parador de Tortosa. Castillo medieval sobre el Ebro. Cubrimos las Terres de l'Ebre. Escríbenos.",
    eyebrow: "Reus · Terres de l'Ebre · foto + vídeo",
    h1: 'Fotografía y vídeo de boda en el Castell de la Suda',
    subtitle: `Somos Eric y Ferran, dos hermanos de Reus: uno filma, el otro fotografía. El Castell de la Suda —hoy el Parador de Tortosa— es uno de los escenarios más espectaculares de las Terres de l'Ebre, y os contamos con honestidad cómo lo trabajaríamos.`,
    realWeddingIntro: `Todavía no hemos documentado ninguna boda en el Castell de la Suda, y no vamos a haceros creer lo contrario. Lo que sí conocemos es el espacio: un castillo de origen andalusí que corona el casco antiguo de Tortosa, con la piedra medieval, los patios y unas vistas abiertas sobre el río Ebro y la ciudad. Nuestra forma de trabajar es documental —seguimos el día sin interrumpirlo— y aquí tendríamos un marco inmejorable para hacerlo.`,
    whatItOffersIntro:
      'El Castell de la Suda pide ojo y conocimiento de la luz. Estas son las cosas que, como fotógrafo y cámara, no perderíamos de vista:',
    whatItOffersBullets: [
      `Las vistas panorámicas sobre el Ebro y Tortosa — el fondo natural para los retratos de pareja, sobre todo a la hora dorada`,
      `El patio de piedra y los jardines, ideales para una ceremonia con el castillo como telón de fondo`,
      `La piedra medieval y los muros antiguos, que dan textura y cuerpo al reportaje en blanco y negro`,
      `Las murallas al atardecer, cuando el sol se pone sobre el río — el mejor momento del día para el vídeo`,
      `Las salas históricas del Parador para el banquete — luz cálida, perfecta para filmar sin flash`,
    ],
    whyChooseIntro: 'Tres motivos sencillos:',
    whyChoosePoints: [
      `Somos dos hermanos con dos formatos: uno fotografía, el otro filma. Os vais con el día documentado en foto y vídeo sin coordinar dos equipos externos.`,
      `Cubrimos toda la demarcación, y las Terres de l'Ebre entran de lleno: Tortosa está a poco más de una hora de Reus, así que llegar al Castell de la Suda no es ningún problema.`,
      `Trabajamos en clave documental y os entregamos la galería en aproximadamente una semana, mientras aún tenéis el día fresco.`,
    ],
    faqs: [
      {
        question: '¿Cubrís bodas en el Castell de la Suda?',
        answer:
          "Sí. Es uno de los venues de las Terres de l'Ebre que cubrimos. Por honestidad: aún no hemos fotografiado ninguna boda allí, pero conocemos el espacio y nos encantaría estar.",
      },
      {
        question: '¿Hacéis foto y vídeo a la vez?',
        answer:
          'Sí. Somos dos hermanos: Ferran hace la fotografía y Eric el vídeo. Con un solo equipo os lleváis el día documentado en ambos formatos.',
      },
      {
        question: '¿Cuánto tardáis en entregar el material?',
        answer:
          'Normalmente entregamos la galería de fotos en aproximadamente una semana. El vídeo tarda un poco más según el montaje, y os vamos informando.',
      },
      {
        question: '¿Tortosa os queda lejos? ¿Tenéis disponibilidad?',
        answer:
          'Para nada. Desde Reus, Tortosa está a poco más de una hora. Escribidnos con la fecha y os decimos la disponibilidad enseguida por WhatsApp.',
      },
    ],
    finalCtaH2: 'Os imaginamos casándoos con el Ebro a los pies',
    finalCtaBody:
      'Si el Castell de la Suda es vuestro sitio, contádnoslo. Os decimos si tenemos la fecha libre en menos de un día, sin compromiso ni formularios largos — solo una conversación por WhatsApp.',
  },

  en: {
    metaTitle: 'Wedding photo and video at Castell de la Suda | Lifetime Weddings',
    metaDescription:
      "Wedding photo and video at Castell de la Suda, the Parador de Tortosa — a medieval castle above the Ebre. We cover the Terres de l'Ebre. Message us today.",
    eyebrow: "Reus · Terres de l'Ebre · photo + video",
    h1: 'Wedding photo and video at Castell de la Suda',
    subtitle: `We're Eric and Ferran, two brothers from Reus — one films, the other shoots stills. The Castell de la Suda — today the Parador de Tortosa — is one of the most striking settings in the Terres de l'Ebre, and we'll tell you honestly how we'd shoot there.`,
    realWeddingIntro: `We haven't yet documented a wedding at the Castell de la Suda, and we won't pretend otherwise. What we do know is the space: a castle of Andalusian origin crowning the old town of Tortosa, with medieval stone, courtyards, and wide-open views over the river Ebre and the city. Our approach is documentary — we follow the day without interrupting it — and here we'd have an unbeatable stage for it.`,
    whatItOffersIntro:
      'The Castell de la Suda rewards an eye and a feel for light. These are the things we, as photographer and videographer, would keep in view:',
    whatItOffersBullets: [
      `The panoramic views over the Ebre and Tortosa — the natural backdrop for couple portraits, especially at golden hour`,
      `The stone courtyard and gardens, ideal for a ceremony with the castle as a backdrop`,
      `The medieval stone and old walls, which give texture and body to a black-and-white story`,
      `The ramparts at sunset, as the sun drops over the river — the best moment of the day for video`,
      `The Parador's historic halls for the reception — warm light, perfect for filming without flash`,
    ],
    whyChooseIntro: 'Three simple reasons:',
    whyChoosePoints: [
      `We're two brothers in two formats: one shoots stills, the other films. You leave with the full day in photo and video without coordinating two separate vendors.`,
      `We cover the whole province, and the Terres de l'Ebre very much included: Tortosa is just over an hour from Reus, so reaching the Castell de la Suda is no problem at all.`,
      `We work documentary-style and deliver the gallery in about a week, while the day is still fresh in your mind.`,
    ],
    faqs: [
      {
        question: 'Do you cover weddings at Castell de la Suda?',
        answer:
          "Yes. It's one of the Terres de l'Ebre venues we cover. To be honest: we haven't photographed a wedding there yet, but we know the space and we'd love to shoot it.",
      },
      {
        question: 'Do you do photo and video together?',
        answer:
          'Yes. We are two brothers: Ferran shoots the photography and Eric the video. With a single team you leave with the day documented in both formats.',
      },
      {
        question: 'How long does delivery take?',
        answer:
          'We usually deliver the photo gallery in about a week. The film takes a little longer depending on the edit, and we keep you posted throughout.',
      },
      {
        question: 'Is Tortosa far for you? Do you have availability?',
        answer:
          'Not at all. From Reus, Tortosa is just over an hour away. Send us your date and we\'ll tell you our availability right away over WhatsApp.',
      },
    ],
    finalCtaH2: 'We can picture you marrying with the Ebre at your feet',
    finalCtaBody:
      "If the Castell de la Suda is your place, tell us about it. We'll let you know whether your date is free in under a day — no commitment, no long forms, just a WhatsApp conversation.",
  },
};
