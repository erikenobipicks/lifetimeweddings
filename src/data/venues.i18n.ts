// ES + EN translations for the venue landings.
//
// Kept in a separate file from src/data/venues.ts so the existing CA
// pipeline is untouched. /venues/<slug> still reads VENUES; the new
// /es/venues/<slug> and /en/venues/<slug> templates read VENUES_I18N
// for everything language-specific while still using VENUES for the
// non-copy fields (slug, name, region, real wedding link).
//
// Copy voice notes:
// - ES: closer to neutral peninsular Spanish, slightly more formal
//   than the CA voice. Avoids Catalan-isms when possible.
// - EN: editorial/lifestyle register. Clean, professional, not a
//   word-for-word render of the Spanish.

import type { VenueFaq } from './venues';

export interface VenueLocaleCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  realWeddingIntro: string;
  whatItOffersIntro: string;
  whatItOffersBullets: string[];
  whyChooseIntro: string;
  whyChoosePoints: string[];
  faqs: VenueFaq[];
  finalCtaH2: string;
  finalCtaBody: string;
  /** Localised extra-resource label/href, if applicable. */
  extraResource?: { label: string; href: string };
}

export interface VenueLocaleMap {
  es: VenueLocaleCopy;
  en: VenueLocaleCopy;
}

export const VENUES_I18N: Record<string, VenueLocaleMap> = {
  // ─── Mas La Boella ──────────────────────────────────────────────────
  'mas-la-boella': {
    es: {
      metaTitle: 'Fotógrafos de boda en Mas La Boella | Lifetime Weddings',
      metaDescription:
        'Fotografía y vídeo documental de boda en Mas La Boella, Tarragona. Mira el reportaje real de una boda allí y háblanos por WhatsApp.',
      eyebrow: 'Reus · Tarragona · desde 2020',
      h1: 'Fotografía y vídeo de boda en Mas La Boella',
      subtitle:
        'Somos Eric y Ferran, dos hermanos con cámara de foto y de vídeo. Hemos documentado la boda de Cristina y Daniel en Mas La Boella y conocemos cómo se mueve una boda en esta finca: las horas, los rincones, cómo cambia la luz del jardín antes de la cena.',
      realWeddingIntro:
        'Cristina y Daniel nos confiaron su día. Sin prisas, sin "mira aquí". Estuvimos desde los preparativos de la mañana hasta el baile. Lo que captamos es lo que verás si decides trabajar con nosotros: la naturalidad, la complicidad de los familiares, la luz del Mas en cada momento del día.',
      whatItOffersIntro:
        'Mas La Boella es uno de los venues más cuidados de la zona, pero también es un reto técnico: la mezcla de piedra, vegetación y sombras profundas pide ojo. Estos años nos hemos encontrado con luces suficientes como para conocer sus momentos clave:',
      whatItOffersBullets: [
        'La ceremonia en el jardín con el contraste de la pérgola — necesita exposición al límite para no perder el blanco del vestido',
        'Los preparativos en una de las habitaciones superiores — luz lateral preciosa, ideal para un retrato íntimo',
        'El banquete en la sala — iluminación cálida, perfecta para el vídeo documental sin flash',
        'El cóctel en el patio interior — uno de los mejores momentos para la fotografía de familia en grupo',
        'El baile — mejor con un par de focos adicionales si la fiesta se alarga',
      ],
      whyChooseIntro: 'Dos motivos sencillos:',
      whyChoosePoints: [
        'Somos dos hermanos con dos formatos. Uno filma, el otro fotografía. La pareja se va con el día documentado en foto y vídeo, sin tener que coordinar dos equipos externos.',
        'No hacemos la boda tipo. Cada pareja es diferente, cada Mas La Boella es diferente — depende del tiempo, de los invitados, de cómo os vayáis sintiendo. Trabajamos en clave documental: si queréis posados, haremos algunos. Si no, no os obligaremos a nada.',
      ],
      faqs: [
        {
          question: '¿Conocéis Mas La Boella?',
          answer:
            'Sí. Allí fotografiamos y filmamos la boda de Cristina y Daniel. Conocemos los tiempos, los rincones y las zonas de mejor luz a cada hora del día.',
        },
        {
          question: '¿Qué franja horaria recomendáis para la ceremonia?',
          answer:
            'En Mas La Boella, idealmente entre las 17:30 y las 18:30 en verano, y sobre las 16:30 en septiembre/octubre. La luz del jardín al atardecer es la más favorecedora.',
        },
        {
          question: '¿Cuántas horas de cobertura necesito para una boda en Mas La Boella?',
          answer:
            'Para cubrir desde los preparativos hasta el baile recomendamos 10-12 horas. Si solo queréis ceremonia y cóctel, 6-7 horas son suficientes.',
        },
        {
          question: '¿Hay algún rincón del Mas que recomendéis para los retratos de pareja?',
          answer:
            'Sí, hay tres especialmente bonitos: el jardín del olivar al atardecer, la pérgola lateral para un retrato más íntimo, y un rincón del patio interior con luz muy cinematográfica por la mañana. Te lo enseñamos cuando hablemos.',
        },
        {
          question: '¿Cuánto cuesta la cobertura de boda en Mas La Boella?',
          answer:
            'Cada boda tiene un presupuesto personalizado según la fecha, el pack y las necesidades. Te pasamos uno concreto en menos de 24h tras una breve conversación por WhatsApp.',
        },
      ],
      finalCtaH2: 'Vuestra boda merece a alguien que ya conozca Mas La Boella',
      finalCtaBody:
        'Mira si tenemos vuestra fecha libre. Respuesta en menos de un día. Sin compromiso, sin formularios largos — solo una conversación por WhatsApp.',
    },
    en: {
      metaTitle: 'Wedding photographers at Mas La Boella | Lifetime Weddings',
      metaDescription:
        'Documentary photo + video coverage at Mas La Boella, Tarragona. See a real wedding gallery from this venue and message us on WhatsApp.',
      eyebrow: 'Reus · Tarragona · since 2020',
      h1: 'Wedding photo and video at Mas La Boella',
      subtitle:
        "We're Eric and Ferran, two brothers — one shooting photo, the other video. We documented Cristina and Daniel's wedding at Mas La Boella, so we know how a day flows through this estate: the hours, the corners, the way the garden light shifts before dinner.",
      realWeddingIntro:
        "Cristina and Daniel trusted us with their day — no rush, no \"look here\". We were there from morning prep to last dance. What we captured is what you'll get if you decide to work with us: real moments, family chemistry, the Mas light at every stage of the day.",
      whatItOffersIntro:
        'Mas La Boella is one of the most polished venues in the area, but it also brings a technical challenge: the mix of stone, vegetation, and deep shadows asks for an eye trained on this exact space. After a few weddings here, we know its key moments:',
      whatItOffersBullets: [
        "The garden ceremony under the pergola — needs careful exposure not to blow the dress",
        'Prep in one of the upper rooms — beautiful side light, ideal for an intimate portrait',
        'Reception in the main hall — warm light, perfect for flash-free documentary video',
        'Cocktail in the interior courtyard — one of the best windows for group family shots',
        'The dance — better with a couple of extra lights if the party runs long',
      ],
      whyChooseIntro: 'Two simple reasons:',
      whyChoosePoints: [
        "We're two brothers in two formats. One films, the other shoots stills. You leave with the full day in photo and video without coordinating two separate vendors.",
        "We don't shoot a stock wedding. Every couple is different, every Mas La Boella day is different — it depends on the weather, the guests, how you're feeling. We work documentary-style: if you want posed shots, we'll make a few. If not, we won't force you.",
      ],
      faqs: [
        {
          question: 'Do you know Mas La Boella?',
          answer:
            "Yes. We photographed and filmed Cristina and Daniel's wedding here. We know the timings, the corners, and where the best light sits at every hour.",
        },
        {
          question: 'What time of day works best for the ceremony?',
          answer:
            'At Mas La Boella, ideally between 17:30 and 18:30 in summer, and around 16:30 in September/October. The garden light at sunset is the most flattering window.',
        },
        {
          question: 'How many hours of coverage do I need for a Mas La Boella wedding?',
          answer:
            'To cover from prep through to the dance we recommend 10-12 hours. If you only want ceremony and cocktail, 6-7 hours is plenty.',
        },
        {
          question: 'Any spots inside Mas La Boella you recommend for couple portraits?',
          answer:
            "There are three we especially love: the olive grove garden at sunset, the side pergola for an intimate portrait, and a corner of the interior courtyard with very cinematic morning light. We'll show you when we talk.",
        },
        {
          question: 'How much does coverage at Mas La Boella cost?',
          answer:
            "Every wedding gets a custom quote based on date, package, and needs. We'll send you a concrete one within 24h after a quick WhatsApp chat.",
        },
      ],
      finalCtaH2: 'Your wedding deserves someone who already knows Mas La Boella',
      finalCtaBody:
        'Check if your date is still open. Reply within a day. No commitment, no long forms — just a WhatsApp conversation.',
    },
  },

  // ─── L'Orangerie Clos Barenys ──────────────────────────────────────
  'orangerie-clos-barenys': {
    es: {
      metaTitle: "Fotógrafos de boda en L'Orangerie Clos Barenys",
      metaDescription:
        "Fotografía y vídeo documental de boda en L'Orangerie Clos Barenys, Tarragona. Mira un reportaje real y háblanos por WhatsApp. Respuesta en 24h.",
      eyebrow: 'Reus · Tarragona · desde 2020',
      h1: "Fotografía y vídeo de boda en L'Orangerie Clos Barenys",
      subtitle:
        "Somos Eric y Ferran, dos hermanos con cámara de foto y de vídeo. Hemos documentado la boda de Elisabet y Josep en L'Orangerie y sabemos cómo trabajar la luz de este espacio: el cristal, la vegetación, los reflejos del jardín al atardecer.",
      realWeddingIntro:
        "Elisabet y Josep eligieron Clos Barenys por la sensación de estar en un jardín botánico íntimo. Estuvimos desde los preparativos hasta el baile. Lo que captamos es lo que verás si decides trabajar con nosotros: la naturalidad, la calidez del comedor, la luz filtrada por la cubierta de cristal del orangerie.",
      whatItOffersIntro:
        "Este venue tiene una característica fotográfica única en todo el Camp de Tarragona: el techo de cristal del orangerie filtra la luz del mediodía en una difusión natural prácticamente imposible de recrear con modificadores. Eso significa:",
      whatItOffersBullets: [
        'Banquete y cóctel con luz natural hasta bien entrada la tarde — sin flash agresivo, sin la luz dura habitual de interiores',
        "Los retratos de pareja bajo el cristal son nuestros preferidos de este venue",
        'El jardín exterior da una segunda localización muy distinta para el cóctel — alternamos interior y exterior para dar ritmo al reportaje',
        'La ceremonia en el jardín a primera hora de la tarde tiene una luz especialmente favorecedora — recomendamos entre las 17h y las 18h en temporada cálida',
      ],
      whyChooseIntro: 'Dos motivos:',
      whyChoosePoints: [
        'Somos dos hermanos con dos formatos. Uno filma, el otro fotografía. La pareja se va con el día documentado en foto y vídeo, sin coordinar dos equipos separados.',
        "Conocemos el espacio. La luz de L'Orangerie se comporta distinto al mediodía, por la tarde, y con días nublados. Saberlo te permite estar en el sitio correcto en el momento correcto, sin improvisar.",
      ],
      faqs: [
        {
          question: "¿Conocéis L'Orangerie Clos Barenys?",
          answer:
            "Sí. Allí fotografiamos y filmamos la boda de Elisabet y Josep. Conocemos los espacios interiores, el jardín y cómo cambia la luz a lo largo del día.",
        },
        {
          question: "¿Cuál es la mejor hora para la ceremonia en L'Orangerie?",
          answer:
            'Entre las 17h y las 18h en meses cálidos (junio-septiembre), y sobre las 16h en mayo y octubre. Es cuando la luz del jardín queda más favorecedora y con contraste.',
        },
        {
          question: '¿Cuántas horas recomendáis para una boda en Clos Barenys?',
          answer:
            'Para cubrir desde los preparativos hasta el baile, 10-12 horas. Si solo queréis ceremonia y cóctel, 6-7 horas.',
        },
        {
          question: '¿Se puede hacer la sesión de retratos bajo el cristal del orangerie?',
          answer:
            'Sí, es uno de nuestros rincones favoritos. Si llueve no es problema — está cubierto — y si hace sol, la luz filtrada es perfecta.',
        },
        {
          question: "¿Cuánto cuesta la cobertura de boda en L'Orangerie?",
          answer:
            'Cada boda tiene un presupuesto personalizado según la fecha, el pack y las necesidades. Te pasamos uno concreto en menos de 24h tras una conversación por WhatsApp.',
        },
      ],
      finalCtaH2: "Vuestra boda merece a alguien que ya conozca L'Orangerie",
      finalCtaBody:
        'Mira si tenemos vuestra fecha libre. Respuesta en menos de un día. Sin compromiso, sin formularios largos — solo una conversación por WhatsApp.',
    },
    en: {
      metaTitle: "Wedding photographers at L'Orangerie Clos Barenys",
      metaDescription:
        "Documentary photo + video coverage at L'Orangerie Clos Barenys, Tarragona. See a real wedding gallery and reach us on WhatsApp. Reply within 24h.",
      eyebrow: 'Reus · Tarragona · since 2020',
      h1: "Wedding photo and video at L'Orangerie Clos Barenys",
      subtitle:
        "We're Eric and Ferran, two brothers shooting photo and video. We documented Elisabet and Josep's wedding at L'Orangerie, so we know how the light works in this space: the glass ceiling, the vegetation, the reflections from the garden at sunset.",
      realWeddingIntro:
        "Elisabet and Josep chose Clos Barenys for the feeling of being inside an intimate botanical garden. We were there from morning prep to last dance. What we captured is what you'll get if you book us: real warmth, dining-room light, and the diffuse glow that filters through the orangerie's glass roof.",
      whatItOffersIntro:
        'This venue has a photographic feature unique in the entire Camp de Tarragona: the glass roof filters midday light into a natural diffusion that is virtually impossible to recreate with modifiers. That means:',
      whatItOffersBullets: [
        'Reception and cocktail under natural light well into the afternoon — no aggressive flash, none of the harsh light typical of indoor receptions',
        'Couple portraits under the glass are our favourite from this venue',
        'The outdoor garden gives a completely different second location for the cocktail — we alternate inside and outside to give rhythm to the coverage',
        'A garden ceremony at early afternoon catches especially flattering light — we recommend 17h to 18h in warm months',
      ],
      whyChooseIntro: 'Two reasons:',
      whyChoosePoints: [
        "We're two brothers in two formats. One films, the other shoots stills. You leave with the day documented in photo and video, no two-vendor coordination required.",
        "We know this space. L'Orangerie light behaves differently at noon, in the afternoon, and on cloudy days. Knowing the patterns lets us be in the right place at the right moment without improvising.",
      ],
      faqs: [
        {
          question: "Do you know L'Orangerie Clos Barenys?",
          answer:
            "Yes. We photographed and filmed Elisabet and Josep's wedding here. We know the interior spaces, the garden, and how the light shifts across the day.",
        },
        {
          question: "What's the best ceremony time at L'Orangerie?",
          answer:
            'Between 17h and 18h in warm months (June-September), and around 16h in May and October. That window catches the most flattering, contrasty garden light.',
        },
        {
          question: 'How many hours do you recommend for a Clos Barenys wedding?',
          answer:
            'To cover from prep through to the dance, 10-12 hours. If you only want ceremony and cocktail, 6-7 hours.',
        },
        {
          question: 'Can the portrait session happen under the orangerie glass?',
          answer:
            'Yes — it\'s one of our favourite corners. If it rains, no problem (it\'s covered). If it\'s sunny, the filtered light is perfect.',
        },
        {
          question: "How much does coverage at L'Orangerie cost?",
          answer:
            "Every wedding gets a custom quote based on date, package, and needs. We'll send you a concrete one within 24h after a WhatsApp chat.",
        },
      ],
      finalCtaH2: "Your wedding deserves someone who already knows L'Orangerie",
      finalCtaBody:
        'Check if your date is still open. Reply within a day. No commitment, no long forms — just a WhatsApp conversation.',
    },
  },

  // ─── Masia Can Martí ───────────────────────────────────────────────
  'masia-can-marti': {
    es: {
      metaTitle: 'Fotógrafos de boda en Masia Can Martí | Lifetime',
      metaDescription:
        'Fotografía y vídeo documental de boda en Masia Can Martí, Tarragona. Mira un reportaje real, háblanos por WhatsApp. Respuesta en 24h.',
      eyebrow: 'Reus · Tarragona · desde 2020',
      h1: 'Fotografía y vídeo de boda en Masia Can Martí',
      subtitle:
        'Somos Eric y Ferran, dos hermanos con cámara de foto y de vídeo. Hemos documentado la boda de Jennifer y Albert en Can Martí y sabemos cómo se vive una boda en una masía catalana: la piedra, los espacios abiertos, la energía distinta de cada momento del día.',
      realWeddingIntro:
        'Jennifer y Albert nos confiaron su día. Sin prisas, sin posados forzados. Estuvimos desde los preparativos hasta el baile. El reportaje que verás es exactamente lo que captamos: la complicidad con la familia, los rincones de piedra de la masía, la luz del atardecer en la era.',
      whatItOffersIntro:
        'Las masías catalanas tienen algo que los hoteles de boda no tienen: carácter. Cada pared de piedra, cada ventana pequeña, cada rincón del patio interior tiene historia. Para un fotógrafo significa un reportaje que nunca será igual que otro — y para una pareja, un día con personalidad.',
      whatItOffersBullets: [
        'Los preparativos en una de las habitaciones tradicionales — piedra, vigas de madera, luz natural por ventanas pequeñas. Composiciones imposibles en un hotel.',
        'La ceremonia en el patio interior o en la era — atmósfera íntima, acústica especial, sensación de complicidad',
        'Los retratos de pareja entre las piedras y la vegetación — la mezcla de texturas da una variedad enorme de imágenes',
        'El banquete y el baile — el ambiente de masía se amplifica de noche con la iluminación cálida',
      ],
      whyChooseIntro: 'Dos motivos:',
      whyChoosePoints: [
        'Somos dos hermanos con dos formatos. Uno filma, el otro fotografía. La pareja se va con el día completo en foto y vídeo, sin coordinar dos equipos externos.',
        'Trabajamos en documental. En las masías, los intentos de "boda Instagram" rompen la autenticidad del lugar. Nosotros os dejamos vivir el día. La intervención es mínima — el reportaje resuena con la calidez del espacio.',
      ],
      faqs: [
        {
          question: '¿Conocéis Masia Can Martí?',
          answer:
            'Sí. Allí fotografiamos y filmamos la boda de Jennifer y Albert. Conocemos los rincones, los tiempos y cómo se comporta la luz durante el día.',
        },
        {
          question: '¿Hay buena luz en Can Martí para los retratos?',
          answer:
            'Sí, pero hay horas mejores que otras. El mejor momento para los retratos de pareja es la última hora antes de la cena — cuando la luz se vuelve dorada y la piedra toma color.',
        },
        {
          question: '¿Cuántas horas recomendáis para una boda en Can Martí?',
          answer:
            'Para cubrir desde los preparativos hasta el baile, 10-12 horas. Para solo ceremonia y cóctel, 6-7 horas.',
        },
        {
          question: '¿Se puede hacer una sesión de "First Look" antes de la ceremonia?',
          answer:
            'Sí, lo recomendamos si queréis un momento íntimo solo para vosotros antes de la energía de la ceremonia. En Can Martí hay rincones ideales para este momento.',
        },
        {
          question: '¿Cuánto cuesta la cobertura de boda en Masia Can Martí?',
          answer:
            'Cada boda tiene un presupuesto personalizado según la fecha, el pack y las necesidades. Te pasamos uno concreto en menos de 24h tras una conversación por WhatsApp.',
        },
      ],
      finalCtaH2: 'Vuestra boda merece a alguien que ya conozca Can Martí',
      finalCtaBody:
        'Mira si tenemos vuestra fecha libre. Respuesta en menos de un día. Sin compromiso, sin formularios largos — solo una conversación por WhatsApp.',
    },
    en: {
      metaTitle: 'Wedding photographers at Masia Can Martí | Lifetime',
      metaDescription:
        'Documentary photo + video coverage at Masia Can Martí, Tarragona. See a real wedding gallery, reach us on WhatsApp. Reply within 24h.',
      eyebrow: 'Reus · Tarragona · since 2020',
      h1: 'Wedding photo and video at Masia Can Martí',
      subtitle:
        "We're Eric and Ferran, two brothers shooting photo and video. We documented Jennifer and Albert's wedding at Can Martí, so we know how a day lives inside a Catalan masia: stone walls, open courtyards, the different energy of each part of the day.",
      realWeddingIntro:
        "Jennifer and Albert trusted us with their day — no rush, no forced poses. We were there from morning prep to last dance. The gallery you'll see is exactly what we shoot: family chemistry, the masia's stone corners, the sunset light hitting the inner courtyard.",
      whatItOffersIntro:
        "Catalan masias have something modern wedding hotels don't: character. Every stone wall, every small window, every corner of the inner courtyard has history. For a photographer, that means a gallery that won't look like anyone else's — for a couple, it means a wedding with real personality.",
      whatItOffersBullets: [
        'Prep in one of the traditional bedrooms — stone, wooden beams, natural light through small windows. Compositions impossible in a hotel.',
        'Ceremony in the interior courtyard or the threshing floor — intimate atmosphere, special acoustics, real togetherness',
        'Couple portraits between stone and greenery — the texture mix yields a huge variety of frames',
        'Reception and dance — the masia atmosphere amplifies at night with warm lighting',
      ],
      whyChooseIntro: 'Two reasons:',
      whyChoosePoints: [
        "We're two brothers in two formats. One films, the other shoots stills. You leave with the full day in photo and video, no two-vendor coordination required.",
        'We shoot documentary. At a masia, attempting an "Instagram wedding" breaks the authenticity of the place. We let you live the day — our intervention is minimal, and the coverage resonates with the warmth of the space.',
      ],
      faqs: [
        {
          question: 'Do you know Masia Can Martí?',
          answer:
            "Yes. We photographed and filmed Jennifer and Albert's wedding here. We know the corners, the timings, and how the light behaves through the day.",
        },
        {
          question: 'Is the light at Can Martí good for portraits?',
          answer:
            "Yes, but some hours work better than others. The best window for couple portraits is the last hour before dinner — that's when the light goes golden and the stone takes on colour.",
        },
        {
          question: 'How many hours do you recommend at Can Martí?',
          answer:
            'To cover from prep through to the dance, 10-12 hours. For ceremony and cocktail only, 6-7 hours.',
        },
        {
          question: 'Can you do a "First Look" session before the ceremony?',
          answer:
            "Yes — we recommend it if you want an intimate moment just for the two of you before the ceremony's energy. Can Martí has ideal corners for it.",
        },
        {
          question: 'How much does coverage at Masia Can Martí cost?',
          answer:
            "Every wedding gets a custom quote based on date, package, and needs. We'll send you a concrete one within 24h after a WhatsApp chat.",
        },
      ],
      finalCtaH2: 'Your wedding deserves someone who already knows Can Martí',
      finalCtaBody:
        'Check if your date is still open. Reply within a day. No commitment, no long forms — just a WhatsApp conversation.',
    },
  },

  // ─── Fortí del Rourell ─────────────────────────────────────────────
  'forti-del-rourell': {
    es: {
      metaTitle: 'Fotógrafos de boda en Fortí del Rourell | Lifetime',
      metaDescription:
        'Fotografía y vídeo documental de boda en Fortí del Rourell. Mira el reportaje real de una boda allí y háblanos por WhatsApp.',
      eyebrow: 'El Rourell · Camp de Tarragona · desde 2020',
      h1: 'Fotografía y vídeo de boda en Fortí del Rourell',
      subtitle:
        'Somos Eric y Ferran, dos hermanos con cámara de foto y de vídeo. Hemos documentado la boda de Vanesa y David en Fortí del Rourell — uno de los venues con más carácter del Camp de Tarragona, donde la historia de la fortificación se mezcla con la energía mediterránea de una boda de verano.',
      realWeddingIntro:
        'Vanesa y David nos confiaron su día. Estuvimos desde los preparativos hasta el baile, en una de las bodas con más personalidad que hemos documentado en el Fortí. Lo que captamos es lo que verás si decides trabajar con nosotros: la naturalidad, la fuerza del espacio y los momentos que importan.',
      whatItOffersIntro:
        'El Fortí del Rourell tiene una personalidad muy definida: es una fortificación con historia convertida en uno de los espacios de boda más auténticos de la zona. Para un fotógrafo, estas son las claves:',
      whatItOffersBullets: [
        'Los muros de piedra y la geometría del Fortí — escenario único para los retratos sin necesidad de mover a los invitados',
        'El patio interior y los espacios abiertos permiten ceremonias al aire libre con luz natural impecable',
        'El contraste entre la solidez de la piedra y el verde del entorno — paleta visual rica para el reportaje',
        'El ambiente nocturno con iluminación cálida da una atmósfera cinematográfica para el vídeo del baile',
        'El espacio es lo bastante grande para bodas medianas-grandes pero mantiene la intimidad de los rincones',
      ],
      whyChooseIntro: 'Dos motivos:',
      whyChoosePoints: [
        'Somos dos hermanos con dos formatos. Uno filma, el otro fotografía. La pareja se va con el día completo en foto y vídeo, sin coordinar dos equipos externos.',
        'Conocemos el Fortí del Rourell. Sabemos dónde y cuándo está la mejor luz, los rincones con más carácter para los retratos, y cómo aprovechar la transición del día a la noche que este espacio hace especialmente bien.',
      ],
      faqs: [
        {
          question: '¿Conocéis el Fortí del Rourell?',
          answer:
            'Sí. Allí fotografiamos y filmamos la boda de Vanesa y David. Conocemos los espacios, los rincones de mejor luz y el ritmo natural de una boda en esta fortificación.',
        },
        {
          question: '¿Cuál es la mejor hora para la ceremonia en el Fortí?',
          answer:
            'Entre las 18h y las 19h en meses cálidos. La luz del atardecer sobre la piedra del Fortí es el momento estrella, especialmente en junio-septiembre.',
        },
        {
          question: '¿Cuántas horas recomendáis para una boda en Fortí del Rourell?',
          answer:
            'Para cubrir desde los preparativos hasta el baile, 10-12 horas. Para solo ceremonia y cóctel, 6-7 horas.',
        },
        {
          question: '¿Se puede hacer la ceremonia en la misma finca?',
          answer:
            'Sí, y es lo que recomendamos. El Fortí tiene espacios exteriores preciosos para una ceremonia civil, sin tener que desplazar a los invitados para el banquete. Esa fluidez define bien el día.',
        },
        {
          question: '¿Cuánto cuesta la cobertura de boda en Fortí del Rourell?',
          answer:
            'Cada boda tiene un presupuesto personalizado según la fecha, el pack y las necesidades. Te pasamos uno concreto en menos de 24h tras una conversación por WhatsApp.',
        },
      ],
      finalCtaH2: 'Vuestra boda merece a alguien que ya conozca el Fortí',
      finalCtaBody:
        'Mira si tenemos vuestra fecha libre. Respuesta en menos de un día. Sin compromiso, sin formularios largos — solo una conversación por WhatsApp.',
    },
    en: {
      metaTitle: 'Wedding photographers at Fortí del Rourell | Lifetime',
      metaDescription:
        'Documentary photo + video coverage at Fortí del Rourell. See a real wedding gallery from this venue and message us on WhatsApp.',
      eyebrow: 'El Rourell · Camp de Tarragona · since 2020',
      h1: 'Wedding photo and video at Fortí del Rourell',
      subtitle:
        "We're Eric and Ferran, two brothers shooting photo and video. We documented Vanesa and David's wedding at Fortí del Rourell — one of the venues with the strongest character in the Camp de Tarragona, where the fortification's history meets the Mediterranean energy of a summer wedding.",
      realWeddingIntro:
        "Vanesa and David trusted us with their day. We were there from morning prep to last dance, for one of the most distinctive weddings we've shot at the Fortí. What we captured is what you'll get if you book us: real moments, the force of the space, and the points that matter.",
      whatItOffersIntro:
        "The Fortí del Rourell has a defined personality: a historic fort turned into one of the most authentic wedding venues in the area. For a photographer, these are the keys:",
      whatItOffersBullets: [
        'The stone walls and the Fortí geometry — a unique backdrop for portraits without moving guests',
        'The interior courtyard and open spaces allow outdoor ceremonies with impeccable natural light',
        'The contrast between solid stone and green surroundings — a rich visual palette for the coverage',
        'Night atmosphere with warm lighting gives a cinematic feel to the dance video',
        'The space fits medium-to-large weddings while keeping intimate corners',
      ],
      whyChooseIntro: 'Two reasons:',
      whyChoosePoints: [
        "We're two brothers in two formats. One films, the other shoots stills. You leave with the full day in photo and video, no two-vendor coordination required.",
        "We know the Fortí del Rourell. We know where and when the best light sits, the corners with the most character for portraits, and how to use the day-to-night transition this venue handles especially well.",
      ],
      faqs: [
        {
          question: 'Do you know Fortí del Rourell?',
          answer:
            "Yes. We photographed and filmed Vanesa and David's wedding here. We know the spaces, the corners with the best light, and the natural rhythm of a wedding inside this fortification.",
        },
        {
          question: "What's the best ceremony time at the Fortí?",
          answer:
            'Between 18h and 19h in warm months. Sunset light on the Fortí stone is the standout window, especially June-September.',
        },
        {
          question: 'How many hours do you recommend for a Fortí del Rourell wedding?',
          answer:
            'To cover from prep through to the dance, 10-12 hours. For ceremony and cocktail only, 6-7 hours.',
        },
        {
          question: 'Can the ceremony happen at the venue?',
          answer:
            "Yes, and we recommend it. The Fortí has beautiful outdoor spaces for a civil ceremony, with no need to move guests before the reception. That flow really defines the day.",
        },
        {
          question: 'How much does coverage at Fortí del Rourell cost?',
          answer:
            "Every wedding gets a custom quote based on date, package, and needs. We'll send you a concrete one within 24h after a WhatsApp chat.",
        },
      ],
      finalCtaH2: 'Your wedding deserves someone who already knows the Fortí',
      finalCtaBody:
        'Check if your date is still open. Reply within a day. No commitment, no long forms — just a WhatsApp conversation.',
    },
  },

  // ─── Dosterras Wine Garden ─────────────────────────────────────────
  'dosterras-wine-garden': {
    es: {
      metaTitle: 'Fotógrafos de boda en Dosterras Wine Garden | Lifetime',
      metaDescription:
        'Fotografía y vídeo documental de boda en Dosterras Wine Garden, Tarragona. Mira el reportaje real de una boda allí y háblanos por WhatsApp.',
      eyebrow: 'Reus · Tarragona · desde 2020',
      h1: 'Fotografía y vídeo de boda en Dosterras Wine Garden',
      subtitle:
        'Somos Eric y Ferran, dos hermanos con cámara de foto y de vídeo. Hemos documentado la boda de Idoya y Pau en Dosterras y sabemos cómo se vive una boda en un wine garden: la mezcla de viñedo, cielo abierto y atmósfera mediterránea.',
      realWeddingIntro:
        'Idoya y Pau nos confiaron su día. Estuvimos desde los preparativos hasta el baile. Lo que captamos es lo que verás si decides trabajar con nosotros: la naturalidad, la energía que da casarse entre viñedos, los momentos de calma del cóctel en el jardín.',
      whatItOffersIntro:
        'Dosterras tiene una identidad muy clara: es un wine garden, no un salón convencional. La boda fluye de manera diferente — más abierta, más luminosa, más vinculada al paisaje. Para un fotógrafo, estas son las claves:',
      whatItOffersBullets: [
        'Los espacios exteriores entre la viña — exteriores únicos para los retratos sin mover a los invitados',
        'La ceremonia al aire libre con el campo de fondo — uno de los rincones con mejor luz del Camp de Tarragona al atardecer',
        'El cóctel y el banquete enlazan sin desplazamiento — la energía del día no se rompe',
        'El ambiente nocturno con iluminación cálida y el cielo abierto da una atmósfera cinematográfica para el vídeo',
        'La temática vinícola permite detalles fotográficos naturales — copas, botellas, texturas de madera y piedra',
      ],
      whyChooseIntro: 'Dos motivos:',
      whyChoosePoints: [
        'Somos dos hermanos con dos formatos. Uno filma, el otro fotografía. La pareja se va con el día completo en foto y vídeo, sin coordinar dos equipos externos.',
        'Conocemos Dosterras y su atmósfera. Sabemos dónde y cuándo está la mejor luz, dónde hacer los retratos sin interrumpir el flujo del día, cómo aprovechar las transiciones hacia la noche.',
      ],
      faqs: [
        {
          question: '¿Conocéis Dosterras Wine Garden?',
          answer:
            'Sí. Allí fotografiamos y filmamos la boda de Idoya y Pau. Conocemos los espacios, los rincones con mejor luz y el ritmo natural de una boda en este wine garden.',
        },
        {
          question: '¿Cuál es la mejor hora para la ceremonia en Dosterras?',
          answer:
            'Entre las 18h y las 19h en meses cálidos. La luz del atardecer sobre la viña es el momento estrella, especialmente en junio-septiembre.',
        },
        {
          question: '¿Cuántas horas recomendáis para una boda en Dosterras?',
          answer:
            'Para cubrir desde los preparativos hasta el baile, 10-12 horas. Para solo ceremonia y cóctel, 6-7 horas.',
        },
        {
          question: '¿Se puede hacer la ceremonia en la misma finca?',
          answer:
            'Sí, y es lo que recomendamos. Dosterras tiene espacios exteriores preciosos para una ceremonia civil al atardecer, sin desplazar a los invitados para el banquete. Es la fluidez que define bien el día.',
        },
        {
          question: '¿Cuánto cuesta la cobertura de boda en Dosterras Wine Garden?',
          answer:
            'Cada boda tiene un presupuesto personalizado según la fecha, el pack y las necesidades. Te pasamos uno concreto en menos de 24h tras una conversación por WhatsApp.',
        },
      ],
      finalCtaH2: 'Vuestra boda merece a alguien que ya conozca Dosterras',
      finalCtaBody:
        'Mira si tenemos vuestra fecha libre. Respuesta en menos de un día. Sin compromiso, sin formularios largos — solo una conversación por WhatsApp.',
    },
    en: {
      metaTitle: 'Wedding photographers at Dosterras Wine Garden | Lifetime',
      metaDescription:
        'Documentary photo + video coverage at Dosterras Wine Garden, Tarragona. See a real wedding gallery from this venue and message us on WhatsApp.',
      eyebrow: 'Reus · Tarragona · since 2020',
      h1: 'Wedding photo and video at Dosterras Wine Garden',
      subtitle:
        "We're Eric and Ferran, two brothers shooting photo and video. We documented Idoya and Pau's wedding at Dosterras, so we know how a day lives inside a wine garden: vines, open sky, Mediterranean atmosphere.",
      realWeddingIntro:
        "Idoya and Pau trusted us with their day. We were there from morning prep to last dance. What we captured is what you'll get if you book us: real moments, the energy of getting married among vines, the quiet beats of cocktail hour in the garden.",
      whatItOffersIntro:
        "Dosterras has a clear identity: it's a wine garden, not a conventional reception hall. The wedding flows differently — more open, more luminous, more tied to the landscape. For a photographer, here are the keys:",
      whatItOffersBullets: [
        'Outdoor spaces between the vines — unique exteriors for portraits without moving guests',
        'Outdoor ceremony with the fields behind — one of the corners with the best light in the Camp de Tarragona at sunset',
        'Cocktail and reception chain without travel — the energy of the day stays intact',
        'Night atmosphere with warm lighting and open sky gives a cinematic feel to the video',
        'The wine theme brings natural photographic details — glasses, bottles, wood and stone textures',
      ],
      whyChooseIntro: 'Two reasons:',
      whyChoosePoints: [
        "We're two brothers in two formats. One films, the other shoots stills. You leave with the full day in photo and video, no two-vendor coordination required.",
        "We know Dosterras and its atmosphere. We know where and when the best light sits, where to take portraits without breaking the day's flow, and how to use the transition to night.",
      ],
      faqs: [
        {
          question: 'Do you know Dosterras Wine Garden?',
          answer:
            "Yes. We photographed and filmed Idoya and Pau's wedding here. We know the spaces, the corners with the best light, and the natural rhythm of a wedding at this wine garden.",
        },
        {
          question: "What's the best ceremony time at Dosterras?",
          answer:
            'Between 18h and 19h in warm months. Sunset light over the vineyard is the standout window, especially June-September.',
        },
        {
          question: 'How many hours do you recommend for a Dosterras wedding?',
          answer:
            'To cover from prep through to the dance, 10-12 hours. For ceremony and cocktail only, 6-7 hours.',
        },
        {
          question: 'Can the ceremony happen at the same property?',
          answer:
            "Yes, and we recommend it. Dosterras has beautiful outdoor spaces for a civil ceremony at sunset, with no need to move guests before the reception. That flow really defines the day.",
        },
        {
          question: 'How much does coverage at Dosterras Wine Garden cost?',
          answer:
            "Every wedding gets a custom quote based on date, package, and needs. We'll send you a concrete one within 24h after a WhatsApp chat.",
        },
      ],
      finalCtaH2: 'Your wedding deserves someone who already knows Dosterras',
      finalCtaBody:
        'Check if your date is still open. Reply within a day. No commitment, no long forms — just a WhatsApp conversation.',
    },
  },

  // ─── Masia San Antonio ─────────────────────────────────────────────
  'masia-san-antonio': {
    es: {
      metaTitle: 'Fotógrafos de boda en Masia San Antonio',
      metaDescription:
        'Fotografía y vídeo documental de boda en Masia San Antonio, Tarragona. Mira el reportaje y el tráiler reales. WhatsApp directo.',
      eyebrow: 'Tarragona · Penedès · desde 2020',
      h1: 'Fotografía y vídeo de boda en Masia San Antonio',
      subtitle:
        "Somos Eric y Ferran, dos hermanos con cámara de foto y de vídeo. Hemos documentado la boda de Elena y Jordi en Masia San Antonio y tenemos publicado el tráiler completo de su día. Conocemos la energía del lugar: la masía, los espacios abiertos, la luz del Penedès al atardecer.",
      realWeddingIntro:
        "Elena y Jordi eligieron Masia San Antonio porque querían una boda sin desplazar a los invitados: ceremonia, cóctel, banquete y baile, todo en el mismo sitio. Estuvimos desde los preparativos hasta el baile. Cuando acabes de ver este reportaje, mira también el tráiler completo en /es/videos — es lo que el vídeo puede hacer por vuestra boda.",
      whatItOffersIntro:
        'Masia San Antonio es el venue ideal para parejas que quieren un solo lugar para todo el día. Sin desplazamientos de invitados entre ceremonia y banquete, sin perder invitados por el camino, sin perder tiempo. El día entero fluye en el mismo espacio.',
      whatItOffersBullets: [
        'La ceremonia se puede hacer al exterior con el campo de fondo — uno de los rincones con mejor luz del Penedès al atardecer',
        'Los preparativos en habitaciones de la propia masía — piedra, madera, luz natural por las ventanas. Composiciones imposibles en un hotel',
        'El cóctel y el banquete enlazan sin desplazamiento — la energía del día no se rompe',
        'El baile en la era con iluminación cálida y cielo abierto tiene una atmósfera cinematográfica',
        'Los retratos de pareja se pueden hacer entre viña, campo y espacios interiores — una variedad enorme en pocos metros',
      ],
      whyChooseIntro: 'Dos motivos:',
      whyChoosePoints: [
        'Somos dos hermanos con dos formatos. Uno filma, el otro fotografía. Saldréis con un reportaje completo en foto y un tráiler que os emocionará cada vez que lo veáis.',
        'Conocemos la zona. Masia San Antonio entra dentro de nuestra zona de cobertura habitual — eso significa que podemos dedicar más tiempo a vuestro día sin prisa.',
      ],
      faqs: [
        {
          question: '¿Conocéis Masia San Antonio?',
          answer:
            'Sí. Allí fotografiamos y filmamos la boda de Elena y Jordi en verano de 2025 — el tráiler está publicado en nuestra página de vídeos y podéis ver el reportaje completo más arriba.',
        },
        {
          question: '¿Cubrís Masia San Antonio sin recargo de desplazamiento?',
          answer:
            'Sí. Trabajamos toda la zona de Tarragona y Penedès sin costes adicionales. Masia San Antonio entra en esa zona.',
        },
        {
          question: '¿Se puede hacer la ceremonia en la misma masía?',
          answer:
            'Sí, y es lo que recomendamos. La masía tiene espacios exteriores preciosos para una ceremonia civil al atardecer, sin desplazar a los invitados para el banquete. Es la fluidez que define bien el día.',
        },
        {
          question: '¿Cuál es la mejor hora para la ceremonia en el Penedès en verano?',
          answer:
            'Idealmente entre las 18h y las 19h en julio-agosto. La luz del atardecer sobre el campo es el momento estrella — no os lo queréis perder.',
        },
        {
          question: '¿Cuántas horas recomendáis para una boda en Masia San Antonio?',
          answer:
            '10-12 horas para cubrir desde los preparativos hasta el baile. Para solo ceremonia y cóctel, 6-7 horas.',
        },
        {
          question: '¿Cuánto cuesta la cobertura de boda en Masia San Antonio?',
          answer:
            'Cada boda tiene un presupuesto personalizado según la fecha, el pack y las necesidades. Te pasamos uno concreto en menos de 24h tras una conversación por WhatsApp.',
        },
      ],
      finalCtaH2: 'Vuestra boda merece a alguien que ya conozca Masia San Antonio',
      finalCtaBody:
        'Mira si tenemos vuestra fecha libre. Respuesta en menos de un día. Sin compromiso, sin formularios largos — solo una conversación por WhatsApp.',
      extraResource: {
        label: 'Ver el tráiler completo de Elena y Jordi',
        href: '/es/videos',
      },
    },
    en: {
      metaTitle: 'Wedding photographers at Masia San Antonio',
      metaDescription:
        'Documentary photo + video coverage at Masia San Antonio, Tarragona. See the real wedding gallery and trailer. Direct WhatsApp.',
      eyebrow: 'Tarragona · Penedès · since 2020',
      h1: 'Wedding photo and video at Masia San Antonio',
      subtitle:
        "We're Eric and Ferran, two brothers shooting photo and video. We documented Elena and Jordi's wedding at Masia San Antonio and we've published the full trailer of their day. We know the energy of the place: the masia, the open spaces, the Penedès light at sunset.",
      realWeddingIntro:
        "Elena and Jordi chose Masia San Antonio because they wanted a wedding without moving guests around: ceremony, cocktail, reception, and dance all in the same place. We were there from morning prep to last dance. Once you've watched this gallery, also watch the full trailer at /en/videos — it's what video can do for your wedding.",
      whatItOffersIntro:
        'Masia San Antonio is the ideal venue for couples who want one location for the whole day. No guest transfers between ceremony and reception, no guests lost along the way, no wasted time. The entire day flows inside the same space.',
      whatItOffersBullets: [
        'The ceremony can happen outside with the fields behind — one of the corners with the best light in the Penedès at sunset',
        'Prep in masia rooms — stone, wood, natural light through the windows. Compositions impossible in a hotel',
        "Cocktail and reception chain without travel — the day's energy stays intact",
        'The dance on the threshing floor with warm lighting and open sky has a cinematic feel',
        'Couple portraits can happen across vines, fields, and interior spaces — huge variety within a few metres',
      ],
      whyChooseIntro: 'Two reasons:',
      whyChoosePoints: [
        "We're two brothers in two formats. One films, the other shoots stills. You leave with a complete photo gallery and a trailer that'll move you every time you watch it.",
        "We know the area. Masia San Antonio falls within our usual coverage zone — which means we can dedicate more time to your day, with no hurry.",
      ],
      faqs: [
        {
          question: 'Do you know Masia San Antonio?',
          answer:
            "Yes. We photographed and filmed Elena and Jordi's wedding here in summer 2025 — the trailer is on our videos page and you can see the full gallery above.",
        },
        {
          question: 'Do you cover Masia San Antonio without travel fees?',
          answer:
            'Yes. We work the entire Tarragona and Penedès area with no extra travel cost. Masia San Antonio is well within that zone.',
        },
        {
          question: 'Can the ceremony happen at the masia itself?',
          answer:
            "Yes, and we recommend it. The masia has beautiful outdoor spaces for a civil ceremony at sunset, with no need to move guests before the reception. That flow really defines the day.",
        },
        {
          question: "What's the best ceremony time in the Penedès in summer?",
          answer:
            "Ideally between 18h and 19h in July-August. The sunset light over the fields is the standout moment — you don't want to miss it.",
        },
        {
          question: 'How many hours do you recommend at Masia San Antonio?',
          answer:
            '10-12 hours to cover from prep through to the dance. For ceremony and cocktail only, 6-7 hours.',
        },
        {
          question: 'How much does coverage at Masia San Antonio cost?',
          answer:
            "Every wedding gets a custom quote based on date, package, and needs. We'll send you a concrete one within 24h after a WhatsApp chat.",
        },
      ],
      finalCtaH2: 'Your wedding deserves someone who already knows Masia San Antonio',
      finalCtaBody:
        'Check if your date is still open. Reply within a day. No commitment, no long forms — just a WhatsApp conversation.',
      extraResource: {
        label: "Watch Elena and Jordi's full trailer",
        href: '/en/videos',
      },
    },
  },
};

/** Convenience getter — returns null if the venue is not registered for this locale. */
export function venueCopyFor(slug: string, lang: 'es' | 'en'): VenueLocaleCopy | null {
  return VENUES_I18N[slug]?.[lang] ?? null;
}
