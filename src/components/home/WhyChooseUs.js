'use client';

import Image from "next/image";
import { Badge } from "../../common/badge.js";
import { VideoPlayer } from "../../common/video";
import SlideIn from "../../animations/SlideIn";
import FadeIn from "../../animations/FadeIn";
import CardAnimation from "../../animations/CardAnimation";

export default function WhyChooseUs() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white via-[#FDD4BB] to-white px-10 py-20"
    >
      <div
        className="text-center mb-16 flex flex-col items-center"
        style={{ willChange: 'transform, opacity' }}
      >
        <SlideIn direction="bottom" scrollTrigger={true} duration={0.8}>
          <Badge title="Core Strength" />
        </SlideIn>
        <FadeIn className="text-4xl font-semibold text-black mt-6" scrollTrigger={true} duration={0.8}>
          <h1>Why choose us</h1>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-6">

        {/* ── Featured left card ─────────────────────────────────────── */}
        <div
          className="relative min-h-[50vh] flex flex-col justify-between items-start row-span-2 bg-[url('/excellence.png')] bg-cover bg-center md:ml-10 rounded-xl group cursor-pointer transition-all duration-400 ease-out"
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
          <CardAnimation key={card.title} index={i}>
            <div
              className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg group cursor-pointer transition-all duration-400 ease-out"
            >
              <Image
                data-ci
                src={card.src}
                alt={card.title}
                width={card.w}
                height={card.h}
                className="mb-6 transition-transform duration-400"
                style={{ willChange: 'transform, opacity' }}
              />
              <h1 data-ct className="text-2xl font-semibold text-black" style={{ willChange: 'transform, opacity' }}>{card.title}</h1>
              <p data-cd className="text-sm" style={{ willChange: 'transform, opacity' }}>Factory in a world-class industrial hub</p>
            </div>
          </CardAnimation>
        ))}

      </div>
    </div>
  );
}

