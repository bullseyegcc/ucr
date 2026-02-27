'use client';

import Image from 'next/image';
import ScrollRevealCardsContainer from '../../animations/ScrollRevealCardsContainer';

const members = [
  { src: '/chairman.png',      name: "Diam O'Sullivan", role: 'Honorable Chairman' },
  { src: '/cofounder.png',     name: "Liam O'Sullivan", role: 'Co-Founder & COO' },
  { src: '/cheftechnology.png',name: "Samantha Chen", role: 'Chief Technology Officer' },
];

export default function TeamCards() {

  return (
    <ScrollRevealCardsContainer
      className="min-h-screen w-full flex items-center justify-center py-8 px-2 lg:px-10"
      containerClassName="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      staggerDelay={0.2}
      pinOnMobile={false}
    >
      {members.map((member) => (
        <div
          key={member.name}
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
    </ScrollRevealCardsContainer>
  );
}
