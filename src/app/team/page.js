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
                        copper
                    </>
                }
                titleClassName="!normal-case px-[clamp(1rem,4vw,1.25rem)] w-full max-w-[clamp(20rem,80vw,56rem)] mt-0 !text-[clamp(2rem,calc(1.15rem+3.5vw),4rem)] !leading-[clamp(2.5rem,calc(1.4rem+4vw),5rem)] !tracking-[clamp(-0.08rem,-0.2vw,-0.16rem)]"
                titleDirectFade
                titleInH1={false}
                className="flex flex-col items-center justify-start text-center pt-[clamp(5rem,14vh,6.5rem)] pb-[clamp(10rem,40%,14rem)] lg:justify-center lg:pt-0 lg:pb-[clamp(9rem,28vh,16rem)]"
                minHeightClass="h-[min(65vh,540px)] max-h-[65vh] lg:h-auto lg:min-h-[80vh] lg:max-h-none"
                maxHeightClass="max-h-[65vh] lg:max-h-[900px]"
                gapClass="gap-2"
                contentClassName="relative z-20"
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
                    className="pointer-events-none absolute bottom-0 left-0 z-10 h-[46%] w-full object-cover object-[center_30%] select-none lg:left-1/2 lg:h-auto lg:w-[clamp(28rem,140vw,120rem)] lg:max-h-[clamp(16rem,70vh,48rem)] lg:-translate-x-1/2 lg:-bottom-[clamp(5rem,22vh,11rem)] lg:object-contain lg:object-bottom"
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
