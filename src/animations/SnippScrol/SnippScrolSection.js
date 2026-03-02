'use client';

/**
 * SnippScrolSection
 * ─────────────────────────────────────────────────────────────────────────────
 * A standalone, full-viewport section with a 3-layer depth parallax system.
 * Use this when you have explicit control over the bg / mid / fg content.
 *
 * Layer depth map (scroll direction = downward, positive yPercent = moves down)
 *   bg  – slowest  (negative yPercent offset) → feels furthest away
 *   mid – medium   (zero / slight offset)     → base content layer
 *   fg  – fastest  (positive yPercent offset) → feels closest
 *
 * Data attributes found inside children:
 *   data-snip-text  – any element that should animate in with the text reveal
 *
 * Props
 *   bg          {ReactNode}  background layer (image, video, gradient div …)
 *   mid         {ReactNode}  main content layer
 *   fg          {ReactNode}  foreground accents / floating elements
 *   height      {string}     CSS height of section            (default '100vh')
 *   bgSpeed     {number}     yPercent range for bg layer      (default 25)
 *   fgSpeed     {number}     yPercent range for fg layer      (default 40)
 *   bgScale     {number}     bg zoom at end of travel         (default 1.12)
 *   darkOverlay {boolean}    gradient overlay on bg           (default true)
 *   overlayFrom {string}     start colour of gradient         (default 'rgba(0,0,0,0.55)')
 *   overlayTo   {string}     end colour of gradient           (default 'rgba(0,0,0,0.1)')
 *   className   {string}     extra classes on the root section
 *   id          {string}     HTML id attribute
 *   textSelector{string}     CSS selector for text reveal     (default '[data-snip-text]')
 *   textStart   {string}     ScrollTrigger start for text     (default 'top 72%')
 *   mobile      {boolean}    reduce effects on ≤768 px        (default true)
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Depth constants ──────────────────────────────────────────────────────────
// These are applied as yPercent values. The total travel = 2×speed
// (from -speed at top of viewport → +speed at bottom of viewport).
const MOBILE_REDUCTION = 0.35; // fraction of desktop effect on phones

// ─── Component ────────────────────────────────────────────────────────────────
export default function SnippScrolSection({
  bg,
  mid,
  fg,
  height = '100vh',
  bgSpeed = 25,
  fgSpeed = 40,
  bgScale = 1.12,
  darkOverlay = true,
  overlayFrom = 'rgba(0,0,0,0.55)',
  overlayTo = 'rgba(0,0,0,0.08)',
  className = '',
  id,
  textSelector = '[data-snip-text]',
  textStart = 'top 72%',
  mobile = true,
}) {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const midRef     = useRef(null);
  const fgRef      = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile  = window.innerWidth < 768;
    const reduction = (isMobile && mobile) ? MOBILE_REDUCTION : 1;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // ── 1. Background parallax + scale ───────────────────────────────────
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -bgSpeed * reduction, scale: 1 },
          {
            yPercent: bgSpeed * reduction,
            scale: bgScale,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // ── 2. Foreground parallax ────────────────────────────────────────────
      if (fgRef.current) {
        // fg moves more than bg → stronger parallax separation
        const fgFrom = -fgSpeed * reduction;
        const fgTo   =  fgSpeed * reduction;

        gsap.fromTo(
          fgRef.current,
          { yPercent: fgFrom },
          {
            yPercent: fgTo,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // ── 3. Mid layer subtle drift (optional, keeps it grounded) ──────────
      if (midRef.current) {
        const midSpeed = bgSpeed * 0.4 * reduction;
        gsap.fromTo(
          midRef.current,
          { yPercent: -midSpeed },
          {
            yPercent: midSpeed,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // ── 4. Section entrance — clip-path wipe up ───────────────────────────
      gsap.fromTo(
        section,
        { clipPath: 'inset(8% 0% 0% 0% round 24px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'expo.out',
          duration: 1.4,
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // ── 5. Text reveal — staggered fade + rise + blur ────────────────────
      const textEls = section.querySelectorAll(textSelector);
      if (textEls.length) {
        gsap.fromTo(
          textEls,
          { y: 60, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.13,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: textStart,
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ── 6. FG floating micro-animation (idle loop) ───────────────────────
      if (fgRef.current) {
        const floatingEls = fgRef.current.querySelectorAll('[data-float]');
        floatingEls.forEach((el, i) => {
          gsap.to(el, {
            y: `${-12 + (i % 3) * 4}`,
            duration: 2 + i * 0.4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.3,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* ── Background Layer ──────────────────────────────────────────────── */}
      {bg && (
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: 'transform', zIndex: 0 }}
        >
          {bg}

          {/* Gradient overlay keeps text legible over any bg media */}
          {darkOverlay && (
            <div
              aria-hidden="true"
              className="absolute inset-0 w-full h-full"
              style={{
                background: `linear-gradient(to bottom, ${overlayFrom} 0%, ${overlayTo} 100%)`,
                zIndex: 1,
              }}
            />
          )}
        </div>
      )}

      {/* ── Mid / Content Layer ───────────────────────────────────────────── */}
      {mid && (
        <div
          ref={midRef}
          className="absolute inset-0  w-full h-full flex items-center justify-center"
          style={{ willChange: 'transform', zIndex: 2 }}
        >
          {mid}
        </div>
      )}

      {/* ── Foreground / Accent Layer ─────────────────────────────────────── */}
      {fg && (
        <div
          ref={fgRef}
          className="absolute inset-0 w-full h-full pointer-events-none "
          style={{ willChange: 'transform', zIndex: 3 }}
        >
          {fg}
        </div>
      )}
    </section>
  );
}
