import { randomBytes, createHash } from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';

/** Generate a URL-safe token (no confusable characters). */
export function generateToken(length = 10): string {
  const bytes = randomBytes(length);
  let out = '';
  for (let i = 0; i < length; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

/** Hash an IP for privacy-friendly uniqueness (no raw IP stored). */
export function hashIp(ip: string | undefined, salt: string): string {
  if (!ip) return 'unknown';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 16);
}

export function sessionId(): string {
  return randomBytes(24).toString('base64url');
}
