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

    // Ensure document can scroll
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    let unsubscribe;
    let lenis;

    const setupLenis = () => {
      lenis = new Lenis({
        smoothWheel: true,
        syncTouch: true,
        lerp: 0.1,
        autoRaf: false,
      });

      window.lenisInstance = lenis;

      // Connect with GSAP ticker
      unsubscribe = gsap.ticker.add((time) => {
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

    // Start after page layout
    const timer = setTimeout(setupLenis, 150);

    return () => {
      clearTimeout(timer);
      if (unsubscribe) unsubscribe();
      if (lenis) {
        lenis.destroy();
        delete window.lenisInstance;
      }
    };
  }, []);

  return null;
}






