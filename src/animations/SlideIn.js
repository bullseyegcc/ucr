'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SlideIn({ 
  children, 
  className = '', 
  direction = 'left',
  duration = 2.2,
  delay = 0.1,
  scrollTrigger = false,
  triggerOnScroll = false,
  exist = false,
  exit = false,
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Step 1 & 3: Detect mobile and reduced motion
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Determine initial transform based on direction and mobile
    const getInitialTransform = () => {
      if (isMobile) {
        switch(direction) {
          case 'left': return { x: -30, y: 0 };
          case 'right': return { x: 30, y: 0 };
          case 'top': return { x: 0, y: -30 };
          case 'bottom': return { x: 0, y: 30 };
          default: return { x: -30, y: 0 };
        }
      } else {
        switch(direction) {
          case 'left': return { x: -100, y: 0 };
          case 'right': return { x: 100, y: 0 };
          case 'top': return { x: 0, y: -100 };
          case 'bottom': return { x: 0, y: 100 };
          default: return { x: -100, y: 0 };
        }
      }
    };

    const initialTransform = getInitialTransform();

    // Step 2: Respect reduced motion
    if (prefersReduced) {
      gsap.set(element, { x: 0, y: 0, opacity: 1, scale: 1, willChange: 'auto' });
      return;
    }

    // Set initial state
    gsap.set(element, {
      x: initialTransform.x,
      y: initialTransform.y,
      opacity: 0,
      scale: isMobile ? 0.97 : 0.95,
      willChange: 'transform, opacity',
    });

    const useScrollTrigger = triggerOnScroll || scrollTrigger;
    const exitOnScroll = exist || exit;

    // Create animation configuration
    const animDuration = isMobile ? Math.min(duration * 0.4, 0.9) : duration;
    const animScale = isMobile ? 0.97 : 0.95;
    let animScrub;
    if (exitOnScroll) {
      animScrub = isMobile ? 0.2 : 0.5;
    } else {
      animScrub = isMobile ? false : 0.5;
    }
    const animStart = isMobile ? 'top 95%' : 'top 85%';
    const animEnd = isMobile ? (exitOnScroll ? 'bottom 25%' : 'top 65%') : (exitOnScroll ? 'bottom 15%' : 'top 50%');

    const animationConfig = {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      duration: animDuration,
      delay: delay,
      ease: 'power1.inOut',
      clearProps: 'will-change',
    };

    const scrollConfig = {
      trigger: element,
      start: animStart,
      end: animEnd,
      scrub: animScrub,
      markers: false,
    };

    let tween;
    let timeline;

    if (useScrollTrigger) {
      if (exitOnScroll) {
        timeline = gsap.timeline({ scrollTrigger: scrollConfig });
        timeline.to(element, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: animDuration,
          ease: 'power1.inOut',
        });
        // Exit slide uses same mobile offset logic
        const exitTransform = getInitialTransform();
        timeline.to(element, {
          x: exitTransform.x,
          y: exitTransform.y,
          opacity: 0,
          scale: animScale,
          duration: animDuration,
          ease: 'power1.inOut',
          clearProps: 'will-change',
        });
      } else {
        tween = gsap.to(element, { ...animationConfig, scrollTrigger: scrollConfig });
      }
    } else {
      tween = gsap.to(element, animationConfig);
    }

    // Cleanup
    return () => {
      if (tween) tween.kill();
      if (timeline) timeline.kill();
      if (useScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === element) {
            trigger.kill();
          }
        });
      }
    };
  }, [direction, duration, delay, scrollTrigger, triggerOnScroll, exist, exit]);

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
