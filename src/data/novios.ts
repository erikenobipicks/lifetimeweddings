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
    couple: { a: 'Vanesa', b: 'David' },
    hashtag: '#VanesaiDavid',
    eyebrow: 'Ens casem',
    dateLabel: '12 de juny de 2027',
    dateISO: '2027-06-12T17:30:00+02:00',
    place: 'Tarragona',
    email: 'hola@lifetime.photo',
    photoSet: 'vanesa-david',
    photos: {
      hero: '018',
      story: '012',
      gallery: ['023', '030', '020', '036'],
    },
    intro:
      "Després d'anys de camins, postes de sol i sobretaules que no s'acabaven mai, hem decidit fer-ho oficial. Ens fa molta il·lusió compartir aquest dia amb vosaltres.",
    story: {
      eyebrow: "Una mica d'història",
      heading: 'Com hem arribat fins aquí',
      beats: [
        {
          year: '2018',
          title: 'El primer "hola"',
          text: "Ens vam conèixer entre amics comuns una nit qualsevol que va acabar sent de les que es recorden. La resta, ja ho sabeu, va venir sol.",
        },
        {
          year: '2021',
          title: 'La nostra primera casa',
          text: "Vam decidir compartir sostre, plantes que sobreviuen de miracle i una tetera que fem servir cada matí. Petites rutines que ho són tot.",
        },
        {
          year: '2026',
          title: 'La pregunta',
          text: "En un dels nostres racons preferits, entre vinyes i mar, va arribar la pregunta. Es va dir que sí abans que acabés la frase.",
        },
      ],
    },
    day: {
      eyebrow: 'El programa',
      heading: 'El gran dia',
      stops: [
        {
          time: '17.30 h',
          title: 'Cerimònia',
          text: 'Ens donarem el sí envoltats de les persones que estimem, amb el Camp de Tarragona de testimoni.',
        },
        {
          time: '18.30 h',
          title: 'Còctel de benvinguda',
          text: "Vermut, bombolles i les primeres abraçades llargues al jardí, mentre es pon el sol.",
        },
        {
          time: '21.00 h',
          title: 'Sopar',
          text: 'Menú de proximitat pensat per compartir i allargar la sobretaula tant com calgui.',
        },
        {
          time: '23.30 h',
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
          text: "A l'aire lliure, en un dels racons amb més vistes del Camp de Tarragona, entre vinyes i amb el Mediterrani al fons.",
          addr: 'Camp de Tarragona · Tarragona',
        },
        {
          kind: 'party',
          title: 'Còctel, sopar i festa',
          text: 'Al mateix recinte, amb aparcament dins de la finca per a tots els convidats. No cal desplaçar-se: ho tindrem tot a tocar.',
          addr: 'A tocar de la cerimònia · Tarragona',
        },
      ],
    },
    gallery: {
      eyebrow: 'Abans del gran dia',
      heading: 'La nostra preboda',
      captions: [
        'Capvespre al Camp de Tarragona',
        'Vora el mar',
        'Els nostres camins',
        'Entre vinyes',
      ],
    },
    info: {
      eyebrow: 'Per si de cas',
      heading: 'Informació pràctica',
      items: [
        {
          icon: 'dress',
          title: 'Codi de vestimenta',
          text: 'Elegant i còmode. Hi haurà gespa i grava, així que millor deixar els talons més fins a casa.',
        },
        {
          icon: 'bed',
          title: 'Allotjament',
          text: 'Estem preparant una selecció d’hotels a Tarragona amb tarifa especial. La compartirem aquí en les properes setmanes.',
        },
        {
          icon: 'gift',
          title: 'Regal',
          text: 'El teu "sí, hi seré" ja és el millor regal. Si vols tenir un detall, aviat obrirem una llista de viatge.',
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
      'Aquesta pàgina és una mostra de disseny: el text i les dates són exemples i les fotografies són d’una sessió de preboda real. Serveix per il·lustrar com pot ser la vostra web de boda personalitzada.',
  },
];

export function getNoviosSite(slug: string): NoviosSite | undefined {
  return NOVIOS.find((n) => n.slug === slug);
}
