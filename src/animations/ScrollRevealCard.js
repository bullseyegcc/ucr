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

    // Detect mobile and reduced motion
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Respect reduced motion
    if (prefersReduced) {
      gsap.set(element, { y: 0, opacity: 1, scale: 1, willChange: 'auto' });
      return;
    }

    // Set initial state
    gsap.set(element, {
      y: isMobile ? 30 : 60,
      opacity: 0,
      scale: 0.95,
      willChange: 'transform, opacity',
    });

    // Create timeline with scroll trigger (similar to MissionValuesSection)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.8,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });

    // Animate from initial state to final state
    tl.to(element, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.inOut',
      delay: index * 0.15,
      clearProps: 'will-change',
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
