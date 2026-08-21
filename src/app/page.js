import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import coppericon from './../../public/coppericon.png';
import badge_icon from '../../public/badge.png';

import { Badge } from "../common/badge.js";
import { WhiteBadge } from "../common/badge.js";
import { VideoCard } from "../common/VideoCard.js";
import StatsCard from "../common/StatsCard.js";
import FeaturedProducts from "../components/home/FeaturedProducts.js";
import WeCareSection from "../components/home/WeCareSection.js";
import OurTechnology from "../components/home/OurTechnology.js";
import CTA from "../components/home/CTA.js";
import Articles from "../components/home/Articles.js";
import ParallaxSection from "../animations/ParallaxSection.js";
import HorizontalScrollGallery from "../common/HorizontalScrollGallery.js";
import WhyChooseUs from "../components/home/WhyChooseUs.js";
import HomeHeroAbout from "../components/home/HomeHeroAbout.js";

export default function Home() {
  return (
    <div className="bg-white">
 
      {/* Hero → About with scroll-locked heading colour animation */}
      <HomeHeroAbout />

      {/* video Cards */}
      <ParallaxSection index={0}>
        <div className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem] mt-8 flex flex-col lg:flex-row justify-center lg:min-h-[min(100vh,1000px)] lg:max-h-[1000px] gap-1 lg:gap-2 lg:py-8 bg-white">
        <VideoCard
          videoSrc="/moreabout.mp4"
          badgeText="Our Company"
          title={"Driven by excellence,\nUnion Copper Rod delivers premium copper products that support critical industries across the region and beyond"}
          buttonText="Company profile"
          buttonUrl="/aboutus"
        />

        <VideoCard
          videoSrc="/supplychain.mp4"
          badgeText="Supply Chain"
          title="A resilient supply chain built to support reliable delivery across regional and global markets."
          buttonText="Know more"
          buttonUrl="/logistics"
        />
        </div>
      </ParallaxSection>

      {/* FeaturedProducts: outside ParallaxSection so scale/overflow doesn't leave silver gaps around the image */}
      <div className="relative w-full" style={{ zIndex: 11 }}>
        <FeaturedProducts />
      </div>

      {/* WeCareSection: mounted outside ParallaxSection so mobile horizontal scroll works (no overflow-hidden + transform ancestor) */}
      <div className="relative w-full" style={{ zIndex: 12 }}>
        <WeCareSection />
      </div>

      <div className="relative w-full" style={{ zIndex: 13 }}>
        <OurTechnology />
      </div>

      <ParallaxSection index={4}>
        <WhyChooseUs />
      </ParallaxSection>

      <ParallaxSection index={5}>
        <HorizontalScrollGallery 
          images={['/slide1.png', '/slide2.png', '/slide3.png']}
        />
      </ParallaxSection>

      <ParallaxSection index={6}>
        <CTA />
      </ParallaxSection>

      <div className="relative w-full" style={{ zIndex: 18 }}>
        <Articles />
      </div>

    </div>



  );
}       
