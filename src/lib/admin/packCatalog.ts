// Shared catalog helpers for the admin booking tools.
//
// Both the "new booking" form and the booking detail/edit page need a
// trilingual, price-parsed snapshot of the pack & extras catalogue so the
// client-side picker can fill the form fields from a real pack tariff. This
// logic used to live inline in new.astro; it's extracted here so the create
// form, the edit page, and the shared <PackPaymentTools> component all share
// one source of truth.

import { PACKS, EXTRAS, getComposedSubpacks } from '~/data/packs';
import type { Lang } from '~/i18n/ui';

/**
 * Parse a formatted EUR string like "1.290 €" or "545 €" to a number.
 * PACKS/EXTRAS store prices as display strings — the booking form needs
 * euros to seed the numeric inputs.
 */
export function eurosFromPriceString(s: string): number {
  const cleaned = s
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}\b)/g, '')
    .replace(',', '.');
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

// For combos: build a "fully expanded" includes list per language by
// stitching each sub-pack's includes with its name as a header line, then
// appending the combo's own bullets under "I junts:" / "Y juntos:" / "And
// together:". Mirrors the breakdown the renderer produces on /p/<token> so
// the FotoStudio quote text matches what couples see.
const COMBO_TOGETHER_HEADER: Record<Lang, string> = {
  ca: 'I junts:',
  es: 'Y juntos:',
  en: 'And together:',
};

export function expandedIncludes(pack: (typeof PACKS)[number]): Record<Lang, string[]> {
  const subs = getComposedSubpacks(pack);
  if (subs.length === 0) {
    return pack.includes;
  }
  const out = { ca: [] as string[], es: [] as string[], en: [] as string[] };
  (['ca', 'es', 'en'] as const).forEach((lang) => {
    subs.forEach((sp, i) => {
      if (i > 0) out[lang].push('');
      out[lang].push(`— ${sp.name[lang]} —`);
      out[lang].push(...sp.includes[lang]);
    });
    if (pack.includes[lang].length > 0) {
      out[lang].push('');
      out[lang].push(COMBO_TOGETHER_HEADER[lang]);
      out[lang].push(...pack.includes[lang]);
    }
  });
  return out;
}

export interface PackCatalogItem {
  id: string;
  name: Record<Lang, string>;
  includes: Record<Lang, string[]>;
  priceEuros: number;
}

export interface ExtraCatalogItem {
  id: string;
  name: Record<Lang, string>;
  priceEuros: number;
}

/** Trilingual snapshot of every pack with its parsed numeric price. */
export function buildPackCatalog(): PackCatalogItem[] {
  return PACKS.map((p) => ({
    id: p.id,
    name: p.name,
    includes: expandedIncludes(p),
    priceEuros: eurosFromPriceString(p.price),
  }));
}

/** Trilingual snapshot of every extra with its parsed numeric price. */
export function buildExtrasCatalog(): ExtraCatalogItem[] {
  return EXTRAS.map((x) => ({
    id: x.id,
    name: x.name,
    priceEuros: eurosFromPriceString(x.price),
  }));
}
