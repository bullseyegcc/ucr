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
      { threshold: 0.18 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="flex flex-col gap-8 px-2 md:px-8 relative mt-10 group cursor-pointer transition-transform duration-500 ease-out hover:scale-[1.03]">
      <h1 className="text-primary text-6xl font-semibold z-99 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent transition-transform duration-500 ease-out">
        <CountUp
          from={0}
          to={mainHeading}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
          startCounting={false}
        />

      </h1>
      <hr className="border-t border-secondary transition-all duration-400 ease-out group-hover:border-primary" />
      <div className="transition-transform duration-400 ease-out group-hover:translate-x-1">
        <h1 className="font-semibold text-lg sm:text-2xl">{subHeading}</h1>
        <p className="text-xs md:text-sm font-light mt-2">{description}</p>
      </div>
    </div>
  );
}
