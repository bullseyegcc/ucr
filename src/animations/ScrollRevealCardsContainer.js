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
        const triggerConfig = {
          trigger: container,
          start: isMobile ? 'top 95%' : 'center center',
          end: isMobile ? 'bottom 30%' : 'bottom center',
          scrub: isMobile && !pinOnMobile ? false : scrub,
          pin: isMobile ? false : true,
          pinSpacing: true,
          markers: false,
        };

        // Use mobile-optimized values on mobile devices
        const effectiveStaggerDelay = isMobile ? mobileStaggerDelay : staggerDelay;
        const effectiveDuration = isMobile ? mobileDuration : 1.2;

        // Calculate total timeline duration based on cards and stagger
        // Formula: (number of cards - 1) * stagger + duration of last card
        const totalDuration = (cards.length - 1) * effectiveStaggerDelay + effectiveDuration;

        // Create timeline with scroll lock
        const tl = gsap.timeline({
          scrollTrigger: triggerConfig,
        });

        // Add sequential card animations to timeline
        // Each card's position in timeline is tied to scroll progress
        cards.forEach((card, index) => {
          tl.fromTo(
            card,
            {
              y: isMobile ? 100 : 200,
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: effectiveDuration,
              ease: 'power2.inOut',
            },
            index * effectiveStaggerDelay // Position in timeline, tied to scroll
          );
        });

        // Set total duration to control scroll-to-animation mapping
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
