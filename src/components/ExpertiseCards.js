'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import CountUp from '../animations/countup.js';

export default function ExpertiseCards() {
  const cardsRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = cardsRef.current.filter(Boolean);

    // Same animation as WhyChooseUs
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
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch lg:items-end">

      <div
        ref={(el) => { if (el) cardsRef.current[0] = el; }}
        className="rounded-xl w-full lg:w-1/3 bg-white px-4 sm:px-5 pt-8 sm:pt-10 lg:pt-16 relative flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[45vh] sm:min-h-[50vh] lg:h-[55vh] group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="pt-3 sm:pt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-3 sm:gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
          <span><CountUp to={20} duration={2} />+</span>
          <hr className="text-primary/30 w-[90%] shadow" />
        </h1>
        <div className="relative z-10 pb-4 sm:pb-6">
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-2">Years Experience</h1>
          <p className="text-sm sm:text-base w-[85%] lg:w-[90%] pr-2 text-gray-600">200,000 metric tons copper production line that is the largest of its kind in the Middle East.</p>
        </div>
        <Image src="/exp1.png" alt="Expertise Icon" width={290} height={80} className="w-full absolute -bottom-0 right-0 z-0 opacity-90" />
      </div>

      <div
        ref={(el) => { if (el) cardsRef.current[1] = el; }}
        className="rounded-xl w-full lg:w-1/3 bg-white px-4 sm:px-5 pt-8 sm:pt-10 lg:pt-16 relative flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[45vh] sm:min-h-[50vh] lg:h-[50vh] group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-3 sm:gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
          <span><CountUp to={1500} duration={2.5} />+</span>
          <hr className="text-primary/30 w-[90%] shadow" />
        </h1>
        <div className="relative z-10 pb-4 sm:pb-6">
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-2">Employees</h1>
          <p className="text-sm sm:text-base w-[85%] lg:w-[80%] text-gray-600">With over 150 experienced employees, we deliver quality and reliability every day.</p>
        </div>
        <Image src="/employees.png" alt="Expertise Icon" width={300} height={80} className="absolute -bottom-0 right-0 z-0 opacity-90" />
      </div>

      <div
        ref={(el) => { if (el) cardsRef.current[2] = el; }}
        className="rounded-xl w-full lg:w-1/3 bg-white px-4 sm:px-5 pt-8 sm:pt-10 lg:pt-16 relative flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[45vh] sm:min-h-[50vh] lg:h-[45vh] group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-3 sm:gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
          <span><CountUp to={30} duration={2} />+</span>
          <hr className="text-primary/30 w-[90%] shadow" />
        </h1>
        <div className="relative z-10 pb-4 sm:pb-6">
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-2">Global Sales</h1>
          <p className="text-sm sm:text-base w-[85%] lg:w-[85%] pr-2 text-gray-600">We supply products, services and solutions across over 30 countries in Australia, Asia, Africa, and the Middle East.</p>
        </div>
        <Image src="/exp3.png" alt="Expertise Icon" width={300} height={80} className="absolute -bottom-0 right-0 z-0 opacity-90" />
      </div>

    </div>
  );
}
