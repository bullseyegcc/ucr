"use client";
import { Badge } from "../../common/badge";
import Image from "next/image";
import ScrollRevealCardsContainer from "../../animations/ScrollRevealCardsContainer";
import SlideIn from "../../animations/SlideIn";
import FadeIn from "../../animations/FadeIn";
import Hero from "@/components/shared/Hero";

export default function OurValues() {
  return (
    <div className="">
      <Hero
        badge="values"
        title="Our Values"
        badgeVariant="primary"
        titleDirectFade
        titleInH1={false}
        background={{
          type: "image",
          src: "/valuebg.png",
          imageClassName: "bg-center",
        }}
      />

      {/* Trust & Reliability Section */}
      <div className="min-h-screen bg-[linear-gradient(180deg,#FFF_0%,rgba(255,255,255,0.44)_100%)] px-6 lg:px-10 py-12 lg:py-20 relative overflow-hidden">
        {/* Gradient Image Centered, Low Z-Index */}
        <Image
          src="/valuegrad.png"
          alt="Gradient Circle"
          width={900}
          height={900}
          className=" rotate-270 w-[80%]  absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none"
        />

        <div className="w-full mx-auto">
          {/* Header */}
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4  lg:gap-12 mb-12 lg:mb-16">
            <SlideIn direction="left" duration={0.8} className="">
              <Badge title="Build on integrity, powered by innovation" />
              <h1 className="font-medium text-[26px] leading-[48px] tracking-[-1.4px] lg:w-[80%] lg:text-[52px] lg:leading-[64px] text-black mt-4 lg:mt-6 uppercase">
                Beyond copper, we build trust & reliability
              </h1>
            </SlideIn>
            <SlideIn direction="right" duration={0.8} className=" lg:pt-12">
              <p className=" text-ellipsis text-[#212225] text-[16px] font-normal leading-[30px] tracking-[-0.45px] lg:text-[18px]">
                We don't just produce copper — we shape reliability, innovation,
                and sustainability into every product we deliver.
              </p>
            </SlideIn>
          </div>

          <ScrollRevealCardsContainer
            className="lg:col-span-3 w-full"
            containerClassName="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
            staggerDelay={0.4}
            pinOnMobile={false}
            pin={false}
          >
            <div className="min-h-[50vh] max-h-auto bg-[#FDF5F3] rounded-xl p-6 lg:p-8 flex flex-col justify-between gap-6 group transition-all duration-500 ease-out">
              <Image
                src="/excel.png"
                alt="Icon"
                width={120}
                height={0}
                className="transition-transform duration-400"
              />
              <div>
                <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">
                  Excel Always
                </h1>
                <p className="text-[rgba(33,34,37,0.82)] text-xs lg:text-sm mt-3">
                  We ensure that every product we make and service we offer
                  reaches our clients with meticulous attention to detail and
                  quality checks.
                </p>
              </div>
            </div>

            <div className="min-h-[50vh] max-h-auto bg-[#FDF5F3] rounded-xl p-6 lg:p-8 flex flex-col justify-between gap-6 group transition-all duration-500 ease-out">
              <Image
                src="/path.png"
                alt="Icon"
                width={120}
                height={0}
                className="transition-transform duration-400"
              />
              <div>
                <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">
                  Create New Paths
                </h1>
                <p className="text-[rgba(33,34,37,0.82)] text-xs lg:text-sm mt-3">
                  To ensure the best quality we embrace the best innovation. We
                  aim to redefine industry benchmarks, and lead the way in
                  developing smart, efficient solutions.
                </p>
              </div>
            </div>

            <div className="min-h-[50vh] max-h-auto bg-[#FDF5F3] rounded-xl p-6 lg:p-8 flex flex-col justify-between gap-6 group transition-all duration-500 ease-out">
              <Image
                src="/reliable.png"
                alt="Icon"
                width={120}
                height={0}
                className="transition-transform duration-400"
              />
              <div>
                <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">
                  Be Reliable
                </h1>
                <p className="text-[rgba(33,34,37,0.82)] text-xs lg:text-sm mt-3">
                  Our commitment to sustainability enhances our reliability. As
                  trusted partners, we promise only the best in our supply chain
                  and community engagements, fostering collective growth.
                </p>
              </div>
            </div>

            <div className="bg-[#FDF5F3] text-center rounded-xl p-6 lg:p-8 flex flex-col items-center gap-6 group transition-all duration-500 ease-out">
              <Image
                src="/moreThanCopper.png"
                alt="Icon"
                width={300}
                height={90}
                className="transition-transform duration-400"
              />
              <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">
                More Than Cooper
              </h1>
            </div>

            <div className="min-h-[50vh] max-h-auto bg-[#FDF5F3] rounded-xl p-6 lg:p-8 flex flex-col justify-between gap-6 group transition-all duration-500 ease-out">
              <Image
                src="/careforfuture.png"
                alt="Icon"
                width={120}
                height={0}
                className="transition-transform duration-400"
              />
              <div>
                <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">
                  Care For The Future
                </h1>
                <p className="text-[rgba(33,34,37,0.82)] text-xs lg:text-sm mt-3">
                  While focusing on innovation, we stay mindful of our
                  environmental footprint. We strive to minimize our carbon
                  footprint and set an example for responsible manufacturing
                  across the industry.
                </p>
              </div>
            </div>

            <div className="min-h-[50vh] max-h-auto bg-[#FDF5F3] rounded-xl p-6 lg:p-8 flex flex-col justify-between gap-6 group transition-all duration-500 ease-out">
              <Image
                src="/grow.png"
                alt="Icon"
                width={120}
                height={0}
                className="transition-transform duration-400"
              />
              <div>
                <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">
                  Grow Together
                </h1>
                <p className="text-[rgba(33,34,37,0.82)] text-xs lg:text-sm mt-3">
                  We strive to partner with those who share a genuine commitment
                  to excellence. We work towards building long-term
                  relationships that make a positive difference to society.
                </p>
              </div>
            </div>
          </ScrollRevealCardsContainer>
        </div>
      </div>

      {/* people */}
      <div className="min-h-screen  bg-[url('/people-1.png')] bg-cover pt-6   bg-bottom bg-no-repeat">
        <div className="flex flex-col items-center gap-4 lg:gap-5 px-6 lg:px-10 pt-12 lg:pt-0">
          <SlideIn direction="bottom" duration={0.8} scrollTrigger={true}>
            <Badge title="people" />
          </SlideIn>
          <FadeIn
            className="text-2xl lg:text-5xl text-center lg:mb-8 text-[#5F5F66] leading-tight lg:leading-snug"
            duration={0.8}
            scrollTrigger={true}
          >
            <h1>Treating all employees with respect and dignity</h1>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
