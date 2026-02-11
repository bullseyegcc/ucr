import { VideoPlayer } from "../common/video";
import { Badge, Badgetextwhite } from "../common/badge";
import Image from "next/image";

export default function Logistics() {
    return (
        <div className="bg-[#F5F5F5]">

            {/* header */}
            <div className=" mb-[30%] bg-[url('/logisticsbg.png')]  bg-cover  bg-bottom bg-no-repeat relative flex min-h-[80vh] items-center pt-46 bg-black font-sans bg-primary flex flex-col gap-10">

                <Badgetextwhite title="Our Logistics" />

                <h1 className=" w-[70%]  text-center text-5xl font-bold text-white font-inter leading-tight">UCR has a higher delivery capacity in the Copper Industry</h1>
                <div className='absolute -bottom-[55%] w-[75%] h-[70vh] w-[95%] ' >
                    <VideoPlayer src="/logisticsvid.mp4" className="rounded-4xl " />
                </div>



            </div>


            {/* What we're Capable of */}

            <div className="bg-[#F5F5F5]">
                {/* header */}
                <div className="flex flex-col items-center justify-center text-center py-10 pb-20 ">
                    <Badge title="Strength" />
                    <h1 className="font-medium text-6xl mt-4">What we're capable of</h1>
                </div>


                <div className=" px-10 py-10 flex justify-center gap-6 items-end">

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




                <div className=" px-10 py-10 flex justify-center gap-6 items-end">

                    <div className="h-[45vh] rounded-xl w-[30%] bg-white px-5 pt-16 relative flex flex-col gap-8">
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

                    <div className="h-[55vh] rounded-xl w-[30%] bg-white px-5 pt-16 relative flex flex-col gap-8">
                        <h1 className="text-6xl font-semibold text-primary relative z-10 flex flex-col gap-4 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">30+ <hr className="text-primary/30 w-[90%] shadow  " /></h1>


                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">Global Sales</h1>
                            <p className=" w-80 pr-4">We supplies products, services and solutions across over 30 countries in Australia, Asia, Africa, and the Middle East  </p>

                        </div>

                        <Image src="/globalsales.png" alt="Expertise Icon" width={240} height={80} className=' absolute -bottom-0 right-0 z-0' />

                    </div>



                </div>
            </div>



            <div className="min-h-screen bg-white  pt-20 flex flex-col items-center justify-center ">

                {/* Header */}
                <div className="flex px-10 flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
                    
                    <div className="flex-1">
                        <h1 className='text-lg md:text-xl lg:text-2xl text-primary font-helvetica'>Global Presence</h1>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mt-4 md:mt-5 lg:mt-6 leading-tight md:leading-snug">Global Reach</h1>
                    </div>

                    <div className="  self-end flex-1 text-xs md:text-sm text-gray-600 md:pt-8 lg:pt-12">
                        <p className=' text-xl'>We don't just produce copper — we shape reliability, innovation, and sustainability into every product we deliver.</p>
                    </div>
                </div>

                <div className="w-full h-screen relative z-50">

                    <VideoPlayer src="/globalpresence.mp4" className="" />

                </div>
            </div>

            <div className="relative flex flex-col justify-center pt-20   items-center min-h-screen ">

                <Image src="/gradientcircle.png" alt="Logistics End Image" width={900} height={200} className="absolute -top-200 -right-100 w-[90vw] z-0 " />

                <Image src="/vector.png" alt="Logistics End Image" width={300} height={0} className="absolute -top-20 -right-10 z-0 " />

                <div className="w-full text-left px-10">
                    <h1 className='text-lg md:text-xl lg:text-2xl text-primary font-helvetica uppercase'>Global Presence</h1>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mt-2 md:mt-5 lg:mt-2 leading-tight md:leading-snug">Global Reach</h1>
                </div>


                {/* wrapper */}
                <div className="flex flex-row gap-8 w-full mt-20 px-10 z-900 ">

                    {/* column 1 */}
                    <div className="w-1/3 flex flex-col gap-10 ">

                        {/* card 1 */}
                        <div className="border-t-2 border-primary flex gap-9 pt-9 ">

                            <h1 className="text-primary text-6xl">01</h1>

                            <div className="flex flex-col gap-4">
                                <h1 className="text-2xl font-semibold ">Higher Delivery Capacity</h1>
                                <p className="text-lg">UCR’s state-of-the-art facility is Middle East’s largest independent copper rod-producing mill with a capacity exceeding 200,000 metric tons per annum.
                                </p>
                            </div>


                        </div>

                        {/* card 3 */}

                        <div className="border-t-2 border-secondary hover:border-primary flex gap-5 pt-9 ">

                            <h1 className="text-secondary hover:text-primary text-6xl">03</h1>

                            <div className="flex flex-col gap-4">
                                <h1 className="text-2xl font-semibold ">Higher Delivery Capacity</h1>
                                <p className="text-lg">UCR’s state-of-the-art facility is Middle East’s largest independent copper rod-producing mill with a capacity exceeding 200,000 metric tons per annum.
                                </p>
                            </div>


                        </div>

                    </div>

                    {/* column 2 */}
                    <div className="w-1/3 flex flex-col gap-10 ">
                       
                       {/* card 2 */}
                        <div className="border-t-2 border-primary flex gap-5 pt-9 ">

                            <h1 className="text-primary text-6xl">02</h1>

                            <div className="flex flex-col gap-4">
                                <h1 className="text-2xl font-semibold ">Higher Delivery Capacity</h1>
                                <p className="text-lg">UCR’s state-of-the-art facility is Middle East’s largest independent copper rod-producing mill with a capacity exceeding 200,000 metric tons per annum.
                                </p>
                            </div>


                        </div>

{/* card 4 */}
                        <div className="border-t-2 border-secondary hover:border-primary flex gap-5 pt-9 ">

                            <h1 className="text-secondary hover:text-primary text-6xl">03</h1>

                            <div className="flex flex-col gap-4">
                                <h1 className="text-2xl font-semibold ">Higher Delivery Capacity</h1>
                                <p className="text-lg">UCR’s state-of-the-art facility is Middle East’s largest independent copper rod-producing mill with a capacity exceeding 200,000 metric tons per annum.
                                </p>
                            </div>


                        </div>

                    </div>

                    <div className="w-1/3 h-[80vh] bg-[url('/advantagecol3.png')] bg-cover  bg-bottom bg-no-repeat">

                    </div>

                </div>



            </div>

        </div>

    )
}