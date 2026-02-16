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
      // Get all text nodes and wrap them in spans
      const wordSpans = [];
      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      let node;
      const nodesToProcess = [];
      
      // Collect all text nodes first (including those in span tags)
      while ((node = walker.nextNode())) {
        if (node.textContent.trim()) {
          nodesToProcess.push(node);
        }
      }

      // Process nodes in reverse to avoid index issues
      nodesToProcess.reverse().forEach((textNode) => {
        const text = textNode.textContent;
        const parent = textNode.parentNode;
        const fragment = document.createDocumentFragment();
        const nodeWords = [];

        text.split(/\s+/).forEach((word) => {
          const span = document.createElement('span');
          span.textContent = word;
          span.style.display = 'inline-block';
          span.style.marginRight = '0.25em';
          span.className = 'word-span';
          fragment.appendChild(span);
          nodeWords.push(span);
        });

        // Add words to main array in correct order
        wordSpans.unshift(...nodeWords);
        parent.replaceChild(fragment, textNode);
      });

      if (wordSpans.length > 0) {
        // Initialize all words as completely blurred and transparent
        gsap.set(wordSpans, {
          filter: 'blur(8px)',
          opacity: 0,
        });

        // Animate on scroll - word by word reveal
        gsap.to(
          wordSpans,
          {
            filter: 'blur(0px)',
            opacity: 1,
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
          }
        );

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
