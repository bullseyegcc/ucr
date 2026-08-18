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

      {/* video Cards */}
      <ParallaxSection index={0}>
        <div className="mt-8 flex flex-col lg:flex-row justify-center min-h-screen  lg:px-10 gap-1 lg:gap-2 lg:py-8 bg-white">
        <VideoCard
          videoSrc="/moreabout.mp4"
          badgeTitle="more about"
          heading={"Union Copper Rod is undeniable the most trusted copper rod manufacturer in region"}
          buttonText="Company Profile"
          href="/aboutus"
        />

        <VideoCard
          videoSrc="/supplychain.mp4"
          badgeTitle="Supplychain"
          heading="UCR leads the region in copper rod production and has its sights on vastly expanding its enterprise"
          buttonText="Know More"
          href="/logistics"
        />
        </div>
      </ParallaxSection>

      {/* FeaturedProducts: outside ParallaxSection so scale/overflow doesn't leave silver gaps around the image */}
      <div className="relative w-full" style={{ zIndex: 11 }}>
        <FeaturedProducts products={products} />
      </div>

      {/* WeCareSection: mounted outside ParallaxSection so mobile horizontal scroll works (no overflow-hidden + transform ancestor) */}
      <div className="relative w-full" style={{ zIndex: 12 }}>
        <WeCareSection />
      </div>

      <ParallaxSection index={3}>
        <OurTechnology />
      </ParallaxSection>

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

      <ParallaxSection index={7} parallaxAmount={-30}>
        <Articles posts={posts} />
      </ParallaxSection>

    </div>



  );
}       
