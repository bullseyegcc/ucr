"use client";

import { Badge } from "../../common/badge";
import Hero from "@/components/shared/Hero";
import Image from "next/image";
import ExpertiseCard from "@/components/shared/ExpertiseCard";
import SlideIn from "../../animations/SlideIn";
import SequentialSlideIn from "../../animations/SequentialSlideIn";
import ScrollReveal from "../../animations/ScrollReveal";


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
          src: "/parent-company/pcbg-1.png",
          imageClassName: "bg-bottom bg-center",
        }}
      />

      <div className="bg-[#F5F5F5] px-2 lg:py-16">
        <div className="mx-auto w-full max-w-[1600px] px-2 lg:px-10">
          <ScrollReveal
            as="p"
            baseOpacity={0.2}
            enableBlur
            baseRotation={0}
            blurStrength={0}
            containerClassName="whitespace-pre-line text-center font-medium text-primary text-[28px] leading-[44px] tracking-[-0.53px] lg:text-[40px] lg:font-normal lg:leading-[56px] lg:tracking-[-1.4px]"
          >
            {`Ittihad International Investment LLC is a private holding and multi-disciplinary conglomerate, engaged in a wide spectrum of economic activities across the MENA region.
We lead, manage, and empower a diverse portfolio of companies to bring long-term value, operational excellence, and sustainable growth.`}
          </ScrollReveal>
        </div>
      </div>

      <SequentialSlideIn
        className="mx-auto my-8 grid min-h-[80vh] w-full max-w-[1600px] grid-cols-1 items-stretch gap-6 px-2 sm:grid-cols-2 lg:px-10"
        itemClassName="min-w-0 h-full"
        start="top 85%"
        end="bottom 65%"
        stagger={0.18}
      >
        <div className="min-h-[40vh] h-full py-10 relative rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 group transition-transform duration-500 ease-out">
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
            src="/parent-company/pc1.png"
            alt="Icon"
            className="absolute bottom-0 right-0 max-w-[45%] lg:max-w-[60%]"
            width={300}
            height={0}
          />
        </div>

        <div className="min-h-[40vh] h-full py-10 relative rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 group transition-transform duration-500 ease-out">
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
            src="/parent-company/pc2.png"
            alt="Icon"
            className="z-0 absolute bottom-0 right-0 max-w-[35%] lg:max-w-[55%]"
            width={250}
            height={0}
          />
        </div>

        <div className="min-h-[40vh] h-full py-10 relative rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 group transition-transform duration-500 ease-out">
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
            src="/parent-company/pc3.png"
            alt="Icon"
            className="z-0 absolute bottom-0 right-0 max-w-[35%] lg:max-w-[55%]"
            width={250}
            height={0}
          />
        </div>

        <div className="min-h-[40vh] h-full py-10 relative rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 group transition-transform duration-500 ease-out">
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
            src="/parent-company/pc4.png"
            alt="Icon"
            className="z-0 absolute bottom-3 right-3 max-w-[35%] lg:w-50"
            width={250}
            height={0}
          />
        </div>
      </SequentialSlideIn>

      <div className="mb-8 w-full bg-[url('/about/expertisebg.png')] bg-cover bg-top bg-no-repeat px-4 pt-12 lg:h-full lg:px-10 lg:pt-16">
        <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col justify-between">
          <SlideIn direction="left" scrollTrigger={true} duration={0.8}>
            <Badge title="our expertise" />
            <h1 className=" font-normal align-middle text-[32px] tracking-[-1.47px] lg:text-[52px] lg:leading-[99px] lg:tracking-[-2.5px]">
              Our Experience & Expertise
            </h1>
          </SlideIn>
          <div className="mt-6 flex flex-col items-end gap-6 lg:flex-row">
            <ExpertiseCard
              index={0}
              variant="tall"
              number={2.2}
              prefix="$"
              suffix=" bn"
              title="Global Exports"
              description="A significant export footprint connecting local manufacturing capabilities with global markets. These exports reflect the sector's growing competitiveness and international reach."
              image="/about/exp3.png"
              imageAlt="Global exports globe"
              imageWidth={290}
              imageHeight={80}
              descriptionClassName="pr-0 lg:pr-4 lg:max-w-[22rem]"
              imageClassName="bottom-0 -right-6 w-[70%] rounded-b-2xl lg:w-[82%]"
            />

            <ExpertiseCard
              index={1}
              variant="medium"
              number={10609}
              separator=","
              duration={2.5}
              title="Employees"
              description="A strong workforce powering the sector's continued growth and operational capacity. Skilled talent plays a critical role in supporting manufacturing, innovation, and expansion."
              image="/about/exp2.png"
              imageAlt="Employees"
              imageWidth={180}
              imageHeight={80}
              descriptionClassName="max-w-[14rem] lg:max-w-[16rem]"
              imageClassName="bottom-0 -right-5 w-60 rounded-b-2xl lg:right-0 lg:w-76"
            />

            <ExpertiseCard
              index={2}
              variant="small"
              number={4}
              suffix="%"
              title="Of UAE's Manufacturing Exports"
              description="A meaningful contribution to the UAE's overall manufacturing export ecosystem. The figure highlights the sector's role in strengthening the country's industrial economy."
              image="/about/anum.png"
              imageAlt="Copper rods"
              imageWidth={600}
              imageHeight={200}
              contentClassName="pb-[42%]"
              descriptionClassName="w-full max-w-none pr-0 lg:pr-4"
              imageClassName="bottom-0 left-0 right-0 h-[120px] w-full rounded-b-2xl object-cover object-bottom lg:h-[150px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
