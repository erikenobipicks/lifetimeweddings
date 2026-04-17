import type { Lang } from '~/i18n/ui';

export interface Testimonial {
  id: string;
  author: string;
  photo: string;
  alt: string;
  quote: Record<Lang, string>;
}

// Real testimonials extracted from audit. Extend when section 10 arrives.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'luis-craig',
    author: 'Luis & Craig',
    photo: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&auto=format&fit=crop&q=80',
    alt: 'Luis & Craig — Lifetime Weddings',
    quote: {
      es: '¡No podríamos estar más felices con el trabajo de Ferran! Capturó cada momento de nuestra boda con una sensibilidad y un estilo preciosos. Nos hizo sentir muy cómodos delante de la cámara, y fue encantador no solo con nosotros, sino también con todos nuestros invitados. Además, trabajó con una rapidez increíble: tuvimos acceso a las galerías solo unos días después del evento. ¡Un auténtico placer trabajar con Ferran y lo recomendamos sin dudarlo!',
      ca: 'No podríem estar més contents amb la feina del Ferran! Va capturar cada moment de la nostra boda amb una sensibilitat i un estil preciosos. Ens va fer sentir molt còmodes davant la càmera, i va ser encantador amb nosaltres i amb tots els convidats. A més, va treballar amb una rapidesa increïble: vam tenir accés a les galeries només uns dies després de l’esdeveniment. Un autèntic plaer treballar amb ell i el recomanem sense dubtar-ho!',
      en: 'We couldn’t be happier with Ferran’s work! He captured every moment of our wedding with beautiful sensitivity and style. He made us feel very comfortable in front of the camera and was lovely not only with us but also with all our guests. He also worked incredibly fast: we had access to the galleries just days after the event. A real pleasure to work with Ferran and we recommend him without hesitation!',
    },
  },
  {
    id: 'jose-jordina',
    author: 'Jose & Jordina',
    photo: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&auto=format&fit=crop&q=80',
    alt: 'Jose & Jordina — Lifetime Weddings',
    quote: {
      es: 'Jose tramó la pedida con ellos y tenía claro que formarían parte del día más especial de nuestras vidas. ¡Son unos cracks! Creativos, profesionales, rápidos, y saben plasmar a la perfección lo que queríamos en todas las sesiones que hemos hecho con ellos. Pedida TOP, preboda TOP y el día B... increíble, sin palabras. Repetiríamos mil veces más con ellos.',
      ca: 'En Jose va tramar la petició de mà amb ells, i tenia clar que formarien part del dia més especial de les nostres vides. Són uns cracks! Creatius, professionals, ràpids, i saben plasmar a la perfecció allò que volíem en totes les sessions que hem fet amb ells. Petició de mà TOP, preboda TOP i el dia B... increïble, sense paraules. Repetiríem mil vegades més amb ells!',
      en: 'Jose planned the proposal with them, and was clear that they had to be part of the most special day of our lives. They are amazing! Creative, professional, fast, and they know how to capture exactly what we wanted in every session. Top proposal, top pre-wedding and wedding day... incredible, no words. We would repeat a thousand times more with them!',
    },
  },
  {
    id: 'laura-joel',
    author: 'Laura & Joel',
    photo: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=300&auto=format&fit=crop&q=80',
    alt: 'Laura & Joel — Lifetime Weddings',
    quote: {
      es: 'Eric y Ferran son geniales, muy profesionales en su trabajo, rápidos entregando resultados y, sobre todo, tienen muchísimo gusto a la hora de hacer fotos y vídeos. En nuestra boda supieron sacar lo mejor de cada momento y hacerlo único. El vídeo ha sido espectacular, como una película. Sin duda, si algún día necesitamos un fotógrafo o videógrafo, ¡repetimos!',
      ca: 'L’Eric i el Ferran són genials, molt professionals, ràpids en els lliuraments i, sobretot, tenen molt bon gust a l’hora de fer fotos i vídeos. A la nostra boda van saber treure el millor de cada moment i fer-lo únic. El vídeo ha estat espectacular, com una pel·lícula. Sens dubte, si algun dia necessitem fotògraf o videògraf, repetim!',
      en: 'Eric and Ferran are great, very professional, quick to deliver results and, above all, they have great taste when taking photos and videos. At our wedding they knew how to make the best of every moment and make it unique. The video was spectacular, like a movie. Without a doubt, if one day we need a photographer or videographer, we will repeat!',
    },
  },
];
