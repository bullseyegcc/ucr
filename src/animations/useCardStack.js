'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

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

/**
 * Pins each card at the same offset so they stack on top of one another,
 * shrinking and dimming the outgoing card as the next one arrives.
 */
export function useCardStack(
  containerRef,
  {
    cardSelector = '.stack-card',
    endSelector = '.stack-end',
    start = 'top 18%',
    scale = 0.9,
    opacity = 0.5,
    fadeStart = 'top 55%',
  } = {},
) {
  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const cards = gsap.utils.toArray(root.querySelectorAll(cardSelector));
    if (cards.length < 2) return;

    const endTrigger = root.querySelector(endSelector);
    if (!(endTrigger instanceof HTMLElement)) return;

    const syncEndSpacer = () => {
      const tallest = cards.reduce(
        (max, card) => Math.max(max, card.offsetHeight),
        0,
      );
      endTrigger.style.height = `${Math.max(tallest, 1)}px`;
    };

    syncEndSpacer();

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        card.style.zIndex = String(i + 1);

        gsap.set(card, {
          scale: 1,
          opacity: 1,
          transformOrigin: 'top center',
          force3D: true,
          backfaceVisibility: 'hidden',
        });

        ScrollTrigger.create({
          trigger: card,
          start,
          endTrigger,
          end: start,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        const next = cards[i + 1];
        if (!next) return;

        gsap.to(card, {
          scale,
          opacity,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: next,
            start: fadeStart,
            end: start,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);

    const onRefreshInit = () => {
      syncEndSpacer();
    };

    ScrollTrigger.addEventListener('refreshInit', onRefreshInit);

    const images = root.querySelectorAll('img');
    const onImageLoad = () => {
      syncEndSpacer();
      scheduleScrollTriggerRefresh(150);
    };
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onImageLoad, { once: true });
    });

    scheduleScrollTriggerRefresh(100);
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('scrollAnimationsReady'));
    }, 200);

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
      images.forEach((img) => img.removeEventListener('load', onImageLoad));
      endTrigger.style.height = '';
      cards.forEach((card) => {
        card.style.zIndex = '';
      });
      ctx.revert();
    };
  }, [containerRef, cardSelector, endSelector, start, scale, opacity, fadeStart]);
}
