import type { CityServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

// Photo cluster copy for Tarragona city. Written from the photographer's POV
// (Ferran on the camera). Voice: warm first-person plural, editorial, honest,
// local. Cross-references the video service once. Spots are real places in and
// around Tarragona; the note about MHT authorization inside ticketed Roman
// monuments is factual — pro shoots inside them need permission.

export const TARRAGONA_PHOTO: Record<Lang, CityServiceCopy> = {
  ca: {
    meta: {
      title: 'Fotògraf de boda a Tarragona | Lifetime Weddings',
      description:
        'Fotògraf de boda a Tarragona: fotoperiodisme i llum natural a la Part Alta, el Balcó del Mediterrani i el Serrallo. Germans de Reus, galeria en una setmana.',
    },
    hero: {
      eyebrow: 'Fotografia de boda · Tarragona',
      h1: 'Fotògraf de boda a Tarragona',
      sub: 'Fotoperiodisme honest, llum de veritat i retrats que respiren mar. Som dos germans de Reus i coneixem cada carrer de la Part Alta.',
      heroAlt: 'Parella el dia de la seva boda a la Part Alta de Tarragona a l’hora daurada',
    },
    cardTitle: 'Fotògraf de boda a Tarragona',
    cardBlurb:
      'Reportatge de boda a Tarragona amb mirada de fotoperiodista: la Part Alta, el Balcó del Mediterrani i el Serrallo, i galeria en una setmana.',
    intro: {
      title: 'La vostra boda a Tarragona, explicada tal com passa',
      paras: [
        `Som en **Ferran i l’Eric**, dos germans de **Reus**. En Ferran fa la fotografia i l’Eric el vídeo, i entre els dos cobrim el **Camp de Tarragona** cada temporada. Tarragona ciutat és, segurament, on més hem disparat: la coneixem amb el sol del matí i amb la llum taronja de les set de la tarda, i sabem quins carrers de la **Part Alta** queden buits a quina hora.`,
        `Treballem des del **fotoperiodisme**: no dirigim la boda, l’acompanyem. Ens interessa la mà de l’avi que tremola quan et posa l’arracada, el germà que s’emociona abans que ningú, la llum que entra per la finestra mentre t’acabes de vestir. Fem retrats, sí, i ens agrada fer-los bé i amb calma, però la columna vertebral del reportatge són els **moments que no es repeteixen**.`,
        `Ser d’aquí ho canvia tot. Sabem que a l’agost la Part Alta s’omple de turistes a mig matí i que val més fer els retrats d’hora, que el vent del Balcó despentina en deu segons i que el Serrallo fa una olor concreta que surt a les fotos. I si també voleu moviment i so, l’Eric **us fa el vídeo de la boda a Tarragona** el mateix dia, coordinats, sense trepitjar-nos.`,
      ],
    },
    spots: {
      title: 'Racons de Tarragona on ens agrada fotografiar',
      intro:
        'Aquests són alguns dels llocs que fem servir de veritat. No és una llista de postals: és on sabem que la llum, la pedra i la intimitat es porten bé amb una càmera.',
      items: [
        {
          name: 'Part Alta i Catedral',
          body: 'El cor medieval de la ciutat: carrerons de pedra, la façana de la Catedral i portals que filtren la llum com un plató natural. Hi fem retrats íntims i caminades tranquil·les; a primera hora del matí o cap al tard queda gairebé per a vosaltres.',
        },
        {
          name: 'Balcó del Mediterrani',
          body: 'La barana de ferro sobre el mar, al final de la Rambla Nova. És el retrat de postal de Tarragona al capvespre, amb el blau obrint-se darrere. Toquem ferro per sort i esperem la llum baixa: el sol lateral hi fa una hora daurada que val la pena.',
        },
        {
          name: 'Amfiteatre i muralles romanes',
          body: 'La pedra romana sobre el mar és imponent i molt cinematogràfica. Important i honest: l’Amfiteatre i altres monuments amb entrada són gestionats pel MHT i per fer-hi una sessió professional cal autorització. Ho tramitem amb temps; si no toca, fem els retrats des de fora, on les muralles ja fan de fons espectacular.',
        },
        {
          name: 'El Serrallo',
          body: 'El barri de pescadors, amb les barques, les xarxes i una llum de moll molt honesta. Aquí el reportatge respira veritat: colors gastats, gent real i un final de tarda que es tenyeix de taronja sobre l’aigua. Perfecte per a parelles que fugen del postisme.',
        },
        {
          name: 'Platja del Miracle i Punta de la Mora',
          body: 'De la platja urbana als penya-segats i la torre de la Mora, tenim mar per triar. Per als retrats de després del sopar o una sessió l’endemà, la sorra i la llum rasant fan una fotografia neta i lluminosa, amb el so de les onades de fons.',
        },
        {
          name: 'Castell de Tamarit',
          body: 'A tocar de Tarragona, sobre la platja de Tamarit, un castell medieval amb l’església i el mar als peus. És un dels marcs més bonics de la zona per a cerimònies i per a retrats amb pedra i horitzó a la vegada.',
        },
      ],
    },
    style: {
      title: 'La llum i el caràcter de Tarragona',
      paras: [
        `Tarragona té una **llum de mar** molt particular: neta, una mica salada, amb capvespres llargs que a l’estiu s’allarguen fins passades les nou. La pedra daurada de la Part Alta i les muralles la retornen càlida, i això ens permet fer retrats amb caràcter sense forçar res. Treballem gairebé sempre amb **llum natural** i, quan cal, amb un toc discret de flaix.`,
        `És una ciutat que barreja el romà, el medieval i el mar en cinc minuts a peu: passem d’un carreró d’ombra a un balcó sobre el Mediterrani sense agafar el cotxe. I al voltant, el **Camp de Tarragona** ofereix masies com **Mas La Boella**, entre oliveres, per a qui vol una boda més de camp sense allunyar-se de la ciutat.`,
      ],
    },
    approach: {
      title: 'Com fotografiem una boda a Tarragona',
      bullets: [
        '**Fotoperiodisme primer**: documentem el dia tal com passa, sense inventar escenes ni interrompre els moments importants.',
        '**Retrats amb calma**: vint minuts ben aprofitats a la Part Alta o al Balcó valen més que una hora de poses forçades.',
        '**Llum natural**: llegim l’hora i el lloc; busquem l’ombra bona al migdia i l’hora daurada al capvespre.',
        '**Coneixement local**: sabem on hi ha gent, on no, i com moure’ns per la ciutat sense perdre temps ni llum.',
        '**Permisos amb temps**: si voleu retrats dins de monuments amb entrada, ho gestionem amb el MHT abans del dia.',
        '**Galeria en una setmana**: rebeu una selecció d’avanç ben aviat i la galeria completa editada en uns set dies.',
      ],
    },
    gallery: {
      title: 'Fotografies de boda al Camp de Tarragona',
      intro:
        'Una selecció del nostre reportatge a la zona. Quan encara no tenim galeria pública lligada a aquesta ciutat, us ensenyem feina real d’altres bodes del Camp de Tarragona perquè vegeu el nostre tracte de la llum i dels moments.',
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Teniu data lliure per a la nostra boda a Tarragona?',
        a: 'Treballem un nombre limitat de bodes per temporada per cuidar cada reportatge. Escriviu-nos amb la data com abans millor i us confirmem disponibilitat de seguida; els caps de setmana de primavera i tardor volen aviat.',
      },
      {
        q: 'Us heu de desplaçar? Cobreu quilometratge?',
        a: 'Som de Reus, a un quart de Tarragona, i la ciutat és zona nostra de sempre: no hi ha suplement de desplaçament per a bodes al Camp de Tarragona. Per a destinacions més lluny ho parlem obertament abans de tancar res.',
      },
      {
        q: 'Quan tindrem les fotos?',
        a: 'Rebeu un avanç d’unes imatges pocs dies després de la boda i la galeria completa editada en una setmana aproximadament. Sempre us diem la data exacta quan tanquem l’agenda de l’any.',
      },
      {
        q: 'Podem contractar foto i vídeo alhora?',
        a: 'Sí, i és el que recomanem. En Ferran fa la foto i l’Eric el vídeo, som germans i treballem coordinats des de sempre: ens movem sense molestar-nos i el dia us surt més rodó i sovint més ajustat de preu que amb dos equips separats.',
      },
      {
        q: 'Es poden fer fotos dins de l’Amfiteatre o les muralles?',
        a: 'Els monuments romans amb entrada els gestiona el MHT i una sessió professional necessita autorització prèvia. Ho tramitem amb temps si ho voleu; si no, fem retrats espectaculars des del Passeig Arqueològic i des de fora, on la pedra ja fa de fons.',
      },
    ],
    finalCta: {
      h2: 'Fem la vostra fotografia de boda a Tarragona',
      body: 'Expliqueu-nos com us imagineu el dia i quins racons de Tarragona us fan il·lusió. Us responem ràpid, sense compromís, i us diem de seguida si tenim la data lliure.',
    },
    formTitle: 'Demaneu disponibilitat i pressupost',
    formIntro:
      'Digueu-nos la data, el lloc de la cerimònia i si voleu només foto o també vídeo. Us contestem en persona, mai amb un formulari automàtic.',
    whatsAppMessage:
      'Hola Lifetime Weddings! Ens casem a Tarragona i volem informació de fotografia de boda.',
    breadcrumbCurrent: 'Fotògraf de boda a Tarragona',
  },
  es: {
    meta: {
      title: 'Fotógrafo de boda en Tarragona | Lifetime Weddings',
      description:
        'Fotógrafos de boda en Tarragona y el Camp de Tarragona: Reus, Cambrils, la Costa Daurada, masías como Mas La Boella, Orangerie o Parc Samà. Hermanos de Reus, foto+vídeo.',
    },
    hero: {
      eyebrow: 'Fotografía de boda · Tarragona',
      h1: 'Fotógrafo de boda en Tarragona',
      sub: 'Fotoperiodismo honesto, luz de verdad y retratos que huelen a mar. Somos dos hermanos de Reus y conocemos cada calle de la Part Alta.',
      heroAlt: 'Pareja el día de su boda en la Part Alta de Tarragona a la hora dorada',
    },
    cardTitle: 'Fotógrafo de boda en Tarragona',
    cardBlurb:
      'Reportaje de boda en Tarragona con mirada de fotoperiodista: la Part Alta, el Balcó del Mediterrani y el Serrallo, y galería en una semana.',
    intro: {
      title: 'Vuestra boda en Tarragona, contada tal y como sucede',
      paras: [
        `Somos **Ferran y Eric**, dos hermanos de **Reus**. Ferran hace la fotografía y Eric el vídeo, y entre los dos cubrimos el **Camp de Tarragona** cada temporada. Tarragona ciudad es, seguramente, donde más hemos disparado: la conocemos con el sol de la mañana y con la luz naranja de las siete de la tarde, y sabemos qué calles de la **Part Alta** quedan vacías a qué hora.`,
        `Trabajamos desde el **fotoperiodismo**: no dirigimos la boda, la acompañamos. Nos interesa la mano del abuelo que tiembla al ponerte el pendiente, el hermano que se emociona antes que nadie, la luz que entra por la ventana mientras acabas de vestirte. Hacemos retratos, claro, y nos gusta hacerlos bien y con calma, pero la columna vertebral del reportaje son los **momentos que no se repiten**.`,
        `Ser de aquí lo cambia todo. Sabemos que en agosto la Part Alta se llena de turistas a media mañana y que conviene hacer los retratos temprano, que el viento del Balcó despeina en diez segundos y que el Serrallo huele a algo concreto que sale en las fotos. Y si además queréis movimiento y sonido, Eric **os hace el vídeo de la boda en Tarragona** el mismo día, coordinados, sin pisarnos.`,
        `Y aunque **Tarragona ciudad** es nuestra base natural, cubrimos **todo el Camp de Tarragona sin recargo de desplazamiento**: bodas en **Reus**, en **Cambrils** y la **Costa Daurada**, y en las masías y fincas de toda la zona. Si buscáis **fotógrafos de bodas en Tarragona** que se conozcan de verdad cada espacio —de **Mas La Boella** a **l'Orangerie** o **Parc Samà**—, estáis en el sitio.`,
      ],
    },
    spots: {
      title: 'Rincones de Tarragona donde nos gusta fotografiar',
      intro:
        'Estos son algunos de los sitios que usamos de verdad. No es una lista de postales: es donde sabemos que la luz, la piedra y la intimidad se llevan bien con una cámara.',
      items: [
        {
          name: 'Part Alta y Catedral',
          body: 'El corazón medieval de la ciudad: callejones de piedra, la fachada de la Catedral y portales que filtran la luz como un plató natural. Hacemos retratos íntimos y paseos tranquilos; a primera hora o al atardecer queda casi para vosotros.',
        },
        {
          name: 'Balcó del Mediterrani',
          body: 'La barandilla de hierro sobre el mar, al final de la Rambla Nova. Es el retrato de postal de Tarragona al atardecer, con el azul abriéndose detrás. Tocamos hierro por suerte y esperamos la luz baja: el sol lateral regala ahí una hora dorada que merece la pena.',
        },
        {
          name: 'Anfiteatro y murallas romanas',
          body: 'La piedra romana sobre el mar es imponente y muy cinematográfica. Importante y honesto: el Anfiteatro y otros monumentos con entrada los gestiona el MHT y para una sesión profesional hace falta autorización. La tramitamos con tiempo; si no toca, hacemos los retratos desde fuera, donde las murallas ya son un fondo espectacular.',
        },
        {
          name: 'El Serrallo',
          body: 'El barrio pesquero, con las barcas, las redes y una luz de muelle muy honesta. Aquí el reportaje respira verdad: colores gastados, gente real y un final de tarde que se tiñe de naranja sobre el agua. Perfecto para parejas que huyen de lo postizo.',
        },
        {
          name: 'Playa del Miracle y Punta de la Mora',
          body: 'De la playa urbana a los acantilados y la torre de la Mora, hay mar para elegir. Para los retratos de después de la cena o una sesión al día siguiente, la arena y la luz rasante dan una fotografía limpia y luminosa, con el sonido de las olas de fondo.',
        },
        {
          name: 'Castillo de Tamarit',
          body: 'A un paso de Tarragona, sobre la playa de Tamarit, un castillo medieval con la iglesia y el mar a sus pies. Es uno de los marcos más bonitos de la zona para ceremonias y para retratos con piedra y horizonte a la vez.',
        },
      ],
    },
    style: {
      title: 'La luz y el carácter de Tarragona',
      paras: [
        `Tarragona tiene una **luz de mar** muy particular: limpia, algo salada, con atardeceres largos que en verano se estiran hasta pasadas las nueve. La piedra dorada de la Part Alta y las murallas la devuelven cálida, y eso nos permite hacer retratos con carácter sin forzar nada. Trabajamos casi siempre con **luz natural** y, cuando toca, con un toque discreto de flash.`,
        `Es una ciudad que mezcla lo romano, lo medieval y el mar en cinco minutos a pie: pasamos de un callejón en sombra a un balcón sobre el Mediterráneo sin coger el coche. Y alrededor, el **Camp de Tarragona** ofrece masías como **Mas La Boella**, entre olivos, para quien quiere una boda más de campo sin alejarse de la ciudad.`,
      ],
    },
    approach: {
      title: 'Cómo fotografiamos una boda en Tarragona',
      bullets: [
        '**Fotoperiodismo primero**: documentamos el día tal como pasa, sin inventar escenas ni interrumpir los momentos importantes.',
        '**Retratos con calma**: veinte minutos bien aprovechados en la Part Alta o en el Balcó valen más que una hora de poses forzadas.',
        '**Luz natural**: leemos la hora y el lugar; buscamos la buena sombra al mediodía y la hora dorada al atardecer.',
        '**Conocimiento local**: sabemos dónde hay gente, dónde no, y cómo movernos por la ciudad sin perder tiempo ni luz.',
        '**Permisos con tiempo**: si queréis retratos dentro de monumentos con entrada, lo gestionamos con el MHT antes del día.',
        '**Galería en una semana**: recibís una selección de adelanto muy pronto y la galería completa editada en unos siete días.',
      ],
    },
    areaVenues: {
      title: 'Espacios y masías donde fotografiamos bodas en la zona',
      intro:
        'No solo la ciudad. Estos son algunos de los espacios donde solemos trabajar en el Camp de Tarragona y la Costa Daurada; si os casáis en uno de ellos, ya nos lo conocemos de memoria.',
      items: [
        {
          name: 'Mas La Boella',
          body: 'Una finca de olivos con hotel y restaurante con estrella, entre Reus y Tarragona. Jardines, pérgola y una luz de tarde preciosa; aquí documentamos la boda de **Cristina & Daniel**.',
          href: '/venues/mas-la-boella',
        },
        {
          name: "L'Orangerie de Clos Barenys",
          body: 'Un invernadero de cristal y jardines románticos cerca de Vila-seca, ideal para bodas elegantes con mucha vegetación y luz difusa. Aquí grabamos la boda de **Elisabet & Josep**.',
          href: '/venues/orangerie-clos-barenys',
        },
        {
          name: 'Masia Can Martí',
          body: 'Una masía catalana de piedra rodeada de campo, perfecta para bodas de día con aire de casa de familia. Documentamos allí la boda de **Jennifer & Albert**.',
          href: '/venues/masia-can-marti',
        },
        {
          name: 'Parc Samà (Cambrils)',
          body: 'Jardines coloniales del siglo XIX con lago, palmeras y una torre de cuento: uno de los espacios más bonitos de la Costa Daurada para una ceremonia al aire libre.',
          href: '/venues/parc-sama',
        },
        {
          name: 'Castell de Tamarit',
          body: 'Un castillo medieval sobre una playa virgen, a un paso de Tarragona. Piedra, mar y horizonte en el mismo plano.',
          href: '/venues/castell-de-tamarit',
        },
        {
          name: 'Mas Folch y otras fincas del Baix Camp',
          body: 'Trabajamos también en **Mas Folch** y en muchas otras masías y restaurantes de Cambrils, Reus y la Costa Daurada. Decidnos vuestro espacio y os contamos cómo lo fotografiaríamos.',
        },
        {
          name: 'Fotógrafo de boda en Reus',
          body: 'Reus es nuestra ciudad: la capital del modernismo, con el Institut Pere Mata y la Casa Navàs. Si os casáis allí, tenéis toda la información en nuestra página de Reus.',
          href: '/fotograf-boda-reus',
        },
        {
          name: 'Fotógrafo de boda en Cambrils',
          body: 'La Costa Daurada, el puerto pesquero y las calas de Cap Salou. Si vuestra boda es junto al mar en Cambrils, aquí tenéis los detalles.',
          href: '/fotograf-boda-cambrils',
        },
      ],
    },
    midCta: {
      title: '¿Os casáis en Tarragona o alrededores?',
      body: 'Cada temporada reservamos un número limitado de bodas para poder cuidarlas de verdad. Si ya tenéis fecha, es mejor mirarlo pronto.',
      label: 'Consultad vuestra fecha',
    },
    reviewsTitle: 'Lo que dicen las parejas que se han casado con nosotros',
    gallery: {
      title: 'Fotografías de boda en el Camp de Tarragona',
      intro:
        'Una selección de nuestro reportaje en la zona. Cuando todavía no tenemos galería pública ligada a esta ciudad, os enseñamos trabajo real de otras bodas del Camp de Tarragona para que veáis nuestro trato de la luz y de los momentos.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Tenéis fecha libre para nuestra boda en Tarragona?',
        a: 'Trabajamos un número limitado de bodas por temporada para cuidar cada reportaje. Escribidnos con la fecha cuanto antes y os confirmamos disponibilidad enseguida; los fines de semana de primavera y otoño vuelan pronto.',
      },
      {
        q: '¿Tenéis que desplazaros? ¿Cobráis kilometraje?',
        a: 'Somos de Reus, a un cuarto de hora de Tarragona, y la ciudad es zona nuestra de siempre: no hay suplemento de desplazamiento para bodas en el Camp de Tarragona. Para destinos más lejanos lo hablamos abiertamente antes de cerrar nada.',
      },
      {
        q: '¿Cuándo tendremos las fotos?',
        a: 'Recibís un adelanto de unas imágenes pocos días después de la boda y la galería completa editada en una semana aproximadamente. Siempre os damos la fecha exacta cuando cerramos la agenda del año.',
      },
      {
        q: '¿Podemos contratar foto y vídeo a la vez?',
        a: 'Sí, y es lo que recomendamos. Ferran hace la foto y Eric el vídeo, somos hermanos y trabajamos coordinados desde siempre: nos movemos sin molestarnos y el día os sale más redondo y a menudo más ajustado de precio que con dos equipos separados.',
      },
      {
        q: '¿Se pueden hacer fotos dentro del Anfiteatro o las murallas?',
        a: 'Los monumentos romanos con entrada los gestiona el MHT y una sesión profesional necesita autorización previa. La tramitamos con tiempo si lo queréis; si no, hacemos retratos espectaculares desde el Passeig Arqueològic y desde fuera, donde la piedra ya hace de fondo.',
      },
      {
        q: '¿Cubrís también Reus, Cambrils y la Costa Daurada?',
        a: 'Sí. Tarragona es nuestra zona de siempre, pero cubrimos todo el Camp de Tarragona sin recargo: Reus, Cambrils, Salou, la Costa Daurada y las masías del Baix Camp. Tenemos páginas específicas de Reus y de Cambrils con los mejores rincones de cada sitio.',
      },
    ],
    finalCta: {
      h2: 'Hacemos vuestra fotografía de boda en Tarragona',
      body: 'Contadnos cómo os imagináis el día y qué rincones de Tarragona os hacen ilusión. Os respondemos rápido, sin compromiso, y os decimos enseguida si tenemos la fecha libre.',
    },
    formTitle: 'Pedid disponibilidad y presupuesto',
    formIntro:
      'Decidnos la fecha, el lugar de la ceremonia y si queréis solo foto o también vídeo. Os contestamos en persona, nunca con un formulario automático.',
    whatsAppMessage:
      '¡Hola Lifetime Weddings! Nos casamos en Tarragona y queremos información de fotografía de boda.',
    breadcrumbCurrent: 'Fotógrafo de boda en Tarragona',
  },
  en: {
    meta: {
      title: 'Wedding photographer in Tarragona | Lifetime Weddings',
      description:
        'Wedding photographer in Tarragona: photojournalism, natural light and portraits in the Old Town, the Mediterranean Balcony and El Serrallo. Gallery in a week.',
    },
    hero: {
      eyebrow: 'Wedding photography · Tarragona',
      h1: 'Wedding photographer in Tarragona',
      sub: 'Honest photojournalism, real light and portraits that taste of the sea. We are two brothers from Reus who know every lane of the Old Town.',
      heroAlt: 'Couple on their wedding day in Tarragona’s medieval Old Town at golden hour',
    },
    cardTitle: 'Wedding photographer in Tarragona',
    cardBlurb:
      'Wedding reportage in Tarragona with a photojournalist’s eye: the Old Town, the Mediterranean Balcony and El Serrallo, with your gallery in one week.',
    intro: {
      title: 'Your Tarragona wedding, told exactly as it happens',
      paras: [
        `We are **Ferran and Eric**, two brothers from **Reus**. Ferran shoots the photography and Eric the film, and between us we cover the **Camp de Tarragona** every season. Tarragona itself is probably where we have shot the most: we know it in the morning sun and in the orange light of seven in the evening, and we know which lanes of the **Old Town (Part Alta)** empty out at which hour.`,
        `We work from **photojournalism**: we don’t direct the wedding, we accompany it. What draws us is the grandfather’s hand trembling as he fastens an earring, the brother who wells up before anyone else, the light spilling through the window while you finish dressing. We do portraits, of course, and we like to do them well and unhurried, but the backbone of the coverage is the **moments that never happen twice**.`,
        `Being local changes everything. We know the Old Town fills with visitors by mid-morning in August so portraits are better done early, that the wind on the Balcony ruins a hairstyle in ten seconds, and that El Serrallo has a particular smell that somehow reaches the pictures. And if you also want movement and sound, Eric **films your Tarragona wedding** on the same day, fully coordinated, never in each other’s way.`,
      ],
    },
    spots: {
      title: 'Corners of Tarragona we love to photograph',
      intro:
        'These are places we genuinely use. Not a postcard checklist: it’s where we know the light, the stone and the intimacy get along with a camera.',
      items: [
        {
          name: 'Old Town & Cathedral',
          body: 'The medieval heart of the city: stone lanes, the Cathedral facade and doorways that filter light like a natural studio. We do intimate portraits and unhurried walks here; early morning or late afternoon it is almost yours alone.',
        },
        {
          name: 'Mediterranean Balcony (Balcó del Mediterrani)',
          body: 'The iron balustrade above the sea at the end of Rambla Nova. It is Tarragona’s postcard portrait at dusk, the blue opening up behind you. Touch the iron for luck, wait for low light: the side sun makes a golden hour here that is worth staying for.',
        },
        {
          name: 'Amphitheatre & Roman walls',
          body: 'Roman stone above the sea, imposing and very cinematic. An honest note: the Amphitheatre and other ticketed monuments are run by the MHT and a professional shoot inside needs authorisation. We arrange it in advance; if it isn’t possible we shoot from outside, where the walls are already a spectacular backdrop.',
        },
        {
          name: 'El Serrallo',
          body: 'The old fishing quarter, with the boats, the nets and a very honest harbour light. Here the reportage breathes truth: worn colours, real people and a late afternoon that turns orange over the water. Perfect for couples who steer clear of anything staged.',
        },
        {
          name: 'Miracle Beach & Punta de la Mora',
          body: 'From the city beach to the cliffs and the Mora watchtower, there is sea to choose from. For portraits after dinner or a next-day session, the sand and the raking light give a clean, luminous photograph with the sound of the waves behind it.',
        },
        {
          name: 'Tamarit Castle',
          body: 'A step from Tarragona, above Tamarit beach, a medieval castle with its church and the sea at its feet. It is one of the most beautiful settings in the area for ceremonies and for portraits with stone and horizon at once.',
        },
      ],
    },
    style: {
      title: 'The light and character of Tarragona',
      paras: [
        `Tarragona has a very particular **sea light**: clean, a little salty, with long dusks that in summer stretch past nine. The golden stone of the Old Town and the walls give it back warm, which lets us make portraits with real character without forcing anything. We work almost always with **natural light** and, when needed, a discreet touch of flash.`,
        `It is a city that folds the Roman, the medieval and the sea into a five-minute walk: we move from a shaded lane to a balcony over the Mediterranean without ever taking the car. And all around, the **Camp de Tarragona** offers country estates like **Mas La Boella**, set among olive trees, for couples who want a more rural wedding without leaving the city behind.`,
      ],
    },
    approach: {
      title: 'How we photograph a Tarragona wedding',
      bullets: [
        '**Photojournalism first**: we document the day as it unfolds, without staging scenes or interrupting the moments that matter.',
        '**Unhurried portraits**: twenty well-used minutes in the Old Town or on the Balcony beat an hour of forced posing.',
        '**Natural light**: we read the hour and the place, finding the good shade at midday and the golden hour at dusk.',
        '**Local knowledge**: we know where the crowds are, where they aren’t, and how to move through the city without wasting time or light.',
        '**Permits in advance**: if you want portraits inside ticketed monuments, we arrange it with the MHT before the day.',
        '**Gallery in one week**: you get a sneak-peek selection very soon and the full edited gallery in around seven days.',
      ],
    },
    gallery: {
      title: 'Wedding photography across the Camp de Tarragona',
      intro:
        'A selection of our reportage in the area. Where we don’t yet have a public gallery tied to this city, we show real work from other Camp de Tarragona weddings so you can see how we handle light and moments.',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Do you have our Tarragona date free?',
        a: 'We take a limited number of weddings each season so we can look after every one. Write to us with your date as early as you can and we confirm availability right away; spring and autumn weekends go fast.',
      },
      {
        q: 'Do you have to travel? Is there a mileage surcharge?',
        a: 'We are from Reus, fifteen minutes from Tarragona, and the city has always been our home ground: there is no travel surcharge for weddings in the Camp de Tarragona. For destinations further afield we talk it through openly before anything is agreed.',
      },
      {
        q: 'When will we get the photos?',
        a: 'You receive a sneak peek of a few images within days of the wedding and the full edited gallery in around a week. We always give you the exact date when we lock the year’s schedule.',
      },
      {
        q: 'Can we book photo and video together?',
        a: 'Yes, and it is what we recommend. Ferran shoots the photos and Eric films, we are brothers and have always worked in sync: we move without getting in each other’s way, and the day comes out more complete and often better value than with two separate teams.',
      },
      {
        q: 'Can you photograph inside the Amphitheatre or the walls?',
        a: 'The ticketed Roman monuments are run by the MHT and a professional shoot needs prior authorisation. We arrange it in advance if you like; if not, we make striking portraits from the Passeig Arqueològic and from outside, where the stone already does the work.',
      },
    ],
    finalCta: {
      h2: 'We’ll photograph your Tarragona wedding',
      body: 'Tell us how you picture the day and which corners of Tarragona excite you. We reply quickly, with no obligation, and let you know straight away if your date is free.',
    },
    formTitle: 'Ask about availability and pricing',
    formIntro:
      'Tell us the date, the ceremony venue and whether you want photo only or photo and film. We answer in person, never with an automated form.',
    whatsAppMessage:
      'Hello Lifetime Weddings! We are getting married in Tarragona and would like information about wedding photography.',
    breadcrumbCurrent: 'Wedding photographer in Tarragona',
  },
};
