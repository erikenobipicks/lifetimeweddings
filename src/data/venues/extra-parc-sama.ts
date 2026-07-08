// Parc Samà landing — a venue we cover on the Costa Daurada but for
// which we do NOT yet have a real wedding gallery. All copy describes
// the SPACE (public knowledge) and how we would photograph and film a
// wedding there. No invented couples, no faked "a real wedding we shot
// here". When we shoot a real wedding at Parc Samà, swap the honest
// framing for a `realWeddingSlug` + couple, like the other venues.

import type { Venue } from '~/data/venues';
import type { VenueLocaleCopy } from '~/data/venues.i18n';

export const PARC_SAMA: { base: Venue; es: VenueLocaleCopy; en: VenueLocaleCopy } = {
  base: {
    slug: 'parc-sama',
    name: 'Parc Samà',
    region: 'Cambrils · Costa Daurada',
    portfolioIndices: [17, 18, 19, 20, 21, 22, 23],

    // ─── Copy (Catalan) ─────────────────────────────────────────────
    metaTitle: 'Fotografia i vídeo a Parc Samà | Lifetime Weddings',
    metaDescription:
      "Fotografia i vídeo de boda a Parc Samà, el jardí històric de Cambrils, a la Costa Daurada. Cobrim la zona sense recàrrec. Parleu-nos pel WhatsApp.",
    eyebrow: 'Cambrils · Costa Daurada · des de 2020',
    h1: 'Fotografia i vídeo de boda a Parc Samà',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera de foto i de vídeo, de Reus i amb tota la Costa Daurada a mitja hora. Parc Samà és un dels jardins històrics més espectaculars on es pot casar una parella a la zona, i ens encantaria documentar-hi una boda com la sabem fer: sense pressa, mirant la llum entre les palmeres.",
    realWeddingIntro:
      "Encara no hem fotografiat cap boda a Parc Samà, i preferim dir-ho clar. El que sí coneixem és l'espai: el llac central, la torre neomedieval, les avingudes de palmeres i la llum verda que es filtra entre els arbres tropicals. Quan una parella ens hi porti, treballarem el jardí com el que és — un escenari romàntic del segle XIX pensat per emocionar.",
    whatItOffersIntro:
      "Parc Samà és un jardí històric protegit creat pel Marquès de Marianao, inspirat en els jardins colonials que va conèixer a Cuba. Per a un fotògraf i un càmera, això vol dir un catàleg de racons difícil d'igualar a la Costa Daurada:",
    whatItOffersBullets: [
      "El llac central i els seus reflexos — un dels pocs venues de la zona on pots situar la parella sobre l'aigua amb la vegetació duplicada al mirall",
      "La torre neomedieval i el palauet com a teló de fons — arquitectura amb caràcter que dóna profunditat als retrats sense moure els convidats",
      "Les avingudes de palmeres i els arbres tropicals filtren una llum verda i suau al migdia — perfecta per als retrats sense flaix i per al vídeo documental",
      "La cerimònia a l'aire lliure entre els jardins, amb l'aigua i la gruta a prop — un dels marcs més cinematogràfics per a un casament civil",
      "L'hora daurada entre els arbres, quan el sol baix travessa les palmeres — el millor moment per als retrats de parella i per als plans de vídeo més emotius",
    ],
    whyChooseIntro: 'Tres motius:',
    whyChoosePoints: [
      "Som dos germans amb dos formats. Un de nosaltres filma, l'altre fotografia. Sortireu amb tot el dia documentat en foto i vídeo, amb una sola mirada i un sol equip, sense coordinar dos proveïdors externs.",
      "Som de la Costa Daurada. Cambrils i Parc Samà entren dins la nostra zona de cobertura habitual des de Reus — sense recàrrec de desplaçament i amb temps de sobres per dedicar-lo al vostre dia.",
      "Treballem en clau documental i entreguem ràpid. Us deixem viure la boda, intervenim el mínim, i la galeria fotogràfica us arriba en aproximadament una setmana.",
    ],
    faqs: [
      {
        question: 'Cobriu bodes a Parc Samà?',
        answer:
          "Sí. Parc Samà, a Cambrils, entra dins la nostra zona habitual de cobertura a la Costa Daurada des de Reus, sense recàrrec de desplaçament. Ens encantaria documentar-hi una boda.",
      },
      {
        question: 'Feu foto i vídeo alhora?',
        answer:
          "Sí, i és el que ens fa diferents. Som dos germans: un filma i l'altre fotografia, coordinats tot el dia. Sortireu amb reportatge de foto i amb vídeo, sense haver de contractar ni encaixar dos equips separats.",
      },
      {
        question: 'Quan rebem les fotos després de la boda?',
        answer:
          "La galeria fotogràfica completa us arriba en aproximadament una setmana. El vídeo demana una mica més d'edició, però us avancem sempre alguna imatge els primers dies.",
      },
      {
        question: 'Ja heu fotografiat alguna boda a Parc Samà?',
        answer:
          "Encara no, i preferim ser honestos. Coneixem bé l'espai — el llac, la torre, les palmeres i la llum a cada hora — i adaptem la nostra manera de treballar a cada jardí. Si voleu, quan parlem us expliquem exactament com plantejaríem el vostre dia allà. Escriviu-nos per saber si tenim la vostra data lliure.",
      },
    ],
    finalCtaH2: 'La vostra boda a Parc Samà, documentada com es mereix',
    finalCtaBody:
      "Mireu si tenim la vostra data lliure. Resposta en menys d'un dia. Sense compromís, sense formularis llargs — només una conversa per WhatsApp.",
  },

  es: {
    metaTitle: 'Fotografía y vídeo en Parc Samà | Lifetime Weddings',
    metaDescription:
      'Fotografía y vídeo de boda en Parc Samà, el jardín histórico de Cambrils, en la Costa Daurada. Cubrimos la zona sin recargo. Háblanos por WhatsApp.',
    eyebrow: 'Cambrils · Costa Daurada · desde 2020',
    h1: 'Fotografía y vídeo de boda en Parc Samà',
    subtitle:
      'Somos Eric y Ferran, dos hermanos con cámara de foto y de vídeo, de Reus y con toda la Costa Daurada a media hora. Parc Samà es uno de los jardines históricos más espectaculares donde puede casarse una pareja en la zona, y nos encantaría documentar allí una boda como sabemos hacerlo: sin prisas, mirando la luz entre las palmeras.',
    realWeddingIntro:
      'Todavía no hemos fotografiado ninguna boda en Parc Samà, y preferimos decirlo claro. Lo que sí conocemos es el espacio: el lago central, la torre neomedieval, las avenidas de palmeras y la luz verde que se filtra entre los árboles tropicales. Cuando una pareja nos lleve allí, trabajaremos el jardín como lo que es — un escenario romántico del siglo XIX pensado para emocionar.',
    whatItOffersIntro:
      'Parc Samà es un jardín histórico protegido creado por el Marqués de Marianao, inspirado en los jardines coloniales que conoció en Cuba. Para un fotógrafo y un cámara, eso significa un catálogo de rincones difícil de igualar en la Costa Daurada:',
    whatItOffersBullets: [
      'El lago central y sus reflejos — uno de los pocos venues de la zona donde puedes situar a la pareja sobre el agua con la vegetación duplicada en el espejo',
      'La torre neomedieval y el palacete como fondo — arquitectura con carácter que da profundidad a los retratos sin mover a los invitados',
      'Las avenidas de palmeras y los árboles tropicales filtran una luz verde y suave al mediodía — perfecta para los retratos sin flash y para el vídeo documental',
      'La ceremonia al aire libre entre los jardines, con el agua y la gruta cerca — uno de los marcos más cinematográficos para un enlace civil',
      'La hora dorada entre los árboles, cuando el sol bajo atraviesa las palmeras — el mejor momento para los retratos de pareja y para los planos de vídeo más emotivos',
    ],
    whyChooseIntro: 'Tres motivos:',
    whyChoosePoints: [
      'Somos dos hermanos con dos formatos. Uno filma, el otro fotografía. Saldréis con todo el día documentado en foto y vídeo, con una sola mirada y un solo equipo, sin coordinar dos proveedores externos.',
      'Somos de la Costa Daurada. Cambrils y Parc Samà entran dentro de nuestra zona de cobertura habitual desde Reus — sin recargo de desplazamiento y con tiempo de sobra para dedicarlo a vuestro día.',
      'Trabajamos en clave documental y entregamos rápido. Os dejamos vivir la boda, intervenimos lo mínimo, y la galería fotográfica os llega en aproximadamente una semana.',
    ],
    faqs: [
      {
        question: '¿Cubrís bodas en Parc Samà?',
        answer:
          'Sí. Parc Samà, en Cambrils, entra dentro de nuestra zona habitual de cobertura en la Costa Daurada desde Reus, sin recargo de desplazamiento. Nos encantaría documentar allí una boda.',
      },
      {
        question: '¿Hacéis foto y vídeo a la vez?',
        answer:
          'Sí, y es lo que nos hace diferentes. Somos dos hermanos: uno filma y el otro fotografía, coordinados todo el día. Saldréis con reportaje de foto y con vídeo, sin tener que contratar ni encajar dos equipos separados.',
      },
      {
        question: '¿Cuándo recibimos las fotos después de la boda?',
        answer:
          'La galería fotográfica completa os llega en aproximadamente una semana. El vídeo pide algo más de edición, pero siempre os adelantamos alguna imagen los primeros días.',
      },
      {
        question: '¿Ya habéis fotografiado alguna boda en Parc Samà?',
        answer:
          'Todavía no, y preferimos ser honestos. Conocemos bien el espacio — el lago, la torre, las palmeras y la luz a cada hora — y adaptamos nuestra manera de trabajar a cada jardín. Si queréis, cuando hablemos os explicamos exactamente cómo plantearíamos vuestro día allí. Escribidnos para saber si tenemos vuestra fecha libre.',
      },
    ],
    finalCtaH2: 'Vuestra boda en Parc Samà, documentada como se merece',
    finalCtaBody:
      'Mira si tenemos vuestra fecha libre. Respuesta en menos de un día. Sin compromiso, sin formularios largos — solo una conversación por WhatsApp.',
  },

  en: {
    metaTitle: 'Wedding photo and video at Parc Samà | Lifetime',
    metaDescription:
      'Documentary photo and video for weddings at Parc Samà, the historic garden in Cambrils on the Costa Daurada. We cover the area with no travel fee.',
    eyebrow: 'Cambrils · Costa Daurada · since 2020',
    h1: 'Wedding photo and video at Parc Samà',
    subtitle:
      "We're Eric and Ferran, two brothers shooting photo and video, based in Reus with the whole Costa Daurada half an hour away. Parc Samà is one of the most spectacular historic gardens a couple can marry in around here, and we'd love to document a wedding there the way we know how: unhurried, reading the light between the palms.",
    realWeddingIntro:
      "We haven't yet photographed a wedding at Parc Samà, and we'd rather say so plainly. What we do know is the space: the central lake, the neo-medieval tower, the palm avenues, and the green light that filters through the tropical trees. When a couple brings us here, we'll work the garden for what it is — a romantic 19th-century stage built to move people.",
    whatItOffersIntro:
      'Parc Samà is a protected historic garden created by the Marquis of Marianao, inspired by the colonial gardens he knew in Cuba. For a photographer and a filmmaker, that means a catalogue of settings hard to match on the Costa Daurada:',
    whatItOffersBullets: [
      'The central lake and its reflections — one of the few venues in the area where you can place a couple over water with the greenery mirrored back',
      'The neo-medieval tower and the little palace as a backdrop — architecture with character that adds depth to portraits without moving the guests',
      'The palm avenues and tropical trees filter a soft green light at midday — perfect for flash-free portraits and for documentary video',
      'An outdoor ceremony among the gardens, with the water and the cave nearby — one of the most cinematic frames for a civil wedding',
      'Golden hour through the trees, when the low sun cuts across the palms — the best window for couple portraits and for the most emotive video shots',
    ],
    whyChooseIntro: 'Three reasons:',
    whyChoosePoints: [
      "We're two brothers in two formats. One films, the other shoots stills. You leave with the whole day documented in photo and video, one eye and one team, no coordinating two separate vendors.",
      "We're local to the Costa Daurada. Cambrils and Parc Samà fall within our usual coverage zone from Reus — no travel surcharge and plenty of time to dedicate to your day.",
      "We shoot documentary and we deliver fast. We let you live the wedding, keep our intervention minimal, and your photo gallery reaches you in about a week.",
    ],
    faqs: [
      {
        question: 'Do you cover weddings at Parc Samà?',
        answer:
          "Yes. Parc Samà, in Cambrils, sits within our usual coverage zone on the Costa Daurada from Reus, with no travel surcharge. We'd love to document a wedding there.",
      },
      {
        question: 'Do you shoot photo and video together?',
        answer:
          "Yes, and it's what sets us apart. We're two brothers: one films, the other shoots stills, coordinated all day. You leave with both a photo gallery and video, without hiring or fitting together two separate teams.",
      },
      {
        question: 'When do we get the photos after the wedding?',
        answer:
          'The full photo gallery reaches you in about a week. Video takes a little more editing, but we always send you a few images in the first few days.',
      },
      {
        question: 'Have you already shot a wedding at Parc Samà?',
        answer:
          "Not yet, and we'd rather be honest about it. We know the space well — the lake, the tower, the palms, and the light at every hour — and we adapt the way we work to each garden. When we talk, we're happy to walk you through exactly how we'd approach your day there. Message us to check if your date is free.",
      },
    ],
    finalCtaH2: 'Your Parc Samà wedding, documented as it deserves',
    finalCtaBody:
      'Check if your date is still open. Reply within a day. No commitment, no long forms — just a WhatsApp conversation.',
  },
};
