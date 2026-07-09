import type { TownServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const VILA_SECA_TOWN: Record<Lang, TownServiceCopy> = {
  ca: {
    meta: {
      title: 'Fotògraf de boda a Vila-seca i La Pineda | Lifetime Weddings',
      description:
        "Fotografia i vídeo de boda a Vila-seca i La Pineda, entre el pinar del Bosc de la Marquesa i el mar. Reportatge documental, foto i vídeo germans. Escriviu-nos pel WhatsApp.",
    },
    hero: {
      eyebrow: 'Vila-seca · La Pineda · Tarragonès',
      h1: 'Fotògraf de boda a Vila-seca i La Pineda',
      sub: "Som en Ferran (foto) i l'Eric (vídeo), dos germans amb base a Reus. A Vila-seca i La Pineda ens movem com a casa: del pinar del Bosc de la Marquesa als jardins de Clos Barenys, on ja hem documentat una boda real.",
      heroAlt: 'Parella el dia de la seva boda entre pins vora el mar a La Pineda',
      cta1: 'Consulteu la vostra data',
    },
    cardTitle: 'Vila-seca i La Pineda',
    cardBlurb:
      "El pinar tocant al mar i un venue de referència on ja hem estat: fotografia i vídeo de boda a la Costa Daurada, sense recàrrec de desplaçament.",
    intro: {
      title: 'Un pinar davant del mar per casar-vos',
      paras: [
        "Vila-seca i La Pineda tenen una cosa que poques localitats de la costa poden oferir: un **pinar mediterrani que arriba fins a la sorra**. El Bosc de la Marquesa filtra la llum entre les capçades i la platja obre l'horitzó a pocs metres. Aquesta barreja de bosc i mar és un regal per a qui, com nosaltres, treballa amb llum natural.",
        "No venim de fora. Tenim la base a **Reus**, a un quart d'hora, i cobrim tot el Tarragonès i la Costa Daurada **sense recàrrec de desplaçament**. Coneixem els horaris de llum de La Pineda, sabem on és l'ombra bona del pinar al migdia i com es comporta el sol quan baixa cap al mar.",
        "I aquí, a Vila-seca, no parlem de teoria: als **jardins de L'Orangerie Clos Barenys** hi vam documentar la boda de l'Elisabet i en Josep, de bon matí fins al ball. És el tipus de feina que fem — honesta, present, sense interrompre el que passa.",
      ],
    },
    nearbyVenues: {
      title: 'Espais de boda a Vila-seca i el seu entorn',
      intro:
        "Aquests són alguns dels llocs on ens agrada treballar a la zona. Quan tenim fitxa pròpia del venue, us hi enllacem perquè en vegeu més.",
      items: [
        {
          name: "L'Orangerie Clos Barenys",
          body: "El nostre espai de referència a Vila-seca. Jardins amb aire de jardí botànic i una orangerie de llum filtrada preciosa. Aquí hi vam documentar la boda de l'**Elisabet i en Josep**, així que us podem ensenyar exactament què captem en un dia real, no una promesa.",
          internalSlug: 'orangerie-clos-barenys',
        },
        {
          name: 'Mas La Boella',
          body: "A pocs minuts de Vila-seca, entre oliveres, aquesta masia senyorial combina arquitectura, capella i finca. Un dels espais amb més personalitat del Camp de Tarragona i molt fàcil d'arribar-hi des de la costa.",
          internalSlug: 'mas-la-boella',
        },
        {
          name: 'Espais vora mar a La Pineda',
          body: "La Pineda concentra hotels i restaurants amb terrasses que donen al passeig marítim i a la platja. Són ideals si voleu un banquet amb el mar de fons i la posta de sol com a teló. Si ens dieu quin espai teniu al cap, us ajudem a llegir-ne la llum i els temps.",
        },
      ],
    },
    midCta: {
      title: 'Poques dates de temporada alta',
      body: "Som dos germans, no una agència amb equips paral·lels: cada cap de setmana només hi som en una boda. A la primavera i l'estiu la costa s'omple aviat, així que si teniu una data a Vila-seca o La Pineda, val la pena confirmar disponibilitat com abans millor.",
      label: 'Mireu si tinc la vostra data',
    },
    photoSpots: {
      title: 'On fem les fotos a Vila-seca i La Pineda',
      intro:
        "Racons que coneixem i que funcionen de veritat per a la sessió de parella, sense fer-vos perdre mitja tarda de desplaçaments.",
      items: [
        {
          name: 'Bosc de la Marquesa',
          body: 'El pinar tocant al mar. Les capçades filtren el sol i deixen una llum suau i tamisada fins i tot al migdia, quan a la platja oberta cremaria. El nostre racó preferit de la zona.',
        },
        {
          name: "Platja de La Pineda a l'alba",
          body: 'Sorra ampla i mar tranquil. A primera hora la llum és baixa i daurada, gairebé no hi ha ningú i les fotos respiren calma. Perfecte per a un after o una sessió el matí següent.',
        },
        {
          name: 'Jardins de Clos Barenys',
          body: "Vegetació densa, camins i racons amb aire de jardí botànic. Un mateix espai us dona diversos fons ben diferents sense sortir de la finca.",
        },
        {
          name: 'Passeig marítim de La Pineda',
          body: "Palmeres, la font del passeig i l'horitzó de mar. Un ambient mediterrani i lluminós, còmode per caminar amb el vestit sense complicacions.",
        },
        {
          name: 'Entorn natural del Racó de la Torre',
          body: 'La transició entre el pinar i les zones humides del litoral. Textures de canyís i pins que donen fons naturals poc vistos i molt propis de Vila-seca.',
        },
      ],
    },
    valueExtra: {
      title: 'Per què el pinar-mar dona una llum ideal',
      paras: [
        "La combinació de pinar i platja no és només bonica: és **tècnicament útil**. Quan el sol pica fort al migdia, la platja oberta genera ombres dures i ulls aclucats. En canvi, sota les pinedes del Bosc de la Marquesa les capçades fan de difusor natural i la llum arriba **suau i uniforme**. Podem fer retrats en qualsevol franja horària sense dependre només de la posta de sol.",
        "Això ens dona marge per plantejar un **timeline còmode**: cerimònia i aperitiu quan la llum encara és alta, un salt de deu minuts al pinar per als retrats de parella amb llum tamisada, i reservar la platja o el passeig per a l'hora daurada del final del dia. Vosaltres gaudiu de la festa i nosaltres aprofitem cada tipus de llum al seu moment.",
      ],
    },
    gallery: {
      title: 'Bodes a la Costa Daurada',
      intro:
        "Una selecció de la nostra feina a la zona. El to editorial i documental que veieu aquí és el mateix que trobareu el vostre dia a Vila-seca o La Pineda.",
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Cobriu Vila-seca i La Pineda sense recàrrec?',
        a: "Sí. Tenim la base a Reus i tot el Tarragonès i la Costa Daurada entren dins la nostra zona habitual, així que **no apliquem recàrrec de desplaçament** a Vila-seca ni a La Pineda.",
      },
      {
        q: 'Feu foto i vídeo alhora?',
        a: "Sí, i és el nostre punt fort: en **Ferran** fa la fotografia i l'**Eric** el vídeo. Som germans i treballem coordinats de fa anys, així que ens repartim l'espai sense trepitjar-nos ni duplicar-vos els proveïdors.",
      },
      {
        q: 'Quant trigueu a entregar el reportatge?',
        a: "Fem una **avançada en pocs dies** perquè tingueu les primeres imatges de seguida, i el reportatge complet l'entreguem en un termini raonable que us confirmem segons l'època de l'any. No us fem esperar mesos.",
      },
      {
        q: 'Es pot fer la boda o la sessió a la platja? Cal permís?',
        a: "Es pot, i és preciós. Per a una cerimònia a la sorra de La Pineda sol caldre **tramitar un permís amb l'ajuntament**; nosaltres no el gestionem, però us orientem sobre com funciona i adaptem els temps a l'accés i la marea. Per a una sessió de parella informal no acostuma a caldre res especial.",
      },
      {
        q: 'Treballeu amb parelles internacionals?',
        a: "Sí. La Costa Daurada rep molta parella de fora i estem acostumats a bodes amb convidats de diversos països. Ens comuniquem en **català, castellà i anglès** i adaptem el ritme del dia al vostre.",
      },
    ],
    finalCta: {
      h2: 'Ens expliqueu la vostra boda a Vila-seca?',
      body: "Digueu-nos la data i l'espai i us direm de seguida si tenim disponibilitat. Sense compromís i amb resposta ràpida.",
      label: 'Escriviu-nos pel WhatsApp',
    },
    formTitle: 'Parlem de la vostra boda',
    formIntro:
      "Ompliu quatre camps i us contestem aviat. Si preferiu, escriviu-nos directament pel WhatsApp i us responem el mateix dia.",
    whatsAppMessage:
      'Hola Ferran i Eric! Ens casem a la zona de Vila-seca / La Pineda i voldríem consultar la vostra disponibilitat de foto i vídeo.',
    breadcrumbCurrent: 'Fotògraf de boda a Vila-seca i La Pineda',
  },

  es: {
    meta: {
      title: 'Fotógrafo de boda en Vila-seca y La Pineda | Lifetime Weddings',
      description:
        'Fotografía y vídeo de boda en Vila-seca y La Pineda, entre el pinar del Bosc de la Marquesa y el mar. Reportaje documental, foto y vídeo hermanos. Escríbenos por WhatsApp.',
    },
    hero: {
      eyebrow: 'Vila-seca · La Pineda · Tarragonès',
      h1: 'Fotógrafo de boda en Vila-seca y La Pineda',
      sub: 'Somos Ferran (foto) y Eric (vídeo), dos hermanos con base en Reus. En Vila-seca y La Pineda nos movemos como en casa: del pinar del Bosc de la Marquesa a los jardines de Clos Barenys, donde ya hemos documentado una boda real.',
      heroAlt: 'Pareja el día de su boda entre pinos junto al mar en La Pineda',
      cta1: 'Consulta tu fecha',
    },
    cardTitle: 'Vila-seca y La Pineda',
    cardBlurb:
      'El pinar pegado al mar y un espacio de referencia donde ya hemos estado: fotografía y vídeo de boda en la Costa Daurada, sin recargo de desplazamiento.',
    intro: {
      title: 'Un pinar frente al mar para casarte',
      paras: [
        'Vila-seca y La Pineda tienen algo que pocas localidades de costa pueden ofrecer: un **pinar mediterráneo que llega hasta la arena**. El Bosc de la Marquesa filtra la luz entre las copas y la playa abre el horizonte a pocos metros. Esa mezcla de bosque y mar es un regalo para quien, como nosotros, trabaja con luz natural.',
        'No venimos de fuera. Tenemos la base en **Reus**, a un cuarto de hora, y cubrimos todo el Tarragonès y la Costa Daurada **sin recargo de desplazamiento**. Conocemos los horarios de luz de La Pineda, sabemos dónde está la sombra buena del pinar al mediodía y cómo se comporta el sol cuando baja hacia el mar.',
        'Y aquí, en Vila-seca, no hablamos de teoría: en los **jardines de L’Orangerie Clos Barenys** documentamos la boda de Elisabet y Josep, de buena mañana hasta el baile. Es el tipo de trabajo que hacemos: honesto, presente, sin interrumpir lo que ocurre.',
      ],
    },
    nearbyVenues: {
      title: 'Espacios de boda en Vila-seca y su entorno',
      intro:
        'Estos son algunos de los lugares donde nos gusta trabajar en la zona. Cuando tenemos ficha propia del espacio, te enlazamos para que veas más.',
      items: [
        {
          name: "L'Orangerie Clos Barenys",
          body: 'Nuestro espacio de referencia en Vila-seca. Jardines con aire de jardín botánico y una orangerie de luz filtrada preciosa. Aquí documentamos la boda de **Elisabet y Josep**, así que podemos enseñarte exactamente qué captamos en un día real, no una promesa.',
          internalSlug: 'orangerie-clos-barenys',
        },
        {
          name: 'Mas La Boella',
          body: 'A pocos minutos de Vila-seca, entre olivos, esta masía señorial combina arquitectura, capilla y finca. Uno de los espacios con más personalidad del Camp de Tarragona y muy fácil de alcanzar desde la costa.',
          internalSlug: 'mas-la-boella',
        },
        {
          name: 'Espacios junto al mar en La Pineda',
          body: 'La Pineda concentra hoteles y restaurantes con terrazas que dan al paseo marítimo y a la playa. Son ideales si quieres un banquete con el mar de fondo y la puesta de sol como telón. Si nos dices qué espacio tienes en mente, te ayudamos a leer su luz y sus tiempos.',
        },
      ],
    },
    midCta: {
      title: 'Pocas fechas en temporada alta',
      body: 'Somos dos hermanos, no una agencia con equipos en paralelo: cada fin de semana solo estamos en una boda. En primavera y verano la costa se llena pronto, así que si tienes una fecha en Vila-seca o La Pineda, vale la pena confirmar disponibilidad cuanto antes.',
      label: 'Mira si tengo tu fecha',
    },
    photoSpots: {
      title: 'Dónde hacemos las fotos en Vila-seca y La Pineda',
      intro:
        'Rincones que conocemos y que funcionan de verdad para la sesión de pareja, sin hacerte perder media tarde en desplazamientos.',
      items: [
        {
          name: 'Bosc de la Marquesa',
          body: 'El pinar pegado al mar. Las copas filtran el sol y dejan una luz suave y tamizada incluso al mediodía, cuando en la playa abierta quemaría. Nuestro rincón preferido de la zona.',
        },
        {
          name: 'Playa de La Pineda al amanecer',
          body: 'Arena amplia y mar en calma. A primera hora la luz es baja y dorada, casi no hay nadie y las fotos respiran calma. Perfecto para un after o una sesión a la mañana siguiente.',
        },
        {
          name: 'Jardines de Clos Barenys',
          body: 'Vegetación densa, caminos y rincones con aire de jardín botánico. Un mismo espacio te da varios fondos muy distintos sin salir de la finca.',
        },
        {
          name: 'Paseo marítimo de La Pineda',
          body: 'Palmeras, la fuente del paseo y el horizonte de mar. Un ambiente mediterráneo y luminoso, cómodo para caminar con el vestido sin complicaciones.',
        },
        {
          name: 'Entorno natural del Racó de la Torre',
          body: 'La transición entre el pinar y las zonas húmedas del litoral. Texturas de cañizo y pinos que dan fondos naturales poco vistos y muy propios de Vila-seca.',
        },
      ],
    },
    valueExtra: {
      title: 'Por qué el pinar-mar da una luz ideal',
      paras: [
        'La combinación de pinar y playa no es solo bonita: es **técnicamente útil**. Cuando el sol pega fuerte al mediodía, la playa abierta genera sombras duras y ojos entrecerrados. En cambio, bajo los pinares del Bosc de la Marquesa las copas hacen de difusor natural y la luz llega **suave y uniforme**. Podemos hacer retratos en cualquier franja horaria sin depender solo de la puesta de sol.',
        'Eso nos da margen para plantear un **timeline cómodo**: ceremonia y aperitivo cuando la luz aún está alta, un salto de diez minutos al pinar para los retratos de pareja con luz tamizada, y reservar la playa o el paseo para la hora dorada del final del día. Vosotros disfrutáis de la fiesta y nosotros aprovechamos cada tipo de luz en su momento.',
      ],
    },
    gallery: {
      title: 'Bodas en la Costa Daurada',
      intro:
        'Una selección de nuestro trabajo en la zona. El tono editorial y documental que ves aquí es el mismo que encontrarás tu día en Vila-seca o La Pineda.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Cubrís Vila-seca y La Pineda sin recargo?',
        a: 'Sí. Tenemos la base en Reus y todo el Tarragonès y la Costa Daurada entran dentro de nuestra zona habitual, así que **no aplicamos recargo de desplazamiento** en Vila-seca ni en La Pineda.',
      },
      {
        q: '¿Hacéis foto y vídeo a la vez?',
        a: 'Sí, y es nuestro punto fuerte: **Ferran** hace la fotografía y **Eric** el vídeo. Somos hermanos y trabajamos coordinados desde hace años, así que nos repartimos el espacio sin estorbarnos ni duplicarte proveedores.',
      },
      {
        q: '¿Cuánto tardáis en entregar el reportaje?',
        a: 'Hacemos un **avance en pocos días** para que tengas las primeras imágenes enseguida, y el reportaje completo lo entregamos en un plazo razonable que te confirmamos según la época del año. No te hacemos esperar meses.',
      },
      {
        q: '¿Se puede hacer la boda o la sesión en la playa? ¿Hace falta permiso?',
        a: 'Se puede, y es precioso. Para una ceremonia en la arena de La Pineda suele hacer falta **tramitar un permiso con el ayuntamiento**; nosotros no lo gestionamos, pero te orientamos sobre cómo funciona y adaptamos los tiempos al acceso y la marea. Para una sesión de pareja informal no suele hacer falta nada especial.',
      },
      {
        q: '¿Trabajáis con parejas internacionales?',
        a: 'Sí. La Costa Daurada recibe muchas parejas de fuera y estamos acostumbrados a bodas con invitados de varios países. Nos comunicamos en **catalán, castellano e inglés** y adaptamos el ritmo del día al vuestro.',
      },
    ],
    finalCta: {
      h2: '¿Nos cuentas tu boda en Vila-seca?',
      body: 'Dinos la fecha y el espacio y te diremos enseguida si tenemos disponibilidad. Sin compromiso y con respuesta rápida.',
      label: 'Escríbenos por WhatsApp',
    },
    formTitle: 'Hablemos de tu boda',
    formIntro:
      'Rellena cuatro campos y te contestamos pronto. Si lo prefieres, escríbenos directamente por WhatsApp y te respondemos el mismo día.',
    whatsAppMessage:
      '¡Hola Ferran y Eric! Nos casamos en la zona de Vila-seca / La Pineda y queríamos consultar vuestra disponibilidad de foto y vídeo.',
    breadcrumbCurrent: 'Fotógrafo de boda en Vila-seca y La Pineda',
  },

  en: {
    meta: {
      title: 'Wedding photographer in Vila-seca & La Pineda | Lifetime Weddings',
      description:
        'Wedding photography and film in Vila-seca and La Pineda, between the Bosc de la Marquesa pinewood and the sea. Documentary reportage, brothers on photo and film. Message us on WhatsApp.',
    },
    hero: {
      eyebrow: 'Vila-seca · La Pineda · Costa Daurada',
      h1: 'Wedding photographer in Vila-seca & La Pineda',
      sub: 'We are Ferran (photo) and Eric (film), two brothers based in Reus. In Vila-seca and La Pineda we work on home ground — from the Bosc de la Marquesa pinewood to the gardens of Clos Barenys, where we have already documented a real wedding.',
      heroAlt: 'Couple on their wedding day among pines by the sea in La Pineda',
      cta1: 'Check your date',
    },
    cardTitle: 'Vila-seca & La Pineda',
    cardBlurb:
      'A pinewood that meets the sea and a venue we already know first-hand: wedding photo and film on the Costa Daurada, with no travel surcharge.',
    intro: {
      title: 'A pinewood facing the sea to marry in',
      paras: [
        'Vila-seca and La Pineda offer something few coastal towns can: a **Mediterranean pinewood that reaches the sand**. The Bosc de la Marquesa filters the light through the canopy while the beach opens the horizon a few metres away. That mix of forest and sea is a gift for anyone who, like us, works with natural light.',
        'We are not coming in from far away. We are based in **Reus**, fifteen minutes off, and we cover the whole Tarragonès and the Costa Daurada **with no travel surcharge**. We know how the light moves in La Pineda, where the good midday shade sits inside the pinewood, and how the sun behaves as it drops towards the sea.',
        'And here in Vila-seca this is not theory: in the **gardens of L’Orangerie Clos Barenys** we documented the wedding of Elisabet and Josep, from early morning to the dance floor. That is the kind of work we do — honest, present, never interrupting what is happening.',
      ],
    },
    nearbyVenues: {
      title: 'Wedding venues in and around Vila-seca',
      intro:
        'A few of the places we love working in around here. When we have our own page for a venue, we link it so you can see more.',
      items: [
        {
          name: "L'Orangerie Clos Barenys",
          body: 'Our reference venue in Vila-seca. Gardens with the feel of a botanical garden and an orangerie full of beautifully filtered light. We documented **Elisabet and Josep’s** wedding here, so we can show you exactly what we capture on a real day — not a promise.',
          internalSlug: 'orangerie-clos-barenys',
        },
        {
          name: 'Mas La Boella',
          body: 'A few minutes from Vila-seca, set among olive trees, this stately country estate blends architecture, a chapel and grounds. One of the most characterful venues in the Camp de Tarragona and very easy to reach from the coast.',
          internalSlug: 'mas-la-boella',
        },
        {
          name: 'Seafront spaces in La Pineda',
          body: 'La Pineda gathers hotels and restaurants with terraces opening onto the promenade and the beach — ideal for a reception with the sea behind you and the sunset as a backdrop. Tell us which space you have in mind and we will help you read its light and its timings.',
        },
      ],
    },
    midCta: {
      title: 'Few high-season dates',
      body: 'We are two brothers, not an agency running parallel crews: each weekend we are at a single wedding. In spring and summer the coast books up early, so if you have a date in Vila-seca or La Pineda it is worth confirming availability sooner rather than later.',
      label: 'See if I have your date',
    },
    photoSpots: {
      title: 'Where we take the photos in Vila-seca & La Pineda',
      intro:
        'Spots we know well that genuinely work for the couple session, without losing half an afternoon to driving around.',
      items: [
        {
          name: 'Bosc de la Marquesa',
          body: 'The pinewood right by the sea. The canopy filters the sun and leaves a soft, diffused light even at midday, when the open beach would be harsh. Our favourite spot in the area.',
        },
        {
          name: 'La Pineda beach at sunrise',
          body: 'Wide sand and a calm sea. Early on the light is low and golden, there is almost no one around and the photos breathe. Perfect for an after or a session the morning after.',
        },
        {
          name: 'Clos Barenys gardens',
          body: 'Dense greenery, paths and corners with a botanical-garden feel. A single venue gives you several very different backdrops without leaving the grounds.',
        },
        {
          name: 'La Pineda promenade',
          body: 'Palm trees, the promenade fountain and the sea horizon. A bright, Mediterranean feel and easy to walk along in the dress without any fuss.',
        },
        {
          name: 'Racó de la Torre natural surroundings',
          body: 'The transition between the pinewood and the coastal wetlands. Reed and pine textures that give natural backdrops you rarely see and that feel very much of Vila-seca.',
        },
      ],
    },
    valueExtra: {
      title: 'Why pinewood-meets-sea gives ideal light',
      paras: [
        'The pinewood-and-beach combination is not just pretty — it is **technically useful**. When the midday sun is strong, the open beach creates hard shadows and squinting eyes. Under the pines of the Bosc de la Marquesa, though, the canopy acts as a natural diffuser and the light arrives **soft and even**. We can shoot portraits at any hour without depending solely on sunset.',
        'That gives us room to build a **comfortable timeline**: ceremony and aperitif while the light is still high, a ten-minute step into the pinewood for the couple portraits in filtered light, and the beach or promenade kept for the golden hour at the end of the day. You enjoy the party while we make the most of each kind of light in its moment.',
      ],
    },
    gallery: {
      title: 'Weddings on the Costa Daurada',
      intro:
        'A selection of our work in the area. The editorial, documentary tone you see here is the same one you will get on your day in Vila-seca or La Pineda.',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Do you cover Vila-seca and La Pineda with no surcharge?',
        a: 'Yes. We are based in Reus and the whole Tarragonès and Costa Daurada fall within our usual area, so we apply **no travel surcharge** in Vila-seca or La Pineda.',
      },
      {
        q: 'Do you do photo and film together?',
        a: 'Yes, and it is our strength: **Ferran** shoots the photography and **Eric** the film. We are brothers and have worked in sync for years, so we split the space without getting in each other’s way or making you hire two separate suppliers.',
      },
      {
        q: 'How long does delivery take?',
        a: 'We send a **preview within a few days** so you have the first images quickly, and we deliver the full reportage within a reasonable timeframe that we confirm depending on the season. We do not keep you waiting for months.',
      },
      {
        q: 'Can the wedding or session be on the beach? Is a permit needed?',
        a: 'It can, and it is beautiful. A ceremony on the sand in La Pineda usually requires **a permit from the town council**; we do not handle it ourselves, but we point you to how it works and adapt the timings to access and the tide. An informal couple session generally needs nothing special.',
      },
      {
        q: 'Do you work with international couples?',
        a: 'Yes. The Costa Daurada draws many couples from abroad and we are used to weddings with guests from several countries. We work in **Catalan, Spanish and English** and adapt the pace of the day to yours.',
      },
    ],
    finalCta: {
      h2: 'Tell us about your Vila-seca wedding?',
      body: 'Send us the date and the venue and we will tell you straight away whether we are free. No commitment and a quick reply.',
      label: 'Message us on WhatsApp',
    },
    formTitle: 'Let’s talk about your wedding',
    formIntro:
      'Fill in four fields and we will get back to you soon. If you prefer, message us directly on WhatsApp and we will reply the same day.',
    whatsAppMessage:
      'Hi Ferran and Eric! We are getting married in the Vila-seca / La Pineda area and would like to check your availability for photo and film.',
    breadcrumbCurrent: 'Wedding photographer in Vila-seca & La Pineda',
  },
};
