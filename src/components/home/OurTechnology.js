import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import { Badge } from "../../common/badge.js";
import { WhiteBadge } from "../../common/badge.js";
import { VideoPlayer } from "../../common/video";

export default function OurTechnology() {
  return (
    <>
      <div className="min-h-[70vh] sm:min-h-screen flex flex-col  sm:flex-row gap-1 sm:mx-10">
        <div className="min-h-[60vh] md:min-h-screen sm:w-1/2 bg-[#FA6E43] rounded-xl px-3 md:px-8 py-8 flex flex-col gap-12 ">
          <div className="mt-8">
            <WhiteBadge title="Core Strength" className='z-190' />
            <h1 className="text-4xl text-white font-semibold mt-4  ">Our technology</h1>

          </div>

          <div >

            <div className="rounded-xl bg-white px-5 py-9">
              <h1 className="mb-4 text-3xl font-semibold text-primary">Southwire Technology</h1>
              <p className="text-sm ">UCR always maintains that the foremost benefit of any latest technology, if applied to an efficient operation, will automatically magnify the efficiency. This in turn will empower people and will bring out the best in quality as well as productivity.
              </p>

              <button className="w-50 mt-4 flex gap-2 justify-between text-primary text-lg items-center border border-primary rounded-2xl px-5 py-2">Know More <ArrowRight size={18} className="text-primary" /></button>

            </div>

            <div className="flex flex-col gap-6 mt-20 gap-5">
              <h1 className="flex gap-4 items-center  text-2xl sm:text-4xl text-white"><ArrowRight size={28} className="text-white" />Cooper treatments</h1>
              <h1 className="flex gap-4 items-center  text-2xl sm:text-4xl text-white"><ArrowRight size={28} className="text-white" />NexGen Solutions</h1>

            </div>

          </div>
        </div>
        <div className="min-h-[60vh] sm:min-h-screen sm:w-1/2 rounded-xl bg-[url('/technology.png')] bg-cover bg-center"></div>
      </div>


      <div className="min-h-screen bg-gradient-to-b from-white via-[#FDD4BB] to-white px-10 py-20">

        <div className="text-center mb-16 flex flex-col items-center">
          <Badge title="Core Strength" />
          <h1 className="text-4xl font-semibold text-black mt-6">Why choose us</h1>
        </div>

        <div className="grid grid-cols-1   sm:grid-cols-3 grid-rows-2 gap-6">
          <div className="relative min-h-[50vh] flex flex-col justify-between items-start row-span-2  bg-[url('/excellence.png')] bg-cover bg-center md:ml-10 rounded-xl">
            <VideoPlayer src="/excellence.mp4" className=" object-contain rounded-2xl " />

            <Image src="/sign.png" alt="Icon" width={80} height={0} className=" absolute top-5 px-10" />

            <div className="text-white absolute bottom-10 px-10">
              <h1 className="text-3xl">UAE excellence</h1>
              <p className="text-sm mt-2">Factory in a world-class industrial hub</p>
            </div>

          </div>
          <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg">
            <Image src="/gn.png" alt="Icon" width={80} height={0} className="mb-6" />
            <h1 className="text-2xl font-semibold text-black">Global network</h1>
            <p className="text-sm">Factory in a world-class industrial hub</p>
          </div>

          <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg">
            <Image src="/tn.png" alt="Icon" width={80} height={40} className="mb-6" />
            <h1 className="text-2xl font-semibold text-black">Top-notch certified</h1>
            <p className=" text-sm">Factory in a world-class industrial hub</p>
          </div>

          <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg">
            <Image src="/sf.png" alt="Icon" width={80} height={40} className="mb-6" />
            <h1 className="text-2xl font-semibold text-black">Sustainable future</h1>
            <p className=" text-sm">Factory in a world-class industrial hub</p>
          </div>

          <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg">
            <Image src="/p.png" alt="Icon" width={80} height={40} className="mb-6" />
            <h1 className="text-2xl font-semibold text-black">Partnership approach</h1>
            <p className=" text-sm">Factory in a world-class industrial hub</p>
          </div>
        </div>


      </div>
    </>
  );
}
