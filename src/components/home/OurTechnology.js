"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import { WhiteBadge } from "../../common/badge.js";

const TECHNOLOGIES = [
  {
    id: 0,
    slug: "ccr-technology",
    title: "CCR Technology",
    description:
      "Southwire SCR®-4500 Continuous Casting and Rolling Technology. Our Southwire SCR®-4500 technology continuously transforms high-purity copper cathodes into premium 8 mm, 12.5 mm, and 16 mm ETP copper rod, delivering exceptional quality, efficiency, and production reliability.",
    backgroundImage: "url('/home/tech1.webp')",
  },
  {
    id: 1,
    slug: "rod-breakdown",
    title: "Rod Breakdown Technology",
    description:
      "Precision Multi-Wire Drawing for High-Quality Copper Wire. UCR's Rod Breakdown Technology converts 8 mm copper rod into precision intermediate wire sizes through continuous multi-wire drawing, delivering excellent dimensional accuracy, surface finish, and consistent product quality.",
    backgroundImage: "url('/home/tech2.webp')",
  },
  {
    id: 2,
    slug: "tin-coating",
    title: "Tin Coating Technology",
    description:
      "High-Performance Electrolytic Tin Coating for Copper Wire. Our Electrolytic Tin Plating Technology applies a uniform tin coating to copper wire, enhancing corrosion resistance, solderability, and long-term reliability while maintaining excellent electrical conductivity.",
    backgroundImage: "url('/home/tech3.webp')",
  },
  {
    id: 3,
    slug: "upwards-vertical-casting",
    title: "Upwards Vertical Continuous Casting",
    description:
      "UCR's Upward Continuous Casting Technology produces premium oxygen-free copper and copper alloy rod with exceptional conductivity, metallurgical quality, and consistent performance for demanding electrical and industrial applications.",
    backgroundImage: "url('/home/tech4.webp')",
  },
  {
    id: 4,
    slug: "advanced-copper-recycling",
    title: "Advanced Copper Recycling",
    description:
      "Our Advanced Copper Recycling facility transforms industrial copper scrap into high-quality recycled copper feedstock using automated shredding, intelligent separation, and precision material recovery technologies.",
    backgroundImage: "url('/home/tech5.webp')",
  },
];

const EASE = [0.22, 1, 0.36, 1];

/** Offset when `activeIndex` is selected — items above are always heading-sized. */
function getCardOffset(itemEls, activeIndex, gap) {
  let y = 0;
  for (let i = 0; i < activeIndex; i += 1) {
    const el = itemEls[i];
    if (!el) continue;
    y += el.offsetHeight + gap;
  }
  return y;
}

export default function OurTechnology() {
  const [activeTab, setActiveTab] = useState(0);
  const [cardReady, setCardReady] = useState(false);
  const [cardHeight, setCardHeight] = useState(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const measureRefs = useRef([]);
  const cardY = useMotionValue(0);
  const pendingFromY = useRef(null);
  const activeTabRef = useRef(0);
  const slideControlsRef = useRef(null);
  const cardHeightRef = useRef(null);
  const router = useRouter();

  const activeTech = TECHNOLOGIES[activeTab];

  const getGap = useCallback(() => {
    const list = listRef.current;
    if (!list) return 24;
    const styles = window.getComputedStyle(list);
    return parseFloat(styles.rowGap || styles.gap) || 24;
  }, []);

  const measureMaxCardHeight = useCallback(() => {
    let max = 0;
    measureRefs.current.forEach((el) => {
      if (!el) return;
      max = Math.max(max, Math.ceil(el.getBoundingClientRect().height));
    });
    return max > 0 ? max : null;
  }, []);

  const applyActiveSpacerHeight = useCallback((height) => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.height = i === activeTabRef.current ? `${height}px` : "";
    });
  }, []);

  const syncCardLayout = useCallback(
    (animateSlide) => {
      const nextHeight = measureMaxCardHeight();
      if (nextHeight == null) return;

      if (cardHeightRef.current !== nextHeight) {
        cardHeightRef.current = nextHeight;
        setCardHeight(nextHeight);
      }

      applyActiveSpacerHeight(nextHeight);

      const toY = getCardOffset(itemRefs.current, activeTabRef.current, getGap());
      const fromY = animateSlide ? pendingFromY.current : null;

      if (fromY === null) {
        cardY.set(toY);
      } else {
        pendingFromY.current = null;
        slideControlsRef.current?.stop();
        cardY.set(fromY);
        slideControlsRef.current = animate(cardY, toY, { duration: 0.45, ease: EASE });
      }

      setCardReady(true);
    },
    [applyActiveSpacerHeight, cardY, getGap, measureMaxCardHeight]
  );

  useLayoutEffect(() => {
    syncCardLayout(true);
  }, [activeTab, syncCardLayout]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;

    const onResize = () => syncCardLayout(false);

    const observer = new ResizeObserver(onResize);
    observer.observe(list);
    measureRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [syncCardLayout]);

  const handleTabChange = (tabIndex) => {
    if (tabIndex === activeTab) return;

    // Use live card position so mid-animation clicks still slide the right way
    pendingFromY.current = cardY.get();
    activeTabRef.current = tabIndex;
    setActiveTab(tabIndex);
  };

  const activeItemStyle = cardHeight ? { height: cardHeight } : undefined;

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

          <div ref={listRef} className="relative flex flex-col gap-[1.25rem] lg:gap-[1.5rem]">
            {TECHNOLOGIES.map((tech, index) => {
              const isActive = tech.id === activeTab;

              return (
                <div
                  key={tech.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="relative w-full"
                  style={isActive ? activeItemStyle : undefined}
                >
                  <motion.button
                    type="button"
                    onClick={() => handleTabChange(tech.id)}
                    initial={false}
                    animate={{ opacity: isActive ? 0 : 1 }}
                    whileHover={isActive ? undefined : { opacity: 0.8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    tabIndex={isActive ? -1 : 0}
                    aria-hidden={isActive}
                    disabled={isActive}
                    className="flex w-full items-center gap-[0.75rem] px-[0.25rem] py-[0.35rem] text-left disabled:pointer-events-none disabled:cursor-default"
                  >
                    <ArrowRight size={22} className="shrink-0 text-white" />
                    <span className="font-primary font-normal text-white text-[clamp(1.35rem,5.2cqi,2.25rem)] leading-none tracking-[-0.06rem]">
                      {tech.title}
                    </span>
                  </motion.button>
                </div>
              );
            })}

            {/* Off-screen: measure every tech so card height stays constant */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-0 -z-10 opacity-0"
            >
              {TECHNOLOGIES.map((tech, index) => (
                <div
                  key={tech.id}
                  ref={(el) => {
                    measureRefs.current[index] = el;
                  }}
                  className="box-border flex flex-col rounded-xl bg-white px-[1.25rem] pt-[1.25rem] pb-[1.75rem] lg:px-[1.5rem] lg:pt-[1.35rem] lg:pb-[2rem]"
                >
                  <h2 className="shrink-0 font-primary font-normal text-primary text-[clamp(1.35rem,5.2cqi,2.75rem)] leading-none tracking-[-0.06rem]">
                    {tech.title}
                  </h2>
                  <p className="mt-[0.6rem] font-primary font-normal text-[0.875rem] leading-[1.6] tracking-[-0.02rem] text-black lg:text-[1.0625rem] lg:leading-[1.65]">
                    {tech.description}
                  </p>
                  <div className="mt-[0.85rem] inline-flex h-[2.25rem] w-fit shrink-0 items-center justify-center gap-[0.4rem] rounded-full border border-primary px-[1rem] lg:mt-[1rem] lg:h-[2.75rem] lg:px-[1.25rem]">
                    <span className="font-primary font-normal text-[0.8125rem] leading-none tracking-[-0.03rem] lg:text-[0.9375rem]">
                      Know more
                    </span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>

            {cardReady && cardHeight != null && (
              <motion.div
                className="absolute left-0 right-0 top-0 z-10 box-border overflow-hidden rounded-xl bg-white px-[1.25rem] pt-[1.25rem] pb-[1.75rem] shadow-none lg:px-[1.5rem] lg:pt-[1.35rem] lg:pb-[2rem]"
                style={{ y: cardY, height: cardHeight }}
              >
                <div className="relative h-full w-full">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={activeTech.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12, ease: "easeInOut" }}
                      className="absolute inset-0 flex flex-col"
                    >
                      <h2 className="shrink-0 font-primary font-normal text-primary text-[clamp(1.35rem,5.2cqi,2.75rem)] leading-none tracking-[-0.06rem]">
                        {activeTech.title}
                      </h2>
                      <p className="mt-[0.6rem] font-primary font-normal text-[0.875rem] leading-[1.6] tracking-[-0.02rem] text-black lg:text-[1.0625rem] lg:leading-[1.65]">
                        {activeTech.description}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/technology?tech=${activeTech.slug}`)
                        }
                        className="mt-auto inline-flex h-[2.25rem] w-fit shrink-0 items-center justify-center gap-[0.4rem] rounded-full border border-primary px-[1rem] text-primary transition-all duration-300 hover:bg-primary hover:text-white lg:h-[2.75rem] lg:px-[1.25rem]"
                      >
                        <span className="font-primary font-normal text-[0.8125rem] leading-none tracking-[-0.03rem] lg:text-[0.9375rem]">
                          Know more
                        </span>
                        <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="relative isolate min-h-[22rem] w-full self-stretch overflow-hidden rounded-xl lg:min-h-[40rem] lg:w-1/2">
          {TECHNOLOGIES.map((tech, index) => (
            <motion.div
              key={tech.id}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: tech.backgroundImage }}
              initial={false}
              animate={{ x: `${(index - activeTab) * 100}%` }}
              transition={{ duration: 0.55, ease: EASE }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
