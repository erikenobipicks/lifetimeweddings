// Geographic zone landing pages. One per zone we want to target in SEO
// ("fotògraf de boda + [zona]"). High-intent search by couples comparing
// providers in a city/region. Catalan only for now.
//
// Companion to src/data/venues.ts. Zones link OUT to venues (because
// "we know your venue" is a key conversion message) and to wedding
// galleries in the same area.

export interface ZoneFaq {
  question: string;
  answer: string;
}

export interface Zone {
  /** URL slug — final route is /zones/<slug>. */
  slug: string;
  /** Display name as in H1 and meta. */
  name: string;

  // ─── Copy (Catalan) ───────────────────────────────────────────────
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  subtitle: string;

  whyLocalIntro: string;
  whyLocalPoints: Array<{ label: string; body: string }>;

  coverageIntro: string;
  /** Towns / districts where we cover with no surcharge. */
  coverageList: string[];
  /** Note for areas requiring surcharge. */
  coverageNote: string;

  /** Slugs of venues from src/data/venues.ts to show as cards. */
  knownVenueSlugs: string[];

  /** Filter: only show weddings whose `location` exactly matches this. */
  weddingLocationMatch: string;

  faqs: ZoneFaq[];

  finalCtaH2: string;
  finalCtaBody: string;
}

export const ZONES: Zone[] = [
  {
    slug: 'tarragona',
    name: 'Tarragona',
    metaTitle: 'Fotògrafs de boda a Tarragona | Lifetime Weddings',
    metaDescription:
      'Fotografia i vídeo documental de boda al Camp de Tarragona. Dos germans amb base a Reus, sense recàrrec de desplaçament en tota la zona.',
    eyebrow: 'Camp de Tarragona · Reus · Costa Daurada',
    h1: 'Fotògrafs de boda a Tarragona — dos germans amb base a Reus',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera i càmera de vídeo. La nostra base és Reus, però el nostre territori és tot el Camp de Tarragona: del mar a l'interior, de finques d'estiu a masies de tota la vida. Si us caseu a la zona, és molt probable que ja hi haguem treballat.",

    whyLocalIntro: 'Tres motius pràctics:',
    whyLocalPoints: [
      {
        label: 'Cap recàrrec de desplaçament a la zona',
        body: "Treballem habitualment a tot el Camp de Tarragona, la Costa Daurada i comarques limítrofes sense costos addicionals. Si us caseu a Reus, Tarragona ciutat, Salou, Cambrils, Vila-seca, El Vendrell, Calafell, Falset o qualsevol poble del Priorat — som a casa.",
      },
      {
        label: 'Coneixem els venues de la zona',
        body: "Hem fet bodes a Mas La Boella, l'Orangerie Clos Barenys, Masia Can Martí, Masia San Antonio, Castell del Rourell, Casa Joan Miret, Hotel Termes de Montbrió, Dosterras Wine Garden i molts més. Saber com es comporta la llum a cada espai estalvia hores d'improvisació el dia de la boda.",
      },
      {
        label: 'Dos germans, dos formats',
        body: "Un de nosaltres filma, l'altre fotografia. Sortireu amb el dia documentat en foto i vídeo, sense haver de coordinar dos equips separats.",
      },
    ],

    coverageIntro: 'Aquesta és la nostra zona nativa. Sense costos de desplaçament:',
    coverageList: [
      'Tarragona ciutat',
      'Reus',
      'Salou',
      'Cambrils',
      'Vila-seca',
      'La Pineda',
      'Altafulla',
      'Torredembarra',
      'El Vendrell',
      'Calafell',
      'Valls',
      'Falset i Priorat',
      'Conca de Barberà',
      'Baix Camp',
      'Alt Camp',
      'Tarragonès',
      'Baix Penedès',
    ],
    coverageNote:
      "Si esteu més enllà (Lleida pirineu, Costa Brava, fora de Catalunya), ens trobem igual — el desplaçament es pressuposta a part.",

    knownVenueSlugs: [
      'mas-la-boella',
      'orangerie-clos-barenys',
      'masia-can-marti',
      'masia-san-antonio',
    ],
    weddingLocationMatch: 'Tarragona',

    faqs: [
      {
        question: 'Quina és la vostra zona de cobertura sense recàrrec?',
        answer:
          'Tot el Camp de Tarragona, la Costa Daurada i el Baix Penedès. Si us caseu en alguna de les comarques principals, sense cost addicional de desplaçament.',
      },
      {
        question: 'Coneixeu el meu venue?',
        answer:
          "Probablement sí. Hem fotografiat i filmat a la majoria de venues de bodes coneguts de la zona — finques, masies, hotels, ermites, bodegues. Si ens dius el nom, te'l confirmem en menys de 24h.",
      },
      {
        question: 'Quin tipus de bodes feu?',
        answer:
          "De tot tipus, sempre amb la mateixa mirada documental: civils a l'aire lliure, religioses, simbòliques, LGTBI, íntimes de 30 convidats, grans de 200. El que canvia és l'espai i el ritme; la nostra manera d'explicar-la no.",
      },
      {
        question: 'Quant abans hauria de contractar-vos?',
        answer:
          "Per a bodes en temporada alta (maig-octubre), el moment habitual per reservar és entre 12 i 18 mesos abans. Però sempre val la pena preguntar — alguns mesos del calendari encara queden lliures.",
      },
      {
        question: 'Quant trigueu a enviar les fotos i el vídeo?',
        answer:
          "Galeria online amb totes les fotos editades en 3-4 setmanes. Vídeo documental en 8-10 setmanes. Tràiler, si l'heu contractat, en 3-4 setmanes.",
      },
      {
        question: 'Hi ha bodes que rebutgeu?',
        answer:
          'Sí, bàsicament per dos motius. Primer, dates que ja tenim ocupades. Segon, volum: no fem més bodes de les que podem cobrir personalment entre l\'Eric i el Ferran. A cada boda hi som nosaltres, junts o per separat segons el pack — mai enviem "equips" a fer bodes sense que un de nosaltres dos hi sigui. Això limita el nombre que podem agafar cada any, però és el que ens permet mantenir el nivell.',
      },
      {
        question: 'Quant costa una boda amb vosaltres a Tarragona?',
        answer:
          'Cada boda és única i el pressupost depèn de la data, el pack i les necessitats. Us en passem un de personalitzat en menys de 24h.',
      },
    ],

    finalCtaH2: 'La vostra boda a Tarragona, explicada per dos germans amb càmera',
    finalCtaBody:
      "Mireu si tenim la vostra data lliure. Resposta en menys d'un dia, sense compromís — només una conversa per WhatsApp.",
  },
];

/** Find a zone by slug, or null if not registered. */
export function zoneBySlug(slug: string): Zone | null {
  return ZONES.find((z) => z.slug === slug) ?? null;
}
