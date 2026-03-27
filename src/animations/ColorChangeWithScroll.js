'use client';

import { useEffect, useRef, Children, cloneElement } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ColorChangeWithScroll({ 
  children, 
  initialColor = '#8A8A8A', 
  afterColor = '#FA6E43', 
  blur = false,
  initialOpacity = 1,
  lockScroll = true,
  backgroundColor = 'transparent'
}) {
  const containerRef = useRef(null);
  const afterColorRef = useRef(afterColor);
  const blurRef = useRef(blur);
  
  // Use initialColor as-is, with no alpha injection
  const normalizedInitialColor = initialColor;

  useEffect(() => {

    const container = containerRef.current;
    if (!container) return;

    // Step 1: Detect mobile
    const isMobile = window.innerWidth <= 768;

    // Get all word spans
    const words = container.querySelectorAll('.scroll-word');
    if (words.length === 0) return;

    // Step 2: Branch ScrollTrigger config
    const scrollTriggerConfig = isMobile
      ? {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 20%',
          scrub: 0.2,
          pin: false,
          pinSpacing: false,
          markers: false,
        }
      : {
          trigger: container,
          start: 'center center',
          end: 'bottom center',
          scrub: 0.4,
          pin: false,
          pinSpacing: false,
          anticipatePin: 1,
          markers: false,
        };

    const tl = gsap.timeline({
      defaults: {
        ease: 'sine.inOut',
        force3D: true,
      },
      scrollTrigger: scrollTriggerConfig,
    });

    // Step 3: Branch per-word animation params
    words.forEach((word, index) => {
      if (blurRef.current) {
        tl.fromTo(
          word,
          {
            filter: 'blur(8px)',
            color: normalizedInitialColor,
            opacity: initialOpacity,
          },
          {
            filter: 'blur(0px)',
            color: afterColorRef.current,
            opacity: 1,
            duration: isMobile ? 0.4 : 0.8,
            ease: 'sine.inOut',
          },
          index * (isMobile ? 0.06 : 0.1)
        );
      } else {
        tl.fromTo(
          word,
          {
            color: normalizedInitialColor,
            opacity: initialOpacity,
          },
          {
            color: afterColorRef.current,
            opacity: 1,
            duration: isMobile ? 0.4 : 0.8,
            ease: 'sine.inOut',
          },
          index * (isMobile ? 0.06 : 0.1)
        );
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [normalizedInitialColor, initialOpacity, lockScroll]);

  // Helper function to split text into word spans
  const renderTextWithSpans = (text) => {
    if (typeof text !== 'string') return text;
    
    return text.split(' ').map((word, index, arr) => (
      <span
        key={index}
        className="scroll-word"
        style={{ 
          color: normalizedInitialColor,
          opacity: initialOpacity,
          transition: 'color 0.6s ease-in-out, opacity 0.6s ease-in-out',
          ...(blur ? { filter: 'blur(8px)' } : {}) 
        }}
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
    <div
      ref={containerRef}
      style={{
        backgroundColor: 'transparent',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      {processedChildren}
    </div>
  );
}
