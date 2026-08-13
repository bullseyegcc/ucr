"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WhiteBadge } from "../../common/badge.js";
import { technologyParallaxSlide } from "../../animations/technologyParallax";

const TECHNOLOGIES = [
  {
    id: 0,
    title: "CCR Technology",
    description:
      "Southwire SCR® Continuous Casting and Rolling Technology. Our Southwire SCR® continuously transforms high-purity copper cathodes into premium 8 mm, 12.5 mm, and 16 mm ETP copper rod, delivering exceptional quality, efficiency, and production reliability.",
    backgroundImage: "url('/technology3-3.png')",
  },
  {
    id: 1,
    title: "Rod Breakdown Technology",
    description:
      "Advanced multi-stage rod breakdown lines convert ETP copper rod into precision drawn wire with consistent diameter, superior surface quality, and high electrical conductivity for demanding applications.",
    backgroundImage: "url('/technology1-1.png')",
  },
  {
    id: 2,
    title: "Tin Coating Technology",
    description:
      "State-of-the-art tin coating processes apply uniform protective layers to copper wire, enhancing corrosion resistance and extending product life for electrical, solar, and industrial applications.",
    backgroundImage: "url('/technology2-2.png')",
  },
  {
    id: 3,
    title: "Upwards Vertical Continuous Casting",
    description:
      "Upwards vertical continuous casting technology enables the production of high-purity copper with precise metallurgical control, supporting specialty grades including oxygen-free copper.",
    backgroundImage: "url('/technology2.png')",
  },
  {
    id: 4,
    title: "Advanced Copper Recycling",
    description:
      "Our advanced copper recycling capabilities recover and refine secondary copper to meet the highest environmental standards, reducing waste while maintaining premium product quality.",
    backgroundImage: "url('/technology3.png')",
  },
];

export default function OurTechnology() {
  const [activeTab, setActiveTab] = useState(0);
  const backgroundSliderRef = useRef(null);
  const router = useRouter();

  const handleTabChange = (tabIndex) => {
    if (tabIndex === activeTab) return;
    technologyParallaxSlide(backgroundSliderRef, tabIndex);
    setActiveTab(tabIndex);
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem]">
      <div className="flex flex-col lg:flex-row gap-[0.25rem] items-stretch">
        <div className="@container flex w-full lg:w-1/2 flex-col gap-[1.75rem] lg:gap-[2rem] rounded-xl bg-primary px-[1.25rem] py-[2rem] sm:px-[1.75rem] lg:px-[2.5rem] lg:py-[2.5rem]">
          <div>
            <WhiteBadge title="Core Strength" />
            <h1 className="mt-[0.75rem] font-primary font-medium text-[2rem] leading-[1.1] tracking-[-0.05rem] text-white sm:text-[2.5rem] lg:text-[3.5rem] lg:tracking-[-0.09rem]">
              Our technology
            </h1>
          </div>

          <div className="flex flex-col gap-[1.25rem] lg:gap-[1.75rem]">
            {TECHNOLOGIES.map((tech, index) => {
              const isActive = activeTab === index;
              return (
                <div
                  key={tech.id}
                  onClick={() => handleTabChange(index)}
                  className={`cursor-pointer rounded-xl transition-all duration-500 ease-out ${
                    isActive
                      ? "bg-white px-[1.25rem] py-[1.5rem] lg:px-[1.5rem] lg:py-[1.75rem] shadow-lg"
                      : "px-[0.25rem] py-[0.15rem] hover:opacity-80"
                  }`}
                >
                  <h2
                    className={`font-primary font-normal flex items-center gap-[0.75rem] whitespace-nowrap leading-none tracking-[-0.06rem] transition-all duration-500 ${
                      isActive
                        ? "text-primary text-[clamp(1.35rem,5.2cqi,2.75rem)]"
                        : "text-white text-[clamp(1.2rem,4.6cqi,2.5rem)]"
                    }`}
                  >
                    <span
                      className={`shrink-0 overflow-hidden transition-all duration-500 ${
                        isActive ? "w-0 opacity-0" : "w-[1.4rem] opacity-100"
                      }`}
                    >
                      <ArrowRight size={22} className="text-white" />
                    </span>
                    <span>{tech.title}</span>
                  </h2>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isActive
                        ? "mt-[0.75rem] max-h-[24rem] opacity-100"
                        : "mt-0 max-h-0 opacity-0"
                    }`}
                  >
                    <p className="font-primary font-normal text-[0.75rem] leading-[1.6] tracking-[-0.02rem] text-black lg:text-[1.125rem] lg:leading-[1.7] lg:tracking-[-0.03rem]">
                      {tech.description}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/technology");
                      }}
                      className="mt-[1rem] inline-flex h-[2.5rem] items-center justify-center gap-[0.5rem] rounded-full border border-primary px-[1.25rem] text-primary transition-all duration-300 hover:bg-primary hover:text-white lg:h-[3.5rem] lg:px-[1.5rem]"
                    >
                      <span className="font-primary font-normal text-[0.875rem] leading-none tracking-[-0.03rem] lg:text-[1.125rem]">
                        Know more
                      </span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[22rem] w-full self-stretch overflow-hidden rounded-xl lg:min-h-[40rem] lg:w-1/2">
          <div
            ref={backgroundSliderRef}
            className="absolute inset-0 flex h-full w-full will-change-transform"
          >
            {TECHNOLOGIES.map((tech) => (
              <div
                key={tech.id}
                className="h-full w-full flex-shrink-0 rounded-xl"
                style={{
                  backgroundImage: tech.backgroundImage,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
          </div>
          <Image
            src="/sign.png"
            alt=""
            width={80}
            height={80}
            className="pointer-events-none absolute bottom-[1.25rem] right-[1.25rem] z-10 w-[3.5rem] lg:w-[5rem] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
