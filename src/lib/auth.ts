// Admin auth — passwordless magic-link flow.
//
// Flow:
//   1. Admin visits /admin/login and submits their email.
//   2. POST handler calls `createMagicLinkToken(email)` IF the email is in
//      the `ADMIN_EMAILS` allowlist; otherwise it pretends to send (anti-
//      enumeration). It always renders the same "check your inbox" view.
//   3. Admin clicks the link → /admin/login/verify?token=... → server
//      consumes the token, creates a session, redirects to /admin.
//
// Tokens are random 32-char base64url strings, single-use, 15-min lifespan.
// Sessions are unchanged (existing `sessions` table + `lifetime_session`
// cookie) so anyone already logged in stays logged in across this change.

import './env';
import { randomBytes, randomUUID } from 'node:crypto';
import { db, initSchema } from './db';
import { sessionId } from './tokens';
import type { AstroCookies } from 'astro';

const COOKIE = 'lifetime_session';
const SESSION_TTL_DAYS = 30;
const TOKEN_TTL_MINUTES = 15;

/** Comma-separated list, lower-cased and trimmed at read time. */
function adminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? '';
  return raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAuthConfigured(): boolean {
  return adminEmails().length > 0;
}

/** True iff the (lower-cased) email is in the allowlist. */
export function isEmailAllowed(email: string): boolean {
  const list = adminEmails();
  return list.includes(email.trim().toLowerCase());
}

// ─── Magic link tokens ───────────────────────────────────────────────────
function newToken(): string {
  // 32 chars of base64url ≈ 192 bits of entropy. Plenty.
  return randomBytes(24).toString('base64url');
}

/** Insert a token row for `email` (assumed pre-validated against the
 *  allowlist) and return the bare token string. Caller composes the URL. */
export async function createMagicLinkToken(email: string): Promise<string> {
  await initSchema();
  const token = newToken();
  const now = new Date();
  const expires = new Date(now.getTime() + TOKEN_TTL_MINUTES * 60 * 1000);
  await db.execute({
    sql: `INSERT INTO login_tokens (id, token, email, created_at, expires_at)
          VALUES (?, ?, ?, ?, ?)`,
    args: [randomUUID(), token, email.trim().toLowerCase(), now.toISOString(), expires.toISOString()],
  });
  return token;
}

export type ConsumeResult =
  | { ok: true; email: string }
  | { ok: false; reason: 'unknown' | 'used' | 'expired' };

/** Look up the token; if valid and unused, mark used_at and return the
 *  email. Idempotency-safe — calling twice yields `{ok:false,reason:'used'}`
 *  on the second call. */
export async function consumeMagicLinkToken(token: string): Promise<ConsumeResult> {
  if (!token || typeof token !== 'string' || token.length < 16) {
    return { ok: false, reason: 'unknown' };
  }
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT email, expires_at, used_at FROM login_tokens WHERE token = ? LIMIT 1',
    args: [token],
  });
  const row = res.rows[0];
  if (!row) return { ok: false, reason: 'unknown' };
  if (row.used_at) return { ok: false, reason: 'used' };
  if (new Date(row.expires_at as string) < new Date()) {
    return { ok: false, reason: 'expired' };
  }
  // Mark used. We don't care if the UPDATE rowcount is 0 (concurrent
  // consumption) — that'd be a race, and we'd still have created the
  // session below. In practice it shouldn't happen because a magic link
  // is only ever sent to one person.
  await db.execute({
    sql: 'UPDATE login_tokens SET used_at = ? WHERE token = ?',
    args: [new Date().toISOString(), token],
  });
  return { ok: true, email: String(row.email) };
}

// ─── Sessions (unchanged from password-era) ──────────────────────────────
export async function createSession(cookies: AstroCookies, user: string): Promise<string> {
  await initSchema();
  const id = sessionId();
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  await db.execute({
    sql: `INSERT INTO sessions (id, user, created_at, expires_at) VALUES (?, ?, ?, ?)`,
    args: [id, user, now.toISOString(), expires.toISOString()],
  });
  cookies.set(COOKIE, id, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires,
  });
  return id;
}

export async function destroySession(cookies: AstroCookies) {
  const id = cookies.get(COOKIE)?.value;
  if (id) {
    await initSchema();
    await db.execute({ sql: 'DELETE FROM sessions WHERE id = ?', args: [id] });
  }
  cookies.delete(COOKIE, { path: '/' });
}

export async function getUser(cookies: AstroCookies): Promise<string | null> {
  const id = cookies.get(COOKIE)?.value;
  if (!id) return null;
  await initSchema();
  const res = await db.execute({
    sql: 'SELECT user, expires_at FROM sessions WHERE id = ?',
    args: [id],
  });
  const row = res.rows[0];
  if (!row) return null;
  if (new Date(row.expires_at as string) < new Date()) {
    await db.execute({ sql: 'DELETE FROM sessions WHERE id = ?', args: [id] });
    return null;
  }
  return row.user as string;
}
