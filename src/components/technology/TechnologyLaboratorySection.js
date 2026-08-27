'use client'

import Image from "next/image"
import { useRef } from "react"
import { Badgetextblack } from "../../common/badge"
import SequentialSlideIn from "../../animations/SequentialSlideIn"

const LAB_EQUIPMENT = [
  {
    image: "/technology/leco-oxygen.webp",
    title: "LECO Oxygen Analyzer",
    imageWidth: 960,
    imageHeight: 1051,
  },
  {
    image: "/technology/twist.webp",
    title: "Twist/Torsion Tester,",
    imageWidth: 960,
    imageHeight: 1043,
  },
  {
    image: "/technology/lab3.webp",
    title: "UTS (Ultimate Tensile Strength)",
    imageWidth: 750,
    imageHeight: 1134,
    imageClassName: "object-left",
  },
]

export default function TechnologyLaboratorySection() {
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      className="relative z-0 mt-2 flex flex-col items-center justify-start bg-[#F2F2F2] px-10 pt-4 pb-20 lg:mt-12 lg:pt-8"
    >
      <div className="animate-reveal pt-2 lg:mt-12 lg:pt-12">
        <Badgetextblack title="UCR Laboratory" />
      </div>

      <h2 className="animate-reveal mt-4 text-center font-medium text-[32px] leading-[48px] tracking-[-1.4px] text-black lg:mt-5 lg:mt-6 lg:text-[52px] lg:leading-[72px]">
        Equipment used in the testing process
      </h2>

      <SequentialSlideIn
        scrollTriggerRef={sectionRef}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        itemClassName="flex h-full w-full flex-col"
        start="top 90%"
        end="top 25%"
        stagger={0.28}
        duration={0.7}
        direction="bottom"
      >
        {LAB_EQUIPMENT.map((item) => (
          <article
            key={item.title}
            className="flex h-full w-full flex-col"
          >
            <div className="relative mx-auto h-[320px] w-full overflow-hidden rounded-xl bg-[#e8e8e8] sm:h-[300px] lg:h-[420px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 320px"
                quality={75}
                className={`object-cover ${item.imageClassName || "object-center"}`}
              />
            </div>
            <div className="relative mt-4 flex min-h-[3.25rem] items-start lg:min-h-[3.75rem]">
              <span aria-hidden="true" className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[#FF6A00] shadow-sm" />
              <h3 className="ml-2 pl-3 text-xl leading-snug text-gray-500 lg:text-2xl">{item.title}</h3>
            </div>
          </article>
        ))}
      </SequentialSlideIn>
    </section>
  )
}
