"use client";

import { Badge } from "../../common/badge";
import Hero from "@/components/shared/Hero";
import Image from "next/image";
import ColorChangeWithScroll from "../../animations/ColorChangeWithScroll";
import CardAnimation from "../../animations/CardAnimation";
import ScrollRevealCardsContainer from "../../animations/ScrollRevealCardsContainer";
import CountUp from "../../animations/countup";
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";


export default function parentCompany() {
  return (
    <div className="bg-[#F5F5F5]">
      {/* header */}
      <Hero
        badge="Parent Company"
        title="Driving growth through strategy, leadership, and innovation."
        titleVariant="parent-company"
        titleClassName="lg:w-[70%] w-full px-6"
        titleDirectFade
        titleInH1={false}
        gapClass="gap-6"
        background={{
          type: "image",
          src: "/pcbg-1.png",
          imageClassName: "bg-bottom bg-center",
        }}
      />

      <div className="px-2 lg:px-10 lg:py-16 flex flex-col items-center justify-center bg-[#F5F5F5]">
        <ColorChangeWithScroll initialColor="#8A8A8A" afterColor="#FF7A5C">
          <p className="text-center  font-medium text-[24px] leading-[40px] tracking-[-0.53px] lg:px-10 mt-8 lg:font-normal lg:text-[32px] lg:leading-[48px] lg:tracking-[-1.4px]">
            Ittihad International Investment LLC is a private holding and
            multi-disciplinary conglomerate, engaged in a wide spectrum of
            economic activities across the MENA region. We lead, manage, and
            empower a diverse portfolio of companies to bring long-term value,
            operational excellence, and sustainable growth.
          </p>
        </ColorChangeWithScroll>
      </div>

      <ScrollRevealCardsContainer
        className="min-h-[80vh] w-full flex items-center justify-center my-8 px-2 lg:px-10"
        containerClassName="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
        staggerDelay={0.5}
        pin={false}
      >
        <div className="min-h-[40vh] py-10 lg:h-full relative rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 group transition-transform duration-500 ease-out">
          <div className="pb-6">
            <h1 className="font-[Helvetica_Now_Display] font-medium text-[28px] leading-[37px] tracking-[-0.74px] lg:text-[52px] lg:leading-[69.07px] lg:tracking-[-1.38px] text-primary py-4 lg:py-6">
              Manufacturing
            </h1>
            <p className="text-[#5F5F66] font-[Helvetica_Now_Display] font-normal text-sm leading-[24px] tracking-[-0.43px] mt-3 w-full lg:w-4/5 lg:text-[20px] lg:leading-[36px] lg:tracking-[-0.8px]">
              Our manufacturing segment is powered by advanced production
              capabilities, high-grade facilities, and an uncompromising
              commitment to quality. We support industries with reliable,
              large-scale output across metals, materials, consumer goods, and
              industrial components.
            </p>
          </div>
          <Image
            src="/pc1.png"
            alt="Icon"
            className="absolute bottom-0 right-0 max-w-[45%] lg:max-w-[60%]"
            width={300}
            height={0}
          />
        </div>

        <div className="relative py-5 rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 group transition-transform duration-500 ease-out">
          <div className="pb-6">
            <h1 className="font-[Helvetica_Now_Display] font-medium text-[28px] leading-[37px] tracking-[-0.74px] lg:text-[52px] lg:leading-[69.07px] lg:tracking-[-1.38px] text-primary py-4 lg:py-6">
              Trading
            </h1>
            <p className="relative z-10 text-[#5F5F66] font-[Helvetica_Now_Display] font-normal text-sm leading-[24px] tracking-[-0.43px] mt-3 w-full lg:w-4/5 lg:text-[20px] lg:leading-[36px] lg:tracking-[-0.8px]">
              With a strong regional footprint, our trading operations connect
              global suppliers with local markets. We streamline supply-chain
              processes, enhance product availability, and ensure that
              businesses can access the materials and products they need,
              quickly and efficiently.
            </p>
          </div>
          <Image
            src="/pc2.png"
            alt="Icon"
            className="z-0 absolute bottom-0 right-0 max-w-[35%] lg:max-w-[55%]"
            width={250}
            height={0}
          />
        </div>

        <div className="min-h-[40vh] py-10 relative rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 group transition-transform duration-500 ease-out">
          <div className="pb-6">
            <h1 className="font-[Helvetica_Now_Display] font-medium text-[28px] leading-[37px] tracking-[-0.74px] lg:text-[52px] lg:leading-[69.07px] lg:tracking-[-1.38px] text-primary py-4 lg:py-6">
              Construction
            </h1>
            <p className="text-[#5F5F66] font-[Helvetica_Now_Display] font-normal text-sm leading-[24px] tracking-[-0.43px] mt-3 w-full lg:w-4/5 lg:text-[20px] lg:leading-[36px] lg:tracking-[-0.8px]">
              Our manufacturing segment is powered by advanced production
              capabilities, high-grade facilities, and an uncompromising
              commitment to quality. We support industries with reliable,
              large-scale output across metals, materials, consumer goods, and
              industrial components.
            </p>
          </div>
          <Image
            src="/pc3.png"
            alt="Icon"
            className="z-0 absolute bottom-0 right-0 max-w-[35%] lg:max-w-[55%]"
            width={250}
            height={0}
          />
        </div>

        <div className="min-h-[40vh] py-10 relative rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 group transition-transform duration-500 ease-out">
          <div className="pb-6">
            <h1 className="font-[Helvetica_Now_Display] font-medium text-[28px] leading-[37px] tracking-[-0.74px] lg:text-[52px] lg:leading-[69.07px] lg:tracking-[-1.38px] text-primary py-4 lg:py-6">
              Services
            </h1>
            <p className="relative z-10 text-[#5F5F66] font-[Helvetica_Now_Display] font-normal text-sm leading-[24px] tracking-[-0.43px] mt-3 w-full lg:w-4/5 lg:text-[20px] lg:leading-[36px] lg:tracking-[-0.8px]">
              From logistics and facility management to specialized industrial
              services, we deliver essential support functions that strengthen
              our group's operational backbone. Our service companies allow
              other subsidiaries to focus on their core business while
              benefiting from dependable, optimized support systems.
            </p>
          </div>
          <Image
            src="/pc4.png"
            alt="Icon"
            className="z-0 absolute bottom-3 right-3 max-w-[35%] lg:w-50"
            width={250}
            height={0}
          />
        </div>
      </ScrollRevealCardsContainer>

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
              src="/exp2.png"
              alt="Expertise Icon"
              width={180}
              height={80}
              className="w-60 lg:w-76 absolute -bottom-0 -right-5 lg:right-0 z-0 rounded-b-2xl lg:rounded-none"
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
    </div>
  );
}
