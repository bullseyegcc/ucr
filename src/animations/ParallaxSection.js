'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection({ children, index = 0, parallaxAmount = null }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Skip parallax transforms on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Give DOM time to settle before creating ScrollTrigger
    const timer = setTimeout(() => {
      if (section && section.parentElement) {
        // ============ ENTRANCE ANIMATION ============
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 120%',
            end: 'top 0%',
            scrub: 1.4,
            markers: false,
          },
        });

        entranceTl.fromTo(
          content,
          {
            y: 36,
            scale: 0.985,
          },
          {
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'cubic.out',
          },
          0
        );

        // ============ PARALLAX DRIFT ============
        // Default ~half prior intensity; callers can override via parallaxAmount
        const movement = parallaxAmount !== null ? parallaxAmount : -7 * (index + 1);

        const parallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'bottom top',
            scrub: 1.6,
            markers: false,
          },
        });

        parallaxTl.to(
          content,
          {
            y: movement,
            ease: 'none',
          },
          0
        );

        ScrollTrigger.refresh();
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [index, parallaxAmount]);

  return (
    <div 
      ref={sectionRef}
      style={{ 
        zIndex: 10 + index,
        backgroundColor: 'white',
      }}
      className="relative w-full overflow-hidden"
    >
      <div 
        ref={contentRef}
        className="will-change-transform origin-center"
        style={{
          transform: 'scale(var(--parallax-scale, 1))',
        }}
      >
        {children}
      </div>
    </div>
  );
}
