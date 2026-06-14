// Generic reader for follow-up form submissions (form_submissions table).
// Each concrete form (wedding_details, inspiration, …) stores a flat
// Record<string,string> in data_json; this returns the most recent one for
// a booking + form_kind so the admin views can render it.

import { db, initSchema } from '../db';

export interface FormSubmissionData {
  data: Record<string, string>;
  submittedAt: Date;
}

/** Latest submission for a booking + form_kind, or null. A manual re-send
 *  creates a new schedule → a newer submission can exist; we show the most
 *  recent. Only string values are kept (the form posts strings). */
export async function getLatestFormSubmission(
  bookingId: string,
  formKind: string,
): Promise<FormSubmissionData | null> {
  await initSchema();
  const res = await db.execute({
    sql: `SELECT data_json, submitted_at FROM form_submissions
          WHERE booking_id = ? AND form_kind = ?
          ORDER BY submitted_at DESC LIMIT 1`,
    args: [bookingId, formKind],
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
