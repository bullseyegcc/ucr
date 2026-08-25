'use client';

import Image from 'next/image';
import CardAnimation from '../../animations/CardAnimation';

const members = [
  { src: '/team/chairman.png',      name: "Diam O'Sullivan", role: 'Honorable Chairman' },
  { src: '/team/cofounder.png',     name: "Liam O'Sullivan", role: 'Co-Founder & COO' },
  { src: '/team/cheftechnology.png',name: "Samantha Chen", role: 'Chief Technology Officer' },
];

export default function TeamCards() {

  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, i) => (
          <CardAnimation key={member.name} index={i} className="h-full">
            <div
              className="h-full group"
              style={{
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
              <h1 className="pl-4 text-2xl lg:text-3xl mt-6 mb-3 font-medium">{member.name}</h1>
              <p className="pl-4 text-primary lg:text-xl font-light">{member.role}</p>
            </div>
          </CardAnimation>
        ))}
      </div>
    </div>
  );
}
