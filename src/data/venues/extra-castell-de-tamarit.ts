// Castell de Tamarit — venue landing copy.
//
// HONESTY NOTE: we cover this venue but do NOT yet have a real wedding
// gallery shot inside the castle. All copy describes the space (public
// knowledge) and how we WOULD shoot a wedding there — no invented
// couples, no faked "real wedding here". This is why `base` uses
// `portfolioIndices` (neutral placeholder imagery) instead of
// `realWeddingSlug`, and the FAQs never claim past work at the venue.
//
// Shape mirrors the entries in src/data/venues.ts (CA base) and
// src/data/venues.i18n.ts (es + en). Register the base object in VENUES
// and the { es, en } block in VENUES_I18N when wiring this venue up.

import type { Venue } from '~/data/venues';
import type { VenueLocaleCopy } from '~/data/venues.i18n';

export const CASTELL_DE_TAMARIT: { base: Venue; es: VenueLocaleCopy; en: VenueLocaleCopy } = {
  // ─── Base (Catalan) ────────────────────────────────────────────────
  base: {
    slug: 'castell-de-tamarit',
    name: 'Castell de Tamarit',
    region: 'Tarragona · Costa Daurada',
    portfolioIndices: [1, 2, 3, 4, 5, 6, 7],

    metaTitle: 'Fotografia i vídeo de boda al Castell de Tamarit | Lifetime Weddings',
    metaDescription:
      'Fotografia i vídeo de boda al Castell de Tamarit, un castell medieval sobre el mar a la Costa Daurada. Coneixem la llum del lloc. Parleu-nos pel WhatsApp.',
    eyebrow: 'Reus · Costa Daurada · des de 2020',
    h1: 'Fotografia i vídeo de boda al Castell de Tamarit',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera de foto i de vídeo. El Castell de Tamarit és un dels escenaris més espectaculars on es pot casar algú a la Costa Daurada: un castell medieval sobre la roca, amb el Mediterrani a tres bandes i la platja de Tamarit als peus. Encara no hi hem documentat cap boda, però coneixem bé la seva llum de mar i sabem exactament com l'aprofitaríem.",
    realWeddingIntro:
      "Siguem clars: encara no hem fotografiat cap boda dins del Castell de Tamarit, així que no us ensenyarem un reportatge fals fet aquí. El que sí podem fer és explicar-vos el lloc — un castell documentat des del segle XI, sobre un promontori rocós amb el mar per tres costats i l'església romànica de Santa Maria dins les muralles — i com hi treballaríem: llum de mar dramàtica, textura de pedra medieval i retrats al penya-segat amb l'aigua de fons.",
    whatItOffersIntro:
      "El Castell de Tamarit és un venue exclusiu: es lloga el castell sencer per a un sol dia. Per a un fotògraf i un càmera, cada racó és una decisió de llum. Aquestes són les claus que treballaríem:",
    whatItOffersBullets: [
      "La cerimònia amb el Mediterrani de fons — el mar a tres bandes és un teló que cap saló pot igualar, però demana controlar el contraladre i l'exposició per no cremar el cel sobre l'aigua",
      'Les muralles i els patis de pedra medieval — textura mil·lenària que dóna cos als retrats i als plans de vídeo sense necessitat de cap attrezzo',
      "L'església romànica de Santa Maria, dins les muralles — interior de pedra amb poca llum, ideal per a plans íntims si es treballa amb objectius lluminosos i sense flash agressiu",
      'Els retrats al penya-segat, amb la platja de Tamarit als peus — el moment estrella per a la parella, millor a última hora del dia',
      "La sortida i la posta de sol sobre el mar — la millor llum del dia; programaríem els retrats principals per coincidir amb el capvespre daurat sobre l'aigua",
    ],
    whyChooseIntro: 'Tres motius:',
    whyChoosePoints: [
      "Som dos germans amb dos formats. Un de nosaltres filma, l'altre fotografia. Sortiu amb el dia sencer documentat en foto i vídeo, un sol equip, sense haver de coordinar dos proveïdors externs.",
      'Som de la zona. Reus i tota la Costa Daurada entren dins la nostra cobertura habitual — el Castell de Tamarit hi és, sense recàrrec de desplaçament.',
      'Entreguem ràpid. En clau documental, sense fer-vos posar cada dos minuts, i amb la galeria a les vostres mans en aproximadament una setmana.',
    ],
    faqs: [
      {
        question: 'Cobriu bodes al Castell de Tamarit?',
        answer:
          "Sí, el cobrim. Hem de ser honestos: encara no hi hem documentat cap boda, així que no us ensenyarem un reportatge fet allà. Però coneixem l'espai, la seva llum de mar i com hi treballaríem — i estem desitjant estrenar-lo amb vosaltres.",
      },
      {
        question: 'Feu foto i vídeo alhora?',
        answer:
          "Sí. Som dos germans: un filma i l'altre fotografia. En un escenari com Tamarit, amb el mar i la pedra, tenir foto i vídeo del mateix moment és el que fa que el reportatge respiri.",
      },
      {
        question: 'Quan tindríem les fotos?',
        answer:
          'La galeria completa us arriba en aproximadament una setmana. El vídeo va una mica després, però la selecció de fotos la tindreu de seguida per compartir-la amb la família.',
      },
      {
        question: 'Teniu la nostra data lliure?',
        answer:
          "Depèn del dia — el Castell de Tamarit és molt sol·licitat i nosaltres també tenim agenda. El millor és escriure'ns pel WhatsApp amb la vostra data i us ho confirmem en menys de 24 hores.",
      },
    ],
    finalCtaH2: 'Ens encantaria estrenar el Castell de Tamarit amb vosaltres',
    finalCtaBody:
      "Mireu si tenim la vostra data lliure. Resposta en menys d'un dia. Sense compromís, sense formularis llargs — només una conversa per WhatsApp.",
  },

  // ─── Spanish (peninsular) ──────────────────────────────────────────
  es: {
    metaTitle: 'Fotografía y vídeo de boda en el Castell de Tamarit | Lifetime Weddings',
    metaDescription:
      'Fotografía y vídeo de boda en el Castell de Tamarit, un castillo medieval sobre el mar en la Costa Daurada. Conocemos su luz. Háblanos por WhatsApp.',
    eyebrow: 'Reus · Costa Daurada · desde 2020',
    h1: 'Fotografía y vídeo de boda en el Castell de Tamarit',
    subtitle:
      'Somos Eric y Ferran, dos hermanos con cámara de foto y de vídeo. El Castell de Tamarit es uno de los escenarios más espectaculares donde alguien puede casarse en la Costa Daurada: un castillo medieval sobre la roca, con el Mediterráneo a tres lados y la playa de Tamarit a sus pies. Todavía no hemos documentado ninguna boda allí, pero conocemos bien su luz de mar y sabemos exactamente cómo la aprovecharíamos.',
    realWeddingIntro:
      'Seamos claros: todavía no hemos fotografiado ninguna boda dentro del Castell de Tamarit, así que no te enseñaremos un reportaje falso hecho aquí. Lo que sí podemos hacer es contarte el lugar — un castillo documentado desde el siglo XI, sobre un promontorio rocoso con el mar por tres lados y la iglesia románica de Santa María dentro de las murallas — y cómo trabajaríamos en él: luz de mar dramática, textura de piedra medieval y retratos en el acantilado con el agua de fondo.',
    whatItOffersIntro:
      'El Castell de Tamarit es un venue exclusivo: se alquila el castillo entero para un solo día. Para un fotógrafo y un cámara, cada rincón es una decisión de luz. Estas son las claves que trabajaríamos:',
    whatItOffersBullets: [
      'La ceremonia con el Mediterráneo de fondo — el mar a tres lados es un telón que ningún salón puede igualar, pero exige controlar el contraluz y la exposición para no quemar el cielo sobre el agua',
      'Las murallas y los patios de piedra medieval — textura milenaria que da cuerpo a los retratos y a los planos de vídeo sin necesidad de attrezzo',
      'La iglesia románica de Santa María, dentro de las murallas — interior de piedra con poca luz, ideal para planos íntimos si se trabaja con objetivos luminosos y sin flash agresivo',
      'Los retratos en el acantilado, con la playa de Tamarit a los pies — el momento estrella para la pareja, mejor a última hora del día',
      'El amanecer y la puesta de sol sobre el mar — la mejor luz del día; programaríamos los retratos principales para coincidir con el atardecer dorado sobre el agua',
    ],
    whyChooseIntro: 'Tres motivos:',
    whyChoosePoints: [
      'Somos dos hermanos con dos formatos. Uno filma, el otro fotografía. Te vas con el día entero documentado en foto y vídeo, un solo equipo, sin tener que coordinar dos proveedores externos.',
      'Somos de la zona. Reus y toda la Costa Daurada entran dentro de nuestra cobertura habitual — el Castell de Tamarit está incluido, sin recargo de desplazamiento.',
      'Entregamos rápido. En clave documental, sin hacerte posar cada dos minutos, y con la galería en tus manos en aproximadamente una semana.',
    ],
    faqs: [
      {
        question: '¿Cubrís bodas en el Castell de Tamarit?',
        answer:
          'Sí, lo cubrimos. Debemos ser honestos: todavía no hemos documentado ninguna boda allí, así que no te enseñaremos un reportaje hecho en el castillo. Pero conocemos el espacio, su luz de mar y cómo trabajaríamos en él — y nos encantaría estrenarlo contigo.',
      },
      {
        question: '¿Hacéis foto y vídeo a la vez?',
        answer:
          'Sí. Somos dos hermanos: uno filma y el otro fotografía. En un escenario como Tamarit, con el mar y la piedra, tener foto y vídeo del mismo momento es lo que hace que el reportaje respire.',
      },
      {
        question: '¿Cuándo tendríamos las fotos?',
        answer:
          'La galería completa te llega en aproximadamente una semana. El vídeo va un poco después, pero la selección de fotos la tendrás enseguida para compartirla con la familia.',
      },
      {
        question: '¿Tenéis nuestra fecha libre?',
        answer:
          'Depende del día — el Castell de Tamarit es muy solicitado y nosotros también tenemos agenda. Lo mejor es escribirnos por WhatsApp con vuestra fecha y te lo confirmamos en menos de 24 horas.',
      },
    ],
    finalCtaH2: 'Nos encantaría estrenar el Castell de Tamarit contigo',
    finalCtaBody:
      'Mira si tenemos vuestra fecha libre. Respuesta en menos de un día. Sin compromiso, sin formularios largos — solo una conversación por WhatsApp.',
  },

  // ─── English (editorial) ───────────────────────────────────────────
  en: {
    metaTitle: 'Wedding photo and video at Castell de Tamarit | Lifetime Weddings',
    metaDescription:
      'Wedding photo and video at Castell de Tamarit, a medieval castle above the sea on the Costa Daurada. We know its light. Message us on WhatsApp.',
    eyebrow: 'Reus · Costa Daurada · since 2020',
    h1: 'Wedding photo and video at Castell de Tamarit',
    subtitle:
      "We're Eric and Ferran, two brothers shooting photo and video. Castell de Tamarit is one of the most dramatic places anyone can marry on the Costa Daurada: a medieval castle on the rock, the Mediterranean on three sides, and Tamarit beach at its feet. We haven't documented a wedding here yet, but we know its sea light well and exactly how we'd use it.",
    realWeddingIntro:
      "Let's be straight: we haven't yet photographed a wedding inside Castell de Tamarit, so we won't show you a faked gallery pretending otherwise. What we can do is describe the place — a castle documented from the 11th century, set on a rocky headland with the sea on three sides and the Romanesque church of Santa Maria inside the walls — and how we'd shoot it: dramatic sea light, medieval stone texture, and cliff-edge portraits with the water behind you.",
    whatItOffersIntro:
      'Castell de Tamarit is an exclusive venue: you rent the whole castle for a single day. For a photographer and a filmmaker, every corner is a lighting decision. These are the beats we would work:',
    whatItOffersBullets: [
      "The ceremony with the Mediterranean behind you — sea on three sides is a backdrop no reception hall can match, but it means managing the backlight and exposure so the sky over the water doesn't blow out",
      'The walls and medieval stone courtyards — thousand-year-old texture that gives body to portraits and video frames without any props',
      'The Romanesque church of Santa Maria, inside the walls — a low-light stone interior, ideal for intimate frames when shot on fast lenses and without aggressive flash',
      'Cliff-edge portraits, with Tamarit beach below — the standout moment for the couple, best late in the day',
      'Sunrise and sunset over the sea — the best light of the day; we would schedule the main portraits to land on the golden hour over the water',
    ],
    whyChooseIntro: 'Three reasons:',
    whyChoosePoints: [
      "We're two brothers in two formats. One films, the other shoots stills. You leave with the whole day documented in photo and video — one team, no coordinating two separate vendors.",
      'We are local. Reus and the whole Costa Daurada fall within our usual coverage — Castell de Tamarit included, with no travel surcharge.',
      "We deliver fast. Documentary in style, without posing you every two minutes, and with the gallery in your hands in about a week.",
    ],
    faqs: [
      {
        question: 'Do you cover weddings at Castell de Tamarit?',
        answer:
          "Yes, we cover it. We have to be honest: we haven't documented a wedding here yet, so we won't show you a gallery made at the castle. But we know the space, its sea light, and how we'd shoot it — and we'd love to be the ones to open it with you.",
      },
      {
        question: 'Do you do photo and video together?',
        answer:
          "Yes. We're two brothers: one films and the other shoots stills. In a setting like Tamarit, with the sea and the stone, having photo and video of the same moment is what lets the coverage breathe.",
      },
      {
        question: 'When would we get the photos?',
        answer:
          'The full gallery reaches you in about a week. The film follows a little later, but you get the photo selection quickly to share with family.',
      },
      {
        question: 'Is our date still open?',
        answer:
          "It depends on the day — Castell de Tamarit is in high demand and our own calendar fills up too. The best move is to message us on WhatsApp with your date and we'll confirm within 24 hours.",
      },
    ],
    finalCtaH2: "We'd love to shoot our first Castell de Tamarit wedding with you",
    finalCtaBody:
      'Check if your date is still open. Reply within a day. No commitment, no long forms — just a WhatsApp conversation.',
  },
};
