'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FadeIn({ 
  children, 
  className = '', 
  duration = 1.8,
  stagger = 0.025,
  delay = 0.3,
  scrollTrigger = false,
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Step 1 & 3: Detect mobile and reduced motion
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let wordSpans = [];
    const timer = setTimeout(() => {
      // Function to get all computed styles from an element
      const getComputedStyles = (element) => {
        const computed = window.getComputedStyle(element);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          backgroundImage: computed.backgroundImage,
          backgroundClip: computed.backgroundClip,
          WebkitBackgroundClip: computed.WebkitBackgroundClip,
          WebkitTextFillColor: computed.WebkitTextFillColor,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          fontFamily: computed.fontFamily,
        };
      };

      // Step 1: Blur amount
      const blurAmount = isMobile ? '4px' : '12px';

      // Function to apply styles to word span
      const applyStyles = (wordSpan, parentStyles) => {
        Object.assign(wordSpan.style, parentStyles);
        wordSpan.style.display = 'inline';
        wordSpan.style.opacity = '0';
        wordSpan.style.filter = `blur(${blurAmount})`;
        wordSpan.style.willChange = 'opacity, filter';
      };

      // Function to recursively process all text nodes
      const processElement = (element) => {
        const parentStyles = getComputedStyles(element);

        Array.from(element.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if (text.trim()) {
              const fragment = document.createDocumentFragment();
              const words = text.split(/(\s+)/);

              words.forEach((word) => {
                if (word.trim()) {
                  const wordSpan = document.createElement('span');
                  wordSpan.textContent = word;
                  wordSpan.className = 'word-span';
                  applyStyles(wordSpan, parentStyles);
                  fragment.appendChild(wordSpan);
                  wordSpans.push(wordSpan);
                } else if (word) {
                  fragment.appendChild(document.createTextNode(word));
                }
              });

              node.parentNode.replaceChild(fragment, node);
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            processElement(node);
          }
        });
      };

      // Start processing
      processElement(element);

      // Reveal container once spans are prepared
      element.style.opacity = '1';

      if (wordSpans.length > 0) {
        // Step 3: prefers-reduced-motion disables animation
        if (prefersReduced) {
          wordSpans.forEach(span => {
            span.style.opacity = '1';
            span.style.filter = 'none';
            span.style.willChange = 'auto';
          });
          return;
        }

        // Step 1: Mobile/desktop animation config
        const animDuration = isMobile ? Math.min(duration * 0.4, 0.7) : duration * 0.8;
        const animStagger = isMobile ? 0.01 : stagger;
        const animScrub = isMobile ? false : 0.5;
        const animStart = isMobile ? 'top 95%' : 'top 85%';
        const animEnd = isMobile ? 'top 70%' : 'top 50%';

        const animationConfig = {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: {
            each: animStagger,
            from: 'start',
          },
          duration: animDuration,
          delay: scrollTrigger ? 0 : delay,
          ease: 'power1.inOut',
        };

        if (scrollTrigger) {
          // Scroll-triggered animation
          animationConfig.scrollTrigger = {
            trigger: element,
            start: animStart,
            end: animEnd,
            scrub: animScrub,
            markers: false,
          };
        }

        gsap.to(wordSpans, animationConfig);
      }
    }, 50);

    // Cleanup on unmount: kill ScrollTrigger and reset styles
    return () => {
      clearTimeout(timer);
      if (wordSpans && wordSpans.length > 0) {
        gsap.set(wordSpans, { willChange: 'auto', opacity: 1, filter: 'none' });
      }
      if (elementRef.current && scrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === elementRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, [duration, stagger, delay, scrollTrigger]);

  return (
    <div ref={elementRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
