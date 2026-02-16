import { Badge } from "../../common/badge.js";
import { VideoPlayer } from "../../common/video.js";

export default function CTA() {
  return (
    <div className='relative min-h-[60vh] md:h-screen rounded-xl my-20 flex flex-col items-center gap-5 overflow-hidden'>
      
      <VideoPlayer src="/cta.mp4" className="absolute inset-0 w-full h-full object-cover" />
      
      <div className="absolute top-20 text-center flex flex-col items-center gap-5 z-10">
        <Badge title="Global Reach" className='z-190' />
        <h1 className='text-2xl sm:text-4xl text-primary z-90'>Our global reach </h1>

        <h1 className='text-3xl sm:text-5xl text-white z-90'>From UAE to the world </h1>
      </div>
    </div>
  );
}
