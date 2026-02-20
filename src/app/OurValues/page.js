'use client'
import { Badge } from "../../common/badge"
import Image from "next/image"
import CardAnimation from "../../animations/CardAnimation"
import FadeIn from "../../animations/FadeIn"

export default function OurValues() {
    return (
        <div>
            <div className="flex flex-col text-center min-h-[80vh] items-center justify-center bg-[url('/valuebg.png')] bg-cover font-sans dark:bg-black gap-6">
                <Badge title="values" />
                <FadeIn className="text-4xl lg:text-6xl font-bold text-white">
                    Our Values
                </FadeIn>
            </div>

            {/* Trust & Reliability Section */}
            <div className="min-h-screen bg-[linear-gradient(180deg,#FFF_0%,rgba(255,255,255,0.44)_100%)] px-6 lg:px-10 py-12 lg:py-20">
                <div className="w-full mx-auto">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-9 lg:gap-12 mb-12 lg:mb-16">
                        <div className="flex-1">
                            <Badge title="Build on integrity, powered by innovation" />
                            <h1 className="text-4xl lg:w-[80%] lg:text-5xl font-semibold text-black mt-4 lg:mt-6 leading-tight lg:leading-snug">Beyond copper, we build trust & reliability</h1>
                        </div>
                        <div className="flex-1 lg:pt-12">
                            <p className="overflow-hidden text-ellipsis text-[#212225] text-lg font-normal leading-[30px] tracking-[-0.45px]">We don't just produce copper — we shape reliability, innovation, and sustainability into every product we deliver.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                        <CardAnimation index={0} className="bg-[#FDF5F3] rounded-xl p-6 lg:p-8 flex flex-col gap-6 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                            <Image src="/excel.png" alt="Icon" width={80} height={0} className="group-hover:scale-110 group-hover:rotate-10 transition-transform duration-400" />
                            <div>
                                <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">Excel Always</h1>
                                <p className="text-[rgba(33,34,37,0.82)] text-xs lg:text-sm mt-3">We ensure that every product we make and service we offer reaches our clients with meticulous attention to detail and quality checks.</p>
                            </div>
                        </CardAnimation>

                        <CardAnimation index={1} className="bg-[#FDF5F3] rounded-xl p-6 lg:p-8 flex flex-col gap-6 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                            <Image src="/path.png" alt="Icon" width={80} height={0} className="group-hover:scale-110 group-hover:rotate-10 transition-transform duration-400" />
                            <div>
                                <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">Create New Paths</h1>
                                <p className="text-[rgba(33,34,37,0.82)] text-xs lg:text-sm mt-3">To ensure the best quality we embrace the best innovation. We aim to redefine industry benchmarks, and lead the way in developing smart, efficient solutions.</p>
                            </div>
                        </CardAnimation>

                        <CardAnimation index={2} className="bg-[#FDF5F3] rounded-xl p-6 lg:p-8 flex flex-col gap-6 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                            <Image src="/reliable.png" alt="Icon" width={80} height={0} className="group-hover:scale-110 group-hover:rotate-10 transition-transform duration-400" />
                            <div>
                                <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">Be Reliable</h1>
                                <p className="text-[rgba(33,34,37,0.82)] text-xs lg:text-sm mt-3">Our commitment to sustainability enhances our reliability. As trusted partners, we promise only the best in our supply chain and community engagements, fostering collective growth.</p>
                            </div>
                        </CardAnimation>

                        <CardAnimation index={3} className="bg-[#FDF5F3] text-center rounded-xl p-6 lg:p-8 flex flex-col items-center gap-6 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                            <Image src="/morethancopper.png" alt="Icon" width={300} height={90} className="group-hover:scale-110 group-hover:rotate-10 transition-transform duration-400" />
                            <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">More Than Cooper</h1>

                        </CardAnimation>

                        <CardAnimation index={4} className="bg-[#FDF5F3] rounded-xl p-6 lg:p-8 flex flex-col gap-6 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                            <Image src="/careforfuture.png" alt="Icon" width={80} height={0} className="group-hover:scale-110 group-hover:rotate-10 transition-transform duration-400" />
                            <div>
                                <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">Care For The Future</h1>
                                <p className="text-[rgba(33,34,37,0.82)] text-xs lg:text-sm mt-3">While focusing on innovation, we stay mindful of our environmental footprint. We strive to minimize our carbon footprint and set an example for responsible manufacturing across the industry.</p>
                            </div>
                        </CardAnimation>

                        <CardAnimation index={5} className="bg-[#FDF5F3] rounded-xl p-6 lg:p-8 flex flex-col gap-6 group transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl">
                            <Image src="/grow.png" alt="Icon" width={80} height={0} className="group-hover:scale-110 group-hover:rotate-10 transition-transform duration-400" />
                            <div>
                                <h1 className="overflow-hidden text-[#FA6E43] font-medium text-[32px] leading-[64px] tracking-[-1.4px] capitalize">Grow Together</h1>
                                <p className="text-[rgba(33,34,37,0.82)] text-xs lg:text-sm mt-3">We strive to partner with those who share a genuine commitment to excellence. We work towards building long-term relationships that make a positive difference to society.</p>
                            </div>
                        </CardAnimation>
                    </div>




                </div>
            </div>


            {/* people */}
            <div className="min-h-screen  bg-[url('/people.png')] bg-cover  bg-bottom bg-no-repeat">

                <div className="flex flex-col items-center gap-4 lg:gap-5 px-6 lg:px-10 pt-12 lg:pt-0">
                    <Badge title="people" />
                    <h1 className='text-2xl lg:text-5xl text-center lg:mb-8 text-[#5F5F66] leading-tight lg:leading-snug'>Treating all employees with respect and dignity</h1>
                </div>

            </div>
        </div>
    )
}
