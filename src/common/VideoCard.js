import { ArrowRight } from 'lucide-react';
import { VideoPlayer } from "./video";
import { WhiteBadge } from "./badge.js";
import TextReveal from "../animations/TextReveal";

export const VideoCard = ({ 
  videoSrc, 
  badgeTitle, 
  heading, 
  buttonText = "Know More",
  bgImage = "/bg.png"
}) => {
  return (
    <div className="w-full lg:w-1/2 h-90 lg:h-auto m-0 lg:m-2 relative bg-[#6A3120] flex flex-col justify-end mb-6 lg:mb-20 gap-5 rounded-lg lg:rounded-xl">
      <VideoPlayer src={videoSrc} className="object-contain rounded-xl" />
      <div className="absolute bottom-0 left-0 p-2 pb-4 lg:p-8 flex flex-col justify-end gap-4 lg:gap-5 w-full">
        <WhiteBadge title={badgeTitle} className='z-190' />
        <TextReveal index={3} className="relative z-[100]">
          <h1 className="font-primary font-normal text-[24px] leading-[31.79px] tracking-[-0.79px] lg:text-[42px] lg:leading-[56px] lg:tracking-[-1.39px] text-white z-[100]">
            {heading}
          </h1>
        </TextReveal>
        <button className='w-[352px] h-[45.192054748535156px] rounded-full lg:w-60 lg:h-auto mt-4 z-90 text-sm lg:text-lg flex items-center justify-center lg:justify-start gap-2 text-white border-[0.57px] border-white   pl-[10.22px] pr-[10.22px] py-[11.81px] lg:px-4 lg:py-3  transition-all duration-300 hover:bg-white hover:text-[#6A3120] hover:gap-5'>
          <span className="font-primary font-normal text-[16px] leading-[16.69px] tracking-[-0.5px] text-center align-middle lg:text-[20px] lg:leading-[29.4px] lg:tracking-[-0.88px]">{buttonText}</span>
          <ArrowRight size={16} />
        </button>
        <div className="h-[85%] lg:h-[130%] bg-gradient-to-t rounded-xl from-[#6A3120] to-[#6a3120] mt-10 absolute bottom-0 left-0 w-full z-0 bg-[url('/bg.png')] bg-cover bg-center">
        </div>
      </div>
    </div>
  );
};
