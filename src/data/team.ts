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
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    bio: {
      ca: [
        'Sóc l’Eric. Vídeo, sempre vídeo.',
        'Em vaig enamorar del vídeo quan vaig entendre que una boda no és un dia — és hores de coses petites que mai tornen a passar igual. La mirada del pare de la núvia, el primer petó entre amigues que no es veien des de fa anys, el plor contingut durant els vots.',
        'El meu estil és documental. No dirigeixo escenes, no demano «mireu-vos i rieu». Em poso on no molesto i deixo que el dia passi. Després, a l’edició, és quan construeixo la vostra pel·lícula.',
        'He gravat bodes a Tarragona, Barcelona, Lleida, Osca, Màlaga i Nova York. No em fa por anar on faci falta.',
      ],
      es: [
        'Soy Eric. Vídeo, siempre vídeo.',
        'Me enamoré del vídeo cuando entendí que una boda no es un día — son horas de pequeñas cosas que nunca vuelven a pasar igual. La mirada del padre de la novia, el primer abrazo entre amigas que no se veían desde hace años, el llanto contenido durante los votos.',
        'Mi estilo es documental. No dirijo escenas, no pido «miraos y reíd». Me pongo donde no molesto y dejo que el día pase. Después, en la edición, es cuando construyo vuestra película.',
        'He grabado bodas en Tarragona, Barcelona, Lleida, Huesca, Málaga y Nueva York. No me da miedo ir donde haga falta.',
      ],
      en: [
        'I’m Eric. Video, always video.',
        'I fell for video when I realised a wedding isn’t one day — it’s hours of small things that never happen the same way twice. The bride’s father’s look. The first hug between friends who hadn’t seen each other in years. The held-back tears during the vows.',
        'My style is documentary. I don’t direct scenes, I don’t ask for «look at each other and smile». I stay out of the way and let the day happen. Then, in the edit, I build your film.',
        'I’ve shot weddings in Tarragona, Barcelona, Lleida, Huesca, Málaga and New York. I’m not afraid to travel.',
      ],
    },
  },
  {
    id: 'ferran',
    name: 'Ferran Blasco',
    role: { es: 'Fotógrafo', ca: 'Fotògraf', en: 'Photographer' },
    instagram: 'https://www.instagram.com/ferryphotographer/',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
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
