'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CardAnimation({ children, index = 0, className = '' }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const card = cardRef.current;
    if (!card) return;

    let tween;

    function initAnimation() {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      tween = gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: index * 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }

    const timer = setTimeout(initAnimation, 200);
    const onReady = () => {
      initAnimation();
      ScrollTrigger.refresh();
    };
    window.addEventListener('scrollAnimationsReady', onReady);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scrollAnimationsReady', onReady);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [index]);

  return (
    <div ref={cardRef} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}
