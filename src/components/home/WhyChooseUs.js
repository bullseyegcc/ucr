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
      className="bg-gradient-to-b from-white via-[#FDD4BB] to-white pt-8 pb-20 lg:pt-10 lg:pb-24 z-0"
    >
      <div className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem]">
      <div
        className="text-center mb-16 flex flex-col items-center"
        style={{ willChange: 'transform, opacity' }}
      >
        <SlideIn direction="bottom" scrollTrigger={true} duration={0.8}>
          <Badge title="Core Strength" />
        </SlideIn>
        <SlideIn direction="bottom" scrollTrigger={true} duration={0.8}>

          <h1 className="   font-medium text-[#272A2A] text-[32px] leading-[36px] tracking-[-1.4px] align-middle lg:text-[64px] lg:leading-[72px] lg:tracking-[-1.4px]">We are different</h1>
        </SlideIn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-2 gap-6 items-stretch">

        {/* ── Featured left card ─────────────────────────────────────── */}
        <div
          className="relative min-h-[min(50vh,420px)] sm:min-h-0 sm:row-span-2 sm:h-full rounded-xl overflow-hidden group cursor-pointer transition-all duration-400 ease-out"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="absolute inset-0">
            <VideoPlayer
              src="/excellence.mp4"
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <Image
            data-fi
            src="/home/sign.png"
            alt=""
            width={80}
            height={80}
            className="pointer-events-none absolute top-5 left-5 lg:top-6 lg:left-6 z-10 w-[3.5rem] lg:w-[5rem] h-auto"
            style={{ willChange: "transform, opacity" }}
          />
          <div className="text-white absolute bottom-10 px-10 z-10">
            <h1 data-ft className="text-3xl" style={{ willChange: 'transform, opacity' }}>UAE excellence</h1>
            <p data-fd className="text-sm mt-2" style={{ willChange: 'transform, opacity' }}>Factory in a world-class industrial hub</p>
          </div>
        </div>

        {/* ── Small cards with scroll reveal container ────────────────────────────────────────────── */}

        {[
          {
            src: '/home/gn.png',
            h: 0,
            title: 'Global network',
            w: 96,
            description:
              "UCR's range of products, services, and solutions makes it a single source for various copper-related needs, with connection of international institutions",
          },
          {
            src: '/home/p.png',
            h: 40,
            title: 'Partnership approach',
            w: 96,
            description:
              'We strive to partner with those who share a genuine commitment to growing together. We work towards building long-term relationships',
          },
          {
            src: '/home/sf.png',
            h: 40,
            title: 'Sustainable innovation',
            w: 96,
            description:
              'Making sure we meet the highest environmental standards, procure the relevant certifications, and focus on secondary copper recycling',
          },
          {
            src: '/home/ribbin.png',
            h: 40,
            title: 'Solution providers',
            w: 96,
            description:
              'We are introducing new products, and aspire to be a one stop shop, to effectively meet and surpass client needs',
          },
        ].map((card) => (
          <CardAnimation key={card.title} className="h-full min-h-0">
            <div
              className="w-full h-full bg-white rounded-3xl p-8 lg:p-10 flex flex-col group cursor-pointer transition-all duration-400 ease-out"
            >
              <Image
                data-ci
                src={card.src}
                alt={card.title}
                width={card.w}
                height={card.h}
                className="mb-8 lg:mb-10 w-[6rem] h-auto transition-transform duration-400"
                style={{ willChange: 'transform, opacity' }}
              />
              <div className="flex flex-col gap-3 lg:gap-4">
                <h1
                  data-ct
                  className="font-medium text-black text-[24px] leading-[1.2] tracking-[-1.4px] lg:text-[32px] lg:tracking-[-1.4px]"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {card.title}
                </h1>
                <p
                  data-cd
                  className="font-normal text-[#212225] text-[15.5px] leading-[1.5] lg:text-[19.2px] lg:leading-[1.5]"
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

