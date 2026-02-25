'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroHeading({ children, className = '', delay = 0 }) {
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
          delay,
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
      className={`absolute inset-0 flex flex-col items-center justify-center md:justify-start z-10 pointer-events-none px-4 ${className}`}
    >
      <div
        ref={wrapperRef}
        className="flex flex-wrap justify-center lg:pt-60 gap-x-[0.35em] gap-y-2
                   font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white
                   select-none"
        style={{ willChange: 'transform, opacity, filter, letter-spacing', opacity: 0 }}
      >
        {children}
      </div>
    </div>
  );
}

