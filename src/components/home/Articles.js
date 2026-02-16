import { ArrowRight } from 'lucide-react';
import { WhiteBadge } from "../../common/badge.js";
import Link from "next/link";

export default function Articles() {
  return (
    <div className="min-h-[60vh] sm:min-h-screen flex flex-col items-center sm:flex-row gap-1 sm:mx-10 items-start mb-4">
      <Link href="/blogs/uae-copper-producer-expands-global-supply" className="md:min-h-[60vh] max-h-screen sm:w-1/2 bg-[#FE5D0A] rounded-xl px-2 sm:px-10 py-4 flex flex-col gap-8">
        <div className='mt-6'>
          <WhiteBadge title="Blogs & Articles" className='z-190 mb-5' />
          <h1 className="text-5xl my-3 text-white font-semibold mt-5 ">Latest News</h1>


        </div>


        <div className="w-full h-[500px] sm:h-[900px]  relative  p-3  flex flex-col justify-start mx-2  gap-5 rounded-xl bg-[url('/hblog1.png')] bg-cover bg-top bg-no-repeat">
          <div className='z-500 px-4 text-white flex justify-between text-sm font-light pt-9'>
            <span>Writen by Bruce Sommers's</span>
            <span>Monday,April 28,2026</span>
          </div>

          <h1 className="z-500 text-xl sm:text-4xl pl-4 text-white">UAE Copper Producer Expands Global Supply Network Across Asia & Europe</h1>

          <button className=' z-90 flex justify-center items-center gap-2 w-18 text-white border absolute bottom-2 left-4  bg-white rounded-lg px-3 py-2 '> <ArrowRight size={18} color='black' /></button>

        </div>

      </Link>
      <div className="min-h-[60vh] sm:h-screen sm:w-1/2 rounded-xl flex flex-col items-center md:justify-between ">
        <Link href="/blogs/high-conductivity-copper-rods-energy-sector" className="w-full h-[45vh] sm:h-1/2 md:mb-5 relative bg-[#6A3120] flex flex-col  gap-16 md:gap-6 md:justify-start gap-5 rounded-xl bg-[url('/hblog2.png')] bg-cover bg-center bg-no-repeat">
          <div className='z-500 px-4 text-white flex justify-between text-sm font-light pt-9'>
            <span>Writen by Bruce Sommers's</span>
            <span>Monday,April 28,2026</span>
          </div>

          <h1 className="z-500 text-3xl md:text-3xl pl-4 text-white">Company Launches New High-Conductivity Copper Rods for Energy Sector</h1>
          <div className="rounded-xl h-90 md:h-26 pl-0 absolute top-0 w-full z-0 bg-gradient-to-b from-[#FA6E43] to-transparent"></div>

        </Link>

        <div className="w-full h-[45vh] md:h-1/2 relative bg-[#6A3120] hidden md:flex flex-col justify-start gap-16 md:gap-6 rounded-xl bg-[url('/blog2.png')] bg-cover bg-center bg-no-repeat">
          <div className='z-500 px-4 text-white flex justify-between text-sm font-light pt-9'>
            <span>Writen by Bruce Sommers's</span>
            <span>Monday,April 28,2026</span>
          </div>

          <h1 className="z-500 text-3xl pl-4 text-white">Company Launches New High-Conductivity Copper Rods for Energy Sector</h1>
          <div className="rounded-xl h-90 md:h-26 pl-0 absolute top-0 w-full z-0 bg-gradient-to-b from-[#FA6E43] to-transparent"></div>

        </div>

        <Link href="/blogs" className="border my-8 border-primary w-80 px-5 py-3 text-primary md:hidden flex justify-center items-center gap-3 rounded-full text-xl">Read more <ArrowRight size={22} className="text-primary" /></Link>


      </div>
    </div>
  );
}
