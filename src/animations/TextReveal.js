'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wordSpans = [];
    const isMobile = window.innerWidth < 768;

    // Helper: copy parent computed styles to wordSpan
    function copyParentStyles(wordSpan, parentStyles) {
      if (!parentStyles) return;
      wordSpan.style.color = parentStyles.color;
      wordSpan.style.backgroundColor = parentStyles.backgroundColor;
      wordSpan.style.backgroundImage = parentStyles.backgroundImage;
      wordSpan.style.backgroundClip = parentStyles.backgroundClip;
      wordSpan.style.WebkitBackgroundClip = parentStyles.WebkitBackgroundClip;
      wordSpan.style.WebkitTextFillColor = parentStyles.WebkitTextFillColor;
      wordSpan.style.fontSize = parentStyles.fontSize;
      wordSpan.style.fontWeight = parentStyles.fontWeight;
      wordSpan.style.fontFamily = parentStyles.fontFamily;
    }

    // Function to get all computed styles from an element
    function getComputedStyles(element) {
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
    }

    // Function to apply styles to word span
    function applyStyles(wordSpan, parentStyles) {
      copyParentStyles(wordSpan, parentStyles);
      wordSpan.style.opacity = '0';
      if (isMobile) {
        // Step 3: Reduce mobile initial translateY
        wordSpan.style.transform = 'translateY(12px)';
        wordSpan.style.willChange = 'opacity, transform';
        wordSpan.style.filter = '';
      } else {
        wordSpan.style.filter = 'blur(10px)';
        wordSpan.style.willChange = 'opacity, filter';
        wordSpan.style.transform = '';
      }
    }

    // Recursively process all text nodes and wrap words in spans
    function processElement(element) {
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
    }

    const timer = setTimeout(() => {
      wordSpans = [];
      processElement(container);

      if (wordSpans.length > 0) {
        const savedScrollY = window.scrollY;

        if (isMobile) {
          ScrollTrigger.update();
        } else {
          ScrollTrigger.refresh();
          requestAnimationFrame(() => {
            window.scrollTo({ top: savedScrollY, behavior: 'instant' });
          });
        }

        const gsapConfig = isMobile
          ? {
              opacity: 1,
              y: 0,
              stagger: { each: 0.02 },
              duration: 0.7,
              scrollTrigger: {
                trigger: container,
                start: 'top 95%',
                end: 'top 75%',
                scrub: 0.3,
              },
              onComplete: () => gsap.set(wordSpans, { willChange: 'auto' }),
            }
          : {
              opacity: 1,
              filter: 'blur(0px)',
              stagger: { each: 0.04 },
              scrollTrigger: {
                trigger: container,
                start: 'top 110%',
                end: 'top 40%',
                scrub: 0.009,
              },
              onComplete: () => gsap.set(wordSpans, { willChange: 'auto' }),
            };

        gsap.to(wordSpans, gsapConfig);
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      // Comment 1: Clean up ScrollTriggers and GSAP tweens
      if (container) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === container) {
            trigger.kill();
          }
        });
      }
      if (wordSpans && wordSpans.length > 0) {
        gsap.killTweensOf(wordSpans);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
