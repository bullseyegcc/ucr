'use client';

import { useEffect, useRef } from 'react';

export default function CardAnimation({ children, index = 0, className = '' }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const card = cardRef.current;
    if (!card) return;

    card.style.opacity = '0';
    card.style.transform = 'translateY(80px)';
    card.style.filter = 'blur(6px)';
    card.style.transition =
      'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s cubic-bezier(0.16, 1, 0.3, 1)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0px)';
            card.style.filter = 'blur(0px)';
          }, index * 75);
        } else {
          const exitingAbove = entry.boundingClientRect.top > 0;
          card.style.opacity = '0';
          card.style.filter = 'blur(6px)';
          card.style.transform = exitingAbove ? 'translateY(80px)' : 'translateY(-50px)';
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}
