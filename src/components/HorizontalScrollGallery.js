'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollGallery({ images = [] }) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollVelocity = useRef(0);
  const lastScrollPos = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    // Calculate total scroll distance needed
    const totalWidth = wrapper.scrollWidth;
    const containerWidth = container.clientWidth;
    const scrollDistance = totalWidth - containerWidth;

    // Create scroll trigger for horizontal scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: `+=${scrollDistance * 2}`,
      onUpdate: (self) => {
        setIsScrolling(true);
        // Convert vertical scroll progress to horizontal position
        const xPercent = -self.getVelocity() * 0.05;
        
        gsap.to(wrapper, {
          x: -scrollDistance * self.progress,
          duration: 0.8,
          ease: 'sine.out',
          overwrite: 'auto',
        });
      },
    });

    // Handle wheel events for enhanced control
    const handleWheel = (e) => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isInView) return;

      e.preventDefault();
      
      // Get current scroll position
      const current = gsap.getProperty(wrapper, 'x');
      const delta = e.deltaY > 0 ? scrollDistance * 0.1 : -(scrollDistance * 0.1);
      const newPosition = Math.max(-scrollDistance, Math.min(0, current - delta));

      gsap.to(wrapper, {
        x: newPosition,
        duration: 0.6,
        ease: 'sine.out',
        overwrite: 'auto',
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
      scrollTrigger.kill();
    };
  }, [images.length]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <div
        ref={wrapperRef}
        className="flex gap-8 will-change-transform"
        style={{
          width: `${(images.length || 3) * 600}px`,
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[500px] h-[400px] md:w-[600px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                width={600}
                height={500}
                className="w-full h-full object-cover"
                quality={95}
              />
            </div>
          ))
        ) : (
          // Default images
          <>
            <div className="flex-shrink-0 w-[500px] h-[400px] md:w-[600px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/slide1.png"
                alt="Product 1"
                width={600}
                height={500}
                className="w-full h-full object-cover"
                quality={95}
              />
            </div>
            <div className="flex-shrink-0 w-[900px] h-[400px] md:w-[900px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/slide2.png"
                alt="Product 2"
                width={900}
                height={500}
                className="w-full h-full object-cover"
                quality={95}
              />
            </div>
            <div className="flex-shrink-0 w-[500px] h-[400px] md:w-[600px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/slide3.png"
                alt="Product 3"
                width={600}
                height={500}
                className="w-full h-full object-cover"
                quality={95}
              />
            </div>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-gray-600 text-sm font-medium">Scroll horizontally</p>
        <svg
          className="w-6 h-6 text-primary transform rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
