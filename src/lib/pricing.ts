// Pricing helpers shared between the interactive quote configurator
// (server-side render of /p/<token> and the live JS update) and the
// admin response review. Source of truth lives in `src/data/packs.ts`
// — this module just parses those formatted price strings and computes
// totals + combo savings.
//
// Money is internally in integer cents (EUR) to avoid float drift. We
// expose formatEuros() to render back to the "1.290 €" style used in
// the Canva tarifes.

import { PACKS, EXTRAS, type Pack } from '~/data/packs';
import { parsePriceCents, formatEuros } from '~/lib/payments/money';

// Money primitives now live in ~/lib/payments/money (single source of
// truth). Re-exported here so existing `~/lib/pricing` importers keep
// working unchanged.
export { parsePriceCents, formatEuros };

export function priceForPack(id: string): number {
  const p = PACKS.find((x) => x.id === id);
  return p ? parsePriceCents(p.price) : 0;
}

export function priceForExtra(id: string): number {
  const x = EXTRAS.find((e) => e.id === id);
  return x ? parsePriceCents(x.price) : 0;
}

/** A "combo bonus" detection: if the couple ticked two base packs that
 *  match a combo's composedOf list, surface the combo + savings so they
 *  can swap. Returns null when no combo applies. */
export interface ComboMatch {
  combo: Pack;
  savingsCents: number;
}
export function detectComboMatch(selectedPackIds: string[]): ComboMatch | null {
  const combos = PACKS.filter((p) => p.type === 'combo' && p.composedOf?.length);
  // Pick the largest-savings combo that's fully covered by the selection.
  let best: ComboMatch | null = null;
  for (const combo of combos) {
    const parts = combo.composedOf ?? [];
    const allPresent = parts.every((id) => selectedPackIds.includes(id));
    if (!allPresent) continue;
    const partsTotal = parts.reduce((acc, id) => acc + priceForPack(id), 0);
    const comboPrice = parsePriceCents(combo.price);
    const savings = partsTotal - comboPrice;
    if (savings > 0 && (!best || savings > best.savingsCents)) {
      best = { combo, savingsCents: savings };
    }
  }
  return best;
}

export interface SelectionTotals {
  /** Sum of all selected pack prices (combos use their bundled price). */
  packsCents: number;
  /** Sum of all selected extras. */
  extrasCents: number;
  /** Optional admin-applied discount (negative when applied). 0 = none. */
  discountCents: number;
  /** Final amount the couple would pay (packs + extras − discount). */
  totalCents: number;
}

/** Compute totals for a selection. `discountCents` is the absolute value
 *  of the discount (we subtract it). The caller passes 0 when no discount
 *  applies (e.g. on the public page before Eric grants one).
 *
 *  Pack IDs that aren't in PACKS are ignored. Same for extras. */
export function calculateSelectionTotals(
  packIds: string[],
  extraIds: string[],
  discountCents = 0,
): SelectionTotals {
  const packsCents = packIds.reduce((acc, id) => acc + priceForPack(id), 0);
  const extrasCents = extraIds.reduce((acc, id) => acc + priceForExtra(id), 0);
  const safeDiscount = Math.max(0, Math.min(discountCents, packsCents + extrasCents));
  return {
    packsCents,
    extrasCents,
    discountCents: safeDiscount,
    totalCents: packsCents + extrasCents - safeDiscount,
  };
}
