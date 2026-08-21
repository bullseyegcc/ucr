'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import StatsCard from '../../common/StatsCard';

export default function AboutStats() {
  const rowRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const items = rowRef.current?.querySelectorAll('.stat-card-item');
    if (!items?.length) return;

    let played = false;

    gsap.set(items, { opacity: 0, y: 56 });

    const play = () => {
      if (played) return;
      played = true;
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.18,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    const reset = () => {
      played = false;
      gsap.set(items, { opacity: 0, y: 56 });
    };

    const onAboutPlaced = (e) => {
      if (e.detail?.placed) play();
      else reset();
    };

    if (window.__heroAboutPlaced) play();
    window.addEventListener('heroAboutPlaced', onAboutPlaced);

    return () => {
      window.removeEventListener('heroAboutPlaced', onAboutPlaced);
      gsap.killTweensOf(items);
    };
  }, []);

  return (
    <div className="overflow-hidden w-full shrink-0 bg-[#F4F4F2]">
      <div
        ref={rowRef}
        className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 px-[1rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem] pt-[1.25rem] pb-[1rem] lg:pt-[2rem] lg:pb-[1.25rem] gap-[0.75rem] lg:gap-[1.25rem]"
      >
        <div className="stat-card-item w-full min-w-0" style={{ opacity: 0 }}>
          <StatsCard
            mainHeading={17}
            showPlus
            subHeading="Years of Excellence Experience"
            description="Delivering trusted copper solutions since 2008."
            index={0}
            skipEntrance
          />
        </div>
        <div className="stat-card-item w-full min-w-0" style={{ opacity: 0 }}>
          <StatsCard
            mainHeading={200}
            suffix="K"
            showPlus
            subHeading="MT/Annual Capacity"
            description="State-of-the-art production facilities ensure consistent high-volume output."
            index={1}
            skipEntrance
          />
        </div>
        <div className="stat-card-item w-full min-w-0" style={{ opacity: 0 }}>
          <StatsCard
            mainHeading={250}
            showPlus
            subHeading="Skilled Employees"
            description="A dedicated team of experts committed to quality and innovation."
            index={2}
            skipEntrance
          />
        </div>
        <div className="stat-card-item w-full min-w-0" style={{ opacity: 0 }}>
          <StatsCard
            mainHeading={50}
            showPlus
            subHeading="Global Reach"
            description="Serving customers across more than 50 countries worldwide."
            index={3}
            skipEntrance
          />
        </div>
      </div>
    </div>
  );
}
