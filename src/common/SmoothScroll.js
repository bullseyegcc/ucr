'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis must run on mobile too — GSAP pin/scrub (SnippScrol) freezes native
 * touch scroll without a JS scroll driver. TSB keeps Lenis on all breakpoints.
 */
function syncScrollMetrics() {
  if (typeof window === 'undefined') return;
  window.lenisInstance?.resize?.();
  ScrollTrigger.refresh();
  window.dispatchEvent(new CustomEvent('scrollAnimationsReady'));
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let unsubscribe;
    let lenis;
    let splashListener;
    let timer;
    let refreshTimer;

    const setupLenis = () => {
      if (lenis) return;

      const isMobile = window.innerWidth < 768;

      document.documentElement.style.scrollBehavior = 'auto';

      lenis = new Lenis({
        smoothWheel: true,
        syncTouch: true,
        // Slightly snappier touch tracking on phones
        syncTouchLerp: isMobile ? 0.14 : 0.1,
        touchMultiplier: isMobile ? 1.15 : 1,
        lerp: isMobile ? 0.12 : 0.08,
        autoRaf: false,
      });

      window.lenisInstance = lenis;
      window.dispatchEvent(new CustomEvent('lenisReady'));
      if (window.__splashActive || window.__pageScrollLocked) {
        lenis.stop();
      }

      // Lenis 1.x drives native window scroll — do not use scrollerProxy.
      // Proxying scrollTop through lenis.scrollTo({ immediate: true }) kills
      // wheel momentum every time ScrollTrigger pins or unpins.
      const onTicker = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTicker);
      unsubscribe = () => gsap.ticker.remove(onTicker);

      gsap.ticker.lagSmoothing(0);

      lenis.on('scroll', ScrollTrigger.update);

      refreshTimer = setTimeout(syncScrollMetrics, 100);
    };

    if (window.__splashActive) {
      splashListener = () => {
        setupLenis();
        window.lenisInstance?.start?.();
        window.removeEventListener('splashComplete', splashListener);
      };
      window.addEventListener('splashComplete', splashListener);
    } else {
      timer = setTimeout(setupLenis, 150);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (refreshTimer) clearTimeout(refreshTimer);
      if (unsubscribe) unsubscribe();
      if (lenis) {
        lenis.destroy();
        delete window.lenisInstance;
      }
      if (splashListener) {
        window.removeEventListener('splashComplete', splashListener);
      }
    };
  }, []);

  // Client navigations skip Lenis boot, so ScrollTrigger keeps stale start/end
  // and entrance animations stay at opacity 0 until a full reload.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.__pageScrollLocked = false;
    const lenis = window.lenisInstance;
    lenis?.start?.();
    if (!window.location.hash) {
      lenis?.scrollTo(0, { immediate: true });
    }

    let cancelled = false;
    const sync = () => {
      if (cancelled) return;
      syncScrollMetrics();
    };

    const raf = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(sync);
    });
    const later = window.setTimeout(sync, 280);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(later);
    };
  }, [pathname]);

  return null;
}
