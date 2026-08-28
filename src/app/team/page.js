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
        <div className="overflow-x-hidden">
            <Hero
                badge="Our Team "
                title={
                    <>
                        Meet the people behind the power of
                        copper
                    </>
                }
                titleClassName="!normal-case px-[clamp(1rem,4vw,1.25rem)] w-full max-w-[clamp(20rem,80vw,56rem)] mt-0 !text-[clamp(1.75rem,calc(1rem+2.8vw),3.25rem)] !leading-[clamp(2.25rem,calc(1.2rem+3.2vw),4rem)] !tracking-[clamp(-0.06rem,-0.15vw,-0.12rem)]"
                titleDirectFade
                titleInH1={false}
                className="flex flex-col items-center justify-start text-center pt-[clamp(5rem,14vh,6.5rem)] pb-[clamp(6rem,28%,10rem)] lg:justify-center lg:pt-0 lg:pb-[clamp(9rem,28vh,16rem)]"
                minHeightClass="h-[55vh] lg:h-auto lg:min-h-[100vh] lg:max-h-none"
                maxHeightClass="max-h-[55vh] lg:max-h-[1200px]"
                gapClass="gap-2"
                contentClassName="relative z-20"
                overflowVisible
            >
              
                <Image
                    src="/shared/vector.png"
                    alt=""
                    width={1200}
                    height={900}
                    aria-hidden
                    className="pointer-events-none absolute bottom-[clamp(1.5rem,6vh,3.5rem)] left-1/2 w-[clamp(9rem,28vw,20rem)] -translate-x-1/2 rotate-180 object-contain opacity-60"
                />
                <Image
                    src="/team/bg.webp"
                    alt="Team Image"
                    width={1920}
                    height={1080}
                    priority
                    sizes="100vw"
                    quality={90}
                    className="pointer-events-none absolute bottom-0 left-0 z-10 h-[46%] w-full object-cover object-[center_30%] select-none lg:inset-x-0 lg:h-[80%] lg:w-full lg:max-h-none lg:translate-x-0 lg:-bottom-[clamp(4rem,10vh,8rem)] lg:object-cover lg:object-top"
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
                        <div className="mb-12 pt-12 lg:mb-16 lg:pt-16">
                            <SlideIn direction="left" duration={0.8} scrollTrigger={true}>
                                <Badge title="Core Strength" />
                            </SlideIn>
                            <div className="mt-3 flex flex-col gap-6 lg:mt-4 lg:flex-row lg:items-start lg:justify-between lg:gap-28">
                                <SlideIn direction="left" duration={0.8} scrollTrigger={true} className="shrink-0">
                                    <h1 className="font-primary font-light text-[2rem] leading-[1.15] tracking-[-0.03em] text-[#212225] lg:text-[3.25rem] lg:leading-[1.1] lg:tracking-[-0.06em]">
                                        Our people
                                    </h1>
                                </SlideIn>
                                <SlideIn direction="right" duration={0.8} scrollTrigger={true} className="w-full max-w-[34rem] lg:ml-auto">
                                    <p className="font-primary font-normal text-base leading-7 tracking-[-0.02em] text-[#6B6B6B] lg:text-xl lg:leading-[1.45]">
                                        Our team represents decades of industrial mastery and modern innovation. Each member contributes deep technical knowledge, precision, and a shared commitment to sustainable growth.
                                    </p>
                                </SlideIn>
                            </div>
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
