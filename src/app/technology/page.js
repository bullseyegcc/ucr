'use client'

import Image from "next/image"
import { useRef } from "react"
import { Badgetextblack } from "../../common/badge"
import Hero from "@/components/shared/Hero"
import ParallaxSection from "../../animations/ParallaxSection"
import CardAnimation from "../../animations/CardAnimation"
import { useCardStack } from "../../animations/useCardStack"
import TechnologyLaboratorySection from "../../components/technology/TechnologyLaboratorySection"

const TECH_CARDS = [
    {
        id: "southwire",
        title: "South Wire Technology",
        number: "01",
        total: "03",
        variant: "light",
        image: "/southwire.png",
        paragraphs: [
            "UCR firmly believes that the primary advantage of any advanced technology lies in its ability to seamlessly enhance operational efficiency, ultimately leading to increased productivity. This boost not only empowers employees but also improves the quality and quantity of products produced.",
            "As the largest facility of its kind in the Middle East, UCR boasts an impressive rod production capacity of over 200,000 metric tons annually. To manufacture its top-tier copper rods, UCR employs the state-of-the-art Southwire Continuous Rod Casting Technology from the United States, ensuring outstanding quality and performance.",
        ],
    },
    {
        id: "copper-treatments",
        title: "Copper treatments",
        number: "02",
        total: "03",
        variant: "dark",
        image: "/coppertreatment.png",
        textWidth: "lg:w-[60%]",
        imageWidth: "lg:w-[40%]",
        paragraphs: [
            "UCR firmly believes that the primary advantage of any advanced technology lies in its ability to seamlessly enhance operational efficiency, ultimately leading to increased productivity. This boost not only empowers employees but also improves the quality and quantity of products produced.",
            "As the largest facility of its kind in the Middle East, UCR boasts an impressive rod production capacity of over 200,000 metric tons annually. To manufacture its top-tier copper rods, UCR employs the state-of-the-art Southwire Continuous Rod Casting Technology from the United States, ensuring outstanding quality and performance.",
        ],
    },
    {
        id: "nexgen-sol",
        title: "NexGen Sol",
        number: "03",
        total: "03",
        variant: "light",
        uppercase: false,
        image: "/nextgensol.png",
        paragraphs: [
            "UCR firmly believes that the primary advantage of any advanced technology lies in its ability to seamlessly enhance operational efficiency, ultimately leading to increased productivity. This boost not only empowers employees but also improves the quality and quantity of products produced.",
            "As the largest facility of its kind in the Middle East, UCR boasts an impressive rod production capacity of over 200,000 metric tons annually. To manufacture its top-tier copper rods, UCR employs the state-of-the-art Southwire Continuous Rod Casting Technology from the United States, ensuring outstanding quality and performance.",
        ],
    },
]

function TechnologyCard({ card }) {
    const isDark = card.variant === "dark"
    const titleClass = isDark
        ? "text-white font-medium uppercase text-[22px] leading-[30px] tracking-[-1.4px] sm:text-[28px] sm:leading-[38px] lg:text-[40px] lg:leading-[52px]"
        : `text-primary font-medium ${card.uppercase !== false ? "uppercase" : ""} text-[22px] leading-[30px] tracking-[-1.4px] sm:text-[28px] sm:leading-[38px] lg:text-[40px] lg:leading-[52px]`

    return (
        <div
            className={[
                "tech-stack-card relative origin-top mx-4 flex min-h-[calc(100svh-4.5rem)] w-[calc(100%-2rem)] flex-col rounded-xl px-6 will-change-transform sm:mx-8 sm:w-[calc(100%-4rem)] sm:px-8 lg:mx-10 lg:w-[calc(100%-5rem)] lg:min-h-[calc(100svh-5rem)] lg:px-10",
                isDark ? "text-white bg-[#272A2A]" : "bg-white",
            ].join(" ")}
        >
            <div className="flex shrink-0 flex-col gap-3 border-b border-secondary/40 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-8 lg:py-10">
                <h2 className={titleClass}>{card.title}</h2>
                <p className="text-primary whitespace-nowrap text-lg font-semibold leading-tight sm:text-xl lg:text-3xl">
                    {card.number}/<span className="text-secondary">{card.total}</span>
                </p>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-6 py-6 sm:gap-7 sm:py-7 lg:flex-row lg:items-stretch lg:gap-10 lg:py-8">
                <div className={`flex w-full flex-col justify-center gap-5 sm:gap-6 ${card.textWidth || "lg:w-1/2"}`}>
                    {card.paragraphs.map((paragraph) => (
                        <p
                            key={paragraph.slice(0, 24)}
                            className="font-normal text-[15px] leading-[26px] tracking-[-0.45px] sm:text-[17px] sm:leading-[30px] lg:text-[20px] lg:leading-[34px]"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className={`w-full shrink-0 ${card.imageWidth || "lg:w-1/2"}`}>
                    <div className="relative h-[clamp(220px,34vh,360px)] w-full overflow-hidden rounded-lg lg:h-full lg:min-h-[360px] lg:max-h-[480px]">
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover lg:rounded-r-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Technology() {
    const stackRef = useRef(null)

    useCardStack(stackRef, {
        cardSelector: ".tech-stack-card",
        endSelector: ".tech-stack-end",
        start: "top 10%",
        fadeStart: "top 75%",
    })

    return (
        <div className="bg-[#F2F2F2]">
            <Hero
                badge="Technlogy"
                title="Our Advance Technology"
                titleClassName="w-full px-4"
                titleDirectFade
                titleInH1={false}
                contentLayout="absolute"
                contentPositionClass="absolute top-[35%] lg:top-[40%] z-20 font-medium"
                gapClass="gap-5"
                className="flex justify-center bg-black dark:bg-black font-medium"
                background={{
                    type: "video",
                    src: "/technologybg.mp4",
                    priority: true,
                    overlayClassName:
                        "bg-[linear-gradient(0deg,rgba(0,0,0,0.35)0%,rgba(0,0,0,0.35)100%)]",
                }}
            />

            <ParallaxSection index={0}>
                <CardAnimation index={0}>
                    <div className="overflow-x-hidden relative flex flex-col px-6 sm:px-8 py-12 lg:py-20 lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-8 lg:gap-12 mb-12 lg:mb-16 lg:mb-20">
                        <div className="lg:w-[40%] sm:mb-30">
                            <Badgetextblack title="Top notch Technology" />
                            <h1 className="font-medium text-[32px] leading-[48px] tracking-[-0.7px] align-bottom capitalize mt-4 lg:mt-5 lg:mt-6 lg:text-[52px] lg:leading-[72px] lg:tracking-[-1.4px]">
                                Precision Crafted Copper Excellence
                            </h1>
                        </div>
                        <div className="lg:w-[35%] flex lg:justify-end text-xs text-gray-600 lg:pt-8 lg:pt-12">
                            <p className="font-normal text-[16px] leading-[30px] tracking-[-0.45px] lg:text-[22px] lg:leading-[40px]">
                                Cutting-edge technology meets traditional craftsmanship. Discover how we&apos;re reshaping the future of copper manufacturing.
                            </p>
                        </div>
                        <Image src="/technologyheaderbottom.png" alt="Icon" width={900} height={0} className="w-full absolute bottom-0" />
                    </div>
                </CardAnimation>
            </ParallaxSection>

            <div ref={stackRef} className="relative mt-4 sm:mt-6 lg:mt-8">
                <div className="flex flex-col">
                    {TECH_CARDS.map((card, index) => (
                        <div key={card.id}>
                            <TechnologyCard card={card} />
                            {index < TECH_CARDS.length - 1 ? (
                                <div className="h-[45svh] min-h-56 sm:h-[55svh]" aria-hidden />
                            ) : null}
                        </div>
                    ))}
                </div>

                <div className="tech-stack-end min-h-[70svh] sm:min-h-[540px]" aria-hidden />
            </div>

            <TechnologyLaboratorySection />
        </div>
    )
}
