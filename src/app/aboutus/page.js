"use client";

import { Badge, Badgetextwhite } from "../../common/badge";
import { WhiteBadge } from "../../common/badge";
import { VideoCard } from "../../common/VideoCard.js";
import badge_icon from "../../../public/badge.png";

import { ArrowRight } from "lucide-react";

import Image from "next/image";
import { VideoPlayer } from "../../common/video";
import JourneySection from "../../components/about/JourneySection";
import ParallaxSection from "../../animations/ParallaxSection";
import MissionValuesSection from "../../components/about/MissionValuesSection";
import ColorChangeWithScroll from "../../animations/ColorChangeWithScroll";
import CardAnimation from "../../animations/CardAnimation";
import CountUp from "../../animations/countup";
import HeroHeading from "@/components/home/HeroHeading";
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";

export default function AboutUs() {
  return (
    <div className="">
      <div className=" mb-[80%] lg:mb-[30%] relative  min-h-[80vh]      bg-primary flex flex-col justify-center items-center ">
        <div className="flex items-start lg:items-center justify-center lg:gap-3  text-center text-white z-300 w-[60%] ">
          <SlideIn direction="bottom" duration={0.4} delay={0}>
            <Image
              src={badge_icon}
              alt="Badge Icon"
              width={20}
              height={30}
              className="object-contain"
            />
          </SlideIn>
          <FadeIn duration={0.4} delay={0}>
            <span className="text-white uppercase font-medium text-center text-xs md:text-lg lg:text-base">
              Crafting Sustainable Progress, One Copper Solution at a Time{" "}
            </span>
          </FadeIn>
        </div>

        <h1 className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle  text-white px-5 lg:w-[80%] mt-5 lg:mb-8">
          <FadeIn>
            Leading the region&apos;s copper transformation with cutting edge
            technology
          </FadeIn>
        </h1>

        <div className="absolute -bottom-[40%] lg:-bottom-[60%] w-[90%] lg:w-[80%] h-[50vh] lg:h-[70vh] ">
          <VideoPlayer
            src="/aboutvideo.mp4"
            className="w-full h-full object-cover rounded-xl "
          />
        </div>
      </div>

      <div className="px-3 lg:px-10 py-20 flex flex-col lg:items-center justify-center">
        <Badge title="Who we are" />

        <ColorChangeWithScroll
          initialColor="rgba(221, 220, 219, 0.91)"
          afterColor="#FF7A5C"
          initialOpacity={0.1}
          lockScroll={true}
        >
          <h1 className="text-center text-xl pr-2 lg:text-4xl leading-relaxed mt-8">
            Since 2008, we&apos;ve delivered reliable, high performance copper
            solutions to industries across more than 30 countries, supported by
            advanced technology and a strong focus on environmental
            responsibility. Guided by our core values, we work to elevate
            industry standards and help shape a greener, more efficient future.
          </h1>
        </ColorChangeWithScroll>
      </div>

      {/* Our Mission & Our Values */}

      <FadeIn>
        <MissionValuesSection />
      </FadeIn>

      {/* parent company */}

      <div className="min-h-screen relative mb-8 lg:mb-0">
        <div className="min-h-[40vh] sm:min-h-[50vh] w-full bg-[url('/parentcompanybg.png')] bg-cover bg-center lg:bg-top bg-no-repeat rounded-xl sm:rounded-2xl flex flex-col justify-center  px-4 sm:px-5 lg:px-16 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row  justify-start items-center gap-2 sm:gap-3 text-white z-10">
            <Image
              src="/badge-w.png"
              alt="Badge Icon"
              width={34}
              height={34}
              className="object-contain w-6 h-6 sm:w-8 sm:h-8 lg:w-[34px] lg:h-[34px]"
            />
            <span className="text-2xl sm:text-3xl lg:text-4xl uppercase font-medium">
              Parent Company
            </span>
          </div>
        </div>

        <div className="bg-[#FEF7F4] w-full px-4 sm:px-5 lg:px-16 py-8 sm:py-10 lg:h-[55vh]">
          <SlideIn direction="left" scrollTrigger={true} duration={0.8}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#212225] font-semibold mb-4 sm:mb-6">
              Our Core Sectors
            </h1>

            <div className="text-primary text-lg sm:text-xl lg:text-2xl flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-6">
              <h1 className="hover:text-[#F26522] transition-colors cursor-pointer underline">
                Manufacturing
              </h1>
              <h1 className="hover:text-[#F26522] transition-colors cursor-pointer underline">
                Trading
              </h1>
              <h1 className="hover:text-[#F26522] transition-colors cursor-pointer underline">
                Construction
              </h1>
              <h1 className="hover:text-[#F26522] transition-colors cursor-pointer underline">
                Services
              </h1>
            </div>
          </SlideIn>
        </div>

        <div className="bg-white rounded-t-2xl pt-8 lg:rounded-2xl lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2 px-6 sm:px-8 lg:px-10 py-12 sm:py-16 flex flex-col items-center justify-center gap-8 sm:gap-12 lg:gap-16 lg:h-[70vh]">
          <FadeIn scrollTrigger={true} duration={0.8}>
            <p className="text-base sm:text-lg lg:text-2xl text-center text-[#212225] leading-relaxed">
              Itihad International Investment LLC is a private holding and
              multi-disciplinary conglomerate, engaged in a wide spectrum of
              economic activities in the MENA region
            </p>
          </FadeIn>

          <Image
            src="/itihad.png"
            alt="Itihad Logo"
            width={200}
            height={100}
            className="w-32 sm:w-40 lg:w-[200px] h-auto object-contain"
          />
        </div>
      </div>

      <JourneySection />

      <ParallaxSection index={0}>
        <div className="w-full h-auto lg:h-full pt-12 lg:pt-16 px-4 lg:px-10 mb-8 bg-[url('/expertisebg.png')] bg-contain bg-top bg-no-repeat bg-cover flex flex-col justify-between">
          <div>
            <SlideIn direction="bottom" scrollTrigger={true} duration={0.8}>
              <Badge title="our expertise" />
            </SlideIn>
            <FadeIn scrollTrigger={true} duration={0.8}>
              <h1 className=" font-normal align-middle text-[32px] tracking-[-1.47px] lg:text-[52px] lg:leading-[99px] lg:tracking-[-2.5px]">
                Our Expertise & Experiance
              </h1>
            </FadeIn>
          </div>
          <div className="mt-6 flex flex-col lg:flex-row gap-6 items-end">
            <CardAnimation
              index={0}
              className="min-h-[55vh] lg:min-h-[65vh]  lg:rounded-t-2xl rounded-2xl w-full lg:w-1/3 bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400"
            >
              <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                <span>
                  <CountUp to={20} duration={2} />+
                </span>{" "}
                <hr className="text-primary/30 w-[90%] shadow  " />
              </h1>

              <div className="relative z-10 pb-6 ">
                <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                  Years Experience
                </h1>
                <p className=" lg:w-90 pr-0 lg:pr-4">
                  200,000 metric tons copper production line that is the largest
                  of its kind in the Middle East.
                </p>
              </div>

              <Image
                src="/exp1.png"
                alt="Expertise Icon"
                width={290}
                height={80}
                className="w-full absolute -bottom-0 right-0 z-0 rounded-b-2xl lg:rounded-none"
              />
            </CardAnimation>

            <CardAnimation
              index={1}
              className="min-h-[55vh] lg:min-h-[60vh] lg:rounded-t-2xl rounded-2xl w-full lg:w-1/3 bg-white px-6 lg:px-8 pt-8 overflow-x-hidden lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400"
            >
              <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                <span>
                  <CountUp to={1500} duration={2.5} />+
                </span>{" "}
                <hr className="text-primary/30 w-[90%] shadow  " />
              </h1>

              <div className="relative z-10">
                <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                  Employees
                </h1>
                <p className="w-45 lg:w-55">
                  With over 150 experienced employees, we deliver quality and
                  reliability every day.
                </p>
              </div>

              <Image
                src="/exp2-2.png"
                alt="Expertise Icon"
                width={180}
                height={80}
                className="w-60 lg:w-96 absolute -bottom-0 -right-5 lg:right-0 z-0 rounded-b-2xl lg:rounded-none"
              />
            </CardAnimation>

            <CardAnimation
              index={2}
              className="min-h-[55vh] lg:min-h-[55vh] lg:rounded-t-2xl rounded-2xl w-full lg:w-1/3 bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400"
            >
              <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                <span>
                  <CountUp to={30} duration={2} />+
                </span>{" "}
                <hr className="text-primary/30 w-[90%] shadow  " />
              </h1>

              <div className="relative z-10">
                <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                  Global Sales
                </h1>
                <p className=" w-[70%] lg:w-80 pr-0 lg:pr-4">
                  We supplies products, services and solutions across over 30
                  countries in Australia, Asia, Africa, and the Middle East.
                </p>
              </div>

              <Image
                src="/exp3.png"
                alt="Expertise Icon"
                width={300}
                height={80}
                className=" absolute -bottom-0 right-0 z-0 rounded-b-2xl lg:rounded-none"
              />
            </CardAnimation>
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection index={1}>
        <div className="flex flex-col lg:flex-row justify-center items-stretch min-h-auto lg:min-h-screen mx-1 sm:px-6 lg:px-10 gap-4 sm:gap-6 lg:gap-8 py-6 sm:py-8 lg:py-12 relative -z-10">
          <VideoCard
            videoSrc="/moreabout.mp4"
            badgeTitle="more about"
            heading="Union Copper Rod is undeniably the most trusted copper rod manufacturer in the region"
            buttonText="Company Profile"
          />

          <VideoCard
            videoSrc="/supplychain.mp4"
            badgeTitle="Supplychain"
            heading="UCR leads the region in copper rod production and has its sights on vastly expanding its enterprise"
            buttonText="Know More"
          />
        </div>
      </ParallaxSection>
    </div>
  );
}
