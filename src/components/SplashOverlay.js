'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplashOverlay() {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    // Only show splash on homepage
    if (!isHomepage) {
      gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
      return;
    }

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
  }, [isHomepage]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-[#FE5D0A] z-[9999] flex items-center justify-center"
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
          src="/logo.png"
          alt="UCR Logo"
          width={2000}
          height={2000}
          className="w-32 h-32 md:w-40 md:h-40 object-contain"
        />
      </div>
    </div>
  );
}
