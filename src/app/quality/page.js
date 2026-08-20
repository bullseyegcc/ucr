import Image from "next/image";
import { Badgetextblack, Badge } from "../../common/badge";
import Hero from "@/components/shared/Hero";
import QuoteSection from "@/components/shared/QuoteSection";
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

          {/* soft fade into more certifications */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 lg:h-36 bg-gradient-to-b from-transparent to-[#FFF8F4]"
          />
        </div>
      </ParallaxSection>
      {/* Achivements */}

      <div className="relative z-20 flex flex-col items-center justify-center pt-12 sm:pt-16 lg:pt-20 bg-[#FFF8F4]">
          {/* soft blend from key certifications into this section */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-16 sm:-top-20 lg:-top-28 h-16 sm:h-20 lg:h-28 bg-gradient-to-b from-transparent via-[#FFF8F4]/70 to-[#FFF8F4]"
          />
          <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16 items-center w-full sm:px-6">
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

            {/* cards — stepped tall / mid / small with equal-width containers */}
            <div className="w-full">
              <SequentialSlideIn
                className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-end"
                itemClassName="w-full min-w-0"
                start="top 85%"
                end="bottom 70%"
              >
                <div className="overflow-hidden rounded-2xl w-full h-[58vh] min-h-[62vh] lg:h-[72vh] lg:min-h-[72vh]">
                  <Image
                    src="/Quality/card1.svg"
                    alt="Certification"
                    width={450}
                    height={567}
                    className="w-full h-full object-cover object-bottom"
                  />
                </div>
                <div className="bg-white relative overflow-hidden rounded-2xl w-full h-[58vh] min-h-[62vh] lg:h-[66vh] lg:min-h-[66vh]">
                  <Image
                    src="/Quality/card2.svg"
                    alt="Certification"
                    width={450}
                    height={567}
                    className="absolute  -bottom-7 w-full h-full object-cover object-bottom"
                  />
                </div>
                <div className="bg-white relative overflow-hidden rounded-2xl w-full h-[58vh] min-h-[62vh] lg:h-[66vh] lg:min-h-[66vh]">
                  <Image
                    src="/Quality/card3.svg"
                    alt="Certification"
                    width={450}
                    height={567}
                    className="absolute  -bottom-7 w-full h-full object-cover object-bottom"
                  />
                </div>
              </SequentialSlideIn>
            </div>
          </div>

          {/* transition bar — flush under cards, above quote section */}
          <Image
            src="/orangebottom.png"
            alt=""
            width={900}
            height={0}
            className="w-full pointer-events-none block mt-8 sm:mt-10 lg:mt-12"
          />
      </div>

      <QuoteSection />
    </div>
  );
}
