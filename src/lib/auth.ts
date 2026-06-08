import './env';
import bcrypt from 'bcryptjs';
import { db, initSchema } from './db';
import { sessionId } from './tokens';
import type { AstroCookies } from 'astro';

// Read env vars lazily so dotenv has had a chance to populate process.env.
const readEnv = () => ({
  user: process.env.ADMIN_USER ?? 'admin',
  hash: process.env.ADMIN_PASSWORD_HASH ?? '',
});
const COOKIE = 'lifetime_session';
const SESSION_TTL_DAYS = 30;

// ─── Login throttle config ───────────────────────────────────────────────
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

// Pre-computed bcrypt hash of a throwaway string. When the submitted username
// doesn't match the admin user we still run bcrypt.compare against this so the
// response time is the same whether or not the username exists — closing the
// timing side-channel that would otherwise leak valid usernames.
const DUMMY_HASH = bcrypt.hashSync('lifetime-not-a-real-password', 10);

export function isAuthConfigured(): boolean {
  return !!readEnv().hash;
}

export async function verifyCredentials(user: string, password: string): Promise<boolean> {
  const { user: adminUser, hash } = readEnv();
  const userMatches = !!hash && user === adminUser;
  // Always perform exactly one bcrypt comparison (constant-time auth): against
  // the real hash when the user matches, otherwise against the dummy hash.
  const compareTo = userMatches ? hash : DUMMY_HASH;
  let bcryptOk = false;
  try {
    bcryptOk = await bcrypt.compare(password, compareTo);
  } catch {
    bcryptOk = false;
  }
  return userMatches && bcryptOk;
}

// ─── Persistent per-IP login throttle (DB-backed) ────────────────────────
export async function checkLoginAttempts(
  ip: string,
): Promise<{ blocked: boolean; retryInMin?: number }> {
  await initSchema();
  const now = Date.now();
  const res = await db.execute({
    sql: 'SELECT count, reset_at FROM login_attempts WHERE ip = ?',
    args: [ip],
  });
  const row = res.rows[0];
  if (!row) return { blocked: false };
  const resetAt = new Date(row.reset_at as string).getTime();
  if (resetAt <= now) return { blocked: false };
  if ((row.count as number) >= LOGIN_MAX_ATTEMPTS) {
    return { blocked: true, retryInMin: Math.ceil((resetAt - now) / 60000) };
  }
  return { blocked: false };
}

export async function recordFailedLogin(ip: string): Promise<void> {
  await initSchema();
  const now = Date.now();
  const res = await db.execute({
    sql: 'SELECT reset_at FROM login_attempts WHERE ip = ?',
    args: [ip],
  });
  const row = res.rows[0];
  const expired = !row || new Date(row.reset_at as string).getTime() <= now;
  if (expired) {
    // Start (or restart) the window with count = 1.
    await db.execute({
      sql: `INSERT INTO login_attempts (ip, count, reset_at) VALUES (?, 1, ?)
            ON CONFLICT(ip) DO UPDATE SET count = 1, reset_at = excluded.reset_at`,
      args: [ip, new Date(now + LOGIN_WINDOW_MS).toISOString()],
    });
  } else {
    await db.execute({
      sql: 'UPDATE login_attempts SET count = count + 1 WHERE ip = ?',
      args: [ip],
    });
  }
}

export async function clearLoginAttempts(ip: string): Promise<void> {
  await initSchema();
  await db.execute({ sql: 'DELETE FROM login_attempts WHERE ip = ?', args: [ip] });
}

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
