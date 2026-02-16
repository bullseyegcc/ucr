'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplashOverlay() {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    // Only run animation on first load
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    const timer = setTimeout(() => {
      // Create timeline for initial splash animation
      const splashTl = gsap.timeline();

      // Logo entrance animation
      splashTl.fromTo(
        logo,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 2,
          duration: 0.5,
          ease: 'cubic.inOut',
        },
        0
      );

      // Auto-play reveal animation after logo entrance
      splashTl.to(
        logo,
        {
          scale: 6,
          opacity: 0,
          duration: 2.5,
          ease: 'power2.inOut',
        },
        0.5
      );

      // Overlay fade out animation
      splashTl.to(
        overlay,
        {
          opacity: 0,
          duration: 2.5,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
          },
        },
        0.5
      );

      // Prevent scroll during the entire animation
      document.body.style.overflow = 'hidden';
      
      const preventScroll = (e) => {
        if (splashTl.progress() < 1) {
          e.preventDefault();
        } else {
          document.body.style.overflow = 'auto';
          removeScrollListeners();
        }
      };

      const removeScrollListeners = () => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
      };

      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
      style={{
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <div
        ref={logoRef}
        className="will-change-transform"
        style={{
          transformOrigin: 'center center',
        }}
      >
        <Image
          src="/anilogo.png"
          alt="UCR Logo"
          width={120}
          height={120}
          className="w-32 h-32 md:w-40 md:h-40 object-contain"
        />
      </div>
    </div>
  );
}
