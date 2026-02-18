'use client';

import { useEffect, useRef, Children, cloneElement } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ColorChangeWithScroll({ children, initialColor = '#8a8a8a', afterColor = '#FA6E43', blur = false }) {
  const containerRef = useRef(null);
  const afterColorRef = useRef(afterColor);
  const blurRef = useRef(blur);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get all word spans
    const words = container.querySelectorAll('.scroll-word');

    if (words.length === 0) return;

    // Create timeline for word-by-word color animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: 1,
        markers: false,
      },
    });

    // Animate each word strictly one at a time — no overlap
    words.forEach((word, index) => {
      if (blurRef.current) {
        tl.fromTo(
          word,
          { filter: 'blur(6px)', color: word.style.color },
          { filter: 'blur(0px)', color: afterColorRef.current, duration: 1, ease: 'none' },
          index
        );
      } else {
        tl.to(
          word,
          { color: afterColorRef.current, duration: 1, ease: 'none' },
          index
        );
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // Helper function to split text into word spans
  const renderTextWithSpans = (text) => {
    if (typeof text !== 'string') return text;
    
    return text.split(' ').map((word, index, arr) => (
      <span
        key={index}
        className="scroll-word"
        style={{ color: initialColor, ...(blur ? { filter: 'blur(6px)' } : {}) }}
      >
        {word}{index < arr.length - 1 ? ' ' : ''}
      </span>
    ));
  };

  // Process children to split text into words
  const processedChildren = Children.map(children, (child) => {
    if (typeof child === 'string') {
      return renderTextWithSpans(child);
    }

    if (child && typeof child === 'object' && child.props) {
      // If it's a React element, clone it and process its children
      const processChild = (childContent) => {
        if (typeof childContent === 'string') {
          return renderTextWithSpans(childContent);
        }
        if (Array.isArray(childContent)) {
          return childContent.map((item) => processChild(item));
        }
        return childContent;
      };

      return cloneElement(child, {}, processChild(child.props.children));
    }

    return child;
  });

  return (
    <div ref={containerRef}>
      {processedChildren}
    </div>
  );
}
