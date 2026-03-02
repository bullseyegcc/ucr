'use client';

import { useEffect, useRef } from 'react';
import CountUp from '../animations/countup';


export default function StatsCard({ mainHeading, subHeading, description }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const card = cardRef.current;
    if (!card) return;

    card.style.opacity = '0';
    card.style.transform = 'translateY(80px)';
    card.style.filter = 'blur(6px)';
    card.style.transition =
      'opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s cubic-bezier(0.16, 1, 0.3, 1)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0px)';
          card.style.filter = 'blur(0px)';
        } else {
          const exitingAbove = entry.boundingClientRect.top > 0;
          card.style.opacity = '0';
          card.style.filter = 'blur(6px)';
          card.style.transform = exitingAbove ? 'translateY(80px)' : 'translateY(-50px)';
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="h-auto flex flex-col gap-3 lg:gap-8 px-2 lg:px-8 relative mt-3 lg:mt-10 group cursor-pointer transition-transform duration-500 ease-out min-w-0 ">
      <h1 className="text-primary font-primary font-medium text-[34px] leading-[38px] lg:text-[clamp(48px,5.5vw,84px)] lg:leading-[1.1] tracking-[-1.38px] z-99 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent transition-transform duration-500 ease-out">
        <CountUp
          from={0}
          to={mainHeading}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />

      </h1>
      <hr className="border-t border-secondary transition-all duration-400 ease-out group-hover:border-primary" />
      <div className="transition-transform duration-400 ease-out group-hover:translate-x-1">
          <h1 className="font-primary font-medium text-[16px] lg:text-[26px] leading-[22px] lg:leading-[28px] tracking-[-1.5px] align-middle">{subHeading}</h1>
          <p className="font-primary font-medium text-sm lg:text-lg leading-[20px] lg:leading-[28px] tracking-[-0.68px] align-middle mt-2 lg:mt-4 text-[#212225]/55">{description}</p>
      </div>
    </div>
  );
}
