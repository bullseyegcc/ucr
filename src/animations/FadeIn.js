'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FadeIn({ 
  children, 
  className = '', 
  delay = 0,
  duration = 1.2,
  y = 50,
  blur = true,
  stagger = 0
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: y,
      filter: blur ? 'blur(8px)' : 'blur(0px)',
    });

    // Create scroll-triggered fade-in animation
    gsap.to(element, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: duration,
      delay: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'top 60%',
        scrub: 0.8,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, y, blur]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
