// Date and money formatting helpers for the booking page. Uses native
// Intl.DateTimeFormat / Number.prototype.toLocaleString — no extra deps.
// Always renders in Europe/Madrid timezone so a wedding date set as
// 2026-07-12 doesn't drift by one day depending on the server's TZ.

import { waLink } from '~/data/site';
import type { Lang } from './types';

const localeFor: Record<Lang, string> = {
  ca: 'ca-ES',
  es: 'es-ES',
  en: 'en-GB',
};

/** "12 de juliol de 2026" / "12 de julio de 2026" / "12 July 2026". */
export function formatWeddingDateLong(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(localeFor[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Madrid',
  }).format(date);
}

/** "12/07/2026" — short numeric format used for expiry mention. */
export function formatExpiresShort(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(localeFor[lang], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/Madrid',
  }).format(date);
}

/** Format a price stored in cents as "1.500 €" (CA/ES) or "€1,500" (EN).
 *  Whole euros only; no decimals — proposals in this market are quoted that
 *  way, and decimals make the number look smaller and cheaper, not more
 *  precise. */
export function formatPrice(cents: number, lang: Lang): string {
  const euros = Math.round(cents / 100);
  return new Intl.NumberFormat(localeFor[lang], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(euros);
}

/** Build the WhatsApp deep-link with a pre-filled message. The phone number
 *  is the studio's. The message is short — enough context for Ferran to
 *  pick up the thread. */
export function whatsappLinkFor(slug: string, lang: Lang): string {
  const text =
    lang === 'es'
      ? `Hola Lifetime, sobre la propuesta ${slug}…`
      : lang === 'en'
        ? `Hi Lifetime, regarding proposal ${slug}…`
        : `Hola Lifetime, sobre la proposta ${slug}…`;
  return waLink(text);
}

/** Variant of whatsappLinkFor pre-filled with a videocall request. Used by
 *  the "let's meet before deciding" CTA block. Keeps the slug so Ferran
 *  can match the request back to the proposal in admin. */
export function whatsappVideocallLinkFor(slug: string, lang: Lang): string {
  const text =
    lang === 'es'
      ? `Hola Lifetime, venimos de la propuesta ${slug} y querríamos hacer una videollamada de 15 minutos antes de decidir.`
      : lang === 'en'
        ? `Hi Lifetime, we're looking at proposal ${slug} and would like a 15-minute video call before deciding.`
        : `Hola Lifetime, venim de la proposta ${slug} i ens agradaria fer una videocall de 15 minuts abans de decidir.`;
  return waLink(text);
}

/** Render a "Hola {n1} y {n2}," style template. Replaces {key} with values. */
export function tpl(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_m, key) => vars[key] ?? '');
}
