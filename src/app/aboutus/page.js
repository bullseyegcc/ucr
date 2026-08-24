"use client";

import { useState } from "react";
import { Badge } from "../../common/badge";
import Hero from "@/components/shared/Hero";
import { VideoCard } from "../../common/VideoCard.js";

import Image from "next/image";
import JourneySection from "../../components/about/JourneySection";
import ParallaxSection from "../../animations/ParallaxSection";
import MissionValuesSection from "../../components/about/MissionValuesSection";
import ExpertiseCard from "@/components/shared/ExpertiseCard";
import SlideIn from "../../animations/SlideIn";
import ScrollReveal from "../../animations/ScrollReveal";

const CORE_SECTORS = [
  {
    id: "consumer-goods",
    label: "Consumer goods manufacturing",
    description:
      "With leading companies championing innovation, this portfolio is building a diversified and sustainable economy.",
  },
  {
    id: "infrastructure",
    label: "Infrastructure and building materials manufacturing",
    description:
      "Vital contributors to the industry, producing and supplying essential materials for infrastructure projects and building construction.",
  },
  {
    id: "business-services",
    label: "Business services",
    description:
      "Delivering a wide array of specialized services and solutions to both private and public sector that includes procurement, operation and management services for healthcare providers, operation and maintenance services for utilities and infrastructure networks and facilities, and facility and waste management services across municipalities in the UAE.",
  },
  {
    id: "healthcare",
    label: "Healthcare and other",
    description:
      "Revolutionizing healthcare through innovative and turnkey solutions to medical providers and facilities in the UAE, and Egypt. This vertical also offers comprehensive services and solutions in fund management, logistics and transportation, and interior and design.",
  },
];

export default function AboutUs() {
  const [activeSectorId, setActiveSectorId] = useState(CORE_SECTORS[0].id);
  const activeSector =
    CORE_SECTORS.find((sector) => sector.id === activeSectorId) ??
    CORE_SECTORS[0];

  return (
    <div className="">
      <Hero
        badge="Crafting Sustainable Progress, One Copper Solution at a Time"
        title="Leading the region's copper transformation with cutting edge technology"
        titleClassName="px-5 lg:w-[80%] mt-5 lg:mb-8"
        className="mb-[80%] lg:mb-[30%] flex flex-col justify-center items-center"
        minHeightClass="min-h-[80vh]"
        media={{
          type: "image",
          src: "/about/abouthero.webp",
          alt: "About Union Copper Rod",
          priority: true,
          sizes: "(max-width: 1024px) 95vw, 90vw",
          quality: 90,
        }}
      />

      <div className="mx-auto w-full max-w-[1600px] px-3 lg:px-10 py-20 flex flex-col lg:items-center justify-center">
        <Badge title="Who we are" />

        <div className="mt-8 w-full max-w-[1300px] mx-auto">
          <ScrollReveal
            as="h1"
            baseOpacity={0.2}
            enableBlur
            baseRotation={0}
            blurStrength={0}
            containerClassName="whitespace-pre-line text-center font-medium text-primary text-[28px] leading-[44px] tracking-[-0.53px] lg:text-[40px] lg:font-normal lg:leading-[56px] lg:tracking-[-1.4px]"
          >
            Since 2008, we&apos;ve delivered reliable, high performance copper
            solutions to industries across more than 50+ countries, supported by
            advanced technology and a strong focus on environmental
            responsibility. Guided by our core values, we work to elevate
            industry standards and help shape a greener, more efficient future.
          </ScrollReveal>
        </div>
      </div>

      {/* Our Mission & Our Values */}

      <MissionValuesSection />

      {/* parent company / our verticals */}

      <div className="mx-auto min-h-screen relative mb-8 lg:mb-0 w-full max-w-[1600px]">
        <div className="relative min-h-[40vh] sm:min-h-[50vh] w-full overflow-hidden rounded-xl sm:rounded-2xl flex flex-col justify-end lg:justify-start px-4 sm:px-5 lg:px-16 py-8 sm:py-12">
          <Image
            src="/about/parentcompanybg.webp"
            alt=""
            fill
            className="object-cover object-center lg:object-top"
            sizes="(max-width: 1600px) 100vw, 1600px"
            quality={90}
          />
          <div className="relative flex flex-col sm:flex-row justify-start items-center gap-2 sm:gap-3 text-white z-10 lg:absolute lg:left-16 lg:top-[calc(100%-70vh)]">
            <Image
              src="/shared/badge-w.png"
              alt="Badge Icon"
              width={34}
              height={34}
              className="object-contain w-6 h-6 sm:w-8 sm:h-8 lg:w-[34px] lg:h-[34px]"
            />
            <span className="text-2xl sm:text-3xl lg:text-4xl uppercase font-medium">
              Our Verticals
            </span>
          </div>
        </div>

        <div className="bg-[#FEF7F4] w-full px-4 sm:px-5 lg:px-16 py-8 sm:py-10 lg:h-[55vh]">
          <SlideIn direction="left" scrollTrigger={true} duration={0.8}>
            <h2 className="text-xl sm:text-2xl lg:text-2xl uppercase tracking-wide text-[#212225]/70  mb-4 sm:mb-6">
              Our Core Sectors
            </h2>

            <div
              className="text-xl sm:text-2xl lg:text-3xl flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6"
              role="tablist"
              aria-label="Core sectors"
            >
              {CORE_SECTORS.map((sector) => {
                const isActive = sector.id === activeSectorId;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveSectorId(sector.id)}
                    className={`text-left transition-opacity cursor-pointer underline text-[#FE5D0A] ${
                      isActive ? "font-medium opacity-100" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {sector.label}
                  </button>
                );
              })}
            </div>
          </SlideIn>
        </div>

        <div className="bg-white rounded-t-2xl lg:rounded-2xl lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2 px-8 sm:px-12 lg:px-16 pt-10 sm:pt-14 lg:pt-16 pb-28 sm:pb-32 lg:pb-36 relative flex flex-col items-center justify-start min-h-[50vh] lg:h-[70vh]">
          <SlideIn
            key={activeSector.id}
            direction="bottom"
            scrollTrigger={false}
            duration={0.4}
            delay={0.05}
            className="w-full"
          >
            <p className="text-base sm:text-lg lg:text-[22px] lg:leading-8 text-center text-[#212225] leading-relaxed max-w-[34rem] mx-auto">
              {activeSector.description}
            </p>
          </SlideIn>

          <Image
            src="/about/itihad.png"
            alt="Itihad Logo"
            width={200}
            height={100}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-32 sm:w-40 lg:w-[200px] h-auto object-contain"
          />
        </div>
      </div>

      <JourneySection />

      <div className="mb-8 w-full max-h-[90vh] bg-[url('/about/expertisebg.png')] bg-cover bg-top bg-no-repeat pt-12 lg:max-h-[95vh] lg:pt-16">
        <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col justify-between px-4 lg:px-10">
          <SlideIn direction="left" scrollTrigger={true} duration={0.8}>
            <Badge title="What we care" />
            <h1 className="align-middle text-[2rem] font-normal tracking-[-0.09rem] lg:text-[3.25rem] lg:leading-[6.2rem] lg:tracking-[-0.16rem]">
              Our expertise and experience
            </h1>
          </SlideIn>
          <div className="mt-6 flex flex-col items-end gap-6 lg:flex-row">
            <ExpertiseCard
              index={0}
              variant="tall"
              number={200}
              title="Supply Chain partners Connected worldwide"
              description="Bringing together suppliers, logistics providers, and stakeholders through a unified global network."
              image="/about/anum.png"
              imageAlt="Copper rods"
              imageWidth={600}
              imageHeight={220}
              descriptionClassName="max-w-[90%] pr-0 lg:pr-4"
              imageClassName="-bottom-5 left-0 right-0 h-auto w-full object-cover object-bottom"
            />

            <ExpertiseCard
              index={1}
              variant="medium"
              number={150}
              duration={2.5}
              title="Employees"
              description="With over 150 experienced employees, we deliver quality and reliability every day."
              image="/about/exp2-2.png"
              imageAlt="Employees"
              imageWidth={360}
              imageHeight={380}
              descriptionClassName="max-w-[14rem] lg:max-w-[16rem]"
              imageClassName="bottom-0 left-1/2 h-auto w-[78%] -translate-x-1/2 lg:w-[95%]"
            />

            <ExpertiseCard
              index={2}
              variant="small"
              number={60}
              title="Global logistic partners"
              description="We supplies products, services and solutions across over 30 countries in Australia, Asia, Africa, and the Middle East."
              image="/about/exp3.png"
              imageAlt="Global network"
              imageWidth={280}
              imageHeight={200}
              descriptionClassName="max-w-[70%] pr-0 lg:pr-4"
              imageClassName="bottom-2 right-0 h-auto w-[58%] lg:w-[78%]"
            />
          </div>
        </div>
      </div>

      <ParallaxSection index={0}>
        <div className="mx-auto w-full max-w-[1600px] flex flex-col lg:flex-row justify-center items-stretch px-1 sm:px-6 lg:px-10 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 lg:pt-10 pb-6 lg:pb-8 relative -z-10">
          <VideoCard
            videoSrc="/aboutvideo.mp4"
            badgeText="Our Company"
            title="Union Copper Rod is undeniably the most trusted copper rod manufacturer in the region"
            buttonText="Company profile"
            buttonUrl="/parentCompany"
          />

          <VideoCard
            videoSrc="/sustain.mp4"
            badgeText="Sustainability Report"
            title="Our commitment to sustainability shapes every decision, from sourcing to production, creating value for the planet."
            buttonText="Download report"
            buttonUrl="/policies/iii-sustainability-policy.pdf"
            buttonIcon="down"
          />
        </div>
      </ParallaxSection>
    </div>
  );
}


