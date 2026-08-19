import Image from "next/image";
import { Badgetextblack, Badge } from "../../common/badge";
import Hero from "@/components/shared/Hero";
import ParallaxSection from "../../animations/ParallaxSection";
import CardAnimation from "../../animations/CardAnimation";
import SequentialSlideIn from "../../animations/SequentialSlideIn";
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";

export default function Quality() {
  return (
    <div>
      {/* header */}
      <Hero
        badge="Premium Quality Assured"
        title="Quality is our foundation"
        titleClassName="w-full sm:w-[90%] lg:w-auto lg:whitespace-nowrap px-10 lg:px-0"
        titleDirectFade
        titleInH1={false}
        className="rounded-b-xl dark:bg-black px-6"
        minHeightClass="min-h-[60vh] sm:min-h-[60vh] lg:min-h-[80vh]"
        background={{
          type: "image-inline",
          style: {
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/qualitybg.png') lightgray 50% / cover no-repeat",
          },
        }}
      >
        <Image
          src="/ribbin.png"
          alt="Icon"
          width={300}
          height={0}
          className="w-50 lg:w-60 absolute -right-[12%] lg:right-[6%] bottom-[12%] lg:bottom-[10%]"
        />
      </Hero>

      {/* certifications */}

      <ParallaxSection index={0}>
        <div className="relative lg:min-h-screen bg-[rgba(255,255,255,0.77)]">
          {/* header */}
          <SlideIn
            direction="top"
            scrollTrigger={true}
            duration={0.6}
            className="flex flex-col gap-4 sm:gap-5 items-center justify-center text-center py-12 sm:py-16 lg:py-20 px-6"
          >
            <p className="text-base sm:text-lg lg:text-xl text-primary font-medium">
              Certified Excellence. Trusted Worldwide.
            </p>
            <h1 className="font-medium text-[32px] leading-[48px] tracking-[-1.4px] text-center capitalize mt-3 sm:mt-4 lg:text-[52px] lg:leading-[52px]">
              Our Key Certifications
            </h1>
            <p className="w-full sm:w-[70%] lg:w-[60%] font-normal text-[16px] leading-[28px] tracking-[-0.45px] text-center lg:text-[18px] lg:leading-[36px]">
              {" "}
              Our certifications stand as proof of our unwavering dedication to
              quality, safety, and sustainability. Each ISO achievement reflects
              the precision and responsibility that define every stage of our
              copper production.
            </p>
          </SlideIn>

          <div className="w-full sm:w-[80%] lg:w-[65%] flex items-center justify-center mx-auto px-6 sm:px-0">
            <Image
              src="/gradientcircle.png"
              alt="Icon"
              width={400}
              height={0}
              className="w-full object-cover hidden lg:block postion absolute overflow-hidden left-0 top-0"
            />

            <CardAnimation index={0} className="w-full">
              <Image
                src="/certificate.png"
                alt="Icon"
                width={900}
                height={0}
                className="w-full object-cover"
              />
            </CardAnimation>
          </div>
        </div>
      </ParallaxSection>
      {/* Achivements */}

      <div className="relative z-20 flex flex-col gap-10 sm:gap-12 lg:gap-16 items-center justify-center py-12 sm:py-16 lg:py-20 bg-[#FFF8F4] sm:px-6">
          <div className="flex flex-col items-center text-center">
            <SlideIn
              direction="bottom"
              scrollTrigger={true}
              className="mb-3 lg:mb-5"
              duration={0.8}
            >
              <Badgetextblack title="More certifications" />
            </SlideIn>
            <FadeIn
              scrollTrigger={true}
              duration={0.8}
              className="px-9 font-medium text-[32px] leading-[52px] tracking-[-1.4px] text-center capitalize mt-3 sm:mt-4 lg:text-[52px] lg:leading-[52px] lg:tracking-[-1.4px] lg:mt-5 lg:mt-6"
            >
              <h1>We've also achieved so far</h1>
            </FadeIn>
          </div>

          {/* cards */}
          <div className="relative lg:px-6 sm:px-8 lg:px-10 pb-12 sm:pb-16 lg:pb-20 py-6 sm:py-8 pt-6 sm:pt-9 w-full">
            <SequentialSlideIn
              className="flex flex-wrap lg:gap-4 sm:gap-6 lg:justify-center w-full"
              itemClassName="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[32%]"
              start="top 85%"
              end="bottom 70%"
            >
              <Image
                src="/q1.png"
                alt="Certification"
                width={480}
                height={0}
                className="object-cover rounded-xl"
              />
              <Image
                src="/q2.png"
                alt="Certification"
                width={480}
                height={0}
                className="object-cover rounded-xl"
              />
              <Image
                src="/q3.png"
                alt="Certification"
                width={400}
                height={0}
                className="object-cover rounded-xl"
              />
            </SequentialSlideIn>

            <Image
              src="/orangebottom.png"
              alt=""
              width={900}
              height={0}
              className="w-full absolute bottom-0 pointer-events-none"
            />
          </div>
      </div>

      
    </div>
  );
}
