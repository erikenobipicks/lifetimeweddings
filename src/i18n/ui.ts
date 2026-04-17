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
    'nav.book': 'Reservar cita',

    // Hero
    'hero.title': 'Fotografía y Vídeo de Bodas en Tarragona',
    'hero.subtitle': 'Capturamos los momentos más especiales de vuestro día con naturalidad y emoción.',
    'hero.tagline': 'Capturamos & contamos · Momentos & historias',
    'hero.cta': 'Explícanos tu historia',

    // About
    'about.label': 'Somos',
    'about.title': 'Lifetime Weddings',
    'about.subtitle': 'Creando recuerdos eternos de vuestra historia de amor.',
    'about.p1':
      'Nos hemos criado entre cámaras, focos y carretes de fotografía, viendo incontables imágenes de bodas. Sí, somos la segunda generación de una familia dedicada a contar historias de amor. Con años de experiencia y un estilo propio en fotografía y vídeo de bodas, decidimos dar vida a Lifetime Weddings con un propósito claro: crear recuerdos que perduren en las familias para toda la vida.',
    'about.p2':
      'No nos limitamos a capturar una boda con simples posados. Buscamos fotografías que transmitan emociones, con un toque artístico, que cuenten la historia real de ese día. En vídeo, nos centramos en la historia de las personas que se aman y han decidido compartir su vida juntas, plasmando cada sentimiento con naturalidad y autenticidad.',
    'about.cta': 'Conócenos',

    // Team
    'team.label': 'El equipo',
    'team.title': 'Dos hermanos, un solo objetivo:',
    'team.title.em': 'capturar vuestra historia',
    'team.intro':
      'Somos un equipo de fotógrafos especializados en bodas en Tarragona (Reus), con años de experiencia inmortalizando momentos únicos. Como hermanos, #BetterTogether no es solo un hashtag, sino nuestra filosofía: la compenetración, el respeto y la conexión son clave para capturar cada boda con autenticidad y emoción.',
    'team.cta': '📸 ¿Queréis que inmortalicemos vuestro gran día? Escribidnos y hablemos sobre vuestra boda.',

    // Portfolio
    'portfolio.label': 'Nuestro trabajo',
    'portfolio.title': 'Algunos de nuestros trabajos',
    'portfolio.tab.photo': 'Fotografía de Boda',
    'portfolio.tab.video': 'Vídeo de Boda',
    'portfolio.p1':
      'Nuestro estilo en fotografía y vídeo de bodas es el fotoperiodismo creativo: una combinación perfecta entre la captura espontánea y un enfoque artístico.',
    'portfolio.p2':
      'Buscamos inmortalizar cada sonrisa, cada lágrima, cada emoción y cada detalle de vuestro gran día de forma natural, sin interferir en el momento. Pasamos desapercibidos, pero estamos en cada instante, asegurándonos de contar vuestra historia con autenticidad y sensibilidad.',
    'portfolio.p3':
      'Nuestro objetivo es reflejar la realidad de vuestra boda, pero con un toque de magia y arte. Queremos que, al ver cada imagen o vídeo, podáis revivir la emoción de ese día como si estuvierais allí.',
    'portfolio.cta': '📸 Capturamos instantes, contamos historias y transmitimos emociones.',

    // Services
    'services.label': 'Lo que ofrecemos',
    'services.title': 'Servicios que ofrecemos',
    'services.photo.title': 'Fotografía de Boda',
    'services.photo.desc':
      'Capturamos cada instante de vuestro gran día con un estilo documental y artístico, sin posados forzados. Vuestras emociones, vuestra historia, contadas con autenticidad.',
    'services.video.title': 'Vídeo de Boda',
    'services.video.desc':
      'Creamos películas cinematográficas que os transportarán de vuelta a ese día especial. Más que un reportaje, un legado cinematográfico de vuestro amor.',
    'services.fusion.title': 'Fusion Pre Boda',
    'services.fusion.desc':
      'Nos encanta descubrir los pequeños detalles, las miradas, los besos y esos instantes llenos de magia que hacen única vuestra historia. Nuestra creatividad nace de vosotros.',

    // Video / Love Stories
    'video.label': '🇺🇸 Love Story · Nueva York',
    'video.title': 'Love Stories Videos',
    'video.p1':
      'Viajar a Nueva York fue una experiencia única para nosotros. Tuvimos el privilegio de compartir momentos con Ariadna & Clifton y contar su hermosa historia de amor a través de nuestra lente, recorriendo juntos las calles de Manhattan y Brooklyn.',
    'video.p2':
      'Cada rincón de la ciudad se convirtió en el escenario perfecto para capturar su complicidad, creando recuerdos que quedarán para siempre.',
    'video.cta': '📸 Porque cada historia merece ser contada en el lugar donde nace la magia.',

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
      'Rellenad este formulario contándonos todo lo que os gustaría que supiéramos sobre vuestra boda. Os responderemos lo antes posible con toda la información necesaria.',
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
    'contact.where.title': '¿Dónde nos podéis encontrar?',
    'contact.where.desc':
      'Aunque estamos basados en Reus (Tarragona), realizamos bodas por todo el mundo. No importa dónde os caséis, ¡llevamos nuestras cámaras hasta vosotros!',

    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.legal': 'Aviso legal',
    'footer.privacy': 'Política de privacidad',
    'footer.cookies': 'Política de cookies',

    // WhatsApp float
    'wa.label': 'Escríbenos por WhatsApp',
    'wa.message':
      '¡Hola! Nos gustaría información sobre vuestros packs de foto y vídeo de boda. Nos casamos en...',

    // Quiz funnel
    'quiz.title': 'Vuestro presupuesto a medida',
    'quiz.subtitle': 'Respondednos a unas breves preguntas y os prepararemos una propuesta personalizada en segundos.',
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
    'dossier.offer.p1': '📸 Sesión preboda gratuita en Tarragona/Reus al contratar antes del 31/12/2026.',
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
    'nav.book': 'Reservar cita',

    'hero.title': 'Fotografia i Vídeo de Bodes a Tarragona',
    'hero.subtitle': 'Capturem els moments més especials del vostre dia amb naturalitat i emoció.',
    'hero.tagline': 'Capturem & expliquem · Moments & històries',
    'hero.cta': 'Expliqueu-nos la vostra història',

    'about.label': 'Som',
    'about.title': 'Lifetime Weddings',
    'about.subtitle': 'Creant records inesborrables de la vostra història d’amor.',
    'about.p1':
      'Ens hem criat entre càmeres, focus i carrets de fotografia, veient incomptables imatges de bodes. Sí, som la segona generació d’una família dedicada a explicar històries d’amor. Amb anys d’experiència i un estil propi en fotografia i vídeo de bodes, vam decidir donar vida a Lifetime Weddings amb un propòsit clar: crear records que perdurin a les famílies per tota la vida.',
    'about.p2':
      'No ens limitem a capturar una boda amb simples posats. Busquem fotografies que transmetin emocions, amb un toc artístic, que expliquin la història real d’aquell dia. En vídeo, ens centrem en la història de les persones que s’estimen i han decidit compartir la vida plegades, plasmant cada sentiment amb naturalitat i autenticitat.',
    'about.cta': 'Coneix-nos',

    'team.label': 'L’equip',
    'team.title': 'Dos germans, un sol objectiu:',
    'team.title.em': 'capturar la vostra història',
    'team.intro':
      'Som un equip de fotògrafs especialitzats en bodes a Tarragona (Reus), amb anys d’experiència immortalitzant moments únics. Com a germans, #BetterTogether no és només un hashtag, sinó la nostra filosofia: la compenetració, el respecte i la connexió són clau per capturar cada boda amb autenticitat i emoció.',
    'team.cta': '📸 Voleu que immortalitzem el vostre gran dia? Contacteu-nos i parlem de la vostra boda.',

    'portfolio.label': 'La nostra feina',
    'portfolio.title': 'Alguns dels nostres treballs',
    'portfolio.tab.photo': 'Fotografia de Bodes',
    'portfolio.tab.video': 'Vídeo de Bodes',
    'portfolio.p1':
      'El nostre estil en fotografia i vídeo de bodes és el fotoperiodisme creatiu: una combinació perfecta entre la captura espontània i un enfocament artístic.',
    'portfolio.p2':
      'Busquem immortalitzar cada somriure, cada llàgrima, cada emoció i cada detall del vostre gran dia de manera natural, sense interferir en el moment. Passem desapercebuts, però som a cada instant, assegurant-nos d’explicar la vostra història amb autenticitat i sensibilitat.',
    'portfolio.p3':
      'El nostre objectiu és reflectir la realitat de la vostra boda, però amb un toc de màgia i art. Volem que, en veure cada imatge o vídeo, pugueu reviure l’emoció d’aquell dia com si hi fóssiu.',
    'portfolio.cta': '📸 Capturem instants, expliquem històries i transmetem emocions.',

    'services.label': 'El que oferim',
    'services.title': 'Serveis que oferim',
    'services.photo.title': 'Fotografia de Bodes',
    'services.photo.desc':
      'Capturem cada instant del vostre gran dia amb un estil documental i artístic, sense posats forçats. Les vostres emocions, la vostra història, explicades amb autenticitat.',
    'services.video.title': 'Vídeo de Bodes',
    'services.video.desc':
      'Creem cinematic films que us transportaran de nou a aquell dia especial. Més que un reportatge, un llegat cinematogràfic del vostre amor.',
    'services.fusion.title': 'Fusió Pre Boda',
    'services.fusion.desc':
      'Ens encanta descobrir els petits detalls, les mirades, els petons i aquells instants plens de màgia que fan única la vostra història. La nostra creativitat neix de vosaltres.',

    'video.label': '🇺🇸 Love Story · Nova York',
    'video.title': 'Love Stories Videos',
    'video.p1':
      'Viatjar a Nova York va ser una experiència única per a nosaltres. Vam tenir el privilegi de compartir moments amb l’Ariadna i en Clifton i explicar la seva preciosa història d’amor a través del nostre objectiu, recorrent junts els carrers de Manhattan i Brooklyn.',
    'video.p2':
      'Cada racó de la ciutat es va convertir en l’escenari perfecte per capturar la seva complicitat, creant records que quedaran per sempre.',
    'video.cta': '📸 Perquè cada història mereix ser explicada al lloc on neix la màgia.',

    'testi.label': 'Testimonis',
    'testi.title': 'Mireu què en diuen de nosaltres',

    'insta.title': 'Siguem amics a Instagram',
    'insta.handle': '@lifetime.weddings',
    'insta.cta': 'Segueix-nos a Instagram',

    'yt.title': 'Subscriu-te al nostre canal de YouTube',

    'contact.label': 'Contacte',
    'contact.title': 'Tenim ganes de conèixer-vos',
    'contact.subtitle':
      'Empleneu aquest formulari i expliqueu-nos tot el que us agradaria que sabéssim sobre la vostra boda. Us respondrem al més aviat possible amb tota la informació necessària.',
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
    'contact.where.title': 'On ens podeu trobar?',
    'contact.where.desc':
      'Tot i que tenim la base a Reus (Tarragona), fem bodes arreu del món. No importa on us caseu: portem les càmeres fins a vosaltres!',

    'footer.rights': 'Tots els drets reservats.',
    'footer.legal': 'Avís legal',
    'footer.privacy': 'Política de privacitat',
    'footer.cookies': 'Política de galetes',

    'wa.label': 'Escriu-nos per WhatsApp',
    'wa.message':
      'Hola! Ens agradaria informació sobre els vostres packs de foto i vídeo de boda. Ens casem a...',

    'quiz.title': 'El vostre pressupost a mida',
    'quiz.subtitle': 'Responeu unes breus preguntes i us prepararem una proposta personalitzada en segons.',
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
    'dossier.offer.p1': '📸 Sessió preboda gratuïta a Tarragona/Reus si contracteu abans del 31/12/2026.',
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
    'nav.book': 'Book a call',

    'hero.title': 'Wedding Photography and Videography in Tarragona',
    'hero.subtitle': 'We capture the most meaningful moments of your day with warmth and honesty.',
    'hero.tagline': 'We capture & tell · Moments & stories',
    'hero.cta': 'Tell us your story',

    'about.label': 'We are',
    'about.title': 'Lifetime Weddings',
    'about.subtitle': 'Creating timeless memories of your love story.',
    'about.p1':
      'We grew up surrounded by cameras, lights and rolls of film, looking at countless wedding images. Yes, we are the second generation of a family dedicated to telling love stories. With years of experience and our own style in wedding photography and videography, we decided to bring Lifetime Weddings to life with a clear purpose: to create memories that families will cherish for a lifetime.',
    'about.p2':
      'We do not limit ourselves to capturing a wedding with simple posed shots. We look for photographs that convey emotion, with an artistic touch, that tell the real story of that day. In video, we focus on the story of the people who love each other and have decided to share their lives together, conveying every feeling with authenticity.',
    'about.cta': 'Meet us',

    'team.label': 'The team',
    'team.title': 'Two brothers, one single goal:',
    'team.title.em': 'to capture your story',
    'team.intro':
      'We are a team of wedding photographers and videographers based in Tarragona (Reus) with years of experience immortalising unique moments. As brothers, #BetterTogether is not just a hashtag but our philosophy: understanding, respect and connection are key to capturing every wedding with authenticity and emotion.',
    'team.cta': '📸 Want us to capture your big day? Get in touch and let’s talk about your wedding.',

    'portfolio.label': 'Our work',
    'portfolio.title': 'Some of our work',
    'portfolio.tab.photo': 'Wedding Photography',
    'portfolio.tab.video': 'Wedding Video',
    'portfolio.p1':
      'Our style in wedding photography and videography is creative photojournalism: the perfect combination of spontaneous capture and an artistic approach.',
    'portfolio.p2':
      'We aim to immortalise every smile, every tear, every emotion and every detail of your big day in a natural way, without interfering. We blend in, but we are there at every moment, making sure we tell your story with authenticity and sensitivity.',
    'portfolio.p3':
      'Our goal is to reflect the reality of your wedding, but with a touch of magic and art. We want you to relive that day — as if you were there — every time you see an image or video.',
    'portfolio.cta': '📸 We capture moments, tell stories and convey emotions.',

    'services.label': 'What we offer',
    'services.title': 'Services we offer',
    'services.photo.title': 'Wedding Photography',
    'services.photo.desc':
      'We capture every moment of your big day with a documentary and artistic style, no forced poses. Your emotions, your story, told authentically.',
    'services.video.title': 'Wedding Video',
    'services.video.desc':
      'We create cinematic films that will take you back to that special day. More than a report: a cinematic legacy of your love.',
    'services.fusion.title': 'Fusion Pre Wedding',
    'services.fusion.desc':
      'We love discovering the little details, the glances, the kisses and those magical moments that make your story unique. Our creativity comes from you.',

    'video.label': '🇺🇸 Love Story · New York',
    'video.title': 'Love Stories Videos',
    'video.p1':
      'Travelling to New York was a unique experience for us. We had the privilege of sharing moments with Ariadna & Clifton and telling their beautiful love story through our lens, walking together through the streets of Manhattan and Brooklyn.',
    'video.p2':
      'Every corner of the city became the perfect setting to capture their chemistry, creating memories that will last forever.',
    'video.cta': '📸 Because every story deserves to be told where the magic begins.',

    'testi.label': 'Testimonials',
    'testi.title': 'See what couples say about us',

    'insta.title': 'Let’s be friends on Instagram',
    'insta.handle': '@lifetime.weddings',
    'insta.cta': 'Follow on Instagram',

    'yt.title': 'Subscribe to our YouTube channel',

    'contact.label': 'Contact',
    'contact.title': 'We’re looking forward to meeting you',
    'contact.subtitle':
      'Fill in this form and tell us everything you would like us to know about your wedding. We will get back to you as soon as possible with all the information you need.',
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
    'contact.where.title': 'Where can you find us?',
    'contact.where.desc':
      'Although we are based in Reus (Tarragona), we shoot weddings all over the world. Wherever you get married, we bring our cameras to you!',

    'footer.rights': 'All rights reserved.',
    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy policy',
    'footer.cookies': 'Cookie policy',

    'wa.label': 'Message us on WhatsApp',
    'wa.message':
      'Hi! We’d love more info about your wedding photo and video packs. We are getting married in...',

    'quiz.title': 'Your custom quote',
    'quiz.subtitle': `Answer a few quick questions and we'll prepare a personalised proposal in seconds.`,
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
    'dossier.offer.p1': '📸 Free pre-wedding session in Tarragona/Reus when booking before 31/12/2026.',
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
