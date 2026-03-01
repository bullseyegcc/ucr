import Image from "next/image"
import { Badgetextblack, Badgetextwhite, Badge } from "../../common/badge"
import ParallaxSection from "../../animations/ParallaxSection"
import TextReveal from "../../animations/TextReveal"
import CardAnimation from "../../animations/CardAnimation"
import FadeIn from "../../animations/FadeIn"
import SlideIn from "../../animations/SlideIn"

export default function Quality() {
    return (
        <div>

            {/* header */}
            <div className="relative rounded-b-xl flex flex-col text-center min-h-[60vh] sm:min-h-[60vh] lg:min-h-[80vh] items-center justify-center font-sans dark:bg-black gap-6 px-6" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/qualitybg.png') lightgray 50% / cover no-repeat" }}>
                <SlideIn direction="bottom" duration={0.8} delay={0}>
                    <Badgetextwhite title="Premium Quality Assured" />
                </SlideIn>
                <FadeIn className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white w-full sm:w-[90%] lg:w-[80%] px-10 lg:px-0" duration={0.4} delay={0}>
                    Quality is our foundation
                </FadeIn>

                <Image src='/ribbin.png' alt="Icon" width={300} height={0} className="w-50 lg:w-60 absolute -right-[12%] lg:right-[6%] bottom-[12%] lg:bottom-[10%]" />
            </div>


            {/* certifications */}

            <ParallaxSection index={0}>
                <div className="relative lg:min-h-screen bg-[rgba(255,255,255,0.77)]">

                    {/* header */}
                    <SlideIn direction="top" scrollTrigger={true} duration={0.6} className="flex flex-col gap-4 sm:gap-5 items-center justify-center text-center py-12 sm:py-16 lg:py-20 px-6">
                        <p className="text-base sm:text-lg lg:text-xl text-primary font-medium">Certified Excellence. Trusted Worldwide.</p>
                        <h1 className="font-medium text-[32px] leading-[48px] tracking-[-1.4px] text-center capitalize mt-3 sm:mt-4 lg:text-[52px] lg:leading-[52px]">Our Key Certifications</h1>
                        <p className="w-full sm:w-[70%] lg:w-[60%] font-normal text-[16px] leading-[28px] tracking-[-0.45px] text-center lg:text-[18px] lg:leading-[36px]"> Our certifications stand as proof of our unwavering dedication to quality, safety, and sustainability. Each ISO achievement reflects the precision and responsibility that define every stage of our copper production.</p>
                    </SlideIn>


                    <div className="w-full sm:w-[80%] lg:w-[65%] flex items-center justify-center mx-auto px-6 sm:px-0">

                        <Image src='/gradientcircle.png' alt="Icon" width={400} height={0} className="w-full object-cover hidden lg:block postion absolute overflow-hidden left-0 top-0" />

                        <CardAnimation index={0} className="w-full">
                            <Image src="/certificate.png" alt="Icon" width={900} height={0} className="w-full object-cover" />
                        </CardAnimation>
                    </div>

                </div>
            </ParallaxSection>
            {/* Achivements */}

            <ParallaxSection index={1}>
                <div className="relative z-20 flex min-h-screen lg:min-h-[80vh] flex-col gap-10 sm:gap-12 lg:gap-16 items-center justify-center py-12 sm:py-16 lg:py-20   bg-[#FFF8F4] sm:px-6">

                    <div className="flex flex-col items-center text-center">
                        <SlideIn direction="bottom" scrollTrigger={true} className="mb-3 lg:mb-5" duration={0.8}>
                            <Badgetextblack title="More certifications" />
                        </SlideIn>
                        <FadeIn scrollTrigger={true} duration={0.8} className="px-9 font-medium text-[32px] leading-[52px] tracking-[-1.4px] text-center capitalize mt-3 sm:mt-4 lg:text-[52px] lg:leading-[52px] lg:tracking-[-1.4px] lg:mt-5 lg:mt-6">
                            <h1>We've also achieved so far</h1>
                        </FadeIn>

                    </div>

                    {/* cards */}
                    <div className="relative lg:px-6 sm:px-8 lg:px-10 pb-12 sm:pb-16 lg:pb-20 flex flex-wrap lg:gap-4 sm:gap-6 py-6 sm:py-8 lg:justify-center pt-6 sm:pt-9">

                        {/* card 1 */}
                        <CardAnimation index={0} className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[32%]">

                            <Image src="/q1.png" alt="Icon" width={480} height={0} className="object-cover rounded-xl" />

                        </CardAnimation>

                        {/* card 2 */}
                        <CardAnimation index={1} className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[32%] mt-4 sm:mt-0">

                            <Image src="/q2.png" alt="Icon" width={480} height={0} className="object-cover rounded-xl" />

                        </CardAnimation>

                        {/* card 3   */}
                        <CardAnimation index={2} className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[32%] mt-4 sm:mt-0">

                            <Image src="/q3.png" alt="Icon" width={400} height={0} className="object-cover rounded-xl" />

                        </CardAnimation>

                        <Image src="/orangebottom.png" alt="Icon" width={900} height={0} className="w-full absolute bottom-0" />


                    </div>



                </div>
            </ParallaxSection>

            <ParallaxSection index={2}>
                <div className="min-h-[60vh] lg:min-h-[80vh] rounded-t-lg bg-[linear-gradient(174deg,#FA6E43_-22.99%,#FFF_94.94%)] flex flex-col items-center justify-center gap-4 lg:gap-6 px-6 text-center py-12 lg:py-20">

                    <div className="flex flex-col w-full lg:w-[80%]">

                        <Image src="/quote.png" alt="Icon" width={40} height={0} className="w-8 lg:w-[70px]" />
                        <TextReveal className="relative">
                            <p className="pl-3 lg:pl-5 text-[24px] leading-[48px] italic tracking-[0px] text-center align-middle lg:text-[32px] lg:leading-[48px]">At UCR, we are grounded in vision, trust, and a commitment to excellence. We believe success is measured not just by financial gains but by the positive impact we have on our communities and future generations.We have broadened our investments across various sectors with a clear strategy. As global markets change, we remain focused on responsible growth, continuous innovation, and delivering lasting value.</p>
                            <Image src="/quote.png" alt="Icon" width={40} height={0} className="hidden lg:block absolute right-80  lg:w-[70px]" />

                        </TextReveal>
                        <Image src="/quote.png" alt="Icon" width={40} height={0} className="lg:hidden self-end w-8" />

                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 lg:gap-4">
                        <Image src='/diamsign.png' alt="Icon" width={150} height={0} className="w-24 lg:w-[150px]" />
                        <h1 className="text-2xl lg:text-4xl font-medium">Diam O'Sullivan</h1>
                        <p className="text-base lg:text-2xl font-light">Honorable Chairman</p>
                    </div>

                </div>
            </ParallaxSection>
        </div>
    )
}
