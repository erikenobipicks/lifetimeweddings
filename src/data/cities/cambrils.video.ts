// Cambrils — VIDEO service copy (ca / es / en).
//
// Lifetime Weddings: two brothers from Reus, minutes from Cambrils. Eric films
// the wedding films, Ferran shoots the photography. This block is the
// trilingual VIDEO copy for the Cambrils city page (/videograf-boda-cambrils).
// It cross-references the photo cluster (/fotograf-boda-cambrils) once.

import type { Lang } from '~/i18n/ui';
import type { CityServiceCopy } from './types';

export const CAMBRILS_VIDEO: Record<Lang, CityServiceCopy> = {
  ca: {
    meta: {
      title: 'Vídeo de boda a Cambrils | Lifetime Weddings',
      description:
        'Vídeo de boda a Cambrils, a la Costa Daurada. Films cinematogràfics amb mar, els jardins del Parc Samà, so real de la cerimònia i dron per la costa on es permet.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Baix Camp',
      h1: 'Vídeo de boda a Cambrils',
      sub: 'Un film cinematogràfic amb el mar, els jardins del Parc Samà i el so real del vostre "sí". Som germans de Reus, a deu minuts, i filmem Cambrils com qui la coneix de sempre.',
      heroAlt: 'Videògraf filmant una parella al capvespre vora el mar',
    },
    cardTitle: 'Vídeo de boda a Cambrils',
    cardBlurb:
      'Films cinematogràfics de mar i jardins, so real de la cerimònia i dron per la costa on la normativa ho permet. Un videògraf de casa a la Costa Daurada.',
    intro: {
      title: 'Cambrils en moviment, filmada de casa',
      paras: [
        `Una foto atura un instant; un vídeo el fa reviure. A Cambrils, això vol dir el trencar de l\'onada de fons, les campanes del nucli antic i la vostra veu tremolant als vots. Som en **Ferran** i l\'**Eric**, dos germans de Reus, a deu minuts. Jo, l\'Eric, sóc el que filma: gravo Cambrils com qui coneix cada racó i cada hora de llum.`,
        `Com a **videògraf de boda a Cambrils**, no munto un anunci: construeixo un relat. Vull que d\'aquí a vint anys engegueu el film i torneu a sentir el nus a l\'estómac, la rialla de l\'àvia, el mar. Filmo en cinematogràfic, amb cura del so i del ritme, perquè el vídeo és tant orella com ull.`,
        `Aquesta pàgina és de **vídeo**. La imatge fixa —retrats, galeria, l\'ull d\'en Ferran— l\'expliquem a **[fotògraf de boda a Cambrils](/fotograf-boda-cambrils)**. Contractar-nos junts és el més natural: dos germans que es coneixen no es trepitgen mai el pla.`,
      ],
    },
    spots: {
      title: 'Els escenaris que filmem a Cambrils',
      intro:
        'Sis llocs que coneixem pla a pla, amb l\'hora i el moviment que cadascun demana. Pensats per al vídeo: on la càmera es mou i el so respira.',
      items: [
        {
          name: 'Parc Samà',
          body: 'Jardins colonials del segle XIX amb llac i palmeres: un decorat cinematogràfic real. Els travellings entre les palmeres i els reflexos al llac donen plans d\'obertura de pel·lícula. És privat i es reserva.',
        },
        {
          name: 'El port pesquer',
          body: 'Vida, color i so de vila mariner. Aquí el film respira: barques, reflexos i la llum de tarda posen textura i ritme. Un dels plans que millor situa Cambrils sense una sola paraula.',
        },
        {
          name: 'El passeig marítim i les platges',
          body: 'Sorra daurada, horitzó net i el mar com a banda sonora natural. A la posta, un pla de vosaltres caminant amb l\'aigua de fons tanca el film amb emoció.',
        },
        {
          name: 'La Torre de l\'Ereta i el nucli antic',
          body: 'Pedra, carrerons i campanes: so i imatge d\'història. Perfecte per a plans íntims i per capturar l\'ambient sonor real que fa únic un film de Cambrils.',
        },
        {
          name: 'Cap de Salou i les cales',
          body: 'A tocar, cales de roca i pins fins a l\'aigua. On la normativa ho permet, el dron obre un pla aeri de la costa que deixa sense alè: mar salvatge en moviment.',
        },
        {
          name: 'Les masies del Baix Camp',
          body: 'Terra endins, entre vinyes i avellaners, la pedra i la llum de finestra donen un to càlid i recollit. Un contrast bonic amb el mar per a les seqüències íntimes.',
        },
      ],
    },
    style: {
      title: 'El to i el so de Cambrils en vídeo',
      paras: [
        `El mar de Cambrils no és només imatge: és so. El trencar de les onades, les gavines i el murmuri del port entren al film i el fan viu. Gravo àudio real de la cerimònia amb micròfons discrets, perquè les vostres paraules i les campanes són la meitat de l\'emoció.`,
        `Visualment busco el to càlid i mediterrani de la vila: la llum daurada de tarda, els verds del Parc Samà, el blau del mar. Munto amb ritme de cinema, ni videoclip accelerat ni gravació plana, deixant respirar els moments que valen.`,
      ],
    },
    approach: {
      title: 'Com filmo una boda a Cambrils',
      bullets: [
        '**So real, sempre:** micròfons discrets als vots i a la cerimònia. Les vostres veus i el mar de fons són el cor del film.',
        '**Cinematogràfic, no de videoclip:** color treballat, plans estables i muntatge amb ritme, per a un relat que emociona.',
        '**Dron on es permet:** plans aeris de la costa i les cales de Cap de Salou, sempre dins de la normativa i amb els permisos al dia.',
        '**Coordinat amb la foto:** si en Ferran també hi és, ens repartim l\'espai sense trepitjar-nos ni sortir a la imatge de l\'altre.',
        '**Entrega cuidada:** un film principal emocionant i, si voleu, un tràiler curt, amb música amb llicència.',
      ],
    },
    gallery: {
      title: 'Films reals, no promeses',
      intro:
        'El que mostrem és feina real de vídeo de boda. Si encara no tenim un film sencer rodat a Cambrils, t\'ensenyem treball autèntic d\'altres bodes de la Costa Daurada.',
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Es pot volar dron a Cambrils?',
        a: 'On la normativa ho permet, sí, i jo gestiono els permisos. Hi ha zones i moments amb restriccions, sobretot vora l\'aigua; sempre filmo dins de la llei. Si un pla aeri no és possible, el compenso amb moviment de terra.',
      },
      {
        q: 'Graveu el so de la cerimònia?',
        a: 'Sempre. Poso micròfons discrets a l\'oficiant i, si cal, als nuvis, perquè els vots i el "sí" s\'entenguin nets. El so real és el que fa que un film de boda emocioni de veritat.',
      },
      {
        q: 'Quant dura el film i quan l\'entregueu?',
        a: 'L\'edito com un relat: un film principal emocionant i, si voleu, un tràiler curt. La durada depèn del dia i del vostre gust; l\'entrega sol ser en unes setmanes.',
      },
      {
        q: 'Podem contractar vídeo i foto alhora?',
        a: 'És el que més recomanem. Jo faig el vídeo i en Ferran la **[fotografia de boda a Cambrils](/fotograf-boda-cambrils)**; som germans i treballem coordinats, amb un relat coherent del dia.',
      },
      {
        q: 'Sou de Cambrils?',
        a: 'Som de Reus, a deu minuts, i filmem a la Costa Daurada des de sempre. Coneixem Cambrils, la seva llum i el seu so com a gent de casa, i això es nota en cada pla.',
      },
    ],
    finalCta: {
      h2: 'Filmem la vostra boda a Cambrils',
      body: 'Expliqueu-nos la data i el lloc. Us direm com faríem el vostre film a Cambrils, amb mar, jardins i so real, sense compromís.',
    },
    formTitle: 'Parlem del vostre film a Cambrils',
    formIntro:
      'Deixeu-nos la data, el lloc i com us imagineu el vídeo. Us responem aviat, sempre nosaltres dos.',
    whatsAppMessage:
      'Hola Eric! Ens casem a Cambrils i ens agradaria informació de vídeo de boda.',
    breadcrumbCurrent: 'Vídeo de boda a Cambrils',
  },

  es: {
    meta: {
      title: 'Vídeo de boda en Cambrils | Lifetime Weddings',
      description:
        'Vídeo de boda en Cambrils, en la Costa Daurada. Films cinematográficos con mar, los jardines del Parc Samà, sonido real de la ceremonia y dron por la costa donde se permite.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Baix Camp',
      h1: 'Vídeo de boda en Cambrils',
      sub: 'Un film cinematográfico con el mar, los jardines del Parc Samà y el sonido real de vuestro "sí". Somos hermanos de Reus, a diez minutos, y filmamos Cambrils como quien la conoce de siempre.',
      heroAlt: 'Videógrafo filmando a una pareja al atardecer junto al mar',
    },
    cardTitle: 'Vídeo de boda en Cambrils',
    cardBlurb:
      'Films cinematográficos de mar y jardines, sonido real de la ceremonia y dron por la costa donde la normativa lo permite. Un videógrafo de casa en la Costa Daurada.',
    intro: {
      title: 'Cambrils en movimiento, filmada de casa',
      paras: [
        `Una foto detiene un instante; un vídeo lo hace revivir. En Cambrils eso significa el romper de la ola de fondo, las campanas del casco antiguo y vuestra voz temblando en los votos. Somos **Ferran** y **Eric**, dos hermanos de Reus, a diez minutos. Yo, Eric, soy el que filma: grabo Cambrils como quien conoce cada rincón y cada hora de luz.`,
        `Como **videógrafo de boda en Cambrils**, no monto un anuncio: construyo un relato. Quiero que dentro de veinte años pongáis el film y volváis a sentir el nudo en el estómago, la risa de la abuela, el mar. Filmo en cinematográfico, cuidando el sonido y el ritmo, porque el vídeo es tanto oído como ojo.`,
        `Esta página va de **vídeo**. La imagen fija —retratos, galería, el ojo de Ferran— la contamos en **[fotógrafo de boda en Cambrils](/fotograf-boda-cambrils)**. Contratarnos juntos es lo más natural: dos hermanos que se conocen nunca se pisan el plano.`,
      ],
    },
    spots: {
      title: 'Los escenarios que filmamos en Cambrils',
      intro:
        'Seis lugares que conocemos plano a plano, con la hora y el movimiento que cada uno pide. Pensados para el vídeo: donde la cámara se mueve y el sonido respira.',
      items: [
        {
          name: 'Parc Samà',
          body: 'Jardines coloniales del siglo XIX con lago y palmeras: un decorado cinematográfico real. Los travellings entre las palmeras y los reflejos en el lago dan planos de apertura de película. Es privado y se reserva.',
        },
        {
          name: 'El puerto pesquero',
          body: 'Vida, color y sonido de pueblo marinero. Aquí el film respira: barcas, reflejos y la luz de tarde ponen textura y ritmo. Uno de los planos que mejor sitúa Cambrils sin una sola palabra.',
        },
        {
          name: 'El paseo marítimo y las playas',
          body: 'Arena dorada, horizonte limpio y el mar como banda sonora natural. Al atardecer, un plano de vosotros caminando con el agua de fondo cierra el film con emoción.',
        },
        {
          name: 'La Torre de l\'Ereta y el casco antiguo',
          body: 'Piedra, callejones y campanas: sonido e imagen de historia. Perfecto para planos íntimos y para capturar el ambiente sonoro real que hace único un film de Cambrils.',
        },
        {
          name: 'Cap de Salou y las calas',
          body: 'Pegado, calas de roca y pinos hasta el agua. Donde la normativa lo permite, el dron abre un plano aéreo de la costa que deja sin aliento: mar salvaje en movimiento.',
        },
        {
          name: 'Las masías del Baix Camp',
          body: 'Tierra adentro, entre viñas y avellanos, la piedra y la luz de ventana dan un tono cálido y recogido. Un contraste bonito con el mar para las secuencias íntimas.',
        },
      ],
    },
    style: {
      title: 'El tono y el sonido de Cambrils en vídeo',
      paras: [
        `El mar de Cambrils no es solo imagen: es sonido. El romper de las olas, las gaviotas y el murmullo del puerto entran en el film y lo hacen vivo. Grabo audio real de la ceremonia con micrófonos discretos, porque vuestras palabras y las campanas son la mitad de la emoción.`,
        `Visualmente busco el tono cálido y mediterráneo del pueblo: la luz dorada de tarde, los verdes del Parc Samà, el azul del mar. Monto con ritmo de cine, ni videoclip acelerado ni grabación plana, dejando respirar los momentos que valen.`,
      ],
    },
    approach: {
      title: 'Cómo filmo una boda en Cambrils',
      bullets: [
        '**Sonido real, siempre:** micrófonos discretos en los votos y la ceremonia. Vuestras voces y el mar de fondo son el corazón del film.',
        '**Cinematográfico, no de videoclip:** color trabajado, planos estables y montaje con ritmo, para un relato que emociona.',
        '**Dron donde se permite:** planos aéreos de la costa y las calas de Cap de Salou, siempre dentro de la normativa y con los permisos al día.',
        '**Coordinado con la foto:** si Ferran también está, nos repartimos el espacio sin pisarnos ni salir en la imagen del otro.',
        '**Entrega cuidada:** un film principal emocionante y, si queréis, un tráiler corto, con música con licencia.',
      ],
    },
    gallery: {
      title: 'Films reales, no promesas',
      intro:
        'Lo que mostramos es trabajo real de vídeo de boda. Si todavía no tenemos un film entero rodado en Cambrils, te enseñamos trabajo auténtico de otras bodas de la Costa Daurada.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Se puede volar dron en Cambrils?',
        a: 'Donde la normativa lo permite, sí, y yo gestiono los permisos. Hay zonas y momentos con restricciones, sobre todo junto al agua; siempre filmo dentro de la ley. Si un plano aéreo no es posible, lo compenso con movimiento de tierra.',
      },
      {
        q: '¿Grabáis el sonido de la ceremonia?',
        a: 'Siempre. Pongo micrófonos discretos al oficiante y, si hace falta, a los novios, para que los votos y el "sí" se entiendan limpios. El sonido real es lo que hace que un film de boda emocione de verdad.',
      },
      {
        q: '¿Cuánto dura el film y cuándo lo entregáis?',
        a: 'Lo edito como un relato: un film principal emocionante y, si queréis, un tráiler corto. La duración depende del día y de vuestro gusto; la entrega suele ser en unas semanas.',
      },
      {
        q: '¿Podemos contratar vídeo y foto a la vez?',
        a: 'Es lo que más recomendamos. Yo hago el vídeo y Ferran la **[fotografía de boda en Cambrils](/fotograf-boda-cambrils)**; somos hermanos y trabajamos coordinados, con un relato coherente del día.',
      },
      {
        q: '¿Sois de Cambrils?',
        a: 'Somos de Reus, a diez minutos, y filmamos en la Costa Daurada desde siempre. Conocemos Cambrils, su luz y su sonido como gente de casa, y eso se nota en cada plano.',
      },
    ],
    finalCta: {
      h2: 'Filmemos vuestra boda en Cambrils',
      body: 'Contadnos la fecha y el lugar. Os diremos cómo haríamos vuestro film en Cambrils, con mar, jardines y sonido real, sin compromiso.',
    },
    formTitle: 'Hablemos de vuestro film en Cambrils',
    formIntro:
      'Dejadnos la fecha, el lugar y cómo os imagináis el vídeo. Os respondemos pronto, siempre nosotros dos.',
    whatsAppMessage:
      '¡Hola Eric! Nos casamos en Cambrils y nos gustaría información de vídeo de boda.',
    breadcrumbCurrent: 'Vídeo de boda en Cambrils',
  },

  en: {
    meta: {
      title: 'Wedding videographer in Cambrils | Lifetime Weddings',
      description:
        'Wedding videographer in Cambrils, on the Costa Daurada. Cinematic films with the sea, the Parc Samà gardens, real ceremony sound and drone along the coast where permitted.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Baix Camp',
      h1: 'Wedding videographer in Cambrils',
      sub: 'A cinematic film with the sea, the gardens of Parc Samà and the real sound of your "I do". We are brothers from Reus, ten minutes away, and we film Cambrils like people who have always known it.',
      heroAlt: 'Videographer filming a couple at dusk beside the sea',
    },
    cardTitle: 'Wedding film in Cambrils',
    cardBlurb:
      'Cinematic films of sea and gardens, real ceremony sound and drone along the coast where the rules allow. A local videographer on the Costa Daurada.',
    intro: {
      title: 'Cambrils in motion, filmed from home',
      paras: [
        `A photo stops a moment; a film brings it back to life. In Cambrils that means the break of the wave behind you, the bells of the old town and your voice trembling through the vows. We are **Ferran** and **Eric**, two brothers from Reus, ten minutes away. I, Eric, am the one who films: I capture Cambrils like someone who knows every corner and every hour of light.`,
        `As a **wedding videographer in Cambrils**, I don't cut an advert — I build a story. I want you to press play in twenty years and feel again the knot in your stomach, your grandmother's laugh, the sea. I film cinematically, minding sound and rhythm, because film is as much ear as eye.`,
        `This page is about **video**. The still-image side — portraits, gallery, Ferran's eye — we tell on our **[wedding photographer in Cambrils](/fotograf-boda-cambrils)** page. Booking us together is the natural choice: two brothers who know each other never clash on the frame.`,
      ],
    },
    spots: {
      title: 'The settings we film in Cambrils',
      intro:
        'Six places we know shot by shot, each with the hour and the movement it asks for. Chosen for film: where the camera moves and the sound can breathe.',
      items: [
        {
          name: 'Parc Samà',
          body: 'Nineteenth-century colonial gardens with a lake and palms: a real cinematic set. Tracking shots through the palms and reflections on the lake make opening frames worthy of a film. It is private and bookable.',
        },
        {
          name: 'The fishing port',
          body: 'Life, colour and the sound of a seafaring town. Here the film breathes: boats, reflections and afternoon light bring texture and rhythm. One of the shots that places Cambrils without a single word.',
        },
        {
          name: 'The seafront promenade and the beaches',
          body: 'Golden sand, a clean horizon and the sea as a natural soundtrack. At sunset, a shot of you walking with the water behind closes the film on emotion.',
        },
        {
          name: 'Torre de l\'Ereta and the old town',
          body: 'Stone, lanes and bells: the sound and image of history. Perfect for intimate shots and for capturing the real ambient sound that makes a Cambrils film unique.',
        },
        {
          name: 'Cap de Salou and the coves',
          body: 'Right next door, rocky coves and pines down to the water. Where the rules allow, the drone opens an aerial shot of the coast that takes your breath away: wild sea in motion.',
        },
        {
          name: 'The masies of the Baix Camp',
          body: 'Inland, among vines and hazel groves, stone and window light bring a warm, gathered tone. A lovely contrast with the sea for the intimate sequences.',
        },
      ],
    },
    style: {
      title: 'The tone and sound of Cambrils on film',
      paras: [
        `The Cambrils sea is not only image — it is sound. The break of the waves, the gulls and the murmur of the port enter the film and bring it alive. I record real ceremony audio with discreet microphones, because your words and the bells are half of the emotion.`,
        `Visually I look for the town's warm Mediterranean tone: the golden afternoon light, the greens of Parc Samà, the blue of the sea. I edit with a cinema rhythm — not a sped-up music video, not flat footage — letting the moments that matter breathe.`,
      ],
    },
    approach: {
      title: 'How I film a wedding in Cambrils',
      bullets: [
        '**Real sound, always:** discreet microphones on the vows and the ceremony. Your voices and the sea behind them are the heart of the film.',
        '**Cinematic, not a music video:** worked colour, steady shots and rhythmic editing, for a story that moves you.',
        '**Drone where permitted:** aerial shots of the coast and the Cap de Salou coves, always within current rules and with permits in order.',
        '**Coordinated with the photo:** if Ferran is there too, we share the space without clashing or appearing in each other\'s frame.',
        '**Careful delivery:** a moving main film and, if you want, a short trailer, with licensed music.',
      ],
    },
    gallery: {
      title: 'Real films, not promises',
      intro:
        'What we show is real wedding video work. If we don\'t yet have a full film shot in Cambrils, we show you genuine work from other Costa Daurada weddings.',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Can a drone be flown in Cambrils?',
        a: 'Where the rules allow, yes, and I handle the permits. Some zones and times are restricted, especially near the water; I always film within the law. If an aerial shot isn\'t possible, I make up for it with ground movement.',
      },
      {
        q: 'Do you record the ceremony sound?',
        a: 'Always. I place discreet microphones on the officiant and, if needed, on the couple, so the vows and the "I do" come through clean. Real sound is what makes a wedding film truly move you.',
      },
      {
        q: 'How long is the film and when do you deliver it?',
        a: 'I edit it as a story: a moving main film and, if you want, a short trailer. The length depends on the day and your taste; delivery is usually within a few weeks.',
      },
      {
        q: 'Can we book video and photo together?',
        a: 'It is what we most recommend. I make the film and Ferran the **[wedding photography in Cambrils](/fotograf-boda-cambrils)**; we are brothers and work in coordination, with one coherent story of the day.',
      },
      {
        q: 'Are you from Cambrils?',
        a: 'We are from Reus, ten minutes away, and we have always filmed on the Costa Daurada. We know Cambrils, its light and its sound as locals, and it shows in every shot.',
      },
    ],
    finalCta: {
      h2: 'Let\'s film your Cambrils wedding',
      body: 'Tell us the date and the venue. We\'ll tell you how we\'d make your Cambrils film — with sea, gardens and real sound — no obligation.',
    },
    formTitle: 'Let\'s talk about your Cambrils film',
    formIntro:
      'Leave us the date, the place and how you picture the video. We reply soon, always the two of us.',
    whatsAppMessage:
      'Hi Eric! We\'re getting married in Cambrils and would love information about wedding video.',
    breadcrumbCurrent: 'Wedding videographer in Cambrils',
  },
};
