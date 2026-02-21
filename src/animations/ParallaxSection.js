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

    // ✅ MOBILE DETECTION - Skip scroll animations on mobile for better performance
    const isMobile = window.innerWidth < 768;

    // Give DOM time to settle before creating ScrollTrigger
    const timer = setTimeout(() => {
      if (section && section.parentElement) {
        // ============ PREMIUM ENTRANCE ANIMATION ============
        // Multi-stage sophisticated reveal with refined easing
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 120%',
            end: 'top 0%',
            scrub: isMobile ? 0.5 : 1.8, // Faster on mobile for responsiveness
            markers: false,
          },
        });

        // Stage 1: Subtle transition (refined)
        entranceTl.fromTo(
          content,
          {
            opacity: 1,
          },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power1.inOut',
          },
          0
        );

        // Stage 2: Elegant scale with Y translation
        entranceTl.fromTo(
          content,
          {
            y: isMobile ? 40 : 80, // Reduced movement on mobile
            scale: 0.95,
          },
          {
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'cubic.out',
          },
          0.05
        );

        // Stage 3: Final opacity refinement for elegance
        entranceTl.fromTo(
          content,
          {
            opacity: 0.85,
          },
          {
            opacity: 1,
            duration: 0.35,
            ease: 'sine.out',
          },
          0.35
        );

        // ============ SOPHISTICATED PARALLAX MOVEMENT ============
        // ✅ DISABLED ON MOBILE - Reduces scroll jank
        if (!isMobile) {
          const movement = parallaxAmount !== null ? parallaxAmount : -16 * (index + 1);

          const parallaxTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 45%',
              end: 'bottom -25%',
              scrub: 2.2,
              markers: false,
            },
          });

          // Smooth, refined parallax drift
          parallaxTl.to(
            content,
            {
              y: movement,
              ease: 'none',
            },
            0
          );
        }

        // ============ REFINED SCALE PULSE (OPTIONAL MICRO-INTERACTION) ============
        // ✅ SIMPLIFIED ON MOBILE - Only use on desktop for better performance
        if (!isMobile) {
          // Ultra-subtle scale shift as section moves through viewport
          gsap.to(content, {
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
              onUpdate: (self) => {
                const progress = self.progress;
                // Barely perceptible: 1 at center, 0.98 at edges
                const scaleValue = 0.99 + Math.sin((progress - 0.5) * Math.PI) * 0.01;
                gsap.set(content, {
                  '--parallax-scale': scaleValue,
                });
              },
              markers: false,
            },
          });
        }

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
