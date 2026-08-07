// Shared e-signature attestation line + "signed by" label for the contract
// PDF. Extracted so the accept endpoint (which stamps the signature) and the
// on-demand PDF download regenerate an identical acceptance footer.

import { formatWeddingDateLong } from '~/lib/bookings/format';
import type { Lang } from '~/i18n/ui';

export const SIGNED_BY_LABEL = { ca: 'Signat per', es: 'Firmado por', en: 'Signed by' } as const;

/** The timestamped, IP/device-stamped acceptance line printed under the drawn
 *  signature. Identical text at sign time and at download time. */
export function acceptanceLine(
  lang: Lang,
  signerName: string,
  n1: string,
  n2: string,
  when: Date,
  ip: string,
  uaHash: string,
): string {
  const date = formatWeddingDateLong(when, lang);
  const localeMap = { ca: 'ca-ES', es: 'es-ES', en: 'en-GB' } as const;
  const time = when.toLocaleTimeString(localeMap[lang] ?? 'ca-ES', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  });
  if (lang === 'es') return `Firmado electrónicamente por ${signerName} (${n1} y ${n2}) el ${date} a las ${time}. IP ${ip} · dispositivo ${uaHash}.`;
  if (lang === 'en') return `Signed electronically by ${signerName} (${n1} and ${n2}) on ${date} at ${time}. IP ${ip} · device ${uaHash}.`;
  return `Signat electrònicament per ${signerName} (${n1} i ${n2}) el ${date} a les ${time}. IP ${ip} · dispositiu ${uaHash}.`;
}
