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
      className="bg-gradient-to-b from-white via-[#FDD4BB] to-white py-20 lg:py-24 z-0"
    >
      <div className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem]">
      <div
        className="text-center mb-16 flex flex-col items-center"
        style={{ willChange: 'transform, opacity' }}
      >
        <SlideIn direction="bottom" scrollTrigger={true} duration={0.8}>
          <Badge title="Core Strength" />
        </SlideIn>
        <FadeIn className=" mt-6" scrollTrigger={true} duration={0.8}>
          <h1 className="   font-medium text-[#272A2A] text-[32px] leading-[36px] tracking-[-1.4px] align-middle lg:text-[64px] lg:leading-[72px] lg:tracking-[-1.4px]">We are different</h1>
        </FadeIn>
      </div>

      <div className="lg:min-h-[32rem] grid grid-cols-1 grid-rows-auto sm:grid-cols-3 grid-rows-2 gap-6">

        {/* ── Featured left card ─────────────────────────────────────── */}
        <div
          className="h-[min(60vh,520px)] lg:h-full max-h-[720px] relative row-span-2 rounded-xl overflow-hidden group cursor-pointer transition-all duration-400 ease-out"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="absolute inset-0">
            <VideoPlayer
              src="/excellence.mp4"
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <Image data-fi src="/sign.png" alt="Icon" width={80} height={0} className="absolute top-5 px-10 z-10" style={{ willChange: 'transform, opacity' }} />
          <div className="text-white absolute bottom-10 px-10 z-10">
            <h1 data-ft className="text-3xl" style={{ willChange: 'transform, opacity' }}>UAE excellence</h1>
            <p data-fd className="text-sm mt-2" style={{ willChange: 'transform, opacity' }}>Factory in a world-class industrial hub</p>
          </div>
        </div>

        {/* ── Small cards with scroll reveal container ────────────────────────────────────────────── */}

        {[
          {
            src: '/gn.png',
            h: 0,
            title: 'Global network',
            w: 140,
            description:
              "UCR's range of products, services, and solutions makes it a single source for various copper-related needs, with connection of international institutions",
          },
          {
            src: '/p.png',
            h: 40,
            title: 'Partnership approach',
            w: 140,
            description:
              'We strive to partner with those who share a genuine commitment to growing together. We work towards building long-term relationships',
          },
          {
            src: '/sf.png',
            h: 40,
            title: 'Sustainable innovation',
            w: 140,
            description:
              'Making sure we meet the highest environmental standards, procure the relevant certifications, and focus on secondary copper recycling',
          },
          {
            src: '/ribbin.png',
            h: 40,
            title: 'Solution providers',
            w: 140,
            description:
              'We are introducing new products, and aspire to be a one stop shop, to effectively meet and surpass client needs',
          },
        ].map((card) => (
          <CardAnimation key={card.title}>
            <div
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
                  className="   font-medium text-black text-[24px] leading-[42.63px] tracking-[-1.94px] align-middle lg:text-[32px] lg:leading-[52.8px] lg:tracking-[-1.4px]"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {card.title}
                </h1>
                <p
                  data-cd
                  className="   font-normal text-[15.5px] leading-[23.74px] tracking-[-0.85px] align-middle lg:text-[19.2px] lg:leading-[29.4px] lg:tracking-[-1.05px]"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          </CardAnimation>
        ))}


      </div>
      </div>
    </div>
  );
}

