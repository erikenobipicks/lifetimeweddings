// POST /api/quotes/<token>/respond
//
// Endpoint behind the "Enviar la meva configuració" button on the
// interactive quote configurator (/p/<token>). The couple picks the
// packs + extras they want and optionally drops a message; we persist
// the snapshot in `quote_responses` and ping Eric (email + Telegram)
// so he can review in /admin/<id>.
//
// We deliberately keep a history (no UPDATE on previous rows) so Eric
// can see how the couple's thinking evolved — the admin panel shows the
// latest row prominently and the rest as a small history dropdown.

export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import {
  getQuoteByToken,
  createQuoteResponse,
} from '~/lib/quotes';
import { PACKS, EXTRAS } from '~/data/packs';
import { calculateSelectionTotals, formatEuros, sumCustomLines } from '~/lib/pricing';
import { sendNotification, sendTelegramNotification } from '~/lib/email';
import { createRateLimiter, clientIpFrom } from '~/lib/rate-limit';

// This endpoint persists a row AND fans out email + Telegram notifications,
// so it's an amplification target. 10 submissions / hour / IP is well above
// a couple iterating on their configuration but kills notification flooding.
const rateLimit = createRateLimiter({ limit: 10, windowMs: 60 * 60 * 1000 });

const schema = z.object({
  // Packs are single-select on the UI (mutually exclusive base + combo).
  // We cap at 1 server-side too so a hand-rolled payload can't bypass it.
  packIds: z.array(z.string().min(1).max(60)).max(1).default([]),
  extraIds: z.array(z.string().min(1).max(60)).max(20).default([]),
  // Multi-option proposals: the couple accepts a whole option by index. When
  // present, the server resolves the packs/extras/lines from that option so the
  // total can't be poisoned by a hand-rolled payload.
  optionIndex: z.number().int().min(0).max(50).optional(),
  message: z
    .string()
    .max(2000)
    .optional()
    .transform((v) => (v && v.trim() ? v.trim() : undefined)),
});

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function clientIp(headers: Headers): string {
  const cf = headers.get('cf-connecting-ip');
  if (cf) return cf;
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}

function esc(s: string | undefined | null): string {
  return (s ?? '').replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );
}

const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export const POST: APIRoute = async ({ request, params }) => {
  if (!rateLimit(clientIpFrom(request.headers))) {
    return json({ error: 'rate_limited' }, 429);
  }

  const token = String(params.token ?? '');
  if (!token) return json({ error: 'no_token' }, 400);

  let body: unknown;
  try { body = await request.json(); }
  catch { return json({ error: 'invalid_json' }, 400); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: 'validation' }, 400);
  const { packIds, extraIds, optionIndex, message } = parsed.data;

  if (optionIndex == null && packIds.length === 0 && extraIds.length === 0) {
    return json({ error: 'empty_selection' }, 400);
  }

  const quote = await getQuoteByToken(token);
  if (!quote || quote.archived) return json({ error: 'not_found' }, 404);
  if (quote.closedAt) return json({ error: 'closed' }, 409);

  // Multi-option accept: resolve the whole option server-side from its index so
  // packs/extras/lines (and thus the total) come from our data, not the client.
  const chosenOption = optionIndex != null ? quote.options[optionIndex] ?? null : null;
  const srcPackIds = chosenOption ? chosenOption.packIds : packIds;
  const srcExtraIds = chosenOption ? chosenOption.extraIds : extraIds;

  // Sanity-filter the ids against the catalog so a malicious payload can't
  // poison our totals or DB. Unknown ids are silently dropped.
  const validPackIds = srcPackIds.filter((id) => PACKS.some((p) => p.id === id));
  const validExtraIds = srcExtraIds.filter((id) => EXTRAS.some((e) => e.id === id));

  if (validPackIds.length === 0 && validExtraIds.length === 0) {
    return json({ error: 'empty_selection' }, 400);
  }

  // Custom lines are always included on top of the selection. For a multi-option
  // accept they come from the chosen option; otherwise the quote's base lines.
  const customLinesCents = sumCustomLines(chosenOption ? chosenOption.customLines : quote.customLines);
  const totals = calculateSelectionTotals(
    validPackIds,
    validExtraIds,
    quote.adminDiscountCents,
    customLinesCents,
  );

  // Record which option the couple picked so it shows in the admin response.
  const storedMessage = chosenOption
    ? [`Opció triada: ${chosenOption.label}`, message].filter(Boolean).join(' · ')
    : message;

  const response = await createQuoteResponse({
    quoteId: quote.id,
    packIds: validPackIds,
    extraIds: validExtraIds,
    message: storedMessage,
    totalCents: totals.totalCents,
    ipAddress: clientIp(request.headers),
    userAgent: request.headers.get('user-agent') ?? undefined,
  });

  // Build human-readable summary for Eric's email/Telegram.
  const packLines = validPackIds.map((id) => {
    const p = PACKS.find((x) => x.id === id);
    return p ? `<li>${esc(p.name.ca)} — <strong>${esc(p.price)}</strong></li>` : '';
  }).join('');
  const extraLines = validExtraIds.map((id) => {
    const x = EXTRAS.find((e) => e.id === id);
    return x ? `<li>${esc(x.name.ca)} — <strong>${esc(x.price)}</strong></li>` : '';
  }).join('');
  const adminUrl = `${SITE_URL}/admin/${quote.id}`;

  // Fail-soft: response is already persisted, so notifications are best-effort.
  try {
    await sendNotification({
      subject: `🧮 ${quote.coupleName} t'han enviat la seva configuració`,
      html: `
        <p><strong>${esc(quote.coupleName)}</strong> han configurat el pressupost a la seva manera:</p>
        ${validPackIds.length ? `<h3>Packs</h3><ul>${packLines}</ul>` : ''}
        ${validExtraIds.length ? `<h3>Extres</h3><ul>${extraLines}</ul>` : ''}
        <p style="font-size:1.1em"><strong>Total: ${esc(formatEuros(totals.totalCents))}</strong></p>
        ${message ? `<h3>Missatge</h3><p style="white-space:pre-wrap;background:#f6f3ed;padding:12px;border-left:3px solid #c9a96e">${esc(message)}</p>` : ''}
        <p><a href="${adminUrl}">Revisa-ho a l'admin →</a></p>
      `,
    });
  } catch (err) {
    console.error('[quote.respond] email notification failed (non-fatal)', err);
  }
  try {
    const lines = [
      `🧮 <b>${esc(quote.coupleName)}</b> han configurat el pressupost`,
      `💰 <b>${esc(formatEuros(totals.totalCents))}</b>`,
      `📦 ${validPackIds.length} pack(s) · ${validExtraIds.length} extra(s)`,
    ];
    if (message) lines.push(`💬 "${esc(message).slice(0, 200)}"`);
    await sendTelegramNotification(lines.join('\n'));
  } catch (err) {
    console.error('[quote.respond] telegram notification failed (non-fatal)', err);
  }

  return json({ ok: true, responseId: response.id, totalCents: totals.totalCents }, 200);
};
