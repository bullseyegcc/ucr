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

    // Give DOM time to settle before creating ScrollTrigger
    const timer = setTimeout(() => {
      if (section && section.parentElement) {
        // Main entry animation with premium easing
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 110%',
            end: 'top 10%',
            scrub: 2.5,
            markers: false,
          },
        });

        // Complex scale animation for premium feel
        entranceTl.fromTo(
          content,
          {
            y: 100,
            scale: 0.98,
            opacity: 0.95,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: 'power1.inOut',
          },
          0
        );

        // Subtle blur effect animation via GSAP
        entranceTl.fromTo(
          content,
          {
            filter: 'blur(2px)',
          },
          {
            filter: 'blur(0px)',
            ease: 'power2.inOut',
          },
          0
        );

        // Calculate parallax movement
        const movement = parallaxAmount !== null ? parallaxAmount : -12 * (index + 1);

        // Parallax drift effect - continues throughout scroll
        gsap.to(content, {
          y: movement,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom -20%',
            scrub: 2.5,
            markers: false,
          },
        });

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
  }, [index]);

  return (
    <div 
      ref={sectionRef}
      style={{ 
        zIndex: 10 + index,
      }}
      className="relative w-full"
    >
      <div 
        ref={contentRef}
        className="will-change-transform origin-top"
      >
        {children}
      </div>
    </div>
  );
}
