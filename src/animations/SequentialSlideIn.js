'use client';

import { Children, isValidElement, useLayoutEffect, useRef } from 'react';
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

function getFromVars(direction, distance) {
  switch (direction) {
    case 'left':
      return { x: -distance, y: 0 };
    case 'right':
      return { x: distance, y: 0 };
    case 'top':
      return { x: 0, y: -distance };
    case 'bottom':
    default:
      return { x: 0, y: distance };
  }
}

export default function SequentialSlideIn({
  children,
  id,
  className = '',
  getItemClassName,
  startAt = 0.85,
  endAt = 0.75,
  start,
  end,
  duration,
  distance,
  stagger = 0.15,
  scrub,
  direction = 'bottom',
  itemClassName = '',
  scrollTriggerRef,
}) {
  const containerRef = useRef(null);
  const itemCount = Children.count(children);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.children);
    if (!items.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(items, { x: 0, y: 0, opacity: 1, clearProps: 'will-change' });
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const slideDistance = distance ?? (isMobile ? 24 : 72);
    const fromVars = getFromVars(direction, slideDistance);
    const cardDuration = duration ?? (isMobile ? 0.35 : 0.45);
    const animScrub = scrub ?? (isMobile ? 0.8 : 1.2);
    const totalDuration = Math.max(
      (items.length - 1) * stagger + cardDuration,
      cardDuration
    );

    const scrollStart = start ?? `top ${startAt * 100}%`;
    const scrollEnd = end ?? `bottom ${endAt * 100}%`;

    gsap.set(items, {
      ...fromVars,
      opacity: 0,
      force3D: true,
      willChange: 'transform, opacity',
    });

    let timeline = null;
    const trigger = scrollTriggerRef?.current ?? container;

    const ctx = gsap.context(() => {
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: scrollStart,
          end: scrollEnd,
          scrub: animScrub,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onLeave: () => {
            gsap.set(items, { willChange: 'auto' });
          },
          onEnterBack: () => {
            gsap.set(items, { willChange: 'transform, opacity' });
          },
        },
      });

      items.forEach((item, index) => {
        const delay = index * stagger;
        const itemDuration = Math.max(totalDuration - delay, cardDuration);

        timeline.fromTo(
          item,
          {
            ...fromVars,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: itemDuration,
            ease: 'power2.out',
            immediateRender: false,
          },
          delay
        );
      });

      timeline.duration(totalDuration);
    }, containerRef);

    scheduleScrollTriggerRefresh(50);

    const syncProgress = () => {
      const scrollTrigger = timeline?.scrollTrigger;
      if (!scrollTrigger || !timeline) return;

      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (
        inView &&
        scrollTrigger.progress === 0 &&
        scrollTrigger.scroll() > scrollTrigger.start
      ) {
        const range = scrollTrigger.end - scrollTrigger.start;
        if (range > 0) {
          timeline.progress(
            Math.min(1, (scrollTrigger.scroll() - scrollTrigger.start) / range)
          );
        }
      }
    };

    const syncTimer = window.setTimeout(syncProgress, 200);
    const onResize = () => scheduleScrollTriggerRefresh(100);
    const onReady = () => {
      scheduleScrollTriggerRefresh(0);
      syncProgress();
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scrollAnimationsReady', onReady);

    return () => {
      clearTimeout(syncTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scrollAnimationsReady', onReady);
      ctx.revert();
    };
  }, [
    itemCount,
    startAt,
    endAt,
    start,
    end,
    duration,
    distance,
    stagger,
    scrub,
    direction,
    scrollTriggerRef,
  ]);

  const mergeItemClassName = (index) =>
    [itemClassName, getItemClassName?.(index)].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} id={id} className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        const mergedClassName = mergeItemClassName(index);

        return (
          <div key={child.key ?? index} className={mergedClassName || undefined}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
