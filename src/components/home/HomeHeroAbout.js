'use client';

import { useRef, useCallback } from 'react';
import SnippScrol from '../../animations/SnippScrol/index.js';
import About from './About.js';
import AboutStats from './AboutStats.js';
import HeroHeading from './HeroHeading.js';
import { VideoPlayer } from '../../common/video';

export default function HomeHeroAbout() {
  const lockProgressRef = useRef(null);

  const handleLockProgress = useCallback((p) => {
    lockProgressRef.current?.(p);
  }, []);

  return (
    <SnippScrol
      enableSnap={false}
      enableExit={false}
      lockPageUntilComplete
      onLockProgress={handleLockProgress}
    >
      {/* Panel 1: Hero */}
      <div className="relative flex min-h-[80vh] md:min-h-screen items-center justify-center bg-black overflow-hidden">
        <VideoPlayer src="/hero.mp4" priority className="absolute inset-0 w-full h-full object-cover" />
        <HeroHeading delay={4}>UCR shaping the future</HeroHeading>
      </div>

      {/* Panel 2: About — matches design as one cohesive viewport block */}
      <div className="w-full h-full min-h-0 flex flex-col justify-start gap-[0.75rem] lg:gap-[1.25rem] bg-[#F4F4F2] scroll-pt-24 lg:scroll-pt-28">
        <About lockProgressRef={lockProgressRef} />
        <AboutStats />
      </div>
    </SnippScrol>
  );
}
