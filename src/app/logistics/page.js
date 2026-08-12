'use client'

import { VideoPlayer } from "../../common/video";
import { Badge, Badgetextwhite } from "../../common/badge";
import Image from "next/image";
import CardAnimation from "../../animations/CardAnimation";
import LogisticsAdvantageSection from "../../components/logistics/LogisticsAdvantageSection";
import CountUp from "../../animations/countup";
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";

export default function Logistics() {
    return (
        <div className="bg-[#F5F5F5]">

            {/* header */}
            <div className=" mb-[50%] lg:mb-[30%] bg-[url('/logisticsbg.png')]  bg-cover  bg-bottom bg-no-repeat relative   min-h-[55vh] sm:min-h-[80vh]     flex flex-col items-center justify-center gap-2">

                <SlideIn direction="bottom" duration={0.8} delay={0}>
                    <Badgetextwhite title="Our Logistics" />
                </SlideIn>

                <FadeIn className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white lg:w-[65%] px-5" duration={0.4} delay={0}>
                    UCR has a higher delivery capacity in the Copper Industry
                </FadeIn>
                <div className='absolute -bottom-[40%] lg:-bottom-[70%] h-60 sm:h-[70vh] w-[95%] ' >
                    <VideoPlayer src="/logisticsvid.mp4" className="w-full h-full object-cover rounded-3xl" />
                </div>



            </div>


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
                </div>


                <div className=" px-6 lg:px-10 py-8 lg:py-10 flex flex-col lg:flex-row justify-center gap-6 items-end">

                    <CardAnimation index={0} className="overflow-y-hidden min-h-[55vh] lg:min-h-[65vh]  lg:rounded-t-2xl rounded-2xl w-full lg:w-1/3 bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={20} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10 pb-6 ">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Years Experience
                            </h1>
                            <p className=" lg:w-60 pr-0 lg:pr-4">Produces 20,000 metric tons of copper per year.</p>

                        </div>

                        <Image src="/logistics1.png" alt="Expertise Icon" width={290} height={80} className='w-full  absolute -bottom-8 right-0 z-0 rounded-b-2xl lg:rounded-none' />

                    </CardAnimation>

                    <CardAnimation index={1} className="min-h-[55vh] lg:min-h-[60vh] lg:rounded-t-2xl rounded-2xl w-full lg:w-1/3 bg-white px-6 lg:px-8 pt-8 overflow-x-hidden lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={99} duration={2.5} />%</span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Delivery Speed
                            </h1>
                            <p className="w-45 lg:w-55">Timely delivery is crucial for customer satisfaction. We strive to ensure that all orders arrive right on schedule.</p>

                        </div>

                        <Image src="/logistics2.png" alt="Expertise Icon" width={180} height={80} className='w-60 lg:w-90 absolute -bottom-0 -right-5 lg:right-0 z-0 rounded-b-2xl lg:rounded-none' />

                    </CardAnimation>

                    <CardAnimation index={2} className="min-h-[55vh] lg:min-h-[55vh] lg:rounded-t-2xl rounded-2xl w-full lg:w-1/3 bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={30} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Global Sales
                            </h1>
                            <p className=" w-[70%] lg:w-80 pr-0 lg:pr-4">We supplies products, services and solutions across over 50 countries in Australia, Asia, Africa, and the Middle East.</p>

                        </div>

                        <Image src="/exp3.png" alt="Expertise Icon" width={300} height={80} className='w-90 absolute -bottom-0 right-0 z-0 rounded-b-2xl lg:rounded-none' />

                    </CardAnimation>



                </div>




                <div className=" px-6 lg:px-10 py-8 lg:py-10 flex flex-col-reverse lg:flex-row-reverse justify-center gap-6 items-end">

                    <CardAnimation index={0} className="overflow-y-hidden min-h-[55vh] lg:min-h-[65vh]  lg:rounded-t-2xl rounded-2xl w-full lg:w-1/3 bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={20} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10 pb-6 ">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Years Experience
                            </h1>
                            <p className=" lg:w-60 pr-0 lg:pr-4">Produces 20,000 metric tons of copper per year.</p>

                        </div>

                        <Image src="/logistics1.png" alt="Expertise Icon" width={290} height={80} className='w-full  absolute -bottom-8 right-0 z-0 rounded-b-2xl lg:rounded-none' />

                    </CardAnimation>

                    <CardAnimation index={1} className="min-h-[55vh] lg:min-h-[60vh] lg:rounded-t-2xl rounded-2xl w-full lg:w-1/3 bg-white px-6 lg:px-8 pt-8 overflow-x-hidden lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={99} duration={2.5} />%</span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Delivery Speed
                            </h1>
                            <p className="w-45 lg:w-55">Timely delivery is crucial for customer satisfaction. We strive to ensure that all orders arrive right on schedule.</p>

                        </div>

                        <Image src="/logistics2.png" alt="Expertise Icon" width={180} height={80} className='w-60 lg:w-90 absolute -bottom-0 -right-5 lg:right-0 z-0 rounded-b-2xl lg:rounded-none' />

                    </CardAnimation>

                    <CardAnimation index={2} className="min-h-[55vh] lg:min-h-[55vh] lg:rounded-t-2xl rounded-2xl w-full lg:w-1/3 bg-white px-6 lg:px-8 pt-8 lg:pt-16 relative flex flex-col gap-8 h-[50vh] lg:h-[55vh] group transition-all duration-400">
                        <h1 className="text-[73.03px] leading-[60.05px] tracking-[-1.2px] lg:text-[84px] lg:leading-[69.07px] lg:tracking-[-1.38px] font-medium text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                            <span><CountUp to={50} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " />
                        </h1>


                        <div className="relative z-10">
                            <h1 className="font-[Helvetica_Now_Display] font-medium align-middle text-[22.6px] leading-[24.34px] tracking-[-1.3px] mb-2 lg:text-[26px] lg:leading-[28px] lg:tracking-[-1.5px]">
                                Global Sales
                            </h1>
                            <p className=" w-[70%] lg:w-80 pr-0 lg:pr-4">We supplies products, services and solutions across over 50 countries in Australia, Asia, Africa, and the Middle East.</p>

                        </div>

                        <Image src="/exp3.png" alt="Expertise Icon" width={300} height={80} className='w-90 absolute -bottom-0 right-0 z-0 rounded-b-2xl lg:rounded-none' />

                    </CardAnimation>





                </div>
            </div>



            <div className=" overflow-x-hidden min-h-[80vh] lg:min-h-screen bg-white  pt-20 flex flex-col  justify-end ">

                {/* Header */}
                <div className="flex px-5 lg:px-10 flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-18 lg:gap-12 mb-12 lg:mb-16 lg:mb-20">

                    <SlideIn direction="left" scrollTrigger={true} duration={0.8} className="flex-1">
                        <h1 className='text-lg  lg:text-2xl text-primary'>Global Presence</h1>
                        <h1 className="text-3xl lg:text-4xl lg:text-5xl font-semibold text-black mt-4 lg:mt-5 lg:mt-6 leading-tight lg:leading-snug">Global Reach</h1>
                    </SlideIn>
                    <div className="lg:w-[30%]">

                        <SlideIn direction="right" scrollTrigger={true} duration={0.8} className=" flex-1  text-xs lg:text-2xl text-gray-600 lg:pt-8 lg:pt-12">
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
