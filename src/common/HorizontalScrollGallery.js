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
    <div className="w-full h-screen flex items-center justify-center bg-white overflow-hidden">
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

