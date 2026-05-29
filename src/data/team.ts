// IMPORTANT: never use stock images here — always real team photos.
// Files live at public/team/eric.jpg and public/team/ferran.jpg.
import type { Lang } from '~/i18n/ui';

export interface TeamMember {
  id: 'eric' | 'ferran';
  name: string;
  role: Record<Lang, string>;
  instagram: string;
  photo: string;
  bio: Record<Lang, string[]>;
}

export const TEAM: TeamMember[] = [
  {
    id: 'eric',
    name: 'Eric Blasco',
    role: { es: 'Videógrafo', ca: 'Videògraf', en: 'Videographer' },
    instagram: 'https://www.instagram.com/lifetime.weddings/',
    photo: '/team/eric.jpg',
    bio: {
      ca: [
        'Sóc l’Eric. Vídeo, sempre vídeo.',
        'Em vaig enamorar del vídeo quan vaig entendre que una boda no és un dia — són hores de coses petites que no tornen. La mirada del pare de la núvia abans d’entregar-la. L’abraçada entre amigues que feia anys que no es veien. El plor contingut durant els vots.',
        'El meu estil és documental. No dirigeixo escenes ni demano «mireu-vos i rieu». Em poso on no molesto i deixo que el dia passi. La pel·lícula la construeixo després, a l’edició.',
        'He gravat bodes a Tarragona, Barcelona, Lleida, Osca, Màlaga i Nova York. No em fa por anar on faci falta.',
      ],
      es: [
        'Soy Eric. Vídeo, siempre vídeo.',
        'Me enamoré del vídeo cuando entendí que una boda no es un día — son horas de pequeñas cosas que no vuelven. La mirada del padre de la novia antes de entregarla. El abrazo entre amigas que llevaban años sin verse. El llanto contenido durante los votos.',
        'Mi estilo es documental. No dirijo escenas ni pido «miraos y reíd». Me pongo donde no molesto y dejo que el día pase. La película la construyo después, en la edición.',
        'He grabado bodas en Tarragona, Barcelona, Lleida, Huesca, Málaga y Nueva York. No me da miedo ir donde haga falta.',
      ],
      en: [
        'I’m Eric. Video, always video.',
        'I fell for video when I realised a wedding isn’t one day — it’s hours of small things that don’t come back. The bride’s father’s look before walking her down the aisle. The hug between friends who hadn’t seen each other in years. The held-back tears during the vows.',
        'My style is documentary. I don’t direct scenes or ask for «look at each other and smile». I stay out of the way and let the day happen. I build your film later, in the edit.',
        'I’ve shot weddings in Tarragona, Barcelona, Lleida, Huesca, Málaga and New York. I’m not afraid to travel.',
      ],
    },
  },
  {
    id: 'ferran',
    name: 'Ferran Blasco',
    role: { es: 'Fotógrafo', ca: 'Fotògraf', en: 'Photographer' },
    instagram: 'https://www.instagram.com/ferryphotographer/',
    photo: '/team/ferran.jpg',
    bio: {
      ca: [
        'Sóc en Ferran. L’altre germà, el de la foto.',
        'Porto una càmera al coll des que tinc memòria. Al final t’acostumes a mirar el món buscant la llum, la composició, l’instant just abans del que tothom espera.',
        'A una boda, la meva feina no és fer fotos boniques — això és el mínim. És capturar el que passa quan ningú mira la càmera: la tieta que plora a l’última fila, l’amic que es desfà de riure, les mans que es toquen per sota de la taula durant el discurs.',
        'Quan us entrego la galeria, no busco que digueu «quines fotos més maques» — busco que digueu «això és exactament com va ser aquell dia».',
      ],
      es: [
        'Soy Ferran. El otro hermano, el de la foto.',
        'Llevo una cámara al cuello desde que tengo memoria. Al final te acostumbras a mirar el mundo buscando la luz, la composición, el instante justo antes de lo que todos esperan.',
        'En una boda, mi trabajo no es hacer fotos bonitas — eso es el mínimo. Es capturar lo que pasa cuando nadie mira a la cámara: la tía que llora en la última fila, el amigo que se parte de risa, las manos que se rozan por debajo de la mesa durante el discurso.',
        'Cuando os entrego la galería, no busco que digáis «qué fotos tan bonitas» — busco que digáis «esto es exactamente como fue ese día».',
      ],
      en: [
        'I’m Ferran. The other brother, the one with the camera.',
        'I’ve had a camera around my neck for as long as I can remember. Eventually you learn to see the world in light, composition, the beat just before everyone expects.',
        'At a wedding, my job isn’t to make nice pictures — that’s the minimum. It’s to catch what happens when no one is looking at the camera: the aunt crying in the back row, the friend doubled over laughing, hands brushing under the table during a speech.',
        'When I hand you the gallery, I don’t want you to say «what beautiful photos» — I want you to say «this is exactly how that day felt».',
      ],
    },
  },
];
