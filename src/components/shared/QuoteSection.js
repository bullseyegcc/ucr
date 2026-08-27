"use client";

import Image from "next/image";
import ScrollReveal from "../../animations/ScrollReveal";

export default function QuoteSection() {
  return (
    <div className="min-h-[60vh] lg:min-h-[80vh] rounded-t-lg bg-[url('/shared/gradient-bg.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center gap-4 lg:gap-6 px-6 text-center py-12 lg:py-20">
      <div className="flex flex-col w-full lg:w-[80%]">
        <Image
          src="/shared/quote.png"
          alt="Icon"
          width={40}
          height={0}
          className="w-8 lg:w-[70px]"
        />

        <div className="relative pl-3 lg:pl-5">
          <ScrollReveal
            as="p"
            baseOpacity={0.5}
            enableBlur
            baseRotation={0}
            blurStrength={0.5}
            containerClassName="w-full text-[24px] leading-[48px] italic tracking-[0px] text-center align-middle lg:text-[32px] lg:leading-[48px]"
          >
            Through our recycling initiatives and circular economy model, we
            reintegrate valuable materials back into the supply chain, reducing
            waste and supporting the UAE&apos;s broader sustainability
            objectives.
          </ScrollReveal>
          <Image
            src="/shared/quote.png"
            alt="Icon"
            width={40}
            height={0}
            className="w-8 lg:w-[60px] absolute -right-8 lg:-right-20 lg:-right-6 bottom-0"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 lg:gap-4">
        <Image
          src="/shared/diamsign.png"
          alt="Icon"
          width={150}
          height={0}
          className="w-24 lg:w-[150px]"
        />
        <h1 className="text-2xl lg:text-4xl font-medium">Mohammad Salman</h1>
        <p className="text-base lg:text-2xl font-light">General Manager</p>
      </div>
    </div>
  );
}
