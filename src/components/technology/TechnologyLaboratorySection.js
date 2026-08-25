'use client'

import Image from "next/image"
import { Fragment, useRef } from "react"
import { Badgetextblack } from "../../common/badge"
import SequentialSlideIn from "../../animations/SequentialSlideIn"

const LAB_EQUIPMENT = [
  {
    image: "/technology/leco-oxygen.webp",
    title: "LECO Oxygen Analyzer",
    imageClassName: "h-auto w-full rounded-xl object-cover",
    imageWidth: 960,
    imageHeight: 1051,
  },
  {
    image: "/technology/twist.webp",
    title: "Twist/Torsion Tester,",
    imageClassName: "h-auto w-full rounded-xl object-cover",
    imageWidth: 960,
    imageHeight: 1043,
  },
  {
    image: "/technology/lab3.webp",
    title: "UTS (Ultimate Tensile Strength)",
    imageClassName: "h-[75%] lg:w-[90%] object-cover rounded-xl",
    imageWidth: 750,
    imageHeight: 1134,
  },
]

export default function TechnologyLaboratorySection() {
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      className="relative z-0 mt-8 flex flex-col items-center justify-start bg-[#F2F2F2] px-10 pt-8 pb-20 lg:mt-12"
    >
      <div className="animate-reveal pt-6 sm:pt-8 lg:pt-12 lg:mt-12">
        <Badgetextblack title="UCR Laboratory" />
      </div>

      <h2 className="animate-reveal mt-4 text-center font-medium text-[32px] leading-[48px] tracking-[-1.4px] text-black lg:mt-5 lg:mt-6 lg:text-[52px] lg:leading-[72px]">
        Equipment used in the testing process
      </h2>

      <SequentialSlideIn
        scrollTriggerRef={sectionRef}
        className="flex w-full flex-wrap justify-center gap-6 py-8"
        getItemClassName={(index) =>
          [
            "flex w-full flex-col gap-2 transition-all duration-500 ease-out sm:w-[48%] lg:w-[32%]",
            index === 1 ? "mt-6 sm:mt-8" : "",
            index === 2 ? "mt-8 sm:mt-16" : "",
          ]
            .filter(Boolean)
            .join(" ")
        }
        start="top 88%"
        end="top 52%"
        stagger={0.18}
        direction="bottom"
      >
        {LAB_EQUIPMENT.map((item) => (
          <Fragment key={item.title}>
            <Image
              src={item.image}
              alt={item.title}
              width={item.imageWidth ?? 480}
              height={item.imageHeight ?? 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 32vw"
              quality={75}
              className={item.imageClassName}
            />
            <div className="relative mt-5 flex flex-col">
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#FF6A00] shadow-sm" />
              <h3 className="ml-2 pl-4 text-xl text-gray-500 lg:text-2xl">{item.title}</h3>
            </div>
          </Fragment>
        ))}
      </SequentialSlideIn>
    </section>
  )
}
