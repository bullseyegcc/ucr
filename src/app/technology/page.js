'use client'

import Image from "next/image"
import { VideoPlayer } from "../../common/video"
import { Badgetextblack, Badgetextwhite } from "../../common/badge"
import ParallaxSection from "../../components/ParallaxSection"
import CardAnimation from "../../components/CardAnimation"
import SnipScroll from "../../components/SnipScroll"

export default function Technology() {
    return (
        <div className="bg-[#F2F2F2]">
            <div className="relative flex h-[50vh] sm:h-[60vh] lg:h-[80vh] max-h-[80vh] font-medium justify-center bg-black dark:bg-black">
                <VideoPlayer src="/technologybg.mp4" className="absolute inset-0 object-cover w-full h-full z-0" />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.35)0%,rgba(0,0,0,0.35)100%)] pointer-events-none" />
                <div className="flex flex-col items-center gap-5 absolute top-[35%] lg:top-[40%] z-20">
                    <Badgetextwhite title="Technlogy"/>
                    <h1 className=" text-3xl lg:text-6xl text-white text-center w-full px-4">Our Advance Technology</h1>

                </div>
            </div>

            {/* Header */}
            <ParallaxSection index={0}>
            <div className=" overflow-x-hidden relative flex flex-col px-6 sm:px-10 py-12 lg:py-20 lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-8 lg:gap-12 mb-12 lg:mb-16 lg:mb-20">
                <div className="flex-1 sm:mb-30">
                    <Badgetextblack title="Top notch Technology" />
                    <h1 className="text-3xl lg:text-4xl lg:text-5xl font-semibold text-black mt-4 lg:mt-5 lg:mt-6 leading-tight lg:leading-snug">Precision Crafted
                        Copper Excellence</h1>
                </div>
                <div className="flex-1  flex lg:justify-end text-xs lg:text-sm text-gray-600 lg:pt-8 lg:pt-12">
                    <p className='lg:w-4/5 text-xl'>Cutting-edge technology meets traditional craftsmanship. Discover how we're reshaping the future of copper manufacturing.</p>
                </div>
                <Image src="/technologyheaderbottom.png" alt="Icon" width={900} height={0} className="w-full  absolute bottom-0  " />

            </div>

            {/* cards */}

            </ParallaxSection>

            {/* card one  */}
            <SnipScroll>
                <div className="bg-white px-6 sm:px-8 lg:px-10 rounded-xl min-h-screen lg:min-h-[80vh] mx-6 sm:mx-8 lg:mx-10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl">

                    {/* card header */}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8 lg:py-12">
                        <h1 className="text-primary text-2xl sm:text-3xl lg:text-4xl font-medium uppercase animate-reveal">South Wire Technology</h1>

                        <h1 className="text-secondary text-xl sm:text-2xl lg:text-4xl font-semibold text-black leading-tight lg:leading-snug whitespace-nowrap animate-reveal text-primary">01/<span className="text-secondary">02</span></h1>
                    </div>

                {/* content */}

                <div className="w-full flex flex-col lg:flex-row border-t border-secondary/40">
                    {/* left side */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-20 py-6 lg:py-9">
                            <p className="text-base lg:text-xl lg:text-2xl animate-reveal">UCR firmly believes that the primary advantage of any advanced technology lies in its ability to seamlessly enhance operational efficiency, ultimately leading to increased productivity. This boost not only empowers employees but also improves the quality and quantity of products produced.

                            </p>

                            <p className="text-base lg:text-xl lg:text-2xl animate-reveal">As the largest facility of its kind in the Middle East, UCR boasts an impressive rod production capacity of over 200,000 metric tons annually. To manufacture its top-tier copper rods, UCR employs the state-of-the-art Southwire Continuous Rod Casting Technology from the United States, ensuring outstanding quality and performance.</p>
                        </div>

                        {/* right side */}
                        <div className="w-full lg:w-1/2">
                            <Image src="/southwire.png" alt="Icon" width={500} height={0} className="w-full h-full object-cover rounded-none lg:rounded-r-xl p-4 lg:p-6 lg:p-8" />
                        </div>
                    </div>
                </div>

                {/* card two */}
                <div className="text-white my-2 bg-[#272A2A] px-6 sm:px-8 lg:px-10 rounded-xl min-h-screen lg:min-h-[80vh] mx-6 sm:mx-8 lg:mx-10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl">

                    {/* card header */}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8 lg:py-12">
                        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-medium uppercase animate-reveal">Copper treatments </h1>

                        <h1 className="text-secondary text-xl sm:text-2xl lg:text-4xl font-semibold text-black leading-tight lg:leading-snug whitespace-nowrap animate-reveal text-primary">02/<span className="text-secondary">03</span></h1>
                    </div>

                    {/* content */}

                    <div className="w-full flex flex-col lg:flex-row border-t border-secondary/40">
                        {/* left side */}
                        <div className="w-full lg:w-[60%] flex flex-col gap-6 lg:gap-20 py-6 lg:py-9">
                            <p className="text-base lg:text-xl lg:text-2xl animate-reveal">UCR firmly believes that the primary advantage of any advanced technology lies in its ability to seamlessly enhance operational efficiency, ultimately leading to increased productivity. This boost not only empowers employees but also improves the quality and quantity of products produced.

                            </p>

                            <p className="text-base lg:text-xl lg:text-2xl animate-reveal">As the largest facility of its kind in the Middle East, UCR boasts an impressive rod production capacity of over 200,000 metric tons annually. To manufacture its top-tier copper rods, UCR employs the state-of-the-art Southwire Continuous Rod Casting Technology from the United States, ensuring outstanding quality and performance.</p>


                            <h1 className="py-4 text-base lg:text-lg text-primary font-medium underline hover:text-orange-600 transition-colors duration-300">Read More</h1>
                        </div>

                        {/* right side */}
                        <div className="w-full lg:w-[40%]">
                            <Image src="/coppertreatment.png" alt="Icon" width={500} height={0} className="w-full h-full object-cover rounded-none lg:rounded-r-xl p-4 lg:p-6 lg:p-8" />
                        </div>
                    </div>
                </div>

                {/* card three  */}
                <div className="bg-white px-6 sm:px-8 lg:px-10 rounded-xl min-h-screen lg:min-h-[80vh] mx-6 sm:mx-8 lg:mx-10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl">

                    {/* card header */}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8 lg:py-12">
                        <h1 className="text-primary text-2xl sm:text-3xl lg:text-4xl font-medium animate-reveal">NexGen Sol</h1>
                        <h1 className="text-secondary text-xl sm:text-2xl lg:text-4xl font-semibold text-black leading-tight lg:leading-snug whitespace-nowrap animate-reveal text-primary">03/<span className="text-secondary">03</span></h1>
                    </div>

                    {/* content */}

                    <div className="w-full flex flex-col lg:flex-row border-t border-secondary/40">
                        {/* left side */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-20 py-6 lg:py-9">
                            <p className="text-base lg:text-xl lg:text-2xl animate-reveal">UCR firmly believes that the primary advantage of any advanced technology lies in its ability to seamlessly enhance operational efficiency, ultimately leading to increased productivity. This boost not only empowers employees but also improves the quality and quantity of products produced.

                            </p>

                            <p className="text-base lg:text-xl lg:text-2xl animate-reveal">As the largest facility of its kind in the Middle East, UCR boasts an impressive rod production capacity of over 200,000 metric tons annually. To manufacture its top-tier copper rods, UCR employs the state-of-the-art Southwire Continuous Rod Casting Technology from the United States, ensuring outstanding quality and performance.</p>
                        </div>

                        {/* right side */}
                        <div className="w-full lg:w-1/2">
                            <Image src="/nextgensol.png" alt="Icon" width={500} height={0} className="w-full h-full object-cover rounded-none lg:rounded-r-xl p-4 lg:p-6 lg:p-8" />
                        </div>
                    </div>
                </div>
            </SnipScroll>

            {/* cards end */}



            {/* laboratory */}

            <ParallaxSection index={4}>
                <div className="mt-4    flex min-h-[80vh] flex-col px-10 items-center justify-start pt-8 pb-20">

                    <div className="animate-reveal">
                        <Badgetextblack title="UCR Laboratory" />
                    </div>
                    <h1 className="text-3xl text-center lg:text-4xl lg:text-5xl font-semibold text-black mt-4 lg:mt-5 lg:mt-6 leading-tight lg:leading-snug animate-reveal">Equipment used in the testing process</h1>


                    {/* cards */}
                    <div className="flex flex-wrap gap-6 py-8 justify-center">

                        {/* card 1 */}
                        <CardAnimation index={3} className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[32%] transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl">

                            <Image src="/lab1.png" alt="Icon" width={480} height={0} className="object-contain rounded-xl " />
                            <div className="relative">
                                <span aria-hidden="true" className="absolute -left-0 -top-0 w-3 h-3 bg-[#FF6A00] rounded-full shadow-sm" />
                                <h1 className="text-xl font-medium text-gray-500 pl-4 ml-2">LECO Oxygen Analyzer</h1>
                            </div>

                        </CardAnimation>

                        {/* card 2 */}
                        <CardAnimation index={4} className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[32%] mt-6 sm:mt-8 transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl">

                            <Image src="/lab2.png" alt="Icon" width={480} height={0} className="object-contain rounded-xl " />
                            <div className="relative">
                                <span aria-hidden="true" className="absolute -left-0 -top-0 w-3 h-3 bg-[#FF6A00] rounded-full shadow-sm" />
                                <h1 className="text-xl font-medium text-gray-500 pl-4 ml-2">Twist/Torsion Tester,</h1>
                            </div>

                        </CardAnimation>

                        {/* card 3   */}
                        <CardAnimation index={5} className="flex flex-col gap-2 w-full sm:w-[48%] lg:w-[32%]  mt-8 sm:mt-16 transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl">

                            <Image src="/lab3.png" alt="Icon" width={480} height={300} className="h-[75%] lg:w-[90%]  object-fit rounded-xl " />
                            <div className="relative">
                                <span aria-hidden="true" className="absolute -left-0 -top-0 w-3 h-3 bg-[#FF6A00] rounded-full shadow-sm" />
                                <h1 className="text-xl font-medium text-gray-500 pl-4 ml-2">UTS (Ultimate Tensile Strength)</h1>
                            </div>

                        </CardAnimation>

                    </div>



                </div>
            </ParallaxSection>
        </div>
    )
}
