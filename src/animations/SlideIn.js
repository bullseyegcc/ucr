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

    if (scrollTrigger) {
      // Scroll-triggered animation
      animationConfig.scrollTrigger = {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 0.5,
        markers: false,
      };
    }

    // Animate
    gsap.to(element, animationConfig);

    // Cleanup
    return () => {
      if (scrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === element) {
            trigger.kill();
          }
        });
      }
    };
  }, [direction, duration, delay, scrollTrigger]);

  return (
    <div 
      ref={elementRef} 
      className={className}
    >
      {children}
    </div>
  );
}
