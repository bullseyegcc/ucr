"use client";
import { Badge } from "../../common/badge";
import Image from "next/image";
import SequentialSlideIn from "../../animations/SequentialSlideIn";
import SlideIn from "../../animations/SlideIn";
import FadeIn from "../../animations/FadeIn";
import Hero from "@/components/shared/Hero";
import { VideoPlayer } from "../../common/video";

const VALUE_CARD_BG =
  "relative z-10 rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.58)_52%,rgba(255,255,255,0.14)_100%)]";

const VALUE_CARD_TITLE =
  "text-[#FA6E43] font-medium text-[30px] leading-[1.15] tracking-[-1.4px] capitalize lg:text-[34px]";

const VALUE_CARD_BODY =
  "mt-3 text-[14px] leading-relaxed text-[rgba(33,34,37,0.82)] lg:text-[16px] lg:leading-[28px]";

const VALUE_CARD_LAYOUT =
  "flex min-h-[360px] flex-col p-6 transition-all duration-500 ease-out lg:min-h-[400px] lg:p-8";

export default function OurValues() {
  return (
    <div className="">
      <Hero
        badge="values"
        title="Our values"
        badgeVariant="white"
        titleDirectFade
        titleInH1={false}
        background={{
          type: "video",
          src: "/ourvalues/bg.mp4",
          overlayClassName: "bg-black/60",
          priority: true,
        }}
      />

      {/* Trust & Reliability Section */}
      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#FFF_0%,#FFF5F1_45%,rgba(255,245,240,0.55)_100%)] px-6 py-12 lg:px-10 lg:py-20">
        {/* Gradient Image Centered, Low Z-Index */}
        <Image
          src="/valuegrad.png"
          alt="Gradient Circle"
          width={900}
          height={900}
          className=" rotate-270 w-[80%]  absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none"
        />

        <div className="relative z-10 mx-auto w-full">
          {/* Header */}
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4  lg:gap-12 mb-12 lg:mb-16">
            <SlideIn direction="left" duration={0.8} scrollTrigger={true} className="">
              <p className="text-primary uppercase text-[1rem] tracking-[0.1em] lg:text-[1.125rem]">
                Build on integrity, powered by innovation
              </p>
              <h1 className="font-medium text-[26px] leading-[48px] tracking-[-1.4px] lg:w-[80%] lg:text-[50px] lg:leading-[64px] text-black mt-4 lg:mt-6 uppercase">
                Beyond copper, we build trust & reliability
              </h1>
            </SlideIn>
            <SlideIn direction="right" duration={0.8} scrollTrigger={true} className=" lg:pt-12">
              <p className=" max-w-2xl text-ellipsis text-[#212225] text-[16px] font-normal leading-[30px] tracking-[-0.45px] lg:text-[22px]">
                We don't just produce copper — we shape reliability, innovation,
                and sustainability into every product we deliver.
              </p>
            </SlideIn>
          </div>

          <SequentialSlideIn
            className="w-full grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6"
            itemClassName="min-w-0"
            start="top 85%"
            end="bottom 70%"
            stagger={0.15}
          >
            <div className={`${VALUE_CARD_BG} ${VALUE_CARD_LAYOUT} group`}>
              <Image
                src="/excel.png"
                alt="Icon"
                width={90}
                height={90}
                className="h-[72px] w-[72px] object-contain lg:h-[90px] lg:w-[90px]"
              />
              <div className="mt-auto">
                <h2 className={VALUE_CARD_TITLE}>Excel always</h2>
                <p className={VALUE_CARD_BODY}>
                  We ensure that every product we make and service we offer
                  elevates industry standards through careful attention to detail
                  and quality checks.
                </p>
              </div>
            </div>

            <div className={`${VALUE_CARD_BG} ${VALUE_CARD_LAYOUT} group`}>
              <Image
                src="/path.png"
                alt="Icon"
                width={90}
                height={90}
                className="h-[72px] w-[72px] object-contain lg:h-[90px] lg:w-[90px]"
              />
              <div className="mt-auto">
                <h2 className={VALUE_CARD_TITLE}>Create New Paths</h2>
                <p className={VALUE_CARD_BODY}>
                  To ensure the best quality we embrace the best innovation. We
                  aim to redefine industry benchmarks, and lead the way in
                  developing smart, efficient solutions.
                </p>
              </div>
            </div>

            <div className={`${VALUE_CARD_BG} ${VALUE_CARD_LAYOUT} group`}>
              <Image
                src="/reliable.png"
                alt="Icon"
                width={90}
                height={90}
                className="h-[72px] w-[72px] object-contain lg:h-[90px] lg:w-[90px]"
              />
              <div className="mt-auto">
                <h2 className={VALUE_CARD_TITLE}>Be Reliable</h2>
                <p className={VALUE_CARD_BODY}>
                  Our commitment to sustainability enhances our reliability. As
                  trusted partners, we promise only the best in our supply chain
                  and community engagements, fostering collective growth.
                </p>
              </div>
            </div>

            <div
              className={`relative z-10 rounded-xl bg-white ${VALUE_CARD_LAYOUT} items-center justify-between text-center group`}
            >
              <div className="relative min-h-[240px] w-full flex-1 overflow-hidden">
                <VideoPlayer
                  src="/ourvalues/morethanjustcooper.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <h2 className="text-[30px] font-medium capitalize tracking-[-1.4px] text-[#A8A8AE] lg:text-[34px]">
                More Than Copper
              </h2>
            </div>

            <div className={`${VALUE_CARD_BG} ${VALUE_CARD_LAYOUT} group`}>
              <Image
                src="/careforfuture.png"
                alt="Icon"
                width={90}
                height={90}
                className="h-[72px] w-[72px] object-contain lg:h-[90px] lg:w-[90px]"
              />
              <div className="mt-auto">
                <h2 className={VALUE_CARD_TITLE}>Care For The Future</h2>
                <p className={VALUE_CARD_BODY}>
                  While focusing on innovation, we stay mindful of our
                  environmental impact. We strive to minimise our carbon
                  footprint and set an example for responsible manufacturing
                  across the industry.
                </p>
              </div>
            </div>

            <div className={`${VALUE_CARD_BG} ${VALUE_CARD_LAYOUT} group`}>
              <Image
                src="/grow.png"
                alt="Icon"
                width={90}
                height={90}
                className="h-[72px] w-[72px] object-contain lg:h-[90px] lg:w-[90px]"
              />
              <div className="mt-auto">
                <h2 className={VALUE_CARD_TITLE}>Grow Together</h2>
                <p className={VALUE_CARD_BODY}>
                  We strive to partner with those who share a genuine commitment
                  to growing together. We work towards building long-term
                  relationships that make a positive difference to society.
                </p>
              </div>
            </div>
          </SequentialSlideIn>
        </div>
      </div>

      {/* people */}
      <section className="bg-white pt-12 lg:pt-20 pb-0">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 text-center lg:max-w-none lg:gap-5 lg:px-10">
          <SlideIn direction="bottom" duration={0.8} scrollTrigger={true}>
            <Badge title="people" />
          </SlideIn>
          <FadeIn
            className="text-2xl leading-tight text-[#5F5F66] lg:text-5xl lg:leading-snug lg:whitespace-nowrap"
            duration={0.8}
          >
            <h1>Treating all employees with respect and dignity</h1>
          </FadeIn>
        </div>

        <FadeIn duration={0.8} scrollTrigger={true} className="mt-8 w-full lg:mt-12">
          <Image
            src="/Our%20Values/peoplesection.svg"
            alt="UCR team members"
            width={1440}
            height={545}
            className="block h-auto w-full"
          />
        </FadeIn>
      </section>
    </div>
  );
}
