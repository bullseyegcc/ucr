'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const members = [
  { src: '/chairman.png',      name: "Diam O'Sullivan", role: 'Honorable Chairman' },
  { src: '/cofounder.png',     name: "Liam O'Sullivan", role: 'Co-Founder & COO' },
  { src: '/cheftechnology.png',name: "Samantha Chen", role: 'Chief Technology Officer' },
];

export default function TeamCards() {
  const cardsRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(80px)';
      card.style.filter = 'blur(6px)';
      card.style.transition =
        'opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          const i = cards.indexOf(card);

          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0px)';
              card.style.filter = 'blur(0px)';
            }, i * 150);
          } else {
            const exitingAbove = entry.boundingClientRect.top > 0;
            card.style.opacity = '0';
            card.style.filter = 'blur(6px)';
            card.style.transform = exitingAbove ? 'translateY(80px)' : 'translateY(-50px)';
          }
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 justify-center">
      {members.map((member, i) => (
        <div
          key={i}
          ref={(el) => { if (el) cardsRef.current[i] = el; }}
          className="h-full group"
          style={{
            willChange: 'transform, opacity',
            transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Image
            src={member.src}
            alt="Team member"
            width={1000}
            height={1000}
            className="w-full rounded-lg object-contain"
          />
          <h1 className="text-2xl lg:text-3xl mt-6 mb-3 font-semibold">{member.name}</h1>
          <p className="text-primary lg:text-xl font-light">{member.role}</p>
        </div>
      ))}
    </div>
  );
}
