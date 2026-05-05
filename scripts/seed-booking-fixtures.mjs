// Seed two booking proposals for the Fase 2 checkpoint demo:
//   - laura-marc-2026 (CA, status='sent')
//   - lucia-pablo-2026 (ES, status='viewed')
//
// Idempotent: deletes any prior booking with the seed slugs before inserting.
//
// Usage: `node scripts/seed-booking-fixtures.mjs`
// The DATABASE_URL env var should point at your local sqlite file
// (default: file:./data/quotes.db).

import 'dotenv/config';
import { createClient } from '@libsql/client';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';

const url = process.env.DATABASE_URL ?? 'file:./data/quotes.db';
if (url.startsWith('file:')) {
  const path = url.replace(/^file:/, '');
  try { mkdirSync(dirname(path), { recursive: true }); } catch { /* ignore */ }
}
const db = createClient({ url });

// ─── Schema bootstrap ─────────────────────────────────────────────────────
// Recreate the same tables `initSchema()` creates, so this script can run
// against an empty DB (e.g. fresh local checkout, CI box).
async function ensureSchema() {
  await db.execute(`CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    couple_name_1 TEXT NOT NULL,
    couple_name_2 TEXT NOT NULL,
    couple_email_primary TEXT NOT NULL,
    couple_phone_primary TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'ca'
      CHECK (preferred_language IN ('ca', 'es', 'en')),
    wedding_date TEXT NOT NULL,
    venue_name TEXT NOT NULL,
    venue_city TEXT,
    venue_address TEXT,
    pack_name TEXT NOT NULL,
    pack_description TEXT,
    pack_includes TEXT NOT NULL DEFAULT '[]',
    pack_excludes TEXT NOT NULL DEFAULT '[]',
    pack_addons TEXT NOT NULL DEFAULT '[]',
    pack_price_cents INTEGER NOT NULL,
    deposit_cents INTEGER NOT NULL,
    payment_terms TEXT,
    custom_intro TEXT,
    reference_testimonial TEXT,
    status TEXT NOT NULL DEFAULT 'draft'
      CHECK (status IN ('draft', 'sent', 'viewed', 'form_submitted', 'archived')),
    expires_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    first_viewed_at TEXT,
    form_submitted_at TEXT
  )`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_bookings_slug ON bookings(slug)`);
}

const now = () => new Date().toISOString();

const fixtures = [
  {
    id: randomUUID(),
    slug: 'laura-marc-2026-demo',
    couple_name_1: 'Laura',
    couple_name_2: 'Marc',
    couple_email_primary: 'laura@example.com',
    couple_phone_primary: '+34600000001',
    preferred_language: 'ca',
    wedding_date: '2026-07-12',
    venue_name: "L'Orangerie Clos Barenys",
    venue_city: 'Tarragona',
    venue_address: 'Camí de Berdolet, s/n, 43205 Reus',
    pack_name: 'Foto + Vídeo Premium',
    pack_description:
      "El nostre pack més complet per a parelles que volen una documentació exhaustiva del dia: dos fotògrafs presents a tot moment, vídeo cinematogràfic, drone i sessió pre-boda inclosa. Pensat per a bodes de jornada llarga i alta exigència visual.",
    pack_includes: JSON.stringify([
      'Cobertura completa el dia de la boda (12h)',
      'Foto i vídeo simultanis: Eric i Ferran junts',
      'Sessió pre-boda en localització a triar',
      "Edició completa: 600+ fotografies i vídeo de 6-8 minuts",
      'Galeria privada online + descàrrega d\'alta resolució',
      'Drone (si la legislació ho permet al vostre venue)',
      'Pen drive de fusta amb el material',
      'Reunions prèvies il·limitades (presencials o online)',
    ]),
    pack_excludes: JSON.stringify([
      'Àlbum imprès (es pot afegir com add-on)',
      'Còpies adicionals fora de la galeria privada',
      'Desplaçaments fora de Catalunya',
    ]),
    pack_addons: JSON.stringify([
      { name: 'Àlbum imprès 30x30, 40 pàgines', price_cents: 39000 },
      { name: 'Sessió post-boda (after-party)', price_cents: 49000 },
      { name: 'Reportatge de la cerimònia civil prèvia', price_cents: 29000 },
    ]),
    pack_price_cents: 348000, // 3.480 €
    deposit_cents: 80000,     // 800 €
    payment_terms: '50% en signar, 50% un mes abans del dia',
    custom_intro: null,
    reference_testimonial: JSON.stringify({
      quote:
        "Vam dubtar entre tres fotògrafs. Vam triar Lifetime per la sensació que ens donaven, i és exactament el que va passar el dia. La nostra família encara parla del vídeo.",
      author: 'Cristina i Daniel',
      context: 'Mas la Boella, Tarragona',
    }),
    status: 'sent',
    expires_at: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // +21d
    created_at: now(),
    updated_at: now(),
  },
  {
    id: randomUUID(),
    slug: 'lucia-pablo-2026-demo',
    couple_name_1: 'Lucía',
    couple_name_2: 'Pablo',
    couple_email_primary: 'lucia@example.com',
    couple_phone_primary: '+34600000002',
    preferred_language: 'es',
    wedding_date: '2026-09-19',
    venue_name: 'Mas la Boella',
    venue_city: 'Tarragona',
    venue_address: 'Autovia Reus-Tarragona, km 12',
    pack_name: 'Foto Premium',
    pack_description:
      'Cobertura fotográfica completa para una boda de un solo día, con un único fotógrafo principal (Ferran) y un asistente. Material editado y entregado en menos de 12 semanas.',
    pack_includes: JSON.stringify([
      'Cobertura el día de la boda (10h)',
      'Sesión pre-boda en localización a elegir',
      'Edición completa: 500+ fotografías',
      'Galería privada online + descarga en alta resolución',
      'Pen drive de madera con el material',
      'Reuniones previas ilimitadas',
    ]),
    pack_excludes: JSON.stringify([
      'Vídeo (se puede contratar como pack combinado)',
      'Drone',
      'Álbum impreso (se puede añadir como add-on)',
    ]),
    pack_addons: JSON.stringify([
      { name: 'Álbum impreso 25x25, 30 páginas', price_cents: 29000 },
      { name: 'Vídeo highlight de 3 minutos', price_cents: 79000 },
      { name: 'Hora extra de cobertura', price_cents: 12000 },
    ]),
    pack_price_cents: 198000, // 1.980 €
    deposit_cents: 50000,     // 500 €
    payment_terms: '50% al firmar, 50% un mes antes del día',
    custom_intro: null,
    reference_testimonial: JSON.stringify({
      quote:
        'Dudamos entre tres fotógrafos. Elegimos Lifetime por la sensación que nos daban, y es exactamente lo que pasó el día. Nuestra familia todavía habla del reportaje.',
      author: 'Cristina y Daniel',
      context: 'Mas la Boella, Tarragona',
    }),
    status: 'viewed',
    expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // +14d
    created_at: now(),
    updated_at: now(),
    first_viewed_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

await ensureSchema();

for (const f of fixtures) {
  // Idempotent reset.
  await db.execute({ sql: 'DELETE FROM bookings WHERE slug = ?', args: [f.slug] });
  await db.execute({
    sql: `INSERT INTO bookings (
      id, slug,
      couple_name_1, couple_name_2, couple_email_primary, couple_phone_primary, preferred_language,
      wedding_date, venue_name, venue_city, venue_address,
      pack_name, pack_description, pack_includes, pack_excludes, pack_addons,
      pack_price_cents, deposit_cents, payment_terms,
      custom_intro, reference_testimonial,
      status, expires_at,
      created_at, updated_at, first_viewed_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )`,
    args: [
      f.id, f.slug,
      f.couple_name_1, f.couple_name_2, f.couple_email_primary, f.couple_phone_primary, f.preferred_language,
      f.wedding_date, f.venue_name, f.venue_city, f.venue_address,
      f.pack_name, f.pack_description, f.pack_includes, f.pack_excludes, f.pack_addons,
      f.pack_price_cents, f.deposit_cents, f.payment_terms,
      f.custom_intro, f.reference_testimonial,
      f.status, f.expires_at,
      f.created_at, f.updated_at, f.first_viewed_at ?? null,
    ],
  });
  console.log(`[seed] Inserted ${f.slug} (status=${f.status}, lang=${f.preferred_language})`);
}

console.log('\nVisit:');
console.log('  CA: http://localhost:4321/reserva/laura-marc-2026-demo');
console.log('  ES: http://localhost:4321/reserva/lucia-pablo-2026-demo');
