'use client';

/**
 * GrainOverlay
 * ─────────────────────────────────────────────────────────
 * Fixed cinematic grain texture using an SVG feTurbulence filter.
 * Sits above everything with pointer-events: none, so it never
 * blocks interaction but always adds that premium film-grain feel.
 *
 * Props
 *   opacity    – overall grain strength   (default 0.038)
 *   blendMode  – CSS mix-blend-mode       (default 'overlay')
 *   size       – tile size in px          (default 200)
 */
export default function GrainOverlay({
  opacity = 0.038,
  blendMode = 'overlay',
  size = 200,
}) {
  // Inline SVG data URI – no external asset, no network request,
  // and zero runtime JS after mount.
  const svgNoise = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: 9998,          // below modals / toasts, above everything else
        opacity,
        mixBlendMode: blendMode,
        backgroundImage: `url("${svgNoise}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${size}px ${size}px`,
        willChange: 'auto',    // no animation, no will-change needed
        contain: 'strict',     // ✅ Optimize: prevent layout recalculation
        transform: 'translateZ(0)', // ✅ GPU acceleration hint
        backfaceVisibility: 'hidden',
      }}
    />
  );
}
