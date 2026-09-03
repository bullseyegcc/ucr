'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from '../animations/countup';

gsap.registerPlugin(ScrollTrigger);

export default function StatsCard({
  mainHeading,
  displayValue,
  subHeading,
  description,
  showPlus = true,
  suffix = '',
  index = 0,
  skipEntrance = false,
}) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || skipEntrance) return;
    const card = cardRef.current;
    if (!card) return;

    let tween;
    let played = false;

    function playIn() {
      if (played || !card) return;
      played = true;
      tween?.scrollTrigger?.kill();
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.1,
        ease: 'power2.out',
        overwrite: true,
      });
    }

    function initAnimation() {
      if (played) return;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      gsap.set(card, { opacity: 0, y: 32 });
      tween = gsap.fromTo(
        card,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 98%',
            toggleActions: 'play none none none',
            once: true,
            onEnter: () => { played = true; },
          },
        }
      );
    }

    const timer = setTimeout(initAnimation, 300);
    const readyTimer = window.__heroAboutPlaced ? setTimeout(playIn, 50) : null;
    const onReady = () => {
      initAnimation();
      ScrollTrigger.refresh();
    };
    const onAboutPlaced = (e) => {
      if (!e.detail?.placed) return;
      ScrollTrigger.refresh();
      playIn();
    };

    window.addEventListener('scrollAnimationsReady', onReady);
    window.addEventListener('heroAboutPlaced', onAboutPlaced);

    return () => {
      clearTimeout(timer);
      if (readyTimer) clearTimeout(readyTimer);
      window.removeEventListener('scrollAnimationsReady', onReady);
      window.removeEventListener('heroAboutPlaced', onAboutPlaced);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [index, skipEntrance]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="h-auto flex flex-col gap-[0.75rem] lg:gap-[1rem] px-[0.25rem] lg:px-[1rem] relative group cursor-pointer transition-transform duration-500 ease-out min-w-0"
    >
      <h2
        style={hovered ? { color: '#FA6E43', WebkitTextFillColor: '#FA6E43', background: 'none' } : {}}
        className="font-primary font-medium text-[clamp(2.25rem,1.75rem+2.25vw,4.75rem)] leading-[1] tracking-[-0.04em] bg-gradient-to-b from-primary via-[#FF8A5C] to-[#FFD0BC] bg-clip-text text-transparent transition-all duration-500 ease-out"
      >
        {displayValue != null ? (
          <>
            {displayValue}
            {suffix}
            {showPlus && <span>+</span>}
          </>
        ) : (
          <>
            <CountUp
              from={0}
              to={mainHeading}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
            {suffix}
            {showPlus && <span>+</span>}
          </>
        )}
      </h2>
      <hr className="border-t border-[#D0D0CE] transition-all duration-400 ease-out group-hover:border-primary" />
      <div className="mt-1 transition-transform duration-400 ease-out group-hover:translate-x-1 lg:mt-0">
        <h3 className="font-primary font-medium text-[0.875rem] lg:text-[1.5rem] leading-tight tracking-[-0.03em] text-[#212225]">
          {subHeading}
        </h3>
        <p className="font-primary font-normal text-[0.875rem] lg:text-[1.125rem] leading-[1.45] tracking-[-0.02em] mt-[0.5rem] lg:mt-[0.75rem] text-[#212225]/50">
          {description}
        </p>
      </div>
    </div>
  );
}
