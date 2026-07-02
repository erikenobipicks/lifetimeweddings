// Meta Conversions API (server-side) — sends a `Lead` event straight to
// Meta from our server, in parallel with the browser Pixel. Meta dedupes the
// two using a shared `event_id` (the Pixel fires with `{eventID}` and we send
// the same value here as `event_id`), so a lead counts once even though it
// arrives twice.
//
// Why server-side too? Browser pixels get blocked (ad-blockers, ITP, no-JS),
// so client-only tracking under-reports conversions and starves Meta's ad
// optimisation. The CAPI copy is resilient to all of that.
//
// Config (env, set in Railway):
//   PUBLIC_META_PIXEL_ID  — the site-wide pixel id (public; also hardcoded as
//                           a fallback so the pixel works even if unset).
//   META_CAPI_TOKEN       — the Conversions API access token (SECRET). Never
//                           commit it. If unset, this helper is a no-op.
//   META_CAPI_TEST_CODE   — optional; set to a Test Events code while you
//                           verify in Events Manager → Test Events, then unset.
//
// PII (email, name) is SHA-256 hashed before it leaves our server, per Meta's
// requirements. IP + user-agent + the _fbp/_fbc cookies improve match quality.

import crypto from 'node:crypto';

const PIXEL_ID = process.env.PUBLIC_META_PIXEL_ID || '929985713206331';
const TOKEN = process.env.META_CAPI_TOKEN ?? '';
const TEST_CODE = process.env.META_CAPI_TEST_CODE || '';
const API_VERSION = 'v21.0';

/** Whether the CAPI is configured. When false, `sendMetaCapiLead` no-ops so
 *  local/dev and unconfigured deploys keep working. */
export const metaCapiEnabled = TOKEN.length > 0;

/** SHA-256 of a normalised (trimmed, lowercased) value, hex-encoded. Returns
 *  undefined for empty input so we can prune the field. */
function hash(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

export interface MetaLeadInput {
  /** Same id passed to the browser Pixel's `fbq('track','Lead',{},{eventID})`. */
  eventId: string;
  email?: string;
  /** Full name; split into first/last for better matching. */
  name?: string;
  eventSourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  /** Meta browser cookies, if the visitor has them (improve match rate). */
  fbp?: string;
  fbc?: string;
  /** Unix seconds. Defaults to now. */
  eventTime?: number;
}

/** Fire-and-forget a `Lead` to the Conversions API. Never throws — a tracking
 *  failure must never break the lead submission. */
export async function sendMetaCapiLead(input: MetaLeadInput): Promise<void> {
  if (!metaCapiEnabled || !input.eventId) return;

  try {
    let firstName: string | undefined;
    let lastName: string | undefined;
    if (input.name) {
      const parts = input.name.trim().split(/\s+/).filter(Boolean);
      firstName = parts.shift();
      lastName = parts.length ? parts.join(' ') : undefined;
    }

    const userData: Record<string, unknown> = {
      em: hash(input.email),
      fn: hash(firstName),
      ln: hash(lastName),
      client_ip_address: input.clientIp || undefined,
      client_user_agent: input.userAgent || undefined,
      fbp: input.fbp || undefined,
      fbc: input.fbc || undefined,
    };
    for (const key of Object.keys(userData)) {
      if (userData[key] === undefined) delete userData[key];
    }

    const body: Record<string, unknown> = {
      data: [
        {
          event_name: 'Lead',
          event_time: input.eventTime ?? Math.floor(Date.now() / 1000),
          event_id: input.eventId,
          action_source: 'website',
          event_source_url: input.eventSourceUrl || undefined,
          user_data: userData,
        },
      ],
    };
    if (TEST_CODE) body.test_event_code = TEST_CODE;

    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[meta-capi] non-OK response', res.status, detail);
    }
  } catch (err) {
    console.error('[meta-capi] send failed (non-fatal)', err);
  }
}
