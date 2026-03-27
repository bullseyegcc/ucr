'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRevealCardsContainer({
  children,
  className = '',
  containerClassName = '',
  pinOnMobile = false,
  scrub = 2,
  staggerDelay = 0.3,
  mobileDuration = 0.8,
  mobileStaggerDelay = 0.15,
  pin = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Step 1: Detect mobile and reduced motion
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Get all direct child card elements from the inner container
    const innerContainer = container.querySelector('div');
    if (!innerContainer) return;

    const cards = Array.from(innerContainer.children);

    // Create gsap context for scoped cleanup
    const ctx = gsap.context(() => {
      // Step 2: Respect reduced motion
      if (prefersReduced) {
        cards.forEach((card) => {
          gsap.set(card, { y: 0, opacity: 1, scale: 1, willChange: 'auto' });
        });
        return;
      }

      // Set initial state on all cards
      cards.forEach((card) => {
        gsap.set(card, {
          y: isMobile ? 100 : 200,
          opacity: 0,
          scale: 0.95,
          willChange: 'transform, opacity',
        });
      });

      // Delay before creating timeline (shorter on mobile)
      const initialDelay = isMobile ? 100 : 150;
      const timer = setTimeout(() => {
        // Mobile-optimized trigger points
        const shouldPin = isMobile ? false : pin;

        // ── No-pin path: use GSAP callbacks for enter + exit ──────────────────
        if (!shouldPin) {
          const effectiveStaggerDelay = isMobile ? mobileStaggerDelay : staggerDelay;
          const effectiveDuration = isMobile ? mobileDuration : 0.8;

          ScrollTrigger.create({
            trigger: container,
            start: 'top 85%',
            end: 'bottom 15%',
            onEnter: () => {
              cards.forEach((card, i) => {
                gsap.to(card, {
                  y: 0, opacity: 1, scale: 1,
                  duration: effectiveDuration,
                  delay: i * effectiveStaggerDelay,
                  ease: 'power2.out',
                });
              });
            },
            onLeave: () => {
              cards.forEach((card, i) => {
                gsap.to(card, {
                  y: -60, opacity: 0, scale: 0.96,
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: 'power2.in',
                });
              });
            },
            onEnterBack: () => {
              cards.forEach((card, i) => {
                gsap.to(card, {
                  y: 0, opacity: 1, scale: 1,
                  duration: effectiveDuration,
                  delay: i * effectiveStaggerDelay,
                  ease: 'power2.out',
                });
              });
            },
            onLeaveBack: () => {
              cards.forEach((card, i) => {
                gsap.to(card, {
                  y: 80, opacity: 0, scale: 0.96,
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: 'power2.in',
                });
              });
            },
          });

          ScrollTrigger.refresh();
          return;
        }

        // ── Pinned path (original scrub-driven timeline) ───────────────────────
        const triggerConfig = {
          trigger: container,
          start: isMobile ? 'top 95%' : 'center center',
          end: isMobile ? 'bottom 30%' : 'bottom center',
          scrub: (isMobile && !pinOnMobile) ? false : scrub,
          pin: shouldPin,
          pinSpacing: shouldPin,
          markers: false,
        };

        // Use mobile-optimized values on mobile devices
        const effectiveStaggerDelay = isMobile ? mobileStaggerDelay : staggerDelay;
        const effectiveDuration = isMobile ? mobileDuration : 1.2;

        // Calculate total timeline duration based on cards and stagger
        const totalDuration = (cards.length - 1) * effectiveStaggerDelay + effectiveDuration;

        const tl = gsap.timeline({ scrollTrigger: triggerConfig });

        cards.forEach((card, index) => {
          tl.fromTo(
            card,
            { y: isMobile ? 100 : 200, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: effectiveDuration, ease: 'power2.inOut' },
            index * effectiveStaggerDelay
          );
        });

        tl.duration(totalDuration);

        ScrollTrigger.refresh();
      }, initialDelay);

      return () => clearTimeout(timer);
    }, containerRef);

    // Cleanup function - only revert animations created within this context
    return () => {
      ctx.revert();
    };
  }, [pinOnMobile, scrub, staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      <div className={containerClassName}>{children}</div>
    </div>
  );
}
