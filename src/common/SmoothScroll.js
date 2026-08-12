'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    let unsubscribe;
    let lenis;
    let splashListener;
    let timer;
    let refreshTimer;

    const setupLenis = () => {
      lenis = new Lenis({
        smoothWheel: true,
        syncTouch: true,
        lerp: 0.08,
        autoRaf: false,
      });

      window.lenisInstance = lenis;
      window.dispatchEvent(new CustomEvent('lenisReady'));
      if (window.__pageScrollLocked) {
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

      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        window.dispatchEvent(new CustomEvent('scrollAnimationsReady'));
      }, 100);
    };

    if (window.__splashActive) {
      splashListener = () => {
        setupLenis();
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

  return null;
}
