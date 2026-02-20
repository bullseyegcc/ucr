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

    // Determine initial transform based on direction
    const getInitialTransform = () => {
      switch(direction) {
        case 'left':
          return { x: -100, y: 0 };
        case 'right':
          return { x: 100, y: 0 };
        case 'top':
          return { x: 0, y: -100 };
        case 'bottom':
          return { x: 0, y: 100 };
        default:
          return { x: -100, y: 0 };
      }
    };

    const initialTransform = getInitialTransform();

    // Set initial state
    gsap.set(element, {
      x: initialTransform.x,
      y: initialTransform.y,
      opacity: 0,
      scale: 0.95,
      willChange: 'transform, opacity',
    });

    const useScrollTrigger = triggerOnScroll || scrollTrigger;
    const exitOnScroll = exist || exit;

    // Create animation configuration
    const animationConfig = {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      duration: duration,
      delay: delay,
      ease: 'power1.inOut',
      clearProps: 'will-change',
    };

    const scrollConfig = {
      trigger: element,
      start: 'top 85%',
      end: exitOnScroll ? 'bottom 15%' : 'top 50%',
      scrub: 0.5,
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
          duration: duration,
          ease: 'power1.inOut',
        });
        timeline.to(element, {
          x: initialTransform.x,
          y: initialTransform.y,
          opacity: 0,
          scale: 0.95,
          duration: duration,
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
