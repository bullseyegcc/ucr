import { WhiteBadge } from "../../common/badge.js";
import { VideoPlayer } from "../../common/video.js";

export default function CTA() {
  return (
    <div className="relative h-[min(100vh,1000px)] max-h-[1000px] w-full flex flex-col items-center gap-5 overflow-hidden">
      <VideoPlayer src="/cta.mp4" className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute top-[2.5rem] sm:top-[3.5rem] inset-x-0 z-10">
        <div className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem] text-center flex flex-col items-center gap-[1.25rem]">
          <WhiteBadge title="World Wide" className="z-190" />
          <h1 className="font-primary font-medium text-[1.5rem] leading-[1.2] tracking-[-0.03em] sm:text-[2.25rem] text-primary z-90">Our global reach </h1>
          <h1 className="font-primary font-medium text-[1.875rem] leading-[1.2] tracking-[-0.03em] sm:text-[3rem] text-white z-90">From UAE to the world </h1>
        </div>
      </div>
    </div>
  );
}
