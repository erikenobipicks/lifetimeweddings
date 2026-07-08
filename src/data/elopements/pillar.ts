import type { ElopementPillarCopy } from './types';
import type { Lang } from '~/i18n/ui';

// Copy for the pillar page /elopement-catalunya. Hub of the elopement topic
// cluster: explains what an elopement is, why Catalonia, links out to every
// locality child page (Siurana, Barcelona, Tarragona, Costa Daurada, Delta de
// l'Ebre) and back — bidirectional internal linking.

export const PILLAR: Record<Lang, ElopementPillarCopy> = {
  ca: {
    meta: {
      title: "Elopement a Catalunya — fotògraf i videògraf | Lifetime Weddings",
      description:
        "Guia per casar-vos només vosaltres dos a Catalunya: els millors llocs per a un elopement, permisos, millor època i com ho documentem en foto i vídeo.",
    },
    hero: {
      eyebrow: 'Elopement · Catalunya',
      h1: 'Elopement a Catalunya: casar-vos només vosaltres dos, on tot té sentit',
      sub: 'Del Priorat al Delta, de la muntanya al mar. Us ajudem a triar el lloc i ho guardem en foto i vídeo perquè ho pugueu reviure per sempre.',
      heroAlt: "Parella el dia del seu elopement a la muntanya de Catalunya, fotografiats per Lifetime Weddings",
    },
    intro: {
      title: 'Una altra manera d’entendre el "sí, vull"',
      paras: [
        'Cada cop més parelles ens diuen el mateix: volen casar-se de veritat, però sense el gran convit, els 120 convidats i la pressió d’agradar a tothom. Volen un dia que sigui **realment seu**.',
        'Això és un elopement: vosaltres dos —o un grapat de les persones que més estimeu— en un lloc que us digui alguna cosa, sense protocol ni rellotge. I Catalunya, en un radi de poques hores, us ofereix cingles, boscos, platges verges, pobles medievals i arrossars infinits.',
      ],
    },
    whatIs: {
      title: 'Què és (i què no és) un elopement',
      paras: [
        'Un elopement no és una boda "a mitges". És una boda amb una altra prioritat: el vostre vincle per davant de la producció. La cerimònia sol ser simbòlica —els vots, el moment— i el tràmit legal el feu al jutjat o notari a part, abans o després.',
        'Pot ser només vosaltres dos, o un cercle molt petit. Pot durar unes hores o un dia sencer. No hi ha una única forma correcta: hi ha la vostra.',
      ],
    },
    whyCatalonia: {
      title: 'Per què Catalunya per a un elopement',
      intro: 'En poc territori teniu paisatges radicalment diferents, i nosaltres els coneixem de treballar-hi:',
      bullets: [
        '**Muntanya i cingles** — Siurana i el Priorat, roca vertical i pobles de pedra.',
        '**Ciutat amb ànima** — Barcelona, del Gòtic als búnquers amb vistes al mar.',
        '**Història romana i mar** — Tarragona, 2000 anys de pedra sobre el Mediterrani.',
        '**Platges daurades** — la Costa Daurada, sorra fina i cales verges de pins.',
        '**Horitzons infinits** — el Delta de l’Ebre, arrossars que reflecteixen el cel.',
      ],
    },
    childrenTitle: 'Escolliu el vostre lloc',
    childrenIntro:
      'Cada indret té la seva llum, els seus racons i les seves normes. Entreu a la guia de cadascun: llocs concrets, permisos, millor època i logística.',
    process: {
      title: 'Com ho fem',
      bullets: [
        'Us ajudem a pensar el dia: lloc, hora i la millor llum per a la vostra idea.',
        'Cobertura de **foto i vídeo**, els dos germans, un sol equip coordinat.',
        'Us orientem amb permisos i logística de cada espai natural o monument.',
        'Galeria privada online amb totes les fotos editades, **en una setmana**.',
        'Vídeo editat com una pel·lícula, amb la vostra veu i el so del dia.',
        'Ens movem per **tot Catalunya** (i on faci falta).',
      ],
    },
    faqTitle: 'Dubtes sobre els elopements',
    faqs: [
      { q: 'Un elopement és legal?', a: 'La cerimònia sol ser simbòlica (la vivència, els vots, el moment). El tràmit legal el feu al jutjat o notari a part. Nosaltres ens encarreguem de documentar-ho tot i us orientem sobre la part legal.' },
      { q: 'Quanta gent hi pot venir?', a: 'Els que vulgueu: només vosaltres dos, o un grup petit de família i amics de veritat. La gràcia és que és petit i íntim.' },
      { q: 'Feu foto i vídeo alhora?', a: 'Sí. Som dos germans: un a la foto, l’altre al vídeo. Un sol equip coordinat, sense fer-vos repetir res.' },
      { q: 'On podem fer-lo?', a: 'On vulgueu de Catalunya. En aquesta guia trobareu els nostres llocs preferits, però si en teniu un d’especial, expliqueu-nos-el.' },
      { q: 'Quan rebem les fotos i el vídeo?', a: 'Les fotos molt ràpid: la galeria completa en una setmana. El vídeo una mica més, perquè el muntem amb calma.' },
    ],
    finalCta: {
      h2: 'Us imagineu casant-vos així?',
      body: 'Expliqueu-nos com voleu que sigui el vostre dia i mirem dates. Sense compromís.',
    },
    formTitle: 'Comencem pel vostre elopement',
    formIntro: 'Quatre dades i us responem amb disponibilitat i idees per al vostre lloc.',
    whatsAppMessage: 'Hola! Estem pensant en un elopement a Catalunya i ens agradaria que ens n’expliquéssiu més.',
    breadcrumbCurrent: 'Elopement a Catalunya',
  },

  es: {
    meta: {
      title: "Elopement en Cataluña — fotógrafo y videógrafo | Lifetime Weddings",
      description:
        "Guía para casaros solos los dos en Cataluña: los mejores lugares para un elopement, permisos, mejor época y cómo lo documentamos en foto y vídeo.",
    },
    hero: {
      eyebrow: 'Elopement · Cataluña',
      h1: 'Elopement en Cataluña: casaros solos los dos, donde todo tiene sentido',
      sub: 'Del Priorat al Delta, de la montaña al mar. Os ayudamos a elegir el lugar y lo guardamos en foto y vídeo para que lo podáis revivir para siempre.',
      heroAlt: 'Pareja el día de su elopement en la montaña de Cataluña, fotografiados por Lifetime Weddings',
    },
    intro: {
      title: 'Otra forma de entender el "sí, quiero"',
      paras: [
        'Cada vez más parejas nos dicen lo mismo: quieren casarse de verdad, pero sin el gran banquete, los 120 invitados y la presión de gustar a todos. Quieren un día que sea **realmente suyo**.',
        'Eso es un elopement: vosotros dos —o un puñado de las personas que más queréis— en un lugar que os diga algo, sin protocolo ni reloj. Y Cataluña, en un radio de pocas horas, os ofrece acantilados, bosques, playas vírgenes, pueblos medievales y arrozales infinitos.',
      ],
    },
    whatIs: {
      title: 'Qué es (y qué no es) un elopement',
      paras: [
        'Un elopement no es una boda "a medias". Es una boda con otra prioridad: vuestro vínculo por delante de la producción. La ceremonia suele ser simbólica —los votos, el momento— y el trámite legal lo hacéis en el juzgado o notaría aparte, antes o después.',
        'Puede ser solo vosotros dos, o un círculo muy pequeño. Puede durar unas horas o un día entero. No hay una única forma correcta: está la vuestra.',
      ],
    },
    whyCatalonia: {
      title: 'Por qué Cataluña para un elopement',
      intro: 'En poco territorio tenéis paisajes radicalmente distintos, y los conocemos de trabajar en ellos:',
      bullets: [
        '**Montaña y acantilados** — Siurana y el Priorat, roca vertical y pueblos de piedra.',
        '**Ciudad con alma** — Barcelona, del Gótico a los búnkeres con vistas al mar.',
        '**Historia romana y mar** — Tarragona, 2000 años de piedra sobre el Mediterráneo.',
        '**Playas doradas** — la Costa Daurada, arena fina y calas vírgenes de pinos.',
        '**Horizontes infinitos** — el Delta del Ebro, arrozales que reflejan el cielo.',
      ],
    },
    childrenTitle: 'Elegid vuestro lugar',
    childrenIntro:
      'Cada rincón tiene su luz, sus lugares y sus normas. Entrad en la guía de cada uno: lugares concretos, permisos, mejor época y logística.',
    process: {
      title: 'Cómo lo hacemos',
      bullets: [
        'Os ayudamos a pensar el día: lugar, hora y la mejor luz para vuestra idea.',
        'Cobertura de **foto y vídeo**, los dos hermanos, un solo equipo coordinado.',
        'Os orientamos con permisos y logística de cada espacio natural o monumento.',
        'Galería privada online con todas las fotos editadas, **en una semana**.',
        'Vídeo editado como una película, con vuestra voz y el sonido del día.',
        'Nos movemos por **toda Cataluña** (y donde haga falta).',
      ],
    },
    faqTitle: 'Dudas sobre los elopements',
    faqs: [
      { q: '¿Un elopement es legal?', a: 'La ceremonia suele ser simbólica (la vivencia, los votos, el momento). El trámite legal lo hacéis en el juzgado o notaría aparte. Nosotros nos encargamos de documentarlo todo y os orientamos sobre la parte legal.' },
      { q: '¿Cuánta gente puede venir?', a: 'Los que queráis: solo vosotros dos, o un grupo pequeño de familia y amigos de verdad. La gracia es que es pequeño e íntimo.' },
      { q: '¿Hacéis foto y vídeo a la vez?', a: 'Sí. Somos dos hermanos: uno en la foto, el otro en el vídeo. Un solo equipo coordinado, sin haceros repetir nada.' },
      { q: '¿Dónde podemos hacerlo?', a: 'Donde queráis de Cataluña. En esta guía encontraréis nuestros lugares favoritos, pero si tenéis uno especial, contádnoslo.' },
      { q: '¿Cuándo recibimos las fotos y el vídeo?', a: 'Las fotos muy rápido: la galería completa en una semana. El vídeo un poco más, porque lo montamos con calma.' },
    ],
    finalCta: {
      h2: '¿Os imagináis casándoos así?',
      body: 'Contadnos cómo queréis que sea vuestro día y miramos fechas. Sin compromiso.',
    },
    formTitle: 'Empecemos por vuestro elopement',
    formIntro: 'Cuatro datos y os respondemos con disponibilidad e ideas para vuestro lugar.',
    whatsAppMessage: 'Hola! Estamos pensando en un elopement en Cataluña y nos gustaría que nos contarais más.',
    breadcrumbCurrent: 'Elopement en Cataluña',
  },

  en: {
    meta: {
      title: "Elopement in Catalonia — photographer & videographer | Lifetime Weddings",
      description:
        "A guide to eloping in Catalonia, Spain: the best places for an elopement, permits, best time of year, and how we document it in photo and video.",
    },
    hero: {
      eyebrow: 'Elopement · Catalonia',
      h1: 'Elopement in Catalonia: marry just the two of you, where it all makes sense',
      sub: 'From the Priorat to the Ebro Delta, from mountain to sea. We help you choose the place and keep it in photo and video so you can relive it forever.',
      heroAlt: 'Couple on their elopement day in the mountains of Catalonia, photographed by Lifetime Weddings',
    },
    intro: {
      title: 'A different way to say "I do"',
      paras: [
        'More and more couples tell us the same thing: they want to really get married, but without the big reception, the 120 guests and the pressure to please everyone. They want a day that is **truly theirs**.',
        'That is an elopement: the two of you — or a handful of the people you love most — somewhere that means something to you, with no protocol and no clock. And Catalonia, within a few hours’ radius, offers you cliffs, forests, wild beaches, medieval villages and endless rice fields.',
      ],
    },
    whatIs: {
      title: 'What an elopement is (and isn’t)',
      paras: [
        'An elopement is not a wedding "done by halves". It is a wedding with a different priority: your bond ahead of the production. The ceremony is usually symbolic — the vows, the moment — and the legal paperwork is done at a registry office or notary separately, before or after.',
        'It can be just the two of you, or a very small circle. It can last a few hours or a whole day. There is no single right way — there is yours.',
      ],
    },
    whyCatalonia: {
      title: 'Why Catalonia for an elopement',
      intro: 'In a small territory you get radically different landscapes, and we know them from working in them:',
      bullets: [
        '**Mountains and cliffs** — Siurana and the Priorat, sheer rock and stone villages.',
        '**A city with soul** — Barcelona, from the Gothic Quarter to the bunkers overlooking the sea.',
        '**Roman history and sea** — Tarragona, 2,000 years of stone above the Mediterranean.',
        '**Golden beaches** — the Costa Daurada, fine sand and wild pine-backed coves.',
        '**Endless horizons** — the Ebro Delta, rice paddies that mirror the sky.',
      ],
    },
    childrenTitle: 'Choose your place',
    childrenIntro:
      'Each place has its own light, its own spots and its own rules. Step into the guide for each one: concrete locations, permits, best season and logistics.',
    process: {
      title: 'How it works',
      bullets: [
        'We help you plan the day: place, timing and the best light for your idea.',
        '**Photo and video** coverage, both brothers, one coordinated team.',
        'We guide you through the permits and logistics of each natural space or monument.',
        'Private online gallery with every edited photo, **within a week**.',
        'A film edited like a movie, with your voice and the sound of the day.',
        'We travel across **all of Catalonia** (and wherever you need us).',
      ],
    },
    faqTitle: 'Common questions about elopements',
    faqs: [
      { q: 'Is an elopement legal?', a: 'The ceremony is usually symbolic (the experience, the vows, the moment). The legal paperwork is done at a registry office or notary separately. We take care of documenting everything and can point you in the right direction for the legal side.' },
      { q: 'How many people can come?', a: 'As many as you want: just the two of you, or a small group of close family and friends. The beauty is that it stays small and intimate.' },
      { q: 'Do you shoot photo and video together?', a: 'Yes. We are two brothers: one on photo, the other on video. One coordinated team, without making you repeat anything.' },
      { q: 'Where can we do it?', a: 'Anywhere in Catalonia. In this guide you’ll find our favourite spots, but if you have a special place in mind, tell us about it.' },
      { q: 'When do we get the photos and video?', a: 'Photos very fast: the full gallery within a week. The film takes a little longer, because we edit it carefully.' },
    ],
    finalCta: {
      h2: 'Can you picture getting married like this?',
      body: 'Tell us how you imagine your day and we’ll check dates. No commitment.',
    },
    formTitle: 'Let’s start with your elopement',
    formIntro: 'A few details and we reply with availability and ideas for your place.',
    whatsAppMessage: 'Hi! We’re thinking about an elopement in Catalonia and would love to hear more.',
    breadcrumbCurrent: 'Elopement in Catalonia',
  },
};
