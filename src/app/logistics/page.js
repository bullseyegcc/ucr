'use client'

import { VideoPlayer } from "../../common/video";
import { Badge } from "../../common/badge";
import Hero from "@/components/shared/Hero";
import Image from "next/image";
import SequentialSlideIn from "../../animations/SequentialSlideIn";
import LogisticsAdvantageSection from "../../components/logistics/LogisticsAdvantageSection";
import CountUp from "../../animations/countup";
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";

export default function Logistics() {
    return (
        <div className="bg-[#F5F5F5]">


            <Hero
                badge="Our Logistics"
                title="UCR has a higher delivery capacity in the Copper Industry"
                titleClassName="lg:w-[65%] px-5"
                titleDirectFade
                titleInH1={false}
                className="mb-[50%] lg:mb-[30%] flex flex-col items-center justify-center"
                minHeightClass="min-h-[55vh] sm:min-h-[80vh]"
                gapClass="gap-2"
                background={{
                    type: "image",
                    src: "/logisticsbg.png",
                    imageClassName: "bg-bottom bg-center",
                }}
                media={{
                    type: "image",
                    src: "/logisticspic.png",
                    alt: "UCR logistics operations",
                }}
            />

            {/* What we're Capable of */}

            <div className="bg-[#F5F5F5]">
                {/* header */}
                <div className="flex flex-col items-center justify-center text-center py-10 pb-20 ">
                    <SlideIn direction="bottom" scrollTrigger={true} duration={0.8} className="mb-4 lg:mb-6">
                        <Badge title="Strength" />
                    </SlideIn>
                    <FadeIn className="font-medium text-3xl lg:text-6xl mt-4" duration={0.8} scrollTrigger={true}>
                        <h1>What we're capable of</h1>
                    </FadeIn>
                    <FadeIn className="mt-4 lg:mt-6 max-w-xl px-6" duration={0.8} delay={0.15} scrollTrigger={true}>
                        <p className="text-base lg:text-xl leading-relaxed text-[#212225]/70">
                            A resilient responsible supply chain built to ensure continuity, reliability, and responsive delivery across global markets.
                        </p>
                    </FadeIn>
                </div>


                <SequentialSlideIn
                    className=" px-6 lg:px-10 py-8 lg:py-10 flex flex-col lg:flex-row justify-center gap-6 items-end"
                    itemClassName="w-full lg:w-1/3"
                    start="top 85%"
                    end="bottom 70%"
                >

                    <div className="overflow-hidden min-h-[55vh] lg:min-h-[65vh] rounded-2xl w-full bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={200} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10 pb-6 ">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Supply Chain partners Connected worldwide
                            </h1>
                            <p className="max-w-[80%]">Bringing together suppliers, logistics providers, and stakeholders through a unified global network.</p>

                        </div>

                        <Image src="/logistics1.svg" alt="Supply chain truck" width={437} height={336} className="pointer-events-none absolute bottom-0 left-0 z-0 w-[92%] h-auto max-w-none" />

                    </div>

                    <div className="overflow-hidden min-h-[55vh] lg:min-h-[60vh] rounded-2xl w-full bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[40px] leading-[42px] tracking-[-1.2px] lg:text-[58px] lg:leading-[58px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={400} duration={2.5} />K+ <sub className="text-[0.38em] leading-none">K-MT</sub></span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                handling yearly cargo
                            </h1>
                            <p className="max-w-[70%]">18K + Containers and land shipments annually managed with precision, efficiency, and operational excellence.</p>

                        </div>

                        <Image src="/logistics2.svg" alt="Yearly cargo container" width={257} height={446} className="pointer-events-none absolute -bottom-16 right-0 z-0 w-[68%] lg:w-[72%] h-auto max-w-none" />

                    </div>

                    <div className="overflow-hidden min-h-[55vh] lg:min-h-[55vh] rounded-2xl w-full bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={60} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Global logistic partners
                            </h1>
                            <p className="max-w-[70%]">Trusted network of industry-leading logistics partners enables reliable, responsive, and seamless delivery across key international markets.</p>

                        </div>

                        <Image src="/logistics3.svg" alt="Global logistics ship" width={249} height={172} className="pointer-events-none absolute -bottom-2 -right-9 z-0 w-[58%] lg:w-[62%] h-auto max-w-none" />

                    </div>



                </SequentialSlideIn>




                <SequentialSlideIn
                    className=" px-6 lg:px-10 py-8 lg:py-10 flex flex-col-reverse lg:flex-row-reverse justify-center gap-6 items-end"
                    itemClassName="w-full lg:w-1/3"
                    start="top 85%"
                    end="bottom 70%"
                >

                    <div className="overflow-hidden min-h-[55vh] lg:min-h-[65vh] rounded-2xl w-full bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[40px] leading-[42px] tracking-[-1.2px] lg:text-[58px] lg:leading-[58px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={40} duration={2} /> <sub className="text-[0.38em] leading-none">K-MT</sub></span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10 pb-6 ">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Warehousing Management Capacity
                            </h1>
                            <p className="max-w-[80%]">Extensive storage infrastructure and equipment supporting operational agility and supply chain efficiency.</p>

                        </div>

                        <Image src="/logistics6.svg" alt="Warehousing facility" width={333} height={343} className="pointer-events-none absolute bottom-0 right-0 z-0 w-[72%] h-auto max-w-none" />

                    </div>

                    <div className="overflow-hidden min-h-[55vh] lg:min-h-[60vh] rounded-2xl w-full bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={24} duration={2.5} /> hrs</span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Port & Customs Processing
                            </h1>
                            <p className="max-w-[65%]">Leveraging the UAE's world-class port infrastructure and efficient customs clearance to support reliable inbound and outbound cargo movement.</p>

                        </div>

                        <Image src="/logistics5.svg" alt="Port and customs container" width={320} height={329} className="pointer-events-none absolute bottom-0 right-0 z-0 w-[70%] h-auto max-w-none" />

                    </div>

                    <div className="overflow-hidden min-h-[55vh] lg:min-h-[55vh] rounded-2xl w-full bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={50} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Global Destinations
                            </h1>
                            <p className="max-w-[80%]">Connecting partners across 50+ countries through a well-established international logistics network.</p>

                        </div>

                        <Image src="/exp3.png" alt="Global destinations globe" width={300} height={80} className="pointer-events-none absolute bottom-0 right-0 z-0 w-[82%] h-auto max-w-none" />

                    </div>



                </SequentialSlideIn>
            </div>



            <div className=" overflow-x-hidden min-h-[80vh] lg:min-h-screen bg-white  pt-20 flex flex-col  justify-end ">

                {/* Header */}
                <div className="flex px-5 lg:px-10 flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-18 lg:gap-12 mb-12 lg:mb-16 lg:mb-20">

                    <SlideIn direction="left" scrollTrigger={true} duration={0.8} className="flex-1">
                        <h1 className='text-lg  lg:text-2xl text-primary'>Global Presence</h1>
                        <h1 className="text-3xl lg:text-4xl lg:text-5xl font-semibold text-black mt-4 lg:mt-5 lg:mt-6 leading-tight lg:leading-snug">Global Reach</h1>
                    </SlideIn>
                    <div className="lg:w-[30%]">

                        <SlideIn direction="right" scrollTrigger={true} duration={0.8} className=" flex-1  max-w-lg text-xs lg:text-2xl text-gray-600 lg:pt-8 lg:pt-12">
                            <p className='  text-lg lg:text-2xl self-start'>Union Copper Rod products are famous all over the region and they are in high demand amongst many organizations that procure copper related products.</p>
                        </SlideIn>
                    </div>
                </div>

                <div className="w-full h-[60vh] lg:h-screen relative z-50">

                    <VideoPlayer src="/globalpresence.mp4" className="w-full h-full object-cover" />

                </div>
            </div>

            {/* logistics advantage */}
            <LogisticsAdvantageSection />

        </div>

    )
}

