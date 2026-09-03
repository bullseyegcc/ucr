'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const MOBILE_SLIDE_CLASS = 'w-[min(88vw,380px)]';
const MOBILE_SPACER_CLASS =
  'w-[max(0px,calc((100vw-min(88vw,380px))/2))] shrink-0 grow-0 basis-auto';

export default function HorizontalScrollGallery({ images = [] }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  const defaultImages = ['/home/slide1.png', '/home/slide2.png', '/home/slide3.png'];
  const imgs = images.length > 0 ? images : defaultImages;
  const middleIndex = Math.floor(imgs.length / 2);

  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(middleIndex);

  const atStart = currentIndex <= 0;
  const atEnd = currentIndex >= imgs.length - 1;

  useEffect(() => {
    const onResize = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Desktop continuous marquee (duplicated track)
  useEffect(() => {
    if (isMobile) return;

    let styleEl = null;
    const inner = innerRef.current;
    if (!inner) return;

    const singleSetWidth = inner.scrollWidth / 2;
    const duration = Math.max(8, imgs.length * 4);
    const animName = `hsg-scroll-${Date.now()}`;

    styleEl = document.createElement('style');
    styleEl.dataset.hsg = animName;
    styleEl.innerHTML = `@keyframes ${animName} { from { transform: translateX(0); } to { transform: translateX(-${singleSetWidth}px); } }`;
    document.head.appendChild(styleEl);

    inner.style.willChange = 'transform';
    inner.style.animation = `${animName} ${duration}s linear infinite`;

    const onResize = () => {
      const newSingle = inner.scrollWidth / 2;
      if (styleEl?.parentNode) styleEl.parentNode.removeChild(styleEl);
      styleEl = document.createElement('style');
      styleEl.dataset.hsg = animName;
      styleEl.innerHTML = `@keyframes ${animName} { from { transform: translateX(0); } to { transform: translateX(-${newSingle}px); } }`;
      document.head.appendChild(styleEl);
      inner.style.animation = `${animName} ${duration}s linear infinite`;
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (styleEl?.parentNode) styleEl.parentNode.removeChild(styleEl);
      if (inner) {
        inner.style.animation = '';
        inner.style.willChange = '';
      }
    };
  }, [imgs.length, isMobile]);

  /** Child index in the track (accounts for leading spacer on mobile). */
  const slideChildIndex = useCallback(
    (slideIndex) => (isMobile ? slideIndex + 1 : slideIndex),
    [isMobile]
  );

  const scrollToIndex = useCallback(
    (idx, behavior = 'smooth') => {
      const wrapper = wrapperRef.current;
      const inner = innerRef.current;
      if (!wrapper || !inner) return;

      const clamped = Math.max(0, Math.min(imgs.length - 1, idx));
      const target = inner.children[slideChildIndex(clamped)];
      if (!target) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const childRect = target.getBoundingClientRect();
      const maxScroll = Math.max(0, wrapper.scrollWidth - wrapper.clientWidth);
      const left =
        wrapper.scrollLeft +
        (childRect.left - wrapperRect.left) -
        (wrapper.clientWidth - childRect.width) / 2;

      wrapper.scrollTo({
        left: Math.max(0, Math.min(maxScroll, left)),
        behavior,
      });
      setCurrentIndex(clamped);
    },
    [imgs.length, slideChildIndex]
  );

  // Sync index from manual swipe — slide closest to viewport center
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner || !isMobile) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const wrapperRect = wrapper.getBoundingClientRect();
        const centerX = wrapperRect.left + wrapperRect.width / 2;
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i < imgs.length; i++) {
          const child = inner.children[slideChildIndex(i)];
          if (!child) continue;
          const rect = child.getBoundingClientRect();
          const childCenter = rect.left + rect.width / 2;
          const dist = Math.abs(childCenter - centerX);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        }
        setCurrentIndex(best);
      });
    };

    wrapper.addEventListener('scroll', onScroll, { passive: true });
    return () => wrapper.removeEventListener('scroll', onScroll);
  }, [imgs.length, isMobile, slideChildIndex]);

  // Middle slide starts centered; go left for earlier, right for later
  useEffect(() => {
    if (!isMobile) return;
    const run = () => scrollToIndex(middleIndex, 'auto');
    const id1 = requestAnimationFrame(run);
    const id2 = window.setTimeout(run, 80);
    const id3 = window.setTimeout(run, 250);
    return () => {
      cancelAnimationFrame(id1);
      clearTimeout(id2);
      clearTimeout(id3);
    };
  }, [isMobile, middleIndex, scrollToIndex]);

  const displayImgs = isMobile ? imgs : [...imgs, ...imgs];

  return (
    <div className="relative mx-auto flex w-full max-w-[1920px] flex-col items-center justify-center overflow-hidden bg-white px-0 lg:flex-row">
      {!isMobile && (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 lg:w-24 xl:w-28"
            style={{
              background: 'transparent',
              WebkitBackdropFilter: 'blur(10px)',
              backdropFilter: 'blur(10px)',
              WebkitMaskImage:
                'linear-gradient(to right, black 0%, black 25%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, black 0%, black 25%, transparent 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 lg:w-24 xl:w-28"
            style={{
              background: 'transparent',
              WebkitBackdropFilter: 'blur(10px)',
              backdropFilter: 'blur(10px)',
              WebkitMaskImage:
                'linear-gradient(to left, black 0%, black 25%, transparent 100%)',
              maskImage:
                'linear-gradient(to left, black 0%, black 25%, transparent 100%)',
            }}
          />
        </>
      )}

      <div
        ref={wrapperRef}
        className={`relative w-full lg:overflow-hidden ${
          isMobile ? 'scrollbar-hide overflow-x-auto' : 'overflow-hidden'
        }`}
        style={
          isMobile
            ? { scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }
            : undefined
        }
      >
        <div className="w-full">
          <div
            ref={innerRef}
            className={`flex will-change-transform ${
              isMobile ? 'snap-x snap-mandatory touch-pan-x gap-3' : 'gap-5 lg:gap-8'
            }`}
            style={{ alignItems: 'stretch' }}
          >
            {/* Spacers let first & last slides sit in the true center */}
            {isMobile ? <div className={MOBILE_SPACER_CLASS} aria-hidden /> : null}

            {displayImgs.map((image, index) => {
              const slideIndex = index % imgs.length;
              const isWide = !isMobile && slideIndex === 1;
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 ${isMobile ? 'snap-center' : ''} ${
                    isMobile
                      ? `${MOBILE_SLIDE_CLASS} rounded-xl`
                      : isWide
                        ? 'w-[1120px] rounded-2xl xl:w-[1240px]'
                        : 'w-[780px] rounded-2xl xl:w-[880px]'
                  } h-[240px] overflow-hidden shadow-lg sm:h-[320px] lg:h-[440px]`}
                >
                  <Image
                    src={image}
                    alt={`Slide ${slideIndex + 1}`}
                    width={1240}
                    height={440}
                    className="h-full w-full object-cover"
                    quality={95}
                  />
                </div>
              );
            })}

            {isMobile ? <div className={MOBILE_SPACER_CLASS} aria-hidden /> : null}
          </div>
        </div>
      </div>

      <div className="z-30 mt-4 flex w-full items-center justify-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => scrollToIndex(currentIndex - 1)}
          disabled={atStart}
          className={`relative h-9 w-9 shrink-0 rounded-full border bg-white shadow-sm transition-opacity ${
            atStart
              ? 'cursor-not-allowed border-gray-200 text-gray-300 opacity-40'
              : 'border-[#FA6E43] text-[#FA6E43]'
          }`}
          aria-label="Previous"
        >
          <ChevronLeft
            size={18}
            strokeWidth={2.25}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[58%] -translate-y-1/2"
          />
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(currentIndex + 1)}
          disabled={atEnd}
          className={`relative h-9 w-9 shrink-0 rounded-full border bg-white shadow-sm transition-opacity ${
            atEnd
              ? 'cursor-not-allowed border-gray-200 text-gray-300 opacity-40'
              : 'border-[#FA6E43] text-[#FA6E43]'
          }`}
          aria-label="Next"
        >
          <ChevronRight
            size={18}
            strokeWidth={2.25}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[42%] -translate-y-1/2"
          />
        </button>
      </div>
    </div>
  );
}
