import { Badge } from "../../common/badge"
import Hero from "@/components/shared/Hero"
import QuoteSection from "@/components/shared/QuoteSection"
import Image from "next/image"
import SuccessStrengthSection from "../../components/team/SuccessStrengthSection"
import TeamMemoriesSection from "../../components/team/TeamMemoriesSection"
import TeamCards from "../../components/team/TeamCards"
import ParallaxSection from "../../animations/ParallaxSection"
import SlideIn from "../../animations/SlideIn"


export default function Team() {

    return (
        <div >
            <Hero
                badge="Our Team "
                title={
                    <>
                        Meet the people behind the power of
                        <br />
                        copper
                    </>
                }
                titleClassName="!normal-case px-[5vw] w-full max-w-[92vw] sm:max-w-[78vw] lg:max-w-[68vw] !text-[clamp(1.75rem,calc(1.1rem+2.8vw),3.25rem)] !leading-[1.15] !tracking-[-0.04em] sm:!leading-[1.12]"
                titleDirectFade
                titleInH1={false}
                className="flex flex-col items-center justify-start pt-[clamp(5.5rem,14vh,9rem)] pb-[clamp(11rem,38vh,22rem)]"
                minHeightClass="h-[clamp(34rem,100svh,56rem)]"
                maxHeightClass="max-h-none"
                gapClass="gap-[clamp(0.75rem,1.8vh,1.25rem)]"
                contentClassName="relative z-20"
            >
                <Image
                    src="/shared/whitegradient.png"
                    alt=""
                    width={1200}
                    height={900}
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-1/2 hidden w-full -translate-x-1/2 rotate-180 object-cover opacity-90 lg:block h-[clamp(14rem,42vh,26rem)]"
                />
                <Image
                    src="/shared/vector.png"
                    alt=""
                    width={1200}
                    height={900}
                    aria-hidden
                    className="pointer-events-none absolute bottom-[clamp(2rem,8vh,5rem)] left-1/2 w-[clamp(10rem,32vw,22rem)] -translate-x-1/2 rotate-180 object-contain opacity-60"
                />
                <Image
                    src="/team/teamhero.png"
                    alt="Team Image"
                    width={1920}
                    height={1080}
                    priority
                    sizes="(max-width: 768px) 100vw, 90vw"
                    className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-auto w-[min(100%,92vw)] max-h-[clamp(12rem,42vh,24rem)] -translate-x-1/2 object-contain object-bottom select-none"
                />
            </Hero>

            <div>
            </div>


            <div className="relative w-full overflow-x-hidden bg-[#F5F5F5]">

                <Image src="/shared/gradientcircle.png" alt="Wave Image" width={1920} height={1080} className="w-[40%] absolute  top-80  right-0 opacity-70 z-0" />
                <ParallaxSection index={0}>
                    <div className="relative z-10">
                        <SuccessStrengthSection />
                    </div>

                    {/* our people */}
                    <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 lg:px-10">
                        {/* Header */}
                        <div className="flex py-12 flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-28 mb-12 lg:mb-16">
                            <SlideIn direction="left" duration={0.8} scrollTrigger={true} className="flex-1">
                                <Badge title="Core Strength" />
                                <h1 className="text-4xl lg:text-5xl font-semibold text-black mt-4 lg:mt-6 leading-tight lg:leading-snug">Our people</h1>
                            </SlideIn>
                            <SlideIn direction="right" duration={0.8} scrollTrigger={true} className="flex-1 lg:w-1/2 text-xs lg:text-sm text-gray-600 lg:pt-12">
                                <p className="w-full text-xl">Our team represents decades of industrial mastery and modern innovation. Each member contributes deep technical knowledge, precision, and a shared commitment to sustainable growth. </p>
                            </SlideIn>
                        </div>

                        {/* Team Members Grid */}
                        <TeamCards />
                    </div>

                </ParallaxSection>

            </div>

            <ParallaxSection index={1}>
                <TeamMemoriesSection />
            </ParallaxSection>

            <QuoteSection />
        </div>
    )
}
