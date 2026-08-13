'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { VideoPlayer } from "../../common/video";
import { WhiteBadge } from "../../common/badge.js";

const CARDS = [
  {
    title: 'Recycle & Reuse',
    desc:  'Maximizing resource efficiency by recycling copper and reducing waste.',
    img:   '/recycle.png',
  },
  {
    title: 'Sustainable Sourcing',
    desc:  'Using responsibly sourced materials and ethical supply chains.',
    img:   '/recycle.png',
  },
  {
    title: 'Energy Efficiency',
    desc:  'Reducing our carbon footprint through efficient operations.',
    img:   '/recycle.png',
  },
];

const CARD_WIDTH = 280;
const CARD_GAP = 16;
const MOBILE_PADDING = 32;
const TOTAL_CARDS_WIDTH = CARDS.length * CARD_WIDTH + (CARDS.length - 1) * CARD_GAP + MOBILE_PADDING * 2;

export default function WeCareSection() {
  const sectionRef       = useRef(null);
  const mobileCardsRef   = useRef([]);
  const desktopCardsRef  = useRef([]);
  const headingRef       = useRef(null);
  const scrollViewportRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobile = window.innerWidth < 1024;
    const cards  = mobile
      ? mobileCardsRef.current.filter(Boolean)
      : desktopCardsRef.current.filter(Boolean);

    // On mobile: cards visible immediately so user can swipe to see all
    if (mobile && cards.length) {
      cards.forEach((card) => {
        card.style.opacity   = '1';
        card.style.transform = 'translateY(0)';
        card.style.filter    = 'blur(0)';
      });
      return;
    }

    // Desktop: same animation style as WhyChooseUs
    cards.forEach((card) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(80px)';
      card.style.filter    = 'blur(6px)';
      card.style.transition =
        'opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          const i    = cards.indexOf(card);

          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.opacity   = '1';
              card.style.transform = 'translateY(0px)';
              card.style.filter    = 'blur(0px)';
            }, i * 150);
          } else {
            const exitingAbove = entry.boundingClientRect.top > 0;
            card.style.opacity   = '0';
            card.style.filter    = 'blur(6px)';
            card.style.transform = exitingAbove ? 'translateY(80px)' : 'translateY(-50px)';
          }
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // touch-drag fallback for mobile where native horizontal swipe may be blocked
  useEffect(() => {
    const el = scrollViewportRef.current;
    if (!el) return;
    let startX = 0;
    let startScroll = 0;
    let isDragging = false;

    function onTouchStart(e) {
      if (window.innerWidth >= 1024) return;
      const t = e.touches[0];
      startX = t.clientX;
      startScroll = el.scrollLeft;
      isDragging = true;
    }

    function onTouchMove(e) {
      if (!isDragging) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - (e.touches[0].clientY || 0);

      // if mostly horizontal movement, prevent vertical page scroll
      if (Math.abs(dx) > Math.abs(dy)) e.preventDefault();

      el.scrollLeft = startScroll - dx;
    }

    function onTouchEnd() {
      isDragging = false;
    }

    // use non-passive listeners so we can call preventDefault when needed
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [scrollViewportRef.current]);

  return (
    <div className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem] my-5">
    <div
      ref={sectionRef}
      className="relative min-h-[min(80vh,800px)] sm:h-[min(90vh,900px)] max-h-[1000px] pt-8 flex flex-col justify-between bg-[url('/care.jpg')] bg-cover bg-center rounded-xl lg:overflow-hidden"
    >
      <VideoPlayer src="/sustain.mp4" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      <div ref={headingRef} className="absolute top-6 lg:top-15 px-4 lg:px-10 z-10 pointer-events-none">
        <WhiteBadge title="What we Care" />
        <h1 className="text-2xl lg:text-4xl text-white font-medium mt-3 lg:mt-5">Sustainability</h1>
      </div>

      <div className="absolute bottom-4 left-0 right-0 w-full z-20 ml-5">
        {/* Mobile: horizontal scroll — viewport + inner track so overflow is guaranteed and touch scroll works */}
        <div
          ref={scrollViewportRef}
          role="region"
          aria-label="Sustainability cards - swipe to view all"
          className="flex lg:hidden scrollbar-hide snap-x snap-proximity w-full"
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
            overscrollBehaviorX: 'auto',
            minHeight: 260,
            maxWidth: '100%',
            position: 'relative',
          }}
        >
          <div
            className="flex gap-4 pl-8 pr-8 pb-2"
            style={{ display: 'inline-flex', minWidth: `${TOTAL_CARDS_WIDTH}px`, width: 'max-content' }}
          >
            {CARDS.map((card, i) => (
              <div
                key={card.title}
                ref={(el) => { if (el) mobileCardsRef.current[i] = el; }}
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); router.push('/sustainability'); }}
                className="flex-none bg-white/20 backdrop-blur-sm text-center flex flex-col items-center py-10 px-5 rounded-xl gap-3 shadow-lg snap-start cursor-pointer hover:bg-white/30 transition-colors duration-300"
                style={{
                   width: CARD_WIDTH,
                  minWidth: CARD_WIDTH,
                  ...(i === 0 && { paddingLeft: '24px' }),
                }}
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  width={154}
                  height={84}
                  className="w-[154px] h-[84px] lg:w-[226px] lg:h-[124px]"
                />
                <h1 className="font-primary font-normal text-[24.42px] leading-[27.13px] tracking-[-1.02px] text-white capitalize">{card.title}</h1>
                <p className="font-primary font-normal text-[10.85px] leading-[18.99px] tracking-[-0.46px] text-secondary">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop: grid cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 px-10 w-full">
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => { if (el) desktopCardsRef.current[i] = el; }}
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); router.push('/sustainability'); }}
              className="flex-none lg:min-w-0 bg-white/20 backdrop-blur-sm text-center flex flex-col items-center py-12 px-10 mx-2 rounded-xl gap-3 shadow-lg cursor-pointer hover:bg-white/30 transition-colors duration-300"
              style={{ willChange: 'transform, opacity' }}
            >
              <Image
                src={card.img}
                alt={card.title}
                width={226}
                height={124}
                className="w-[154px] h-[84px] lg:w-[226px] lg:h-[124px]"
              />
              <h1 className="font-primary font-normal text-[24.42px] leading-[27.13px] tracking-[-1.02px] text-white capitalize lg:text-[36px] lg:leading-[40px] lg:tracking-[-1.5px]">{card.title}</h1>
              <p className="font-primary font-normal text-[10.85px] leading-[18.99px] tracking-[-0.46px] text-secondary lg:text-[16px] lg:leading-[28px] lg:tracking-[-0.68px]">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
