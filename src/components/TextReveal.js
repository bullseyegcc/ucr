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
        wordSpan.style.filter = 'blur(10px)';
      };

      // Function to recursively process all text nodes while preserving element styles
      const processElement = (element) => {
        const parentStyles = getComputedStyles(element);
        
        Array.from(element.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            // Text node - wrap words
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
            // Element node - recurse into it
            processElement(node);
          }
        });
      };

      // Start processing from the container
      processElement(container);

      if (wordSpans.length > 0) {
        // Animate all words in sequence
        gsap.to(wordSpans, {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: {
            each: 0.04,
            from: 'start',
          },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'top 25%',
            scrub: 1.2,
            markers: false,
          },
        });

        ScrollTrigger.refresh();
      }

      return () => {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === container) {
            trigger.kill();
          }
        });
      };
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
