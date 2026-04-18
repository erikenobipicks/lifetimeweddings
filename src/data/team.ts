import type { Lang } from '~/i18n/ui';

export interface TeamMember {
  id: 'eric' | 'ferran';
  name: string;
  role: Record<Lang, string>;
  instagram: string;
  photo: string; // placeholder until real assets ingested
  bio: Record<Lang, string[]>;
  cta: Record<Lang, string>;
}

export const TEAM: TeamMember[] = [
  {
    id: 'eric',
    name: 'Eric Blasco',
    role: { es: 'Videógrafo', ca: 'Videògraf', en: 'Videographer' },
    instagram: 'https://www.instagram.com/lifetime.weddings/',
    photo: '/team/eric.jpg',
    bio: {
      es: [
        'Soy Eric Blasco, videógrafo especializado en bodas, eventos y cualquier historia que merezca ser contada.',
        'Resido en Reus, cerca de Tarragona, pero mi pasión por el vídeo y la narración me ha llevado a capturar historias en Barcelona, Lleida, Girona, Huesca, Castellón, Málaga e incluso Nueva York. Para mí, no hay distancias cuando se trata de mezclar mis dos grandes pasiones: viajar y contar historias.',
        'Cada vídeo es más que un reportaje; es un legado. Mi objetivo es crear el mejor recuerdo posible para vosotros, un vídeo que perdure en el tiempo y os haga revivir cada emoción como si fuera el primer día.',
      ],
      ca: [
        'Sóc Eric Blasco, videògraf especialitzat en bodes, esdeveniments i qualsevol història que mereixi ser explicada.',
        'Visc a Reus, a prop de Tarragona, però la meva passió pel vídeo i la narració m’ha portat a capturar històries a Barcelona, Lleida, Girona, Osca, Castelló, Màlaga i fins i tot Nova York. Per a mi no hi ha distàncies quan es tracta de barrejar les meves dues grans passions: viatjar i explicar històries.',
        'Cada vídeo és més que un reportatge; és un llegat. El meu objectiu és crear el millor record possible per a vosaltres, un vídeo que perduri en el temps i us faci reviure cada emoció com si fos el primer dia.',
      ],
      en: [
        'I’m Eric Blasco, a videographer specialising in weddings, events and any story that deserves to be told.',
        'I live in Reus, near Tarragona, but my passion for video and storytelling has taken me to capture stories in Barcelona, Lleida, Girona, Huesca, Castellón, Málaga and even New York. For me, distance is no obstacle when I get to combine my two great passions: travelling and telling stories.',
        'Every video is more than a report; it’s a legacy. My goal is to create the best possible memory for you — a film that stands the test of time and lets you relive every emotion as if it were the first day.',
      ],
    },
    cta: {
      es: '📽️ ¿Quieres que inmortalicemos tu historia? Hablemos y hagámoslo realidad.',
      ca: '📽️ Vols que immortalitzem la teva història? Parlem-ne i fem-ho realitat.',
      en: '📽️ Want us to immortalise your story? Let’s talk and make it happen.',
    },
  },
  {
    id: 'ferran',
    name: 'Ferran Blasco',
    role: { es: 'Fotógrafo', ca: 'Fotògraf', en: 'Photographer' },
    instagram: 'https://www.instagram.com/ferryphotographer/',
    photo: '/team/ferran.jpg',
    bio: {
      es: [
        '¡Hola! Soy Ferran Blasco y tengo la gran suerte de dedicarme a lo que más me apasiona: la fotografía. A través de mi cámara, capturo momentos únicos que, de otro modo, se desvanecerían en el tiempo.',
        'Mi misión es convertir cada imagen en un recuerdo eterno, capaz de transportaros a ese instante, reviviendo cada emoción como si fuera el primer día.',
        'Además de ser fotógrafo y padre, soy un apasionado del fútbol, la música y el buen café. También disfruto del cine y las series, siempre buscando nuevas historias que me inspiren.',
      ],
      ca: [
        'Hola! Sóc Ferran Blasco i tinc la gran sort de dedicar-me al que més m’apassiona: la fotografia. A través de la meva càmera, capturo moments únics que, d’altra manera, es desdibuixarien en el temps.',
        'La meva missió és convertir cada imatge en un record etern, capaç de transportar-vos a aquell instant, revivint cada emoció com si fos el primer dia.',
        'A més de ser fotògraf i pare, sóc un apassionat del futbol, la música i el bon cafè. També gaudeixo del cinema i les sèries, sempre buscant noves històries que m’inspirin.',
      ],
      en: [
        'Hello! I’m Ferran Blasco and I’m lucky to work on what I love the most: photography. Through my camera, I capture unique moments that would otherwise fade with time.',
        'My mission is to turn every image into an eternal memory that takes you back to that instant and lets you relive every emotion as if it were the first day.',
        'Besides being a photographer and a dad, I’m passionate about football, music and good coffee. I also enjoy films and series, always looking for new stories that inspire me.',
      ],
    },
    cta: {
      es: '📸 ¿Quieres que capturemos juntos tu historia? Estaré encantado de hacerlo realidad.',
      ca: '📸 Vols que capturem junts la teva història? Estaré encantat de fer-ho realitat.',
      en: '📸 Want us to capture your story together? I’d love to make it happen.',
    },
  },
];
