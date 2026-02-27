'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRevealCard({ 
  children, 
  className = '', 
  index = 0,
  duration = 1.2,
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Step 1 & 3: Detect mobile and reduced motion
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Step 2: Respect reduced motion
    if (prefersReduced) {
      gsap.set(element, { y: 0, opacity: 1, scale: 1, willChange: 'auto' });
      return;
    }

    // Set initial state
    gsap.set(element, {
      y: isMobile ? 60 : 120,
      opacity: 0,
      scale: 0.95,
      willChange: 'transform, opacity',
    });

    // Create animation configuration for mobile vs desktop
    const animDuration = isMobile ? Math.min(duration * 0.6, 0.7) : duration;

    const animationConfig = {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: animDuration,
      delay: index * 0.2,
      ease: 'power2.inOut',
      clearProps: 'will-change',
    };

    const scrollConfig = {
      trigger: element,
      start: 'top 85%',
      end: 'top 85%',
      markers: false,
    };

    // Create animation with ScrollTrigger (one-shot trigger, no scroll-linking)
    gsap.to(element, {
      ...animationConfig,
      scrollTrigger: scrollConfig,
    });

    // Cleanup function
    return () => {
      const tweens = gsap.getTweensOf(element);
      tweens.forEach((tween) => tween.kill());
      
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [index, duration]);

  return (
    <div 
      ref={elementRef} 
      className={className} 
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
