'use client';

/**
 * HomeHeroAbout
 * ─────────────────────────────────────────────────────────────────────────────
 * Client wrapper that owns the SnippScrol Hero→About sequence.
 *
 * Responsibilities:
 *  1. Creates `lockProgressRef` — a mutable ref whose `.current` is set by
 *     <About> to a function `(progress: 0→1) => void` that drives the heading
 *     word-colour timeline.
 *  2. Passes an `onLockProgress` callback to <SnippScrol> which calls that fn,
 *     and `lockAtEnd={1}` (1 × 100 vh of extra locked scroll after About lands).
 *  3. Passes `lockProgressRef` down to <About> so it can register its driver.
 */

import { useRef, useCallback } from 'react';
import SnippScrol from '../../animations/SnippScrol/index.js';
import About from './About.js';
import HeroHeading from './HeroHeading.js';
import { VideoPlayer } from '../../common/video';

export default function HomeHeroAbout() {
  // About.js will set .current = (progress) => void once its GSAP tl is ready
  const lockProgressRef = useRef(null);

  const handleLockProgress = useCallback((p) => {
    lockProgressRef.current?.(p);
  }, []);

  return (
    <SnippScrol
      scrub={1.5}
      mobileScrub={1}
      enableSnap={true}
      snapDuration={0.5}
      enableExit={false}
      lockAtEnd={1}
      onLockProgress={handleLockProgress}
    >
      {/* Panel 1: Hero */}
      <div className="relative flex min-h-screen font-medium justify-center bg-black font-sans dark:bg-black overflow-hidden">
        <VideoPlayer src="/hero.mp4" className="absolute inset-0 w-full h-full object-cover" />
        <HeroHeading delay={3}>UCR shaping the future</HeroHeading>
      </div>

      {/* Panel 2: About — receives the progress ref so it can register its colour driver */}
      <div className="w-full h-full">
        <About lockProgressRef={lockProgressRef} />
      </div>
    </SnippScrol>
  );
}
