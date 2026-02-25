'use client';

import { useEffect, useRef } from 'react';
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

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[80vh] pt-8 px-5 sm:px-0 sm:h-[90vh] flex flex-col justify-between bg-[url('/care.jpg')] bg-cover bg-center mx-4 lg:mx-10 my-5 rounded-xl lg:overflow-hidden"
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
            overflowX: 'scroll',
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
            style={{ width: TOTAL_CARDS_WIDTH, minWidth: 'max-content' }}
          >
            {CARDS.map((card, i) => (
              <div
                key={card.title}
                ref={(el) => { if (el) mobileCardsRef.current[i] = el; }}
                className="flex-none bg-white/20 backdrop-blur-sm text-center flex flex-col items-center py-10 px-5 rounded-xl gap-3 shadow-lg snap-start"
                style={{
                   width: CARD_WIDTH,
                  minWidth: CARD_WIDTH,
                  ...(i === 0 && { paddingLeft: '24px' }),
                }}
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  width={140}
                  height={130}
                  className="w-40 h-25"
                />
                <h1 className="text-lg text-white font-medium">{card.title}</h1>
                <p className="text-secondary text-sm">{card.desc}</p>
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
              className="flex-none lg:min-w-0 bg-white/20 backdrop-blur-sm text-center flex flex-col items-center py-12 px-10 mx-2 rounded-xl gap-3 shadow-lg"
              style={{ willChange: 'transform, opacity' }}
            >
              <Image
                src={card.img}
                alt={card.title}
                width={140}
                height={130}
                className="lg:w-46 lg:h-[130px]"
              />
              <h1 className="lg:text-2xl text-white font-medium">{card.title}</h1>
              <p className="text-secondary lg:text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
