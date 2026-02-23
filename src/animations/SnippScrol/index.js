'use client';

/**
 * SnippScrol  ─  Awwwards-level scroll-driven parallax system
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * HOW IT WORKS (layout-safe)
 * ──────────────────────────
 *  The container is a normal 100vh div that sits in the page flow.
 *  ScrollTrigger PINS it in place while the user scrolls through each section.
 *  Sections are position:absolute inside the container — they never escape it,
 *  so the header above and WhyChooseUs/CTA/Articles below are 100% unaffected.
 *
 *  ┌─ containerRef  100vh, overflow:hidden, stays in document flow
 *  │   Pinned by ScrollTrigger for (N-1)*100vh of extra scroll budget.
 *  │   pinSpacing:true adds an invisible spacer so content below
 *  │   only appears after all panels have been seen.
 *  │
 *  ├─ [panel 0]  position:absolute, inset:0  ← visible first
 *  ├─ [panel 1]  position:absolute, inset:0, y:100%  ← slides up on scroll
 *  ├─ [panel 2]  position:absolute, inset:0, y:100%
 *  └─ …
 *
 *  Master GSAP timeline (scrubbed):
 *    At progress 0   → panel 0 fully visible
 *    At progress 1/N → panel 1 fully visible, panel 0 scaled/faded out
 *    At progress 2/N → panel 2 fully visible …
 *
 * Props
 * ─────
 *  scrub        {number}   scroll lag / inertia            (default 1.5)
 *  mobileScrub  {number}   scrub on ≤768 px                (default 1)
 *  snapDuration {number}   snap settle seconds             (default 0.5)
 *  enableSnap   {boolean}  GSAP snap to nearest panel      (default true)
 *  enableExit   {boolean}  scale+fade previous panel out   (default true)
 *  grain        {boolean}  cinematic grain overlay          (default false)
 *  grainOpacity {number}   grain strength                  (default 0.038)
 */

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import GrainOverlay from './GrainOverlay';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let _instanceCount = 0;
function newId() { return ++_instanceCount; }

export default function SnippScrol({
  children,
  scrub          = 1.5,
  mobileScrub    = 1,
  snapDuration   = 0.5,
  enableSnap     = true,
  enableExit     = true,
  grain          = false,
  grainOpacity   = 0.038,
  lockAtEnd      = 0,      // extra scroll vh after last panel (drives onLockProgress)
  onLockProgress = null,   // (progress: 0→1) => void — called during lock phase
}) {
  const containerRef = useRef(null);
  const sectionsRef  = useRef([]);
  const ctxRef       = useRef(null);
  const instanceId   = useRef(newId());

  const childArray = Array.isArray(children)
    ? children
    : children ? [children] : [];

  const build = useCallback(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    const sections  = sectionsRef.current.filter(Boolean);
    if (!container || sections.length < 1) return;

    // Clean up any prior run
    ctxRef.current?.revert();

    const isMobile    = window.innerWidth < 768;
    const activeScrub = isMobile ? mobileScrub : scrub;
    const total       = sections.length;
    const id          = instanceId.current;


    ctxRef.current = gsap.context(() => {

      // ── Position all panels absolutely inside the 100vh container ────────
      const isMobile = window.innerWidth < 768;
      sections.forEach((section, i) => {
        gsap.set(section, {
          position: isMobile ? 'relative' : 'absolute',
          top:      0,
          left:     0,
          width:    '100%',
          height:   isMobile ? 'auto' : '100%',
          zIndex:   10 + i,
          y: !isMobile ? (i === 0 ? '0%' : '100%') : '0%',
          overflow: isMobile ? 'visible' : 'hidden',
        });
      });

      // ── Build the master timeline that drives all panel transitions ───────
      const tl = gsap.timeline({ paused: true });

      sections.forEach((section, i) => {
        if (i === 0) return;
        const prev = sections[i - 1];
        tl.fromTo(
          section,
          { y: '100%' },
          { y: '0%', ease: 'none', duration: 1 },
          (i - 1)
        );
        if (enableExit && prev) {
          tl.fromTo(
            prev,
            { scale: 1, opacity: 1 },
            { scale: 0.93, opacity: 0.6, ease: 'none', duration: 0.6 },
            (i - 1)
          );
        }
      });

      // ── Extend tl duration for the lock-at-end phase ─────────────────────
      const panelDuration = total - 1;
      if (lockAtEnd > 0) {
        const _dummy = {};
        tl.to(_dummy, { duration: lockAtEnd }, panelDuration);
      }

      // ── Pin container and scrub the timeline ──────────────────────────────
      const panelScrollPx = (total - 1) * window.innerHeight;
      const lockScrollPx  = lockAtEnd * window.innerHeight;
      const totalScrollPx = panelScrollPx + lockScrollPx;
      const panelFraction = totalScrollPx > 0 ? panelScrollPx / totalScrollPx : 1;

      // Disable pinning on mobile to restore scroll
      ScrollTrigger.create({
        id:         `snip-${id}-master`,
        trigger:    container,
        start:      'top top',
        end:        () => `+=${totalScrollPx}`,
        pin:        !isMobile,
        pinSpacing: !isMobile,
        scrub:      activeScrub,
        animation:  tl,
        snap: enableSnap && total > 1 && !isMobile
          ? {
              snapTo: (value) => {
                if (value <= panelFraction) {
                  const step = panelFraction / (total - 1);
                  return Math.round(value / step) * step;
                }
                return value;
              },
              duration: { min: 0.2, max: snapDuration },
              ease:     'power2.inOut',
              delay:    0.05,
            }
          : undefined,
        onUpdate: lockScrollPx > 0 && onLockProgress && !isMobile
          ? (self) => {
              if (self.progress > panelFraction) {
                const lockRaw = (self.progress - panelFraction) / (1 - panelFraction);
                onLockProgress(Math.min(1, Math.max(0, lockRaw)));
              } else {
                onLockProgress(0);
              }
            }
          : undefined,
        onRefresh: () => {
          const spacer = container.closest('.pin-spacer') || container.parentElement;
          if (spacer && spacer.classList.contains('pin-spacer')) {
            spacer.style.backgroundColor = 'white';
          }
        },
      });

      requestAnimationFrame(() => {
        const spacer = container.closest('.pin-spacer') || container.parentElement;
        if (spacer && spacer.classList.contains('pin-spacer')) {
          spacer.style.backgroundColor = 'white';
        }
      });

    }, container);

  }, [scrub, mobileScrub, snapDuration, enableSnap, enableExit, lockAtEnd, onLockProgress]);

  useEffect(() => {
    // Small rAF delay lets Next.js finish painting before GSAP measures
    const raf = requestAnimationFrame(() => {
      build();
    });

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();            // full rebuild on resize (re-reads vh)
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      ctxRef.current?.revert();
    };
  }, [build]);

  // ─── Render ────────────────────────────────────────────────────────────────
  // The outer wrapper is 100vh and overflow:hidden.
  // GSAP will pin THIS element — everything outside (header, footer) is safe.
  return (
    <>
      {grain && <GrainOverlay opacity={grainOpacity} />}

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: typeof window !== 'undefined' && window.innerWidth < 768 ? 'auto' : '100vh',
          overflow: typeof window !== 'undefined' && window.innerWidth < 768 ? 'visible' : 'hidden',
          backgroundColor: 'white',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {childArray.map((child, index) => (
          <div
            key={index}
            ref={(el) => { if (el) sectionsRef.current[index] = el; }}
            style={{
              willChange: 'transform, opacity',
              width: '100%',
              height: typeof window !== 'undefined' && window.innerWidth < 768 ? 'auto' : '100%',
              overflow: typeof window !== 'undefined' && window.innerWidth < 768 ? 'visible' : 'hidden',
            }}
          >
            {child}
          </div>
        ))}
      </div>
      {/* White seam-cover: overlaps the compositing gap that appears
          at the bottom of the GSAP-pinned fixed layer during scroll */}
      <div
        aria-hidden="true"
        style={{
          height:          '4px',
          marginTop:       '-4px',
          backgroundColor: 'white',
          position:        'relative',
          zIndex:          9999,
        }}
      />
    </>
  );
}
