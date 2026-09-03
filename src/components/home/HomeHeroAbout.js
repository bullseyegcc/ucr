'use client';

import { useRef, useCallback, useEffect } from 'react';
import SnippScrol from '../../animations/SnippScrol/index.js';
import About from './About.js';
import AboutStats from './AboutStats.js';
import HeroHeading from './HeroHeading.js';
import { VideoPlayer } from '../../common/video';

export default function HomeHeroAbout() {
  const lockProgressRef = useRef(null);
  const wrapRef = useRef(null);
  const aboutPanelRef = useRef(null);

  const handleLockProgress = useCallback((p) => {
    lockProgressRef.current?.(p);
  }, []);

  // Mobile: after About+Stats sit under the nav, pull the next section up
  // by the leftover bottom space in the 100dvh panel.
  useEffect(() => {
    const collapseBottomGap = () => {
      const wrap = wrapRef.current;
      const panel = aboutPanelRef.current;
      if (!wrap || !panel) return;

      if (window.matchMedia('(min-width: 1024px)').matches) {
        wrap.style.marginBottom = '';
        return;
      }

      const styles = getComputedStyle(panel);
      const gap = parseFloat(styles.rowGap || styles.gap) || 0;
      const kids = Array.from(panel.children);
      let used = 0;
      kids.forEach((el, i) => {
        used += el.offsetHeight;
        if (i < kids.length - 1) used += gap;
      });

      const panelH = panel.clientHeight || window.innerHeight;
      // justify-start: leftover space sits below content — pull next section up
      const bottomGap = Math.max(0, panelH - used);
      wrap.style.marginBottom = bottomGap > 8 ? `${-(bottomGap - 4)}px` : '';
    };

    collapseBottomGap();
    const t1 = setTimeout(collapseBottomGap, 120);
    const t2 = setTimeout(collapseBottomGap, 450);
    window.addEventListener('resize', collapseBottomGap);
    window.addEventListener('heroAboutPlaced', collapseBottomGap);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', collapseBottomGap);
      window.removeEventListener('heroAboutPlaced', collapseBottomGap);
      if (wrapRef.current) wrapRef.current.style.marginBottom = '';
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative z-0 w-full">
      <SnippScrol
        scrub={0.5}
        mobileScrub={0.3}
        mobileScrollFactor={0.45}
        enableSnap={true}
        snapDuration={0.5}
        enableExit={false}
        lockAtEnd={1}
        lockPageUntilComplete
        onLockProgress={handleLockProgress}
      >
        {/* Panel 1: Hero */}
        <div className="relative flex h-full items-center justify-center bg-black overflow-hidden">
          <VideoPlayer src="/hero.mp4" priority className="absolute inset-0 w-full h-full object-cover" />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-black/20" aria-hidden="true" />
          <HeroHeading delay={4}>UCR shaping the future</HeroHeading>
        </div>

        {/* Panel 2: mobile stacks tightly; desktop balances About ↔ stats ↔ edges */}
        <div
          ref={aboutPanelRef}
          className="flex h-full min-h-0 w-full flex-col justify-start gap-3 overflow-hidden bg-white pt-0 pb-4 scroll-pt-24 sm:gap-4 sm:pb-6 lg:justify-evenly lg:gap-[clamp(1rem,2.5vh,2rem)] lg:pb-[clamp(1.25rem,3vh,2.5rem)] lg:scroll-pt-28"
        >
          <About lockProgressRef={lockProgressRef} />
          <AboutStats />
        </div>
      </SnippScrol>
    </div>
  );
}
