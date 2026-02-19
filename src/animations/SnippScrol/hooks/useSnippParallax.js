'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useSnippParallax
 * ─────────────────────────────────────────────────────────────────
 * Attaches a scroll-driven parallax tween to a target element,
 * scoped inside a provided GSAP context so cleanup is automatic.
 *
 * @param {React.RefObject} triggerRef  – element that triggers the scroll
 * @param {React.RefObject} targetRef  – element to animate (can equal triggerRef)
 * @param {object}  opts
 *   fromY      {number}  yPercent at scroll-start  (default -20)
 *   toY        {number}  yPercent at scroll-end    (default  20)
 *   fromScale  {number}  scale at scroll-start     (default   1)
 *   toScale    {number}  scale at scroll-end       (default 1.1)
 *   start      {string}  ScrollTrigger start       (default 'top bottom')
 *   end        {string}  ScrollTrigger end         (default 'bottom top')
 *   scrub      {boolean|number}                    (default true)
 *   disabled   {boolean} skip animation entirely   (default false)
 *
 * Returns a ref to the created ScrollTrigger instance (for introspection).
 */
export function useSnippParallax(triggerRef, targetRef, opts = {}) {
  const {
    fromY = -20,
    toY = 20,
    fromScale = 1,
    toScale = 1.1,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    disabled = false,
  } = opts;

  const stRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || disabled) return;
    if (!triggerRef?.current || !targetRef?.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start,
          end,
          scrub,
          onUpdate: (self) => { stRef.current = self; },
        },
      });

      tl.fromTo(
        targetRef.current,
        { yPercent: fromY, scale: fromScale },
        { yPercent: toY,   scale: toScale,  ease: 'none' }
      );
    });

    return () => ctx.revert();
  }, [triggerRef, targetRef, fromY, toY, fromScale, toScale, start, end, scrub, disabled]);

  return stRef;
}

/**
 * useSnippTextReveal
 * ─────────────────────────────────────────────────────────────────
 * Staggered text entrance. Targets elements matching `selector`
 * inside `containerRef`.
 *
 * @param {React.RefObject} containerRef
 * @param {string}  selector   – CSS selector for text nodes
 * @param {object}  opts
 *   start      {string}  ScrollTrigger start   (default 'top 75%')
 *   stagger    {number}  seconds between items (default 0.12)
 *   duration   {number}  tween duration        (default 1)
 *   y          {number}  drift distance px     (default 55)
 *   blur       {number}  blur amount px        (default 8)
 *   ease       {string}                        (default 'expo.out')
 *   disabled   {boolean}                       (default false)
 */
export function useSnippTextReveal(containerRef, selector = '[data-snip-text]', opts = {}) {
  const {
    start = 'top 75%',
    stagger = 0.12,
    duration = 1,
    y = 55,
    blur = 8,
    ease = 'expo.out',
    disabled = false,
  } = opts;

  useEffect(() => {
    if (typeof window === 'undefined' || disabled) return;
    if (!containerRef?.current) return;

    const els = containerRef.current.querySelectorAll(selector);
    if (!els.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        {
          y,
          opacity: 0,
          filter: `blur(${blur}px)`,
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger,
          duration,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [containerRef, selector, start, stagger, duration, y, blur, ease, disabled]);
}
