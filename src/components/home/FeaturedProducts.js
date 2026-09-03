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
      <div className="relative h-[min(75vh,640px)] max-h-[640px] lg:h-[min(90vh,1000px)] lg:max-h-[1000px]">
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

        {/* Content Card — fixed mobile height (no flicker on tab change); left panel on desktop */}
        <div className="relative z-10 flex h-full items-center justify-center p-[0.85rem] lg:items-stretch lg:justify-start lg:p-[1.5rem] lg:pr-0">
          <div className="relative mx-auto flex h-[min(58vh,460px)] w-full max-w-[24.5rem] flex-col justify-between gap-[1.15rem] rounded-xl bg-white px-[1.5rem] py-[1.75rem] shadow-2xl sm:h-[min(58vh,480px)] sm:max-w-[27rem] sm:gap-[1.35rem] sm:px-[1.75rem] sm:py-[2rem] lg:mx-0 lg:h-full lg:max-w-none lg:w-[58%] lg:gap-[2.25rem] lg:px-0 lg:py-0 lg:pt-[3rem] lg:pb-[3rem] lg:pl-[3rem] lg:pr-[4rem] xl:w-[56%] xl:pt-[3.5rem] xl:pb-[3.5rem] xl:pl-[3.5rem] xl:pr-[4.75rem] 2xl:w-[54%]">
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

            {/* Product Tabs — fixed type metrics so active state never shifts layout */}
            <div className="flex min-h-0 flex-1 flex-col justify-center gap-[0.85rem] lg:flex-none lg:justify-start lg:gap-[1.5rem] xl:gap-[1.75rem]">
              {items.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => handleTabChange(index)}
                  className={`w-full cursor-pointer text-left transition-colors duration-300 ${
                    activeTab === index
                      ? "opacity-100"
                      : "opacity-55 hover:opacity-75"
                  }`}
                  type="button"
                >
                  <h2
                    className={`font-primary text-[1.625rem] font-medium leading-[1.15] tracking-[-0.06rem] sm:text-[1.875rem] lg:text-[2.5rem] lg:leading-[1.1] xl:text-[2.85rem] 2xl:text-[3.1rem] ${
                      activeTab === index ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {product.title}
                  </h2>
                </button>
              ))}
            </div>

            {/* Indicator dots — same height active/inactive so row never reflows */}
            <div className="flex shrink-0 flex-col gap-4 pt-1 lg:pt-2">
              <div className="flex h-3 items-center gap-2 sm:h-4">
                {items.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handleTabChange(index)}
                    className={`cursor-pointer rounded-full transition-[width,background-color] duration-300 ${
                      activeTab === index
                        ? "h-3 w-6 bg-primary sm:h-4 sm:w-8"
                        : "h-3 w-3 bg-gray-300 hover:bg-gray-400 sm:h-4 sm:w-6"
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
