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
    "relative z-[2] mt-8 w-fit rounded-full border border-white bg-transparent px-5 py-3 lg:px-6 lg:py-3.5 flex items-center gap-2.5 text-white transition-all duration-300 hover:bg-white hover:text-[#2B0F0A]";
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
        "relative w-full lg:w-1/2 min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] max-h-[440px] sm:max-h-[500px] lg:max-h-[560px] lg:aspect-[4/5] overflow-hidden rounded-lg lg:rounded-xl"
      }
    >
      <div className="absolute inset-0 pointer-events-none">
        <VideoPlayer
          src={videoSrc}
          className="h-full w-full object-cover rounded-lg lg:rounded-xl"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] rounded-lg lg:rounded-xl pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #2B0F0A 0%, rgba(43, 15, 10, 0.88) 40%, rgba(43, 15, 10, 0.25) 70%, transparent 100%)',
        }}
      />

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-8 lg:p-10 lg:pb-12">
        <div className="flex flex-col">
          <WhiteBadge title={badgeText} />

          <TextReveal index={3} className="relative mt-6">
            <h2 className="relative z-[2] max-w-[98%] sm:max-w-[96%] lg:max-w-[94%] xl:max-w-[min(96%,52rem)] font-primary font-normal text-white text-[1.5rem] leading-[1.15] tracking-[-0.05rem] sm:text-[1.875rem] sm:leading-[1.12] lg:text-[2.625rem] lg:leading-[1.1] lg:tracking-[-0.087rem] whitespace-pre-line">
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
