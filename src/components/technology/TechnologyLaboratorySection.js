'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badgetextblack } from "../../common/badge";
import CardAnimation from "../../animations/CardAnimation";

gsap.registerPlugin(ScrollTrigger);

const LAB_EQUIPMENT = [
  {
    image: "/technology/leco%20oxygen.svg",
    title: "LECO Oxygen Analyzer",
    imageClassName: "h-auto w-full rounded-xl object-cover",
    imageWidth: 480,
    imageHeight: 640,
  },
  {
    image: "/technology/twist.svg",
    title: "Twist/Torsion Tester,",
    imageClassName: "h-auto w-full rounded-xl object-cover",
    imageWidth: 480,
    imageHeight: 640,
  },
  {
    image: "/lab3.png",
    title: "UTS (Ultimate Tensile Strength)",
    imageClassName: "h-[75%] lg:w-[90%] object-fit rounded-xl",
    imageWidth: 480,
    imageHeight: 300,
  },
];

export default function TechnologyLaboratorySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const refreshAnimations = () => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new CustomEvent("scrollAnimationsReady"));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) refreshAnimations();
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    window.addEventListener("scrollAnimationsReady", refreshAnimations);

    return () => {
      observer.disconnect();
      window.removeEventListener("scrollAnimationsReady", refreshAnimations);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 mt-4 flex min-h-[80vh] flex-col items-center justify-start bg-[#F2F2F2] px-10 pt-8 pb-20"
    >
      <div className="animate-reveal">
        <Badgetextblack title="UCR Laboratory" />
      </div>

      <h2 className="animate-reveal mt-4 text-center font-medium text-[32px] leading-[48px] tracking-[-1.4px] text-black lg:mt-5 lg:mt-6 lg:text-[52px] lg:leading-[72px]">
        Equipment used in the testing process
      </h2>

      <div className="flex w-full flex-wrap justify-center gap-6 py-8">
        {LAB_EQUIPMENT.map((item, index) => (
          <CardAnimation
            key={item.title}
            index={index + 3}
            className={`flex w-full flex-col gap-2 transition-all duration-500 ease-out sm:w-[48%] lg:w-[32%] ${index === 1 ? "mt-6 sm:mt-8" : ""} ${index === 2 ? "mt-8 sm:mt-16" : ""}`}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={item.imageWidth ?? 480}
              height={item.imageHeight ?? 0}
              className={item.imageClassName}
            />
            <div className="relative mt-5 flex flex-col">
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#FF6A00] shadow-sm" />
              <h3 className="ml-2 pl-4 text-xl text-gray-500 lg:text-2xl">{item.title}</h3>
            </div>
          </CardAnimation>
        ))}
      </div>
    </section>
  );
}
