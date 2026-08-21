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
                title="Meet the People Behind the Power of Copper"
                titleClassName="px-5 lg:max-w-[50%]"
                titleDirectFade
                titleInH1={false}
                className="flex items-center lg:pt-40 flex-col justify-center lg:justify-start"
                minHeightClass="min-h-[60vh] lg:min-h-[120vh]"
                gapClass="gap-6 lg:gap-8 lg:gap-10"
            >
                <Image src='/whitegradient.png' alt='Vector Image' width={1200} height={900} className=" hidden lg:block rotate-180  absolute -bottom-25 left-1/2 transform -translate-x-1/2  object-cover w-full" />
                <Image src='/vector.png' alt='Vector Image' width={1200} height={900} className="rotate-180 opacity-70 absolute bottom-0 left-1/2 transform -translate-x-1/2  object-contain w-1/3" />
                <Image src="/teamhero.png" alt="Team Image" width={1920} height={1080} className="w-full absolute -bottom-4 object-center lg:object-cover rounded-lg " />
            </Hero>

            <div>
            </div>


            <div className="relative w-full overflow-x-hidden bg-[#F5F5F5]">

                <Image src="/gradientcircle.png" alt="Wave Image" width={1920} height={1080} className="w-[40%] absolute  top-80  right-0 opacity-70 z-0" />                <ParallaxSection index={0}>                <div className="relative z-10">
                    <SuccessStrengthSection />
                </div>

                    {/* our people */}
                    <div className="px-5 lg:px-10 relative z-10 ">
                        {/* Header */}
                        <div className="flex py-12 flex-col  lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-28 mb-12 lg:mb-16">
                            <SlideIn direction="left" duration={0.8} scrollTrigger={true} className="flex-1">
                                <Badge title="Core Strength" />
                                <h1 className="text-4xl lg:text-5xl font-semibold text-black mt-4 lg:mt-6 leading-tight lg:leading-snug">Our people</h1>
                            </SlideIn>
                            <SlideIn direction="right" duration={0.8} scrollTrigger={true} className="flex-1 lg:w-1/2 text-xs lg:text-sm text-gray-600 lg:pt-12">
                                <p className="w-full text-xl">Our team represents decades of industrial mastery and modern innovation. Each member contributes deep technical knowledge, precision, and a shared commitment to sustainable growth. </p>
                            </SlideIn>
                        </div>


                        {/* Team Members Grid */}
                        {/* cards */}
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

