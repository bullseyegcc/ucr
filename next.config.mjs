/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";
const turnstileOrigin = "https://challenges.cloudflare.com";

// Pragmatic CSP so the current site keeps working. Tighten later with nonces
// and drop 'unsafe-inline' from script-src.
const contentSecurityPolicy = [
  "default-src 'self'",
  `img-src 'self' data: https://ucr.bullseyetechbrands.com`,
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : "",
    turnstileOrigin,
  ]
    .filter(Boolean)
    .join(" "),
  `connect-src 'self' ${turnstileOrigin}`,
  `frame-src ${turnstileOrigin}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

if (!isDev) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  });
}

const nextConfig = {
  poweredByHeader: false,
  // Next 16 writes an AGENTS.md on dev startup unless this is off.
  agentRules: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [75, 80, 85, 90, 95],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3405],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucr.bullseyetechbrands.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
