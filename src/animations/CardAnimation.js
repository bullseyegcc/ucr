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

    function reveal() {
      gsap.set(card, { opacity: 1, y: 0 });
    }

    function initAnimation() {
      tween?.scrollTrigger?.kill();
      tween?.kill();

      const rect = card.getBoundingClientRect();
      const alreadyInView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (alreadyInView) {
        reveal();
        return;
      }

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
            invalidateOnRefresh: true,
            onRefresh(self) {
              if (self.progress > 0) reveal();
            },
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
