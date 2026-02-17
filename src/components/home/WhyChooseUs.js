'use client';

import Image from "next/image";
import { Badge } from "../../common/badge.js";
import { VideoPlayer } from "../../common/video";

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FDD4BB] to-white px-10 py-20">

      <div className="text-center mb-16 flex flex-col items-center">
        <Badge title="Core Strength" />
        <h1 className="text-4xl font-semibold text-black mt-6">Why choose us</h1>
      </div>

      <div className="grid grid-cols-1   sm:grid-cols-3 grid-rows-2 gap-6">
        <div className="relative min-h-[50vh] flex flex-col justify-between items-start row-span-2  bg-[url('/excellence.png')] bg-cover bg-center md:ml-10 rounded-xl group cursor-pointer transition-all duration-400 ease-out hover:scale-105">
          <VideoPlayer src="/excellence.mp4" className=" object-contain rounded-2xl " />

          <Image src="/sign.png" alt="Icon" width={80} height={0} className=" absolute top-5 px-10" />

          <div className="text-white absolute bottom-10 px-10">
            <h1 className="text-3xl">UAE excellence</h1>
            <p className="text-sm mt-2">Factory in a world-class industrial hub</p>
          </div>

        </div>
        <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl">
          <Image src="/gn.png" alt="Icon" width={80} height={0} className="mb-6 transition-transform duration-400 group-hover:scale-110" />
          <h1 className="text-2xl font-semibold text-black">Global network</h1>
          <p className="text-sm">Factory in a world-class industrial hub</p>
        </div>

        <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl">
          <Image src="/tn.png" alt="Icon" width={80} height={40} className="mb-6 transition-transform duration-400 group-hover:scale-110" />
          <h1 className="text-2xl font-semibold text-black">Top-notch certified</h1>
          <p className=" text-sm">Factory in a world-class industrial hub</p>
        </div>

        <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl">
          <Image src="/sf.png" alt="Icon" width={80} height={40} className="mb-6 transition-transform duration-400 group-hover:scale-110" />
          <h1 className="text-2xl font-semibold text-black">Sustainable future</h1>
          <p className=" text-sm">Factory in a world-class industrial hub</p>
        </div>

        <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-lg group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl">
          <Image src="/p.png" alt="Icon" width={80} height={40} className="mb-6 transition-transform duration-400 group-hover:scale-110" />
          <h1 className="text-2xl font-semibold text-black">Partnership approach</h1>
          <p className=" text-sm">Factory in a world-class industrial hub</p>
        </div>
      </div>

    </div>
  );
}
