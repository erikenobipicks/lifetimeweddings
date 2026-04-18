// Central i18n dictionary. Keep keys identical across locales.
// Source of truth: Spanish. CA/EN translations completed in full (unlike the
// current Wix site which has partial translations — see memory).

export const languages = {
  ca: 'Català',
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'ca' as const;

export type Lang = keyof typeof languages;

export const ogLocale: Record<Lang, string> = {
  es: 'es_ES',
  ca: 'ca_ES',
  en: 'en_US',
};

export const ui = {
  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Servicios',
    'nav.testimonials': 'Testimonios',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.book': 'Consultar disponibilidad',

    // Hero
    'hero.eyebrow': 'Fotografía y vídeo de bodas · Tarragona · Reus · Lleida',
    'hero.title': 'Dos hermanos. Una cámara y una de vídeo.',
    'hero.title2': 'Vuestra historia, contada a cuatro manos.',
    'hero.subtitle': 'Somos la segunda generación de una familia de fotógrafos. Llevamos más de 15 años contando bodas en Cataluña con un estilo documental, natural y sin poses forzadas.',
    'hero.cta': 'Consultar disponibilidad',
    'hero.cta.secondary': 'Ver bodas reales',

    // Trust bar
    'trust.weddings': '+150 bodas',
    'trust.coverage': 'Tarragona · Lleida · Barcelona',
    'trust.delivery': 'Entrega en 3–4 semanas',
    'trust.rating': '5★ en Google',

    // About
    'about.label': 'Quiénes somos',
    'about.title': 'Nos hemos criado entre cámaras.',
    'about.subtitle': 'Dos hermanos, la misma mirada en dos formatos.',
    'about.p1':
      'Somos Eric y Ferran Blasco, dos hermanos y la segunda generación de una familia de fotógrafos. Antes de andar, ya había carretes, focos y álbumes de boda en casa. De alguna manera, eso te marca.',
    'about.p2':
      'Creamos Lifetime Weddings porque queríamos contar las bodas de otra manera: sin poses forzadas, sin fórmulas y sin prisas. Uno lo hace en foto, el otro en vídeo. La misma mirada, dos formatos.',
    'about.p3':
      'Hacemos bodas en Tarragona, Reus, Lleida, Barcelona y allá donde nos lleve la historia. Y sí — si nos lo pedís, montamos la cámara en Nueva York también (ya lo hemos hecho).',
    'about.cta': 'Ver bodas reales',

    // Team
    'team.label': 'Los que estaremos allí',

    // Portfolio
    'portfolio.label': 'Nuestro trabajo',
    'portfolio.title': 'Algunas bodas recientes',
    'portfolio.intro':
      'Nuestro estilo es fotoperiodismo documental: pasamos desapercibidos, no dirigimos, no interrumpimos. Nuestro trabajo es que dentro de 20 años reviváis el día — no que recordéis al fotógrafo.',

    // Services
    'services.label': 'Lo que ofrecemos',
    'services.title': 'Servicios que ofrecemos',
    'services.photo.title': 'Fotografía de Bodas',
    'services.photo.desc':
      '700–1.200 imágenes editadas, entregadas en galería privada en 3–4 semanas. Cobertura completa del día, del preparativo a la fiesta, con estilo documental.',
    'services.video.title': 'Vídeo de Bodas',
    'services.video.desc':
      'Película documental de 25–35 minutos, entregada en 8–10 semanas. Opcional: tráiler corto, discursos y ceremonia completa sin cortes.',
    'services.fusion.title': 'Sesión pre-boda',
    'services.fusion.desc':
      'Una mañana o una tarde para conocernos y para que os familiaricéis con la cámara antes del gran día. En Tarragona, Reus o donde os venga bien.',

    // Video / Love Stories
    'video.label': 'Hasta donde haga falta',
    'video.title': 'Nueva York, Málaga, Huesca, o a la vuelta de casa',
    'video.p1':
      'Ariadna y Clifton se conocieron en Manhattan. Querían un recuerdo que empezara allí donde empezó todo, así que montamos la cámara y nos llevamos el vídeo a Brooklyn.',
    'video.p2':
      'No todas las historias piden viajar a Nueva York — la mayoría se quedan en Tarragona y están muy bien así. Pero si la vuestra lo pide, vamos donde haga falta.',
    'video.cta': 'Contadnos vuestra historia',

    // Testimonials
    'testi.label': 'Testimonios',
    'testi.title': 'Mirad lo que dicen de nosotros',

    // Instagram
    'insta.title': 'Seamos amigos en Instagram',
    'insta.handle': '@lifetime.weddings',
    'insta.cta': 'Seguir en Instagram',

    // YouTube
    'yt.title': 'Suscríbete a nuestro canal de YouTube',

    // Contact
    'contact.label': 'Contacto',
    'contact.title': 'Estamos deseando conoceros',
    'contact.subtitle':
      'Contadnos sobre vuestra boda. Os respondemos en menos de 24h (l.–v.).',
    'contact.date.placeholder': 'Aproximada (mes y año, o estación)',
    'contact.field.name': 'Nombre',
    'contact.field.email': 'Correo electrónico',
    'contact.field.phone': 'Teléfono',
    'contact.field.date': 'Fecha de la boda',
    'contact.field.venue': 'Lugar de la celebración',
    'contact.field.message': 'Cuéntanos sobre vuestra boda',
    'contact.field.consent': 'Acepto la política de privacidad.',
    'contact.submit': 'Enviar mensaje',
    'contact.success': '¡Muchas gracias por poneros en contacto con nosotros! Os responderemos muy pronto.',
    'contact.error': 'Ha habido un error al enviar el mensaje. Intentadlo de nuevo o escribidnos a hola@lifetime.photo',
    'contact.microcopy': 'Os respondemos en menos de 24h (de lunes a viernes).',
    'contact.placeholder.message': 'Opcional: lugar, estilo, hora de la ceremonia, lo que queráis compartir…',
    'contact.where.title': 'De dónde venimos y hasta dónde vamos',
    'contact.where.desc':
      'Nuestra base está en Reus (Tarragona). Cubrimos bodas sin coste de desplazamiento en Tarragona, Reus, Lleida, Barcelona y el resto de Cataluña. Para bodas fuera de Cataluña, os pasamos un presupuesto a medida.',
    'contact.where.address': 'Dirección',
    'contact.where.hours': 'Horario de respuesta',
    'contact.where.hours.value': 'l.–v., 9h–19h',
    'contact.h1': 'Hablemos de vuestra boda',
    'contact.sub.pre': 'Os respondemos en menos de 24h (l.–v.). Si preferís, también podéis escribirnos por',
    'contact.sub.wa': 'WhatsApp',
    'contact.sub.post': '.',

    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.legal': 'Aviso legal',
    'footer.privacy': 'Política de privacidad',
    'footer.cookies': 'Política de cookies',

    // WhatsApp float
    'wa.label': 'Escríbenos por WhatsApp',
    'wa.message':
      '¡Hola! Nos gustaría información sobre vuestros packs de foto y vídeo de boda. Nos casamos el…',

    // FAQ
    'faq.label': 'Preguntas frecuentes',
    'faq.title': 'Resolvemos las dudas más habituales',
    'faq.q1': '¿Sois dos o uno? ¿Quién viene el día de la boda?',
    'faq.a1': 'Venimos siempre Eric (vídeo) y Ferran (foto). Si el pack incluye segundo operador, se incorpora una persona más de confianza durante las horas clave (preparativos dobles, ceremonia o fiesta).',
    'faq.q2': '¿Qué estilo de fotografía hacéis?',
    'faq.a2': 'Fotoperiodismo creativo. Documental, natural, sin poses forzadas. Os guiamos cuando hace falta — por ejemplo en el retrato de pareja — pero el resto del día pasamos desapercibidos. El objetivo es que dentro de 20 años revivas el día, no que recuerdes al fotógrafo.',
    'faq.q3': '¿Cuánto cuesta una boda con vosotros?',
    'faq.a3': 'Los packs empiezan en 1.290 € + IVA solo fotografía y 2.480 € + IVA para foto + vídeo. Podéis ver todos los packs y precios o hacernos una consulta personalizada en 1 minuto.',
    'faq.q4': '¿Cuándo recibimos las fotos y el vídeo?',
    'faq.a4': 'Galería online con todas las fotos editadas en 3–4 semanas. Vídeo documental en 8–10 semanas. Tráiler, si lo habéis contratado, en 3–4 semanas.',
    'faq.q5': '¿Viajáis fuera de Cataluña?',
    'faq.a5': 'Sí. Nuestra base es Reus, pero hemos hecho bodas en Barcelona, Lleida, Girona, Huesca, Castellón, Málaga y Nueva York. Los desplazamientos fuera de Cataluña se presupuestan aparte.',
    'faq.q6': '¿Hacéis sesión pre-boda?',
    'faq.a6': 'Sí. Es opcional y la recomendamos: os ayuda a sentiros cómodos delante de la cámara y nos permite conoceros mejor antes del gran día.',
    'faq.q7': '¿Y si llueve?',
    'faq.a7': 'Pues llueve, y es precioso. Tenemos experiencia en bodas con lluvia, viento o sol de justicia. Nunca es un problema — solo otra historia que contar.',
    'faq.q8': '¿Cómo se hace la reserva?',
    'faq.a8': 'Confirmamos disponibilidad, firmamos un contrato simple y pedimos un 30% para bloquear la fecha. El resto se paga antes de la boda.',
    'faq.q9': '¿Puedo ver una boda completa, no solo los mejores momentos?',
    'faq.a9': 'Sí. Si nos escribís, os enviamos 1–2 galerías completas para que veáis la coherencia de todo el reportaje, no solo las fotos de Instagram.',
    'faq.q10': '¿Hacéis álbum?',
    'faq.a10': 'Sí, diseñamos álbumes de madera personalizados incluidos en algunos packs. También podemos diseñar álbumes extra para padres y padrinos.',

    // WhatsApp float
    'wa.chat': 'Habla con nosotros',

    // YouTube
    'yt.more': 'Todos los tráilers y películas en nuestro canal →',

    // Quiz funnel
    'quiz.title': 'Veamos si estamos libres vuestra fecha',
    'quiz.subtitle': 'En 1 minuto os hacemos una propuesta personalizada.',
    'quiz.step': 'Paso',
    'quiz.of': 'de',
    'quiz.next': 'Siguiente',
    'quiz.back': 'Atrás',
    'quiz.submit': 'Ver nuestra propuesta',
    'quiz.loading': 'Preparando vuestra propuesta...',
    'quiz.q1': '¿Cuándo os casáis?',
    'quiz.q2': '¿Dónde será la boda?',
    'quiz.q3': '¿Qué tipo de ceremonia?',
    'quiz.q4': '¿Qué servicios os interesan?',
    'quiz.q5': '¿Presupuesto aproximado?',
    'quiz.q6': '¿Cómo os llamáis?',
    'quiz.loc.tarragona': 'Tarragona / Reus',
    'quiz.loc.barcelona': 'Barcelona',
    'quiz.loc.lleida': 'Lleida / Girona',
    'quiz.loc.other_cat': 'Resto de Catalunya',
    'quiz.loc.international': 'Destino internacional',
    'quiz.ceremony.civil': 'Civil',
    'quiz.ceremony.religious': 'Religiosa',
    'quiz.ceremony.symbolic': 'Simbólica',
    'quiz.svc.photo': 'Solo fotografía',
    'quiz.svc.video': 'Solo vídeo',
    'quiz.svc.both': 'Fotografía y vídeo',
    'quiz.budget.low': 'Hasta 1.500 €',
    'quiz.budget.mid': '1.500 – 2.500 €',
    'quiz.budget.high': '2.500 – 3.500 €',
    'quiz.budget.premium': 'Más de 3.500 €',
    'quiz.name.label': 'Vuestros nombres',
    'quiz.name.placeholder': 'Ej. Anna & Marc',
    'quiz.email.label': 'Correo electrónico',
    'quiz.phone.label': 'Teléfono (opcional)',
    'quiz.error': 'Ha habido un error. Inténtalo de nuevo.',

    // Dossier
    'dossier.badge': 'Natural, elegante y auténtico',
    'dossier.title': 'Packs y precios 2026',
    'dossier.lead': 'Especialistas en convertir vuestro gran día en recuerdos emocionantes que perduren para siempre.',
    'dossier.type.photo': 'Fotografía',
    'dossier.type.video': 'Vídeo',
    'dossier.type.combo': 'Foto + Vídeo (#BetterTogether)',
    'dossier.includes': 'Incluye',
    'dossier.featured': 'Recomendado',
    'dossier.cta': 'Nos interesa',
    'dossier.offer.title': 'Oferta flash',
    'dossier.offer.p1': 'Sesión preboda gratuita en Tarragona/Reus al contratar antes del 31/12/2026.',
    'dossier.offer.p2': '🎥 10 % de descuento en el pack completo foto + vídeo si reserváis hoy.',
    'dossier.closing': 'Vuestra boda merece un recuerdo único. Estaremos encantados de capturar vuestra historia con naturalidad y elegancia.',

    // Legal
    'legal.updated': 'Última actualización',

    // Cookies
    'cookies.title': 'Privacidad y cookies',
    'cookies.desc': 'Usamos cookies esenciales para que la web funcione y, opcionalmente, cookies analíticas para mejorar vuestra experiencia. Podéis aceptarlas, rechazarlas o personalizar vuestra elección.',
    'cookies.accept': 'Aceptar todas',
    'cookies.reject': 'Solo esenciales',
    'cookies.settings': 'Más información',
  },

  ca: {
    // Nav
    'nav.home': 'Inici',
    'nav.about': 'Nosaltres',
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Serveis',
    'nav.testimonials': 'Testimonis',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacte',
    'nav.book': 'Consultar disponibilitat',

    'hero.eyebrow': 'Fotografia i vídeo de bodes · Tarragona · Reus · Lleida',
    'hero.title': 'Dos germans. Una càmera i una de vídeo.',
    'hero.title2': 'La vostra història, explicada a quatre mans.',
    'hero.subtitle': 'Som la segona generació d’una família de fotògrafs. Fa més de 15 anys que expliquem bodes a Catalunya amb un estil documental, natural i sense posats forçats.',
    'hero.cta': 'Consultar disponibilitat',
    'hero.cta.secondary': 'Veure bodes reals',

    'trust.weddings': '+150 bodes',
    'trust.coverage': 'Tarragona · Lleida · Barcelona',
    'trust.delivery': 'Entrega en 3–4 setmanes',
    'trust.rating': '5★ a Google',

    'about.label': 'Qui som',
    'about.title': 'Ens hem criat entre càmeres.',
    'about.subtitle': 'Dos germans, la mateixa mirada en dos formats.',
    'about.p1':
      'Som l’Eric i en Ferran Blasco, dos germans i la segona generació d’una família de fotògrafs. Abans que caminéssim, ja hi havia carrets, focus i àlbums de boda a casa. D’alguna manera, això et marca.',
    'about.p2':
      'Vam crear Lifetime Weddings perquè volíem explicar les bodes d’una altra manera: sense posats forçats, sense fórmules i sense presses. Un ho fa en foto, l’altre en vídeo. La mateixa mirada, dos formats.',
    'about.p3':
      'Fem bodes a Tarragona, Reus, Lleida, Barcelona i allà on ens porti la història. I sí — si ens ho demaneu, muntem la càmera a Nova York també (ja ho hem fet).',
    'about.cta': 'Veure bodes reals',

    'team.label': 'Els que hi serem',

    'portfolio.label': 'La nostra feina',
    'portfolio.title': 'Algunes bodes recents',
    'portfolio.intro':
      'El nostre estil és fotoperiodisme documental: passem desapercebuts, no dirigim, no interrompem. La nostra feina és que d’aquí 20 anys reviviu el dia — no que recordeu el fotògraf.',

    'services.label': 'El que oferim',
    'services.title': 'Serveis que oferim',
    'services.photo.title': 'Fotografia de Bodes',
    'services.photo.desc':
      '700–1.200 imatges editades, entregades en galeria privada en 3–4 setmanes. Cobertura completa del dia, de la preparació a la festa, amb estil documental.',
    'services.video.title': 'Vídeo de Bodes',
    'services.video.desc':
      'Pel·lícula documental de 25–35 minuts, entregada en 8–10 setmanes. Opcional: tràiler curt, discursos i cerimònia completa sense talls.',
    'services.fusion.title': 'Sessió pre-boda',
    'services.fusion.desc':
      'Un matí o una tarda per conèixer-nos i perquè us familiaritzeu amb la càmera abans del gran dia. A Tarragona, Reus o allà on us vagi bé.',

    'video.label': 'Fins on calgui',
    'video.title': 'Nova York, Màlaga, Osca, o a la vora de casa',
    'video.p1':
      'L’Ariadna i en Clifton es van conèixer a Manhattan. Volien un record que comencés allà on va començar tot, així que vam muntar la càmera i ens vam endur el vídeo a Brooklyn.',
    'video.p2':
      'No totes les històries demanen viatjar a Nova York — la majoria es queden a Tarragona i estan molt bé així. Però si la vostra ho demana, anem on faci falta.',
    'video.cta': 'Parleu-nos de la vostra història',

    'testi.label': 'Testimonis',
    'testi.title': 'Mireu què en diuen de nosaltres',

    'insta.title': 'Siguem amics a Instagram',
    'insta.handle': '@lifetime.weddings',
    'insta.cta': 'Segueix-nos a Instagram',

    'yt.title': 'Subscriu-te al nostre canal de YouTube',

    'contact.label': 'Contacte',
    'contact.title': 'Tenim ganes de conèixer-vos',
    'contact.subtitle':
      'Expliqueu-nos la vostra boda. Us responem en menys de 24h (dl.–dv.).',
    'contact.date.placeholder': 'Aproximada (mes i any, o estació)',
    'contact.field.name': 'Nom',
    'contact.field.email': 'Correu electrònic',
    'contact.field.phone': 'Telèfon',
    'contact.field.date': 'Data de la boda',
    'contact.field.venue': 'Lloc de la celebració',
    'contact.field.message': 'Expliqueu-nos sobre la vostra boda',
    'contact.field.consent': 'Accepto la política de privacitat.',
    'contact.submit': 'Enviar missatge',
    'contact.success': 'Moltes gràcies per posar-vos en contacte! Us respondrem ben aviat.',
    'contact.error': 'Hi ha hagut un error en enviar el missatge. Torneu-ho a provar o escriviu-nos a hola@lifetime.photo',
    'contact.microcopy': 'Us responem en menys de 24h (de dilluns a divendres).',
    'contact.placeholder.message': 'Opcional: lloc, estil, hora de la cerimònia, res que vulgueu compartir…',
    'contact.where.title': 'D’on venim i fins on anem',
    'contact.where.desc':
      'La nostra base és a Reus (Tarragona). Cobrim bodes sense cost de desplaçament a Tarragona, Reus, Lleida, Barcelona i la resta de Catalunya. Per a bodes fora de Catalunya, us passem un pressupost a mida.',
    'contact.where.address': 'Adreça',
    'contact.where.hours': 'Horari de resposta',
    'contact.where.hours.value': 'dl.–dv., 9h–19h',
    'contact.h1': 'Parlem de la vostra boda',
    'contact.sub.pre': 'Us responem en menys de 24h (dl.–dv.). Si preferiu, també podeu escriure-nos per',
    'contact.sub.wa': 'WhatsApp',
    'contact.sub.post': '.',

    'footer.rights': 'Tots els drets reservats.',
    'footer.legal': 'Avís legal',
    'footer.privacy': 'Política de privacitat',
    'footer.cookies': 'Política de galetes',

    'wa.label': 'Escriu-nos per WhatsApp',
    'wa.chat': 'Parla amb nosaltres',
    'wa.message':
      'Hola! Ens agradaria informació dels vostres packs de foto i vídeo de boda. Ens casem el…',

    'yt.more': 'Tots els tràilers i pel·lícules al nostre canal →',

    // FAQ
    'faq.label': 'Preguntes freqüents',
    'faq.title': 'Resolem els dubtes més habituals',
    'faq.q1': 'Sou dos o un? Qui ve el dia de la boda?',
    'faq.a1': 'Venim sempre l’Eric (vídeo) i en Ferran (foto). Si el pack inclou segon operador, s’incorpora una persona més de confiança durant les hores clau (preparatius dobles, cerimònia o festa).',
    'faq.q2': 'Quin estil de fotografia feu?',
    'faq.a2': 'Fotoperiodisme creatiu. Documental, natural, sense posats forçats. Us guiem quan cal — per exemple en el retrat de parella — però la resta del dia passem desapercebuts. L’objectiu és que d’aquí 20 anys reviviu el dia, no que recordeu el fotògraf.',
    'faq.q3': 'Quant costa una boda amb vosaltres?',
    'faq.a3': 'Els packs comencen en 1.290 € + IVA només fotografia i 2.480 € + IVA per foto + vídeo. Podeu veure tots els packs i preus o fer-nos una consulta personalitzada en 1 minut.',
    'faq.q4': 'Quan rebem les fotos i el vídeo?',
    'faq.a4': 'Galeria online amb totes les fotos editades en 3–4 setmanes. Vídeo documental en 8–10 setmanes. Tràiler, si l’heu contractat, en 3–4 setmanes.',
    'faq.q5': 'Viatgeu fora de Catalunya?',
    'faq.a5': 'Sí. La nostra base és Reus, però hem fet bodes a Barcelona, Lleida, Girona, Osca, Castelló, Màlaga i Nova York. Els desplaçaments fora de Catalunya es pressuposten a part.',
    'faq.q6': 'Feu sessió pre-boda?',
    'faq.a6': 'Sí. És opcional i la recomanem: us ajuda a sentir-vos còmodes davant de la càmera i ens permet conèixer-vos millor abans del gran dia.',
    'faq.q7': 'I si plou?',
    'faq.a7': 'Doncs plou, i és preciós. Tenim experiència en bodes amb pluja, vent o sol de justícia. Mai és un problema — només una altra història per explicar.',
    'faq.q8': 'Com es fa la reserva?',
    'faq.a8': 'Confirmem disponibilitat, signem un contracte simple i demanem un 30 % per bloquejar la data. La resta es paga abans de la boda.',
    'faq.q9': 'Puc veure una boda completa, no només els millors moments?',
    'faq.a9': 'Sí. Si ens escriviu us enviem 1–2 galeries completes perquè veieu la coherència de tot el reportatge, no només les fotos d’Instagram.',
    'faq.q10': 'Feu àlbum?',
    'faq.a10': 'Sí, dissenyem àlbums de fusta personalitzats inclosos en alguns packs. També podem dissenyar àlbums extra per a pares i padrins.',

    'quiz.title': 'Mirem si estem lliures la vostra data',
    'quiz.subtitle': 'En 1 minut us fem una proposta personalitzada.',
    'quiz.step': 'Pas',
    'quiz.of': 'de',
    'quiz.next': 'Següent',
    'quiz.back': 'Enrere',
    'quiz.submit': 'Veure la nostra proposta',
    'quiz.loading': 'Preparant la vostra proposta...',
    'quiz.q1': 'Quan us caseu?',
    'quiz.q2': 'On serà la boda?',
    'quiz.q3': 'Quin tipus de cerimònia?',
    'quiz.q4': 'Quins serveis us interessen?',
    'quiz.q5': 'Pressupost aproximat?',
    'quiz.q6': 'Com us dieu?',
    'quiz.loc.tarragona': 'Tarragona / Reus',
    'quiz.loc.barcelona': 'Barcelona',
    'quiz.loc.lleida': 'Lleida / Girona',
    'quiz.loc.other_cat': 'Resta de Catalunya',
    'quiz.loc.international': 'Destí internacional',
    'quiz.ceremony.civil': 'Civil',
    'quiz.ceremony.religious': 'Religiosa',
    'quiz.ceremony.symbolic': 'Simbòlica',
    'quiz.svc.photo': 'Només fotografia',
    'quiz.svc.video': 'Només vídeo',
    'quiz.svc.both': 'Fotografia i vídeo',
    'quiz.budget.low': 'Fins a 1.500 €',
    'quiz.budget.mid': '1.500 – 2.500 €',
    'quiz.budget.high': '2.500 – 3.500 €',
    'quiz.budget.premium': 'Més de 3.500 €',
    'quiz.name.label': 'Els vostres noms',
    'quiz.name.placeholder': 'Ex. Anna & Marc',
    'quiz.email.label': 'Correu electrònic',
    'quiz.phone.label': 'Telèfon (opcional)',
    'quiz.error': 'Hi ha hagut un error. Torneu-ho a provar.',

    'dossier.badge': 'Natural, elegant i autèntic',
    'dossier.title': 'Packs i preus 2026',
    'dossier.lead': 'Especialistes a convertir el vostre gran dia en records emocionants que perdurin per sempre.',
    'dossier.type.photo': 'Fotografia',
    'dossier.type.video': 'Vídeo',
    'dossier.type.combo': 'Foto + Vídeo (#BetterTogether)',
    'dossier.includes': 'Inclou',
    'dossier.featured': 'Recomanat',
    'dossier.cta': 'Ens interessa',
    'dossier.offer.title': 'Oferta flash',
    'dossier.offer.p1': 'Sessió preboda gratuïta a Tarragona/Reus si contracteu abans del 31/12/2026.',
    'dossier.offer.p2': '🎥 10 % de descompte en el pack complet foto + vídeo si reserveu avui.',
    'dossier.closing': 'El vostre casament mereix un record únic. Estarem encantats de capturar la vostra història amb naturalitat i elegància.',

    'legal.updated': 'Darrera actualització',

    'cookies.title': 'Privacitat i galetes',
    'cookies.desc': 'Fem servir galetes essencials perquè la web funcioni i, opcionalment, galetes analítiques per millorar la vostra experiència. Podeu acceptar-les, rebutjar-les o personalitzar la vostra tria.',
    'cookies.accept': 'Acceptar totes',
    'cookies.reject': 'Només essencials',
    'cookies.settings': 'Més informació',
  },

  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Services',
    'nav.testimonials': 'Testimonials',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.book': 'Check availability',

    'hero.eyebrow': 'Wedding photography & film · Tarragona · Reus · Lleida',
    'hero.title': 'Two brothers. One camera, one film rig.',
    'hero.title2': 'Your story, told with four hands.',
    'hero.subtitle': 'We’re the second generation of a family of photographers. For over 15 years we’ve been telling wedding stories across Catalonia — documentary, natural, never posed.',
    'hero.cta': 'Check availability',
    'hero.cta.secondary': 'See real weddings',

    'trust.weddings': '+150 weddings',
    'trust.coverage': 'Tarragona · Lleida · Barcelona',
    'trust.delivery': 'Delivery in 3–4 weeks',
    'trust.rating': '5★ on Google',

    'about.label': 'Who we are',
    'about.title': 'We grew up with cameras.',
    'about.subtitle': 'Two brothers, one vision in two formats.',
    'about.p1':
      'We are Eric and Ferran Blasco, two brothers and the second generation of a family of photographers. Before we could walk, there were already rolls of film, lighting kits and wedding albums at home. Somehow, that shapes you.',
    'about.p2':
      'We created Lifetime Weddings because we wanted to tell weddings differently: no forced poses, no formulas, no rush. One works in photo, the other in video. The same eye, two formats.',
    'about.p3':
      'We shoot weddings in Tarragona, Reus, Lleida, Barcelona and wherever the story takes us. And yes — if you ask, we’ll set up the camera in New York too (we’ve done it).',
    'about.cta': 'See real weddings',

    'team.label': 'Who’ll be there',

    'portfolio.label': 'Our work',
    'portfolio.title': 'Recent weddings',
    'portfolio.intro':
      'Our style is documentary photojournalism: we stay out of the way, we don’t direct, we don’t interrupt. Our job is that 20 years from now you relive the day — not that you remember the photographer.',

    'services.label': 'What we offer',
    'services.title': 'Services we offer',
    'services.photo.title': 'Wedding Photography',
    'services.photo.desc':
      '700–1,200 edited images, delivered in a private online gallery in 3–4 weeks. Full-day coverage, from getting ready to the party, documentary style.',
    'services.video.title': 'Wedding Video',
    'services.video.desc':
      '25–35 minute documentary film, delivered in 8–10 weeks. Optional: short trailer, speeches and uncut ceremony.',
    'services.fusion.title': 'Pre-wedding session',
    'services.fusion.desc':
      'A morning or afternoon to get to know each other and for you to get comfortable in front of the camera. In Tarragona, Reus or wherever suits you.',

    'video.label': 'As far as it takes',
    'video.title': 'New York, Málaga, Huesca, or just round the corner',
    'video.p1':
      'Ariadna and Clifton met in Manhattan. They wanted a memory that started where everything started, so we packed the camera and shot the film in Brooklyn.',
    'video.p2':
      'Not every story calls for a trip to New York — most stay in Tarragona, and that’s great. But if yours calls for it, we’ll go wherever it takes.',
    'video.cta': 'Tell us your story',

    'testi.label': 'Testimonials',
    'testi.title': 'See what couples say about us',

    'insta.title': 'Let’s be friends on Instagram',
    'insta.handle': '@lifetime.weddings',
    'insta.cta': 'Follow on Instagram',

    'yt.title': 'Subscribe to our YouTube channel',

    'contact.label': 'Contact',
    'contact.title': 'We’re looking forward to meeting you',
    'contact.subtitle':
      'Tell us about your wedding. We reply within 24h (Mon–Fri).',
    'contact.date.placeholder': 'Approximate (month + year, or season)',
    'contact.field.name': 'Name',
    'contact.field.email': 'Email',
    'contact.field.phone': 'Phone',
    'contact.field.date': 'Wedding date',
    'contact.field.venue': 'Venue',
    'contact.field.message': 'Tell us about your wedding',
    'contact.field.consent': 'I accept the privacy policy.',
    'contact.submit': 'Send message',
    'contact.success': 'Thanks a lot for reaching out! We’ll get back to you very soon.',
    'contact.error': 'There was an error sending the message. Please try again or email us at hola@lifetime.photo',
    'contact.where.title': 'Where we’re based and how far we go',
    'contact.where.desc':
      'Our base is in Reus (Tarragona). We cover weddings at no travel cost in Tarragona, Reus, Lleida, Barcelona and the rest of Catalonia. For weddings outside Catalonia, we’ll send you a custom quote.',
    'contact.where.address': 'Address',
    'contact.where.hours': 'Reply hours',
    'contact.where.hours.value': 'Mon–Fri, 9am–7pm',
    'contact.h1': 'Let’s talk about your wedding',
    'contact.sub.pre': 'We reply within 24h (Mon–Fri). You can also reach us on',
    'contact.sub.wa': 'WhatsApp',
    'contact.sub.post': '.',

    'footer.rights': 'All rights reserved.',
    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy policy',
    'footer.cookies': 'Cookie policy',

    'wa.label': 'Message us on WhatsApp',
    'wa.chat': 'Chat with us',
    'wa.message':
      'Hi! We’d like info on your wedding photo and video packs. We’re getting married on…',

    'yt.more': 'All trailers and films on our channel →',

    'faq.label': 'Frequently asked questions',
    'faq.title': 'Answers to the most common questions',
    'faq.q1': 'Are you two, or one? Who comes on the wedding day?',
    'faq.a1': 'Eric (video) and Ferran (photo) always come together. If the pack includes a second operator, a trusted teammate joins during the key hours (dual getting-ready, ceremony or party).',
    'faq.q2': 'What photography style do you shoot?',
    'faq.a2': 'Creative photojournalism. Documentary, natural, no forced poses. We guide you when we need to — for the couple’s portrait, for example — but the rest of the day we stay out of the way. The goal is that 20 years from now you relive the day, not remember the photographer.',
    'faq.q3': 'How much does a wedding with you cost?',
    'faq.a3': 'Packs start at €1,290 + VAT for photo only and €2,480 + VAT for photo + video. You can view all packs and prices or get a personalised quote in under a minute.',
    'faq.q4': 'When do we get the photos and video?',
    'faq.a4': 'Online gallery with all edited photos in 3–4 weeks. Documentary film in 8–10 weeks. Trailer, if included, in 3–4 weeks.',
    'faq.q5': 'Do you travel outside Catalonia?',
    'faq.a5': 'Yes. Our base is Reus, but we’ve shot weddings in Barcelona, Lleida, Girona, Huesca, Castellón, Málaga and New York. Travel outside Catalonia is quoted separately.',
    'faq.q6': 'Do you offer a pre-wedding session?',
    'faq.a6': 'Yes. It’s optional and we recommend it: it helps you feel comfortable in front of the camera and lets us get to know you better before the big day.',
    'faq.q7': 'What if it rains?',
    'faq.a7': 'Then it rains, and it’s beautiful. We’ve shot through rain, wind and scorching sun. It’s never a problem — just another story to tell.',
    'faq.q8': 'How do we book?',
    'faq.a8': 'We confirm availability, sign a simple contract and ask for 30 % to hold the date. The rest is paid before the wedding.',
    'faq.q9': 'Can I see a full wedding, not just the highlights?',
    'faq.a9': 'Yes. Reach out and we’ll send 1–2 full galleries so you can see the consistency of the whole coverage, not just the Instagram picks.',
    'faq.q10': 'Do you design albums?',
    'faq.a10': 'Yes, we design personalised wooden albums included in selected packs. We can also design extra albums for parents and godparents.',

    'contact.microcopy': 'We reply within 24h (Monday to Friday).',
    'contact.placeholder.message': 'Optional: venue, style, ceremony time, anything you want to share…',

    'quiz.title': 'Let’s see if we’re free on your date',
    'quiz.subtitle': 'In 1 minute we’ll send you a personalised quote.',
    'quiz.step': 'Step',
    'quiz.of': 'of',
    'quiz.next': 'Next',
    'quiz.back': 'Back',
    'quiz.submit': 'See our proposal',
    'quiz.loading': 'Preparing your proposal...',
    'quiz.q1': 'When is the wedding?',
    'quiz.q2': 'Where will it take place?',
    'quiz.q3': 'What type of ceremony?',
    'quiz.q4': 'Which services interest you?',
    'quiz.q5': 'Approximate budget?',
    'quiz.q6': 'What are your names?',
    'quiz.loc.tarragona': 'Tarragona / Reus',
    'quiz.loc.barcelona': 'Barcelona',
    'quiz.loc.lleida': 'Lleida / Girona',
    'quiz.loc.other_cat': 'Rest of Catalonia',
    'quiz.loc.international': 'International destination',
    'quiz.ceremony.civil': 'Civil',
    'quiz.ceremony.religious': 'Religious',
    'quiz.ceremony.symbolic': 'Symbolic',
    'quiz.svc.photo': 'Photography only',
    'quiz.svc.video': 'Video only',
    'quiz.svc.both': 'Photography and video',
    'quiz.budget.low': 'Up to €1,500',
    'quiz.budget.mid': '€1,500 – €2,500',
    'quiz.budget.high': '€2,500 – €3,500',
    'quiz.budget.premium': 'Over €3,500',
    'quiz.name.label': 'Your names',
    'quiz.name.placeholder': 'e.g. Anna & Marc',
    'quiz.email.label': 'Email',
    'quiz.phone.label': 'Phone (optional)',
    'quiz.error': 'Something went wrong. Please try again.',

    'dossier.badge': 'Natural, elegant and authentic',
    'dossier.title': 'Packs and prices 2026',
    'dossier.lead': 'Specialists in turning your big day into moving memories that last forever.',
    'dossier.type.photo': 'Photography',
    'dossier.type.video': 'Video',
    'dossier.type.combo': 'Photo + Video (#BetterTogether)',
    'dossier.includes': 'Includes',
    'dossier.featured': 'Recommended',
    'dossier.cta': 'We’re interested',
    'dossier.offer.title': 'Flash offer',
    'dossier.offer.p1': 'Free pre-wedding session in Tarragona/Reus when booking before 31/12/2026.',
    'dossier.offer.p2': '🎥 10 % off on the full photo + video pack if you book today.',
    'dossier.closing': 'Your wedding deserves a unique memory. We’ll be delighted to capture your story with warmth and elegance.',

    'legal.updated': 'Last updated',

    'cookies.title': 'Privacy and cookies',
    'cookies.desc': 'We use essential cookies so the site works and, optionally, analytics cookies to improve your experience. You can accept them, reject them or customise your choice.',
    'cookies.accept': 'Accept all',
    'cookies.reject': 'Essential only',
    'cookies.settings': 'More information',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key];
  };
}

/** Prefix a path with the locale segment. CA (default) has no prefix. */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'ca') return clean === '/' ? '/' : clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}
