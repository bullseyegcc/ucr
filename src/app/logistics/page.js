"use client";

import { VideoPlayer } from "../../common/video";
import { Badge } from "../../common/badge";
import Hero from "@/components/shared/Hero";
import ExpertiseCard from "@/components/shared/ExpertiseCard";
import LogisticsAdvantageSection from "../../components/logistics/LogisticsAdvantageSection";
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";

export default function Logistics() {
  return (
    <div className="bg-[#F5F5F5]">
      <Hero
        badge="Our Logistics"
        title="UCR has a higher delivery capacity in the Copper Industry"
        titleClassName="lg:w-[65%] px-5"
        titleDirectFade
        titleInH1={false}
        className="mb-[42%] lg:mb-[22%] flex flex-col items-center justify-center"
        minHeightClass="min-h-[55vh] sm:min-h-[80vh]"
        gapClass="gap-2"
        background={{
          type: "image",
          src: "/logistics/logisticsbg.webp",
          priority: true,
          quality: 80,
          imageClassName: "object-bottom object-center",
        }}
        media={{
          type: "image",
          src: "/logistics/logisticspic.webp",
          alt: "UCR logistics operations",
          priority: true,
          sizes: "(max-width: 1024px) 95vw, 90vw",
          quality: 85,
        }}
      />

      {/* What we're Capable of */}

      <div className="bg-[#F5F5F5]">
        {/* header */}
        <div className=" flex flex-col items-center justify-center text-center pt-6 pb-6 lg:pt-32 lg:pb-8">
          <SlideIn
            direction="bottom"
            scrollTrigger={true}
            duration={0.8}
            className="mb-2 lg:mb-3"
          >
            <Badge title="Strength" />
          </SlideIn>
          <FadeIn
            className="font-medium text-3xl lg:text-6xl mt-2"
            duration={0.8}
            scrollTrigger={true}
          >
            <h1>What we're capable of</h1>
          </FadeIn>
          <FadeIn
            className="mt-3 lg:mt-4 max-w-xl px-6"
            duration={0.8}
            delay={0.15}
            scrollTrigger={true}
          >
            <p className="text-base lg:text-xl leading-relaxed text-[#212225]/70">
              A resilient responsible supply chain built to ensure continuity,
              reliability, and responsive delivery across global markets.
            </p>
          </FadeIn>
        </div>

        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-end justify-center gap-6 px-6 pt-2 pb-3 lg:flex-row lg:px-10 lg:pt-4 lg:pb-4">
          <ExpertiseCard
            index={0}
            variant="tall"
            number={200}
            title="Supply Chain partners Connected worldwide"
            description="Bringing together suppliers, logistics providers, and stakeholders through a unified global network."
            image="/logistics/logistics1.svg"
            imageAlt="Supply chain truck"
            imageWidth={437}
            imageHeight={336}
            descriptionClassName="max-w-[80%]"
            imageClassName="-bottom-5 left-0 h-auto w-[92%]"
          />

          <ExpertiseCard
            index={1}
            variant="medium"
            number={400}
            duration={2.5}
            numberClassName="text-[2.5rem] leading-none lg:text-[3.625rem]"
            suffix={
              <>
                K+ <sub className="text-[0.38em] leading-none">K-MT</sub>
              </>
            }
            title="handling yearly cargo"
            description="18K + Containers and land shipments annually managed with precision, efficiency, and operational excellence."
            image="/logistics/logistics2.svg"
            imageAlt="Yearly cargo container"
            imageWidth={257}
            imageHeight={446}
            descriptionClassName="max-w-[70%]"
            imageClassName="-bottom-16 right-0 h-auto w-[68%] lg:w-[72%]"
          />

          <ExpertiseCard
            index={2}
            variant="small"
            number={60}
            title="Global logistic partners"
            description="Trusted network of industry-leading logistics partners enables reliable, responsive, and seamless delivery across key international markets."
            image="/logistics/logistics3.svg"
            imageAlt="Global logistics ship"
            imageWidth={249}
            imageHeight={172}
            descriptionClassName="max-w-[70%]"
            imageClassName="-bottom-2 -right-9 h-auto w-[58%] lg:w-[62%]"
          />
        </div>

        <div className="mx-auto flex w-full max-w-[1600px] flex-col-reverse items-start justify-center gap-6 px-6 pt-3 pb-8 lg:flex-row-reverse lg:px-10 lg:pt-4 lg:pb-10">
          <ExpertiseCard
            index={0}
            variant="tall"
            number={40}
            numberClassName="text-[2.5rem] leading-none lg:text-[3.625rem]"
            suffix={
              <>
                {" "}
                <sub className="text-[0.38em] leading-none">K-MT</sub>
              </>
            }
            title="Warehousing Management Capacity"
            description="Extensive storage infrastructure and equipment supporting operational agility and supply chain efficiency."
            image="/logistics/logistics6.svg"
            imageAlt="Warehousing facility"
            imageWidth={333}
            imageHeight={343}
            descriptionClassName="max-w-[80%]"
            imageClassName="bottom-0 right-0 h-auto w-[72%]"
          />

          <ExpertiseCard
            index={1}
            variant="medium"
            number={24}
            duration={2.5}
            suffix=" hrs"
            title="Port & Customs Processing"
            description="Leveraging the UAE's world-class port infrastructure and efficient customs clearance to support reliable inbound and outbound cargo movement."
            image="/logistics/logistics5.svg"
            imageAlt="Port and customs container"
            imageWidth={320}
            imageHeight={329}
            descriptionClassName="max-w-[65%]"
            imageClassName="bottom-0 right-0 h-auto w-[70%]"
          />

          <ExpertiseCard
            index={2}
            variant="small"
            number={50}
            title="Global Destinations"
            description="Connecting partners across 50+ countries through a well-established international logistics network."
            image="/about/exp3.png"
            imageAlt="Global destinations globe"
            imageWidth={300}
            imageHeight={80}
            descriptionClassName="max-w-[80%]"
            imageClassName="bottom-0 right-0 h-auto w-[82%]"
          />
        </div>
      </div>

      <div className="bg-white pt-16 lg:pt-20 flex flex-col">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1600px] flex px-5 lg:px-10 flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-18 lg:gap-12 mb-12 lg:mb-16 lg:mb-20">
          <SlideIn
            direction="left"
            scrollTrigger={true}
            duration={0.8}
            className="flex-1"
          >
            <h1 className="text-lg  lg:text-2xl text-primary">
              Global Presence
            </h1>
            <h1 className="text-3xl lg:text-4xl lg:text-5xl font-semibold text-black mt-4 lg:mt-5 lg:mt-6 leading-tight lg:leading-snug">
              Global Reach
            </h1>
          </SlideIn>
          <div className="lg:w-[30%]">
            <SlideIn
              direction="right"
              scrollTrigger={true}
              duration={0.8}
              className=" flex-1  max-w-lg text-xs lg:text-2xl text-gray-600 lg:pt-8 lg:pt-12"
            >
              <p className="  text-lg lg:text-2xl self-start">
                Union Copper Rod products are famous all over the region and
                they are in high demand amongst many organizations that procure
                copper related products.
              </p>
            </SlideIn>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1600px] h-[55vh] lg:h-[75vh] relative z-0 overflow-visible">
          <VideoPlayer
            src="/globalpresence.mp4"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* logistics advantage */}
      <LogisticsAdvantageSection />
    </div>
  );
}
