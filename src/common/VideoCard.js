'use client';

import { ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { VideoPlayer } from "./video";
import { WhiteBadge } from "./badge.js";
import TextReveal from "../animations/TextReveal";

export const VideoCard = ({ 
  videoSrc, 
  badgeTitle, 
  heading, 
  buttonText = "Know More",
  href = null
}) => {
  const router = useRouter();

  return (
    <div className="relative w-full lg:w-1/2 min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] max-h-[520px] sm:max-h-[580px] lg:max-h-[680px] lg:aspect-[4/5] overflow-hidden rounded-lg lg:rounded-xl mb-6 lg:mb-20 m-0 lg:m-2">
      {/* Full-bleed background video */}
      <div className="absolute inset-0">
        <VideoPlayer
          src={videoSrc}
          className="h-full w-full object-cover rounded-lg lg:rounded-xl"
        />
      </div>

      {/* Dark gradient overlay — heaviest at bottom */}
      <div
        className="absolute inset-0 z-[1] rounded-lg lg:rounded-xl pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #2B0F0A 0%, rgba(43, 15, 10, 0.88) 40%, rgba(43, 15, 10, 0.25) 70%, transparent 100%)',
        }}
      />

      {/* Bottom-aligned content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-8 lg:p-10 lg:pb-12">
        <div className="flex flex-col">
          <WhiteBadge title={badgeTitle} />

          <TextReveal index={3} className="relative mt-6">
            <h2 className="relative z-[2] max-w-[88%] sm:max-w-[82%] lg:max-w-[75%] xl:max-w-[min(75%,36rem)] font-primary font-normal text-white text-[24px] leading-[1.15] tracking-[-0.79px] sm:text-[30px] sm:leading-[1.12] lg:text-[42px] lg:leading-[1.1] lg:tracking-[-1.39px] whitespace-pre-line">
              {heading}
            </h2>
          </TextReveal>

          <button
            type="button"
            onClick={() => href && router.push(href)}
            className="relative z-[2] mt-8 w-fit rounded-full border border-white bg-transparent px-5 py-3 lg:px-6 lg:py-3.5 flex items-center gap-2.5 text-white transition-all duration-300 hover:bg-white hover:text-[#2B0F0A]"
          >
            <span className="font-primary font-normal text-[15px] leading-none tracking-[-0.5px] lg:text-[18px] lg:tracking-[-0.66px]">
              {buttonText}
            </span>
            <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
