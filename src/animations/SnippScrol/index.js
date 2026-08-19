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
 *  ├─ [panel 1]  position:absolute, inset:0, yPercent:100  ← slides up on scroll
 *  ├─ [panel 2]  position:absolute, inset:0, yPercent:100
 *  └─ …
 *
 *  Master GSAP timeline (scrubbed):
 *    At progress 0   → panel 0 fully visible
 *    At progress 1/N → panel 1 fully visible, panel 0 scaled/faded out
 *    At progress 2/N → panel 2 fully visible …
 *
 * Props
 * ─────
 *  scrub        {number}   scroll lag / inertia            (default 0.5)
 *  mobileScrub  {number}   scrub on ≤768 px                (default 0.3)
 *  snapDuration {number}   snap settle seconds             (default 0.5)
 *  enableSnap   {boolean}  GSAP snap to nearest panel      (default true)
 *  enableExit   {boolean}  scale+fade previous panel out   (default true)
 *  ease         {string}   panel slide ease (use 'none' for scrub) (default 'none')
 *  lockAtEnd    {number}   extra hold after last panel     (default 0)
 *  lockPageUntilComplete {boolean}  freeze page scroll until the last
 *                      panel is fully placed, then unlock  (default false)
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
  ease           = 'none',
  grain          = false,
  grainOpacity   = 0.038,
  lockAtEnd      = 0,
  lockPageUntilComplete = false,
  onLockProgress = null,
}) {
  const containerRef = useRef(null);
  const sectionsRef  = useRef([]);
  const ctxRef       = useRef(null);
  const lockCleanupRef = useRef(null);
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
    lockCleanupRef.current?.();
    lockCleanupRef.current = null;
    ctxRef.current?.revert();

    const isMobile    = window.innerWidth < 768;
    const activeScrub = isMobile ? mobileScrub : scrub;
    const total       = sections.length;
    const id          = instanceId.current;


    ctxRef.current = gsap.context(() => {

      // ── Position all panels absolutely inside the 100vh container ────────
      // overflow hidden so panels cannot steal wheel events from Lenis during pin
      const isMobile = window.innerWidth < 768;
      const lastPanelIndex = sections.length - 1;
      sections.forEach((section, i) => {
        const isLastPanel = i === lastPanelIndex;
        gsap.set(section, {
          position: 'absolute',
          top:      0,
          left:     0,
          width:    '100%',
          height:   '100%',
          zIndex:   10 + i,
          yPercent: (i === 0 ? 0 : 100),
          overflowX: 'hidden',
          overflowY: 'hidden',
          overscrollBehavior: 'none',
          scrollPaddingTop: isLastPanel
            ? (window.innerWidth >= 1024 ? '10rem' : '7rem')
            : undefined,
        });
      });

      // ── Build the master timeline that drives all panel transitions ───────
      const tl = gsap.timeline({ paused: true });

      sections.forEach((section, i) => {
        if (i === 0) return;
        const prev = sections[i - 1];

        // Incoming panel slides up from below
        // ✅ Use force3D for GPU acceleration on transforms
        tl.fromTo(
          section,
          { yPercent: 100, force3D: true },
          { yPercent: 0, ease, duration: 1, force3D: true },
          (i - 1)
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
      const panelDuration = Math.max(total - 1, 0);
      const lockDuration  = lockAtEnd > 0 ? lockAtEnd : 0;
      const totalDuration = panelDuration + lockDuration;
      const panelFraction = totalDuration > 0 ? panelDuration / totalDuration : 1;
      if (lockDuration > 0) {
        const _dummy = {};
        tl.to(_dummy, { duration: lockDuration }, panelDuration);
      }

      // Freeze document scroll and drive the overlay from wheel/touch until
      // the incoming panel is fully placed (and lock-color hold finishes),
      // then unlock page scroll so Lenis never jerks at the start.
      if (lockPageUntilComplete) {
        const startPlaced = (window.scrollY || 0) > 8;
        let target = startPlaced ? 1 : 0;
        let current = target;
        let rafId = 0;
        let locked = !startPlaced;

        tl.progress(current);

        let lastPlaced = startPlaced;
        window.__heroAboutPlaced = startPlaced;
        window.__pageScrollLocked = locked;
        const emitCoverProgress = (p) => {
          const next = Math.max(0, Math.min(1, p));
          window.__heroAboutProgress = next;
          window.__onHeroAboutProgress?.(next);
        };
        emitCoverProgress(current);
        const emitPlaced = (placed) => {
          if (placed === lastPlaced) return;
          lastPlaced = placed;
          window.__heroAboutPlaced = placed;
          window.dispatchEvent(new CustomEvent('heroAboutPlaced', { detail: { placed } }));
          if (placed) {
            ScrollTrigger.refresh();
            window.dispatchEvent(new CustomEvent('scrollAnimationsReady'));
          }
        };

        const setLocked = (next) => {
          locked = next;
          window.__pageScrollLocked = next;
          const lenis = window.lenisInstance;
          if (lenis) {
            if (next) lenis.stop();
            else lenis.start();
          }
          if (window.innerWidth < 768) {
            document.documentElement.style.overflow = next ? 'hidden' : '';
            document.body.style.overflow = next ? 'hidden' : '';
          }
        };

        setLocked(locked);

        const reportLockProgress = (p) => {
          if (!onLockProgress) return;
          if (p > panelFraction && panelFraction < 1) {
            onLockProgress(Math.min(1, Math.max(0, (p - panelFraction) / (1 - panelFraction))));
          } else {
            onLockProgress(0);
          }
        };

        const tick = () => {
          current += (target - current) * 0.22;
          if (Math.abs(target - current) < 0.0008) current = target;
          const slideProgress = panelFraction > 0 ? Math.min(current, panelFraction) / panelFraction : current;
          tl.progress(totalDuration > 0 ? current : slideProgress);
          emitCoverProgress(slideProgress);
          reportLockProgress(current);
          emitPlaced(current >= panelFraction);
          if (current >= 1 && target >= 1) {
            setLocked(false);
          } else if (current < 1) {
            setLocked(true);
          }
          rafId = current !== target ? requestAnimationFrame(tick) : 0;
        };

        const addProgress = (deltaPx) => {
          const panelHeight = container.offsetHeight || window.innerHeight;
          const dist = panelHeight * Math.max(totalDuration, 1) * 1.05;
          target = Math.max(0, Math.min(1, target + deltaPx / dist));
          if (!rafId) rafId = requestAnimationFrame(tick);
        };

        const scrollPos = () => window.lenisInstance?.scroll ?? window.scrollY ?? 0;

        const onWheel = (e) => {
          const atTop = scrollPos() <= 1;
          if (e.deltaY > 0 && target < 1) {
            e.preventDefault();
            addProgress(e.deltaY);
            return;
          }
          if (e.deltaY < 0 && atTop && current > 0) {
            e.preventDefault();
            addProgress(e.deltaY);
          }
        };

        let touchY = 0;
        const onTouchStart = (e) => {
          touchY = e.touches[0].clientY;
        };
        const onTouchMove = (e) => {
          const y = e.touches[0].clientY;
          const dy = touchY - y;
          touchY = y;
          const atTop = scrollPos() <= 1;
          if (dy > 0 && target < 1) {
            e.preventDefault();
            addProgress(dy);
            return;
          }
          if (dy < 0 && atTop && current > 0) {
            e.preventDefault();
            addProgress(dy);
          }
        };

        const onKey = (e) => {
          const atTop = scrollPos() <= 1;
          if ((e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') && target < 1) {
            e.preventDefault();
            addProgress(e.key === 'PageDown' ? window.innerHeight * 0.9 : 80);
          } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && atTop && current > 0) {
            e.preventDefault();
            addProgress(e.key === 'PageUp' ? -window.innerHeight * 0.9 : -80);
          }
        };

        window.addEventListener('wheel', onWheel, { passive: false, capture: true });
        window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
        window.addEventListener('keydown', onKey, { capture: true });

        const onLenisReady = () => setLocked(locked);
        window.addEventListener('lenisReady', onLenisReady);
        window.addEventListener('splashComplete', onLenisReady);

        lockCleanupRef.current = () => {
          if (rafId) cancelAnimationFrame(rafId);
          window.removeEventListener('wheel', onWheel, { capture: true });
          window.removeEventListener('touchstart', onTouchStart, { capture: true });
          window.removeEventListener('touchmove', onTouchMove, { capture: true });
          window.removeEventListener('keydown', onKey, { capture: true });
          window.removeEventListener('lenisReady', onLenisReady);
          window.removeEventListener('splashComplete', onLenisReady);
          window.__pageScrollLocked = false;
          window.__heroAboutPlaced = false;
          window.__heroAboutProgress = 0;
          window.__onHeroAboutProgress?.(0);
          window.lenisInstance?.start();
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
        };

        if (startPlaced) reportLockProgress(1);
        return;
      }

      // ── Pin container and scrub the timeline ──────────────────────────────
      const panelHeight   = container.offsetHeight || window.innerHeight;
      const panelScrollPx = (total - 1) * panelHeight;
      const lockScrollPx  = lockAtEnd * panelHeight;
      const totalScrollPx = panelScrollPx + lockScrollPx;

      let lastPlaced = false;
      window.__heroAboutPlaced = false;
      const emitCoverProgress = (p) => {
        const next = Math.max(0, Math.min(1, p));
        window.__heroAboutProgress = next;
        window.__onHeroAboutProgress?.(next);
      };
      emitCoverProgress(0);
      const emitPlaced = (placed) => {
        if (placed === lastPlaced) return;
        lastPlaced = placed;
        window.__heroAboutPlaced = placed;
        window.dispatchEvent(new CustomEvent('heroAboutPlaced', { detail: { placed } }));
        if (placed) {
          window.dispatchEvent(new CustomEvent('scrollAnimationsReady'));
        }
      };

      // Disable pinning on mobile to restore scroll
      ScrollTrigger.create({
        id:         `snip-${id}-master`,
        trigger:    container,
        start:      'top top',
        end:        () => `+=${totalScrollPx}`,
        pin:        true,
        pinSpacing: true,
        anticipatePin: 0,
        scrub:      activeScrub,
        animation:  tl,
        snap: enableSnap && total > 1
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
        onUpdate: (self) => {
          emitCoverProgress(panelFraction > 0 ? self.progress / panelFraction : 1);
          emitPlaced(self.progress >= panelFraction);
          if (lockScrollPx > 0 && onLockProgress) {
            if (self.progress > panelFraction) {
              const lockRaw = (self.progress - panelFraction) / (1 - panelFraction);
              onLockProgress(Math.min(1, Math.max(0, lockRaw)));
            } else {
              onLockProgress(0);
            }
          }
        },
        onRefresh: () => {
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

      // Refresh ScrollTrigger after pin setup so child animations measure correctly
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        window.dispatchEvent(new CustomEvent('scrollAnimationsReady'));
      });

    }, container);

  }, [scrub, mobileScrub, snapDuration, enableSnap, enableExit, ease, lockAtEnd, lockPageUntilComplete, onLockProgress]);

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
      lockCleanupRef.current?.();
      lockCleanupRef.current = null;
      ctxRef.current?.revert();
      window.__heroAboutPlaced = false;
      window.__heroAboutProgress = 0;
      window.__onHeroAboutProgress?.(0);
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
          height: 'min(100vh, 1000px)',
          maxHeight: '1000px',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        {childArray.map((child, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className="scrollbar-hide"
            style={{
              willChange: 'transform',
              width: '100%',
              height: '100%',
              overflowX: 'hidden',
              overflowY: 'hidden',
              overscrollBehavior: 'none',
              scrollPaddingTop: index === childArray.length - 1 ? '7rem' : undefined,
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
