const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(token, remoteIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || typeof token !== "string" || token.length === 0) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch(VERIFY_URL, {
    method: "POST",
    body,
  });

  if (!response.ok) return false;

  const data = await response.json().catch(() => null);
  return data?.success === true;
}
