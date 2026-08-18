"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import coppericon from "../../../public/coppericon.png";
import badge_icon from "../../../public/badge.png";

const FALLBACK_BACKGROUNDS = [
  "/fp1-1.png",
  "/fp2-2.png",
  "/fp3-3.png",
  "/fp2.png",
  "/fp3.png",
];

const FALLBACK_PRODUCTS = [
  {
    id: 0,
    title: "ETP Copper Rod and wire",
    slug: "",
    icon: coppericon,
    backgroundImage: "/fp1-1.png",
  },
  {
    id: 1,
    title: "Drawn Copper Wire",
    slug: "",
    icon: coppericon,
    backgroundImage: "/fp2-2.png",
  },
  {
    id: 2,
    title: "Tin-Coated Copper Wire",
    slug: "",
    icon: coppericon,
    backgroundImage: "/fp3-3.png",
  },
  {
    id: 3,
    title: "Copper Welding Wire for cans",
    slug: "",
    icon: coppericon,
    backgroundImage: "/fp2.png",
  },
  {
    id: 4,
    title: "Oxygen free copper",
    slug: "",
    icon: coppericon,
    backgroundImage: "/fp3.png",
  },
];

function mapHomeProducts(products) {
  if (!products?.length) return FALLBACK_PRODUCTS;
  return products.map((product, index) => ({
    id: product.id,
    title: product.name,
    slug: product.slug,
    icon: product.icon || coppericon,
    backgroundImage:
      product.icon || FALLBACK_BACKGROUNDS[index % FALLBACK_BACKGROUNDS.length],
  }));
}

export default function FeaturedProducts({ products }) {
  const items = mapHomeProducts(products);
  const [activeTab, setActiveTab] = useState(0);
  const backgroundSliderRef = useRef(null);
  const router = useRouter();

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

  const handleKnowMore = () => {
    const slug = items[activeTab]?.slug;
    router.push(slug ? `/products/${slug}` : "/products");
  };

  return (
    <div className="relative min-h-screen lg:min-h-[90vh] mx-4 lg:mx-10">
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
      <div className="relative z-10 flex min-h-screen lg:min-h-[90vh] items-end lg:items-center py-8 lg:py-10">
      <div className="relative bg-white p-8 lg:p-10 xl:p-12 flex flex-col gap-5 lg:gap-8 w-[calc(100%-2rem)] lg:w-[48%] h-auto mx-4 lg:ml-8 lg:mr-0 rounded-xl shadow-2xl transition-all duration-700">
        {/* Header */}
        <div className="shrink-0 flex items-center gap-3">
          <Image
            src={badge_icon}
            alt="Badge Icon"
            width={24}
            height={24}
            className="object-contain shrink-0"
          />
          <span className="text-black uppercase text-[0.875rem] leading-[1.25rem] tracking-[0.0625rem]">
            Featured Products
          </span>
        </div>

        {/* Product Tabs — card grows to fit the full list */}
        <div className="flex flex-col gap-3 lg:gap-5">
          {items.map((product, index) => (
            <button
              key={product.id}
              onClick={() => handleTabChange(index)}
              className={`cursor-pointer transition-all duration-300 ${
                activeTab === index
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-80"
              } w-full text-left`}
              type="button"
            >
              <h1
                className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.375rem] leading-[1.15] tracking-[-0.1rem] font-normal capitalize sm:text-[1.625rem] lg:text-[1.875rem] xl:text-[2.25rem] lg:font-medium ${
                  activeTab === index ? "text-primary" : "text-secondary"
                }`}
              >
                <span className="break-words">{product.title}</span>
                {activeTab === index && product.icon && (
                  <Image
                    src={product.icon}
                    alt={product.title}
                    width={56}
                    height={56}
                    className="hidden shrink-0 object-contain lg:inline-block"
                  />
                )}
              </h1>
            </button>
          ))}
        </div>

        {/* Footer: CTA + indicator dots */}
        <div className="shrink-0 flex flex-col gap-4 pt-2">
          <button
            onClick={handleKnowMore}
            className="w-full lg:w-[12.0625rem] h-[2.5rem] lg:h-[3.875rem] flex gap-2 items-center justify-center text-primary border-[0.0625rem] border-primary rounded-[1.9375rem] lg:rounded-[3.125rem] py-[0.5rem] lg:py-3 pl-[1.25rem] lg:pl-[1.75rem] pr-[1.25rem] lg:pr-[1.125rem] hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
          >
            <span className="font-primary font-normal text-[0.875rem] leading-[1.1375rem] tracking-[-0.034rem] text-center lg:text-[1.25rem] lg:leading-[1.8375rem] lg:tracking-[-0.055rem]">
              Know More
            </span>
            <ArrowRight size={18} />
          </button>

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
  );
}
