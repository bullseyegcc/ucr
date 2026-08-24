'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function HorizontalScrollGallery({ images = [] }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const tweenRef = useRef(null);

  const defaultImages = ['/home/slide1.png', '/home/slide2.png', '/home/slide3.png'];
  const imgs = images.length > 0 ? images : defaultImages;
  // Duplicate for seamless infinite loop
  const loopImgs = [...imgs, ...imgs];

  // Track whether we are on mobile so we can enable touch scroll snapping there
  const [isMobile, setIsMobile] = useState(false);

  // We'll handle desktop continuous animation via a CSS keyframes animation
  useEffect(() => {
    let styleEl = null;
    const inner = innerRef.current;
    const wrapper = wrapperRef.current;
    if (!inner || !wrapper) return;

    const singleSetWidth = inner.scrollWidth / 2;
    const duration = Math.max(8, imgs.length * 4); // sensible minimum duration

    const animName = `hsg-scroll-${Date.now()}`;

    const applyAnimation = () => {
      // create keyframes rule
      styleEl = document.createElement('style');
      styleEl.dataset.hsg = animName;
      styleEl.innerHTML = `@keyframes ${animName} { from { transform: translateX(0); } to { transform: translateX(-${singleSetWidth}px); } }`;
      document.head.appendChild(styleEl);

      // apply to inner track when not mobile
      if (!isMobile) {
        inner.style.willChange = 'transform';
        inner.style.animation = `${animName} ${duration}s linear infinite`;
      } else {
        inner.style.animation = '';
      }
    };

    applyAnimation();

    const onResize = () => {
      // recompute width and reapply animation on resize
      const newSingle = inner.scrollWidth / 2;
      if (styleEl) document.head.removeChild(styleEl);
      styleEl = document.createElement('style');
      styleEl.dataset.hsg = animName;
      styleEl.innerHTML = `@keyframes ${animName} { from { transform: translateX(0); } to { transform: translateX(-${newSingle}px); } }`;
      document.head.appendChild(styleEl);
      if (!isMobile) {
        inner.style.animation = `${animName} ${duration}s linear infinite`;
      } else {
        inner.style.animation = '';
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
      if (inner) inner.style.animation = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgs.length, isMobile]);

  useEffect(() => {
    const onResize = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Pause or resume the tween when the viewport switches between mobile/desktop
  useEffect(() => {
    if (!tweenRef.current) return;
    tweenRef.current.paused(isMobile);
  }, [isMobile]);

  // mobile navigation state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update index on manual scroll (mobile)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const onScroll = () => {
      // Derive current index by dividing scrollLeft by child width
      const child = innerRef.current?.children[0];
      if (!child) return;
      const childWidth = child.offsetWidth + 16; // gap
      const idx = Math.round(wrapper.scrollLeft / childWidth) % imgs.length;
      setCurrentIndex((idx + imgs.length) % imgs.length);
    };
    // Only attach on mobile
    if (isMobile && typeof wrapper.addEventListener === 'function') {
      wrapper.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => wrapper.removeEventListener('scroll', onScroll);
  }, [imgs.length]);

  // helper to scroll to slide (mobile)
  const scrollToIndex = (idx) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const child = innerRef.current?.children[0];
    if (!child) return;
    const childWidth = child.offsetWidth + 16; // gap
    wrapper.scrollTo({ left: idx * childWidth, behavior: 'smooth' });
    setCurrentIndex(idx % imgs.length);
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem] relative flex flex-col items-center justify-center lg:flex-row bg-white overflow-hidden">
      {/* Left blur overlay - premium smooth blur */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-4 md:w-14 z-20"
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
        className="pointer-events-none absolute right-0 top-0 h-full w-4 md:w-14 z-20"
        style={{
          background: 'linear-gradient(to left, rgba(255,255,255,1) 40%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.1) 100%)',
          WebkitBackdropFilter: 'blur(18px)',
          backdropFilter: 'blur(18px)',
          boxShadow: '-8px 0 32px 0 rgba(180,180,180,0.10)',
          transition: 'backdrop-filter 0.3s',
        }}
      />
      <div ref={wrapperRef} className={`w-full relative lg:overflow-hidden ${isMobile ? 'overflow-x-auto' : 'overflow-hidden'}`}>
        <div className={`w-full overflow-visible`}> 
          <div ref={innerRef} className={`flex gap-4 will-change-transform lg:gap-8 ${isMobile ? 'snap-x snap-mandatory touch-pan-x' : ''}`} style={{ alignItems: 'stretch' }}>
            {loopImgs.map((image, index) => {
              const isWide = index % imgs.length === 1;
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 ${isMobile ? 'snap-start' : ''} ${isWide ? 'w-[320px] lg:w-[900px]' : 'w-[280px] lg:w-[600px]'} h-[220px] sm:h-[320px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg`}
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
      </div>
      {/* Mobile navigation controls (centered below images) */}
      <div className="mt-4 flex items-center gap-3 justify-center w-full lg:hidden z-30">
        <button
          onClick={() => scrollToIndex((currentIndex - 1 + imgs.length) % imgs.length)}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-[#FA6E43] text-[#FA6E43] bg-white shadow-sm"
          aria-label="Previous"
        >
          <span className="text-sm">‹</span>
        </button>
        <button
          onClick={() => scrollToIndex((currentIndex + 1) % imgs.length)}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-300 text-gray-400 bg-white shadow-sm"
          aria-label="Next"
        >
          <span className="text-sm">›</span>
        </button>
      </div>
    </div>
  );
}

