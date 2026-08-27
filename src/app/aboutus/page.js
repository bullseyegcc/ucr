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
import SequentialSlideIn from "../../animations/SequentialSlideIn";
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
        title="Leading the region's copper transformation with cutting edge technology"
        titleClassName="px-6 !text-[2rem] !leading-[2.5rem] tracking-[-0.04em] lg:px-5 lg:w-[80%] lg:mb-8 lg:!text-[4rem] lg:!leading-[5rem] lg:tracking-[-0.15625rem]"
        titleDirectFade
        titleInH1={false}
        animateBadge={false}
        className="mb-[40%] lg:mb-[30%] flex flex-col items-center justify-center pt-16 pb-[18%] lg:justify-center lg:pt-0 lg:pb-0"
        minHeightClass="min-h-[52vh] lg:min-h-[80vh]"
        gapClass="gap-3 lg:gap-[1.5rem]"
        contentClassName="relative z-30 lg:z-10"
        media={{
          type: "image",
          src: "/about/abouthero.webp",
          alt: "About Union Copper Rod",
          priority: true,
          sizes: "(max-width: 1024px) 95vw, 90vw",
          quality: 90,
          className:
            "absolute left-1/2 -translate-x-1/2 -bottom-[38%] z-20 w-[94%] h-[32vh] overflow-hidden rounded-[1.25rem] lg:-bottom-[60%] lg:w-[90%] lg:h-[70vh] lg:rounded-xl",
        }}
      />

      <div className="mx-auto w-full max-w-[1600px] px-3 pt-14 pb-5 lg:px-10 lg:py-5 flex flex-col items-center justify-center">
        <Badge title="Who we are" />

        <div className="mt-8 w-full max-w-[1300px] mx-auto">
          <ScrollReveal
            as="h1"
            baseOpacity={0.2}
            enableBlur
            baseRotation={0}
            blurStrength={0}
            containerClassName="whitespace-pre-line text-center font-medium text-primary text-[20px] leading-[32px] tracking-[-0.4px] lg:text-[40px] lg:font-normal lg:leading-[56px] lg:tracking-[-1.4px]"
          >
            Since 2008, we’ve delivered reliable, high performance copper
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

      <div className="relative mx-auto mb-8 w-full max-w-[1600px] lg:mb-0">
        {/* Banner */}
        <div className="relative flex min-h-[40vh] w-full flex-col justify-end overflow-hidden rounded-xl px-4 py-8 sm:min-h-[50vh] sm:rounded-2xl sm:px-5 sm:py-12 lg:px-16 lg:pb-20">
          <Image
            src="/about/parentcompanybg.webp"
            alt=""
            fill
            className="object-cover object-center lg:object-top"
            sizes="(max-width: 1600px) 100vw, 1600px"
            quality={90}
          />
          <div className="relative z-10 flex w-full items-center gap-3 text-white lg:max-w-[48%]">
            <Image
              src="/shared/badge-w.png"
              alt=""
              width={56}
              height={56}
              className="h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14"
            />
            <span className="text-2xl font-medium uppercase tracking-wide sm:text-3xl lg:text-4xl xl:text-5xl">
              Our Verticals
            </span>
          </div>
        </div>

        {/* Sectors + detail panel */}
        <div className="relative grid w-full grid-cols-1 bg-[#FEF7F4] lg:grid-cols-2">
          <div className="px-4 py-8 sm:px-5 sm:py-10 lg:px-16 lg:py-10">
            <SlideIn direction="left" scrollTrigger={true} duration={0.8}>
              <h2 className="mb-4 text-xl uppercase tracking-wide text-[#212225]/70 sm:mb-6 sm:text-2xl lg:text-2xl">
                Our Core Sectors
              </h2>

              <div
                className="mt-4 flex flex-col gap-3 sm:mt-6 sm:gap-4"
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
                      className={`cursor-pointer text-left text-lg font-normal text-[#FE5D0A] underline decoration-1 underline-offset-4 transition-opacity sm:text-xl lg:text-[1.65rem] lg:leading-9 ${
                        isActive
                          ? "opacity-100 decoration-2"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      {sector.label}
                    </button>
                  );
                })}
              </div>
            </SlideIn>
          </div>

          <div className="relative z-10 flex min-h-[50vh] flex-col items-center rounded-t-2xl bg-white px-8 pb-8 pt-10 sm:px-12 sm:pb-10 sm:pt-14 lg:-mt-[6%] lg:min-h-[70%] lg:rounded-2xl lg:px-16 lg:pb-12 lg:pt-16">
            <div className="flex w-full min-h-[11rem] flex-1 items-start justify-center sm:min-h-[12.5rem] lg:min-h-[14rem]">
              <SlideIn
                key={activeSector.id}
                direction="bottom"
                scrollTrigger={false}
                duration={0.4}
                delay={0.05}
                className="w-full"
              >
                <p className="mx-auto max-w-[34rem] text-center text-base leading-relaxed text-[#212225] sm:text-lg sm:leading-8 lg:text-[20px] lg:leading-[1.7]">
                  {activeSector.description}
                </p>
              </SlideIn>
            </div>

            <div className="mt-auto flex w-full shrink-0 items-end justify-center pt-6 sm:pt-8">
              <Image
                src="/about/itihad.png"
                alt="Itihad Logo"
                width={220}
                height={220}
                className="h-auto w-28 object-contain sm:w-36 lg:w-[180px] xl:w-[210px]"
              />
            </div>
          </div>
        </div>
      </div>

      <JourneySection />

      <div className="mb-8 w-full overflow-visible bg-[url('/about/expertisebg.png')] bg-cover bg-top bg-no-repeat pt-12 lg:max-h-[95vh] lg:overflow-hidden lg:pt-16">
        <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col justify-between px-4 pb-10 lg:px-10 lg:pb-0">
          <SlideIn direction="left" scrollTrigger={true} duration={0.8}>
            <Badge title="What we care" />
            <h1 className="align-middle text-[2rem] font-normal tracking-[-0.09rem] lg:text-[3.25rem] lg:leading-[6.2rem] lg:tracking-[-0.16rem]">
              Our expertise and experience
            </h1>
          </SlideIn>
          <SequentialSlideIn
            className="mt-6 flex flex-col items-stretch gap-6 lg:flex-row lg:items-end"
            itemClassName="w-full min-w-0 lg:w-1/3"
            start="top 85%"
            end="bottom 70%"
            stagger={0.15}
          >
            <ExpertiseCard
              animated={false}
              fillContainer
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
              animated={false}
              fillContainer
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
              animated={false}
              fillContainer
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
          </SequentialSlideIn>
        </div>
      </div>

      <ParallaxSection index={0}>
        <div className="mx-auto w-full max-w-[1600px] flex flex-col lg:flex-row justify-center items-stretch px-1 sm:px-6 lg:px-10 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 lg:pt-10 pb-6 lg:pb-8 relative z-0 lg:-z-10">
          <VideoCard
            videoSrc="/aboutvideo.mp4"
            badgeText="Our Company"
            title="Union Copper Rod is undeniably the most trusted copper rod manufacturer in the region"
            buttonText="Know about the team"
            buttonUrl="/team"
          />

          <VideoCard
            videoSrc="/sustain.mp4"
            badgeText="Sustainability Report"
            title="Our commitment to sustainability shapes every decision, from sourcing to production, creating value for the planet."
            buttonText="Download report"
            buttonUrl="/docs/sustainabilityreport.pdf"
            buttonIcon="down"
          />
        </div>
      </ParallaxSection>
    </div>
  );
}
