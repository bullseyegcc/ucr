'use client';

import { useEffect, useRef, Children, cloneElement } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper function to convert hex to rgba
const hexToRgba = (hex, opacity = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function ColorChangeWithScroll({ 
  children, 
  initialColor = 'rgba(150, 150, 150, 0.25)', 
  afterColor = '#FA6E43', 
  blur = false,
  initialOpacity = 0.25,
  lockScroll = true, // New prop to enable/disable scroll locking
  backgroundColor = 'transparent'
}) {
  const containerRef = useRef(null);
  const afterColorRef = useRef(afterColor);
  const blurRef = useRef(blur);
  
  // Normalize initial color to rgba if it's hex
  const normalizedInitialColor = initialColor.startsWith('#') 
    ? hexToRgba(initialColor, initialOpacity)
    : initialColor;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get all word spans
    const words = container.querySelectorAll('.scroll-word');

    if (words.length === 0) return;

    // Create scroll-linked timeline with native pinning and smooth easing
    const tl = gsap.timeline({
      defaults: {
        ease: 'sine.inOut',
        force3D: true, // GPU acceleration for smooth performance
      },
      scrollTrigger: {
        trigger: container,
        start: 'center center', // Lock when container center reaches viewport center
        end: 'bottom center',
        scrub: 1.2, // Smooth scrub with slight delay for fluid feel
        pin: true, // Pin the element visually while scroll advances the timeline
        pinSpacing: true, // Create virtual scroll space for the pin
        anticipatePin: 1, // Smooth anticipation before pin activates
        markers: false,
      },
    });

    // Animate each word with smooth color transition
    words.forEach((word, index) => {
      if (blurRef.current) {
        tl.fromTo(
          word,
          { 
            filter: 'blur(8px)', 
            color: normalizedInitialColor,
            opacity: 0.7,
          },
          { 
            filter: 'blur(0px)', 
            color: afterColorRef.current,
            opacity: 1,
            duration: 0.8, 
            ease: 'sine.inOut' 
          },
          index * 0.1 // Smoother stagger timing
        );
      } else {
        tl.fromTo(
          word,
          { 
            color: normalizedInitialColor,
            opacity: 0.6,
          },
          { 
            color: afterColorRef.current,
            opacity: 1,
            duration: 0.8, 
            ease: 'sine.inOut' 
          },
          index * 0.1 // Smoother stagger timing
        );
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [normalizedInitialColor, lockScroll]);

  // Helper function to split text into word spans
  const renderTextWithSpans = (text) => {
    if (typeof text !== 'string') return text;
    
    return text.split(' ').map((word, index, arr) => (
      <span
        key={index}
        className="scroll-word"
        style={{ 
          color: normalizedInitialColor, 
          transition: 'color 0.6s ease-in-out',
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
        backgroundColor: backgroundColor,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      {processedChildren}
    </div>
  );
}
