import { Badgetextwhite, Badge } from "../../common/badge"
import Image from "next/image"
import SuccessStrengthSection from "../../components/team/SuccessStrengthSection"
import TeamMemoriesSection from "../../components/team/TeamMemoriesSection"
import TeamCards from "../../components/team/TeamCards"
import ParallaxSection from "../../animations/ParallaxSection"
import TextReveal from "../../animations/TextReveal"
import CardAnimation from "../../animations/CardAnimation"
import FadeIn from "../../animations/FadeIn"
import SlideIn from "../../animations/SlideIn"

export default function Team() {

    return (
        <div >
            <div className="relative flex min-h-[60vh] lg:min-h-[120vh] items-center  lg:pt-40 bg-black   bg-primary flex flex-col justify-center lg:justify-start gap-6 lg:gap-8 lg:gap-10 ">
                <SlideIn direction="bottom" duration={0.8} delay={0}>
                    <Badgetextwhite title="Our Team " />
                </SlideIn>
                <FadeIn className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle  text-white px-5 lg:max-w-[50%]" duration={0.4} delay={0}>
                    Meet the People Behind the Power of Copper
                </FadeIn>
                <Image src='/whitegradient.png' alt='Vector Image' width={1200} height={900} className=" hidden lg:block rotate-180  absolute -bottom-25 left-1/2 transform -translate-x-1/2  object-cover w-full" />

                <Image src='/vector.png' alt='Vector Image' width={1200} height={900} className="rotate-180 opacity-70 absolute bottom-0 left-1/2 transform -translate-x-1/2  object-contain w-1/3" />
                <Image src="/teamhero.png" alt="Team Image" width={1920} height={1080} className="w-full absolute -bottom-4 object-center lg:object-cover rounded-lg " />
            </div>

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
            {/* quote section  */}

            <div className="min-h-[60vh] lg:min-h-[80vh] rounded-t-lg bg-[url('/gradient-bg.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center gap-4 lg:gap-6 px-6 text-center py-12 lg:py-20">

                <div className="flex flex-col w-full lg:w-[80%]">

                    <Image src="/quote.png" alt="Icon" width={40} height={0} className="w-8 lg:w-[70px]" />
                    <TextReveal className="relative">
                        <p className="pl-3 lg:pl-5 text-[24px] leading-[48px] italic tracking-[0px] text-center align-middle lg:text-[32px] lg:leading-[48px]">At UCR, we are grounded in vision, trust, and a commitment to excellence. We believe success is measured not just by financial gains but by the positive impact we have on our communities and future generations.We have broadened our investments across various sectors with a clear strategy. As global markets change, we remain focused on responsible growth, continuous innovation, and delivering lasting <span className="relative">value.   <Image src="/quote.png" alt="Icon" width={40} height={0} className="self-end w-8 lg:w-[60px] absolute -right-8 lg:-right-20 lg:-right-6 -bottom-0" /></span></p>


                    </TextReveal>

                </div>

                <div className="flex flex-col justify-center items-center gap-2 lg:gap-4">
                    <Image src='/diamsign.png' alt="Icon" width={150} height={0} className="w-24 lg:w-[150px]" />
                    <h1 className="text-2xl lg:text-4xl font-medium">Diam O'Sullivan</h1>
                    <p className="text-base lg:text-2xl font-light">Honorable Chairman</p>
                </div>



            </div>

            <ParallaxSection index={1}>
                <TeamMemoriesSection />
            </ParallaxSection>
        </div>
    )
}
