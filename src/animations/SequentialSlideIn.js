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
    const slideDistance = distance ?? (isMobile ? 32 : 72);
    const fromVars = getFromVars(direction, slideDistance);
    const cardDuration = duration ?? (isMobile ? 0.4 : 0.45);
    const animScrub = scrub ?? (isMobile ? 0.55 : 1.2);
    const resolvedStagger = isMobile ? Math.min(stagger, 0.1) : stagger;
    const totalDuration = Math.max(
      (items.length - 1) * resolvedStagger + cardDuration,
      cardDuration
    );

    // On mobile, use a shorter scrub window than desktop — but long enough to feel the sequence
    const scrollStart = start ?? `top ${startAt * 100}%`;
    const scrollEnd = isMobile
      ? 'top 25%'
      : end ?? `bottom ${endAt * 100}%`;

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
          onRefresh(self) {
            if (self.animation) self.animation.progress(self.progress);
          },
          onLeave: () => {
            gsap.set(items, { willChange: 'auto' });
          },
          onEnterBack: () => {
            gsap.set(items, { willChange: 'transform, opacity' });
          },
        },
      });

      items.forEach((item, index) => {
        const delay = index * resolvedStagger;
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
          },
          delay
        );
      });

      timeline.duration(totalDuration);
    }, containerRef);

    const syncProgress = () => {
      const scrollTrigger = timeline?.scrollTrigger;
      if (!scrollTrigger || !timeline) return;

      scrollTrigger.refresh();

      const scroll = scrollTrigger.scroll();
      const range = scrollTrigger.end - scrollTrigger.start;
      let progress = 0;
      if (range > 0) {
        progress = gsap.utils.clamp(0, 1, (scroll - scrollTrigger.start) / range);
      } else if (scroll >= scrollTrigger.start) {
        progress = 1;
      }

      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const inView = rect.top < vh && rect.bottom > 0;

      // After client navigation, start/end can sit too far down while the
      // grid is already on screen — cards would stay at opacity 0.
      if (progress === 0 && inView && rect.top < vh * 0.88) {
        const visualRange = Math.max(rect.height + vh * 0.15, 1);
        progress = gsap.utils.clamp(0, 1, (vh * 0.85 - rect.top) / visualRange);
      }

      if (rect.bottom < vh * 0.2) {
        progress = 1;
      }

      timeline.progress(progress);
    };

    const onReady = () => {
      scheduleScrollTriggerRefresh(0);
      syncProgress();
    };

    scheduleScrollTriggerRefresh(50);

    const syncTimers = [80, 280, 700].map((ms) => window.setTimeout(onReady, ms));
    const onResize = () => {
      scheduleScrollTriggerRefresh(100);
      window.setTimeout(syncProgress, 120);
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scrollAnimationsReady', onReady);

    // Lenis already booted on SPA navigations, so the one-shot ready event
    // will never fire again for this mount.
    if (window.lenisInstance) onReady();

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        onReady();
      },
      { threshold: [0, 0.08, 0.2], rootMargin: '15% 0px' }
    );
    io.observe(container);

    return () => {
      syncTimers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scrollAnimationsReady', onReady);
      io.disconnect();
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
