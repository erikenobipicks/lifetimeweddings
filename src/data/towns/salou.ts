import type { TownServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const SALOU_TOWN: Record<Lang, TownServiceCopy> = {
  ca: {
    meta: {
      title: 'Fotògraf de boda a Salou | Lifetime Weddings',
      description:
        'Fotògraf i vídeo de boda a Salou (Tarragonès, Costa Daurada). Som dos germans de Reus, a pocs minuts de Salou i **sense recàrrec**. Cales turquesa de Cap Salou, el far i el passeig de palmeres. Foto i vídeo, entrega en ~1 setmana i tracte en anglès per a parelles internacionals.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Tarragonès',
      h1: 'Fotògraf de boda a Salou',
      sub: 'Som en **Ferran** (foto) i l’**Eric** (vídeo), dos germans amb base a **Reus**, a un salt de Salou. Fem servir les **cales turquesa de Cap Salou**, el **far** i el **passeig de palmeres** com a plató natural. Bodes nacionals i internacionals, amb tracte proper i honest.',
      heroAlt:
        'Parella el dia de la seva boda en una cala de Cap Salou, amb pins i aigua turquesa de fons',
      cta1: 'Mirem dates per a la vostra boda',
    },
    cardTitle: 'Boda a Salou',
    cardBlurb:
      'Cales de Cap Salou, far i palmeres. Foto i vídeo per dos germans de Reus, sense recàrrec de desplaçament.',
    intro: {
      title: 'Salou, un destí de boda a tocar de casa',
      paras: [
        'Salou és molt més que la imatge d’estiu que tothom té al cap. A pocs metres del bullici hi ha el **Cap Salou**, un rocam de **cales turquesa envoltades de pins** —la **Cala Crancs** n’és la joia— que semblen tretes d’una altra costa. Aquí la llum de mar rebota entre el blanc de la roca i el verd del pinar, i les fotos respiren. Per a nosaltres és un dels racons més agraïts del Tarragonès per fotografiar una parella.',
        'Treballem des de **Reus**, a poc més d’un quart d’hora de Salou, així que venir aquí no és cap “desplaçament” per a nosaltres: és el nostre terreny. Per això **cobrim Salou sense recàrrec**. Coneixem l’hora bona a cada cala, sabem on aparca el cotxe més a prop i quins passeigs eviten la gentada al juliol. Aquesta feina prèvia és la que fa que el dia flueixi sense presses.',
        'Salou rep moltes parelles de fora —de la resta de l’Estat i de l’estranger— que trien la Costa Daurada per casar-se de cara al mar. Ens hi movem amb naturalitat: **parlem anglès** i estem acostumats a coordinar-nos amb parelles que ho organitzen tot a distància. Siguem la vostra ciutat o un destí escollit des de lluny, l’objectiu és el mateix: un reportatge honest, càlid i que sembli vostre.',
      ],
    },
    nearbyVenues: {
      title: 'Espais de boda a Salou i el voltant',
      intro:
        'Parlem del que coneixem de primera mà. Aquests són alguns dels espais que millor funcionen a la zona, amb el nostre criteri de fotògraf sobre la llum, els espais i el ritme del dia.',
      items: [
        {
          name: 'Hotels amb saló de boda de cara al mar',
          body: 'Salou concentra **hotels amb saló de banquet i terrassa sobre la platja**, ideals per a un còctel a l’hora daurada amb el Mediterrani de fons. Donen molt de joc: interior climatitzat per si el sol aprieta i sortida ràpida a la sorra per als retrats de capvespre.',
        },
        {
          name: 'Parc Samà (Cambrils)',
          body: 'A un pas de Salou, el **Parc Samà** és un jardí romàntic del segle XIX amb llac, palmeres i racons ombrívols: una **benedicció per fotografiar** en ple estiu i un dels nostres espais preferits del voltant per a qui vol verd i frescor sense allunyar-se de la costa.',
          internalSlug: 'parc-sama',
        },
        {
          name: 'Mas Passamaner (La Selva del Camp)',
          body: 'Si busqueu una **masia senyorial** amb jardins i arquitectura de caràcter a mitja hora de Salou, el **Mas Passamaner** és una aposta segura: espais amplis, molta pedra i una llum interior molt agraïda per als preparatius.',
          internalSlug: 'mas-passamaner',
        },
        {
          name: 'Masies i celleres de l’entorn',
          body: 'Entre Salou, Reus i el Baix Camp hi ha **masies i celleres** per a una boda més íntima i de camp a pocs minuts del mar. Sovint combinem cerimònia al camp i retrats de capvespre baixant fins a una cala.',
        },
      ],
    },
    midCta: {
      title: 'Els bons dissabtes d’estiu volen ràpid',
      body: 'A Salou, els caps de setmana de temporada s’omplen amb molta antelació. Si teniu data —o encara hi doneu voltes—, escriviu-nos i us diem de seguida si la tenim lliure, sense compromís.',
      label: 'Consultar la nostra disponibilitat',
    },
    photoSpots: {
      title: 'On fem les fotos a Salou',
      intro:
        'Aquests són els racons de Salou que millor funcionen davant la càmera. No cal recórrer-los tots: en triem dos o tres segons l’hora, la llum i el que us sigui còmode.',
      items: [
        {
          name: 'Cala Crancs i les cales de Cap Salou',
          body: 'El nostre racó estrella: **pins fins a la vora de l’aigua** i un **turquesa** que no sembla del Mediterrani. Perfecte per a retrats a última hora de la tarda, quan baixa la gent i la llum es torna daurada.',
        },
        {
          name: 'Far de Salou',
          body: 'El **far**, dalt del Cap Salou, dona horitzó i silueta neta contra el cel. Funciona molt bé al capvespre i per als plans més cinematogràfics.',
        },
        {
          name: 'Passeig Jaume I i la Font Cibernètica',
          body: 'La **filera de palmeres** del passeig marítim i la **Font Cibernètica** aporten el Salou més reconeixible, ideal per passejar sense pressa.',
        },
        {
          name: 'Torre Vella',
          body: 'La **Torre Vella**, del segle XVI, ofereix pedra i jardí enmig del poble: un contrapunt càlid als blaus de la costa.',
        },
        {
          name: 'Platja de Llevant a l’alba',
          body: 'Per a qui matina, la **Platja de Llevant a trenc d’alba** és sorra buida, mar en calma i una llum rosada immillorable per a retrats íntims.',
        },
      ],
    },
    valueExtra: {
      title: 'Bodes de destí a la Costa Daurada, ben portades',
      paras: [
        'Moltes parelles que es casen a Salou ho fan des de lluny: trien la Costa Daurada per la platja i el clima, però ho organitzen tot per telèfon i correu. Aquí us ajudem a **quadrar l’horari del dia amb la llum**, perquè els retrats caiguin a l’hora daurada i no al migdia quan el sol crema, i us avancem què esperar de cada cala segons el mes.',
        'Amb parelles internacionals ens **coordinem en anglès** de principi a fi, i estem avesats a treballar amb *wedding planners* i famílies de diversos països. Sabem gestionar el ritme d’una cerimònia bilingüe i captar els gestos que travessen qualsevol idioma.',
        'I un detall que s’agraeix a l’estiu: **coneixem les cales més tranquil·les** i les hores sense gentada. Això vol dir retrats sense desconeguts de fons i una parella relaxada, que és el que de veritat es nota a les fotos.',
      ],
    },
    gallery: {
      title: 'Una mirada a la nostra feina',
      intro:
        'Una selecció del nostre estil: natural, càlid i sense poses forçades. Si voleu veure un reportatge sencer d’una boda semblant a la vostra, demaneu-nos-el i us l’ensenyem.',
    },
    faqTitle: 'Preguntes freqüents sobre bodes a Salou',
    faqs: [
      {
        q: 'Cobriu Salou sense recàrrec de desplaçament?',
        a: 'Sí. Som de **Reus**, a un quart d’hora llarg de Salou, així que **no apliquem cap recàrrec** per venir. Salou és zona habitual per a nosaltres.',
      },
      {
        q: 'Feu foto i vídeo alhora?',
        a: 'Sí. Som dos germans: en **Ferran** fa la fotografia i l’**Eric** el vídeo. Treballar junts ens permet **cobrir el mateix moment des de dos punts de vista** sense trepitjar-nos ni doblar la presència.',
      },
      {
        q: 'Quan tindrem les fotos?',
        a: 'Us fem arribar una **primera selecció en aproximadament una setmana** perquè pugueu gaudir del reportatge de seguida. El lliurament complet arriba després, ja editat amb calma.',
      },
      {
        q: 'Som una parella internacional, treballeu en anglès?',
        a: 'És clar. **Parlem anglès** i estem acostumats a bodes de destí amb parelles i convidats de fora. Ens coordinem a distància sense problema i el dia de la boda ens entenem amb tothom.',
      },
      {
        q: 'Volem casar-nos a la platja o en una cala, es pot?',
        a: 'Sí, tot i que les **cerimònies a la platja poden necessitar permís municipal** i cal tenir en compte la gent a l’estiu. Us orientem sobre horaris i racons més tranquils; el permís el tramita normalment la parella o el planner, i nosaltres ens adaptem al que decidiu.',
      },
    ],
    finalCta: {
      h2: 'Expliquem-nos la vostra boda a Salou',
      body: 'Si us imagineu casant-vos entre les cales de Cap Salou i el passeig de palmeres, ens encantaria formar-ne part. Escriviu-nos sense compromís i us responem de seguida.',
      label: 'Escriure’ns per WhatsApp',
    },
    formTitle: 'Parlem de la vostra boda',
    formIntro:
      'Digueu-nos la data (o les dates que valoreu), l’espai si ja el teniu i si voleu foto, vídeo o tots dos. Us responem amb disponibilitat i pressupost.',
    whatsAppMessage:
      'Hola Ferran i Eric! Ens casem a Salou i ens agradaria consultar-vos disponibilitat i pressupost de foto i vídeo.',
    breadcrumbCurrent: 'Fotògraf de boda a Salou',
  },

  es: {
    meta: {
      title: 'Fotógrafo de boda en Salou | Lifetime Weddings',
      description:
        'Fotógrafo y vídeo de boda en Salou (Tarragonès, Costa Daurada). Somos dos hermanos de Reus, a pocos minutos de Salou y **sin recargo**. Calas turquesa de Cap Salou, el faro y el paseo de palmeras. Foto y vídeo, entrega en ~1 semana y trato en inglés para parejas internacionales.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Tarragonès',
      h1: 'Fotógrafo de boda en Salou',
      sub: 'Somos **Ferran** (foto) y **Eric** (vídeo), dos hermanos con base en **Reus**, a un salto de Salou. Usamos las **calas turquesa de Cap Salou**, el **faro** y el **paseo de palmeras** como plató natural. Bodas nacionales e internacionales, con trato cercano y honesto.',
      heroAlt:
        'Pareja el día de su boda en una cala de Cap Salou, con pinos y agua turquesa de fondo',
      cta1: 'Miremos fechas para vuestra boda',
    },
    cardTitle: 'Boda en Salou',
    cardBlurb:
      'Calas de Cap Salou, faro y palmeras. Foto y vídeo por dos hermanos de Reus, sin recargo de desplazamiento.',
    intro: {
      title: 'Salou, un destino de boda a un paso de casa',
      paras: [
        'Salou es mucho más que la imagen veraniega que todos tenemos en la cabeza. A pocos metros del bullicio está el **Cap Salou**, un rosario de **calas turquesa rodeadas de pinos** —la **Cala Crancs** es la joya— que parecen sacadas de otra costa. Aquí la luz del mar rebota entre el blanco de la roca y el verde del pinar, y las fotos respiran. Para nosotros es uno de los rincones más agradecidos del Tarragonès para fotografiar a una pareja.',
        'Trabajamos desde **Reus**, a poco más de un cuarto de hora de Salou, así que venir aquí no es ningún “desplazamiento” para nosotros: es nuestro terreno. Por eso **cubrimos Salou sin recargo**. Conocemos la hora buena de cada cala, sabemos dónde aparcar más cerca y qué paseos evitan el gentío en julio. Ese trabajo previo es lo que hace que el día fluya sin prisas.',
        'Salou recibe muchas parejas de fuera —del resto del país y del extranjero— que eligen la Costa Daurada para casarse frente al mar. Nos movemos con naturalidad: **hablamos inglés** y estamos acostumbrados a coordinarnos con parejas que lo organizan todo a distancia. Sea vuestra ciudad o un destino elegido desde lejos, el objetivo es el mismo: un reportaje honesto, cálido y que parezca vuestro.',
      ],
    },
    nearbyVenues: {
      title: 'Espacios de boda en Salou y alrededores',
      intro:
        'Hablamos de lo que conocemos de primera mano. Estos son algunos de los espacios que mejor funcionan en la zona, con nuestro criterio de fotógrafo sobre la luz, los espacios y el ritmo del día.',
      items: [
        {
          name: 'Hoteles con salón de boda frente al mar',
          body: 'Salou concentra **hoteles con salón de banquete y terraza sobre la playa**, ideales para un cóctel a la hora dorada con el Mediterráneo de fondo. Dan mucho juego: interior climatizado por si el sol aprieta y salida rápida a la arena para los retratos de atardecer.',
        },
        {
          name: 'Parc Samà (Cambrils)',
          body: 'A un paso de Salou, el **Parc Samà** es un jardín romántico del siglo XIX con lago, palmeras y rincones sombríos: una **bendición para fotografiar** en pleno verano y uno de nuestros espacios favoritos del entorno para quien quiere verde y frescor sin alejarse de la costa.',
          internalSlug: 'parc-sama',
        },
        {
          name: 'Mas Passamaner (La Selva del Camp)',
          body: 'Si buscáis una **masía señorial** con jardines y arquitectura de carácter a media hora de Salou, el **Mas Passamaner** es una apuesta segura: espacios amplios, mucha piedra y una luz interior muy agradecida para los preparativos.',
          internalSlug: 'mas-passamaner',
        },
        {
          name: 'Masías y bodegas del entorno',
          body: 'Entre Salou, Reus y el Baix Camp hay **masías y bodegas** para una boda más íntima y de campo a pocos minutos del mar. A menudo combinamos ceremonia en el campo y retratos de atardecer bajando hasta una cala.',
        },
      ],
    },
    midCta: {
      title: 'Los buenos sábados de verano vuelan',
      body: 'En Salou, los fines de semana de temporada se llenan con mucha antelación. Si tenéis fecha —o todavía le dais vueltas—, escribidnos y os decimos enseguida si la tenemos libre, sin compromiso.',
      label: 'Consultar nuestra disponibilidad',
    },
    photoSpots: {
      title: 'Dónde hacemos las fotos en Salou',
      intro:
        'Estos son los rincones de Salou que mejor funcionan ante la cámara. No hace falta recorrerlos todos: elegimos dos o tres según la hora, la luz y lo que os resulte cómodo.',
      items: [
        {
          name: 'Cala Crancs y las calas de Cap Salou',
          body: 'Nuestro rincón estrella: **pinos hasta la orilla del agua** y un **turquesa** que no parece del Mediterráneo. Perfecto para retratos a última hora de la tarde, cuando baja la gente y la luz se vuelve dorada.',
        },
        {
          name: 'Faro de Salou',
          body: 'El **faro**, en lo alto del Cap Salou, aporta horizonte y una silueta limpia contra el cielo. Funciona muy bien al atardecer y para los planos más amplios y cinematográficos.',
        },
        {
          name: 'Paseo Jaume I y la Fuente Cibernética',
          body: 'La **hilera de palmeras** del paseo marítimo y la **Fuente Cibernética** aportan el Salou más reconocible. Ideal para pasear sin prisa y conseguir imágenes con ritmo y movimiento.',
        },
        {
          name: 'Torre Vella',
          body: 'La **Torre Vella**, del siglo XVI, ofrece piedra, jardín y un punto de historia en medio del pueblo. Un contrapunto cálido y tranquilo a los azules de la costa.',
        },
        {
          name: 'Playa de Llevant al amanecer',
          body: 'Para quien se atreve a madrugar, la **Playa de Llevant al amanecer** es arena vacía, mar en calma y una luz suave y rosada inmejorable para retratos íntimos.',
        },
      ],
    },
    valueExtra: {
      title: 'Bodas de destino en la Costa Daurada, bien llevadas',
      paras: [
        'Muchas parejas que se casan en Salou lo hacen desde lejos: eligen la Costa Daurada por la playa y el clima, pero lo organizan todo por teléfono y correo. Aquí nuestro trabajo no es solo fotográfico. Os ayudamos a **cuadrar el horario del día con la luz**, para que los retratos caigan a la hora dorada y no al mediodía cuando el sol quema; y os adelantamos qué esperar de cada cala y playa según el mes.',
        'Con parejas internacionales nos **coordinamos en inglés** de principio a fin, y estamos habituados a trabajar con *wedding planners* y con familias que llegan de varios países. Sabemos gestionar el ritmo de una ceremonia bilingüe y captar los gestos que atraviesan cualquier idioma.',
        'Y un detalle práctico que se agradece en verano: **conocemos las calas más tranquilas** y las horas en que aún no hay gentío. Eso significa retratos sin desconocidos de fondo y una pareja relajada, que es lo que de verdad se nota en las fotos.',
      ],
    },
    gallery: {
      title: 'Una mirada a nuestro trabajo',
      intro:
        'Una selección de nuestro estilo: natural, cálido y sin poses forzadas. Si queréis ver un reportaje entero de una boda parecida a la vuestra, pedídnoslo y os lo enseñamos.',
    },
    faqTitle: 'Preguntas frecuentes sobre bodas en Salou',
    faqs: [
      {
        q: '¿Cubrís Salou sin recargo de desplazamiento?',
        a: 'Sí. Somos de **Reus**, a un cuarto de hora largo de Salou, así que **no aplicamos ningún recargo** por venir. Salou es zona habitual para nosotros.',
      },
      {
        q: '¿Hacéis foto y vídeo a la vez?',
        a: 'Sí. Somos dos hermanos: **Ferran** hace la fotografía y **Eric** el vídeo. Trabajar juntos nos permite **cubrir el mismo momento desde dos puntos de vista** sin pisarnos ni doblar la presencia.',
      },
      {
        q: '¿Cuándo tendremos las fotos?',
        a: 'Os hacemos llegar una **primera selección en aproximadamente una semana** para que disfrutéis del reportaje enseguida. La entrega completa llega después, ya editada con calma.',
      },
      {
        q: 'Somos una pareja internacional, ¿trabajáis en inglés?',
        a: 'Por supuesto. **Hablamos inglés** y estamos acostumbrados a bodas de destino con parejas e invitados de fuera. Nos coordinamos a distancia sin problema y el día de la boda nos entendemos con todo el mundo.',
      },
      {
        q: 'Queremos casarnos en la playa o en una cala, ¿se puede?',
        a: 'Sí, aunque las **ceremonias en la playa pueden necesitar permiso municipal** y hay que tener en cuenta a la gente en verano. Os orientamos sobre horarios y rincones más tranquilos; el permiso lo tramita normalmente la pareja o el planner, y nosotros nos adaptamos a lo que decidáis.',
      },
    ],
    finalCta: {
      h2: 'Contadnos vuestra boda en Salou',
      body: 'Si os imagináis casándoos entre las calas de Cap Salou y el paseo de palmeras, nos encantaría formar parte de ello. Escribidnos sin compromiso y os respondemos enseguida.',
      label: 'Escribirnos por WhatsApp',
    },
    formTitle: 'Hablemos de vuestra boda',
    formIntro:
      'Decidnos la fecha (o las fechas que valoráis), el espacio si ya lo tenéis y si queréis foto, vídeo o ambos. Os respondemos con disponibilidad y presupuesto.',
    whatsAppMessage:
      '¡Hola Ferran y Eric! Nos casamos en Salou y nos gustaría consultaros disponibilidad y presupuesto de foto y vídeo.',
    breadcrumbCurrent: 'Fotógrafo de boda en Salou',
  },

  en: {
    meta: {
      title: 'Wedding photographer in Salou | Lifetime Weddings',
      description:
        'Wedding photographer and videographer in Salou (Tarragonès, Costa Daurada, Spain). We are two brothers based in Reus, minutes from Salou and **with no travel fee**. The turquoise coves of Cap Salou, the lighthouse and the palm-lined promenade. Photo and video, a first edit in about a week, and everything handled in **English** for international couples.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Tarragona, Spain',
      h1: 'Wedding photographer in Salou',
      sub: 'We are **Ferran** (photo) and **Eric** (video), two brothers based in **Reus**, a short hop from Salou. We use the **turquoise coves of Cap Salou**, the **lighthouse** and the **palm-lined promenade** as our natural set. National and international weddings, with a warm, honest approach — **all in English** when you need it.',
      heroAlt:
        'Couple on their wedding day in a cove at Cap Salou, with pines and turquoise water behind them',
      cta1: 'Let’s check dates for your wedding',
    },
    cardTitle: 'Weddings in Salou',
    cardBlurb:
      'The coves of Cap Salou, the lighthouse and the palms. Photo and video by two brothers from Reus, no travel fee.',
    intro: {
      title: 'Salou, a destination wedding right on our doorstep',
      paras: [
        'Salou is far more than the summer postcard most people picture. A few steps from the bustle lies **Cap Salou**, a headland of **turquoise coves ringed by pine trees** — **Cala Crancs** is the jewel — that could belong to another coastline entirely. Here the sea light bounces between the white rock and the green of the pines, and the photographs breathe. For us it is one of the most rewarding corners of the Tarragona coast to photograph a couple.',
        'We work out of **Reus**, just over fifteen minutes from Salou, so coming here is no “trip” for us — it is home ground. That is why we **cover Salou with no travel fee**. We know the golden hour at each cove, where to park closest, and which walks dodge the July crowds. That groundwork is what lets the day flow without rushing.',
        'Salou draws many couples from beyond Catalonia — from the rest of Spain and from abroad — who choose the Costa Daurada to marry by the sea. We move through it easily: we **work in English** and are used to coordinating with couples who plan the whole thing remotely. Whether it is your hometown or a destination chosen from afar, the aim is the same: an honest, warm story that looks like *you*.',
      ],
    },
    nearbyVenues: {
      title: 'Wedding venues in and around Salou',
      intro:
        'We only talk about what we know first-hand. These are some of the spaces that work best in the area, with a photographer’s eye on the light, the rooms and the rhythm of the day.',
      items: [
        {
          name: 'Seafront hotels with a wedding hall',
          body: 'Salou is full of **hotels with a banquet hall and a terrace over the beach** — perfect for a golden-hour cocktail with the Mediterranean behind you. We love them because they give you options: an air-conditioned room if the sun is fierce, and a quick step onto the sand for sunset portraits. We help you pick the space based on where the light falls at your time of day.',
        },
        {
          name: 'Parc Samà (Cambrils)',
          body: 'A short drive from Salou, **Parc Samà** is a romantic 19th-century garden with a lake, palm trees and shady corners — a real **gift to photograph** in high summer. One of our favourite nearby settings for couples who want greenery and shade without leaving the coast.',
          internalSlug: 'parc-sama',
        },
        {
          name: 'Mas Passamaner (La Selva del Camp)',
          body: 'If you are after a **stately country manor** with gardens and character architecture half an hour from Salou, **Mas Passamaner** is a safe bet. Generous spaces, plenty of stone and greenery, and a soft interior light that is lovely for the getting-ready moments.',
          internalSlug: 'mas-passamaner',
        },
        {
          name: 'Country estates and wineries nearby',
          body: 'Between Salou, Reus and the Baix Camp there are **masies (country estates) and wineries** that allow a more intimate, rural wedding just minutes from the sea. We suggest them according to the style you are after; we often pair a countryside ceremony with sunset portraits down at a cove.',
        },
      ],
    },
    midCta: {
      title: 'The best summer Saturdays go fast',
      body: 'In Salou, peak-season weekends book up well ahead. If you have a date — or are still weighing a few — write to us and we will tell you straight away whether it is free, with no obligation.',
      label: 'Check our availability',
    },
    photoSpots: {
      title: 'Where we shoot in Salou',
      intro:
        'These are the corners of Salou that work best on camera. There is no need to cover them all: we pick two or three based on the hour, the light and what feels comfortable for you.',
      items: [
        {
          name: 'Cala Crancs and the Cap Salou coves',
          body: 'Our star spot: **pines running right down to the water** and a **turquoise** that hardly looks Mediterranean. Perfect for portraits in the late afternoon, when the crowds thin out and the light turns golden.',
        },
        {
          name: 'Salou lighthouse',
          body: 'The **lighthouse** atop Cap Salou gives you horizon and a clean silhouette against the sky. It shines at dusk and for the wider, more cinematic frames.',
        },
        {
          name: 'Passeig Jaume I and the Cybernetic Fountain',
          body: 'The **row of palm trees** along the seafront promenade and the **Cybernetic Fountain** give you the most recognisable Salou. Great for a relaxed stroll and images with movement and rhythm.',
        },
        {
          name: 'Torre Vella',
          body: 'The **Torre Vella**, a 16th-century tower, offers stone, a garden and a touch of history in the heart of town — a warm, quiet counterpoint to the blues of the coast.',
        },
        {
          name: 'Llevant beach at sunrise',
          body: 'For those willing to rise early, **Llevant beach at sunrise** means empty sand, a calm sea and a soft, rosy light that is unbeatable for intimate portraits.',
        },
      ],
    },
    valueExtra: {
      title: 'Destination weddings on the Costa Daurada, handled with care',
      paras: [
        'Many couples who marry in Salou do so from afar: they choose the Costa Daurada for the beach and the climate, but plan everything by phone and email. Here our work is not only photographic. We help you **match the day’s timeline to the light**, so the portraits fall at golden hour rather than at noon when the sun is harsh; and we tell you in advance what to expect from each cove and beach depending on the month.',
        'With international couples we **coordinate entirely in English**, from the first message to the final delivery, and we are well used to working alongside *wedding planners* and families arriving from several countries. We know how to hold the rhythm of a bilingual ceremony and to catch the gestures that cross any language.',
        'And one practical detail you will appreciate in summer: we **know the quietest coves** and the hours before the crowds arrive. That means portraits with no strangers in the background and a couple who feel relaxed — which is exactly what shows in the photographs.',
      ],
    },
    gallery: {
      title: 'A look at our work',
      intro:
        'A selection of our style: natural, warm and free of stiff poses. If you would like to see a full story from a wedding similar to yours, just ask and we will share one.',
    },
    faqTitle: 'Frequently asked questions about weddings in Salou',
    faqs: [
      {
        q: 'Do you cover Salou with no travel fee?',
        a: 'Yes. We are based in **Reus**, a good fifteen minutes from Salou, so we **charge no travel fee** to come here. Salou is regular ground for us.',
      },
      {
        q: 'Do you do photo and video together?',
        a: 'Yes. We are two brothers: **Ferran** shoots the photography and **Eric** the video. Working as a team lets us **cover the same moment from two angles** without getting in each other’s way or doubling the on-camera presence.',
      },
      {
        q: 'When will we get the photos?',
        a: 'We send you a **first selection in about a week** so you can enjoy the story right away. The full, carefully edited delivery follows after that.',
      },
      {
        q: 'We are an international couple — do you work in English?',
        a: 'Absolutely. We **work in English** and are used to destination weddings with couples and guests from abroad. We coordinate remotely without any trouble, and on the day itself we get along with everyone.',
      },
      {
        q: 'We would like a beach or cove ceremony — is that possible?',
        a: 'Yes, though **beach ceremonies may need a municipal permit** and you have to factor in the summer crowds. We advise you on timing and on the quieter spots; the permit is usually arranged by the couple or the planner, and we adapt to whatever you decide.',
      },
    ],
    finalCta: {
      h2: 'Tell us about your Salou wedding',
      body: 'If you picture yourselves marrying among the coves of Cap Salou and the palm-lined promenade, we would love to be part of it. Write to us with no obligation and we will get back to you quickly.',
      label: 'Message us on WhatsApp',
    },
    formTitle: 'Let’s talk about your wedding',
    formIntro:
      'Tell us your date (or the dates you are considering), your venue if you already have one, and whether you would like photo, video or both. We will reply with availability and a quote.',
    whatsAppMessage:
      'Hi Ferran and Eric! We are getting married in Salou and would love to check your availability and pricing for photo and video.',
    breadcrumbCurrent: 'Wedding photographer in Salou',
  },
};
