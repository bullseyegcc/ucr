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

    /** GSAP pin copies computed height into height + maxHeight; that locks short and clips long copy. */
    const fitCardToContent = (card) => {
      if (!(card instanceof HTMLElement)) return;
      card.style.maxHeight = 'none';
      card.style.height = 'auto';
      // Force layout with CSS min-height still applied, then lock height to full content.
      const nextHeight = Math.ceil(card.getBoundingClientRect().height);
      card.style.height = `${Math.max(nextHeight, 1)}px`;
      card.style.maxHeight = 'none';
      const spacer = card.closest('.pin-spacer');
      if (spacer instanceof HTMLElement) {
        spacer.style.height = card.style.height;
      }
    };

    const fitAllCards = () => {
      cards.forEach(fitCardToContent);
    };

    const syncEndSpacer = () => {
      fitAllCards();
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
          onRefresh: () => {
            fitCardToContent(card);
          },
          onEnter: () => {
            fitCardToContent(card);
          },
          onEnterBack: () => {
            fitCardToContent(card);
          },
          onToggle: (self) => {
            if (self.isActive) fitCardToContent(card);
          },
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
      cards.forEach((card) => {
        card.style.height = 'auto';
        card.style.maxHeight = 'none';
      });
    };

    const onRefresh = () => {
      // After GSAP reapplies pin height/maxHeight, expand to full content.
      window.requestAnimationFrame(() => {
        syncEndSpacer();
      });
    };

    ScrollTrigger.addEventListener('refreshInit', onRefreshInit);
    ScrollTrigger.addEventListener('refresh', onRefresh);

    const images = root.querySelectorAll('img');
    const onImageLoad = () => {
      syncEndSpacer();
      scheduleScrollTriggerRefresh(150);
    };
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onImageLoad, { once: true });
    });

    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      fontsReady.then(() => scheduleScrollTriggerRefresh(50));
    }

    scheduleScrollTriggerRefresh(100);
    window.setTimeout(() => {
      syncEndSpacer();
      window.dispatchEvent(new CustomEvent('scrollAnimationsReady'));
    }, 200);

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      images.forEach((img) => img.removeEventListener('load', onImageLoad));
      endTrigger.style.height = '';
      cards.forEach((card) => {
        card.style.zIndex = '';
        card.style.height = '';
        card.style.maxHeight = '';
      });
      ctx.revert();
    };
  }, [containerRef, cardSelector, endSelector, start, scale, opacity, fadeStart]);
}
