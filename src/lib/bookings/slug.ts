// Generate URL slugs for bookings. Format:
//   {name1}-{name2}-{year}-{12charRandom}
//   e.g. "laura-marc-2026-x7k2q9m4p1zt"
//
// SECURITY: the slug is the ONLY secret protecting the booking's private
// pages (/reserva/<slug>, /contrato/<slug>) — which expose PII and allow
// form submission + electronic contract acceptance. The name+year prefix is
// guessable (wedding details are often public), so the random suffix has to
// carry the entropy on its own. 12 chars over a 36-symbol alphabet ≈ 62 bits,
// making enumeration infeasible. (The earlier 4-char suffix was only ~20 bits
// ≈ 1.7M guesses — brute-forceable once the names were known.)
//
// The suffix uses crypto.randomInt (NOT Math.random) so it's both
// collision-resistant and unpredictable. Alphabet is a-z0-9 (URL-safe,
// lowercase).

import { randomInt } from 'node:crypto';
import { db } from '../db';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

/** Strip diacritics, lowercase, and keep only [a-z0-9]. Empty input becomes
 *  "x" so the slug never has consecutive separators. */
function normalize(name: string): string {
  const stripped = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  return stripped.length === 0 ? 'x' : stripped;
}

function randomSuffix(len = 12): string {
  let out = '';
  for (let i = 0; i < len; i += 1) {
    out += ALPHABET[randomInt(0, ALPHABET.length)];
  }
  return out;
}

async function slugExists(slug: string): Promise<boolean> {
  const res = await db.execute({
    sql: 'SELECT 1 FROM bookings WHERE slug = ? LIMIT 1',
    args: [slug],
  });
  return res.rows.length > 0;
}

/** Build a unique slug for a new booking. Retries up to 5 times if the
 *  random suffix collides; throws after that. */
export async function generateBookingSlug(
  name1: string,
  name2: string,
  weddingDate: Date,
): Promise<string> {
  const base = `${normalize(name1)}-${normalize(name2)}-${weddingDate.getUTCFullYear()}`;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = `${base}-${randomSuffix(12)}`;
    if (!(await slugExists(candidate))) return candidate;
  }
  throw new Error(`Could not generate a unique booking slug after 5 attempts (base="${base}")`);
}
