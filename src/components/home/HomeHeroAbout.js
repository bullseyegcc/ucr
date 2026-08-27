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

  // Mobile: after About+Stats are centered in the 100dvh panel, pull the next
  // section up by the leftover bottom space so it fills that gap.
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
      // justify-center splits leftover space equally above & below
      const bottomGap = Math.max(0, (panelH - used) / 2);
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
        onLockProgress={handleLockProgress}
      >
        {/* Panel 1: Hero */}
        <div className="relative flex h-full items-center justify-center bg-black overflow-hidden">
          <VideoPlayer src="/hero.mp4" priority className="absolute inset-0 w-full h-full object-cover" />
          <HeroHeading delay={4}>UCR shaping the future</HeroHeading>
        </div>

        {/* Panel 2: mobile centers About+Stats; next section is pulled up to fill bottom gap */}
        <div
          ref={aboutPanelRef}
          className="flex h-full min-h-0 w-full flex-col justify-center gap-6 overflow-hidden bg-white pt-0 pb-8 scroll-pt-24 sm:gap-7 sm:pb-10 lg:justify-between lg:gap-6 lg:pb-0 lg:scroll-pt-28"
        >
          <About lockProgressRef={lockProgressRef} />
          <AboutStats />
        </div>
      </SnippScrol>
    </div>
  );
}
