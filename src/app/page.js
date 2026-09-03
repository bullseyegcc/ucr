import { VideoCard } from "../common/VideoCard.js";
import FeaturedProducts from "../components/home/FeaturedProducts.js";
import WeCareSection from "../components/home/WeCareSection.js";
import OurTechnology from "../components/home/OurTechnology.js";
import CTA from "../components/home/CTA.js";
import Articles from "../components/home/Articles.js";
import ParallaxSection from "../animations/ParallaxSection.js";
import HorizontalScrollGallery from "../common/HorizontalScrollGallery.js";
import WhyChooseUs from "../components/home/WhyChooseUs.js";
import HomeHeroAbout from "../components/home/HomeHeroAbout.js";
import { getProducts } from "../lib/wordpress/products";
import { getPosts } from "../lib/wordpress/posts";

export default async function Home() {
  const [products, posts] = await Promise.all([getProducts(), getPosts()]);

  return (
    <div className="bg-white">
      {/* Hero → About with scroll-locked heading colour animation */}
      <HomeHeroAbout />

      {/* video Cards follow the About panel (panel height matches content on mobile) */}
      <div className="relative z-10 w-full bg-white">
        <ParallaxSection index={0}>
          <div className="max-w-[1600px] mx-auto w-full px-[1rem] sm:px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem] mt-8 mb-8 lg:my-8 flex flex-col lg:flex-row justify-center lg:max-h-[1000px] gap-3 lg:gap-2 bg-white">
            <VideoCard
              videoSrc="/moreabout.mp4"
              badgeText="More about"
              title={
                "Driven by excellence, Union Copper Rod delivers premium copper products that support critical industries across the region and beyond"
              }
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
      </div>

      {/* FeaturedProducts: outside ParallaxSection so scale/overflow doesn't leave silver gaps around the image */}
      <div className="relative w-full" style={{ zIndex: 11 }}>
        <FeaturedProducts products={products} />
      </div>

      {/* WeCareSection: mounted outside ParallaxSection so mobile horizontal scroll works (no overflow-hidden + transform ancestor) */}
      <div className="relative w-full" style={{ zIndex: 12 }}>
        <WeCareSection />
      </div>

      <div className="relative w-full" style={{ zIndex: 13 }}>
        <OurTechnology />
      </div>

      {/* Outside ParallaxSection: transform ancestors break CardAnimation ScrollTriggers (cards stuck opacity:0) */}
      <div className="relative w-full" style={{ zIndex: 14 }}>
        <WhyChooseUs />
      </div>

      <div className="relative w-full lg:my-8 mt-0 mb-4" style={{ zIndex: 15 }}>
        <HorizontalScrollGallery
          images={["/home/slide1.png", "/home/slide2.png", "/home/slide3.png"]}
        />
      </div>

      {/* Outside ParallaxSection: negative y + overflow-hidden was clipping CTA headline */}
      <div className="relative w-full" style={{ zIndex: 17 }}>
        <CTA />
      </div>

      <div className="relative w-full" style={{ zIndex: 18 }}>
        <Articles posts={posts} />
      </div>
    </div>
  );
}
