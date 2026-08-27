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
 *  scrub               {number}   scroll lag / inertia            (default 0.5)
 *  mobileScrub         {number}   scrub on ≤768 px                (default 0.3)
 *  mobileScrollFactor  {number}   vh multiplier for pin distance
 *                                 on ≤768 px (default 0.5 = half desktop)
 *  snapDuration        {number}   snap settle seconds             (default 0.5)
 *  enableSnap          {boolean}  GSAP snap to nearest panel      (default true)
 *  enableExit          {boolean}  scale+fade previous panel out   (default true)
 *  ease                {string}   panel slide ease (use 'none' for scrub) (default 'none')
 *  lockAtEnd           {number}   extra hold after last panel     (default 0)
 *  lockPageUntilComplete {boolean}  freeze page scroll until the last
 *                      panel is fully placed, then unlock  (default false)
 *  grain               {boolean}  cinematic grain overlay          (default false)
 *  grainOpacity        {number}   grain strength                  (default 0.038)
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
  mobileScrollFactor = 0.5,  // shorter pin distance on mobile (TSB-style pin, less scroll)
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
  const outerRef     = useRef(null);
  const sectionsRef  = useRef([]);
  const ctxRef       = useRef(null);
  const lockCleanupRef = useRef(null);
  /** Live lock controller — resize/zoom must sync this, not tear it down. */
  const lockApiRef = useRef(null);
  const instanceId   = useRef(newId());
  const normalizeCleanupRef = useRef(null);

  const childArray = Array.isArray(children)
    ? children
    : children ? [children] : [];

  const build = useCallback(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    const sections  = sectionsRef.current.filter(Boolean);
    if (!container || sections.length < 1) return;

    // Capture lock state BEFORE cleanup. Browser zoom fires resize and often
    // resets scrollY to 0 — without this, rebuild re-locks the page mid-scroll.
    const savedPlaced = window.__heroAboutPlaced === true;
    const savedProgress = typeof window.__heroAboutProgress === 'number'
      ? window.__heroAboutProgress
      : 0;
    const savedTimeline = typeof window.__heroAboutTimelineProgress === 'number'
      ? window.__heroAboutTimelineProgress
      : null;
    const savedScroll = Math.max(
      window.scrollY || 0,
      typeof window.lenisInstance?.scroll === 'number' ? window.lenisInstance.scroll : 0,
      typeof window.__heroAboutLastScroll === 'number' ? window.__heroAboutLastScroll : 0,
    );

    // Clean up any prior run
    lockApiRef.current = null;
    lockCleanupRef.current?.();
    lockCleanupRef.current = null;
    normalizeCleanupRef.current?.();
    normalizeCleanupRef.current = null;
    ctxRef.current?.revert();

    // Always clear leftover splash/lock styles so mobile native scroll works
    window.__pageScrollLocked = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.documentElement.style.touchAction = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.documentElement.style.height = '';

    const isMobile    = window.innerWidth < 768;
    const activeScrub = isMobile ? mobileScrub : scrub;
    const total       = sections.length;
    const id          = instanceId.current;


    ctxRef.current = gsap.context(() => {

      // Same panel slide on mobile + desktop.
      // Mobile: sticky + scrub (no GSAP pin — pin freezes native touch without Lenis).
      // Desktop: classic pin + scrub (TSB approach).
      const isMobile = window.innerWidth < 768;
      const lastPanelIndex = sections.length - 1;

      let lastPlaced = false;
      window.__heroAboutPlaced = false;
      const emitCoverProgress = (p) => {
        const next = Math.max(0, Math.min(1, p));
        window.__heroAboutProgress = next;
        window.__onHeroAboutProgress?.(next);
        window.dispatchEvent(new CustomEvent('heroAboutProgress', { detail: { progress: next } }));
      };
      const emitPlaced = (placed) => {
        if (placed === lastPlaced) return;
        lastPlaced = placed;
        window.__heroAboutPlaced = placed;
        window.dispatchEvent(new CustomEvent('heroAboutPlaced', { detail: { placed } }));
        if (placed) {
          window.dispatchEvent(new CustomEvent('scrollAnimationsReady'));
        }
      };

      // ── Position all panels absolutely inside the 100vh container ────────
      // overflow hidden so panels cannot steal wheel events from Lenis during pin.
      // CRITICAL: never use overscrollBehavior:'none' on full-viewport panels —
      // it blocks scroll-chaining to the document on touch devices.
      gsap.set(container, {
        height: '100dvh',
        maxHeight: '100dvh',
        overflow: 'hidden',
        touchAction: 'pan-y',
      });
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
          overscrollBehavior: 'auto',
          touchAction: 'pan-y',
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
        // Zoom/resize can zero scrollY; trust prior placed/progress + Lenis scroll.
        // __heroAboutProgress is slide-only (0–1); timeline includes lockAtEnd.
        const startPlaced =
          savedPlaced ||
          savedScroll > 8 ||
          savedProgress >= 0.999 ||
          (savedTimeline != null && savedTimeline >= 0.999);
        const restored = startPlaced
          ? 1
          : savedTimeline != null
            ? Math.max(0, Math.min(1, savedTimeline))
            : Math.max(0, Math.min(1, savedProgress * panelFraction));
        let target = restored;
        let current = restored;
        let rafId = 0;
        let restoreRafId = 0;
        let locked = !startPlaced;
        /** Last known unlocked scroll offset (current position, not peak). */
        let lastUnlockedScroll = startPlaced
          ? Math.max(
              savedScroll,
              typeof window.__heroAboutLastScroll === 'number' ? window.__heroAboutLastScroll : 0,
            )
          : 0;
        /** Block false reverse-into-lock right after resize/zoom. */
        let suppressReverseUntil = 0;
        /** While true, ignore scroll=0 tracking updates (zoom wipe). */
        let resizeGuardUntil = 0;
        /** Timestamp when live scroll first hit ~0 while we had a mid-page offset. */
        let zeroSince = 0;
        let unsubLenisScroll = null;

        tl.progress(current);

        let lastPlaced = startPlaced;
        window.__heroAboutPlaced = startPlaced;
        window.__pageScrollLocked = locked;
        window.__heroAboutTimelineProgress = current;
        if (startPlaced && lastUnlockedScroll > 0) {
          window.__heroAboutLastScroll = lastUnlockedScroll;
        }

        const scrollPos = () => {
          const lenis = window.lenisInstance;
          if (lenis && typeof lenis.scroll === 'number') return lenis.scroll;
          return window.scrollY || 0;
        };

        const applyScrollY = (y) => {
          if (!(y > 8)) return;
          const live = window.lenisInstance;
          live?.start?.();
          if (live) live.scrollTo(y, { immediate: true });
          window.scrollTo(0, y);
          document.documentElement.scrollTop = y;
          document.body.scrollTop = y;
          lastUnlockedScroll = y;
          window.__heroAboutLastScroll = y;
        };

        const trackUnlockedScroll = () => {
          if (locked || current < 0.999) return;
          const y = Math.max(scrollPos(), window.scrollY || 0);
          const now = performance.now();

          if (y > 8) {
            lastUnlockedScroll = y;
            window.__heroAboutLastScroll = y;
            zeroSince = 0;
            return;
          }

          // y ≈ 0. Zoom often zeros scroll BEFORE the resize event. Don't erase
          // last mid-page offset unless zero has been stable (intentional top).
          if (lastUnlockedScroll > 50) {
            if (!zeroSince) zeroSince = now;
            if (
              now - zeroSince < 180 ||
              now < resizeGuardUntil ||
              now < suppressReverseUntil
            ) {
              return;
            }
          }
          lastUnlockedScroll = y;
          window.__heroAboutLastScroll = y;
        };

        const attachLenisScrollTracking = () => {
          unsubLenisScroll?.();
          unsubLenisScroll = null;
          const lenis = window.lenisInstance;
          if (!lenis?.on) return;
          const onLenisScroll = () => trackUnlockedScroll();
          lenis.on('scroll', onLenisScroll);
          unsubLenisScroll = () => {
            lenis.off('scroll', onLenisScroll);
            unsubLenisScroll = null;
          };
        };

        // Pin page to 0 whenever we re-enter the locked overlay. Otherwise Lenis
        // momentum can freeze mid-page (scrollY > 0) while stop() is called, and
        // upward wheel no longer drives reverse (atTop check fails) → stuck scroll.
        const pinScrollTop = () => {
          const lenis = window.lenisInstance;
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          }
          window.scrollTo(0, 0);
        };

        const clearScrollLockStyles = () => {
          // Always clear — zoom can cross the mobile breakpoint while overflow
          // was set, then unlock on desktop and leave body/html stuck.
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
        };

        const emitCoverProgress = (p) => {
          const next = Math.max(0, Math.min(1, p));
          window.__heroAboutProgress = next;
          window.__onHeroAboutProgress?.(next);
          window.dispatchEvent(new CustomEvent('heroAboutProgress', { detail: { progress: next } }));
        };
        emitCoverProgress(
          panelFraction > 0 ? Math.min(current, panelFraction) / panelFraction : current,
        );
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

        const setLocked = (next, { force = false } = {}) => {
          if (!force && locked === next) {
            // Lenis may have been created after we locked — keep it stopped
            if (next) window.lenisInstance?.stop();
            return;
          }
          locked = next;
          window.__pageScrollLocked = next;
          const lenis = window.lenisInstance;
          if (next) {
            pinScrollTop();
            lenis?.stop();
            if (window.innerWidth < 768) {
              document.documentElement.style.overflow = 'hidden';
              document.body.style.overflow = 'hidden';
            } else {
              clearScrollLockStyles();
            }
          } else {
            lenis?.start();
            clearScrollLockStyles();
          }
        };

        setLocked(locked, { force: true });

        // After unlock-on-rebuild, put the user back where zoom left them.
        if (startPlaced && lastUnlockedScroll > 8) {
          requestAnimationFrame(() => {
            const lenis = window.lenisInstance;
            if (lenis) lenis.scrollTo(lastUnlockedScroll, { immediate: true });
            else window.scrollTo(0, lastUnlockedScroll);
          });
        }

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
          // Snap early — asymptotic lerp otherwise leaves current at ~0.98 forever,
          // keeps locked=true, and wheel preventDefault swallows all page scroll.
          if (Math.abs(target - current) < 0.002) current = target;
          if (target >= 0.999 && current >= 0.999) {
            current = 1;
            target = 1;
          }
          window.__heroAboutTimelineProgress = current;
          const slideProgress = panelFraction > 0 ? Math.min(current, panelFraction) / panelFraction : current;
          tl.progress(totalDuration > 0 ? current : slideProgress);
          emitCoverProgress(slideProgress);
          reportLockProgress(current);
          emitPlaced(current >= panelFraction);
          if (current >= 0.999 && target >= 0.999) {
            setLocked(false);
          } else {
            setLocked(true);
          }
          rafId = current !== target ? requestAnimationFrame(tick) : 0;
        };

        const addProgress = (deltaPx) => {
          const panelHeight = container.offsetHeight || window.innerHeight;
          const distanceUnit = isMobile
            ? panelHeight * Math.max(0.25, Math.min(1, mobileScrollFactor))
            : panelHeight;
          const dist = distanceUnit * Math.max(totalDuration, 1) * 1.05;
          const nextTarget = Math.max(0, Math.min(1, target + deltaPx / dist));
          // Entering reverse from a fully placed page: lock + pin before animating
          if (!locked && nextTarget < 1) {
            setLocked(true);
          } else if (locked) {
            pinScrollTop();
          }
          target = nextTarget;

          // Hard-complete when the user finishes the lock distance. Asymptotic lerp
          // otherwise leaves current≈0.96 + locked=true, and wheel preventDefault
          // swallows all further page scroll (especially visible after resize).
          if (target >= 1 && deltaPx > 0) {
            target = 1;
            current = 1;
            window.__heroAboutTimelineProgress = 1;
            tl.progress(1);
            emitCoverProgress(1);
            reportLockProgress(1);
            emitPlaced(true);
            setLocked(false);
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = 0;
            }
            return;
          }
          if (target <= 0 && deltaPx < 0) {
            target = 0;
            current = 0;
            window.__heroAboutTimelineProgress = 0;
            tl.progress(0);
            emitCoverProgress(0);
            reportLockProgress(0);
            emitPlaced(false);
            setLocked(true);
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = 0;
            }
            return;
          }

          if (!rafId) rafId = requestAnimationFrame(tick);
        };

        // Only start reversing the hero when the page is truly at the top.
        // Once already locked, always handle wheel so a non-zero freeze can't trap us.
        // After resize/zoom, suppress reverse so a zeroed scrollY doesn't re-lock.
        const canReverseUp = () => {
          if (locked) return true;
          if (performance.now() < suppressReverseUntil) return false;
          // Prefer live scroll; lastUnlocked can lag one frame after scrollTo(0).
          return scrollPos() <= 2 && (window.scrollY || 0) <= 2;
        };

        const isFullyComplete = () =>
          current >= 0.999 && target >= 0.999 && window.__heroAboutPlaced === true;

        const onWheel = (e) => {
          if (window.__splashActive) return;
          // Let the browser handle pinch/ctrl zoom — never drive the lock from it.
          if (e.ctrlKey || e.metaKey) return;
          // Fully unlocked: never swallow wheel — Lenis/native owns page scroll.
          if (!locked && isFullyComplete()) {
            if (e.deltaY < 0 && canReverseUp() && (current > 0 || target > 0)) {
              e.preventDefault();
              addProgress(e.deltaY);
            }
            return;
          }
          if (e.deltaY > 0 && (locked || target < 1)) {
            e.preventDefault();
            addProgress(e.deltaY);
            return;
          }
          if (e.deltaY < 0 && canReverseUp() && (current > 0 || target > 0)) {
            e.preventDefault();
            addProgress(e.deltaY);
          }
        };

        let touchY = 0;
        const onTouchStart = (e) => {
          touchY = e.touches[0].clientY;
        };
        const onTouchMove = (e) => {
          if (window.__splashActive) return;
          const y = e.touches[0].clientY;
          const dy = touchY - y;
          touchY = y;
          if (!locked && isFullyComplete()) {
            if (dy < 0 && canReverseUp() && (current > 0 || target > 0)) {
              e.preventDefault();
              addProgress(dy);
            }
            return;
          }
          if (dy > 0 && (locked || target < 1)) {
            e.preventDefault();
            addProgress(dy);
            return;
          }
          if (dy < 0 && canReverseUp() && (current > 0 || target > 0)) {
            e.preventDefault();
            addProgress(dy);
          }
        };

        const onKey = (e) => {
          if (window.__splashActive) return;
          if (!locked && isFullyComplete()) {
            if ((e.key === 'ArrowUp' || e.key === 'PageUp') && canReverseUp() && (current > 0 || target > 0)) {
              e.preventDefault();
              addProgress(e.key === 'PageUp' ? -window.innerHeight * 0.9 : -80);
            }
            return;
          }
          if ((e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') && (locked || target < 1)) {
            e.preventDefault();
            addProgress(e.key === 'PageDown' ? window.innerHeight * 0.9 : 80);
          } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && canReverseUp() && (current > 0 || target > 0)) {
            e.preventDefault();
            addProgress(e.key === 'PageUp' ? -window.innerHeight * 0.9 : -80);
          }
        };

        const onWindowScroll = () => trackUnlockedScroll();
        window.addEventListener('scroll', onWindowScroll, { passive: true });
        window.addEventListener('wheel', onWheel, { passive: false, capture: true });
        window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
        window.addEventListener('keydown', onKey, { capture: true });

        const onLenisReady = () => {
          setLocked(locked, { force: true });
          attachLenisScrollTracking();
        };
        window.addEventListener('lenisReady', onLenisReady);
        window.addEventListener('splashComplete', onLenisReady);
        attachLenisScrollTracking();

        // Resize/zoom must NOT rebuild this controller — teardown races Lenis and
        // often re-locks after the browser zeros scrollY. Just re-sync lock state.
        const syncAfterResize = ({ sizeChanged = false } = {}) => {
          const lenis = window.lenisInstance;
          const liveY = Math.max(
            typeof lenis?.scroll === 'number' ? lenis.scroll : 0,
            window.scrollY || 0,
          );
          const storedY = Math.max(
            lastUnlockedScroll,
            typeof window.__heroAboutLastScroll === 'number' ? window.__heroAboutLastScroll : 0,
          );
          // Zoom often zeros live scroll; only then fall back to last known.
          // If user scrolled up (live mid/low, stored higher), trust live — do not jump to peak.
          const scrollWasZeroed = liveY < 2 && storedY > 8;
          const restoreY = liveY > 8 ? liveY : (storedY > 8 ? storedY : liveY);

          // Only suppress reverse when scroll was actually disrupted — visualViewport
          // noise was keeping suppress forever and blocking hero reverse + feeling stuck.
          if (scrollWasZeroed || sizeChanged) {
            suppressReverseUntil = performance.now() + 700;
            resizeGuardUntil = performance.now() + 700;
          }

          if (restoreY > 8) {
            lastUnlockedScroll = restoreY;
            window.__heroAboutLastScroll = restoreY;
          }

          lenis?.resize?.();

          // Heal lerp-stuck lock: current can sit at ~0.98 with target=1 while
          // wheel preventDefault still swallows page scroll.
          const shouldBeUnlocked =
            (!locked && current >= 0.999 && target >= 0.999) ||
            (window.__heroAboutPlaced === true && target >= 0.999 && current >= 0.95);

          if (shouldBeUnlocked) {
            locked = false;
            current = 1;
            target = 1;
            window.__heroAboutPlaced = true;
            window.__pageScrollLocked = false;
            window.__heroAboutTimelineProgress = 1;
            tl.progress(1);
            lenis?.start();
            clearScrollLockStyles();

            const applyRestore = () => {
              const live = window.lenisInstance;
              live?.resize?.();
              live?.start?.();
              clearScrollLockStyles();
              window.__pageScrollLocked = false;
              const stored = Math.max(
                restoreY,
                lastUnlockedScroll,
                typeof window.__heroAboutLastScroll === 'number' ? window.__heroAboutLastScroll : 0,
              );
              if (scrollWasZeroed && stored > 8) {
                applyScrollY(stored);
              } else if (!scrollWasZeroed && liveY > 8) {
                applyScrollY(liveY);
              }
            };

            if (sizeChanged) {
              ScrollTrigger.refresh();
            }

            if (restoreRafId) cancelAnimationFrame(restoreRafId);
            // Refresh can settle late and wipe Y / clamp scroll — retry restore.
            restoreRafId = requestAnimationFrame(() => {
              applyRestore();
              restoreRafId = requestAnimationFrame(() => {
                applyRestore();
                restoreRafId = 0;
                window.setTimeout(applyRestore, 50);
                window.setTimeout(applyRestore, 150);
              });
            });
            return;
          }

          if (locked) {
            window.__pageScrollLocked = true;
            pinScrollTop();
            lenis?.stop();
            if (window.innerWidth < 768) {
              document.documentElement.style.overflow = 'hidden';
              document.body.style.overflow = 'hidden';
            } else {
              clearScrollLockStyles();
            }
          }

          if (sizeChanged) {
            ScrollTrigger.refresh();
          }
        };

        lockApiRef.current = { syncAfterResize };

        lockCleanupRef.current = () => {
          if (rafId) cancelAnimationFrame(rafId);
          if (restoreRafId) cancelAnimationFrame(restoreRafId);
          unsubLenisScroll?.();
          window.removeEventListener('scroll', onWindowScroll);
          window.removeEventListener('wheel', onWheel, { capture: true });
          window.removeEventListener('touchstart', onTouchStart, { capture: true });
          window.removeEventListener('touchmove', onTouchMove, { capture: true });
          window.removeEventListener('keydown', onKey, { capture: true });
          window.removeEventListener('lenisReady', onLenisReady);
          window.removeEventListener('splashComplete', onLenisReady);
          lockApiRef.current = null;
          // Keep placed/progress so the next build() (HMR / remount) can restore.
          // Full reset happens only on true unmount (separate effect).
          window.__pageScrollLocked = false;
          window.lenisInstance?.start();
          clearScrollLockStyles();
        };

        if (startPlaced) reportLockProgress(1);
        else reportLockProgress(current);
        return;
      }

      // ── Drive the timeline from scroll (pin + scrub, TSB approach) ───────
      // Mobile also pins — Lenis syncTouch is required (see SmoothScroll.js).
      // Shorter distance via mobileScrollFactor so phones finish sooner.
      window.__pageScrollLocked = false;
      window.lenisInstance?.start?.();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';

      const outer = outerRef.current;
      if (outer) {
        gsap.set(outer, {
          height: 'auto',
          position: 'relative',
          width: '100%',
          touchAction: 'pan-y',
        });
      }
      gsap.set(container, {
        position: 'relative',
        top: 'auto',
        height: '100dvh',
        maxHeight: '100dvh',
        overflow: 'hidden',
        width: '100%',
        touchAction: 'pan-y',
      });

      const panelHeight = container.offsetHeight || window.innerHeight;
      const distanceUnit = isMobile
        ? panelHeight * Math.max(0.25, Math.min(1, mobileScrollFactor))
        : panelHeight;
      const panelScrollPx = (total - 1) * distanceUnit;
      const lockScrollPx  = lockAtEnd * distanceUnit;
      const totalScrollPx = Math.max(panelScrollPx + lockScrollPx, 1);

      lastPlaced = false;
      window.__heroAboutPlaced = false;
      emitCoverProgress(0);

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
        // Snap feels sticky on touch — desktop only
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
            spacer.style.backgroundColor = '#FFFFFF';
          }
        },
      });

      const spacer = container.closest('.pin-spacer') || container.parentElement;
      if (spacer && spacer.classList.contains('pin-spacer')) {
        spacer.style.backgroundColor = '#FFFFFF';
      }

      // Refresh ScrollTrigger after setup so child animations measure correctly
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        window.dispatchEvent(new CustomEvent('scrollAnimationsReady'));
      });

    }, container);

  }, [scrub, mobileScrub, mobileScrollFactor, snapDuration, enableSnap, enableExit, ease, lockAtEnd, lockPageUntilComplete, onLockProgress]);

  useEffect(() => {
    // Small rAF delay lets Next.js finish painting before GSAP measures
    const raf = requestAnimationFrame(() => {
      build();
    });

    let resizeTimer;
    let lastW = typeof window !== 'undefined' ? window.innerWidth : 0;
    let lastH = typeof window !== 'undefined' ? window.innerHeight : 0;
    let lastScale = typeof window !== 'undefined' ? (window.visualViewport?.scale ?? 1) : 1;

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const scale = window.visualViewport?.scale ?? 1;
        const sizeChanged = w !== lastW || h !== lastH;
        const scaleChanged = Math.abs(scale - lastScale) > 0.001;
        lastW = w;
        lastH = h;
        lastScale = scale;

        // Lock mode already reads container.offsetHeight live in addProgress.
        // Always sync on resize/zoom events — visualViewport can fire without
        // layout size changes, and zoom often zeros scroll in that path.
        // syncAfterResize itself no-ops harmlessly unless scroll was disrupted.
        if (lockPageUntilComplete && lockApiRef.current) {
          lockApiRef.current.syncAfterResize({ sizeChanged: sizeChanged || scaleChanged });
          return;
        }

        // Pin path (TSB): refresh metrics + Lenis size — do not stop Lenis or
        // capture wheel. Full rebuild only when layout size actually changes.
        if (!sizeChanged && !scaleChanged) return;

        window.__pageScrollLocked = false;
        window.lenisInstance?.start?.();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        window.lenisInstance?.resize?.();

        if (sizeChanged) {
          build();
        }
        ScrollTrigger.refresh();
        window.lenisInstance?.resize?.();
      }, 150);
    };

    window.addEventListener('resize', onResize, { passive: true });
    // Pinch-zoom often updates visualViewport without a matching window resize.
    window.visualViewport?.addEventListener('resize', onResize, { passive: true });

    // Lenis boots after splash / 150ms — refresh pin metrics once it is ready
    const onLenisReady = () => {
      window.__pageScrollLocked = false;
      window.lenisInstance?.start?.();
      document.body.style.removeProperty('touch-action');
      document.documentElement.style.removeProperty('touch-action');
      ScrollTrigger.refresh();
    };
    window.addEventListener('lenisReady', onLenisReady);
    window.addEventListener('splashComplete', onLenisReady);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      window.removeEventListener('lenisReady', onLenisReady);
      window.removeEventListener('splashComplete', onLenisReady);
      lockApiRef.current = null;
      lockCleanupRef.current?.();
      lockCleanupRef.current = null;
      normalizeCleanupRef.current?.();
      normalizeCleanupRef.current = null;
      ctxRef.current?.revert();
      // Do NOT zero __heroAboutPlaced/progress here — effect re-runs (HMR /
      // dep identity) must not re-lock mid-page. True unmount resets below.
      window.__pageScrollLocked = false;
      window.lenisInstance?.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
    };
  }, [build, lockPageUntilComplete]);

  // Reset hero lock globals only when SnippScrol leaves the tree (navigation).
  useEffect(() => {
    return () => {
      window.__pageScrollLocked = false;
      window.__heroAboutPlaced = false;
      window.__heroAboutProgress = 0;
      window.__heroAboutTimelineProgress = 0;
      window.__heroAboutLastScroll = 0;
      window.__onHeroAboutProgress?.(0);
      window.lenisInstance?.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
    };
  }, []);

  // ─── Render ────────────────────────────────────────────────────────────────
  // Outer tracks scroll distance on mobile (sticky). Desktop pins the inner.
  return (
    <>
      {grain && <GrainOverlay opacity={grainOpacity} />}

      <div ref={outerRef} style={{ position: 'relative', width: '100%' }}>
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100dvh',
            maxHeight: '100dvh',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
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
                overscrollBehavior: 'auto',
                touchAction: 'pan-y',
                scrollPaddingTop: index === childArray.length - 1 ? '7rem' : undefined,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {/* Seam-cover: overlaps the compositing gap at the bottom of the
          GSAP-pinned layer. Matches About panel bg so no white hairline.
          Keep z-index low so it never paints over following sections. */}
      <div
        aria-hidden="true"
        style={{
          height:          '4px',
          marginTop:       '-4px',
          backgroundColor: '#FFFFFF',
          position:        'relative',
          zIndex:          1,
        }}
      />
    </>
  );
}
