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
  scrub          = 0.5,      // ✅ REDUCED further (from 0.8) - less lag with Lenis + trackpad
  mobileScrub    = 0.3,      // ✅ REDUCED further (from 0.5) - mobile trackpad performance
  snapDuration   = 0.5,
  enableSnap     = true,
  enableExit     = true,
  grain          = false,
  grainOpacity   = 0.038,
  lockAtEnd      = 0,
  onLockProgress = null,
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
      sections.forEach((section, i) => {
        gsap.set(section, {
          position: 'absolute',
          top:      0,
          left:     0,
          width:    '100%',
          height:   '100%',
          zIndex:   10 + i,
          // First panel is already on screen; rest start below
          y: i === 0 ? '0%' : '100%',
          overflow: 'hidden',
        });
      });

      // ── Build the master timeline that drives all panel transitions ───────
      // Duration is arbitrary (1 unit per transition); the ST scrub maps it
      // to real scroll pixels.
      const tl = gsap.timeline({ paused: true });

      sections.forEach((section, i) => {
        if (i === 0) return; // first panel is the base; only incoming panels are animated

        const prev = sections[i - 1];

        // Incoming panel slides up from below
        // ✅ Use force3D for GPU acceleration on transforms
        tl.fromTo(
          section,
          { y: '100%', force3D: true },
          { y: '0%', ease: 'none', duration: 1, force3D: true },
          (i - 1)   // absolute position in the timeline
        );

        // Optional: outgoing panel scales down and fades slightly
        // ✅ Composite properties only (transform + opacity) for GPU
        if (enableExit && prev) {
          tl.fromTo(
            prev,
            { scale: 1, opacity: 1, force3D: true },
            { scale: 0.93, opacity: 0.6, ease: 'none', duration: 0.6, force3D: true },
            (i - 1)       // runs in parallel with the slide-in
          );
        }
      });

      // ── Extend tl duration for the lock-at-end phase ─────────────────────
      // CRITICAL: ScrollTrigger drives tl.progress() proportional to self.progress.
      // If tl ends at time=(total-1) but the pin covers (total-1+lockAtEnd)*vh,
      // GSAP stretches panel animations across the full range — the lock zone is
      // never reached. Adding a dummy tween makes tl.duration = total-1+lockAtEnd
      // so panels complete at self.progress = (total-1)/(total-1+lockAtEnd) ✓
      const panelDuration = total - 1; // timeline time units used by panels
      if (lockAtEnd > 0) {
        const _dummy = {}; // GSAP needs a target; empty obj is harmless
        tl.to(_dummy, { duration: lockAtEnd }, panelDuration);
      }

      // ── Pin container and scrub the timeline ──────────────────────────────
      // pinSpacing:true inserts a spacer after the container so everything
      // below (WhyChooseUs, CTA, Articles …) scrolls into view naturally
      // only after all panels have been seen.
      // Total scroll budget: panel transitions + optional lock-at-end phase
      const panelScrollPx = (total - 1) * window.innerHeight;
      const lockScrollPx  = lockAtEnd * window.innerHeight;
      const totalScrollPx = panelScrollPx + lockScrollPx;
      // panelFraction: ST.progress at which all panels are fully transitioned
      const panelFraction = totalScrollPx > 0 ? panelScrollPx / totalScrollPx : 1;

      ScrollTrigger.create({
        id:         `snip-${id}-master`,
        trigger:    container,
        start:      'top top',
        end:        () => `+=${totalScrollPx}`,
        pin:        true,
        pinSpacing: true,
        scrub:      activeScrub,
        animation:  tl,
        snap: enableSnap && total > 1
          ? {
              // Snap to panel boundaries only; lock zone has no snap
              snapTo: (value) => {
                if (value <= panelFraction) {
                  // step = fraction of total range each panel occupies
                  const step = panelFraction / (total - 1);
                  return Math.round(value / step) * step;
                }
                return value; // lock zone — no snapping
              },
              duration: { min: 0.2, max: snapDuration },
              ease:     'power2.inOut',
              delay:    0.05,
            }
          : undefined,
        onUpdate: lockScrollPx > 0 && onLockProgress
          ? (self) => {
              // self.progress: raw 0→1 across the full pin range (panels + lock)
              if (self.progress > panelFraction) {
                const lockRaw = (self.progress - panelFraction) / (1 - panelFraction);
                onLockProgress(Math.min(1, Math.max(0, lockRaw)));
              } else {
                onLockProgress(0);
              }
            }
          : undefined,
        onRefresh: () => {
          // GSAP dynamically injects a .pin-spacer div — make it white
          // so no dark background bleeds through the gap
          const spacer = container.closest('.pin-spacer') || container.parentElement;
          if (spacer && spacer.classList.contains('pin-spacer')) {
            spacer.style.backgroundColor = 'white';
          }
        },
      });

      // ✅ Style the pin-spacer immediately (remove rAF to prevent extra repaints)
      const spacer = container.closest('.pin-spacer') || container.parentElement;
      if (spacer && spacer.classList.contains('pin-spacer')) {
        spacer.style.backgroundColor = 'white';
      }

    }, container); // scope: entire context is tied to the container element

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
          position:             'relative',
          width:                '100%',
          height:               '100vh',
          overflow:             'hidden',
          backgroundColor:      'white',
          transform:            'translateZ(0)',
          backfaceVisibility:   'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange:           'transform, opacity',   // ✅ GPU acceleration for pinned container
          contain:              'layout style paint',    // ✅ Isolate paint boundaries
        }}
      >
        {childArray.map((child, index) => (
          <div
            key={index}
            ref={(el) => { if (el) sectionsRef.current[index] = el; }}
            style={{
              willChange: 'transform, opacity',
              // Pre-size so there's no flash before GSAP sets position:absolute
              width:    '100%',
              height:   '100%',
              overflow: 'hidden',
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
