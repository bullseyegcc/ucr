import { Badge, Badgetextwhite } from "../../common/badge"
import Image from "next/image"
import TextReveal from "../../components/TextReveal"


export default function parentCompany() {
    return (
        <div className="bg-[#F5F5F5]">
            {/* header */}
            <div className="bg-[url('/pcbg.png')] bg-cover bg-bottom bg-no-repeat relative  min-h-[60vh] md:min-h-[80vh]    font-sans flex flex-col items-center  justify-center gap-6">

                <Badgetextwhite title="Our Logistics" />

                <h1 className="w-full md:w-3/4 lg:w-2/3 text-center text-3xl md:text-5xl font-bold text-white leading-tight px-6">UCR has a higher delivery capacity in the Copper Industry</h1>




            </div>

            <div className="px-2 md:px-10 py-20 flex flex-col items-center justify-center">

                <TextReveal>
                    <p className="text-center text-lg  md:text-4xl leading-relaxed px-10 mt-8">
                        <span className="bg-gradient-to-r from-[#FF7A5C] to-[#8A8A8A] bg-clip-text text-transparent">Ittihad International Investment LLC is a private holding and multi-disciplinary conglomerate, engaged in a wide spectrum of economic activities across the MENA region.</span>
                        <span className="text-[#8A8A8A]">We lead, manage, and empower a diverse portfolio of companies to bring long-term value, operational excellence, and sustainable growth.</span>
                    </p>
                </TextReveal>
            </div>


            <div className="grid grid-cols-1 py-8 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4 md:px-10">
                <div className="min-h-[40vh] py-10  md:h-full relative rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 animate-reveal group hover:scale-105 transition-all duration-400">
                    <Image src="/pc1.png" alt="Icon" className='absolute bottom-0 right-0 max-w-[45%] md:max-w-[60%]' width={300} height={0} />
                    <div className="pb-6">
                        <h1 className="text-2xl md:text-4xl py-4 md:py-6 font-semibold text-primary">Manufacturing</h1>
                        <p className="text-[#5F5F66] text-base md:text-lg mt-3 w-full md:w-4/5">Our manufacturing segment is powered by advanced production capabilities, high-grade facilities, and an uncompromising commitment to quality. We support industries with reliable, large-scale output across metals, materials, consumer goods, and industrial components.</p>
                    </div>
                </div>

                <div className="relative py-5 rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 animate-reveal group hover:scale-105 transition-all duration-400">
                    <Image src="/pc2.png" alt="Icon" className='absolute bottom-0 right-0 max-w-[35%] md:max-w-[55%]' width={250} height={0} />
                    <div className="pb-6">
                        <h1 className="text-2xl md:text-4xl py-4 md:py-6 font-semibold text-primary">Trading</h1>
                        <p className="text-[#5F5F66] text-base md:text-lg mt-3 w-full md:w-4/5">With a strong regional footprint, our trading operations connect global suppliers with local markets. We streamline supply-chain processes, enhance product availability, and ensure that businesses can access the materials and products they need, quickly and efficiently.</p>
                    </div>
                </div>

                <div className=" min-h-[40vh] py-10 relative rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 animate-reveal group hover:scale-105 transition-all duration-400">
                    <Image src="/pc3.png" alt="Icon" className='absolute bottom-0 right-0 max-w-[35%] md:max-w-[55%]' width={250} height={0} />
                    <div className="pb-6">
                        <h1 className="text-2xl md:text-4xl py-4 md:py-6 font-semibold text-primary">Construction</h1>
                        <p className="text-[#5F5F66] text-base md:text-lg mt-3 w-full md:w-4/5">Our manufacturing segment is powered by advanced production capabilities, high-grade facilities, and an uncompromising commitment to quality. We support industries with reliable, large-scale output across metals, materials, consumer goods, and industrial components.</p>
                    </div>
                </div>

                <div className=" min-h-[40vh] py-10 relative rounded-xl p-6 sm:p-8 flex flex-col gap-6 bg-white/60 animate-reveal group hover:scale-105 transition-all duration-400">
                    <Image src="/pc4.png" alt="Icon" className='absolute bottom-3 right-3 max-w-[35%] md:max-w-[55%] z-0' width={250} height={0} />
                    <div className="pb-6">
                        <h1 className="text-2xl md:text-4xl py-4 md:py-6 font-semibold text-primary">Services</h1>
                        <p className="text-[#5F5F66] text-base md:text-lg mt-3 w-full md:w-4/5">From logistics and facility management to specialized industrial services, we deliver essential support functions that strengthen our group’s operational backbone. Our service companies allow other subsidiaries to focus on their core business while benefiting from dependable, optimized support systems.</p>
                    </div>
                </div>
            </div>


            <div className="w-full h-auto md:h-[80vh] pt-12 md:pt-16 px-4 md:px-10 mb-8 bg-[url('/expertisebg.png')] bg-contain bg-top bg-no-repeat bg-cover flex flex-col justify-between">

                <div>
                    <Badge title="our expertise" />
                    <h1 className="text-2xl md:text-4xl mt-4 font-semibold ">Our Expertise & Experiance</h1>

                </div>
                <div className="mt-6 flex flex-col md:flex-row gap-6 items-end">

                    <div className="min-h-[50vh] md:min-h-[55vh] rounded-xl w-full md:w-1/3 bg-white px-5 pt-2 md:pt-16 relative flex flex-col gap-8 h-[50vh]  md:h-[55vh] animate-reveal group hover:scale-105 transition-all duration-400">
                        <h1 className="pt-5     text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">20+ <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10 pb-6 ">
                            <h1 className="text-3xl font-bold mb-2">Years Experience</h1>
                            <p className="w-[70%] md:w-90 pr-0 md:pr-4">200,000 metric tons copper production line that is the largest of its kind in the Middle East.</p>

                        </div>

                        <Image src="/exp1.png" alt="Expertise Icon" width={290} height={80} className='w-full absolute -bottom-0 right-0 z-0' />

                    </div>

                    <div className="overflow-x-hidden min-h-[55vh] md:min-h-[50vh] rounded-xl w-full lg:w-1/3 bg-white px-5 pt-10 lg:pt-16 relative flex flex-col gap-8 h-[50vh]  lg:h-[50vh] animate-reveal group hover:scale-105 transition-all duration-400">
                        <h1 className="text-6xl font-semibold text-primary relative  z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">1500+ <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">Employees</h1>
                            <p className="w-[60%] lg:w-55">With over 150 experienced employees, we deliver quality and reliability every day.</p>

                        </div>

                        <Image src="/exp2.png" alt="Expertise Icon" width={180} height={80} className='w-60 absolute -bottom-0 -right-5 md:right-0 z-0' />

                    </div>

                    <div className="min-h-[55vh] md:min-h-[45vh] rounded-xl w-full lg:w-1/3 bg-white px-5 pt-10 lg:pt-16 relative flex flex-col gap-8 h-[50vh]  lg:h-[45vh] animate-reveal group hover:scale-105 transition-all duration-400">
                        <h1 className="text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">30+ <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">Global Sales</h1>
                            <p className=" w-[70%] lg:w-80 pr-0 lg:pr-4">We supplies products, services and solutions across over 30 countries in Australia, Asia, Africa, and the Middle East.</p>

                        </div>

                        <Image src="/exp3.png" alt="Expertise Icon" width={300} height={80} className=' absolute -bottom-0 right-0 z-0' />

                    </div>



                </div>

            </div>
        </div>
    )
}