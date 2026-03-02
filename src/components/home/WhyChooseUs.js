'use client';

import Image from "next/image";
import { Badge } from "../../common/badge.js";
import { VideoPlayer } from "../../common/video";
import SlideIn from "../../animations/SlideIn";
import FadeIn from "../../animations/FadeIn";
import ScrollRevealCardsContainer from "../../animations/ScrollRevealCardsContainer";
import CardAnimation from "@/animations/CardAnimation.js";

export default function WhyChooseUs() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white via-[#FDD4BB] to-white px-5 lg:px-10 py-20"
    >
      <div
        className="text-center mb-16 flex flex-col items-center"
        style={{ willChange: 'transform, opacity' }}
      >
        <SlideIn direction="bottom" scrollTrigger={true} duration={0.8}>
          <Badge title="Core Strength" />
        </SlideIn>
        <FadeIn className=" mt-6" scrollTrigger={true} duration={0.8}>
          <h1 className="font-sans font-medium text-[#272A2A] text-[32px] leading-[36px] tracking-[-1.4px] align-middle lg:text-[64px] lg:leading-[72px] lg:tracking-[-1.4px]">Why choose us</h1>
        </FadeIn>
      </div>

      <div className="lg:h-[90vh] grid grid-cols-1 grid-rows-auto sm:grid-cols-3 grid-rows-2 gap-6">

        {/* ── Featured left card ─────────────────────────────────────── */}
        <div
          className=" h-[60vh] lg:h-full relative  flex flex-col justify-between items-start row-span-2 bg-[url('/excellence.png')] bg-cover bg-center lg:ml-10 rounded-xl group cursor-pointer transition-all duration-400 ease-out"
          style={{ willChange: 'transform, opacity' }}
        >
          <VideoPlayer src="/excellence.mp4" className="object-contain rounded-2xl" />
          <Image data-fi src="/sign.png" alt="Icon" width={80} height={0} className="absolute top-5 px-10" style={{ willChange: 'transform, opacity' }} />
          <div className="text-white absolute bottom-10 px-10">
            <h1 data-ft className="text-3xl" style={{ willChange: 'transform, opacity' }}>UAE excellence</h1>
            <p data-fd className="text-sm mt-2" style={{ willChange: 'transform, opacity' }}>Factory in a world-class industrial hub</p>
          </div>
        </div>

        {/* ── Small cards with scroll reveal container ────────────────────────────────────────────── */}

        {[
          { src: '/gn.png', h: 0, title: 'Global network', w: 140 },
          { src: '/tn.png', h: 40, title: 'Top-notch certified', w: 140 },
          { src: '/sf.png', h: 40, title: 'Sustainable future', w: 140 },
          { src: '/p.png', h: 40, title: 'Partnership approach', w: 140 },
        ].map((card) => (
          <CardAnimation>
            <div
              key={card.title}
              className="w-full h-full bg-white rounded-xl p-8 flex flex-col justify-between  group cursor-pointer transition-all duration-400 ease-out"
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
              <div>
                <h1
                  data-ct
                  className="font-sans font-medium text-black text-[24px] leading-[42.63px] tracking-[-1.94px] align-middle lg:text-[32px] lg:leading-[52.8px] lg:tracking-[-1.4px]"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {card.title}
                </h1>
                <p
                  data-cd
                  className="font-sans font-normal text-[15.5px] leading-[23.74px] tracking-[-0.85px] align-middle lg:text-[19.2px] lg:leading-[29.4px] lg:tracking-[-1.05px]"
                  style={{ willChange: 'transform, opacity' }}
                >
                  Factory in a world-class industrial hub
                </p>
              </div>
            </div>
          </CardAnimation>
        ))}


      </div>
    </div>
  );
}

