'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let rafId = 0;
let timeoutId = 0;

function scheduleScrollTriggerRefresh(delayMs = 0) {
  if (typeof window === 'undefined') return;

  if (delayMs > 0) {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      timeoutId = 0;
      scheduleScrollTriggerRefresh(0);
    }, delayMs);
    return;
  }

  if (rafId) return;
  rafId = window.requestAnimationFrame(() => {
    rafId = 0;
    ScrollTrigger.refresh();
  });
}

export default function SlideIn({
  children,
  className = '',
  direction = 'left',
  duration = 2.2,
  delay = 0.1,
  scrollTrigger = false,
  triggerOnScroll = false,
  exist = false,
  exit = false,
  startPercent,
  endPercent,
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getInitialTransform = () => {
      const distance = isMobile ? 24 : 72;

      switch (direction) {
        case 'left':
          return { x: -distance, y: 0 };
        case 'right':
          return { x: distance, y: 0 };
        case 'top':
          return { x: 0, y: -distance };
        case 'bottom':
          return { x: 0, y: distance };
        case 'fade':
          return { x: 0, y: 0 };
        default:
          return { x: -distance, y: 0 };
      }
    };

    const initialTransform = getInitialTransform();
    const isFade = direction === 'fade';

    if (prefersReduced) {
      gsap.set(element, { x: 0, y: 0, opacity: 1, scale: 1, willChange: 'auto' });
      return;
    }

    gsap.set(element, {
      x: initialTransform.x,
      y: initialTransform.y,
      opacity: 0,
      scale: isFade ? 1 : isMobile ? 0.99 : 0.98,
      force3D: !isFade,
      willChange: isFade ? 'opacity' : 'transform, opacity',
    });

    const useScrollTrigger = triggerOnScroll || scrollTrigger;
    const exitOnScroll = exist || exit;

    const startPct = startPercent ?? (isMobile ? 8 : 12);
    const endPct = endPercent ?? (isMobile ? 65 : 78);
    const endPctClamped = Math.min(100, Math.max(endPct, startPct + 15));

    const visibleEnter = (pct) => `${pct}% bottom`;
    const visibleExit = (pct) => `${100 - pct}% top`;

    const animDuration = isMobile ? Math.min(duration * 0.5, 1.1) : duration;
    const animScale = isMobile ? 0.99 : 0.98;
    const animScrub = exitOnScroll
      ? isMobile ? 0.6 : 1
      : isMobile ? 0.8 : 1.4;
    const animStart = visibleEnter(startPct);
    const animEnd = exitOnScroll
      ? visibleExit(endPctClamped)
      : visibleEnter(endPctClamped);
    const scrollEase = 'none';
    const playEase = 'power3.out';

    const animationConfig = {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      duration: animDuration,
      delay: useScrollTrigger ? 0 : delay,
      ease: useScrollTrigger ? scrollEase : playEase,
      force3D: true,
      clearProps: 'will-change',
    };

    const scrollConfig = {
      trigger: element,
      start: animStart,
      end: animEnd,
      scrub: animScrub,
      markers: false,
    };

    let tween;
    let timeline;

    if (useScrollTrigger) {
      if (exitOnScroll) {
        timeline = gsap.timeline({ scrollTrigger: scrollConfig });
        timeline.to(element, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: animDuration,
          ease: scrollEase,
          force3D: true,
        });
        const exitTransform = getInitialTransform();
        timeline.to(element, {
          x: exitTransform.x,
          y: exitTransform.y,
          opacity: 0,
          scale: animScale,
          duration: animDuration,
          ease: scrollEase,
          force3D: true,
          clearProps: 'will-change',
        });
      } else {
        tween = gsap.to(element, {
          ...animationConfig,
          scrollTrigger: scrollConfig,
        });
      }

      scheduleScrollTriggerRefresh(50);
    } else {
      tween = gsap.to(element, animationConfig);
    }

    return () => {
      if (tween) tween.kill();
      if (timeline) timeline.kill();
      if (useScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === element) {
            trigger.kill();
          }
        });
      }
    };
  }, [
    direction,
    duration,
    delay,
    scrollTrigger,
    triggerOnScroll,
    exist,
    exit,
    startPercent,
    endPercent,
  ]);

  return (
    <div ref={elementRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
