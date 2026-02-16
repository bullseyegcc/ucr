import { ArrowRight } from 'lucide-react';
import { VideoPlayer } from "./video";
import { WhiteBadge } from "./badge.js";

export const VideoCard = ({ 
  videoSrc, 
  badgeTitle, 
  heading, 
  buttonText = "Know More",
  bgImage = "/bg.png"
}) => {
  return (
    <div className="w-full md:w-1/2 h-80 md:h-auto m-0 md:m-2 relative bg-[#6A3120] flex flex-col justify-end mb-6 md:mb-20 gap-5 rounded-xl">
      <VideoPlayer src={videoSrc} className="object-contain rounded-xl" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col justify-end gap-4 md:gap-5 w-full">
        <WhiteBadge title={badgeTitle} className='z-190' />
        <h1 className="text-2xl md:text-[42px] text-white z-90 leading-snug">
          {heading}
        </h1>
        <button className='rounded-full mt-4 z-90 text-sm md:text-lg flex items-center gap-2 text-white border border-secondary rounded-2xl px-4 md:px-5 py-2 md:py-3 w-fit justify-between'>
          {buttonText} <ArrowRight size={16} color='white' />
        </button>
        <div className="h-[85%] md:h-[130%] bg-gradient-to-t rounded-xl from-[#6A3120] to-[#6a3120] mt-10 absolute bottom-0 left-0 w-full z-0 bg-[url('/bg.png')] bg-cover bg-center">
        </div>
      </div>
    </div>
  );
};
