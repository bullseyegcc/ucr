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

  // Mobile: once About is placed, shrink/grow the 100dvh clip to the real
  // content height. Pulling the next section up with negative margin stacked
  // the video cards over the stats on shorter phones.
  useEffect(() => {
    const BOTTOM_PAD = 16;

    const getContainer = () =>
      wrapRef.current?.querySelector('[data-snipp-scrol-container]');

    const resetContainer = () => {
      const wrap = wrapRef.current;
      const container = getContainer();
      if (wrap) wrap.style.marginBottom = '';
      if (!container) return;
      container.style.height = '100dvh';
      container.style.maxHeight = '100dvh';
    };

    const fitToContent = () => {
      const wrap = wrapRef.current;
      const panel = aboutPanelRef.current;
      const container = getContainer();
      if (!wrap || !panel || !container) return;

      if (window.matchMedia('(min-width: 1024px)').matches || !window.__heroAboutPlaced) {
        resetContainer();
        return;
      }

      wrap.style.marginBottom = '';

      const kids = Array.from(panel.children);
      if (!kids.length) return;

      const panelTop = panel.getBoundingClientRect().top;
      let contentBottom = panelTop;
      kids.forEach((el) => {
        contentBottom = Math.max(contentBottom, el.getBoundingClientRect().bottom);
      });

      const nextH = Math.ceil(contentBottom - panelTop + BOTTOM_PAD);
      if (nextH < 120) return;

      if (Math.abs(container.offsetHeight - nextH) < 2) return;
      container.style.height = `${nextH}px`;
      container.style.maxHeight = 'none';
    };

    fitToContent();
    const t1 = setTimeout(fitToContent, 120);
    const t2 = setTimeout(fitToContent, 450);
    const t3 = setTimeout(fitToContent, 900);
    window.addEventListener('resize', fitToContent);
    window.addEventListener('heroAboutPlaced', fitToContent);
    window.visualViewport?.addEventListener('resize', fitToContent);

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fitToContent) : null;
    if (aboutPanelRef.current) ro?.observe(aboutPanelRef.current);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', fitToContent);
      window.removeEventListener('heroAboutPlaced', fitToContent);
      window.visualViewport?.removeEventListener('resize', fitToContent);
      ro?.disconnect();
      resetContainer();
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
