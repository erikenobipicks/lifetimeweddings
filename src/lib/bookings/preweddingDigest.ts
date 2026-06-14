// Pre-wedding Telegram digest: an internal heads-up sent to the studio's
// Telegram ~2 days before each wedding (or manually from the booking page).
//
// Two separate messages so the second is clean to copy-paste:
//   1. The day's key details (times, prep addresses + maps, contacts,
//      people, surprises…) plus a link to the full admin booking page.
//   2. All the supplier instagrams in one block, wrapped in <pre> so a tap
//      on Telegram copies the whole "Flors: @x / DJ: @y" list at once.
//
// Pulls from the booking + the couple's wedding_details questionnaire
// answers (if they submitted it). Fail-soft: a missing booking or
// unconfigured Telegram never throws to the caller.

import { SITE } from '~/data/site';
import { sendTelegramNotification } from '~/lib/email';
import { getBookingById } from './repository';
import { getLatestWeddingDetailsSubmission, wdOptionLabel } from './weddingDetailsForm';
import { getLatestInspirationSubmission } from './inspirationForm';

const SITE_URL = process.env.PUBLIC_SITE_URL ?? SITE.url;

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Whole-day difference (UTC) between a wedding date and now. */
function daysUntil(weddingDate: Date): number {
  const today = new Date();
  const a = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const b = Date.UTC(weddingDate.getUTCFullYear(), weddingDate.getUTCMonth(), weddingDate.getUTCDate());
  return Math.round((b - a) / 86_400_000);
}

function whenLabel(days: number): string {
  if (days <= 0) return 'Avui';
  if (days === 1) return 'Demà';
  return `D'aquí ${days} dies`;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString('ca-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export interface PreweddingDigestResult {
  ok: boolean;
  reason?: 'not_found';
  /** How many Telegram messages were dispatched (0–2). */
  messages: number;
  /** True when an instagram block was included (message 2 sent). */
  hadInstagrams: boolean;
}

/** Build + send the pre-wedding digest for a booking. Returns a small
 *  result so callers (cron / manual button) can report what happened.
 *  Does NOT stamp the once-only flag — the caller decides that. */
export async function sendPreweddingDigest(bookingId: string): Promise<PreweddingDigestResult> {
  const booking = await getBookingById(bookingId);
  if (!booking) return { ok: false, reason: 'not_found', messages: 0, hadInstagrams: false };

  const submission = await getLatestWeddingDetailsSubmission(bookingId);
  const d = submission?.data ?? {};
  const inspiration = await getLatestInspirationSubmission(bookingId);
  const insp = inspiration?.data ?? {};
  const n1 = booking.coupleName1;
  const n2 = booking.coupleName2;
  const adminUrl = `${SITE_URL}/admin/bookings/${booking.id}`;
  const days = daysUntil(booking.weddingDate);

  // ── Message 1: the details + link ──────────────────────────────────────
  const lines: string[] = [
    `📋 <b>${esc(whenLabel(days))}: boda de ${esc(n1)} i ${esc(n2)}</b>`,
    `🗓 ${esc(fmtDate(booking.weddingDate))}`,
    `📍 ${esc(d.ceremony_place || booking.venueName)}`,
  ];

  if (d.ceremony_time) {
    const type = d.ceremony_type ? ` (${wdOptionLabel('ceremony_type', d.ceremony_type)})` : '';
    lines.push(`⏰ Cerimònia: ${esc(d.ceremony_time)}${esc(type)}`);
  }
  if (d.ceremony_officiant_name) {
    const rel = d.ceremony_officiant_relation
      ? ` — ${wdOptionLabel('officiant_relation', d.ceremony_officiant_relation)}`
      : '';
    lines.push(`🙋 Oficia: ${esc(d.ceremony_officiant_name)}${esc(rel)}`);
  }

  const prepLine = (name: string, addr?: string, maps?: string) => {
    if (!addr && !maps) return;
    let s = `🏠 Preparatius ${esc(name)}`;
    if (addr) s += `: ${esc(addr)}`;
    if (maps) s += ` · <a href="${esc(maps)}">mapa</a>`;
    lines.push(s);
  };
  prepLine(n1, d.prep1_address, d.prep1_maps);
  prepLine(n2, d.prep2_address, d.prep2_maps);

  if (d.live_music) {
    const det = d.live_music_details ? ` — ${d.live_music_details}` : '';
    lines.push(`🎵 Música en directe: ${esc(wdOptionLabel('live_music', d.live_music))}${esc(det)}`);
  }
  if (d.day_contact_name || d.day_contact_phone) {
    lines.push(`📞 Contacte el dia: ${esc([d.day_contact_name, d.day_contact_phone].filter(Boolean).join(' · '))}`);
  }
  if (d.other_providers) lines.push(`🤝 Proveïdors: ${esc(d.other_providers)}`);
  if (d.key_people) lines.push(`👥 Persones clau: ${esc(d.key_people)}`);
  if (d.surprises) lines.push(`🎁 Sorpreses: ${esc(d.surprises)}`);
  if (d.special_moments) lines.push(`⭐ Moments: ${esc(d.special_moments)}`);
  if (d.sensitive_info) lines.push(`⚠️ Delicat: ${esc(d.sensitive_info)}`);
  if (d.anything_else) lines.push(`📝 Altres: ${esc(d.anything_else)}`);

  // Music & inspiration (from the separate inspiration form).
  const inspLines: string[] = [];
  if (insp.couple_playlist) inspLines.push(`🎧 Playlist: ${esc(insp.couple_playlist)}`);
  if (insp.special_song) inspLines.push(`🎵 Cançó especial: ${esc(insp.special_song)}`);
  if (insp.pinterest) inspLines.push(`📌 Pinterest: ${esc(insp.pinterest)}`);
  if (insp.inspiration_video) inspLines.push(`🎬 Vídeo: ${esc(insp.inspiration_video)}`);
  if (insp.inspiration_notes) inspLines.push(`📝 Notes inspiració: ${esc(insp.inspiration_notes)}`);
  if (inspLines.length > 0) {
    lines.push('');
    lines.push('<b>Música i inspiració</b>');
    lines.push(...inspLines);
  }

  if (!submission) {
    lines.push('');
    lines.push('<i>(La parella encara no ha omplert el formulari pre-boda.)</i>');
  }
  lines.push('');
  lines.push(`→ <a href="${esc(adminUrl)}">Detalls complets a l'admin</a>`);

  await sendTelegramNotification(lines.join('\n'));
  let messages = 1;

  // ── Message 2: the instagram block (copy-paste) ────────────────────────
  const igLines: string[] = [];
  if (d.insta_couple) igLines.push(`Parella: ${d.insta_couple}`);
  if (d.insta_providers) {
    for (const raw of d.insta_providers.split(/\r?\n/)) {
      const line = raw.trim();
      if (line) igLines.push(line);
    }
  }
  let hadInstagrams = false;
  if (igLines.length > 0) {
    const block = esc(igLines.join('\n'));
    await sendTelegramNotification(
      `📸 <b>Instagrams per etiquetar — ${esc(n1)} i ${esc(n2)}</b>\n<pre>${block}</pre>`,
    );
    messages += 1;
    hadInstagrams = true;
  }

  return { ok: true, messages, hadInstagrams };
}
