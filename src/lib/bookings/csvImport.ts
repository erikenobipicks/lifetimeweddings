// CSV import for closed weddings, fed by the "Contracte Bodes" Google Forms
// export. Pure parsing/mapping helpers (no DB) so they can be unit-tested and
// reused by the /admin import page. The DB writes happen in the page handler
// via the existing repository (createBooking + createFormResponse).
//
// The column layout is specific to that Google Form. We validate the header
// before mapping so a different CSV fails loudly instead of silently
// mismapping personal data.

import type { Lang } from './types';

/** Minimum wedding year to import. Anything earlier is skipped. */
export const MIN_WEDDING_YEAR = 2026;

// Fixed column indices for the "Contracte Bodes (respostes)" export.
const COL = {
  timestamp: 0,
  p1Name: 1,
  p1Dni: 2,
  p1Phone: 3,
  p2Name: 4,
  p2Dni: 5,
  p2Phone: 6,
  email: 7,
  address: 8,
  city: 9,
  postal: 10,
  howFound: 11,
  langBetween: 12,
  date: 13,
  ceremonyTime: 14,
  ceremonyLoc: 17,
  receptionLoc: 18,
  ceremonyType: 19,
  guests: 20,
  firstLook: 21,
  pubConsent: 22,
  dataProtection: 23,
} as const;

/** Substrings expected in the header so we don't mismap a foreign CSV. */
const HEADER_MARKERS: Array<[number, string]> = [
  [COL.date, 'casament'],
  [COL.email, 'mail'],
  [COL.ceremonyLoc, 'cerimònia'],
];

// ── Robust CSV parser (handles quoted fields with commas/newlines/quotes) ────
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;
  // Strip a leading UTF-8 BOM.
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      // Handle \r\n as one break; ignore a lone \r followed by \n.
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  // Flush last field/row if the file doesn't end in a newline.
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export function headerLooksValid(header: string[]): boolean {
  return HEADER_MARKERS.every(
    ([i, sub]) => (header[i] ?? '').toLowerCase().includes(sub.toLowerCase()),
  );
}

export function normalizeLang(raw: string): Lang {
  const s = (raw || '').toLowerCase();
  if (!s.trim()) return 'ca';
  if (s.includes('ingl') || s.includes('angl') || s.includes('english')) return 'en';
  if (s.includes('cast') || s.includes('español') || s.includes('espanol') || s.includes('spanish'))
    return 'es';
  if (s.includes('catal') || s.includes('català') || s.includes('catala')) return 'ca';
  return 'ca';
}

/** Parse a DD/MM/YYYY (or DD-MM-YYYY) date. Returns null if unparseable. */
export function parseDmy(raw: string): Date | null {
  const m = (raw || '').trim().match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})/);
  if (!m) return null;
  let [, dd, mm, yy] = m;
  let year = Number(yy);
  if (year < 100) year += 2000;
  const month = Number(mm);
  const day = Number(dd);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  // Build at UTC noon to avoid timezone date-shift when later sliced to YYYY-MM-DD.
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

/** Parse a leading integer out of free-text guest counts ("~120", "120 aprox"). */
export function parseGuests(raw: string): number | null {
  const m = (raw || '').match(/\d+/);
  return m ? Number(m[0]) : null;
}

/** Extract a trailing parenthetical as the venue city: "Castell X (Reus)" → "Reus". */
function venueCityFrom(venue: string): string | null {
  const m = venue.match(/\(([^)]+)\)\s*$/);
  return m ? m[1].trim() : null;
}

export interface MappedWedding {
  // Booking core
  coupleName1: string;
  coupleName2: string;
  coupleEmailPrimary: string;
  couplePhonePrimary: string | null;
  preferredLanguage: Lang;
  weddingDate: Date;
  venueName: string;
  venueCity: string | null;
  internalNotes: string;
  importantNotes: string;
  // Form response (full contract data)
  c1Dni: string;
  c2Dni: string;
  c1Phone: string;
  c2Phone: string;
  homeAddress: string;
  postal: string;
  ceremonyTime: string | null;
  guests: number | null;
  guestsRaw: string;
  howFound: string | null;
  langBetween: string;
  ceremonyLoc: string;
  receptionLoc: string;
  ceremonyType: string;
  firstLook: string;
  pubConsent: string;
  dataProtection: string;
  timestampRaw: string;
  /** Dedup key: lowercased email + ISO date. */
  dedupKey: string;
  weddingDateIso: string;
}

function cell(row: string[], i: number): string {
  return (row[i] ?? '').trim();
}

/** Map one CSV data row to a normalized wedding, or null if no valid date. */
export function mapRow(row: string[]): MappedWedding | null {
  const date = parseDmy(cell(row, COL.date));
  if (!date) return null;
  const iso = date.toISOString().slice(0, 10);
  const email = cell(row, COL.email);
  const reception = cell(row, COL.receptionLoc);
  const ceremony = cell(row, COL.ceremonyLoc);
  const venueName = reception || ceremony || '—';
  const guestsRaw = cell(row, COL.guests);

  const notesLines = [
    'Importat del formulari de contracte (Google Forms).',
    cell(row, COL.timestamp) && `Resposta original: ${cell(row, COL.timestamp)}`,
    ceremony && `Lloc cerimònia: ${ceremony}`,
    reception && `Lloc banquet: ${reception}`,
    cell(row, COL.ceremonyType) && `Tipus de cerimònia: ${cell(row, COL.ceremonyType)}`,
    guestsRaw && `Convidats: ${guestsRaw}`,
    cell(row, COL.firstLook) && `First look: ${cell(row, COL.firstLook)}`,
    cell(row, COL.pubConsent) && `Consentiment publicació: ${cell(row, COL.pubConsent)}`,
    cell(row, COL.dataProtection) && `Protecció de dades: ${cell(row, COL.dataProtection)}`,
  ].filter(Boolean) as string[];

  return {
    coupleName1: cell(row, COL.p1Name),
    coupleName2: cell(row, COL.p2Name),
    coupleEmailPrimary: email,
    couplePhonePrimary: cell(row, COL.p1Phone) || null,
    preferredLanguage: normalizeLang(cell(row, COL.langBetween)),
    weddingDate: date,
    venueName,
    venueCity: venueCityFrom(venueName),
    internalNotes:
      'Importat del Google Forms. Dades econòmiques pendents (full de càlcul).',
    c1Dni: cell(row, COL.p1Dni),
    c2Dni: cell(row, COL.p2Dni),
    c1Phone: cell(row, COL.p1Phone),
    c2Phone: cell(row, COL.p2Phone),
    homeAddress: cell(row, COL.address),
    postal: cell(row, COL.postal),
    ceremonyTime: cell(row, COL.ceremonyTime) || null,
    guests: parseGuests(guestsRaw),
    guestsRaw,
    howFound: cell(row, COL.howFound) || null,
    langBetween: cell(row, COL.langBetween),
    ceremonyLoc: ceremony,
    receptionLoc: reception,
    ceremonyType: cell(row, COL.ceremonyType),
    firstLook: cell(row, COL.firstLook),
    pubConsent: cell(row, COL.pubConsent),
    dataProtection: cell(row, COL.dataProtection),
    timestampRaw: cell(row, COL.timestamp),
    dedupKey: `${email.toLowerCase()}|${iso}`,
    weddingDateIso: iso,
    importantNotes: notesLines.join('\n'),
  };
}

export interface ImportPreview {
  headerValid: boolean;
  totalRows: number;
  /** Weddings with date >= MIN_WEDDING_YEAR. */
  eligible: MappedWedding[];
  /** Count of rows skipped because the wedding year is before the cutoff. */
  skippedOld: number;
  /** Count of rows skipped because the date was missing/unparseable. */
  skippedNoDate: number;
}

export function buildPreview(csvText: string): ImportPreview {
  const rows = parseCsv(csvText);
  const header = rows[0] ?? [];
  const headerValid = headerLooksValid(header);
  const data = rows.slice(1).filter((r) => r.some((c) => c.trim() !== ''));
  const eligible: MappedWedding[] = [];
  let skippedOld = 0;
  let skippedNoDate = 0;
  for (const row of data) {
    const mapped = mapRow(row);
    if (!mapped) {
      skippedNoDate++;
      continue;
    }
    if (mapped.weddingDate.getUTCFullYear() < MIN_WEDDING_YEAR) {
      skippedOld++;
      continue;
    }
    eligible.push(mapped);
  }
  eligible.sort((a, b) => a.weddingDateIso.localeCompare(b.weddingDateIso));
  return { headerValid, totalRows: data.length, eligible, skippedOld, skippedNoDate };
}
