import Image from "next/image";
import { VideoPlayer } from "../../common/video";
import { WhiteBadge } from "../../common/badge.js";

export default function WeCareSection() {
  return (
    <div className="relative min-h-[80vh] px-5 sm:px-0 sm:h-[90vh] flex flex-col justify-between bg-[url('/care.jpg')] bg-cover bg-center mx-4 md:mx-10 my-5 rounded-xl overflow-hidden">
      <VideoPlayer src="/sustain.mp4" className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute top-6 md:top-15 px-4 md:px-10 z-10">
        <WhiteBadge title="What we Care" />
        <h1 className="text-2xl md:text-4xl text-white font-semibold mt-3 md:mt-5">Sustainability</h1>
      </div>

      <div className="absolute bottom-4 w-full z-20">
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-10 w-full overflow-x-auto md:overflow-visible snap-x md:snap-none">

          <div className="flex-none w-90 sm:w-full md:min-w-0 bg-white/20 backdrop-blur-sm text-center flex flex-col items-center py-8 px-6 mx-2 rounded-xl gap-3 shadow-lg snap-start">
            <Image src="/recycle.png" alt="Care Image" width={140} height={130} className="w-40 h-25 md:w-46 md:h-[130px]" />
            <h1 className="text-lg md:text-2xl text-white font-medium">Recycle & Reuse</h1>
            <p className="text-secondary text-sm md:text-sm">Maximizing resource efficiency by recycling copper and reducing waste.</p>
          </div>

          <div className="flex-none w-90 sm:w-full bg-white/20 backdrop-blur-sm text-center flex flex-col items-center py-8 px-6 mx-2 rounded-xl gap-3 shadow-lg snap-start">
            <Image src="/recycle.png" alt="Care Image" width={140} height={130} className="w-40 h-25 md:w-46 md:h-[130px]" />
            <h1 className="text-lg md:text-2xl text-white font-medium">Sustainable Sourcing</h1>
            <p className="text-secondary text-sm md:text-sm">Using responsibly sourced materials and ethical supply chains.</p>
          </div>

          <div className="flex-none w-90 sm:w-full bg-white/20 backdrop-blur-sm text-center flex flex-col items-center py-8 px-6 mx-2 rounded-xl gap-3 shadow-lg snap-start">
            <Image src="/recycle.png" alt="Care Image" width={140} height={130} className="w-40 h-25 md:w-46 md:h-[130px]" />
            <h1 className="text-lg md:text-2xl text-white font-medium">Energy Efficiency</h1>
            <p className="text-secondary text-sm md:text-sm">Reducing our carbon footprint through efficient operations.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
