// Known external-supplier catalog for the booking admin. Internal only.
//
// These drive the <datalist> suggestions on the booking ficha so the operator
// picks a consistent company/service name, but the fields stay free text — a
// one-off supplier can still be typed in.

/** Suppliers we regularly resell / coordinate. */
export const EXTERNAL_SERVICE_COMPANIES = ['Fotomarbis', 'Koldo Salazar'] as const;

/** Common service types offered by those suppliers. */
export const EXTERNAL_SERVICE_TYPES = ['Fotomatón', '360º'] as const;
