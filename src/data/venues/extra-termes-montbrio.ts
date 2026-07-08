// Termes de Montbrió — venue landing copy.
//
// HONESTY NOTE: we cover this venue (it's minutes from Reus, in our home
// Baix Camp), but we do NOT yet have a real wedding gallery shot there.
// All copy describes the space from public knowledge and how we WOULD
// shoot it. No invented couple, no faked "a wedding we shot here".
//
// Portfolio imagery falls back to PHOTOS['generic'] via portfolioIndices,
// with neutral, honest alt text — never presented as a real wedding at
// Termes de Montbrió.

import type { Venue } from '~/data/venues';
import type { VenueLocaleCopy } from '~/data/venues.i18n';

export const TERMES_MONTBRIO: { base: Venue; es: VenueLocaleCopy; en: VenueLocaleCopy } = {
  // ─── Base (Catalan, primary voice) ─────────────────────────────────
  base: {
    slug: 'termes-montbrio',
    name: 'Termes de Montbrió',
    region: 'Montbrió del Camp · Baix Camp',
    portfolioIndices: [25, 26, 27, 28, 29, 30, 31],

    metaTitle: 'Fotògrafs de boda a Termes de Montbrió | Lifetime Weddings',
    metaDescription:
      'Fotografia i vídeo documental de boda a Termes de Montbrió, Baix Camp. Cobrim aquest resort a pocs minuts de Reus. Parleu-nos pel WhatsApp.',
    eyebrow: 'Montbrió del Camp · Baix Camp · des de 2020',
    h1: 'Fotografia i vídeo de boda a Termes de Montbrió',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera de foto i de vídeo, de Reus. Termes de Montbrió és aquí al costat, al nostre Baix Camp: un resort balneari amb un jardí botànic centenari que és un dels espais més fotogènics de la comarca. Us expliquem com el treballaríem.",
    realWeddingIntro: `Siguem honestos: encara no hem publicat una boda rodada a Termes de Montbrió, i no us inventarem cap parella per omplir aquesta pàgina. El que sí que us podem dir és que coneixem l'espai —el jardí botànic de la Torre dels Marmessors, amb les seves palmeres, els estanys i les espècies rares, els salons interiors del balneari— i que és a pocs minuts de casa. Aquí hi ha una honestedat que preferim: us mostrem com hi treballaríem, no un muntatge que no és nostre.`,
    whatItOffersIntro:
      'Termes de Montbrió és un resort balneari construït al voltant de les termes del segle XIX, i el seu gran actiu per a un fotògraf és el parc botànic centenari. Aquests són els punts que aprofitaríem:',
    whatItOffersBullets: [
      'El jardí botànic de la Torre dels Marmessors — palmeres altes, vegetació densa i espècies rares donen un fons exuberant per a la cerimònia i els retrats, difícil de trobar en un altre venue de la zona',
      'Els estanys i les zones d\'aigua — reflexos i profunditat per a composicions que respiren, especialment bones per al vídeo en moviment lent',
      'Els espais amplis del recinte — hi ha metres de sobres per a les fotos de grup i les famílies senceres sense amuntegar ningú, ideal per a bodes grans',
      "Els salons interiors del balneari — sostres alts i il·luminació càlida per al banquet i el ball, perfectes per al reportatge documental sense flash agressiu",
      'La llum del capvespre entre les palmeres — l\'hora daurada filtrada per la vegetació del parc és el moment que buscaríem per als retrats de parella',
    ],
    whyChooseIntro: 'Tres motius:',
    whyChoosePoints: [
      "Som dos germans amb dos formats en un sol equip. Un filma, l'altre fotografia. Sortireu amb tot el dia documentat en foto i vídeo, sense haver de coordinar dos proveïdors externs que no s'han vist mai.",
      'Som del Baix Camp. Montbrió del Camp és a pocs minuts de Reus, dins la nostra zona de cobertura habitual — sense recàrrec de desplaçament i amb temps de sobres per no anar amb pressa.',
      'Treballem en clau documental i entreguem ràpid: la galeria completa en una setmana aproximadament, perquè no hàgiu d\'esperar mesos per reviure el vostre dia.',
    ],
    faqs: [
      {
        question: 'Cobriu Termes de Montbrió?',
        answer:
          "Sí. És a pocs minuts de Reus, dins la nostra zona habitual al Baix Camp, sense recàrrec de desplaçament. Per honestedat: encara no hi hem rodat cap boda que puguem ensenyar, però coneixem bé l'espai i el treballaríem amb molt de gust.",
      },
      {
        question: 'Feu foto i vídeo alhora?',
        answer:
          "Sí. Som dos germans: un fotografia i l'altre filma, com un sol equip. Sortireu amb el reportatge de foto i el vídeo del mateix dia, sense contractar dos proveïdors per separat ni jugar-vos que no es coordinin.",
      },
      {
        question: 'Quant trigueu a entregar les fotos i el vídeo?',
        answer:
          "La galeria de fotos us l'entreguem en una setmana aproximadament. El vídeo va una mica després segons el muntatge, però la idea és que no hàgiu d'esperar mesos per reviure el vostre dia.",
      },
      {
        question: 'Termes de Montbrió és gran — teniu disponibilitat i cobriu bodes grans?',
        answer:
          "Sí. El recinte té espai per a bodes grans i nosaltres estem acostumats a documentar-les sense perdre'ns cap moment. La disponibilitat depèn de la data: escriviu-nos aviat pel WhatsApp i us diem si la tenim lliure en menys d'un dia.",
      },
    ],
    finalCtaH2: 'Us agradaria casar-vos a Termes de Montbrió?',
    finalCtaBody:
      "Escriviu-nos i mirem si tenim la vostra data lliure. Som del Baix Camp, a pocs minuts del resort. Resposta en menys d'un dia, sense compromís ni formularis llargs — només una conversa per WhatsApp.",
  },

  // ─── Español (peninsular) ──────────────────────────────────────────
  es: {
    metaTitle: 'Fotógrafos de boda en Termes de Montbrió | Lifetime Weddings',
    metaDescription:
      'Fotografía y vídeo documental de boda en Termes de Montbrió, Baix Camp. Cubrimos este resort a pocos minutos de Reus. Háblanos por WhatsApp.',
    eyebrow: 'Montbrió del Camp · Baix Camp · desde 2020',
    h1: 'Fotografía y vídeo de boda en Termes de Montbrió',
    subtitle:
      'Somos Eric y Ferran, dos hermanos con cámara de foto y de vídeo, de Reus. Termes de Montbrió está aquí al lado, en nuestro Baix Camp: un resort balneario con un jardín botánico centenario que es uno de los espacios más fotogénicos de la comarca. Te contamos cómo lo trabajaríamos.',
    realWeddingIntro: `Seamos honestos: todavía no hemos publicado una boda rodada en Termes de Montbrió, y no vamos a inventarnos ninguna pareja para rellenar esta página. Lo que sí podemos decirte es que conocemos el espacio —el jardín botánico de la Torre dels Marmessors, con sus palmeras, los estanques y las especies raras, los salones interiores del balneario— y que está a pocos minutos de casa. Hay una honestidad que preferimos: te enseñamos cómo trabajaríamos allí, no un montaje que no es nuestro.`,
    whatItOffersIntro:
      'Termes de Montbrió es un resort balneario construido alrededor de las termas del siglo XIX, y su gran baza para un fotógrafo es el parque botánico centenario. Estos son los puntos que aprovecharíamos:',
    whatItOffersBullets: [
      'El jardín botánico de la Torre dels Marmessors — palmeras altas, vegetación densa y especies raras dan un fondo exuberante para la ceremonia y los retratos, difícil de encontrar en otro venue de la zona',
      'Los estanques y las zonas de agua — reflejos y profundidad para composiciones que respiran, especialmente buenas para el vídeo a cámara lenta',
      'Los espacios amplios del recinto — hay metros de sobra para las fotos de grupo y las familias enteras sin amontonar a nadie, ideal para bodas grandes',
      'Los salones interiores del balneario — techos altos e iluminación cálida para el banquete y el baile, perfectos para el reportaje documental sin flash agresivo',
      'La luz del atardecer entre las palmeras — la hora dorada filtrada por la vegetación del parque es el momento que buscaríamos para los retratos de pareja',
    ],
    whyChooseIntro: 'Tres motivos:',
    whyChoosePoints: [
      'Somos dos hermanos con dos formatos en un solo equipo. Uno filma, el otro fotografía. Saldréis con todo el día documentado en foto y vídeo, sin tener que coordinar dos proveedores externos que no se han visto nunca.',
      'Somos del Baix Camp. Montbrió del Camp está a pocos minutos de Reus, dentro de nuestra zona de cobertura habitual — sin recargo de desplazamiento y con tiempo de sobra para no ir con prisas.',
      'Trabajamos en clave documental y entregamos rápido: la galería completa en una semana aproximadamente, para que no tengáis que esperar meses para revivir vuestro día.',
    ],
    faqs: [
      {
        question: '¿Cubrís Termes de Montbrió?',
        answer:
          'Sí. Está a pocos minutos de Reus, dentro de nuestra zona habitual en el Baix Camp, sin recargo de desplazamiento. Por honestidad: todavía no hemos rodado allí ninguna boda que podamos enseñarte, pero conocemos bien el espacio y lo trabajaríamos con muchas ganas.',
      },
      {
        question: '¿Hacéis foto y vídeo a la vez?',
        answer:
          'Sí. Somos dos hermanos: uno fotografía y el otro filma, como un solo equipo. Saldréis con el reportaje de foto y el vídeo del mismo día, sin contratar a dos proveedores por separado ni arriesgaros a que no se coordinen.',
      },
      {
        question: '¿Cuánto tardáis en entregar las fotos y el vídeo?',
        answer:
          'La galería de fotos os la entregamos en una semana aproximadamente. El vídeo va un poco después según el montaje, pero la idea es que no tengáis que esperar meses para revivir vuestro día.',
      },
      {
        question: 'Termes de Montbrió es grande — ¿tenéis disponibilidad y cubrís bodas grandes?',
        answer:
          'Sí. El recinto tiene espacio para bodas grandes y estamos acostumbrados a documentarlas sin perdernos ningún momento. La disponibilidad depende de la fecha: escribidnos pronto por WhatsApp y os decimos si la tenemos libre en menos de un día.',
      },
    ],
    finalCtaH2: '¿Os gustaría casaros en Termes de Montbrió?',
    finalCtaBody:
      'Escribidnos y miramos si tenemos vuestra fecha libre. Somos del Baix Camp, a pocos minutos del resort. Respuesta en menos de un día, sin compromiso ni formularios largos — solo una conversación por WhatsApp.',
  },

  // ─── English (editorial) ───────────────────────────────────────────
  en: {
    metaTitle: 'Wedding photographers at Termes de Montbrió | Lifetime Weddings',
    metaDescription:
      'Documentary photo + video coverage at Termes de Montbrió, Baix Camp. We cover this resort minutes from Reus. Message us on WhatsApp.',
    eyebrow: 'Montbrió del Camp · Baix Camp · since 2020',
    h1: 'Wedding photo and video at Termes de Montbrió',
    subtitle:
      "We're Eric and Ferran, two brothers shooting photo and video, based in Reus. Termes de Montbrió is right next door, in our home Baix Camp: a spa resort built around a century-old botanical garden that ranks among the most photogenic spaces in the county. Here's how we'd shoot it.",
    realWeddingIntro: `Let's be honest: we haven't yet published a wedding shot at Termes de Montbrió, and we won't invent a couple to fill this page. What we can tell you is that we know the space — the Torre dels Marmessors botanical garden, with its palms, ponds, and rare species, and the resort's indoor salons — and it's minutes from home. We prefer that kind of honesty: we'll show you how we'd work there, not a mock-up that isn't ours.`,
    whatItOffersIntro:
      'Termes de Montbrió is a spa resort built around 19th-century thermal baths, and its greatest asset for a photographer is the century-old botanical garden. These are the points we would work:',
    whatItOffersBullets: [
      'The Torre dels Marmessors botanical garden — tall palms, dense greenery, and rare species give a lush backdrop for the ceremony and portraits, hard to find at any other venue nearby',
      'The ponds and water features — reflections and depth for compositions that breathe, especially good for slow-motion video',
      'The spacious grounds — there is room to spare for group shots and whole families without crowding anyone, ideal for larger weddings',
      "The indoor salons — high ceilings and warm light for the reception and dance, perfect for flash-free documentary coverage",
      'The evening light through the palms — golden hour filtered by the garden canopy is the window we would chase for couple portraits',
    ],
    whyChooseIntro: 'Three reasons:',
    whyChoosePoints: [
      "We're two brothers in two formats, one team. One films, the other shoots stills. You leave with the whole day in photo and video, no need to coordinate two separate vendors who've never met.",
      "We're from the Baix Camp. Montbrió del Camp is minutes from Reus, inside our usual coverage zone — no travel surcharge, and plenty of time so nothing feels rushed.",
      'We shoot documentary and deliver fast: the full gallery in about a week, so you never wait months to relive your day.',
    ],
    faqs: [
      {
        question: 'Do you cover Termes de Montbrió?',
        answer:
          "Yes. It's minutes from Reus, inside our usual Baix Camp zone, with no travel surcharge. In the interest of honesty: we haven't yet shot a wedding there that we can show you, but we know the space well and would love to work it.",
      },
      {
        question: 'Do you shoot photo and video together?',
        answer:
          "Yes. We're two brothers: one shoots stills, the other films, as a single team. You leave with the photo gallery and the video from the same day, without booking two separate vendors or risking that they don't coordinate.",
      },
      {
        question: 'How long does delivery take for the photos and video?',
        answer:
          "We deliver the photo gallery in about a week. The video follows a little later depending on the edit, but the idea is that you never wait months to relive your day.",
      },
      {
        question: 'Termes de Montbrió is large — do you have availability and cover big weddings?',
        answer:
          "Yes. The grounds fit large weddings and we're used to documenting them without missing a moment. Availability depends on the date: message us early on WhatsApp and we'll tell you whether it's free within a day.",
      },
    ],
    finalCtaH2: 'Thinking of getting married at Termes de Montbrió?',
    finalCtaBody:
      "Message us and we'll check if your date is still open. We're from the Baix Camp, minutes from the resort. Reply within a day, no commitment, no long forms — just a WhatsApp conversation.",
  },
};
