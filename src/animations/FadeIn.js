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

    const timer = setTimeout(() => {
      const wordSpans = [];

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

      // Function to apply styles to word span
      const applyStyles = (wordSpan, parentStyles) => {
        Object.assign(wordSpan.style, parentStyles);
        wordSpan.style.display = 'inline';
        wordSpan.style.opacity = '0';
        wordSpan.style.filter = 'blur(12px)';
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
        // Cinematic fade-in with staggered delay
        const animationConfig = {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: {
            each: stagger,
            from: 'start',
          },
          duration: duration * 0.8,
          delay: scrollTrigger ? 0 : delay,
          ease: 'power1.inOut',
        };

        if (scrollTrigger) {
          // Scroll-triggered animation
          animationConfig.scrollTrigger = {
            trigger: element,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5,
            markers: false,
          };
        }

        gsap.to(wordSpans, animationConfig);
      }

      return () => {
        gsap.set(wordSpans, { willChange: 'auto' });
        if (scrollTrigger) {
          ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === element) {
              trigger.kill();
            }
          });
        }
      };
    }, 50);

    return () => clearTimeout(timer);
  }, [duration, stagger, delay, scrollTrigger]);

  return (
    <div 
      ref={elementRef} 
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
