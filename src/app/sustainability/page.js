'use client'

import { Badge, Badgetextwhite } from "../../common/badge"
import Image from "next/image"
import { VideoPlayer } from "../../common/video"
import ParallaxSection from "../../components/ParallaxSection"
import CardAnimation from "../../components/CardAnimation"

export default function sustainability() {
    return (
        <div>
            <div className="rouned-b-2xl flex flex-col text-center min-h-[60vh] lg:min-h-[80vh] items-center justify-center font-sans dark:bg-black gap-6 px-4 lg:px-0" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/sustainbg.png') lightgray 50% / cover no-repeat" }}>
                <Badgetextwhite title="Sustainability" />
                <h1 className="w-full lg:w-[80%] text-4xl lg:text-7xl font-medium text-white">Creating value with a differentiated approch</h1>
            </div>


            {/* Our Mission */}

            <ParallaxSection index={0}>
            <div className=" overflow-x-hidden relative min-h-auto lg:min-h-screen flex flex-col lg:flex-row px-6 lg:px-10 py-12 lg:py-20 font-medium bg-gray-200 shadow-lg gap-8 lg:gap-0">
                                     
                <div className="hidden lg:flex flex-col gap-28 w-90">
                    <Image src="/mission1.png" alt="Icon" width={300} height={0} className="ml-9" />
                    <Image src="/mission2.png" alt="Icon" width={400} height={0} />
                </div>

                <div className="flex flex-col justify-center items-center font-medium w-full">
                    <Badge title="Core Strength" />
                    <h1 className="text-3xl lg:text-6xl mt-2 flex flex-col lg:flex-row items-center justify-center font-helvitica-now leading-tight gap-2">
                        Our mission <Image src="/natureglobe.png" alt="Icon" width={60} height={0} className="lg:w-20" /> is to create
                    </h1>
                    <h1 className="text-3xl lg:text-6xl w-full lg:w-[60%] text-center leading-tight mt-4">
                        <span className="text-[#4F7363]">eco-friendly solutions </span> that promote recycling and green leaving
                    </h1>

                    <p className="max-w-lg mt-6 lg:mt-8 text-base lg:text-xl text-center">
                        We believe in a future where style and sustainability coexist harmoniously.
                    </p>
                </div>

                <div className="hidden lg:flex flex-col justify-between items-end w-90 gap-8">
                    <Image src="/mission3.png" alt="Icon" width={280} height={0} />
                    <Image src="/mission4.png" alt="Icon" width={330} height={0} className="mr-20" />
                </div>


                {/* mobile view  */}

                 <Image src="/mission3.png" alt="Icon" width={80} height={0} className="lg:hidden absolute -right-[8%] top-[12%]"/>
                    <Image src="/mission1.png" alt="Icon" width={100} height={0} className="lg:hidden absolute -left-[15%] bottom-[5%]" />


            </div>

            </ParallaxSection>

            <div className="min-h-auto lg:min-h-[85vh] flex flex-col items-center px-2 lg:px-10 py-12 lg:py-20 relative z-10">

                <h1 className="text-primary text-base lg:text-xl font-medium uppercase text-center" >Build on integrity, powered by innovation</h1>
                <h1 className="w-full lg:w-[60%] text-center text-3xl px-10 lg:text-5xl mt-4 font-semibold">Eco-friendly designs & recycling innovations.</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-2 my-12 lg:my-16 w-full">

                    <CardAnimation index={0} className="flex flex-col px-6 lg:px-10 gap-3 group hover:scale-105 transition-all duration-400">
                        <Image src="/eco1.png" alt="Icon" width={300} height={0} className="w-full" />
                        <h1 className="text-xl lg:text-2xl font-medium text-primary text-left">Lower Electricity Consumption</h1>
                        <p className="text-sm">Helio leverages modern data centers with a Power Usage Effectiveness (PUE) as low as 1.02 — far better than the 2.6 average of local render farms. Less waste, smarter cooling, dramatically lower energy demand.</p>

                    </CardAnimation>

                    <CardAnimation index={1} className="flex flex-col px-6 lg:px-10 gap-3 group hover:scale-105 transition-all duration-400">
                        <Image src="/eco2.png" alt="Icon" width={300} height={0} className="w-full" />
                        <h1 className="text-xl lg:text-2xl font-medium text-primary">CO₂ reports & carbon capture</h1>
                        <p className="text-sm">Helio utilizes cutting-edge rendering algorithms that significantly reduce processing time while maintaining high-quality outputs. This technology optimizes resource usage, allowing for more projects to be completed in less time.</p>

                    </CardAnimation>

                    <CardAnimation index={2} className="flex flex-col px-6 lg:px-10 gap-3 group hover:scale-105 transition-all duration-400">
                        <Image src="/eco3.png" alt="Icon" width={300} height={0} className="w-full" />
                        <h1 className="text-xl lg:text-2xl font-medium text-primary">Energy conservation</h1>
                        <p className="text-sm">With Helio, users can easily scale their rendering capabilities up or down based on project requirements. This flexibility ensures that clients only pay for the resources they need, enhancing cost efficiency.</p>

                    </CardAnimation>

                </div>
            </div>

            <div className="min-h-auto lg:min-h-screen px-6 lg:px-10 py-12 lg:py-20 relative z-10">
            
                    <div className="text-center mb-12 lg:mb-16 flex flex-col items-center">
                      <Badge title="Core Strength" />
                      <h1 className="text-2xl lg:text-4xl font-semibold text-black mt-4">Why choose us</h1>
                    </div>
            
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-6">
                                            <CardAnimation index={3} className="min-h-[60vh] lg:full lg:row-span-2 lg:ml-10 rounded-xl overflow-hidden relative h-48 lg:h-auto group hover:scale-105 transition-all duration-400">
                                            <VideoPlayer src="/wecarethenature.mp4" width={600} height={800} className='w-full h-full' />
                    
                                                    <h1 className="text-xl lg:text-3xl text-white absolute bottom-4 lg:bottom-9 left-4 lg:left-6">We care the Nature</h1>
                   
                     
                                            </CardAnimation>
                                            <CardAnimation index={4} className="bg-white rounded-xl p-6 py-12 lg:p-8 flex flex-col gap-4 shadow-lg group hover:scale-105 transition-all duration-400">
                        <Image src="/ecofeature1.png" alt="Icon" width={80} height={0} className="mb-4 lg:mb-6" />
                        <h1 className="text-lg lg:text-2xl font-semibold text-black">Sustainable Materials</h1>
                        <p className="text-sm">We prioritize recyclable, low-impact materials</p>
                                            </CardAnimation>
            
                                            <CardAnimation index={5} className="bg-white rounded-xl p-6 py-12 lg:p-8 flex flex-col gap-4 shadow-lg group hover:scale-105 transition-all duration-400">
                        <Image src="/ecofeature2.png" alt="Icon" width={80} height={40} className="mb-4 lg:mb-6" />
                        <h1 className="text-lg lg:text-2xl font-semibold text-black">Energy-Efficient Processes</h1>
                        <p className="text-sm">manufacturing powered by energy-saving technologies</p>
                                            </CardAnimation>
            
                                            <CardAnimation index={6} className="bg-white rounded-xl p-6 py-12 lg:p-8 flex flex-col gap-4 shadow-lg group hover:scale-105 transition-all duration-400">
                        <Image src="/ecofeature3.png" alt="Icon" width={80} height={40} className="mb-4 lg:mb-6" />
                        <h1 className="text-lg lg:text-2xl font-semibold text-black">Reduced Carbon Emissions</h1>
                        <p className="text-sm">Commitment to lowering CO₂ emissions</p>
                                            </CardAnimation>
            
                                            <CardAnimation index={7} className="bg-white rounded-xl p-6 py-12 lg:p-8 flex flex-col gap-4 shadow-lg group hover:scale-105 transition-all duration-400">
                        <Image src="/ecofeature4.png" alt="Icon" width={80} height={40} className="mb-4 lg:mb-6" />
                        <h1 className="text-lg lg:text-2xl font-semibold text-black">Future-Focused Innovation</h1>
                        <p className="text-sm">Continuous investment in green technologies</p>
                                            </CardAnimation>
                    </div>

            </div>

        </div>

    )
}
