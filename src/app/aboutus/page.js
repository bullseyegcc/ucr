import { Badge, Badgetextwhite } from "../common/badge"
import { WhiteBadge } from "../common/badge"
import badge_icon from '../../../public/badge.png';


import { ArrowRight } from 'lucide-react';

import Image from "next/image"
export default function AboutUs() {

    return (
        <div className="">
            <div className=" mb-[30%] relative flex min-h-[80vh] items-center pt-46 bg-black font-sans bg-primary flex flex-col gap-10">

                <Badgetextwhite title="Crafting Sustainable progress,one cooper solution at a time" />

                <h1 className=" w-[70%]  text-center text-5xl font-bold text-white font-inter">Leading the region’s copper transformation with cutting edge technology </h1>
                <Image src="/aboutimg.png" alt="About Us Image" width={800} height={600} className='absolute -bottom-[55%] w-[75%]' />
            </div>

            <div className="px-10 py-20 flex flex-col items-center justify-center">
                <Badge title="Who we are" />

                <p className="text-center text-4xl leading-relaxed px-10 mt-8">
                    <span className="text-[#FF7A5C]">Since 2008, we've delivered reliable, high performance copper solutions to </span>
                    <span className="bg-gradient-to-r from-[#FF7A5C] to-[#8A8A8A] bg-clip-text text-transparent">industries across more than 30 countries, supported by advanced </span>
                    <span className="text-[#8A8A8A]">technology and a strong focus on environmental responsibility. Guided by our core values, we work to elevate industry standards and help shape a greener, more efficient future.</span>
                </p>
            </div>


            {/* Our Mission & Our Values */}


            <div className="min-h-[60vh] my-8 w-full flex justify-between gap-6 items-starts px-10">

                <div className="max-h-90  text-white rounded-xl w-1/2 px-10 py-8 flex flex-col justify-between bg-[url('/missionbg.png')] bg-cover bg-top bg-no-repeat">
                    <WhiteBadge title="our mission" className='ml-10 mt-10' />
                    <h1 className="text-4xl ">To deliver  premium copper product and services that power progress and add value to a sustainable future</h1>
                </div>

                <div className="min-h-90 max-h-90  rounded-xl w-1/2 px-10 py-8 flex flex-col justify-between bg-[#F5F5F5] self-end">
                    <Badge title="our values" className='ml-10 mt-10' />
                    <h1 className="text-4xl ">To deliver  premium copper product and services that power progress and add value to a sustainable future</h1>
                </div>




            </div>


            {/* parent company */}

            <div className="h-screen relative">
                <div className="min-h-1/2 w-full  bg-[url('/parentcompanybg.png')] bg-cover bg-top bg-no-repeat rounded-xl flex items-center px-16  backdrop-brightness-75 backdrop-blur-xl">

                    <div className="flex gap-3 text-white z-300 mt-16">
                        <Image src={badge_icon} alt="Badge Icon" width={34} height={34} className='object-contain' />
                        <span className=' text-4xl uppercase '>Parent Company</span>
                    </div>
                </div>
                <div className="h-1/2 bg-[#FEF7F4] w-full px-16 py-8">
                    <h1 className="text-4xl text-[#212225]">Our Core Sectors</h1>

                    <div className="text-primary text-2xl flex flex-col gap-2 mt-6 underline">

                        <h1>Manufacturing</h1>
                        <h1>Trading</h1>
                        <h1>Construction</h1>
                        <h1>Services</h1>
                    </div>

                </div>


                <div className="h-[80vh] rounded-t-2xl bg-white absolute right-0 bottom-0 w-1/2 px-10 pt-16 flex flex-col pt-16 items-center gap-16 ">

                    <p className="text-2xl text-center">Itihad International Investment LLC is a private holding and multi-disciplinary conglometrate ,engaged in a woide spectrum of economic activities in the MENA region</p>

                    <Image src="/itihad.png" alt="Itihad Logo" width={200} height={100} className='mt-4' />

                </div>
            </div>


            <div className="h-screen bg-[url('/journeygradient.png')] bg-cover bg-top bg-no-repeat flex flex-col ">

                <div className="flex flex-col items-center justify-center  py-18">

                    <Badge title="our Story" className='ml-10 mt-10' />
                    <h1 className="text-4xl mt-4 ">Over The Years</h1>
                </div>


                <div className="h-[80vh] mt-6">

             
                    <div className="w-full h-[90%] flex justify-center px-30">
                        
                        <div className="h-full w-1/2 bg-[url('/2009img.png')] bg-cover  rounded-l-2xl   bg-top bg-no-repeat bg-bottom"></div>
                        <div className="h-full w-1/2 bg-primary bg-[url('/2009img2.png')] bg-contain rounded-r-2xl bg-top-right  bg-no-repeat px-10 py-26 flex flex-col justify-between gap-9">

                        <h1 className="text-8xl font-semibold  text-white  ">2009</h1>

                        <div className="w-[80%]">
                            <h1 className="text-4xl text-white">Founded With Vision</h1>
                            <p className="text-sm text-white pr-8 mt-6">Founded with a steadfast dedication to accuracy, quality, and innovation, our journey in copper production began with a clear purpose — to set new benchmarks in the industry.Every process, from sourcing to refinement, reflects our pursuit of perfection and reliability.</p>
                        </div>
                        </div>

                    </div>
            
                        
                </div>

            </div>


            <div className="flex justify-center min-h-screen px-10">

                <div className="w-1/2 m-2 relative bg-[#6A3120] p-8 flex flex-col justify-end mb-20 gap-5 rounded-xl bg-[url('/ourcompany.png')] bg-contain bg-top bg-no-repeat">
                    <WhiteBadge title="more about" className='z-190' />
                    <h1 className="text-5xl text-white z-90 font-helvetica-now">Union Copper Rod is undeniably the most trusted copper rod manufacturer in the region</h1>
          <button className='rounded-full mt-6 z-90 text-lg flex items-center gap-2 w-55 text-white border  border-secondary rounded-2xl px-5 py-3 justify-between'>Company Profile <ArrowRight size={18} color='white' /></button>
                    <div className="h-[85%] bg-gradient-to-t rounded-xl from-[#6A3120] to-[#6a3120] mt-10 absolute bottom-0 left-0 w-full z-0 bg-[url('/bg.png')] bg-cover bg-center">
                    </div>

                </div>

                <div className="w-1/2 m-2 relative bg-[#6A3120] p-8 flex flex-col justify-end mb-20 gap-5 rounded-xl bg-[url('/sustain.png')] bg-contain bg-top bg-no-repeat">
                    <WhiteBadge title="more about" className='z-190' />
                    <h1 className="text-5xl text-white z-90 font-helvetica-now">Union Copper Rod is undeniably the most trusted copper rod manufacturer in the region</h1>
                              <button className='rounded-full mt-6 z-90 text-lg flex items-center gap-2 w-55 text-white border  border-secondary rounded-2xl px-5 py-3 justify-between'>Download Report <ArrowRight size={18} color='white' /></button>

                    <div className="h-[85%] bg-gradient-to-t rounded-xl from-[#6A3120] to-[#6a3120] mt-10 absolute bottom-0 left-0 w-full z-0 bg-[url('/bg.png')] bg-cover bg-center">
                    </div>
 
                </div>

            </div>

            <div className="w-full h-[80vh] pt-16 px-10 mb-8 bg-[url('/expertisebg.png')] bg-contain bg-top bg-no-repeat bg-cover flex flex-col justify-between">

                <div>
                    <Badge title="our expertise" />
                    <h1 className="text-4xl mt-4 font-semibold ">Our Expertise & Experiance</h1>

                </div>
                <div className="flex gap-6 items-end">

                    <div className="h-[55vh] rounded-xl w-[30%] bg-white px-5 pt-16 relative flex flex-col gap-8">
                        <h1 className="text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">200k+ <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2 ">MT/Anum</h1>
                            <p className=" pr-4">200,000 metric tons
                                copper production line that is the largest of its kind in the Middle East. </p>

                        </div>

                        <Image src="/anum.png" alt="Expertise Icon" width={290} height={80} className='w-full absolute -bottom-0 right-0 z-0' />

                    </div>

                    <div className="h-[50vh] rounded-xl w-[30%] bg-white px-5 pt-16 relative flex flex-col gap-8">
                        <h1 className="text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">150+ <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">Employees</h1>
                            <p className="w-70">With over 150 experienced employees, we deliver quality and reliability every day.</p>

                        </div>

                        <Image src="/employees.png" alt="Expertise Icon" width={330} height={80} className=' absolute -bottom-0 right-0 z-0' />

                    </div>

                    <div className="h-[45vh] rounded-xl w-[30%] bg-white px-5 pt-16 relative flex flex-col gap-8">
                        <h1 className="text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">30+ <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">Global Sales</h1>
                            <p className=" w-80 pr-4">We supplies products, services and solutions across over 30 countries in Australia, Asia, Africa, and the Middle East  </p>

                        </div>

                        <Image src="/globalsales.png" alt="Expertise Icon" width={240} height={80} className=' absolute -bottom-0 right-0 z-0' />

                    </div>



                </div>

            </div>




        </div>
    )
}