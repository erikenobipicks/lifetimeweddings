import type { TownServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const TORREDEMBARRA_TOWN: Record<Lang, TownServiceCopy> = {
  ca: {
    meta: {
      title: 'Fotògraf de boda a Torredembarra | Lifetime Weddings',
      description:
        'Fotògraf de boda a Torredembarra i el Tarragonès. Som dos germans de Reus: **Ferran** a la foto, **Eric** al vídeo. Dunes dels Muntanyans, casc antic i el Castell dels Icart. Costa Daurada sense recàrrec.',
    },
    hero: {
      eyebrow: 'Torredembarra · Tarragonès · Costa Daurada',
      h1: 'Fotògraf de boda a Torredembarra',
      sub: 'Som **Ferran i Eric**, dos germans de Reus. Jo faig la fotografia, el meu germà el vídeo. Coneixem Torredembarra de tota la vida: les dunes protegides dels **Muntanyans**, el port i els carrers del nucli antic al voltant del **Castell dels Icart**.',
      heroAlt: 'Parella el dia de la seva boda a la Costa Daurada a la llum daurada del capvespre',
      cta1: 'Mira dates lliures',
    },
    cardTitle: 'Bodes a Torredembarra',
    cardBlurb:
      'Foto i vídeo de boda a Torredembarra i el Tarragonès, amb les dunes dels Muntanyans i el casc antic com a escenari.',
    intro: {
      title: 'Dos germans, una boda ben explicada',
      paras: [
        'Ens agrada dir les coses clares: som **dos**. **Ferran** —jo— porto la càmera de fotos i **Eric**, el meu germà, porta el vídeo. Som sempre nosaltres dos, i això es nota en com ens movem junts sense trepitjar-nos.',
        'Treballem des de **Reus** i cobrim tota la **Costa Daurada sense recàrrec de desplaçament**, així que venir a Torredembarra és casa nostra. Coneixem la llum de la platja a primera hora, sabem a quina hora el sol daurat cau sobre les dunes i on el nucli antic dona ombra bona al migdia.',
        'La nostra manera de fotografiar és **documental i càlida**: mirem més que dirigim. Volem que d\'aquí uns anys, quan obriu l\'àlbum, recordeu com **va anar** el dia de veritat, no una sessió de poses. Poques indicacions, molta atenció.',
      ],
    },
    nearbyVenues: {
      title: 'Espais de boda a prop de Torredembarra',
      intro:
        'Aquests són alguns dels llocs on ens agrada treballar a la zona. Si el vostre espai no hi és, expliqueu-nos-el: gairebé segur que ja hi hem estat.',
      items: [
        {
          name: 'Castell dels Icart',
          body:
            'El **palau renaixentista** del nucli antic de Torredembarra, un dels edificis civils del segle XVI més ben conservats de Catalunya. La seva façana i els carrers de pedra del voltant són un marc immillorable per als retrats a última hora de la tarda.',
        },
        {
          name: 'Castell de Tamarit',
          body:
            'A pocs minuts, sobre el mar, un dels castells més fotogènics de la costa. Tenim fitxa pròpia amb tot el que hem après fotografiant-hi bodes.',
          internalSlug: 'castell-de-tamarit',
        },
        {
          name: 'Mas Passamaner',
          body:
            'Una mica cap a l\'interior, a la Selva del Camp, aquesta antiga masia modernista és una alternativa preciosa si busqueu un espai amb jardins i història. Us l\'expliquem en detall a la seva fitxa.',
          internalSlug: 'mas-passamaner',
        },
        {
          name: 'Masies del Tarragonès',
          body:
            'Al voltant de Torredembarra hi ha masies i finques rurals amb pati, pedra vella i vinya a tocar. Són perfectes per a una celebració més recollida i de tarda llarga. Digueu-nos quina teniu al cap.',
        },
      ],
    },
    midCta: {
      title: 'Només agafem unes quantes bodes l\'any',
      body:
        'Per fer-ho bé i sense presses, tanquem un nombre limitat de dates cada temporada. Els caps de setmana de primavera i de setembre a Torredembarra volen aviat. Si teniu data, val la pena que ens escriviu abans de decidir res.',
      label: 'Consulta la meva data',
    },
    photoSpots: {
      title: 'Racons per fotografiar a Torredembarra',
      intro:
        'Alguns dels llocs que aprofitem quan l\'horari de la boda ho permet. No cal anar-hi tots; triem segons la llum i el que us ve de gust.',
      items: [
        {
          name: 'Els Muntanyans',
          body:
            'El **sistema dunar protegit** de Torredembarra, un paisatge natural gairebé únic a la costa: dunes, llacunes i canyís. És un fons preciós i diferent, però és un **espai protegit**: hi anem amb respecte, sense sortir dels camins ni trepitjar la vegetació.',
        },
        {
          name: 'La platja a l\'alba',
          body:
            'Si us hi animeu, una escapada curta a primera hora l\'endemà o abans de la cerimònia regala una llum suau i una platja buida. És íntim i val molt la pena.',
        },
        {
          name: 'Port esportiu',
          body:
            'El **port** aporta textures marineres: pantalans, veles i reflexos a l\'aigua. Funciona molt bé al capvespre, quan tot agafa un to càlid.',
        },
        {
          name: 'Castell dels Icart',
          body:
            'La pedra del **palau renaixentista** i els carrerons del voltant donen retrats amb caràcter i una mica d\'història catalana de fons.',
        },
        {
          name: 'Casc antic',
          body:
            'Els carrers estrets del **nucli antic** ofereixen ombra bona al migdia i racons tranquils per a un parell de fotos sense públic pel mig.',
        },
      ],
    },
    valueExtra: {
      title: 'Per què les dunes canvien les vostres fotos',
      paras: [
        'Poques localitats de la Costa Daurada tenen un fons com **els Muntanyans**. Mentre que en gairebé tota la costa la platja és sorra i para-sols, aquí teniu dunes, llacunes i canyís: un paisatge natural que dona a les imatges una textura que no es veu enlloc més de la zona.',
        'A la pràctica juguem amb la **llum daurada** de l\'última hora del dia, quan les dunes s\'omplen d\'ombres llargues i el to és càlid. Sortim uns minuts de la festa, fem quatre fotos amb calma i tornem: no us robem el sarau.',
        'Ho fem sempre **respectant l\'espai**: és una zona protegida i s\'hi ha d\'entrar amb cura, pels camins marcats. Ni un pas fora del que toca. Aquesta és la manera d\'aconseguir imatges boniques sense fer mal al lloc que les fa possibles.',
      ],
    },
    gallery: {
      title: 'Una mostra de la nostra feina',
      intro:
        'Una selecció del nostre estil documental i càlid. No són bodes de Torredembarra concretes, sinó exemples de com mirem i com expliquem un dia.',
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Cobreu Torredembarra sense recàrrec?',
        a: 'Sí. Treballem des de **Reus** i tota la **Costa Daurada entra sense recàrrec de desplaçament**, Torredembarra inclosa. El que pressupostem és la cobertura, no els quilòmetres.',
      },
      {
        q: 'Es poden fer fotos a les dunes dels Muntanyans?',
        a: 'Sí, però amb cap. És un **espai natural protegit**: s\'hi entra pels camins marcats i sense trepitjar la vegetació. Ho tenim molt clar i us guiem perquè les fotos surtin bé sense afectar l\'entorn.',
      },
      {
        q: 'Veniu els dos, foto i vídeo?',
        a: 'Podeu contractar només foto, només vídeo o tots dos. Si voleu el paquet complet, venim els dos germans: **Ferran** a la foto i **Eric** al vídeo, coordinats des del primer minut.',
      },
      {
        q: 'I si plou o fa vent a la costa?',
        a: 'Passa, i estem acostumats. Tenim plans B pel casc antic i els porxos, i sabem trobar recer al voltant del **Castell dels Icart**. El vent a la platja també el treballem: de vegades és el que dona vida a una foto.',
      },
      {
        q: 'Amb quanta antelació us hem de reservar?',
        a: 'Com abans millor, sobretot per a caps de setmana de primavera i setembre. Agafem poques bodes l\'any per dedicar-nos-hi de veritat, així que les dates bones es tanquen aviat.',
      },
    ],
    finalCta: {
      h2: 'Expliquem la vostra boda a Torredembarra?',
      body:
        'Si us fa patxoca la idea de dues persones que us coneixen, us respecten el dia i coneixen la zona pam a pam, escriviu-nos. Us responem nosaltres, sense intermediaris.',
      label: 'Escriu-nos per WhatsApp',
    },
    formTitle: 'Parlem de la vostra data',
    formIntro:
      'Deixeu-nos la data i l\'espai de Torredembarra (o d\'on sigui) i us diem de seguida si estem lliures i com ho faríem.',
    whatsAppMessage:
      'Hola Ferran i Eric! Ens casem a Torredembarra i m\'agradaria saber si teniu la data lliure per a foto i/o vídeo.',
    breadcrumbCurrent: 'Fotògraf de boda a Torredembarra',
  },

  es: {
    meta: {
      title: 'Fotógrafo de boda en Torredembarra | Lifetime Weddings',
      description:
        'Fotógrafo de boda en Torredembarra y el Tarragonès. Somos dos hermanos de Reus: **Ferran** en la foto, **Eric** en el vídeo. Dunas de los Muntanyans, casco antiguo y el Castell dels Icart. Costa Daurada sin recargo.',
    },
    hero: {
      eyebrow: 'Torredembarra · Tarragonès · Costa Daurada',
      h1: 'Fotógrafo de boda en Torredembarra',
      sub: 'Somos **Ferran y Eric**, dos hermanos de Reus. Yo hago la fotografía y mi hermano el vídeo. Conocemos Torredembarra de toda la vida: las dunas protegidas de los **Muntanyans**, el puerto y las calles del casco antiguo alrededor del **Castell dels Icart**.',
      heroAlt: 'Pareja el día de su boda en la Costa Daurada con la luz dorada del atardecer',
      cta1: 'Mira fechas libres',
    },
    cardTitle: 'Bodas en Torredembarra',
    cardBlurb:
      'Foto y vídeo de boda en Torredembarra y el Tarragonès, con las dunas de los Muntanyans y el casco antiguo como escenario.',
    intro: {
      title: 'Dos hermanos, una boda bien contada',
      paras: [
        'Nos gusta decir las cosas claras: somos **dos**. **Ferran** —yo— llevo la cámara de fotos y **Eric**, mi hermano, lleva el vídeo. Somos siempre nosotros dos, y eso se nota en cómo nos movemos juntos sin pisarnos.',
        'Trabajamos desde **Reus** y cubrimos toda la **Costa Daurada sin recargo de desplazamiento**, así que venir a Torredembarra es como estar en casa. Conocemos la luz de la playa a primera hora, sabemos a qué hora el sol dorado cae sobre las dunas y dónde el casco antiguo da buena sombra al mediodía.',
        'Nuestra manera de fotografiar es **documental y cálida**: miramos más que dirigimos. Queremos que dentro de unos años, cuando abráis el álbum, recordéis cómo **fue** el día de verdad, no una sesión de posados. Pocas indicaciones, mucha atención.',
      ],
    },
    nearbyVenues: {
      title: 'Espacios de boda cerca de Torredembarra',
      intro:
        'Estos son algunos de los lugares donde nos gusta trabajar en la zona. Si vuestro espacio no está, contádnoslo: casi seguro que ya hemos estado.',
      items: [
        {
          name: 'Castell dels Icart',
          body:
            'El **palacio renacentista** del casco antiguo de Torredembarra, uno de los edificios civiles del siglo XVI mejor conservados de Cataluña. Su fachada y las calles de piedra de alrededor son un marco inmejorable para los retratos a última hora de la tarde.',
        },
        {
          name: 'Castell de Tamarit',
          body:
            'A pocos minutos, sobre el mar, uno de los castillos más fotogénicos de la costa. Tenemos ficha propia con todo lo que hemos aprendido fotografiando bodas allí.',
          internalSlug: 'castell-de-tamarit',
        },
        {
          name: 'Mas Passamaner',
          body:
            'Algo hacia el interior, en la Selva del Camp, esta antigua masía modernista es una alternativa preciosa si buscáis un espacio con jardines e historia. Os lo contamos en detalle en su ficha.',
          internalSlug: 'mas-passamaner',
        },
        {
          name: 'Masías del Tarragonès',
          body:
            'Alrededor de Torredembarra hay masías y fincas rurales con patio, piedra vieja y viña al lado. Son perfectas para una celebración más recogida y de tarde larga. Decidnos cuál tenéis en mente.',
        },
      ],
    },
    midCta: {
      title: 'Solo cogemos unas cuantas bodas al año',
      body:
        'Para hacerlo bien y sin prisas, cerramos un número limitado de fechas cada temporada. Los fines de semana de primavera y de septiembre en Torredembarra vuelan pronto. Si tenéis fecha, vale la pena que nos escribáis antes de decidir nada.',
      label: 'Consulta mi fecha',
    },
    photoSpots: {
      title: 'Rincones para fotografiar en Torredembarra',
      intro:
        'Algunos de los lugares que aprovechamos cuando el horario de la boda lo permite. No hace falta ir a todos; elegimos según la luz y lo que os apetezca.',
      items: [
        {
          name: 'Els Muntanyans',
          body:
            'El **sistema dunar protegido** de Torredembarra, un paisaje natural casi único en la costa: dunas, lagunas y carrizo. Es un fondo precioso y distinto, pero es un **espacio protegido**: entramos con respeto, sin salirnos de los caminos ni pisar la vegetación.',
        },
        {
          name: 'La playa al amanecer',
          body:
            'Si os animáis, una escapada corta a primera hora al día siguiente o antes de la ceremonia regala una luz suave y una playa vacía. Es íntimo y merece mucho la pena.',
        },
        {
          name: 'Puerto deportivo',
          body:
            'El **puerto** aporta texturas marineras: pantalanes, velas y reflejos en el agua. Funciona muy bien al atardecer, cuando todo coge un tono cálido.',
        },
        {
          name: 'Castell dels Icart',
          body:
            'La piedra del **palacio renacentista** y las callejuelas de alrededor dan retratos con carácter y algo de historia catalana de fondo.',
        },
        {
          name: 'Casco antiguo',
          body:
            'Las calles estrechas del **casco antiguo** ofrecen buena sombra al mediodía y rincones tranquilos para un par de fotos sin público de por medio.',
        },
      ],
    },
    valueExtra: {
      title: 'Por qué las dunas cambian vuestras fotos',
      paras: [
        'Pocas localidades de la Costa Daurada tienen un fondo como **los Muntanyans**. Mientras que en casi toda la costa la playa es arena y sombrillas, aquí tenéis dunas, lagunas y carrizo: un paisaje natural que da a las imágenes una textura que no se ve en ningún otro sitio de la zona.',
        'En la práctica jugamos con la **luz dorada** de la última hora del día, cuando las dunas se llenan de sombras largas y el tono es cálido. Salimos unos minutos de la fiesta, hacemos unas fotos con calma y volvemos: no os robamos el jaleo.',
        'Lo hacemos siempre **respetando el espacio**: es una zona protegida y hay que entrar con cuidado, por los caminos marcados. Ni un paso fuera de lo que toca. Esa es la manera de conseguir imágenes bonitas sin dañar el lugar que las hace posibles.',
      ],
    },
    gallery: {
      title: 'Una muestra de nuestro trabajo',
      intro:
        'Una selección de nuestro estilo documental y cálido. No son bodas concretas de Torredembarra, sino ejemplos de cómo miramos y cómo contamos un día.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Cubrís Torredembarra sin recargo?',
        a: 'Sí. Trabajamos desde **Reus** y toda la **Costa Daurada entra sin recargo de desplazamiento**, Torredembarra incluida. Lo que presupuestamos es la cobertura, no los kilómetros.',
      },
      {
        q: '¿Se pueden hacer fotos en las dunas de los Muntanyans?',
        a: 'Sí, pero con cabeza. Es un **espacio natural protegido**: se entra por los caminos marcados y sin pisar la vegetación. Lo tenemos muy claro y os guiamos para que las fotos salgan bien sin afectar al entorno.',
      },
      {
        q: '¿Venís los dos, foto y vídeo?',
        a: 'Podéis contratar solo foto, solo vídeo o ambos. Si queréis el paquete completo, venimos los dos hermanos: **Ferran** en la foto y **Eric** en el vídeo, coordinados desde el primer minuto.',
      },
      {
        q: '¿Y si llueve o hace viento en la costa?',
        a: 'Pasa, y estamos acostumbrados. Tenemos planes B por el casco antiguo y los porches, y sabemos encontrar resguardo alrededor del **Castell dels Icart**. El viento en la playa también lo trabajamos: a veces es lo que da vida a una foto.',
      },
      {
        q: '¿Con cuánta antelación hay que reservar?',
        a: 'Cuanto antes mejor, sobre todo para fines de semana de primavera y septiembre. Cogemos pocas bodas al año para dedicarnos de verdad, así que las buenas fechas se cierran pronto.',
      },
    ],
    finalCta: {
      h2: '¿Contamos vuestra boda en Torredembarra?',
      body:
        'Si os seduce la idea de dos personas que os conocen, respetan vuestro día y conocen la zona palmo a palmo, escribidnos. Os respondemos nosotros, sin intermediarios.',
      label: 'Escríbenos por WhatsApp',
    },
    formTitle: 'Hablemos de vuestra fecha',
    formIntro:
      'Dejadnos la fecha y el espacio de Torredembarra (o de donde sea) y os decimos enseguida si estamos libres y cómo lo haríamos.',
    whatsAppMessage:
      '¡Hola Ferran y Eric! Nos casamos en Torredembarra y me gustaría saber si tenéis la fecha libre para foto y/o vídeo.',
    breadcrumbCurrent: 'Fotógrafo de boda en Torredembarra',
  },

  en: {
    meta: {
      title: 'Wedding photographer in Torredembarra | Lifetime Weddings',
      description:
        'Wedding photographer in Torredembarra and the Tarragonès. We are two brothers from Reus: **Ferran** on stills, **Eric** on film. The protected Muntanyans dunes, the old town and the Castell dels Icart. Costa Daurada with no travel surcharge.',
    },
    hero: {
      eyebrow: 'Torredembarra · Tarragonès · Costa Daurada',
      h1: 'Wedding photographer in Torredembarra',
      sub: 'We are **Ferran and Eric**, two brothers from Reus. I take the photographs and my brother shoots the film. We have known Torredembarra all our lives: the protected **Muntanyans** dunes, the marina and the old-town streets around the **Castell dels Icart**.',
      heroAlt: 'Couple on their wedding day on the Costa Daurada in warm golden-hour light',
      cta1: 'See open dates',
    },
    cardTitle: 'Weddings in Torredembarra',
    cardBlurb:
      'Wedding photo and film in Torredembarra and the Tarragonès, with the Muntanyans dunes and the old town as your backdrop.',
    intro: {
      title: 'Two brothers, one wedding told well',
      paras: [
        'We like to be plain about it: there are **two** of us. **Ferran** —that is me— carries the stills camera, and my brother **Eric** shoots the film. It is always the two of us, and it shows in how we move together without getting in each other\'s way.',
        'We work out of **Reus** and cover the whole **Costa Daurada with no travel surcharge**, so coming to Torredembarra feels like home ground. We know the beach light first thing in the morning, and where the old town gives good shade at midday.',
        'Our way of shooting is **documentary and warm**: we watch more than we direct. Years from now, when you open the album, we want you to remember how the day **actually was**, not a posing session.',
      ],
    },
    nearbyVenues: {
      title: 'Wedding venues near Torredembarra',
      intro:
        'A few of the places we love working in around here. If your venue is not on the list, tell us about it: chances are we have already been there.',
      items: [
        {
          name: 'Castell dels Icart',
          body:
            'The **Renaissance palace** in the old town of Torredembarra, one of the best-preserved 16th-century civil buildings in Catalonia. Its façade and the stone streets around it make an unbeatable frame for late-afternoon portraits.',
        },
        {
          name: 'Castell de Tamarit',
          body:
            'A few minutes away, right above the sea, one of the most photogenic castles on the coast. We have our own guide with everything we have learned photographing weddings there.',
          internalSlug: 'castell-de-tamarit',
        },
        {
          name: 'Mas Passamaner',
          body:
            'A little inland, in La Selva del Camp, this former Modernista country house is a lovely alternative if you want a venue with gardens and history. We cover it in detail on its own page.',
          internalSlug: 'mas-passamaner',
        },
        {
          name: 'Tarragonès country houses',
          body:
            'Around Torredembarra there are farmhouses and rural estates with courtyards, old stone and vines close by. Perfect for a more intimate celebration and a long afternoon. Tell us which one you have in mind.',
        },
      ],
    },
    midCta: {
      title: 'We only take a handful of weddings a year',
      body:
        'To do it properly and unhurried, we close a limited number of dates each season. Spring and September weekends in Torredembarra go early. If you have a date, it is worth writing to us before you decide anything.',
      label: 'Check my date',
    },
    photoSpots: {
      title: 'Places to photograph in Torredembarra',
      intro:
        'Some of the spots we make the most of when the wedding schedule allows. No need to visit them all; we choose based on the light and on what you feel like.',
      items: [
        {
          name: 'Els Muntanyans',
          body:
            'Torredembarra\'s **protected dune system**, a natural landscape almost unique on this coast: dunes, lagoons and reed beds. It is a beautiful, different backdrop, but it is a **protected area**: we go in with respect, never leaving the paths or treading on the vegetation.',
        },
        {
          name: 'The beach at dawn',
          body:
            'If you are up for it, a short early-morning outing the next day or before the ceremony rewards you with soft light and an empty beach. It is intimate and very much worth it.',
        },
        {
          name: 'The marina',
          body:
            'The **marina** brings seafaring textures: pontoons, sails and reflections on the water. It works beautifully at dusk, when everything turns warm.',
        },
        {
          name: 'Castell dels Icart',
          body:
            'The stone of the **Renaissance palace** and the lanes around it give portraits with character and a touch of Catalan history behind them.',
        },
        {
          name: 'Old town',
          body:
            'The narrow streets of the **old town** offer good midday shade and quiet corners for a couple of photographs away from the crowd.',
        },
      ],
    },
    valueExtra: {
      title: 'Why the dunes change your photographs',
      paras: [
        'Few towns on the Costa Daurada have a backdrop like **the Muntanyans**. Where most of the coast is sand and parasols, here you have dunes, lagoons and reed beds: a texture you will not find anywhere else in the area.',
        'In practice we play with the **golden light** of the last hour of the day, when the dunes fill with long shadows. We slip away from the party for a few minutes, take some unhurried frames and come straight back: we will not steal you from the fun.',
        'We always do it **respecting the space**: it is a protected area and you enter carefully, along the marked paths. That is how you get beautiful images without harming the very place that makes them possible.',
      ],
    },
    gallery: {
      title: 'A taste of our work',
      intro:
        'A selection of our warm, documentary style. These are not specific Torredembarra weddings, but examples of how we see and how we tell a day.',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Do you cover Torredembarra with no surcharge?',
        a: 'Yes. We work out of **Reus** and the whole **Costa Daurada is included with no travel surcharge**, Torredembarra among them. What we quote is the coverage, not the mileage.',
      },
      {
        q: 'Can you take photos in the Muntanyans dunes?',
        a: 'Yes, but sensibly. It is a **protected natural area**: you enter along the marked paths and without treading on the vegetation. We are very clear about this and we guide you so the photos turn out well without harming the surroundings.',
      },
      {
        q: 'Do both of you come, photo and film?',
        a: 'You can book photo only, film only or both. If you want the full package, both brothers come: **Ferran** on stills and **Eric** on film, coordinated from the very first minute.',
      },
      {
        q: 'What if it rains or the coast is windy?',
        a: 'It happens, and we are used to it. We have plan-B corners in the old town and under the porches, and we know where to find shelter around the **Castell dels Icart**. We work with the beach wind too: sometimes it is exactly what brings a photo to life.',
      },
      {
        q: 'How far in advance should we book?',
        a: 'The sooner the better, especially for spring and September weekends. We take on few weddings a year so we can truly commit to them, so the good dates close early.',
      },
    ],
    finalCta: {
      h2: 'Shall we tell your Torredembarra wedding?',
      body:
        'If you like the idea of two people who know you, respect your day and know the area inch by inch, write to us. You reach us directly, with no middlemen.',
      label: 'Message us on WhatsApp',
    },
    formTitle: 'Let\'s talk about your date',
    formIntro:
      'Leave us your date and your Torredembarra venue (or wherever it is) and we will tell you right away whether we are free and how we would approach it.',
    whatsAppMessage:
      'Hi Ferran and Eric! We are getting married in Torredembarra and I would love to know if you have the date free for photo and/or film.',
    breadcrumbCurrent: 'Wedding photographer in Torredembarra',
  },
};
