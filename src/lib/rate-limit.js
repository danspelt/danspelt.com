// Shared in-memory rate limiter for API routes.
//
// This is intentionally simple: it protects a single Next.js server instance
// against casual abuse and accidental duplicate submissions. It is not a
// distributed limiter. If the site is scaled to multiple instances, back this
// with Redis/Upstash and keep the same function signature.
//
// Privacy: only a coarse client key (IP or a caller-supplied session id) and a
// counter are stored, and entries are discarded once their window expires.

const buckets = new Map();

const MAX_TRACKED_KEYS = 10_000;

function readEnvInt(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const DEFAULT_WINDOW_MS = readEnvInt('RATE_LIMIT_WINDOW_MS', 60 * 60 * 1000);
export const DEFAULT_MAX_REQUESTS = readEnvInt('RATE_LIMIT_MAX_REQUESTS', 10);

/**
 * Derive a coarse client key from a request. Never logged or persisted.
 */
export function getClientKey(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

function pruneIfNeeded(now) {
  if (buckets.size <= MAX_TRACKED_KEYS) return;
  for (const [key, record] of buckets) {
    if (now - record.start > record.windowMs) buckets.delete(key);
  }
}

/**
 * Consume one unit from a bucket.
 *
 * @param {string} key Namespaced bucket key, e.g. `challenge:1.2.3.4`.
 * @param {{ max?: number, windowMs?: number }} [options]
 * @returns {{ limited: boolean, remaining: number, retryAfterSeconds: number }}
 */
export function consumeRateLimit(key, options = {}) {
  const max = options.max ?? DEFAULT_MAX_REQUESTS;
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const now = Date.now();

  pruneIfNeeded(now);

  const record = buckets.get(key);
  if (!record || now - record.start > record.windowMs) {
    buckets.set(key, { start: now, count: 1, windowMs });
    return { limited: false, remaining: max - 1, retryAfterSeconds: 0 };
  }

  record.count += 1;
  const limited = record.count > max;
  const elapsed = now - record.start;

  return {
    limited,
    remaining: Math.max(0, max - record.count),
    retryAfterSeconds: limited ? Math.ceil((record.windowMs - elapsed) / 1000) : 0,
  };
}

/**
 * Test helper: clear all buckets.
 */
export function resetRateLimits() {
  buckets.clear();
}
