"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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

const cardContentTransition = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
};

export default function OurTechnology() {
  const [activeTab, setActiveTab] = useState(0);
  const backgroundSliderRef = useRef(null);
  const router = useRouter();

  const activeTech = TECHNOLOGIES[activeTab];
  const inactiveTechs = TECHNOLOGIES.filter((_, index) => index !== activeTab);

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

          <div className="rounded-xl bg-white px-[1.25rem] py-[1.25rem] shadow-lg lg:px-[1.5rem] lg:py-[1.35rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTech.id}
                initial={cardContentTransition.initial}
                animate={cardContentTransition.animate}
                exit={cardContentTransition.exit}
                transition={cardContentTransition.transition}
              >
                <h2 className="font-primary font-normal text-primary text-[clamp(1.35rem,5.2cqi,2.75rem)] leading-none tracking-[-0.06rem]">
                  {activeTech.title}
                </h2>
                <p className="mt-[0.6rem] min-h-[5.5rem] font-primary font-normal text-[0.875rem] leading-[1.6] tracking-[-0.02rem] text-black lg:min-h-[6.75rem] lg:text-[1.0625rem] lg:leading-[1.65] lg:tracking-[-0.02rem]">
                  {activeTech.description}
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/technology")}
                  className="mt-[0.75rem] inline-flex h-[2.25rem] items-center justify-center gap-[0.4rem] rounded-full border border-primary px-[1rem] text-primary transition-all duration-300 hover:bg-primary hover:text-white lg:h-[2.75rem] lg:px-[1.25rem]"
                >
                  <span className="font-primary font-normal text-[0.8125rem] leading-none tracking-[-0.03rem] lg:text-[0.9375rem]">
                    Know more
                  </span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-[1.75rem] lg:gap-[2.5rem]">
            {inactiveTechs.map((tech) => (
              <button
                key={tech.id}
                type="button"
                onClick={() => handleTabChange(tech.id)}
                className="flex cursor-pointer items-center gap-[0.75rem] px-[0.25rem] py-[0.35rem] text-left transition-opacity duration-300 hover:opacity-80"
              >
                <ArrowRight size={22} className="shrink-0 text-white" />
                <span className="font-primary font-normal text-white text-[clamp(1.35rem,5.2cqi,2.25rem)] leading-none tracking-[-0.06rem]">
                  {tech.title}
                </span>
              </button>
            ))}
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
