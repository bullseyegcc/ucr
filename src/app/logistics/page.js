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
            <div className=" mb-[40%] lg:mb-[30%] bg-[url('/logisticsbg.png')]  bg-cover  bg-bottom bg-no-repeat relative flex  min-h-[55vh] sm:min-h-[80vh] items-center pt-[30%] lg:pt-[15%] bg-black font-sans bg-primary flex flex-col items-center gap-10">

                <SlideIn direction="bottom" duration={0.8} delay={0}>
                    <Badgetextwhite title="Our Logistics" />
                </SlideIn>

                <FadeIn className=" w-[65%]  h-full text-center text-xl sm:text-5xl lg:font-bold text-white leading-tight" duration={0.4} delay={0}>
                    UCR has a higher delivery capacity in the Copper Industry
                </FadeIn>
                <div className='absolute -bottom-[50%] lg:-bottom-[65%] w-[75%] h-60 sm:h-[70vh] w-[95%] ' >
                    <VideoPlayer src="/logisticsvid.mp4" className="rounded-4xl " />
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

                    <CardAnimation index={0} className="min-h-[55vh] rounded-xl w-full lg:w-[30%] bg-white px-5 pt-8 lg:pt-16 relative flex flex-col gap-8 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                        <h1 className="text-6xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent"><span><CountUp to={200} duration={2} />k+</span> <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl lg:text-xl lg:text-3xl font-bold mb-2 ">MT/Anum</h1>
                            <p className="w-4/5 pr-4 text-sm lg:text-base">200,000 metric tons
                                copper production line that is the largest of its kind in the Middle East. </p>

                        </div>

                        <Image src="/anum.png" alt="Expertise Icon" width={290} height={80} className='w-full absolute -bottom-0 right-0 z-0' />

                    </CardAnimation>

                    <CardAnimation index={1} className="min-h-[55vh] lg:min-h-[50vh] rounded-xl w-full lg:w-[30%] bg-white px-5 pt-8 lg:pt-16 relative flex flex-col gap-8 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                        <h1 className="text-6xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent"><span><CountUp to={150} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl lg:text-3xl font-bold mb-2">Employees</h1>
                            <p className="w-[60%] lg:w-70 text-sm lg:text-base">With over 150 experienced employees, we deliver quality and reliability every day.</p>

                        </div>

                        <Image src="/employees.png" alt="Expertise Icon" width={330} height={80} className=' absolute -bottom-0 right-0 z-0' />

                    </CardAnimation>

                    <CardAnimation index={2} className="min-h-[55vh] lg:min-h-[45vh] rounded-xl w-full lg:w-[30%] bg-white px-5 pt-8 lg:pt-16 relative flex flex-col gap-8 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                        <h1 className="text-6xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent"><span><CountUp to={30} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl lg:text-3xl font-bold mb-2">Global Sales</h1>
                            <p className=" w-4/5 lg:w-80 pr-4 text-sm lg:text-base">We supplies products, services and solutions across over 30 countries in Australia, Asia, Africa, and the Middle East  </p>

                        </div>

                        <Image src="/globalsales.png" alt="Expertise Icon" width={240} height={80} className=' absolute -bottom-0 right-0 z-0' />

                    </CardAnimation>



                </div>




                <div className=" px-6 lg:px-10 py-8 lg:py-10 flex flex-col lg:flex-row justify-center gap-6 items-end">

                    <CardAnimation index={3} className="min-h-[55vh] lg:min-h-[45vh] rounded-xl w-full lg:w-[30%] bg-white px-5 pt-8 lg:pt-16 relative flex flex-col gap-8 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                        <h1 className="text-6xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent"><span><CountUp to={200} duration={2} />k+</span> <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl lg:text-3xl font-bold mb-2 ">MT/Anum</h1>
                            <p className=" w-4/5 pr-4 text-sm lg:text-base">200,000 metric tons
                                copper production line that is the largest of its kind in the Middle East. </p>

                        </div>

                        <Image src="/anum.png" alt="Expertise Icon" width={290} height={80} className='w-full absolute -bottom-0 right-0 z-0' />

                    </CardAnimation>

                    <CardAnimation index={4} className="min-h-[55vh] lg:min-h-[50vh] rounded-xl w-full lg:w-[30%] bg-white px-5 pt-8 lg:pt-16 relative flex flex-col gap-8 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                        <h1 className="text-6xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent"><span><CountUp to={150} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl lg:text-3xl font-bold mb-2">Employees</h1>
                            <p className="w-1/2 lg:w-70 text-sm lg:text-base">With over 150 experienced employees, we deliver quality and reliability every day.</p>

                        </div>

                        <Image src="/employees.png" alt="Expertise Icon" width={330} height={80} className=' absolute -bottom-0 right-0 z-0' />

                    </CardAnimation>

                    <CardAnimation index={5} className="min-h-[55vh] lg:min-h-[55vh] rounded-xl w-full lg:w-[30%] bg-white px-5 pt-8 lg:pt-16 relative flex flex-col gap-8 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                        <h1 className="text-6xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent"><span><CountUp to={30} duration={2} />+</span> <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl lg:text-3xl font-bold mb-2">Global Sales</h1>
                            <p className=" w-4/5 lg:w-80 pr-4 text-sm lg:text-base">We supplies products, services and solutions across over 30 countries in Australia, Asia, Africa, and the Middle East  </p>

                        </div>

                        <Image src="/globalsales.png" alt="Expertise Icon" width={240} height={80} className=' absolute -bottom-0 right-0 z-0' />

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

                    <VideoPlayer src="/globalpresence.mp4" className="" />

                </div>
            </div>

            {/* logistics advantage */}
            <LogisticsAdvantageSection />

        </div>

    )
}
