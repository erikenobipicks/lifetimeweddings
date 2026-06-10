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
      'dosterras-wine-garden',
      'forti-del-rourell',
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

  {
    slug: 'reus',
    name: 'Reus',
    metaTitle: 'Fotògrafs de boda a Reus | Lifetime Weddings',
    metaDescription:
      'Fotografia i vídeo documental de boda a Reus i el Baix Camp. Dos germans amb base a la ciutat, sense recàrrec de desplaçament a la comarca.',
    eyebrow: 'Baix Camp · Reus · Camp de Tarragona',
    h1: 'Fotògrafs de boda a Reus — som de casa',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera i càmera de vídeo, i Reus és la nostra ciutat. No venim de fora: hem crescut aquí i hem documentat bodes pertot el Baix Camp. Si us caseu a Reus o als pobles del voltant, comencem amb avantatge — coneixem els espais, la llum i els temps de la zona.",

    whyLocalIntro: 'Tres motius pràctics:',
    whyLocalPoints: [
      {
        label: 'Som de Reus, no de pas',
        body: "La nostra base és la ciutat. Això vol dir cap recàrrec de desplaçament al Baix Camp i una flexibilitat total per quedar, fer una visita prèvia al venue o ajustar els temps del dia sense que el quilometratge sigui un problema.",
      },
      {
        label: 'Coneixem els venues de la comarca',
        body: "Hem treballat a Mas La Boella, al Fortí del Rourell, a Dosterras Wine Garden i a moltes masies i finques del Baix Camp i el Priorat. Saber com es comporta la llum a cada espai estalvia hores d'improvisació el dia de la boda.",
      },
      {
        label: 'Dos germans, dos formats',
        body: "Un de nosaltres filma, l'altre fotografia. Sortireu amb el dia documentat en foto i vídeo, sense haver de coordinar dos equips separats.",
      },
    ],

    coverageIntro: 'Aquesta és la nostra ciutat. Sense costos de desplaçament:',
    coverageList: [
      'Reus',
      'Tarragona ciutat',
      'Cambrils',
      'Salou',
      'Vila-seca',
      'Riudoms',
      'Montbrió del Camp',
      'Les Borges del Camp',
      'Castellvell del Camp',
      'Almoster',
      'La Selva del Camp',
      'Vandellòs i Hospitalet',
      'Mont-roig del Camp',
      'Falset i Priorat',
      'Baix Camp',
      'Camp de Tarragona',
    ],
    coverageNote:
      "Si esteu més enllà (Lleida pirineu, Costa Brava, fora de Catalunya), ens trobem igual — el desplaçament es pressuposta a part.",

    knownVenueSlugs: [
      'mas-la-boella',
      'forti-del-rourell',
      'dosterras-wine-garden',
    ],
    weddingLocationMatch: 'Reus',

    faqs: [
      {
        question: 'Quina és la vostra zona de cobertura sense recàrrec?',
        answer:
          'Tot el Baix Camp i el Camp de Tarragona. Reus és la nostra base, així que us caseu a la ciutat o a qualsevol poble de la comarca sense cost addicional de desplaçament.',
      },
      {
        question: 'Coneixeu el meu venue?',
        answer:
          "Probablement sí. Hem fotografiat i filmat a la majoria de venues de bodes coneguts del Baix Camp i el Priorat — finques, masies, hotels, bodegues. Si ens dius el nom, te'l confirmem en menys de 24h.",
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
        question: 'Quant costa una boda amb vosaltres a Reus?',
        answer:
          'Cada boda és única i el pressupost depèn de la data, el pack i les necessitats. Us en passem un de personalitzat en menys de 24h.',
      },
    ],

    finalCtaH2: 'La vostra boda a Reus, explicada per dos germans de casa',
    finalCtaBody:
      "Mireu si tenim la vostra data lliure. Resposta en menys d'un dia, sense compromís — només una conversa per WhatsApp.",
  },

  {
    slug: 'costa-daurada',
    name: 'Costa Daurada',
    metaTitle: 'Fotògrafs de boda a la Costa Daurada | Lifetime Weddings',
    metaDescription:
      'Fotografia i vídeo documental de boda a la Costa Daurada: Salou, Cambrils, Vila-seca, El Vendrell, Calafell. Dos germans amb base a Reus, sense recàrrec.',
    eyebrow: 'Costa Daurada · Salou · Cambrils · El Vendrell',
    h1: 'Fotògrafs de boda a la Costa Daurada — del mar a la finca',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera i càmera de vídeo. La nostra base és Reus, a tocar de la costa, i la Costa Daurada és terreny de casa: bodes amb el mar de fons, finques entre vinyes i el capvespre daurat que dona nom a aquest litoral. Si us caseu a la zona, és molt probable que ja hi haguem treballat.",

    whyLocalIntro: 'Tres motius pràctics:',
    whyLocalPoints: [
      {
        label: 'Cap recàrrec de desplaçament al litoral',
        body: "Treballem habitualment per tota la Costa Daurada sense costos addicionals. Si us caseu a Salou, Cambrils, Vila-seca, La Pineda, El Vendrell, Calafell o Torredembarra — som a quinze minuts de casa.",
      },
      {
        label: 'Sabem aprofitar la llum del litoral',
        body: "La llum de la costa té el seu caràcter: el contrallum del capvespre sobre el mar, la reflexió de la sorra, l'hora daurada que aquí dura just el necessari. Conèixer els temps de cada platja i passeig estalvia improvisació el dia de la boda.",
      },
      {
        label: 'Dos germans, dos formats',
        body: "Un de nosaltres filma, l'altre fotografia. Sortireu amb el dia documentat en foto i vídeo, sense haver de coordinar dos equips separats.",
      },
    ],

    coverageIntro: 'Tot el litoral i el seu interior immediat, sense costos de desplaçament:',
    coverageList: [
      'Salou',
      'Cambrils',
      'Vila-seca',
      'La Pineda',
      'Mont-roig del Camp',
      'Miami Platja',
      'Tarragona ciutat',
      'Altafulla',
      'Torredembarra',
      'El Vendrell',
      'Calafell',
      'Coma-ruga',
      'Sant Salvador',
      'Reus',
      'Baix Penedès',
      'Tarragonès',
    ],
    coverageNote:
      "Si esteu més enllà (Lleida pirineu, Costa Brava, fora de Catalunya), ens trobem igual — el desplaçament es pressuposta a part.",

    knownVenueSlugs: [
      'orangerie-clos-barenys',
      'mas-la-boella',
      'masia-san-antonio',
    ],
    weddingLocationMatch: 'Costa Daurada',

    faqs: [
      {
        question: 'Quina és la vostra zona de cobertura sense recàrrec?',
        answer:
          'Tot el litoral de la Costa Daurada, del Tarragonès al Baix Penedès, i el seu interior immediat. Si us caseu a la zona, sense cost addicional de desplaçament.',
      },
      {
        question: 'Coneixeu el meu venue?',
        answer:
          "Probablement sí. Hem fotografiat i filmat a la majoria de venues de bodes coneguts de la costa — hotels amb vistes al mar, finques entre vinyes, masies i espais de platja. Si ens dius el nom, te'l confirmem en menys de 24h.",
      },
      {
        question: 'Feu bodes a la platja?',
        answer:
          "Sí. Hem documentat cerimònies a primera línia de mar i sessions de parella al capvespre sobre la sorra. La clau és l'hora: us aconsellem la franja exacta perquè la llum del litoral us afavoreixi en lloc de jugar en contra.",
      },
      {
        question: 'Quant abans hauria de contractar-vos?',
        answer:
          "Per a bodes en temporada alta (maig-octubre), el moment habitual per reservar és entre 12 i 18 mesos abans. La costa s'omple aviat a l'estiu, així que val la pena preguntar com més aviat millor.",
      },
      {
        question: 'Quant trigueu a enviar les fotos i el vídeo?',
        answer:
          "Galeria online amb totes les fotos editades en 3-4 setmanes. Vídeo documental en 8-10 setmanes. Tràiler, si l'heu contractat, en 3-4 setmanes.",
      },
      {
        question: 'Quant costa una boda amb vosaltres a la Costa Daurada?',
        answer:
          'Cada boda és única i el pressupost depèn de la data, el pack i les necessitats. Us en passem un de personalitzat en menys de 24h.',
      },
    ],

    finalCtaH2: 'La vostra boda a la Costa Daurada, amb el mar de fons',
    finalCtaBody:
      "Mireu si tenim la vostra data lliure. Resposta en menys d'un dia, sense compromís — només una conversa per WhatsApp.",
  },

  {
    slug: 'lleida',
    name: 'Lleida',
    metaTitle: 'Fotògrafs de boda a Lleida | Lifetime Weddings',
    metaDescription:
      'Fotografia i vídeo documental de boda a Lleida i les Terres de Ponent. Dos germans documentalistes que es desplacen a la vostra finca o masia.',
    eyebrow: 'Terres de Lleida · Segrià · Ponent',
    h1: 'Fotògrafs de boda a Lleida — documental, a la vostra finca',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera i càmera de vídeo. La nostra base és Reus, però ens desplacem habitualment a les Terres de Lleida: masies de Ponent, finques entre camps i bodes amb la llum àmplia i neta que té l'interior. Expliquem el vostre dia en clau documental, allà on sigui.",

    whyLocalIntro: 'Tres motius pràctics:',
    whyLocalPoints: [
      {
        label: 'Ens desplacem sense complicacions',
        body: "Lleida està a poc més d'una hora de la nostra base. Anem a la vostra finca o masia, fem visita prèvia si cal i ens adaptem als temps del vostre dia. El desplaçament es pressuposta de manera clara i ajustada, sense sorpreses.",
      },
      {
        label: "Sabem llegir la llum de l'interior",
        body: "La llum de Ponent és diferent de la del litoral: més oberta, més neta, amb capvespres llargs sobre els camps. És una llum agraïda si saps esperar-la. Aquesta mirada documental és la mateixa que apliquem a cada boda, sigui on sigui.",
      },
      {
        label: 'Dos germans, dos formats',
        body: "Un de nosaltres filma, l'altre fotografia. Sortireu amb el dia documentat en foto i vídeo, sense haver de coordinar dos equips separats.",
      },
    ],

    coverageIntro: 'Cobrim tota la província. El desplaçament des de Reus es pressuposta a part, de manera clara:',
    coverageList: [
      'Lleida ciutat',
      'Segrià',
      'Les Garrigues',
      'Pla d\'Urgell',
      "L'Urgell",
      'La Noguera',
      'La Segarra',
      'Balaguer',
      'Tàrrega',
      'Mollerussa',
      'Les Borges Blanques',
      'Cervera',
      'Vall d\'Aran',
      'Pallars',
      'La Seu d\'Urgell',
      'Pirineu de Lleida',
    ],
    coverageNote:
      "A diferència del Camp de Tarragona, a Lleida sí que apliquem un desplaçament — sempre tancat i acordat per endavant, mai una sorpresa a la factura.",

    knownVenueSlugs: [],
    weddingLocationMatch: 'Lleida',

    faqs: [
      {
        question: 'Us desplaceu fins a Lleida?',
        answer:
          "Sí, habitualment. Lleida està a poc més d'una hora de la nostra base a Reus. Ens desplacem a la vostra finca, masia o espai sense cap problema; el cost del trajecte el deixem tancat per endavant.",
      },
      {
        question: 'Hi ha recàrrec de desplaçament?',
        answer:
          'A les Terres de Lleida sí que apliquem un desplaçament, perquè queda fora de la nostra zona nativa del Camp de Tarragona. Sempre és un import tancat i acordat abans de signar res — mai una sorpresa.',
      },
      {
        question: 'Coneixeu el meu venue?',
        answer:
          "Potser sí, potser no — la província és gran. El que fem sempre que treballem en un espai nou és una visita prèvia o un estudi de la llum i els temps, de manera que el dia de la boda arribem amb el terreny estudiat.",
      },
      {
        question: 'Quin tipus de bodes feu?',
        answer:
          "De tot tipus, sempre amb la mateixa mirada documental: civils a l'aire lliure, religioses, simbòliques, LGTBI, íntimes de 30 convidats, grans de 200. El que canvia és l'espai i el ritme; la nostra manera d'explicar-la no.",
      },
      {
        question: 'Quant trigueu a enviar les fotos i el vídeo?',
        answer:
          "Galeria online amb totes les fotos editades en 3-4 setmanes. Vídeo documental en 8-10 setmanes. Tràiler, si l'heu contractat, en 3-4 setmanes.",
      },
      {
        question: 'Quant costa una boda amb vosaltres a Lleida?',
        answer:
          'El pressupost depèn de la data, el pack, les necessitats i el desplaçament. Us en passem un de personalitzat i tancat en menys de 24h.',
      },
    ],

    finalCtaH2: 'La vostra boda a Lleida, documentada per dos germans amb càmera',
    finalCtaBody:
      "Mireu si tenim la vostra data lliure. Resposta en menys d'un dia, sense compromís — només una conversa per WhatsApp.",
  },
];

/** Find a zone by slug, or null if not registered. */
export function zoneBySlug(slug: string): Zone | null {
  return ZONES.find((z) => z.slug === slug) ?? null;
}
