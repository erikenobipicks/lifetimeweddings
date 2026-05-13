import './env';
import bcrypt from 'bcryptjs';
import { db } from './db';
import { sessionId } from './tokens';
import type { AstroCookies } from 'astro';

// Read env vars lazily so dotenv has had a chance to populate process.env.
const readEnv = () => ({
  user: process.env.ADMIN_USER ?? 'admin',
  hash: process.env.ADMIN_PASSWORD_HASH ?? '',
});
const COOKIE = 'lifetime_session';
const SESSION_TTL_DAYS = 30;

export function isAuthConfigured(): boolean {
  return !!readEnv().hash;
}

export async function verifyCredentials(user: string, password: string): Promise<boolean> {
  const { user: adminUser, hash } = readEnv();
  if (!hash || user !== adminUser) return false;
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

export async function createSession(cookies: AstroCookies, user: string): Promise<string> {
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
    await db.execute({ sql: 'DELETE FROM sessions WHERE id = ?', args: [id] });
  }
  cookies.delete(COOKIE, { path: '/' });
}

export async function getUser(cookies: AstroCookies): Promise<string | null> {
  const id = cookies.get(COOKIE)?.value;
  if (!id) return null;
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
