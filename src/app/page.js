import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import coppericon from './../../public/coppericon.png';
import badge_icon from '../../public/badge.png';

import { Badge } from "../common/badge.js";
import { WhiteBadge } from "../common/badge.js";
import { VideoCard } from "../common/VideoCard.js";
import StatsCard from "../components/StatsCard.js";
import FeaturedProducts from "../components/home/FeaturedProducts.js";
import WeCareSection from "../components/home/WeCareSection.js";
import About from "../components/home/About.js";
import OurTechnology from "../components/home/OurTechnology.js";
import CTA from "../components/home/CTA.js";
import Articles from "../components/home/Articles.js";
import { VideoPlayer } from "../common/video";

export default function Home() {
  return (
    <div>

      {/* header */}
      <div className="relative flex min-h-[80vh] sm:min-h-[90vh] font-medium justify-center bg-black font-sans dark:bg-black overflow-hidden">
        <VideoPlayer src="/hero.mp4" className="absolute inset-0 w-full h-full object-cover" />
        <h1 className="absolute bottom-[50%] lg:top-[40%] text-3xl lg:text-4xl lg:text-6xl text-white px-4 lg:px-0 text-center z-10">UCR shapping the future</h1>
      </div>


      <About />

      {/* video Cards */}
      <div className="flex flex-col lg:flex-row justify-center min-h-auto lg:min-h-screen px-4 lg:px-10 gap-1 lg:gap-2 lg:py-8 lg:py-0">
        <VideoCard
          videoSrc="/moreabout.mp4"
          badgeTitle="more about"
          heading="Union Copper Rod is undeniable the most trusted copper rod manufacturer in region"
          buttonText="Company Profile"
        />

        <VideoCard
          videoSrc="/supplychain.mp4"
          badgeTitle="Supplychain"
          heading="UCR leads the region in copper rod production and has its sights on vastly expanding its enterprise"
          buttonText="Know More"
        />
      </div>


      <FeaturedProducts />

      <WeCareSection />

      <OurTechnology />

      <div className="max-h-[50vh] flex items-center justify-center  py-20 bg-white overflow-hidden">
        <div className="flex gap-8 rounded-2xl">
          <Image src="/slide1.png" alt="Product 1" width={500} height={400} className="rounded-2xl object-cover" />
          <Image src="/slide2.png" alt="Product 1" width={900} height={600} className="rounded-2xl object-cover" />
          <Image src="/slide3.png" alt="Product 1" width={500} height={400} className="rounded-2xl object-cover" />


        </div>
      </div>

      <CTA />

      <Articles />

    </div>



  );
}       
