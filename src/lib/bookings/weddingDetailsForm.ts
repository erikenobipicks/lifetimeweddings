// Single source of truth for the "wedding_details" follow-up form
// (PRE-06, sent ~30 days before the wedding). Both the public form at
// /formulari/<token> and the admin view on the booking detail page read
// from here so field keys + option codes never drift apart.
//
// Storage: each submission is a flat Record<string,string> in
// form_submissions.data_json. Select fields store canonical *codes*
// (e.g. 'religiosa'), localised to a label at render time — keeps stored
// data language-agnostic across ca/es/en couples.

import { db, initSchema } from '../db';

/** Canonical option codes → Catalan labels (admin view). The public form
 *  carries its own localised labels but posts these same codes. */
export const WD_OPTION_LABELS: Record<string, Record<string, string>> = {
  parents: { junts: 'Junts', separats: 'Separats', ho_comento: 'Ho comentem a part' },
  ceremony_type: { religiosa: 'Religiosa', civil: 'Civil', simbolica: 'Simbòlica / altra' },
  officiant_relation: {
    amics_familia: 'Amic o família',
    contractat: 'Professional contractat',
    altres: 'Altres',
  },
  live_music: { si: 'Sí', no: 'No', no_ho_sabem: 'Encara no ho sabem' },
  insta_consent: { si: 'Sí', no: 'No' },
};

export type WDFieldKind = 'text' | 'textarea' | 'select' | 'url';

export interface WDFieldDef {
  key: string;
  label: string;
  kind?: WDFieldKind;
  /** Key into WD_OPTION_LABELS when kind === 'select'. */
  optionSet?: keyof typeof WD_OPTION_LABELS;
  /** Render the value as a clickable link (maps, instagram). */
  asLink?: boolean;
}

export interface WDGroupDef {
  title: string;
  fields: WDFieldDef[];
}

/** Admin-side field catalogue (Catalan). Partner sections take the real
 *  couple names so the view reads naturally. */
export function weddingDetailsAdminGroups(coupleName1: string, coupleName2: string): WDGroupDef[] {
  const prep = (n: number, name: string): WDGroupDef => ({
    title: `Preparatius · ${name}`,
    fields: [
      { key: `prep${n}_address`, label: 'Adreça dels preparatius' },
      { key: `prep${n}_maps`, label: 'Ubicació (Google Maps)', kind: 'url', asLink: true },
      { key: `prep${n}_parents`, label: 'Pares', kind: 'select', optionSet: 'parents' },
      { key: `prep${n}_father`, label: 'Pare' },
      { key: `prep${n}_mother`, label: 'Mare' },
      { key: `prep${n}_siblings`, label: 'Germans/es' },
    ],
  });
  return [
    prep(1, coupleName1),
    prep(2, coupleName2),
    {
      title: 'Cerimònia',
      fields: [
        { key: 'ceremony_place', label: 'Lloc de la cerimònia' },
        { key: 'ceremony_time', label: 'Hora de la cerimònia' },
        { key: 'ceremony_type', label: 'Tipus', kind: 'select', optionSet: 'ceremony_type' },
        { key: 'ceremony_officiant_name', label: 'Oficiant (mossèn / jutge / mestre de cerimònies)' },
        {
          key: 'ceremony_officiant_relation',
          label: 'Relació de l\'oficiant',
          kind: 'select',
          optionSet: 'officiant_relation',
        },
      ],
    },
    {
      title: 'Música i proveïdors',
      fields: [
        { key: 'live_music', label: 'Música en directe', kind: 'select', optionSet: 'live_music' },
        { key: 'live_music_details', label: 'Detalls de la música en directe', kind: 'textarea' },
        { key: 'other_providers', label: 'Altres proveïdors', kind: 'textarea' },
        { key: 'day_contact_name', label: 'Contacte el dia (nom)' },
        { key: 'day_contact_phone', label: 'Contacte el dia (telèfon)' },
      ],
    },
    {
      title: 'Persones i moments',
      fields: [
        { key: 'key_people', label: 'Persones clau', kind: 'textarea' },
        { key: 'surprises', label: 'Sorpreses', kind: 'textarea' },
        { key: 'special_moments', label: 'Moments especials', kind: 'textarea' },
        { key: 'sensitive_info', label: 'Coses delicades', kind: 'textarea' },
      ],
    },
    {
      title: 'Instagram',
      fields: [
        { key: 'insta_consent', label: 'Permís per publicar', kind: 'select', optionSet: 'insta_consent' },
        { key: 'insta_couple', label: 'Instagram de la parella' },
        { key: 'insta_providers', label: 'Instagrams dels proveïdors', kind: 'textarea' },
        { key: 'anything_else', label: 'Qualsevol altra cosa', kind: 'textarea' },
      ],
    },
  ];
}

/** Human label for a stored select code (falls back to the raw value). */
export function wdOptionLabel(optionSet: keyof typeof WD_OPTION_LABELS, code: string): string {
  return WD_OPTION_LABELS[optionSet]?.[code] ?? code;
}

export interface WeddingDetailsSubmission {
  data: Record<string, string>;
  submittedAt: Date;
}

/** Latest wedding_details submission for a booking, or null. Used by the
 *  admin booking-detail view to surface the couple's answers (the public
 *  endpoint only allows one per token, but a manual re-send creates a new
 *  schedule → a newer submission can exist; we show the most recent). */
export async function getLatestWeddingDetailsSubmission(
  bookingId: string,
): Promise<WeddingDetailsSubmission | null> {
  await initSchema();
  const res = await db.execute({
    sql: `SELECT data_json, submitted_at FROM form_submissions
          WHERE booking_id = ? AND form_kind = 'wedding_details'
          ORDER BY submitted_at DESC LIMIT 1`,
    args: [bookingId],
  });
  const row = res.rows[0];
  if (!row) return null;
  const data: Record<string, string> = {};
  try {
    const parsed = JSON.parse(String(row.data_json));
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'string' && v.trim()) data[k] = v;
      }
    }
  } catch {
    /* malformed JSON → treat as empty */
  }
  return { data, submittedAt: new Date(String(row.submitted_at)) };
}
