'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroHeading({ children, className = '', delay = 0 }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ctx;
    let cancelled = false;
    let splashListener;

    const play = (startDelay) => {
      if (cancelled || !wrapperRef.current) return;
      ctx = gsap.context(() => {
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
            delay: startDelay,
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
    };

    const startAfterSplashOrDelay = () => {
      if (window.__splashActive) {
        splashListener = () => {
          window.removeEventListener('splashComplete', splashListener);
          splashListener = null;
          play(0.15);
        };
        window.addEventListener('splashComplete', splashListener);
        return;
      }
      const isMobile = window.innerWidth < 768;
      play(isMobile ? Math.min(delay, 0.35) : delay);
    };

    // One frame lets SplashOverlay claim __splashActive during its render
    const raf = requestAnimationFrame(startAfterSplashOrDelay);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (splashListener) {
        window.removeEventListener('splashComplete', splashListener);
      }
      ctx?.revert();
    };
  }, [delay]);

  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col items-center pointer-events-none px-4
                  justify-start pt-[42%] md:justify-center md:pt-0 ${className}`}
    >
      <div
        ref={wrapperRef}
        className="flex flex-wrap justify-center gap-x-[0.35em] gap-y-2 font-primary mt-8 sm:mt-12 lg:mt-16
                   font-[550] text-[32px] leading-[52px] tracking-[-1.18px] lg:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white
                   select-none"
        style={{ willChange: 'transform, opacity, filter, letter-spacing', opacity: 0 }}
      >
        {children}
      </div>
    </div>
  );
}
