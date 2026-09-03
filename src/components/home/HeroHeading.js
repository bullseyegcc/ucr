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
      className={`absolute inset-0 z-10 flex flex-col items-center pointer-events-none px-2 sm:px-4
                  justify-start pt-[52%] md:justify-center md:pt-0 ${className}`}
    >
      <div
        ref={wrapperRef}
        className="font-primary mt-8 w-full whitespace-nowrap text-center capitalize text-white select-none
                   font-[550] text-[clamp(1.125rem,7.6vw,2rem)] leading-none tracking-[-0.05em]
                   sm:mt-12 sm:text-[32px] sm:leading-[52px] sm:tracking-[-1.18px]
                   lg:mt-16 lg:text-[64px] lg:leading-[99px] lg:tracking-[-2.5px]"
        style={{ willChange: 'transform, opacity, filter, letter-spacing', opacity: 0 }}
      >
        {children}
      </div>
    </div>
  );
}
