'use client';

import { ArrowDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { VideoPlayer } from "./video";
import { WhiteBadge } from "./badge.js";
import TextReveal from "../animations/TextReveal";

export const VideoCard = ({
  videoSrc,
  badgeText,
  title,
  buttonText = "Know More",
  buttonUrl,
  buttonIcon = "right",
  className = "",
}) => {
  const ctaClassName =
    "relative z-[2] mt-8 inline-flex w-full items-center justify-center gap-2.5 self-stretch rounded-full border border-white bg-transparent px-5 py-3.5 text-white transition-all duration-300 hover:bg-white hover:text-[#2B0F0A] lg:mt-8 lg:w-fit lg:self-start lg:px-6 lg:py-3.5";
  const Icon = buttonIcon === "down" ? ArrowDown : ArrowRight;

  const ctaContent = (
    <>
      <span className="font-primary font-normal text-[15px] leading-none tracking-[-0.5px] lg:text-[18px] lg:tracking-[-0.66px]">
        {buttonText}
      </span>
      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
    </>
  );

  return (
    <div
      className={
        className ||
        "relative w-full lg:w-1/2 min-h-[420px] sm:min-h-[460px] lg:min-h-[480px] max-h-[480px] sm:max-h-[520px] lg:max-h-[560px] lg:aspect-[4/5] overflow-hidden rounded-2xl lg:rounded-xl"
      }
    >
      <div className="absolute inset-0 pointer-events-none">
        <VideoPlayer
          src={videoSrc}
          className="h-full w-full object-cover rounded-2xl lg:rounded-xl"
        />
      </div>

      {/* Mobile: solid brown base + soft fade into video; desktop keeps lighter blend */}
      <div
        className="absolute inset-0 z-[1] rounded-2xl lg:rounded-xl pointer-events-none lg:hidden"
        style={{
          background:
            'linear-gradient(to top, #3A1810 0%, #3A1810 32%, rgba(58, 24, 16, 0.92) 48%, rgba(58, 24, 16, 0.45) 68%, rgba(58, 24, 16, 0.12) 82%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1] hidden rounded-xl pointer-events-none lg:block"
        style={{
          background:
            'linear-gradient(to top, #2B0F0A 0%, rgba(43, 15, 10, 0.88) 40%, rgba(43, 15, 10, 0.25) 70%, transparent 100%)',
        }}
      />

      <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 pb-7 pt-10 sm:px-8 sm:pb-8 lg:p-10 lg:pb-12">
        <div className="flex flex-col items-stretch">
          <WhiteBadge title={badgeText} />

          <TextReveal index={3} className="relative mt-5 sm:mt-6">
            <h2 className="relative z-[2] max-w-full font-primary font-normal text-white text-[1.625rem] leading-[1.18] tracking-[-0.04rem] sm:text-[1.875rem] sm:leading-[1.12] lg:text-[2.625rem] lg:leading-[1.1] lg:tracking-[-0.087rem] whitespace-pre-line">
              {title}
            </h2>
          </TextReveal>

          {buttonUrl ? (
            <Link href={buttonUrl} className={ctaClassName}>
              {ctaContent}
            </Link>
          ) : (
            <span className={ctaClassName}>{ctaContent}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
