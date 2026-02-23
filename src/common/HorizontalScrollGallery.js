'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HorizontalScrollGallery({ images = [] }) {
  const wrapperRef = useRef(null);
  const tweenRef = useRef(null);

  const defaultImages = ['/slide1.png', '/slide2.png', '/slide3.png'];
  const imgs = images.length > 0 ? images : defaultImages;
  // Duplicate for seamless infinite loop
  const loopImgs = [...imgs, ...imgs];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Width of one full set of images
    const singleSetWidth = wrapper.scrollWidth / 2;

    gsap.set(wrapper, { x: 0 });

    // Pause auto-scroll on mobile for touch control, enable on desktop
    const isMobile = window.innerWidth < 768;

    tweenRef.current = gsap.fromTo(
      wrapper,
      { x: 0 },
      {
        x: -singleSetWidth,
        duration: imgs.length * 4,
        ease: 'none',
        repeat: -1,
        paused: isMobile, // paused on mobile, playing on desktop
      }
    );

    return () => tweenRef.current?.kill();
  }, [imgs.length]);

  return (
    <div className="w-full relative flex items-center justify-center bg-white overflow-hidden">
      {/* Left blur overlay - premium smooth blur */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-32 md:w-14 z-20"
        style={{
          background: 'linear-gradient(to right, rgba(255,255,255,1) 40%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.1) 100%)',
          WebkitBackdropFilter: 'blur(18px)',
          backdropFilter: 'blur(18px)',
          boxShadow: '8px 0 32px 0 rgba(180,180,180,0.10)',
          transition: 'backdrop-filter 0.3s',
        }}
      />
      {/* Right blur overlay - premium smooth blur */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-32 md:w-14 z-20"
        style={{
          background: 'linear-gradient(to left, rgba(255,255,255,1) 40%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.1) 100%)',
          WebkitBackdropFilter: 'blur(18px)',
          backdropFilter: 'blur(18px)',
          boxShadow: '-8px 0 32px 0 rgba(180,180,180,0.10)',
          transition: 'backdrop-filter 0.3s',
        }}
      />
      <div
        ref={wrapperRef}
        className="flex gap-8 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {loopImgs.map((image, index) => {
          const isWide = index % imgs.length === 1;
          return (
            <div
              key={index}
              className={`flex-shrink-0 ${isWide ? 'w-[900px]' : 'w-[500px] lg:w-[600px]'} h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg`}
            >
              <Image
                src={image}
                alt={`Slide ${(index % imgs.length) + 1}`}
                width={900}
                height={500}
                className="w-full h-full object-cover"
                quality={95}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

