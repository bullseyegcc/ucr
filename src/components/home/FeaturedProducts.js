"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import badge_icon from "../../../public/shared/badge.png";

const FALLBACK_PRODUCTS = [
  {
    id: 0,
    title: "ETP Copper Rod and wire",
    backgroundImage: "/home/fp1-1.png",
  },
  {
    id: 1,
    title: "Drawn Copper Wire",
    backgroundImage: "/home/fp2-2.png",
  },
  {
    id: 2,
    title: "Tin-Coated Copper Wire",
    backgroundImage: "/home/fp3-3.png",
  },
  {
    id: 3,
    title: "Copper Welding Wire for cans",
    backgroundImage: "/home/fp2.png",
  },
  {
    id: 4,
    title: "Oxygen free copper",
    backgroundImage: "/home/fp3.png",
  },
];

const FALLBACK_BACKGROUNDS = FALLBACK_PRODUCTS.map(
  (item) => item.backgroundImage
);

function mapHomeProducts(products) {
  if (!products?.length) return FALLBACK_PRODUCTS;
  return products.map((product, index) => ({
    id: product.id,
    title: product.name,
    backgroundImage: FALLBACK_BACKGROUNDS[index % FALLBACK_BACKGROUNDS.length],
  }));
}

export default function FeaturedProducts({ products }) {
  const items = mapHomeProducts(products);
  const [activeTab, setActiveTab] = useState(0);
  const backgroundSliderRef = useRef(null);

  // Handle tab change with direct parallax slide animation
  const handleTabChange = (tabIndex) => {
    if (tabIndex === activeTab) return;

    setActiveTab(tabIndex);

    if (backgroundSliderRef.current) {
      gsap.to(backgroundSliderRef.current, {
        xPercent: -tabIndex * (100 / items.length),
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem]">
      {/* Explicit h- (not min-h) so percentage heights on the card resolve */}
      <div className="relative h-[min(100vh,1000px)] lg:h-[min(90vh,1000px)] max-h-[1000px]">
        {/* Background fills the container, clipped to rounded corners */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div
            ref={backgroundSliderRef}
            className="flex h-full will-change-transform"
            style={{ width: `${items.length * 100}%` }}
          >
            {items.map((product) => (
              <div
                key={product.id}
                className="h-full shrink-0 bg-cover bg-no-repeat"
                style={{
                  width: `${100 / items.length}%`,
                  backgroundImage: `url(${product.backgroundImage})`,
                }}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content Card — stretches nearly full parent height with a small inset */}
        <div className="relative z-10 flex h-full items-end lg:items-stretch p-[1.25rem] lg:p-[1.5rem] lg:pr-0">
          <div className="relative bg-white pt-[1.75rem] pb-[1.75rem] pl-[1.75rem] pr-[2.25rem] sm:pt-[2rem] sm:pb-[2rem] sm:pl-[2rem] sm:pr-[2.75rem] lg:pt-[3rem] lg:pb-[3rem] lg:pl-[3rem] lg:pr-[4rem] xl:pt-[3.5rem] xl:pb-[3.5rem] xl:pl-[3.5rem] xl:pr-[4.75rem] flex flex-col justify-between gap-[1.75rem] lg:gap-[2.25rem] w-full lg:w-[58%] xl:w-[56%] 2xl:w-[54%] h-auto lg:h-full rounded-xl shadow-2xl transition-all duration-700">
            {/* Header */}
            <div className="shrink-0 flex items-center gap-[0.75rem]">
              <Image
                src={badge_icon}
                alt=""
                width={24}
                height={24}
                className="object-contain shrink-0 w-[1.25rem] h-[1.25rem] lg:w-[1.5rem] lg:h-[1.5rem]"
              />
              <span className="text-black uppercase text-[0.75rem] lg:text-[0.9375rem] xl:text-[1rem] leading-[1.25rem] tracking-[0.08rem]">
                Featured Products
              </span>
            </div>

            {/* Product Tabs */}
            <div className="flex flex-col gap-[1rem] lg:gap-[1.5rem] xl:gap-[1.75rem]">
              {items.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => handleTabChange(index)}
                  className={`cursor-pointer transition-all duration-300 w-full text-left ${
                    activeTab === index
                      ? "opacity-100"
                      : "opacity-55 hover:opacity-75"
                  }`}
                  type="button"
                >
                  <h2
                    className={`font-primary leading-[1.1] tracking-[-0.06rem] ${
                      activeTab === index
                        ? "text-primary font-medium text-[1.5rem] sm:text-[1.75rem] lg:text-[2.5rem] xl:text-[2.85rem] 2xl:text-[3.1rem]"
                        : "text-secondary font-normal text-[1.35rem] sm:text-[1.5rem] lg:text-[2.25rem] xl:text-[2.55rem] 2xl:text-[2.75rem]"
                    }`}
                  >
                    {product.title}
                  </h2>
                </button>
              ))}
            </div>

            {/* Indicator dots */}
            <div className="shrink-0 flex flex-col gap-4 pt-2">
              <div className="flex gap-2">
                {items.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handleTabChange(index)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      activeTab === index
                        ? "w-6 h-3 sm:w-8 sm:h-4 bg-primary"
                        : "w-3 h-1.5 sm:w-6 sm:h-3 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
