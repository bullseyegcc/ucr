"use client"

import Image from "next/image"
import { Badge } from "../common/badge"

export default function JourneySection() {
  return (
    <section className="w-full py-24 bg-[linear-gradient(164deg,#FFF_8.84%,#FA6E43_118.41%)] flex flex-col items-center">

      {/* Top Small Label */}
       <Badge title="Our Story " className=" md:mb-4" />

      {/* Main Heading */}
      <h2 className="text-3xl md:text-5xl font-medium text-black mb-16 mt-6">
        Over the years
      </h2>

      {/* Main Timeline Card */}
      <div className="w-[85%] max-w-6xl h-[420px] rounded-3xl overflow-hidden flex md:flex-row flex-col shadow-xl">

        {/* Left Image */}
        <div className="md:w-1/2 relative">
          <Image
            src="/2009img.png"
            alt="2009 factory"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 bg-[#F26522] text-white relative px-16 py-14 flex flex-col justify-center">

          {/* Decorative Top Right Lines */}
          <div className="absolute top-20 right-6 opacity-20">
            <div className="w-24 h-24 bg-white rounded-full blur-3xl"></div>
          </div>

          {/* Year */}
          <h1 className="text-[110px] font-light leading-none mb-8">
            2009
          </h1>

          {/* Title */}
          <h3 className="text-3xl font-semibold mb-4">
            Founded With Vision
          </h3>

          {/* Description */}
          <p className="text-base leading-relaxed max-w-lg opacity-90">
            Founded with a steadfast dedication to accuracy, quality, and innovation,
            our journey in copper production began with a clear purpose —
            to set new benchmarks in the industry. Every process, from sourcing
            to refinement, reflects our pursuit of perfection and reliability.
          </p>
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="w-[85%] max-w-6xl mt-20 relative">

        {/* Horizontal Line */}

        <div className="flex justify-between items-center relative ">
                   <div className="absolute bottom-6 px-10 left-0 w-full h-[2px] bg-white/40 z-0"></div>

          {/* 2009 Active */}
          <div className="flex flex-col items-center z-90">
            <span className="text-white text-2xl mb-4">2009</span>
            <div className="w-12 h-12 bg-[#F26522] rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          {/* 2013 */}
          <div className="flex flex-col items-center opacity-60 z-90">
            <span className="text-white text-2xl mb-4">2013</span>
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* 2018 */}
          <div className="flex flex-col items-center opacity-60 z-90">
            <span className="text-white text-2xl mb-4">2018</span>
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* 2024 */}
          <div className="flex flex-col items-center opacity-60 z-90">
            <span className="text-white text-2xl mb-4">2024</span>
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
