// ────────────────────────────────────────────────────────────────
// Web Novios — personalized wedding micro-sites for couples.
//
// Each couple gets a private page at /novios/<slug> (noindex) that the
// photographer gifts them: hero + countdown, their story, the day's
// timeline, the venues, a gallery of their pre-wedding session and an
// RSVP form. Content lives here so a new couple is a data edit, not a
// new template.
//
// PHOTOS: the `photoSet` key points at a couple folder in
// src/data/photos.generated.ts (processed via scripts/process-photos.mjs).
// For a brand-new couple, drop their photos under public/photos/<slug>/,
// re-run the photo script, then set `photoSet` to that slug. Until the
// couple's own photos are in, a sample pre-wedding set is used and the
// `demo` flag shows a "design sample" note in the footer.
// ────────────────────────────────────────────────────────────────

export interface StoryBeat {
  year: string;
  title: string;
  text: string;
}

export interface TimelineStop {
  time: string;
  title: string;
  text: string;
}

export interface VenueCard {
  /** Which line-art icon to render in the venue card. */
  kind: 'ceremony' | 'party';
  title: string;
  text: string;
  addr: string;
}

export interface InfoItem {
  /** Which line-art icon to render. */
  icon: 'dress' | 'bed' | 'gift';
  title: string;
  text: string;
  /** Optional call-to-action link (e.g. a Bizum / gift link). */
  href?: string;
  cta?: string;
}

/** Optional explicit photo picks (image id suffix, e.g. "018"). When
 *  omitted the page auto-selects by orientation from the photo set. */
export interface PhotoPicks {
  hero?: string;
  story?: string;
  gallery?: string[]; // up to 4 ids for the mosaic
}

export interface NoviosSite {
  slug: string;
  lang: 'ca' | 'es' | 'en';
  /** Couple's first names, shown as "A & B" throughout. */
  couple: { a: string; b: string };
  hashtag?: string;
  eyebrow: string; // small caps line above the names ("Ens casem")
  dateLabel: string; // human date shown in the hero
  /** ISO datetime of the ceremony start — powers the live countdown. */
  dateISO: string;
  place: string;
  email: string;

  /** Couple folder in photos.generated.ts to pull images from. */
  photoSet: string;
  /** Optional explicit image picks; auto by orientation otherwise. */
  photos?: PhotoPicks;

  intro: string;

  story: { eyebrow: string; heading: string; beats: StoryBeat[] };
  day: { eyebrow: string; heading: string; stops: TimelineStop[] };
  venues: { eyebrow: string; heading: string; cards: VenueCard[] };
  gallery: { eyebrow: string; heading: string; captions?: string[] };
  info: { eyebrow: string; heading: string; items: InfoItem[] };

  rsvp: {
    eyebrow: string;
    heading: string;
    nameLabel: string;
    namePlaceholder: string;
    attendingLabel: string;
    attendingOptions: string[];
    guestsLabel: string;
    dietLabel: string;
    dietPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    thanksHeading: string;
    thanksText: string;
  };

  footerContact: string;
  /** When true, shows a note clarifying this is a design sample. */
  demo?: boolean;
  footerNote?: string;
}

export const NOVIOS: NoviosSite[] = [
  {
    slug: 'demo',
    lang: 'ca',
    couple: { a: 'Eric', b: 'Cassandra' },
    hashtag: '#EriciCassandra',
    eyebrow: 'Ens casem',
    dateLabel: '30 de juliol de 2027',
    dateISO: '2027-07-30T18:00:00+02:00',
    place: 'Castell del Tallat',
    email: 'hola@lifetime.photo',
    // Photos live in public/photos/eric-cassandra/ — generate the web
    // variants from the Drive "Pedida de mano" folder with:
    //   node scripts/process-couple.mjs --slug eric-cassandra \
    //     --name "Eric & Cassandra" --src "Z:/…/Pedida de mano"
    // Curated picks (ids map to the processed order 001→013):
    //   004 = beach at sunset · 007 = the kiss · 005 = the proposal
    //   010 = B&W embrace · 009 = hands + ring · 012 = B&W kiss
    photoSet: 'eric-cassandra',
    photos: {
      hero: '004',
      story: '007',
      gallery: ['005', '010', '013', '012'],
    },
    intro:
      "De la sorra i les onades al capvespre, fins al capdamunt de la Serra del Tallat: hem decidit fer-ho oficial. Ens fa molta il·lusió celebrar-ho amb vosaltres.",
    story: {
      eyebrow: "Una mica d'història",
      heading: 'Com hem arribat fins aquí',
      beats: [
        {
          year: '2019',
          title: 'El primer "hola"',
          text: "Ens vam conèixer quan menys ho esperàvem i, sense adonar-nos-en, ja no vam voler separar-nos. La resta va venir sola.",
        },
        {
          year: '2022',
          title: 'El nostre lloc',
          text: 'Vam fer del mar el nostre refugi: passejades a la platja, postes de sol i plans senzills que ho eren tot.',
        },
        {
          year: '2026',
          title: 'La proposta, a la platja',
          text: "Amb els peus a la sorra i el sol baixant sobre l'aigua, va arribar la pregunta i un anell. Va dir que sí entre llàgrimes, abans que acabés la frase.",
        },
      ],
    },
    day: {
      eyebrow: 'El programa',
      heading: 'El gran dia',
      stops: [
        {
          time: '18.00 h',
          title: 'Cerimònia',
          text: 'Ens donarem el sí dalt de la Serra del Tallat, al costat del santuari, amb tot el paisatge de l’Urgell als peus.',
        },
        {
          time: '19.00 h',
          title: 'Còctel de benvinguda',
          text: "Vermut, bombolles i les primeres abraçades llargues mentre es pon el sol sobre les muntanyes.",
        },
        {
          time: '21.30 h',
          title: 'Sopar',
          text: 'Menú de proximitat pensat per compartir i allargar la sobretaula tant com calgui, sota les estrelles.',
        },
        {
          time: '00.00 h',
          title: 'Ball i festa',
          text: 'Fins que el cos aguanti, o fins que surti el sol — el que arribi abans.',
        },
      ],
    },
    venues: {
      eyebrow: 'On serà',
      heading: 'El lloc',
      cards: [
        {
          kind: 'ceremony',
          title: 'Cerimònia',
          text: "Al Castell del Tallat, dalt de la serra, al costat del santuari de Santa Maria del Tallat. Un dels miradors amb més vistes de l'Urgell i la Conca de Barberà.",
          addr: 'Santuari del Tallat · Serra del Tallat (Vallbona de les Monges, Lleida)',
        },
        {
          kind: 'party',
          title: 'Còctel, sopar i festa',
          text: 'Tot al mateix recinte: no cal desplaçar-se. Aparcament per a tots els convidats i el capvespre de la serra com a teló de fons.',
          addr: 'Al mateix Castell del Tallat',
        },
      ],
    },
    gallery: {
      eyebrow: 'Abans del gran dia',
      heading: 'La nostra preboda',
      captions: [
        'La proposta, a la platja',
        "L'anell",
        'Nosaltres',
        'El petó',
      ],
    },
    info: {
      eyebrow: 'Per si de cas',
      heading: 'Informació pràctica',
      items: [
        {
          icon: 'dress',
          title: 'Codi de vestimenta',
          text: 'Elegant i còmode. Serem dalt de la serra i a la nit refresca, així que porteu una capeta d’abric. Hi haurà grava, millor deixar els talons més fins a casa.',
        },
        {
          icon: 'bed',
          title: 'Allotjament',
          text: 'Estem preparant una selecció d’allotjaments a prop (Vallbona de les Monges, Montblanc i Tàrrega). La compartirem aquí en les properes setmanes.',
        },
        {
          icon: 'gift',
          title: 'Regal',
          text: 'El teu "sí, hi seré" ja és el millor regal. Si vols tenir un detall amb nosaltres, ens pots fer un Bizum aquí:',
          cta: 'Fer un Bizum',
          href: 'https://bizum.es',
        },
      ],
    },
    rsvp: {
      eyebrow: "T'hi esperem",
      heading: 'Confirma la teva assistència',
      nameLabel: 'Nom i cognoms',
      namePlaceholder: "Com t'hem d'apuntar a la llista",
      attendingLabel: 'Hi seràs?',
      attendingOptions: ["Sí, no m'ho perdo", 'No podré ser-hi', 'Encara no ho sé'],
      guestsLabel: 'Acompanyants',
      dietLabel: 'Al·lèrgies o intoleràncies',
      dietPlaceholder: "Si n'hi ha, ens ho dius aquí",
      messageLabel: 'Un missatge per als nuvis (opcional)',
      messagePlaceholder: 'Escriu el que vulguis',
      submit: 'Confirmar assistència',
      thanksHeading: 'Gràcies!',
      thanksText: 'Ja tenim la teva resposta apuntada. Ens fa molta il·lusió celebrar-ho amb tu.',
    },
    footerContact: 'Qualsevol dubte, escriu-nos a',
    demo: true,
    footerNote:
      'Aquesta pàgina és una mostra de disseny per il·lustrar com pot ser la vostra web de boda personalitzada.',
  },
];

export function getNoviosSite(slug: string): NoviosSite | undefined {
  return NOVIOS.find((n) => n.slug === slug);
}
