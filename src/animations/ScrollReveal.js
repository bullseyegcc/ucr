'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function getVisibilityScrollRange(startPercent, endPercent) {
  const endPctClamped = Math.min(100, Math.max(endPercent, startPercent + 1));

  return {
    start: `${startPercent}% bottom`,
    end: `${endPctClamped}% bottom`,
  };
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  startPercent,
  endPercent,
  rotationEnd = 'top 60%',
  wordAnimationEnd = 'top 5%',
  as: Tag = 'h2',
  highlightWords = [],
  gradientHighlight = false,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = container?.firstElementChild;
    if (!container || !(textElement instanceof HTMLElement)) return;

    const originalText = textElement.textContent ?? '';
    const wordSpans = [];

    function splitWords(element) {
      wordSpans.length = 0;
      element.textContent = originalText;

      const parts = originalText.split(/(\s+)/);
      const fragment = document.createDocumentFragment();

      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
        } else if (part) {
          const span = document.createElement('span');
          const isHighlighted = highlightWords.some(
            (word) => word.toLowerCase() === part.toLowerCase()
          );
          span.className = `word inline-block${
            isHighlighted && !gradientHighlight ? ' italic text-yellow-400' : ''
          }`;
          if (isHighlighted && gradientHighlight) {
            span.className =
              'word inline-block overflow-visible italic pl-[0.06em] pr-[0.2em] text-transparent [-webkit-text-fill-color:transparent] bg-clip-text bg-linear-to-r from-[#E55D4D] via-[#DC5274] to-[#8F70B3] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]';
            span.textContent = part;
            span.dataset.gradientHighlight = 'true';
          } else {
            span.textContent = part;
          }
          span.style.opacity = String(baseOpacity);
          if (enableBlur && !span.dataset.gradientHighlight) {
            span.style.filter = `blur(${blurStrength}px)`;
          }
          fragment.appendChild(span);
          wordSpans.push(span);
        }
      });

      element.textContent = '';
      element.appendChild(fragment);
    }

    let ctx = null;
    let refreshTimer;

    const timer = window.setTimeout(() => {
      splitWords(textElement);
      if (wordSpans.length === 0) return;

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReduced) {
        gsap.set(wordSpans, { opacity: 1, filter: 'none', clearProps: 'all' });
        return;
      }

      const scroller = scrollContainerRef?.current ?? undefined;

      const wordScrollRange =
        startPercent != null && endPercent != null
          ? getVisibilityScrollRange(startPercent, endPercent)
          : { start: 'top 95%', end: wordAnimationEnd };

      const rotationScrollRange =
        startPercent != null && endPercent != null
          ? getVisibilityScrollRange(startPercent, endPercent)
          : { start: 'top bottom', end: rotationEnd };

      gsap.set(wordSpans, {
        opacity: baseOpacity,
        filter: (_, el) => {
          const target = el;
          if (target.dataset.gradientHighlight || !enableBlur) return 'none';
          return `blur(${blurStrength}px)`;
        },
        willChange: enableBlur ? 'opacity, filter' : 'opacity',
      });

      if (baseRotation !== 0) {
        gsap.set(textElement, {
          transformOrigin: '0% 50%',
          rotate: baseRotation,
        });
      }

      ctx = gsap.context(() => {
        if (baseRotation !== 0) {
          gsap.fromTo(
            textElement,
            { transformOrigin: '0% 50%', rotate: baseRotation },
            {
              ease: 'none',
              rotate: 0,
              scrollTrigger: {
                trigger: container,
                scroller,
                start: rotationScrollRange.start,
                end: rotationScrollRange.end,
                scrub: 0.5,
              },
            }
          );
        }

        gsap.fromTo(
          wordSpans,
          {
            opacity: baseOpacity,
            filter: (_, el) => {
              const target = el;
              if (target.dataset.gradientHighlight || !enableBlur) return 'none';
              return `blur(${blurStrength}px)`;
            },
          },
          {
            ease: 'none',
            opacity: 1,
            filter: (_, el) => {
              const target = el;
              if (target.dataset.gradientHighlight) return 'none';
              return 'blur(0px)';
            },
            stagger: 0.05,
            scrollTrigger: {
              trigger: container,
              scroller,
              start: wordScrollRange.start,
              end: wordScrollRange.end,
              scrub: 0.5,
            },
          }
        );
      }, container);

      const savedScrollY = window.scrollY;
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScrollY, behavior: 'instant' });
      });

      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    }, 100);

    return () => {
      window.clearTimeout(timer);
      if (refreshTimer) window.clearTimeout(refreshTimer);
      ctx?.revert();
      if (wordSpans.length > 0) {
        gsap.killTweensOf(wordSpans);
      }
      gsap.killTweensOf(textElement);
      textElement.textContent = originalText;
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    startPercent,
    endPercent,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    highlightWords,
    gradientHighlight,
  ]);

  const className = [containerClassName, textClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className="overflow-visible">
      {React.createElement(Tag, { className }, children)}
    </div>
  );
}
