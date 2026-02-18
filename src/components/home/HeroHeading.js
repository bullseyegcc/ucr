'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroHeading({ children, className = '' }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        wrapperRef.current,
        { y: '40px', opacity: 0, filter: 'blur(12px)', letterSpacing: '0.28em' },
        {
          y: '0px',
          opacity: 1,
          filter: 'blur(0px)',
          letterSpacing: '0.01em',
          duration: 1.2,
          ease: 'expo.out',
        }
      );

      tl.to(
        wrapperRef.current,
        {
          scale: 1.018,
          duration: 3.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        },
        '+=0.2'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4 ${className}`}
    >
      <div
        ref={wrapperRef}
        className="flex flex-wrap justify-center gap-x-[0.35em] gap-y-2
                   text-3xl md:text-5xl lg:text-7xl text-white font-semibold text-center
                   select-none"
        style={{ willChange: 'transform, opacity, filter, letter-spacing', opacity: 0 }}
      >
        {children}
      </div>
    </div>
  );
}

