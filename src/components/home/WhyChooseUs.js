'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";
import { Badge } from "../../common/badge.js";
import { VideoPlayer } from "../../common/video";

export default function WhyChooseUs() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const featuredRef = useRef(null);
  const cardsRef    = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = cardsRef.current.filter(Boolean);

    // Set initial hidden state
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
            card.style.transform = exitingAbove
              ? 'translateY(80px)'
              : 'translateY(-50px)';
          }
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-white via-[#FDD4BB] to-white px-10 py-20"
    >
      <div
        ref={headingRef}
        className="text-center mb-16 flex flex-col items-center"
        style={{ willChange: 'transform, opacity' }}
      >
        <Badge title="Core Strength" />
        <h1 className="text-4xl font-semibold text-black mt-6">Why choose us</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-6">

        {/* ── Featured left card ─────────────────────────────────────── */}
        <div
          ref={featuredRef}
          className="relative min-h-[50vh] flex flex-col justify-between items-start row-span-2 bg-[url('/excellence.png')] bg-cover bg-center md:ml-10 rounded-xl group cursor-pointer transition-all duration-400 ease-out hover:scale-105"
          style={{ willChange: 'transform, opacity' }}
        >
          <VideoPlayer src="/excellence.mp4" className="object-contain rounded-2xl" />
          <Image data-fi src="/sign.png" alt="Icon" width={80} height={0} className="absolute top-5 px-10" style={{ willChange: 'transform, opacity' }} />
          <div className="text-white absolute bottom-10 px-10">
            <h1 data-ft className="text-3xl" style={{ willChange: 'transform, opacity' }}>UAE excellence</h1>
            <p data-fd className="text-sm mt-2" style={{ willChange: 'transform, opacity' }}>Factory in a world-class industrial hub</p>
          </div>
        </div>

        {/* ── Small cards ────────────────────────────────────────────── */}
        {[
          { src: '/gn.png',  h: 0,  title: 'Global network',       w: 80 },
          { src: '/tn.png',  h: 40, title: 'Top-notch certified',  w: 80 },
          { src: '/sf.png',  h: 40, title: 'Sustainable future',   w: 80 },
          { src: '/p.png',   h: 40, title: 'Partnership approach', w: 80 },
        ].map((card, i) => (
          <div
            key={card.title}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl"
            style={{ willChange: 'transform, opacity' }}
          >
            <Image
              data-ci
              src={card.src}
              alt={card.title}
              width={card.w}
              height={card.h}
              className="mb-6 transition-transform duration-400 group-hover:scale-110"
              style={{ willChange: 'transform, opacity' }}
            />
            <h1 data-ct className="text-2xl font-semibold text-black" style={{ willChange: 'transform, opacity' }}>{card.title}</h1>
            <p data-cd className="text-sm" style={{ willChange: 'transform, opacity' }}>Factory in a world-class industrial hub</p>
          </div>
        ))}

      </div>
    </div>
  );
}

