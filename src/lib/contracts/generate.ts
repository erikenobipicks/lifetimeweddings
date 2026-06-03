// Contract generation: pick the right template, infer the service type
// from the pack, and substitute the {variables} with the booking data.
// Produces the final contract HTML; rendering to PDF lives in ./pdf.ts.

import { PACKS, type PackType } from '~/data/packs';
import { getContractTemplate, type ContractServiceType } from '~/data/contractTemplates';
import type { Lang } from '~/i18n/ui';

export interface ContractData {
  lang: Lang;
  /** Used to infer photo/video/combo. */
  packName: string;
  packIncludes: string[];
  /** Primary signatory (the billing contraent). */
  firstname: string;
  lastname: string;
  dni: string;
  /** Full postal address as captured (single field). */
  address: string;
  /** Second contraent — appears in the header as a co-party so both
   *  partners figure on the legal document. Optional only because pre-
   *  Phase-2 bookings may not have a form_response yet; in practice the
   *  contract step is gated behind /reserva, so this is always set. */
  partner2Firstname?: string;
  partner2Lastname?: string;
  partner2Dni?: string;
  partner2Address?: string;
  /** "Boda de X i Y" — both partners' names. */
  shootDescription: string;
  shootDateLong: string;
  shootTime: string;
  shootPlace: string;
  shootPrice: string;
  /** Free-text payment plan (e.g. "Reserva: 800 € · 2n pagament: 1.153 € · …"). */
  paymentPlan: string | null;
  photographerName: string;
}

/** Infer the service type from the pack. Tries an exact catalog match
 *  first (reliable for catalog packs), then a keyword scan on the name +
 *  includes. Defaults to 'combo' (the most complete contract) when truly
 *  ambiguous — better to over-state coverage clauses than miss video ones. */
export function inferServiceType(packName: string, packIncludes: string[]): ContractServiceType {
  const name = (packName ?? '').toLowerCase();

  // 1) Catalog match: among packs whose name (any lang) appears in the
  //    booking's packName, pick the LONGEST match — so the combo
  //    "¡La que se avecina! + Outlander" wins over its sub-pack
  //    "¡La que se avecina!" (both are substrings, but the combo is more
  //    specific). Returns that pack's declared type.
  let best: { type: PackType; len: number } | null = null;
  for (const p of PACKS) {
    const names = [p.name.ca, p.name.es, p.name.en].map((n) => n.toLowerCase());
    for (const n of names) {
      if (n.length > 3 && name.includes(n) && (!best || n.length > best.len)) {
        best = { type: p.type as PackType, len: n.length };
      }
    }
  }
  if (best) return best.type;

  // 2) Keyword scan over name + includes.
  const hay = `${name} ${packIncludes.join(' ')}`.toLowerCase();
  const hasVideo = /v[íi]deo|videogr|outlander|this is us/.test(hay);
  const hasPhoto = /foto|fotogr|photo|àlbum|album|conoc|avecina/.test(hay);
  if (hasVideo && hasPhoto) return 'combo';
  if (hasVideo) return 'video';
  if (hasPhoto) return 'photo';
  return 'combo';
}

/** Build the {payment_plan} HTML block from the free-text plan. Splits on
 *  " · " into list items; falls back to a single line. Returns '' when no
 *  plan so the template just shows nothing there. */
function paymentPlanHtml(plan: string | null): string {
  const text = (plan ?? '').trim();
  if (!text) return '';
  const parts = text.split('·').map((s) => s.trim()).filter(Boolean);
  if (parts.length <= 1) return `<p>${escapeHtml(text)}</p>`;
  return `<ul>\n${parts.map((p) => `  <li>${escapeHtml(p)}</li>`).join('\n')}\n</ul>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));
}

/** Render the final contract HTML for the given data. */
export function buildContractHtml(data: ContractData): { html: string; type: ContractServiceType } {
  const type = inferServiceType(data.packName, data.packIncludes);
  const template = getContractTemplate(data.lang, type);

  // Note: address is captured as a single "full address" field, so we map
  // it to {street} and blank {zipcode}/{city}, then tidy the leftover
  // ", " in the rendered sentence.
  const vars: Record<string, string> = {
    firstname: data.firstname,
    lastname: data.lastname,
    vat: data.dni,
    street: data.address,
    zipcode: '',
    city: '',
    // Second contraent (co-party in the header) — empty string when absent
    // so a missing value renders cleanly without "{partner2_…}" leaking.
    partner2_firstname: data.partner2Firstname ?? '',
    partner2_lastname: data.partner2Lastname ?? '',
    partner2_vat: data.partner2Dni ?? '',
    partner2_street: data.partner2Address ?? '',
    shoot_description: data.shootDescription,
    shoot_date: data.shootDateLong,
    shoot_time: data.shootTime,
    shoot_place: data.shootPlace,
    shoot_price: data.shootPrice,
    photographer_name: data.photographerName,
  };

  let html = template;
  // {payment_plan} is a block-level token — replace before escaping vars.
  html = html.replace('{payment_plan}', paymentPlanHtml(data.paymentPlan));
  for (const [k, v] of Object.entries(vars)) {
    html = html.split(`{${k}}`).join(escapeHtml(v));
  }
  // Tidy leftover separators when zipcode/city are empty (the address is
  // captured as a single line, so {zipcode} {city} render as ""). Order
  // matters: collapse double-commas first, then trim before terminal
  // punctuation, then strip trailing commas before tag close.
  // Only trim trailing punctuation when the preceding chunk was actually a
  // template hole that left the address half-empty — never strip commas
  // that belong to the original prose (e.g. `D'una banda, "Lifetime …"`).
  html = html
    .replace(/,\s*,/g, ',')      // double comma from {street}, {zipcode} {city}
    .replace(/,\s*\./g, '.')     // comma stuck before a sentence end
    .replace(/ {2,}/g, ' ');     // collapse runs of spaces

  return { html, type };
}
