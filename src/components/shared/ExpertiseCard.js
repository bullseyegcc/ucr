"use client";

import Image from "next/image";
import CardAnimation from "@/animations/CardAnimation";
import CountUp from "@/animations/countup";

const VARIANT_STYLES = {
  tall: "h-[24rem] max-h-[30rem] min-h-[24rem] lg:h-[30rem] lg:max-h-[30rem] lg:min-h-[30rem]",
  medium:
    "h-[23rem] max-h-[27rem] min-h-[23rem] lg:h-[27rem] lg:max-h-[27rem] lg:min-h-[27rem]",
  small:
    "h-[22rem] max-h-[24rem] min-h-[22rem] lg:h-[24rem] lg:max-h-[24rem] lg:min-h-[24rem]",
};

const VARIANT_CONTENT_PAD = {
  tall: "pb-[36%]",
  medium: "pb-[48%]",
  small: "pb-[36%]",
};

export default function ExpertiseCard({
  number,
  title,
  description,
  image,
  imageAlt = "",
  variant = "medium",
  imageClassName = "",
  descriptionClassName = "",
  contentClassName = "",
  className = "",
  prefix = "",
  suffix = "+",
  separator = "",
  duration = 2,
  index = 0,
  imageWidth = 600,
  imageHeight = 300,
}) {
  const variantClass = VARIANT_STYLES[variant] ?? VARIANT_STYLES.medium;
  const contentPad =
    contentClassName ||
    VARIANT_CONTENT_PAD[variant] ||
    VARIANT_CONTENT_PAD.medium;

  return (
    <CardAnimation
      index={index}
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white px-6 pt-8 transition-all duration-400 lg:w-1/3 lg:rounded-t-2xl lg:px-8 lg:pt-12 ${variantClass} ${className}`}
    >
      <div className={`relative z-10 flex flex-col ${contentPad}`}>
        <span className="bg-gradient-to-l from-white via-gray-200 to-[#FE5D0A] bg-clip-text text-[4.5rem] font-medium leading-none tracking-[-0.075rem] text-transparent lg:text-[5.25rem] lg:tracking-[-0.09rem]">
          {prefix}
          <CountUp to={number} duration={duration} separator={separator} />
          {suffix}
        </span>
        <hr className="mt-4 w-[90%] border-[#FE5D0A]/30" />
        <h3 className="mt-6 align-middle text-[1.4rem] font-medium leading-[1.15] tracking-[-0.08rem] lg:text-[1.625rem] lg:tracking-[-0.09rem]">
          {title}
        </h3>
        <p
          className={`mt-3 text-[0.95rem] leading-relaxed text-[#4B4B4B] lg:text-[1rem] ${descriptionClassName}`}
        >
          {description}
        </p>
      </div>

      <Image
        src={image}
        alt={imageAlt || title}
        width={imageWidth}
        height={imageHeight}
        className={`pointer-events-none absolute z-0 max-w-none ${imageClassName}`}
      />
    </CardAnimation>
  );
}
