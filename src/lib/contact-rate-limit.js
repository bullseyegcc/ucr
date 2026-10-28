// In-memory only. Use a shared store such as Redis if the app runs on more than one instance.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map();

export function isContactRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);
  return false;
}
