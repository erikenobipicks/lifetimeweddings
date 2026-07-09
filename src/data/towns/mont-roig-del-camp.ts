import type { TownServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const MONT_ROIG_TOWN: Record<Lang, TownServiceCopy> = {
  // ─────────────────────────── CATALÀ (principal) ───────────────────────────
  ca: {
    meta: {
      title: 'Fotògraf de boda a Mont-roig del Camp | Lifetime Weddings',
      description:
        "Fotografia i vídeo de boda a Mont-roig del Camp, al Baix Camp: el poble d'interior de Joan Miró i l'Ermita de la Roca. Som de Reus, cobrim la zona sense recàrrec. Parleu-nos pel WhatsApp.",
    },
    hero: {
      eyebrow: 'Mont-roig del Camp · Baix Camp · des de 2020',
      h1: 'Fotògraf de boda a Mont-roig del Camp',
      sub: "Som l'Eric i en Ferran, dos germans de Reus amb càmera de foto i de vídeo. Ens interessa el Mont-roig de dins: el poble de pedra roja, els paisatges que va pintar **Joan Miró** i l'**Ermita de la Mare de Déu de la Roca** penjada sobre la penya. A mitja hora de casa i sense recàrrec de desplaçament.",
      heroAlt: 'Parella el dia de la seva boda a la comarca del Baix Camp',
      cta1: 'Consultar la nostra disponibilitat',
    },
    cardTitle: 'Mont-roig del Camp',
    cardBlurb:
      "El poble d'interior de Miró i l'Ermita de la Roca. Fotografia i vídeo de boda amb la llum roja del capvespre sobre la penya.",
    intro: {
      title: "Un poble amb color propi",
      paras: [
        "Quan la gent sent «Mont-roig» sovint pensa en Miami Platja i la costa. A nosaltres ens agrada l'altra cara: el **nucli antic**, terra endins, on la pedra és literalment roja i el poble s'enfila cap a la penya. És un Mont-roig més tranquil, més autèntic, i molt més fotogènic del que la gent imagina.",
        "Aquí no us vendrem cales ni passeigs marítims —d'això ja se n'encarrega la platja. El que us oferim és un marc amb història: el paisatge que va enamorar **Joan Miró** («és a Mont-roig on trobo el color») i una ermita encimbellada sobre roca vermella amb el mar i tot el Camp de Tarragona als peus. Si us caseu aquí, treballem això.",
        "Som dos germans amb dos formats. En Ferran fa la foto, l'Eric fa el vídeo. Sortireu amb tot el dia documentat —foto i vídeo— amb una sola mirada, un sol equip i sense haver de coordinar dos proveïdors que no s'han vist mai. I com que som de Reus, Mont-roig entra dins la nostra zona habitual: **sense recàrrec de desplaçament**.",
      ],
    },
    nearbyVenues: {
      title: 'On us caseu a la zona',
      intro:
        "Mont-roig del Camp no té una gran concentració de salons, i això per a nosaltres és bona notícia: obliga a mirar el territori. Aquests són els espais de l'entorn que coneixem i on ens agradaria acompanyar-vos.",
      items: [
        {
          name: 'Parc Samà',
          body: "A tocar, cap a Cambrils, hi ha un dels jardins històrics més espectaculars de la Costa Daurada: llac central, torre neomedieval i avingudes de palmeres. Si voleu un banquet amb un marc verd i romàntic a pocs minuts de Mont-roig, és una aposta segura. Us n'expliquem tot aquí.",
          internalSlug: 'parc-sama',
        },
        {
          name: 'Termes de Montbrió',
          body: "També dins el Baix Camp, un resort balneari amb un jardí botànic centenari —palmeres, estanys, espècies rares— que és dels espais més fotogènics de la comarca. Combina bé amb una cerimònia a l'interior i uns retrats de capvespre entre la vegetació.",
          internalSlug: 'termes-montbrio',
        },
        {
          name: "Cellers i masos del Baix Camp",
          body: "Mont-roig és terra de vinya i garrofers, dins la DO Tarragona. Al voltant hi ha cellers i masies rurals que fan casaments petits i de collita pròpia. No en fem publicitat de cap en concret perquè cada any n'obren o en tanquen, però si teniu un lloc triat, digueu-nos-el i us diem amb franquesa com el treballaríem.",
        },
        {
          name: 'Finques i cases rurals de la vall',
          body: "Per a bodes íntimes, l'entorn de Mont-roig té masos i finques amb pati, era i vistes al Camp. Són llocs sense infraestructura de saló gran, i precisament per això demanen un fotògraf que sàpiga treballar amb la llum natural i l'espai que hi ha. És casa nostra: ho fem sovint.",
        },
      ],
    },
    midCta: {
      title: 'Teniu data i lloc?',
      body: "Si ja sabeu on i quan us caseu a Mont-roig o al voltant, escriviu-nos. Mirem l'agenda, us diem si estem lliures i us enviem què inclou cada opció, sense compromís.",
      label: 'Escriure per WhatsApp',
    },
    photoSpots: {
      title: 'On fem les fotos a Mont-roig',
      intro:
        "Pensem cada boda amb el lloc al davant. Aquests són els racons de Mont-roig i el seu terme que millor funcionen davant la càmera, i a quina hora els aprofitem.",
      items: [
        {
          name: "Ermita de la Mare de Déu de la Roca",
          body: "El gran marc de Mont-roig: un santuari encaramat sobre una penya de roca vermella, amb el mar per un costat i tot el Camp de Tarragona per l'altre. Al **capvespre**, quan el sol baix escalfa la pedra, la roca s'encén literalment de vermell. És el moment i el lloc que buscaríem per als retrats de parella.",
        },
        {
          name: 'El nucli antic de pedra roja',
          body: "Els carrers del poble vell, l'església de Sant Miquel i els murs de pedra vermella donen un fons càlid i amb textura que no trobareu a la costa. Bo per als retrats a mitja tarda i per als plans de vídeo que situen la boda en un lloc de veritat, no en un decorat.",
        },
        {
          name: "L'entorn del Mas Miró",
          body: "El mas i el paisatge que va pintar **Joan Miró** —el garrofer, l'era, la muntanya al fons— són part de la història de l'art del segle XX. No és plató de fotos comercials, però el paisatge d'aquell tros de Mont-roig té la mateixa llum i la mateixa terra que va enamorar el pintor. Un marc amb significat.",
        },
        {
          name: 'Vinyes, garrofers i oliveres',
          body: "El terme de Mont-roig és camp obert: renglons de vinya, garrofers vells i oliveres sobre terra roja. A l'hora daurada és un dels fons més nets i lluminosos que hi ha per a una parella, i queda espectacular tant en foto com en vídeo en moviment.",
        },
        {
          name: "Miradors cap al mar",
          body: "Des de dalt, l'interior de Mont-roig mira la costa. Els punts elevats del terme ofereixen una línia d'horitzó amb el mar al lluny —el millor dels dos mons: casar-se terra endins però amb la Mediterrània present al fons dels retrats.",
        },
      ],
    },
    valueExtra: {
      title: 'La llum roja i el llegat de Miró',
      paras: [
        "Hi ha una raó tècnica per la qual Mont-roig funciona tan bé a última hora: la **pedra és vermella**. Quan el sol de capvespre baixa i s'escalfa, la penya de la Roca i els murs del poble reboten una llum càlida i saturada que a la costa, entre sorra clara i blanc, no existeix. Nosaltres planifiquem els retrats de parella just en aquesta finestra, perquè aquí la terra treballa a favor vostre.",
        "I després hi ha el marc cultural. **Joan Miró** va passar estius sencers a Mont-roig i va dir una frase que ho resumeix tot: «és a Mont-roig on trobo el color». El paisatge que el va formar —la muntanya de la Roca, el garrofer, la terra roja— és el mateix que envolta la vostra boda. No cal forçar res: aquest lloc ja té una història que dóna profunditat a les imatges.",
        "Casar-se a l'interior de Mont-roig, i no a la platja, és una decisió d'estil. Vol dir triar pedra en comptes de sorra, vinya en comptes de passeig marítim, tranquil·litat en comptes de temporada alta. Si això és el que busqueu, som els fotògrafs adequats: coneixem aquesta zona, hi treballem sovint i sabem exactament quan la llum hi fa la seva màgia.",
      ],
    },
    gallery: {
      title: 'Una mica de la nostra feina',
      intro:
        "Encara no hem publicat una boda rodada a Mont-roig del Camp, i preferim dir-ho clar abans que muntar una galeria falsa. El que veieu aquí és feina real nostra a la Costa Daurada i el Baix Camp, perquè sapigueu com mirem la llum i les persones.",
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Cobriu Mont-roig del Camp sense recàrrec?',
        a: 'Sí. Som de Reus i Mont-roig entra dins la nostra zona de cobertura habitual del Baix Camp i la Costa Daurada. No apliquem recàrrec de desplaçament per una boda aquí.',
      },
      {
        q: 'Podem fer les fotos a l\'Ermita de la Roca?',
        a: "Podem fer-hi els retrats de parella si el lloc és accessible el dia de la boda —és un santuari públic, així que depèn de com estigui i de la vostra logística. Ho planifiquem amb vosaltres i, si l'accés no acompanya, tenim alternatives amb la mateixa llum de capvespre a prop.",
      },
      {
        q: 'Feu bodes a la platja de Miami o només a l\'interior?',
        a: "Cobrim tot el terme, costa inclosa. Aquesta pàgina parla del Mont-roig d'interior perquè és una cara que sovint es passa per alt, però si us caseu a la banda de mar també hi som. Digueu-nos on i us diem com ho treballaríem.",
      },
      {
        q: 'Sou fotògraf i càmera de vídeo alhora?',
        a: 'Som dos germans: en Ferran fa la fotografia i l\'Eric el vídeo. Tindreu el dia sencer documentat en tots dos formats amb un sol equip coordinat, sense haver de contractar i coordinar dos proveïdors separats.',
      },
      {
        q: 'Quina és la millor hora per als retrats a Mont-roig?',
        a: "El capvespre, sense dubte. La pedra roja de la Roca i del poble s'encén amb el sol baix i dóna una calidesa que no trobareu al migdia. Deixem sempre una finestra reservada a l'hora daurada per als retrats de parella.",
      },
    ],
    finalCta: {
      h2: 'Us acompanyem el vostre dia a Mont-roig',
      body: "Si us caseu a Mont-roig del Camp o al voltant i us fa el pes com mirem, parlem-ne. Sense compromís: us diem la disponibilitat, què inclou cada opció i com treballaríem el vostre lloc concret.",
      label: 'Demanar pressupost',
    },
    formTitle: 'Parlem de la vostra boda',
    formIntro:
      "Expliqueu-nos la data, el lloc i com us imagineu el dia. Us responem aviat amb la disponibilitat i un pressupost clar, sense lletra petita.",
    whatsAppMessage:
      "Hola Eric i Ferran! Ens casem a Mont-roig del Camp i ens agradaria saber la vostra disponibilitat i preus per a foto i vídeo.",
    breadcrumbCurrent: 'Mont-roig del Camp',
  },

  // ─────────────────────────── ESPAÑOL (peninsular) ──────────────────────────
  es: {
    meta: {
      title: 'Fotógrafo de boda en Mont-roig del Camp | Lifetime Weddings',
      description:
        'Fotografía y vídeo de boda en Mont-roig del Camp, en el Baix Camp: el pueblo de interior de Joan Miró y la Ermita de la Roca. Somos de Reus, cubrimos la zona sin recargo. Habladnos por WhatsApp.',
    },
    hero: {
      eyebrow: 'Mont-roig del Camp · Baix Camp · desde 2020',
      h1: 'Fotógrafo de boda en Mont-roig del Camp',
      sub: 'Somos Eric y Ferran, dos hermanos de Reus con cámara de foto y de vídeo. Nos interesa el Mont-roig de dentro: el pueblo de piedra roja, los paisajes que pintó **Joan Miró** y la **Ermita de la Mare de Déu de la Roca**, colgada sobre la peña. A media hora de casa y sin recargo de desplazamiento.',
      heroAlt: 'Pareja el día de su boda en la comarca del Baix Camp',
      cta1: 'Consultar nuestra disponibilidad',
    },
    cardTitle: 'Mont-roig del Camp',
    cardBlurb:
      'El pueblo de interior de Miró y la Ermita de la Roca. Fotografía y vídeo de boda con la luz roja del atardecer sobre la peña.',
    intro: {
      title: 'Un pueblo con color propio',
      paras: [
        'Cuando la gente oye «Mont-roig» suele pensar en Miami Platja y la costa. A nosotros nos gusta la otra cara: el **casco antiguo**, tierra adentro, donde la piedra es literalmente roja y el pueblo trepa hacia la peña. Es un Mont-roig más tranquilo, más auténtico y mucho más fotogénico de lo que la gente imagina.',
        'Aquí no os venderemos calas ni paseos marítimos —de eso ya se encarga la playa—. Lo que os ofrecemos es un marco con historia: el paisaje que enamoró a **Joan Miró** («es en Mont-roig donde encuentro el color») y una ermita encaramada sobre roca roja con el mar y todo el Camp de Tarragona a sus pies. Si os casáis aquí, trabajamos eso.',
        'Somos dos hermanos con dos formatos. Ferran hace la foto, Eric hace el vídeo. Saldréis con todo el día documentado —foto y vídeo— con una sola mirada, un solo equipo y sin tener que coordinar a dos proveedores que no se han visto nunca. Y como somos de Reus, Mont-roig entra en nuestra zona habitual: **sin recargo de desplazamiento**.',
      ],
    },
    nearbyVenues: {
      title: 'Dónde os casáis en la zona',
      intro:
        'Mont-roig del Camp no tiene una gran concentración de salones, y para nosotros eso es buena noticia: obliga a mirar el territorio. Estos son los espacios del entorno que conocemos y donde nos gustaría acompañaros.',
      items: [
        {
          name: 'Parc Samà',
          body: 'Muy cerca, hacia Cambrils, está uno de los jardines históricos más espectaculares de la Costa Daurada: lago central, torre neomedieval y avenidas de palmeras. Si queréis un banquete con un marco verde y romántico a pocos minutos de Mont-roig, es una apuesta segura. Os lo contamos todo aquí.',
          internalSlug: 'parc-sama',
        },
        {
          name: 'Termes de Montbrió',
          body: 'También en el Baix Camp, un resort balneario con un jardín botánico centenario —palmeras, estanques, especies raras— que es de los espacios más fotogénicos de la comarca. Combina bien con una ceremonia interior y unos retratos de atardecer entre la vegetación.',
          internalSlug: 'termes-montbrio',
        },
        {
          name: 'Bodegas y masías del Baix Camp',
          body: 'Mont-roig es tierra de viña y algarrobos, dentro de la DO Tarragona. Alrededor hay bodegas y masías rurales que hacen bodas pequeñas y de cosecha propia. No hacemos publicidad de ninguna en concreto porque cada año abren o cierran, pero si tenéis un sitio elegido, decídnoslo y os decimos con franqueza cómo lo trabajaríamos.',
        },
        {
          name: 'Fincas y casas rurales del valle',
          body: 'Para bodas íntimas, el entorno de Mont-roig tiene masías y fincas con patio, era y vistas al Camp. Son lugares sin infraestructura de gran salón, y precisamente por eso piden un fotógrafo que sepa trabajar con la luz natural y el espacio disponible. Es nuestra casa: lo hacemos a menudo.',
        },
      ],
    },
    midCta: {
      title: '¿Tenéis fecha y lugar?',
      body: 'Si ya sabéis dónde y cuándo os casáis en Mont-roig o alrededor, escribidnos. Miramos la agenda, os decimos si estamos libres y os enviamos qué incluye cada opción, sin compromiso.',
      label: 'Escribir por WhatsApp',
    },
    photoSpots: {
      title: 'Dónde hacemos las fotos en Mont-roig',
      intro:
        'Pensamos cada boda con el lugar delante. Estos son los rincones de Mont-roig y su término que mejor funcionan ante la cámara, y a qué hora los aprovechamos.',
      items: [
        {
          name: 'Ermita de la Mare de Déu de la Roca',
          body: 'El gran marco de Mont-roig: un santuario encaramado sobre una peña de roca roja, con el mar por un lado y todo el Camp de Tarragona por el otro. Al **atardecer**, cuando el sol bajo calienta la piedra, la roca se enciende literalmente de rojo. Es el momento y el lugar que buscaríamos para los retratos de pareja.',
        },
        {
          name: 'El casco antiguo de piedra roja',
          body: 'Las calles del pueblo viejo, la iglesia de Sant Miquel y los muros de piedra roja dan un fondo cálido y con textura que no encontraréis en la costa. Bueno para los retratos de media tarde y para los planos de vídeo que sitúan la boda en un lugar de verdad, no en un decorado.',
        },
        {
          name: 'El entorno del Mas Miró',
          body: 'La masía y el paisaje que pintó **Joan Miró** —el algarrobo, la era, la montaña al fondo— son parte de la historia del arte del siglo XX. No es plató de fotos comerciales, pero el paisaje de ese trozo de Mont-roig tiene la misma luz y la misma tierra que enamoró al pintor. Un marco con significado.',
        },
        {
          name: 'Viñas, algarrobos y olivos',
          body: 'El término de Mont-roig es campo abierto: hileras de viña, algarrobos viejos y olivos sobre tierra roja. A la hora dorada es uno de los fondos más limpios y luminosos que hay para una pareja, y queda espectacular tanto en foto como en vídeo en movimiento.',
        },
        {
          name: 'Miradores hacia el mar',
          body: 'Desde arriba, el interior de Mont-roig mira a la costa. Los puntos elevados del término ofrecen una línea de horizonte con el mar a lo lejos —lo mejor de los dos mundos: casarse tierra adentro pero con el Mediterráneo presente al fondo de los retratos.',
        },
      ],
    },
    valueExtra: {
      title: 'La luz roja y el legado de Miró',
      paras: [
        'Hay una razón técnica por la que Mont-roig funciona tan bien a última hora: la **piedra es roja**. Cuando el sol de atardecer baja y se calienta, la peña de la Roca y los muros del pueblo rebotan una luz cálida y saturada que en la costa, entre arena clara y blanco, no existe. Nosotros planificamos los retratos de pareja justo en esa ventana, porque aquí la tierra trabaja a vuestro favor.',
        'Y luego está el marco cultural. **Joan Miró** pasó veranos enteros en Mont-roig y dijo una frase que lo resume todo: «es en Mont-roig donde encuentro el color». El paisaje que lo formó —la montaña de la Roca, el algarrobo, la tierra roja— es el mismo que rodea vuestra boda. No hay que forzar nada: este lugar ya tiene una historia que da profundidad a las imágenes.',
        'Casarse en el interior de Mont-roig, y no en la playa, es una decisión de estilo. Significa elegir piedra en vez de arena, viña en vez de paseo marítimo, tranquilidad en vez de temporada alta. Si eso es lo que buscáis, somos los fotógrafos adecuados: conocemos esta zona, trabajamos aquí a menudo y sabemos exactamente cuándo la luz hace su magia.',
      ],
    },
    gallery: {
      title: 'Un poco de nuestro trabajo',
      intro:
        'Todavía no hemos publicado una boda rodada en Mont-roig del Camp, y preferimos decirlo claro antes que montar una galería falsa. Lo que veis aquí es trabajo real nuestro en la Costa Daurada y el Baix Camp, para que sepáis cómo miramos la luz y a las personas.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Cubrís Mont-roig del Camp sin recargo?',
        a: 'Sí. Somos de Reus y Mont-roig entra en nuestra zona de cobertura habitual del Baix Camp y la Costa Daurada. No aplicamos recargo de desplazamiento por una boda aquí.',
      },
      {
        q: '¿Podemos hacer las fotos en la Ermita de la Roca?',
        a: 'Podemos hacer los retratos de pareja si el lugar es accesible el día de la boda —es un santuario público, así que depende de cómo esté y de vuestra logística—. Lo planificamos con vosotros y, si el acceso no acompaña, tenemos alternativas con la misma luz de atardecer cerca.',
      },
      {
        q: '¿Hacéis bodas en la playa de Miami o solo en el interior?',
        a: 'Cubrimos todo el término, costa incluida. Esta página habla del Mont-roig de interior porque es una cara que a menudo se pasa por alto, pero si os casáis en la parte de mar también estamos. Decidnos dónde y os decimos cómo lo trabajaríamos.',
      },
      {
        q: '¿Sois fotógrafo y cámara de vídeo a la vez?',
        a: 'Somos dos hermanos: Ferran hace la fotografía y Eric el vídeo. Tendréis el día entero documentado en ambos formatos con un solo equipo coordinado, sin tener que contratar y coordinar a dos proveedores separados.',
      },
      {
        q: '¿Cuál es la mejor hora para los retratos en Mont-roig?',
        a: 'El atardecer, sin duda. La piedra roja de la Roca y del pueblo se enciende con el sol bajo y da una calidez que no encontraréis al mediodía. Reservamos siempre una ventana en la hora dorada para los retratos de pareja.',
      },
    ],
    finalCta: {
      h2: 'Os acompañamos vuestro día en Mont-roig',
      body: 'Si os casáis en Mont-roig del Camp o alrededor y os encaja cómo miramos, hablémoslo. Sin compromiso: os decimos la disponibilidad, qué incluye cada opción y cómo trabajaríamos vuestro lugar concreto.',
      label: 'Pedir presupuesto',
    },
    formTitle: 'Hablemos de vuestra boda',
    formIntro:
      'Contadnos la fecha, el lugar y cómo os imagináis el día. Os respondemos pronto con la disponibilidad y un presupuesto claro, sin letra pequeña.',
    whatsAppMessage:
      '¡Hola Eric y Ferran! Nos casamos en Mont-roig del Camp y nos gustaría saber vuestra disponibilidad y precios para foto y vídeo.',
    breadcrumbCurrent: 'Mont-roig del Camp',
  },

  // ─────────────────────────── ENGLISH (editorial) ───────────────────────────
  en: {
    meta: {
      title: 'Wedding photographer in Mont-roig del Camp | Lifetime Weddings',
      description:
        "Wedding photography and film in Mont-roig del Camp, in the Baix Camp: Joan Miró's inland village and the Ermita de la Roca. We're based in Reus and cover the area with no travel fee. Message us on WhatsApp.",
    },
    hero: {
      eyebrow: 'Mont-roig del Camp · Baix Camp · since 2020',
      h1: 'Wedding photographer in Mont-roig del Camp',
      sub: "We're Eric and Ferran, two brothers from Reus, one with a stills camera and one with a film camera. What draws us to Mont-roig is the inland side: the red-stone village, the landscapes **Joan Miró** painted, and the **Ermita de la Mare de Déu de la Roca**, perched on its crag. Half an hour from home, with no travel surcharge.",
      heroAlt: 'A couple on their wedding day in the Baix Camp region',
      cta1: 'Check our availability',
    },
    cardTitle: 'Mont-roig del Camp',
    cardBlurb:
      "Miró's inland village and the Ermita de la Roca. Wedding photography and film in the red glow of a Mont-roig sunset.",
    intro: {
      title: 'A village with its own colour',
      paras: [
        "Say «Mont-roig» and most people picture Miami Platja and the coast. We're drawn to the other face of it: the **old town**, inland, where the stone is literally red and the village climbs towards the crag. This is a quieter, more honest Mont-roig, and far more photogenic than people expect.",
        "We won't sell you coves and seafront promenades here — that's the beach's job. What we offer is a setting with history: the landscape that captivated **Joan Miró** («it is at Mont-roig that I find colour») and a hermitage set high on red rock, with the sea on one side and the whole Camp de Tarragona on the other. If you marry here, that's what we work with.",
        'Two brothers, two formats. Ferran shoots the photos, Eric shoots the film. You leave with the whole day documented — stills and motion — through one shared eye, one crew, and no need to coordinate two vendors who have never met. And because we live in Reus, Mont-roig sits inside our usual coverage area: **no travel fee**.',
      ],
    },
    nearbyVenues: {
      title: 'Where you might marry nearby',
      intro:
        "Mont-roig del Camp isn't packed with function halls, and for us that's good news: it forces you to look at the land. These are the spaces around it that we know and would love to work in with you.",
      items: [
        {
          name: 'Parc Samà',
          body: 'Just over towards Cambrils sits one of the most spectacular historic gardens on the Costa Daurada: a central lake, a neo-medieval tower and avenues of palms. If you want a reception in a green, romantic setting minutes from Mont-roig, it is a safe bet. We tell you all about it here.',
          internalSlug: 'parc-sama',
        },
        {
          name: 'Termes de Montbrió',
          body: 'Also in the Baix Camp, a spa resort with a century-old botanical garden — palms, ponds, rare species — that is among the most photogenic settings in the region. It pairs well with an indoor ceremony and sunset portraits among the greenery.',
          internalSlug: 'termes-montbrio',
        },
        {
          name: 'Wineries and farmhouses of the Baix Camp',
          body: "Mont-roig is vine and carob country, within the DO Tarragona. Around it are wineries and rural farmhouses that host small, home-grown weddings. We don't advertise any one in particular — they open and close from year to year — but if you have a place in mind, tell us and we'll be honest about how we'd shoot it.",
        },
        {
          name: 'Country estates in the valley',
          body: "For intimate weddings, the land around Mont-roig has farmhouses and estates with courtyards, threshing floors and views over the Camp. These are places without big-hall infrastructure, and precisely for that reason they need a photographer who can work with natural light and the space that's there. It's home ground for us — we do it often.",
        },
      ],
    },
    midCta: {
      title: 'Have a date and a place?',
      body: 'If you already know where and when you are marrying in or around Mont-roig, write to us. We check the calendar, tell you whether we are free, and send you what each option includes — no obligation.',
      label: 'Message us on WhatsApp',
    },
    photoSpots: {
      title: 'Where we make the pictures in Mont-roig',
      intro:
        'We plan every wedding with the place in front of us. These are the corners of Mont-roig and its surroundings that work best on camera, and the hour we use them.',
      items: [
        {
          name: 'Ermita de la Mare de Déu de la Roca',
          body: "Mont-roig's great backdrop: a sanctuary perched on a crag of red rock, the sea on one side and the whole Camp de Tarragona on the other. At **sunset**, as the low sun warms the stone, the rock quite literally glows red. This is the hour and the place we would seek out for your couple portraits.",
        },
        {
          name: 'The red-stone old town',
          body: "The lanes of the old village, the church of Sant Miquel and the red-stone walls give a warm, textured backdrop you won't find on the coast. Good for late-afternoon portraits and for film shots that root the wedding in a real place, not a set.",
        },
        {
          name: 'The Mas Miró surroundings',
          body: 'The farmhouse and the landscape **Joan Miró** painted — the carob tree, the threshing floor, the mountain behind — are part of twentieth-century art history. It is no commercial photo set, but the land of that corner of Mont-roig holds the same light and the same red earth that captivated the painter. A setting with meaning.',
        },
        {
          name: 'Vines, carob and olive trees',
          body: 'The countryside of Mont-roig is open field: rows of vines, old carob trees and olives over red earth. At golden hour it is one of the cleanest, most luminous backdrops there is for a couple, and it looks striking both as a still and as moving film.',
        },
        {
          name: 'Viewpoints towards the sea',
          body: 'From up here, inland Mont-roig looks out to the coast. The higher points of the area give you a horizon line with the sea in the distance — the best of both worlds: marrying inland yet with the Mediterranean present at the back of the frame.',
        },
      ],
    },
    valueExtra: {
      title: 'The red light and the Miró legacy',
      paras: [
        'There is a technical reason Mont-roig works so well late in the day: the **stone is red**. As the sunset light drops and warms, the crag of la Roca and the village walls bounce back a warm, saturated glow that simply does not exist on the coast, among pale sand and white. We plan the couple portraits for exactly that window, because here the very ground works in your favour.',
        "Then there is the cultural setting. **Joan Miró** spent whole summers in Mont-roig and left a line that says it all: «it is at Mont-roig that I find colour». The landscape that shaped him — the mountain of la Roca, the carob tree, the red earth — is the same one that surrounds your wedding. Nothing needs forcing: this place already carries a story that gives the images depth.",
        'Marrying in inland Mont-roig rather than on the beach is a choice of style. It means stone over sand, vines over promenade, quiet over high season. If that is what you are after, we are the right photographers for it: we know this area, we work here often, and we know exactly when the light does its magic.',
      ],
    },
    gallery: {
      title: 'A little of our work',
      intro:
        "We haven't yet published a wedding filmed in Mont-roig del Camp, and we'd rather say so plainly than build a fake gallery. What you see here is real work of ours across the Costa Daurada and the Baix Camp, so you can tell how we look at light and at people.",
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Do you cover Mont-roig del Camp with no travel fee?',
        a: "Yes. We're based in Reus, and Mont-roig sits inside our usual coverage area across the Baix Camp and the Costa Daurada. We add no travel surcharge for a wedding here.",
      },
      {
        q: 'Can we take the photos at the Ermita de la Roca?',
        a: "We can shoot the couple portraits there if the site is accessible on the day — it's a public sanctuary, so it depends on its condition and your logistics. We plan it with you, and if access doesn't work out we have alternatives nearby with the same sunset light.",
      },
      {
        q: 'Do you shoot on Miami beach or only inland?',
        a: 'We cover the whole municipality, coast included. This page focuses on inland Mont-roig because it is a side that often gets overlooked, but if you marry on the sea side we are there too. Tell us where and we will tell you how we would work it.',
      },
      {
        q: 'Are you both a photographer and a videographer?',
        a: 'We are two brothers: Ferran handles the photography and Eric the film. You get the whole day documented in both formats through one coordinated crew, without having to hire and coordinate two separate vendors.',
      },
      {
        q: 'When is the best time for portraits in Mont-roig?',
        a: 'Sunset, without question. The red stone of la Roca and the village catches fire under the low sun and gives a warmth you will not find at midday. We always keep a window at golden hour reserved for the couple portraits.',
      },
    ],
    finalCta: {
      h2: 'Let us document your day in Mont-roig',
      body: 'If you are marrying in or around Mont-roig del Camp and the way we see things fits, let us talk. No obligation: we tell you our availability, what each option includes, and how we would work your particular place.',
      label: 'Request a quote',
    },
    formTitle: 'Tell us about your wedding',
    formIntro:
      'Tell us the date, the place and how you picture the day. We reply soon with our availability and a clear quote — no small print.',
    whatsAppMessage:
      "Hi Eric and Ferran! We're getting married in Mont-roig del Camp and we'd love to know your availability and prices for photo and film.",
    breadcrumbCurrent: 'Mont-roig del Camp',
  },
};
