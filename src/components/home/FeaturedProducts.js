"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import badge_icon from "../../../public/badge.png";

const FALLBACK_PRODUCTS = [
  {
    id: 0,
    title: "ETP Copper Rod and wire",
    backgroundImage: "/fp1-1.png",
  },
  {
    id: 1,
    title: "Drawn Copper Wire",
    backgroundImage: "/fp2-2.png",
  },
  {
    id: 2,
    title: "Tin-Coated Copper Wire",
    backgroundImage: "/fp3-3.png",
  },
  {
    id: 3,
    title: "Copper Welding Wire for cans",
    backgroundImage: "/fp2.png",
  },
  {
    id: 4,
    title: "Oxygen free copper",
    backgroundImage: "/fp3.png",
  },
];

const FALLBACK_BACKGROUNDS = FALLBACK_PRODUCTS.map((item) => item.backgroundImage);

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
    <div className="relative min-h-[min(100vh,1000px)] lg:min-h-[min(90vh,1000px)] max-h-[1000px]">
      {/* Background fills the mx-10 container, clipped to rounded corners */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div
          ref={backgroundSliderRef}
          className="flex h-full will-change-transform"
          style={{ width: `${items.length * 100}%` }}
        >
          {items.map((product) => (
            <div
              key={product.id}
              className="h-full shrink-0 bg-cover  bg-no-repeat"
              style={{
                width: `${100 / items.length}%`,
                backgroundImage: `url(${product.backgroundImage})`,
              }}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content Card */}
      <div className="relative z-10 flex h-full min-h-[min(100vh,1000px)] lg:min-h-[min(90vh,1000px)] max-h-[1000px] items-end lg:items-stretch py-[1.25rem] lg:py-[2.5rem] lg:pl-[1.5rem]">
      <div className="relative bg-white p-[1.75rem] sm:p-[2rem] lg:p-[2.75rem] xl:p-[3.25rem] flex flex-col justify-between gap-[1.75rem] lg:gap-[2.25rem] w-[calc(100%-1.5rem)] lg:w-[56%] xl:w-[54%] h-auto lg:h-full mx-[0.75rem] lg:mx-0 rounded-xl shadow-2xl transition-all duration-700">
        {/* Header */}
        <div className="shrink-0 flex items-center gap-[0.75rem]">
          <Image
            src={badge_icon}
            alt=""
            width={24}
            height={24}
            className="object-contain shrink-0 w-[1.25rem] h-[1.25rem]"
          />
          <span className="text-black uppercase text-[0.75rem] lg:text-[0.875rem] leading-[1.25rem] tracking-[0.08rem]">
            Featured Products
          </span>
        </div>

        {/* Product Tabs */}
        <div className="flex flex-col gap-[1rem] lg:gap-[1.35rem] xl:gap-[1.5rem]">
          {items.map((product, index) => (
            <button
              key={product.id}
              onClick={() => handleTabChange(index)}
              className={`cursor-pointer transition-all duration-300 w-full text-left ${
                activeTab === index
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-80"
              }`}
              type="button"
            >
              <h2
                className={`font-primary whitespace-nowrap leading-[1.15] tracking-[-0.06rem] ${
                  activeTab === index
                    ? "text-primary font-medium text-[1.5rem] sm:text-[1.75rem] lg:text-[2.5rem] xl:text-[2.75rem]"
                    : "text-secondary font-normal text-[1.35rem] sm:text-[1.5rem] lg:text-[2.15rem] xl:text-[2.35rem]"
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
