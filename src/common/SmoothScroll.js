'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Mobile: native smooth scroll
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    let unsubscribe;
    let lenis;
    let splashListener;
    let timer;

    const setupLenis = () => {
      lenis = new Lenis({
        smoothWheel: true,
        syncTouch: true,
        lerp: 0.1,
        autoRaf: false,
      });

      window.lenisInstance = lenis;

      // Connect with GSAP ticker
      unsubscribe = () => gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      // Disable GSAP lag smoothing
      gsap.ticker.lagSmoothing(0);

      // Monitor scroll
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Refresh ScrollTrigger
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    };

    // Step 4: Coordinate Lenis initialization
    if (window.__splashActive) {
      // Splash is running, wait for splashComplete event
      splashListener = () => {
        setupLenis();
        window.removeEventListener('splashComplete', splashListener);
      };
      window.addEventListener('splashComplete', splashListener);
    } else {
      // No splash, start as usual
      timer = setTimeout(setupLenis, 150);
    }

    return () => {
      if (timer) clearTimeout(timer);
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






