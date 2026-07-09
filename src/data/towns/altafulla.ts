import type { TownServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const ALTAFULLA_TOWN: Record<Lang, TownServiceCopy> = {
  ca: {
    meta: {
      title: 'Fotògraf de boda a Altafulla | Lifetime Weddings',
      description:
        'Fotògraf i vídeo de boda a Altafulla, al Tarragonès. La Vila Closa medieval, el Castell de Tamarit i la platja, amb mirada editorial. Ferran i Eric, des de Reus, sense recàrrec a la Costa Daurada.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Tarragonès',
      h1: 'Fotògraf de boda a Altafulla',
      sub: 'Un dels pobles amb més encant de la costa: la Vila Closa emmurallada damunt del mar i el Castell de Tamarit a tocar. Som dos germans, en Ferran a la foto i l’Eric al vídeo, i venim de Reus a explicar el vostre dia tal com va passar.',
      heroAlt: 'Parella al capvespre entre els carrerons de pedra de la Vila Closa d’Altafulla',
      cta1: 'Mirem si tinc lliure la vostra data',
    },
    cardTitle: 'Boda a Altafulla',
    cardBlurb:
      'Vila Closa medieval, castell i platja en un mateix dia. Foto i vídeo amb mirada editorial, sense recàrrec de desplaçament.',
    intro: {
      title: 'Altafulla, un decorat que ja ve fet',
      paras: [
        `Hi ha pobles on has de buscar el racó bonic i n’hi ha d’altres on el racó bonic et surt a trobar. **Altafulla és del segon grup.** La **Vila Closa** —el nucli antic emmurallat, enfilat damunt del mar— és un laberint de carrerons de pedra i placetes que, a l’hora bona, s’encén de color mel. A pocs minuts hi ha el **Castell de Tamarit**, dret sobre una platja verge, i el barri marítim. En un radi molt petit teniu casc antic, castell i sorra: un dia sencer de boda sense pujar a cap furgoneta.`,
        `Nosaltres som **en Ferran i l’Eric**, dos germans de Reus. En Ferran fa la foto i l’Eric el vídeo, i treballem colze a colze el mateix dia, amb un sol llenguatge. No dirigim la boda com si fos una sessió de producte: **ens fa por el que és fals.** Ens agrada la llum de veritat, els gestos que no s’assagen i les fotos que d’aquí a vint anys encara us facin un nus a la gola.`,
      ],
    },
    nearbyVenues: {
      title: 'On us caseu a prop d’Altafulla',
      intro:
        'Espais que coneixem i que, com a fotògrafs, ens agraden de veritat. Us enllacem la nostra fitxa quan en tenim.',
      items: [
        {
          name: 'Castell de Tamarit',
          body: `Un castell medieval literalment damunt d’una platja verge, amb l’església romànica i el mar de fons. És dels llocs més **cinematogràfics** de la costa: la llum de tarda rebota contra la pedra i el capvespre sobre l’aigua és un regal. Ideal si voleu una boda amb ànima antiga i un punt salvatge.`,
          internalSlug: 'castell-de-tamarit',
        },
        {
          name: 'Mas Passamaner',
          body: `A un pas d’Altafulla, a la Selva del Camp, una masia modernista amb jardins, palmeres i interiors nobles. Funciona molt bé quan voleu **elegància i comoditat**, amb marge per a la cerimònia a l’aire lliure i per al pla B a cobert. Us n’hem preparat una fitxa amb la nostra mirada.`,
          internalSlug: 'mas-passamaner',
        },
        {
          name: 'Cerimònia a la Vila Closa i masies del entorn',
          body: `Casar-se dins del nucli antic —una placeta, un pati, una terrassa amb vistes al mar— o en alguna masia de pedra del Tarragonès té un encant difícil de superar. Cal parlar amb l’Ajuntament perquè la Vila Closa és espai públic i viu, però **fotogràficament és or pur.** Digueu-nos com us imagineu el dia i us orientem.`,
        },
      ],
    },
    midCta: {
      title: 'Només agafem unes 20 bodes l’any',
      body: 'Perquè cada parella tingui de debò els dos germans el seu dia, i no una agenda plena. Les dates bones d’Altafulla —maig, juny i setembre— volen aviat. Si la vostra ja té data, val la pena mirar-ho ara.',
      label: 'Reservem la nostra data',
    },
    photoSpots: {
      title: 'On fem les millors fotos a Altafulla',
      intro: 'Parlem d’hora, de llum i de pla. Aquests són els racons que treballem quan la boda cau a Altafulla.',
      items: [
        {
          name: 'Els carrerons de la Vila Closa',
          body: 'La pedra daurada demana llum baixa: primera hora del matí o l’última de la tarda. Els carrerons estrets fan de marc natural i concentren la mirada en vosaltres.',
        },
        {
          name: 'El Castell d’Altafulla i les muralles',
          body: 'Al capvespre, amb el sol caient cap al mar, les muralles s’encenen i el cel es torna taronja. És el moment del retrat gran, aquell pla obert que sembla de pel·lícula.',
        },
        {
          name: 'La platja i les Botigues de Mar',
          body: 'El barri marítim aporta color; la sorra, calma i horitzó net. Si voleu peus descalços i vent, reservem els últims minuts de sol: la llum rasant sobre l’aigua ho val tot.',
        },
        {
          name: 'Els Munts, la vila romana',
          body: 'Un jaciment amb vistes obertes al Mediterrani. No sempre és accessible, però quan es pot, el contrast entre ruïna antiga i parella d’avui dóna imatges amb molta ànima.',
        },
      ],
    },
    valueExtra: {
      title: 'La millor llum per a una boda entre casc antic i platja',
      paras: [
        `Si us caseu a Altafulla, val la pena pensar el dia **al voltant de la llum**. La pedra de la Vila Closa és preciosa, però al migdia el sol pega dur i fa ombres marcades; a partir de mitja tarda tot es suavitza i el poble agafa aquell to mel. La nostra recomanació: cerimònia no massa d’hora, aperitiu mentre el sol baixa i **reservar 20 minuts just abans de la posta** per als retrats de parella entre muralles o vora el mar.`,
        `Per mesos, **maig, juny i setembre** solen donar el millor equilibri: dies llargs, llum càlida i temperatura amable. El ple estiu és espectacular però calorós al migdia; l’hivern regala capvespres nets i el poble buit. Si és una boda de platja, tingueu present que la sorra pública demana **permís municipal** i que el vent hi mana: ens hi adaptem, però ajuda saber-ho abans.`,
      ],
    },
    gallery: {
      title: 'Una mostra de la nostra mirada',
      intro:
        'Encara no tenim una boda publicada d’Altafulla, així que us ensenyem feina real d’altres dies a la Costa Daurada. La manera de mirar és la mateixa que portarem al vostre.',
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Cobriu Altafulla sense recàrrec de desplaçament?',
        a: 'Sí. Venim de Reus i tota la Costa Daurada, Altafulla inclosa, entra dins la nostra zona habitual sense cap cost extra de quilòmetres.',
      },
      {
        q: 'Feu foto i vídeo alhora?',
        a: 'Sí, i és el que ens fa diferents. En Ferran fa la foto i l’Eric el vídeo, som germans i treballem coordinats tot el dia amb un sol estil, sense trepitjar-nos ni duplicar equips.',
      },
      {
        q: 'Quan tindrem les fotos?',
        a: 'Us enviem un primer avanç en cosa d’una setmana, perquè pugueu reviure el dia de seguida. El reportatge complet i el vídeo arriben després, ja treballats amb calma.',
      },
      {
        q: 'Ens volem casar a la platja d’Altafulla, es pot?',
        a: 'Es pot, però la platja és espai públic i sol caldre permís de l’Ajuntament. Us ajudem a pensar l’hora per la llum i el vent; la part administrativa la gestioneu vosaltres o el vostre planner.',
      },
      {
        q: 'Som una parella internacional, parleu anglès?',
        a: 'Sí. Estem acostumats a bodes amb convidats d’arreu i us atenem en català, castellà o anglès sense cap problema.',
      },
    ],
    finalCta: {
      h2: 'Expliquem-nos la vostra boda a Altafulla',
      body: 'Digueu-nos la data i el lloc i us direm de seguida si la tenim lliure. Sense compromís, i amb ganes de conèixer-vos.',
      label: 'Escriviu-nos per WhatsApp',
    },
    formTitle: 'Parlem de la vostra data',
    formIntro:
      'Ompliu quatre camps i us responem nosaltres mateixos, en Ferran o l’Eric, no cap formulari automàtic.',
    whatsAppMessage:
      'Hola Ferran i Eric! Ens casem a Altafulla i ens agradaria saber si teniu lliure la nostra data per a foto i vídeo.',
    breadcrumbCurrent: 'Fotògraf de boda a Altafulla',
  },

  es: {
    meta: {
      title: 'Fotógrafo de boda en Altafulla | Lifetime Weddings',
      description:
        'Fotógrafo y vídeo de boda en Altafulla, en el Tarragonès. La Vila Closa medieval, el Castell de Tamarit y la playa, con mirada editorial. Ferran y Eric, desde Reus, sin recargo en la Costa Daurada.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Tarragonès',
      h1: 'Fotógrafo de boda en Altafulla',
      sub: 'Uno de los pueblos con más encanto de la costa: la Vila Closa amurallada sobre el mar y el Castell de Tamarit al lado. Somos dos hermanos, Ferran a la foto y Eric al vídeo, y venimos de Reus para contar vuestro día tal como pasó.',
      heroAlt: 'Pareja al atardecer entre las callejuelas de piedra de la Vila Closa de Altafulla',
      cta1: 'Miremos si tengo libre vuestra fecha',
    },
    cardTitle: 'Boda en Altafulla',
    cardBlurb:
      'Vila Closa medieval, castillo y playa en un mismo día. Foto y vídeo con mirada editorial, sin recargo de desplazamiento.',
    intro: {
      title: 'Altafulla, un decorado que ya viene hecho',
      paras: [
        `Hay pueblos donde tienes que buscar el rincón bonito y los hay donde el rincón bonito sale a tu encuentro. **Altafulla es del segundo grupo.** La **Vila Closa** —el casco antiguo amurallado, encaramado sobre el mar— es un laberinto de callejuelas de piedra y placitas que, a la hora buena, se encienden de color miel. A pocos minutos está el **Castell de Tamarit**, en pie sobre una playa virgen, y el barrio marítimo. En un radio muy pequeño tenéis casco antiguo, castillo y arena: un día entero de boda sin subir a ninguna furgoneta.`,
        `Nosotros somos **Ferran y Eric**, dos hermanos de Reus. Ferran hace la foto y Eric el vídeo, y trabajamos codo con codo el mismo día, con un solo lenguaje. No dirigimos la boda como si fuera una sesión de producto: **nos da miedo lo que es falso.** Nos gusta la luz de verdad, los gestos que no se ensayan y las fotos que dentro de veinte años todavía os hagan un nudo en la garganta.`,
      ],
    },
    nearbyVenues: {
      title: 'Dónde os casáis cerca de Altafulla',
      intro:
        'Espacios que conocemos y que, como fotógrafos, nos gustan de verdad. Os enlazamos nuestra ficha cuando la tenemos.',
      items: [
        {
          name: 'Castell de Tamarit',
          body: `Un castillo medieval literalmente sobre una playa virgen, con la iglesia románica y el mar de fondo. Es de los sitios más **cinematográficos** de la costa: la luz de tarde rebota contra la piedra y el atardecer sobre el agua es un regalo. Ideal si queréis una boda con alma antigua y un punto salvaje.`,
          internalSlug: 'castell-de-tamarit',
        },
        {
          name: 'Mas Passamaner',
          body: `A un paso de Altafulla, en la Selva del Camp, una masía modernista con jardines, palmeras e interiores nobles. Funciona muy bien cuando queréis **elegancia y comodidad**, con margen para la ceremonia al aire libre y para el plan B a cubierto. Os hemos preparado una ficha con nuestra mirada.`,
          internalSlug: 'mas-passamaner',
        },
        {
          name: 'Ceremonia en la Vila Closa y masías del entorno',
          body: `Casarse dentro del casco antiguo —una placita, un patio, una terraza con vistas al mar— o en alguna masía de piedra del Tarragonès tiene un encanto difícil de superar. Hay que hablar con el Ayuntamiento porque la Vila Closa es espacio público y vivo, pero **fotográficamente es oro puro.** Contadnos cómo os imagináis el día y os orientamos.`,
        },
      ],
    },
    midCta: {
      title: 'Solo cogemos unas 20 bodas al año',
      body: 'Para que cada pareja tenga de verdad a los dos hermanos su día, y no una agenda llena. Las fechas buenas de Altafulla —mayo, junio y septiembre— vuelan pronto. Si la vuestra ya tiene fecha, vale la pena mirarlo ahora.',
      label: 'Reservemos nuestra fecha',
    },
    photoSpots: {
      title: 'Dónde hacemos las mejores fotos en Altafulla',
      intro: 'Hablamos de hora, de luz y de plano. Estos son los rincones que trabajamos cuando la boda cae en Altafulla.',
      items: [
        {
          name: 'Las callejuelas de la Vila Closa',
          body: 'La piedra dorada pide luz baja: primera hora de la mañana o la última de la tarde. Las callejuelas estrechas hacen de marco natural y concentran la mirada en vosotros.',
        },
        {
          name: 'El Castell d’Altafulla y las murallas',
          body: 'Al atardecer, con el sol cayendo hacia el mar, las murallas se encienden y el cielo se vuelve naranja. Es el momento del retrato grande, ese plano abierto que parece de película.',
        },
        {
          name: 'La playa y las Botigues de Mar',
          body: 'El barrio marítimo aporta color; la arena, calma y horizonte limpio. Si queréis pies descalzos y viento, reservamos los últimos minutos de sol: la luz rasante sobre el agua lo vale todo.',
        },
        {
          name: 'Els Munts, la villa romana',
          body: 'Un yacimiento con vistas abiertas al Mediterráneo. No siempre es accesible, pero cuando se puede, el contraste entre ruina antigua y pareja de hoy da imágenes con mucha alma.',
        },
      ],
    },
    valueExtra: {
      title: 'La mejor luz para una boda entre casco antiguo y playa',
      paras: [
        `Si os casáis en Altafulla, vale la pena pensar el día **alrededor de la luz**. La piedra de la Vila Closa es preciosa, pero al mediodía el sol pega duro y marca sombras; a partir de media tarde todo se suaviza y el pueblo coge ese tono miel. Nuestra recomendación: ceremonia no demasiado pronto, aperitivo mientras el sol baja y **reservar 20 minutos justo antes de la puesta** para los retratos de pareja entre murallas o junto al mar.`,
        `Por meses, **mayo, junio y septiembre** suelen dar el mejor equilibrio: días largos, luz cálida y temperatura amable. El pleno verano es espectacular pero caluroso al mediodía; el invierno regala atardeceres limpios y el pueblo vacío. Si es una boda de playa, tened presente que la arena pública requiere **permiso municipal** y que el viento manda: nos adaptamos, pero ayuda saberlo antes.`,
      ],
    },
    gallery: {
      title: 'Una muestra de nuestra mirada',
      intro:
        'Todavía no tenemos una boda publicada de Altafulla, así que os enseñamos trabajo real de otros días en la Costa Daurada. La manera de mirar es la misma que llevaremos a la vuestra.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Cubrís Altafulla sin recargo de desplazamiento?',
        a: 'Sí. Venimos de Reus y toda la Costa Daurada, Altafulla incluida, entra dentro de nuestra zona habitual sin ningún coste extra de kilómetros.',
      },
      {
        q: '¿Hacéis foto y vídeo a la vez?',
        a: 'Sí, y es lo que nos hace diferentes. Ferran hace la foto y Eric el vídeo, somos hermanos y trabajamos coordinados todo el día con un solo estilo, sin pisarnos ni duplicar equipos.',
      },
      {
        q: '¿Cuándo tendremos las fotos?',
        a: 'Os enviamos un primer avance en cosa de una semana, para que podáis revivir el día enseguida. El reportaje completo y el vídeo llegan después, ya trabajados con calma.',
      },
      {
        q: 'Queremos casarnos en la playa de Altafulla, ¿se puede?',
        a: 'Se puede, pero la playa es espacio público y suele hacer falta permiso del Ayuntamiento. Os ayudamos a pensar la hora por la luz y el viento; la parte administrativa la gestionáis vosotros o vuestro planner.',
      },
      {
        q: 'Somos una pareja internacional, ¿habláis inglés?',
        a: 'Sí. Estamos acostumbrados a bodas con invitados de todas partes y os atendemos en catalán, castellano o inglés sin ningún problema.',
      },
    ],
    finalCta: {
      h2: 'Contadnos vuestra boda en Altafulla',
      body: 'Decidnos la fecha y el lugar y os diremos enseguida si la tenemos libre. Sin compromiso, y con ganas de conoceros.',
      label: 'Escribidnos por WhatsApp',
    },
    formTitle: 'Hablemos de vuestra fecha',
    formIntro:
      'Rellenad cuatro campos y os respondemos nosotros mismos, Ferran o Eric, no ningún formulario automático.',
    whatsAppMessage:
      '¡Hola Ferran y Eric! Nos casamos en Altafulla y nos gustaría saber si tenéis libre nuestra fecha para foto y vídeo.',
    breadcrumbCurrent: 'Fotógrafo de boda en Altafulla',
  },

  en: {
    meta: {
      title: 'Wedding photographer in Altafulla | Lifetime Weddings',
      description:
        'Wedding photography and film in Altafulla, on the Tarragonès coast. The medieval Vila Closa, Tamarit Castle and the beach, seen with an editorial eye. Ferran and Eric, from Reus, no travel surcharge across the Costa Daurada.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Tarragonès',
      h1: 'Wedding photographer in Altafulla',
      sub: 'One of the most charming towns on the coast: the walled Vila Closa perched above the sea and Tamarit Castle right next door. We are two brothers, Ferran on stills and Eric on film, and we come from Reus to tell your day exactly as it happened.',
      heroAlt: 'Couple at dusk among the stone lanes of the Vila Closa in Altafulla',
      cta1: 'Let’s check if your date is free',
    },
    cardTitle: 'Weddings in Altafulla',
    cardBlurb:
      'Medieval old town, castle and beach in a single day. Photo and film with an editorial eye, no travel surcharge.',
    intro: {
      title: 'Altafulla, a set that comes ready-made',
      paras: [
        `Some towns make you hunt for the beautiful corner; others send it out to meet you. **Altafulla belongs to the second kind.** The **Vila Closa** —the walled old town, perched above the sea— is a maze of stone lanes and little squares that, at the right hour, glow honey-gold. A few minutes away stands **Tamarit Castle**, rising over an unspoilt beach, and the seafront quarter. Within a tiny radius you have old town, castle and sand: a whole wedding day without anyone climbing into a shuttle van.`,
        `We are **Ferran and Eric**, two brothers from Reus. Ferran shoots the photographs and Eric films, and we work shoulder to shoulder through the same day, speaking one visual language. We don’t direct a wedding as if it were a product shoot: **anything staged makes us uneasy.** We love real light, gestures that aren’t rehearsed, and pictures that will still catch in your throat twenty years from now.`,
      ],
    },
    nearbyVenues: {
      title: 'Where you can marry near Altafulla',
      intro:
        'Venues we know and genuinely like as photographers. We link our own venue page when we have one.',
      items: [
        {
          name: 'Tamarit Castle',
          body: `A medieval castle set literally above an unspoilt beach, with its Romanesque church and the sea behind. It is one of the most **cinematic** spots on the coast: afternoon light bounces off the stone and the sunset over the water is a gift. Perfect if you want a wedding with an old soul and a touch of the wild.`,
          internalSlug: 'castell-de-tamarit',
        },
        {
          name: 'Mas Passamaner',
          body: `A short hop from Altafulla, in La Selva del Camp, a modernista manor with gardens, palms and grand interiors. It works beautifully when you want **elegance and comfort**, with room for both an open-air ceremony and a sheltered plan B. We’ve written up our own take on it.`,
          internalSlug: 'mas-passamaner',
        },
        {
          name: 'A ceremony in the Vila Closa and nearby farmhouses',
          body: `Marrying inside the old town —a little square, a courtyard, a sea-view terrace— or in one of the stone masies of the Tarragonès has a charm that’s hard to beat. You’ll need to talk to the town hall, as the Vila Closa is a living public space, but **photographically it is pure gold.** Tell us how you picture the day and we’ll point you the right way.`,
        },
      ],
    },
    midCta: {
      title: 'We only take on around 20 weddings a year',
      body: 'So that every couple truly gets both brothers on their day, not an overbooked diary. Altafulla’s best dates —May, June and September— go early. If yours already has a date, now is the time to check.',
      label: 'Let’s hold our date',
    },
    photoSpots: {
      title: 'Where we make the best photos in Altafulla',
      intro: 'We think in terms of hour, light and frame. These are the corners we work when the wedding falls in Altafulla.',
      items: [
        {
          name: 'The lanes of the Vila Closa',
          body: 'The golden stone wants low light: early morning or the last hour of the afternoon. The narrow lanes act as a natural frame and pull all the attention onto you.',
        },
        {
          name: 'Altafulla Castle and the walls',
          body: 'At dusk, with the sun dropping toward the sea, the walls light up and the sky turns orange. This is the moment for the big portrait, the wide frame that looks like a film still.',
        },
        {
          name: 'The beach and the Botigues de Mar',
          body: 'The seafront quarter brings colour; the sand brings calm and a clean horizon. If you want bare feet and wind, we save the last minutes of sun: raking light across the water is worth everything.',
        },
        {
          name: 'Els Munts, the Roman villa',
          body: 'An archaeological site with open views over the Mediterranean. It isn’t always accessible, but when it is, the contrast between ancient ruin and today’s couple gives images with real soul.',
        },
      ],
    },
    valueExtra: {
      title: 'The best light for a wedding between old town and beach',
      paras: [
        `If you marry in Altafulla, it’s worth building the day **around the light**. The Vila Closa stone is gorgeous, but at midday the sun is harsh and casts hard shadows; from mid-afternoon on, everything softens and the town takes on that honey tone. Our advice: don’t start the ceremony too early, have the drinks reception as the sun drops, and **save 20 minutes right before sunset** for couple portraits among the walls or by the sea.`,
        `By month, **May, June and September** tend to strike the best balance: long days, warm light and kind temperatures. High summer is spectacular but hot at midday; winter offers clean sunsets and an empty town. If yours is a beach wedding, bear in mind that the public sand needs a **municipal permit** and that the wind has the last word: we adapt, but knowing it in advance helps.`,
      ],
    },
    gallery: {
      title: 'A taste of how we see',
      intro:
        'We don’t yet have a published Altafulla wedding, so here is real work from other days along the Costa Daurada. The way of seeing is the same one we’ll bring to yours.',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Do you cover Altafulla with no travel surcharge?',
        a: 'Yes. We come from Reus, and the whole Costa Daurada, Altafulla included, falls within our usual area with no extra mileage cost.',
      },
      {
        q: 'Do you shoot photo and film together?',
        a: 'Yes, and it’s what sets us apart. Ferran shoots the stills and Eric films; we’re brothers and we work in sync all day in one shared style, without getting in each other’s way or doubling up gear.',
      },
      {
        q: 'When will we get our photos?',
        a: 'We send a first preview within about a week, so you can relive the day straight away. The full reportage and the film follow later, edited at a calmer pace.',
      },
      {
        q: 'We’d love to marry on Altafulla beach, is that possible?',
        a: 'It is, but the beach is public space and usually needs a permit from the town hall. We’ll help you plan the hour for light and wind; the paperwork is handled by you or your planner.',
      },
      {
        q: 'We’re an international couple, do you speak English?',
        a: 'Yes. We’re used to weddings with guests from all over, and we’ll look after you in Catalan, Spanish or English without any trouble.',
      },
    ],
    finalCta: {
      h2: 'Tell us about your Altafulla wedding',
      body: 'Send us the date and the place and we’ll tell you straight away whether it’s free. No obligation, and we’d love to meet you.',
      label: 'Message us on WhatsApp',
    },
    formTitle: 'Let’s talk about your date',
    formIntro:
      'Fill in four fields and we’ll reply ourselves, Ferran or Eric, never an automated form.',
    whatsAppMessage:
      'Hi Ferran and Eric! We’re getting married in Altafulla and would love to know if you have our date free for photo and film.',
    breadcrumbCurrent: 'Wedding photographer in Altafulla',
  },
};
