import { Badge, Badgetextwhite } from "../../common/badge"
import { WhiteBadge } from "../../common/badge"
import { VideoCard } from "../../common/VideoCard.js";
import badge_icon from '../../../public/badge.png';

import { ArrowRight } from 'lucide-react';

import Image from "next/image"
import { VideoPlayer } from "../../common/video";
import JourneySection from "../../components/JourneySection"
import ParallaxSection from "../../components/ParallaxSection"
import TextReveal from "../../components/TextReveal"
import MissionValuesSection from "../../components/MissionValuesSection"

export default function AboutUs() {

    return (
        <div className="">
            <div className=" mb-[80%] lg:mb-[30%] relative flex min-h-[80vh] items-center pt-[35%] md:pt-46 bg-black font-sans bg-primary flex flex-col gap-10">

                <div className="inline-flex items-start lg:items-center lg:gap-3 text-white z-300 w-[80%] lg:w-[40%]">
                    <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='object-contain' />
                    <span className='text-white uppercase font-medium text-center text-sm lg:text-base'>Crafting Sustainable Progress, One Copper Solution at a Time </span>
                </div>

                <h1 className=" lg:w-[70%] leading-relaxed  text-center text-3xl lg:text-5xl  font-medium px-3 md:font-bold text-white">Leading the region's copper transformation with cutting edge technology </h1>
                <div className="absolute -bottom-[40%] lg:-bottom-[55%] w-[90%] md:w-[80%] h-[50vh] lg:h-[70vh] ">
                    <VideoPlayer src="/aboutvideo.mp4" className="w-full h-full object-cover rounded-xl " />

                </div>
            </div>

            <div className="px-3 lg:px-10 py-20 flex flex-col lg:items-center justify-center">
                <Badge title="Who we are" />

                <TextReveal>
                    <h1 className="text-center text-xl pr-2 lg:text-4xl leading-relaxed  mt-8">
                        <span className="text-[#FF7A5C]">Since 2008, we've delivered reliable, high performance copper solutions to </span>
                        <span className="bg-gradient-to-r from-[#FF7A5C] to-[#8A8A8A] bg-clip-text text-transparent">industries across more than 30 countries, supported by advanced </span>
                        <span className="text-[#8A8A8A]">technology and a strong focus on environmental responsibility. Guided by our core values, we work to elevate industry standards and help shape a greener, more efficient future.</span>
                    </h1>
                </TextReveal>
             

            </div>


            {/* Our Mission & Our Values */}

            <MissionValuesSection />


            {/* parent company */}

            <ParallaxSection index={1}>
                <div className="min-h-screen relative mb-8 lg:mb-0">
                    <div className="min-h-[40vh] sm:min-h-[50vh] w-full bg-[url('/parentcompanybg.png')] bg-cover bg-center lg:bg-top bg-no-repeat rounded-xl sm:rounded-2xl flex flex-col justify-center items-center px-4 sm:px-5 lg:px-16 py-8 sm:py-12">
                        <div className="flex flex-col sm:flex-row  items-center gap-2 sm:gap-3 text-white z-10">
                            <Image src='/badge-w.png' alt="Badge Icon" width={34} height={34} className='object-contain w-6 h-6 sm:w-8 sm:h-8 lg:w-[34px] lg:h-[34px]' />
                            <span className='text-2xl sm:text-3xl lg:text-4xl uppercase font-medium text-center'>Parent Company</span>
                        </div>
                    </div>
                    
                    <div className="bg-[#FEF7F4] w-full px-4 sm:px-5 lg:px-16 py-8 sm:py-10 lg:py-12">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#212225] font-semibold mb-4 sm:mb-6">Our Core Sectors</h1>

                        <div className="text-primary text-lg sm:text-xl lg:text-2xl flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-6">
                            <h1 className="hover:text-[#F26522] transition-colors cursor-pointer underline">Manufacturing</h1>
                            <h1 className="hover:text-[#F26522] transition-colors cursor-pointer underline">Trading</h1>
                            <h1 className="hover:text-[#F26522] transition-colors cursor-pointer underline">Construction</h1>
                            <h1 className="hover:text-[#F26522] transition-colors cursor-pointer underline">Services</h1>
                        </div>
                    </div>

                    <div className="bg-white rounded-t-2xl lg:rounded-2xl lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2 px-6 sm:px-8 lg:px-10 py-12 sm:py-16 flex flex-col items-center justify-center gap-8 sm:gap-12 lg:gap-16 lg:h-[80vh]">
                        <p className="text-base sm:text-lg lg:text-2xl text-center text-[#212225] leading-relaxed">
                            Itihad International Investment LLC is a private holding and multi-disciplinary conglomerate, engaged in a wide spectrum of economic activities in the MENA region
                        </p>

                        <Image 
                            src="/itihad.png" 
                            alt="Itihad Logo" 
                            width={200} 
                            height={100} 
                            className='w-32 sm:w-40 lg:w-[200px] h-auto object-contain' 
                        />
                    </div>
                </div>
            </ParallaxSection>


            <JourneySection />



            <ParallaxSection index={2}>
                <div className="w-full pb-8 sm:pb-10 lg:pb-12 h-auto lg:min-h-[85vh] pt-8 sm:pt-12 lg:pt-16 px-4 sm:px-6 lg:px-10 mb-6 sm:mb-8 bg-[url('/expertisebg.png')] bg-cover bg-center lg:bg-top bg-no-repeat flex flex-col justify-between gap-6 sm:gap-8">

                    <div className="mb-2 sm:mb-4">
                        <Badge title="our expertise" />
                        <h1 className="text-xl sm:text-2xl lg:text-4xl mt-3 sm:mt-4 font-semibold">Our Expertise & Experience</h1>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch lg:items-end">

                        <div className="rounded-xl w-full lg:w-1/3 bg-white px-4 sm:px-5 pt-8 sm:pt-10 lg:pt-16 relative flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[45vh] sm:min-h-[50vh] lg:h-[55vh] group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl overflow-hidden">
                            <h1 className="pt-3 sm:pt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-3 sm:gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                                20+ 
                                <hr className="text-primary/30 w-[90%] shadow" />
                            </h1>

                            <div className="relative z-10 pb-4 sm:pb-6">
                                <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-2">Years Experience</h1>
                                <p className="text-sm sm:text-base w-[85%] lg:w-[90%] pr-2 text-gray-600">200,000 metric tons copper production line that is the largest of its kind in the Middle East.</p>
                            </div>

                            <Image src="/exp1.png" alt="Expertise Icon" width={290} height={80} className='w-full absolute -bottom-0 right-0 z-0 opacity-90' />
                        </div>

                        <div className="rounded-xl w-full lg:w-1/3 bg-white px-4 sm:px-5 pt-8 sm:pt-10 lg:pt-16 relative flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[45vh] sm:min-h-[50vh] lg:h-[50vh] group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl overflow-hidden">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-3 sm:gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                                1500+ 
                                <hr className="text-primary/30 w-[90%] shadow" />
                            </h1>

                            <div className="relative z-10 pb-4 sm:pb-6">
                                <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-2">Employees</h1>
                                <p className="text-sm sm:text-base w-[85%] lg:w-[80%] text-gray-600">With over 150 experienced employees, we deliver quality and reliability every day.</p>
                            </div>

                            <Image src="/employees.png" alt="Expertise Icon" width={300} height={80} className='absolute -bottom-0 right-0 z-0 opacity-90' />
                        </div>
                        
                        <div className="rounded-xl w-full lg:w-1/3 bg-white px-4 sm:px-5 pt-8 sm:pt-10 lg:pt-16 relative flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[45vh] sm:min-h-[50vh] lg:h-[45vh] group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl overflow-hidden">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary relative z-10 flex flex-col gap-3 sm:gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
                                30+ 
                                <hr className="text-primary/30 w-[90%] shadow" />
                            </h1>

                            <div className="relative z-10 pb-4 sm:pb-6">
                                <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-2">Global Sales</h1>
                                <p className="text-sm sm:text-base w-[85%] lg:w-[85%] pr-2 text-gray-600">We supply products, services and solutions across over 30 countries in Australia, Asia, Africa, and the Middle East.</p>
                            </div>

                            <Image src="/exp3.png" alt="Expertise Icon" width={300} height={80} className='absolute -bottom-0 right-0 z-0 opacity-90' />
                        </div>

                    </div>

                </div>
            </ParallaxSection>


            <ParallaxSection index={3}>
                <div className="flex flex-col lg:flex-row justify-center items-stretch min-h-auto lg:min-h-screen px-4 sm:px-6 lg:px-10 gap-4 sm:gap-6 lg:gap-8 py-6 sm:py-8 lg:py-12">
                    <VideoCard
                        videoSrc="/moreabout.mp4"
                        badgeTitle="more about"
                        heading="Union Copper Rod is undeniably the most trusted copper rod manufacturer in the region"
                        buttonText="Company Profile"
                    />

                    <VideoCard
                        videoSrc="/supplychain.mp4"
                        badgeTitle="Supplychain"
                        heading="UCR leads the region in copper rod production and has its sights on vastly expanding its enterprise"
                        buttonText="Know More"
                    />
                </div>
            </ParallaxSection>

        </div>
    )
}
