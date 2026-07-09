import type { TownServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

// Cambrils (Baix Camp · Costa Daurada) town landing.
// Own content, distinct from other coastal landings: leans on the fishing
// port + gastronomy angle and the historic gardens of Parc Samà. Nearby
// venues described from public knowledge; Parc Samà links INTERNALLY to our
// own fiche. No invented weddings or couples.

export const CAMBRILS_TOWN: Record<Lang, TownServiceCopy> = {
  ca: {
    meta: {
      title: 'Fotògraf de boda a Cambrils | Lifetime Weddings',
      description:
        "Fotògraf i càmera de boda a Cambrils, al Baix Camp. Coneixem el port, el nucli antic i els jardins de Parc Samà. Cobrim la Costa Daurada sense recàrrec. Escriviu-nos pel WhatsApp.",
    },
    hero: {
      eyebrow: 'Cambrils · Baix Camp · Costa Daurada',
      h1: 'Fotògraf de boda a Cambrils',
      sub: "Som en Ferran i l'Eric, dos germans de Reus amb càmera de foto i de vídeo. Cambrils és a un quart d'hora de casa, i la coneixem de veritat: el port pesquer, la llum del passeig marítim i els jardins de Parc Samà. La cobrim sense recàrrec de desplaçament.",
      heroAlt: 'Parella el dia de la seva boda a la Costa Daurada',
      cta1: 'Consulteu la vostra data',
    },
    cardTitle: 'Cambrils',
    cardBlurb:
      "Port pesquer, gastronomia de nivell i els jardins de Parc Samà. Coneixem Cambrils pam a pam.",
    intro: {
      title: 'La boda a Cambrils, explicada per qui hi treballa a prop',
      paras: [
        "**Cambrils és la capital gastronòmica de la Costa Daurada**, i això es nota el dia d'una boda. És un poble que sap rebre, amb restaurants i masies que porten dècades servint banquets, un port pesquer viu i una franja de costa que canvia de llum al llarg del dia. Nosaltres som de Reus, a quinze minuts, i venim a Cambrils tot l'any — no som un equip que hi aterra el dia de la boda sense saber on és el sol a les set de la tarda.",
        "Treballem en **foto i vídeo alhora**, dos germans amb dos formats: en Ferran fa la fotografia i l'Eric el vídeo. Sortireu del vostre dia amb tot documentat per una sola mirada, sense coordinar dos proveïdors que no s'han vist mai. I com que Cambrils entra dins la nostra zona habitual, **no us cobrem desplaçament**.",
        "Aquí us expliquem els espais on es casa la gent a Cambrils i rodalies, els racons on fem els retrats i com aprofitem la llum del port i dels jardins. Tot amb criteri de fotògraf.",
      ],
    },
    nearbyVenues: {
      title: 'On es casa la gent a Cambrils i el Baix Camp',
      intro:
        "Aquests són alguns dels espais que millor coneixem a la zona. En parlem amb criteri fotogràfic: com és la llum, què funciona per als retrats i on posem els convidats.",
      items: [
        {
          name: 'Parc Samà',
          body: "Els **jardins colonials del segle XIX** més espectaculars de la zona: un llac central amb reflexos, avingudes de palmeres, una torre neomedieval i una llum verda que es filtra entre els arbres tropicals. És un dels millors venues de la Costa Daurada per als retrats, i l'hora daurada entre les palmeres és difícil d'igualar. En parlem a fons a la nostra fitxa.",
          internalSlug: 'parc-sama',
        },
        {
          name: 'Masies del Baix Camp',
          body: "Al voltant de Cambrils i cap a l'interior hi ha masies i finques amb pati, pedra i vinya que funcionen molt bé per a un casament de tarda. Ofereixen ombra al migdia i racons recollits per als retrats, lluny del vent de la costa. Us ajudem a triar segons la llum i l'hora de la vostra cerimònia.",
        },
        {
          name: 'Espais i restaurants del port',
          body: "Cambrils té restaurants i sales de banquet a tocar del **port pesquer**, amb l'aigua i les barques com a teló de fons. Són una opció natural si voleu quedar-vos a prop del mar tot el dia i aprofitar la posta de sol sobre el moll sense fer trasllats llargs.",
        },
      ],
    },
    midCta: {
      title: 'Mireu si tenim lliure la vostra data',
      body: "Documentem un nombre limitat de bodes l'any per dedicar-nos-hi de veritat. Si us caseu a Cambrils o al voltant, escriviu-nos aviat i us diem si tenim el dia lliure.",
      label: 'Comprovar disponibilitat',
    },
    photoSpots: {
      title: 'Els racons de Cambrils on fem els retrats',
      intro:
        "Quan la cerimònia i el banquet ens deixen una estona, aquests són els llocs de Cambrils on ens agrada portar la parella. Cap desviament llarg: tot és a prop.",
      items: [
        {
          name: 'El port pesquer i la llotja',
          body: "El **port de Cambrils** és el cor del poble: barques, xarxes i la llum reflectida a l'aigua. A primera hora o al capvespre és un escenari honest i molt seu, res de postal genèrica de costa.",
        },
        {
          name: 'El passeig marítim',
          body: "Palmeres, l'horitzó del mar i espai per caminar sense presses. El passeig dóna aire als retrats i, al capvespre, una llum càlida que embolcalla la parella.",
        },
        {
          name: "La Torre de l'Ereta",
          body: "Una **torre de guaita del segle XVII** que recorda que Cambrils vigilava el mar des de fa segles. Aporta pedra i història als retrats sense allunyar-se del centre.",
        },
        {
          name: 'El nucli antic (la Vila)',
          body: "Carrerons, pedra i l'església de Santa Maria terra endins. La Vila de Cambrils és el contrapunt tranquil al port: ombra al migdia i racons recollits quan bufa el vent.",
        },
        {
          name: 'La platja a trenc d\'alba',
          body: "Si us hi animeu, una sessió a la sorra just quan surt el sol regala la llum més neta de tot el dia i una platja per a vosaltres sols, abans que arribi ningú.",
        },
      ],
    },
    valueExtra: {
      title: "Per què Cambrils és fàcil de fotografiar (i de menjar-hi bé)",
      paras: [
        "**La gastronomia juga a favor vostre.** Cambrils és capital gastronòmica de la Costa Daurada, i els banquets de la zona estan a un nivell alt. Per a nosaltres això és una bona notícia: quan el menjar i el servei estan cuidats, els convidats estan relaxats i la festa es fotografia sola. Nosaltres treballem el moment sense interrompre'l.",
        "**La llum del port és la millor de la tarda.** L'aigua rebota la llum i suavitza les ombres, i el moll ofereix una posta de sol neta sobre l'horitzó. Si el vostre espai és a prop del port, us proposarem sortir uns minuts al capvespre — és quan surten els millors retrats.",
        "**Jardins o platja, dues bodes diferents.** Parc Samà us dóna un marc romàntic i verd, amb ombra i arquitectura; la costa us dóna horitzó, sorra i llum oberta. Cap de les dues és millor: depèn de vosaltres i de l'hora. Us ajudem a decidir segons com vulgueu que es vegi el dia.",
      ],
    },
    gallery: {
      title: 'Una mica de la nostra feina',
      intro:
        "Una selecció del nostre estil: natural, sense poses forçades, atenta a la llum i als moments de veritat. Us en podem ensenyar molta més en una trucada.",
    },
    faqTitle: 'Preguntes freqüents sobre casar-se a Cambrils',
    faqs: [
      {
        q: 'Cobriu Cambrils sense recàrrec de desplaçament?',
        a: 'Sí. Som de Reus, a quinze minuts, i Cambrils entra dins la nostra zona habitual. No us cobrem cap suplement per venir.',
      },
      {
        q: 'Feu foto i vídeo alhora?',
        a: "Sí, i és el que ens diferencia. En Ferran fa la fotografia i l'Eric el vídeo. Un sol equip, una sola mirada i tot el dia documentat en tots dos formats, sense coordinar proveïdors externs.",
      },
      {
        q: 'Heu fotografiat bodes a Parc Samà?',
        a: "Encara no, i preferim dir-ho clar. Coneixem molt bé l'espai — el llac, les palmeres, la torre — i sabem exactament com el treballaríem. Quan una parella ens hi porti, ho farem com sabem: sense pressa i mirant la llum.",
      },
      {
        q: 'Millor casar-se al port, en una masia o a Parc Samà?',
        a: "Depèn del que busqueu. El port us dóna mar i posta de sol; una masia, recolliment i ombra; Parc Samà, jardins romàntics i arquitectura. Us ajudem a triar segons l'hora de la cerimònia i l'estil que vulgueu.",
      },
      {
        q: 'Quan hauríem de reservar-vos?',
        a: "Com abans millor. Documentem un nombre limitat de bodes l'any i les dates de temporada alta a la Costa Daurada volen. Escriviu-nos amb la data i us diem de seguida si la tenim lliure.",
      },
    ],
    finalCta: {
      h2: 'Us caseu a Cambrils?',
      body: "Expliqueu-nos com us imagineu el dia i on us caseu. Us responem amb sinceritat: disponibilitat, com treballem i què inclou tot. Sense compromís.",
      label: 'Escriviu-nos',
    },
    formTitle: 'Parlem de la vostra boda a Cambrils',
    formIntro:
      "Deixeu-nos la data i l'espai i us contestem aviat, amb honestedat i sense pressió.",
    whatsAppMessage:
      'Hola Ferran i Eric! Ens casem a Cambrils i voldríem consultar la vostra disponibilitat de foto i vídeo.',
    breadcrumbCurrent: 'Fotògraf de boda a Cambrils',
  },

  es: {
    meta: {
      title: 'Fotógrafo de boda en Cambrils | Lifetime Weddings',
      description:
        'Fotógrafo y cámara de boda en Cambrils, en el Baix Camp. Conocemos el puerto, el casco antiguo y los jardines de Parc Samà. Cubrimos la Costa Daurada sin recargo. Escríbenos por WhatsApp.',
    },
    hero: {
      eyebrow: 'Cambrils · Baix Camp · Costa Daurada',
      h1: 'Fotógrafo de boda en Cambrils',
      sub: 'Somos Ferran y Eric, dos hermanos de Reus con cámara de foto y de vídeo. Cambrils está a un cuarto de hora de casa y la conocemos de verdad: el puerto pesquero, la luz del paseo marítimo y los jardines de Parc Samà. La cubrimos sin recargo de desplazamiento.',
      heroAlt: 'Pareja el día de su boda en la Costa Daurada',
      cta1: 'Consulta tu fecha',
    },
    cardTitle: 'Cambrils',
    cardBlurb:
      'Puerto pesquero, gastronomía de nivel y los jardines de Parc Samà. Conocemos Cambrils palmo a palmo.',
    intro: {
      title: 'La boda en Cambrils, contada por quien trabaja al lado',
      paras: [
        '**Cambrils es la capital gastronómica de la Costa Daurada**, y eso se nota el día de una boda. Es un pueblo que sabe recibir, con restaurantes y masías que llevan décadas sirviendo banquetes, un puerto pesquero vivo y una franja de costa que cambia de luz a lo largo del día. Nosotros somos de Reus, a quince minutos, y venimos a Cambrils todo el año: no somos un equipo que aterriza el día de la boda sin saber dónde está el sol a las siete de la tarde.',
        'Trabajamos en **foto y vídeo a la vez**, dos hermanos con dos formatos: Ferran hace la fotografía y Eric el vídeo. Saldréis de vuestro día con todo documentado por una sola mirada, sin coordinar a dos proveedores que no se han visto nunca. Y como Cambrils entra dentro de nuestra zona habitual, **no os cobramos desplazamiento**.',
        'Aquí os contamos los espacios donde se casa la gente en Cambrils y alrededores, los rincones donde hacemos los retratos y cómo aprovechamos la luz del puerto y de los jardines. Todo con criterio de fotógrafo.',
      ],
    },
    nearbyVenues: {
      title: 'Dónde se casa la gente en Cambrils y el Baix Camp',
      intro:
        'Estos son algunos de los espacios que mejor conocemos en la zona. Hablamos de ellos con criterio fotográfico: cómo es la luz, qué funciona para los retratos y dónde colocamos a los invitados.',
      items: [
        {
          name: 'Parc Samà',
          body: 'Los **jardines coloniales del siglo XIX** más espectaculares de la zona: un lago central con reflejos, avenidas de palmeras, una torre neomedieval y una luz verde que se filtra entre los árboles tropicales. Es uno de los mejores venues de la Costa Daurada para los retratos, y la hora dorada entre las palmeras es difícil de igualar. Lo contamos a fondo en nuestra ficha.',
          internalSlug: 'parc-sama',
        },
        {
          name: 'Masías del Baix Camp',
          body: 'Alrededor de Cambrils y hacia el interior hay masías y fincas con patio, piedra y viña que funcionan muy bien para una boda de tarde. Ofrecen sombra al mediodía y rincones recogidos para los retratos, lejos del viento de la costa. Os ayudamos a elegir según la luz y la hora de vuestra ceremonia.',
        },
        {
          name: 'Espacios y restaurantes del puerto',
          body: 'Cambrils tiene restaurantes y salas de banquete pegados al **puerto pesquero**, con el agua y las barcas como telón de fondo. Son una opción natural si queréis quedaros cerca del mar todo el día y aprovechar la puesta de sol sobre el muelle sin traslados largos.',
        },
      ],
    },
    midCta: {
      title: 'Mira si tenemos libre tu fecha',
      body: 'Documentamos un número limitado de bodas al año para dedicarnos a ellas de verdad. Si os casáis en Cambrils o alrededores, escribidnos pronto y os decimos si tenemos el día libre.',
      label: 'Comprobar disponibilidad',
    },
    photoSpots: {
      title: 'Los rincones de Cambrils donde hacemos los retratos',
      intro:
        'Cuando la ceremonia y el banquete nos dejan un rato, estos son los lugares de Cambrils donde nos gusta llevar a la pareja. Sin desvíos largos: todo está cerca.',
      items: [
        {
          name: 'El puerto pesquero y la lonja',
          body: 'El **puerto de Cambrils** es el corazón del pueblo: barcas, redes y la luz reflejada en el agua. A primera hora o al atardecer es un escenario honesto y muy suyo, nada de postal genérica de costa.',
        },
        {
          name: 'El paseo marítimo',
          body: 'Palmeras, el horizonte del mar y espacio para caminar sin prisas. El paseo da aire a los retratos y, al atardecer, una luz cálida que envuelve a la pareja.',
        },
        {
          name: 'La Torre de l\'Ereta',
          body: 'Una **torre de vigía del siglo XVII** que recuerda que Cambrils vigilaba el mar desde hace siglos. Aporta piedra e historia a los retratos sin alejarse del centro.',
        },
        {
          name: 'El casco antiguo (la Vila)',
          body: 'Callejones, piedra y la iglesia de Santa Maria tierra adentro. La Vila de Cambrils es el contrapunto tranquilo al puerto: sombra al mediodía y rincones recogidos cuando sopla el viento.',
        },
        {
          name: 'La playa al amanecer',
          body: 'Si os animáis, una sesión en la arena justo cuando sale el sol regala la luz más limpia de todo el día y una playa para vosotros solos, antes de que llegue nadie.',
        },
      ],
    },
    valueExtra: {
      title: 'Por qué Cambrils es fácil de fotografiar (y de comer bien)',
      paras: [
        '**La gastronomía juega a vuestro favor.** Cambrils es capital gastronómica de la Costa Daurada, y los banquetes de la zona están a un nivel alto. Para nosotros es una buena noticia: cuando la comida y el servicio están cuidados, los invitados están relajados y la fiesta se fotografía sola. Nosotros trabajamos el momento sin interrumpirlo.',
        '**La luz del puerto es la mejor de la tarde.** El agua rebota la luz y suaviza las sombras, y el muelle ofrece una puesta de sol limpia sobre el horizonte. Si vuestro espacio está cerca del puerto, os propondremos salir unos minutos al atardecer: es cuando salen los mejores retratos.',
        '**Jardines o playa, dos bodas distintas.** Parc Samà os da un marco romántico y verde, con sombra y arquitectura; la costa os da horizonte, arena y luz abierta. Ninguna de las dos es mejor: depende de vosotros y de la hora. Os ayudamos a decidir según cómo queráis que se vea el día.',
      ],
    },
    gallery: {
      title: 'Un poco de nuestro trabajo',
      intro:
        'Una selección de nuestro estilo: natural, sin poses forzadas, atento a la luz y a los momentos de verdad. Os podemos enseñar mucho más en una llamada.',
    },
    faqTitle: 'Preguntas frecuentes sobre casarse en Cambrils',
    faqs: [
      {
        q: '¿Cubrís Cambrils sin recargo de desplazamiento?',
        a: 'Sí. Somos de Reus, a quince minutos, y Cambrils entra dentro de nuestra zona habitual. No os cobramos ningún suplemento por venir.',
      },
      {
        q: '¿Hacéis foto y vídeo a la vez?',
        a: 'Sí, y es lo que nos diferencia. Ferran hace la fotografía y Eric el vídeo. Un solo equipo, una sola mirada y todo el día documentado en ambos formatos, sin coordinar proveedores externos.',
      },
      {
        q: '¿Habéis fotografiado bodas en Parc Samà?',
        a: 'Todavía no, y preferimos decirlo claro. Conocemos muy bien el espacio —el lago, las palmeras, la torre— y sabemos exactamente cómo lo trabajaríamos. Cuando una pareja nos lleve, lo haremos como sabemos: sin prisa y mirando la luz.',
      },
      {
        q: '¿Mejor casarse en el puerto, en una masía o en Parc Samà?',
        a: 'Depende de lo que busquéis. El puerto os da mar y puesta de sol; una masía, recogimiento y sombra; Parc Samà, jardines románticos y arquitectura. Os ayudamos a elegir según la hora de la ceremonia y el estilo que queráis.',
      },
      {
        q: '¿Cuándo deberíamos reservaros?',
        a: 'Cuanto antes mejor. Documentamos un número limitado de bodas al año y las fechas de temporada alta en la Costa Daurada vuelan. Escribidnos con la fecha y os decimos enseguida si la tenemos libre.',
      },
    ],
    finalCta: {
      h2: '¿Os casáis en Cambrils?',
      body: 'Contadnos cómo imagináis el día y dónde os casáis. Os respondemos con sinceridad: disponibilidad, cómo trabajamos y qué incluye todo. Sin compromiso.',
      label: 'Escríbenos',
    },
    formTitle: 'Hablemos de vuestra boda en Cambrils',
    formIntro:
      'Dejadnos la fecha y el espacio y os contestamos pronto, con honestidad y sin presión.',
    whatsAppMessage:
      '¡Hola Ferran y Eric! Nos casamos en Cambrils y queríamos consultar vuestra disponibilidad de foto y vídeo.',
    breadcrumbCurrent: 'Fotógrafo de boda en Cambrils',
  },

  en: {
    meta: {
      title: 'Wedding photographer in Cambrils | Lifetime Weddings',
      description:
        'Wedding photographer and videographer in Cambrils, in the Baix Camp. We know the fishing port, the old town and the gardens of Parc Samà. We cover the Costa Daurada with no travel fee. Message us on WhatsApp.',
    },
    hero: {
      eyebrow: 'Cambrils · Baix Camp · Costa Daurada',
      h1: 'Wedding photographer in Cambrils',
      sub: 'We are Ferran and Eric, two brothers from Reus with a stills camera and a film camera. Cambrils is fifteen minutes from home and we know it for real: the fishing port, the light along the seafront and the gardens of Parc Samà. We cover it with no travel fee.',
      heroAlt: 'A couple on their wedding day on the Costa Daurada',
      cta1: 'Check your date',
    },
    cardTitle: 'Cambrils',
    cardBlurb:
      'Fishing port, serious gastronomy and the gardens of Parc Samà. We know Cambrils inch by inch.',
    intro: {
      title: 'A Cambrils wedding, told by people who work next door',
      paras: [
        '**Cambrils is the gastronomic capital of the Costa Daurada**, and it shows on a wedding day. It is a town that knows how to host, with restaurants and country houses that have served banquets for decades, a working fishing port and a stretch of coast whose light shifts through the day. We are from Reus, fifteen minutes away, and we come to Cambrils all year round — we are not a team that lands on the wedding day without knowing where the sun sits at seven in the evening.',
        'We shoot **photo and film at the same time**, two brothers with two formats: Ferran takes the photographs and Eric films. You leave your day with everything documented through a single vision, without coordinating two suppliers who have never met. And because Cambrils is well within our usual area, **we charge no travel fee**.',
        'Here we walk you through the venues where people marry in and around Cambrils, the spots where we take the portraits, and how we use the light of the port and the gardens. All with a photographer’s eye.',
      ],
    },
    nearbyVenues: {
      title: 'Where people marry in Cambrils and the Baix Camp',
      intro:
        'These are some of the spaces we know best in the area. We describe them the way a photographer would: how the light behaves, what works for portraits and where the guests go.',
      items: [
        {
          name: 'Parc Samà',
          body: 'The most spectacular **19th-century colonial gardens** in the area: a central lake with reflections, avenues of palm trees, a neo-medieval tower and a green light that filters through the tropical canopy. It is one of the finest venues on the Costa Daurada for portraits, and golden hour among the palms is hard to match. We cover it in depth on our own venue page.',
          internalSlug: 'parc-sama',
        },
        {
          name: 'Country estates of the Baix Camp',
          body: 'Around Cambrils and inland there are masies and estates with courtyards, stone and vineyards that work beautifully for an afternoon wedding. They offer shade at midday and quiet corners for portraits, away from the coastal wind. We help you choose based on the light and the time of your ceremony.',
        },
        {
          name: 'Venues and restaurants by the port',
          body: 'Cambrils has restaurants and banquet rooms right on the **fishing port**, with the water and the moored boats as a backdrop. A natural choice if you want to stay by the sea all day and catch the sunset over the quay without long transfers.',
        },
      ],
    },
    midCta: {
      title: 'See if your date is free',
      body: 'We document a limited number of weddings each year so we can give each one our full attention. If you are marrying in or around Cambrils, get in touch early and we will tell you whether the day is open.',
      label: 'Check availability',
    },
    photoSpots: {
      title: 'The Cambrils spots where we take the portraits',
      intro:
        'When the ceremony and the meal leave us a moment, these are the places in Cambrils where we like to bring the couple. No long detours: everything is close by.',
      items: [
        {
          name: 'The fishing port and the lonja',
          body: 'The **port of Cambrils** is the heart of the town: boats, nets and light bouncing off the water. Early in the morning or at dusk it is an honest, unmistakably local backdrop — nothing like a generic coastal postcard.',
        },
        {
          name: 'The seafront promenade',
          body: 'Palm trees, the sea horizon and room to walk without rushing. The promenade gives the portraits space and, at dusk, a warm light that wraps around the couple.',
        },
        {
          name: 'The Torre de l’Ereta',
          body: 'A **17th-century watchtower** that recalls how Cambrils has watched the sea for centuries. It brings stone and history into the portraits without leaving the centre.',
        },
        {
          name: 'The old town (la Vila)',
          body: 'Narrow streets, stone and the church of Santa Maria set back from the water. The Vila is the calm counterpoint to the port: shade at midday and sheltered corners when the wind picks up.',
        },
        {
          name: 'The beach at dawn',
          body: 'If you are up for it, a session on the sand just as the sun rises gives you the cleanest light of the whole day and a beach entirely to yourselves, before anyone else arrives.',
        },
      ],
    },
    valueExtra: {
      title: 'Why Cambrils is easy to photograph (and to eat well in)',
      paras: [
        '**The food works in your favour.** Cambrils is the gastronomic capital of the Costa Daurada, and the local banquets are genuinely good. For us that is welcome news: when the food and the service are looked after, the guests relax and the party photographs itself. We work the moment without interrupting it.',
        '**The port has the best light of the afternoon.** The water bounces the light and softens the shadows, and the quay offers a clean sunset over the horizon. If your venue is near the port, we will suggest stepping out for a few minutes at dusk — that is when the best portraits happen.',
        '**Gardens or beach — two different weddings.** Parc Samà gives you a romantic, green setting with shade and architecture; the coast gives you horizon, sand and open light. Neither is better: it depends on you and on the time of day. We help you decide based on how you want the day to look.',
      ],
    },
    gallery: {
      title: 'A little of our work',
      intro:
        'A selection of our style: natural, no forced poses, attentive to the light and to the real moments. We can show you a great deal more on a call.',
    },
    faqTitle: 'Frequently asked questions about marrying in Cambrils',
    faqs: [
      {
        q: 'Do you cover Cambrils with no travel fee?',
        a: 'Yes. We are from Reus, fifteen minutes away, and Cambrils is well within our usual area. There is no surcharge for coming.',
      },
      {
        q: 'Do you shoot photo and film together?',
        a: 'Yes, and it is what sets us apart. Ferran takes the photographs and Eric films. One team, one vision and the whole day documented in both formats, without coordinating outside suppliers.',
      },
      {
        q: 'Have you photographed weddings at Parc Samà?',
        a: 'Not yet, and we prefer to say so plainly. We know the space very well — the lake, the palms, the tower — and we know exactly how we would work it. When a couple takes us there, we will do it the way we know: unhurried and watching the light.',
      },
      {
        q: 'Better to marry at the port, at a country estate or at Parc Samà?',
        a: 'It depends on what you are after. The port gives you sea and sunset; a country estate, intimacy and shade; Parc Samà, romantic gardens and architecture. We help you choose based on the time of the ceremony and the style you want.',
      },
      {
        q: 'When should we book you?',
        a: 'As early as you can. We document a limited number of weddings a year, and peak-season dates on the Costa Daurada go quickly. Send us the date and we will tell you straight away whether it is free.',
      },
    ],
    finalCta: {
      h2: 'Getting married in Cambrils?',
      body: 'Tell us how you picture the day and where you are marrying. We will reply honestly: availability, how we work and what everything includes. No obligation.',
      label: 'Get in touch',
    },
    formTitle: 'Let us talk about your Cambrils wedding',
    formIntro:
      'Leave us the date and the venue and we will reply soon, honestly and with no pressure.',
    whatsAppMessage:
      'Hi Ferran and Eric! We are getting married in Cambrils and would like to check your photo and video availability.',
    breadcrumbCurrent: 'Wedding photographer in Cambrils',
  },
};
