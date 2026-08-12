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
    let tween;
    const isMobile = window.innerWidth < 768;

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

    function applyStyles(wordSpan, parentStyles) {
      copyParentStyles(wordSpan, parentStyles);
      wordSpan.style.opacity = '0';
      wordSpan.style.transform = `translateY(${isMobile ? 12 : 24}px)`;
      wordSpan.style.willChange = 'opacity, transform';
      wordSpan.style.filter = '';
    }

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

    function initAnimation() {
      if (!container || wordSpans.length === 0) return;

      tween = gsap.to(wordSpans, {
        opacity: 1,
        y: 0,
        ease: 'power1.out',
        stagger: { each: isMobile ? 0.02 : 0.04 },
        scrollTrigger: {
          trigger: container,
          start: isMobile ? 'top 95%' : 'top 90%',
          end: isMobile ? 'top 70%' : 'top 50%',
          scrub: isMobile ? 0.5 : 1,
          once: true,
        },
        onComplete: () => gsap.set(wordSpans, { willChange: 'auto', clearProps: 'transform' }),
      });
    }

    const timer = setTimeout(() => {
      wordSpans = [];
      processElement(container);
      if (wordSpans.length > 0) initAnimation();
    }, 150);

    const onReady = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      if (wordSpans.length > 0) initAnimation();
      ScrollTrigger.refresh();
    };
    window.addEventListener('scrollAnimationsReady', onReady);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scrollAnimationsReady', onReady);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      if (wordSpans.length > 0) {
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
