'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1,
        prevent: (node) => {
          // Prevent smooth scroll inside certain elements if needed
          return node.classList && node.classList.contains('no-lenis');
        },
      });

      window.lenisInstance = lenis;

      // Connect Lenis to ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Support ScrollTrigger's refresh
      ScrollTrigger.addEventListener('refresh', () => lenis.scrollTo(0, { immediate: true }));

      // Use GSAP ticker to drive Lenis
      let tic;
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      return () => {
        try {
          lenis.destroy();
          delete window.lenisInstance;
          ScrollTrigger.removeEventListener('refresh', () => {});
        } catch (e) {
          console.error('Error cleaning up Lenis:', e);
        }
      };
    } catch (error) {
      console.error('Error initializing Lenis:', error);
      // Fallback: allow native scroll if Lenis fails
      document.documentElement.style.scrollBehavior = 'smooth';
      return () => {
        document.documentElement.style.scrollBehavior = 'auto';
      };
    }
  }, []);

  return null;
}
