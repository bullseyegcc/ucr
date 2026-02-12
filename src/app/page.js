import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import coppericon from './../../public/coppericon.png';
import badge_icon from '../../public/badge.png';

import { Badge } from "./common/badge.js";
import { WhiteBadge } from "./common/badge.js";
import StatsCard from "./components/StatsCard.js";
import FeaturedProducts from "./components/FeaturedProducts.js";
import { VideoPlayer } from "./common/video";

export default function Home() {
  return (
    <div>
      <div className="flex min-h-[80vh]  font-medium  justify-center bg-black font-sans dark:bg-black">
        <VideoPlayer src="/hero.mp4" className=" object-cover " />
        <h1 className="absolute top-[40%] text-6xl  text-white font-inter">UCR shapping the future</h1>
      </div>

      <div className=" relative h-[70vh] flex   px-10 pt-20 gap-6">
        <div className="w-[70%] flex flex-col gap-10">
          <Badge title="About Us" />

          <h1 className="font-helvetica-now text-primary text-5xl">Our UAE factory combines Advanced technology with global <span className="text-secondary">experties to produce  hight-quality copper product that meet international standards</span></h1>

          <button className="bg-primary  w-44 px-5 py-3 text-white flex justify-between gap-3 rounded-full">Know more <ArrowRight size={18} color='white' /></button>
        </div>

        <div className="w-[50%] abolute right-0 top-0">
          <Image src="/aboutside.png" alt="Factory Image" width={900} height={800} className="w-full object-contain" />
        </div>
      </div>

      <div className="grid grid-cols-4 px-10 pb-20">
        <StatsCard
          mainHeading="2009"
          subHeading="Established In"
          description="Since then, our excellence has made us a trusted name in copper manufacturing."
        />
        <StatsCard
          mainHeading="20K+"
          subHeading="MT/Annum"
          description="Produces 20,000 metric tons of copper per year."
        />
        <StatsCard
          mainHeading="150+"
          subHeading="Employees"
          description="With over 150 experienced employees, we deliver quality and reliability every day."
        />
        <StatsCard
          mainHeading="50+"
          subHeading="Global sales"
          description="With a presence in 50+ countries, we serve clients on every continent."
        />
      </div>


      <div className="flex justify-center min-h-screen px-10">

        <div className="w-1/2 m-2 relative bg-[#6A3120] flex flex-col justify-end mb-20 gap-5 rounded-xl">
          <VideoPlayer src="/moreabout.mp4" className=" object-contain rounded-xl " />
          <div className="absolute bottom-0 left-0 p-8 flex flex-col justify-end gap-5 ">
            <WhiteBadge title="more about" className='z-190' />
            <h1 className="text-5xl text-white z-90 font-helvetica-now">Union Copper Rod is undeniable the most trusted copper rod manufacturer in region</h1>
            <button className='rounded-full mt-6 z-90 text-lg flex items-center gap-2 w-55 text-white border  border-secondary rounded-2xl px-5 py-3 justify-between'>Company Profile <ArrowRight size={18} color='white' /></button>
            <div className="h-[85%] bg-gradient-to-t rounded-xl from-[#6A3120] to-[#6a3120] mt-10 absolute bottom-0 left-0 w-full z-0 bg-[url('/bg.png')] bg-cover bg-center">
            </div>
          </div>

        </div>

        <div className="w-1/2 m-2 relative bg-[#6A3120] flex flex-col justify-end mb-20 gap-5 rounded-xl bg-[url('/supplychain.png')] bg-contain bg-top bg-no-repeat">
          <VideoPlayer src="/supplychain.mp4" className=" object-contain rounded-xl " />

          <div className="absolute bottom-0 left-0 p-8 flex flex-col justify-end gap-5 ">
            <WhiteBadge title="more about" className='z-190' />
            <h1 className="text-5xl text-white z-90 font-helvetica-now">Union Copper Rod is undeniable the most trusted copper rod manufacturer in region</h1>
            <button className='rounded-full mt-6 z-90 text-lg flex items-center gap-2 w-46 text-white border  border-secondary rounded-2xl px-5 py-3 justify-between'>Know More <ArrowRight size={18} color='white' /></button>
            <div className="h-[85%] bg-gradient-to-t rounded-xl from-[#6A3120] to-[#6a3120] mt-10 absolute bottom-0 left-0 w-full z-0 bg-[url('/bg.png')] bg-cover bg-center">
            </div>
          </div>

        </div>

      </div>


      <FeaturedProducts />

      <div className="relative h-[90vh] flex flex-col justify-between  bg-[url('/care.jpg')] bg-cover bg-center mx-10 my-5 rounded-xl">
        <VideoPlayer src="/sustain.mp4" className=" object-contain rounded-xl " />

        <div className="absolute top-15 px-10">
          <WhiteBadge title="What we Care" />
          <h1 className="text-4xl text-white font-semibold mt-5">Sustainability</h1>
        </div>
        <div className="grid grid-cols-3 absolute bottom-4 px-10">

          <div className="bg-white/4  backdrop-blur-sm text-center flex flex-col items-center py-12 px-10 mx-2 rounded-xl gap-3">
            <Image src="/recycle.png" alt="Care Image" width={140} height={130} />
            <h1 className="text-2xl text-white ">Recycle & Reuse</h1>
            <p className="text-secondary text-sm">Maximizing resource efficiency by recycling copper and reducing waste.</p>
          </div>

          <div className="bg-white/4  backdrop-blur-sm text-center flex flex-col items-center py-12 px-10 mx-2 rounded-xl gap-3">
            <Image src="/recycle.png" alt="Care Image" width={140} height={130} />
            <h1 className="text-2xl text-white ">Recycle & Reuse</h1>
            <p className="text-secondary text-sm">Maximizing resource efficiency by recycling copper and reducing waste.</p>
          </div>

          <div className="bg-white/4  backdrop-blur-sm text-center flex flex-col items-center py-12 px-10 mx-2 rounded-xl gap-3">
            <Image src="/recycle.png" alt="Care Image" width={140} height={130} />
            <h1 className="text-2xl text-white ">Recycle & Reuse</h1>
            <p className="text-secondary text-sm">Maximizing resource efficiency by recycling copper and reducing waste.</p>
          </div>


        </div>
      </div>


      <div className="min-h-screen flex gap-1 mx-10">
        <div className="min-h-screen w-1/2 bg-[#FA6E43] rounded-xl px-8 py-4 flex flex-col gap-12 ">
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
              <h1 className="flex gap-4 items-center  text-4xl text-white"><ArrowRight size={34} className="text-white" />Cooper treatments</h1>
              <h1 className="flex gap-4 items-center  text-4xl text-white"><ArrowRight size={34} className="text-white" />NexGen Solutions</h1>

            </div>

          </div>
        </div>
        <div className="min-h-screen w-1/2 rounded-xl bg-[url('/technology.png')] bg-cover bg-center"></div>
      </div>


      <div className="min-h-screen bg-gradient-to-b from-white via-[#FDD4BB] to-white px-10 py-20">

        <div className="text-center mb-16 flex flex-col items-center">
          <Badge title="Core Strength" />
          <h1 className="text-4xl font-semibold text-black mt-6">Why choose us</h1>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-6">
          <div className="relative flex flex-col justify-between items-start row-span-2  bg-[url('/excellence.png')] bg-cover bg-center ml-10 rounded-xl">
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

      <div className="max-h-[50vh] flex items-center justify-center  py-20 bg-white overflow-hidden">
        <div className="flex gap-8 rounded-2xl">
          <Image src="/slide1.png" alt="Product 1" width={500} height={400} className="rounded-2xl object-cover" />
          <Image src="/slide2.png" alt="Product 1" width={900} height={600} className="rounded-2xl object-cover" />
          <Image src="/slide3.png" alt="Product 1" width={500} height={400} className="rounded-2xl object-cover" />


        </div>
      </div>

      <div className='relative h-screen rounded-xl  my-20 flex flex-col items-center   gap-5'>
        
        <VideoPlayer src="/cta.mp4" className=" object-contain rounded-xl " />
        
        <div className="absolute top-20 text-center flex flex-col items-center gap-5">
          <Badge title="Global Reach" className='z-190' />
          <h1 className='text-4xl text-primary z-90'>Our global reach </h1>

          <h1 className='text-5xl text-white z-90'>From UAE to the world </h1>
        </div>
      </div>

      <div>

      </div>




      <div className="min-h-screen flex gap-1 mx-10 items-start mb-4">
        <div className="min-h-screen max-h-screen w-1/2 bg-[#FE5D0A] rounded-xl px-10 py-4 flex flex-col gap-8 ">
          <div className='mt-6'>
            <WhiteBadge title="Blogs & Articles" className='z-190 mb-5' />
            <h1 className="text-5xl my-3 text-white font-semibold mt-5 ">Latest News</h1>


          </div>


          <div className="w-full h-[900px]  relative  p-3  flex flex-col justify-start mx-2  gap-5 rounded-xl bg-[url('/hblog1.png')] bg-cover bg-top bg-no-repeat">
            <div className='z-500 px-4 text-white flex justify-between text-sm font-light pt-9'>
              <span>Writen by Bruce Sommers's</span>
              <span>Monday,April 28,2026</span>
            </div>

            <h1 className="z-500 text-4xl pl-4 text-white">UAE Copper Producer Expands Global Supply Network Across Asia & Europe</h1>

            <button className=' z-90 flex justify-center items-center gap-2 w-18 text-white border absolute bottom-2 left-4  bg-white rounded-lg px-3 py-2 '> <ArrowRight size={18} color='black' /></button>

          </div>

        </div>
        <div className="h-screen w-1/2 rounded-xl flex flex-col justify-between ">
          <div className="w-full h-1/2 mb-5 relative bg-[#6A3120] flex flex-col justify-start gap-5 rounded-xl bg-[url('/hblog2.png')] bg-cover bg-center bg-no-repeat">
            <div className='z-500 px-4 text-white flex justify-between text-sm font-light pt-9'>
              <span>Writen by Bruce Sommers's</span>
              <span>Monday,April 28,2026</span>
            </div>

            <h1 className="z-500 text-3xl pl-4 text-white">Company Launches New High-Conductivity Copper Rods for Energy Sector</h1>
            <div className="rounded-xl h-26 pl-0 absolute top-0 w-full z-0 bg-gradient-to-b from-[#FA6E43] to-transparent"></div>

          </div>

          <div className="w-full h-1/2 relative bg-[#6A3120] flex flex-col justify-start gap-5 rounded-xl bg-[url('/blog2.png')] bg-cover bg-center bg-no-repeat">
            <div className='z-500 px-4 text-white flex justify-between text-sm font-light pt-9'>
              <span>Writen by Bruce Sommers's</span>
              <span>Monday,April 28,2026</span>
            </div>

            <h1 className="z-500 text-3xl pl-4 text-white">Company Launches New High-Conductivity Copper Rods for Energy Sector</h1>
            <div className="rounded-xl h-26 pl-0 absolute top-0 w-full z-0 bg-gradient-to-b from-[#FA6E43] to-transparent"></div>

          </div>



        </div>
      </div>

    </div>



  );
}       