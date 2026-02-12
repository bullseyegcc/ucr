import Image from "next/image"
import { Badgetextblack, Badgetextwhite, Badge } from "../common/badge"

export default function Quality() {
    return (
        <div>

            {/* header */}
            <div className="rounded-b-xl flex flex-col text-center min-h-[50vh] sm:min-h-[60vh] md:min-h-[80vh] items-center justify-center font-sans dark:bg-black gap-6 px-6" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/qualitybg.png') lightgray 50% / cover no-repeat" }}>
                <Badgetextwhite title="Premium Quality Assured" />
                <h1 className="w-full sm:w-[90%] md:w-[80%] text-3xl sm:text-5xl md:text-7xl font-medium text-white font-inter">Quality is our foundation</h1>
            </div>


            {/* certifications */}

            <div className="relative min-h-screen bg-[rgba(255,255,255,0.77)]">

                {/* header */}
                <div className="flex flex-col gap-4 sm:gap-5 items-center justify-center text-center py-12 sm:py-16 md:py-20 px-6">
                    <p className="text-base sm:text-lg md:text-xl text-primary font-medium">Certified Excellence. Trusted Worldwide.</p>
                    <h1 className="font-medium text-3xl sm:text-4xl md:text-6xl mt-3 sm:mt-4 leading-tight">Our Key Certifications</h1>
                    <p className="w-full sm:w-[70%] md:w-[60%] text-base sm:text-lg md:text-xl"> Our certifications stand as proof of our unwavering dedication to quality, safety, and sustainability. Each ISO achievement reflects the precision and responsibility that define every stage of our copper production.</p>
                </div>


                <div className="w-full sm:w-[80%] md:w-[65%] flex items-center justify-center mx-auto px-6 sm:px-0">

                    <Image src='/gradientcircle.png' alt="Icon" width={400} height={0} className="w-full object-cover postion absolute overflow-hidden left-0 top-0" />

                    <Image src="/certificate.png" alt="Icon" width={900} height={0} className="w-full object-cover  " />
                </div>

            </div>
            {/* Achivements */}

            <div className="relative z-20 flex min-h-screen md:min-h-[80vh] flex-col gap-10 sm:gap-12 md:gap-16 items-center justify-center py-12 sm:py-16 md:py-20 my-8 sm:my-12  bg-[#FFF8F4] backdrop-blur-sm px-6">

                <div className="flex flex-col items-center text-center">
                    <Badgetextblack title="More certifications" />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black mt-3 sm:mt-4 md:mt-5 lg:mt-6 leading-tight md:leading-snug">We've also achieved so far</h1>

                </div>

                {/* cards */}
                <div className="relative px-6 sm:px-8 md:px-10 pb-12 sm:pb-16 md:pb-20 flex flex-wrap gap-4 sm:gap-6 py-6 sm:py-8 justify-center pt-6 sm:pt-9">

                    {/* card 1 */}
                    <div className="flex flex-col gap-2 w-full sm:w-[48%] md:w-[32%]">

                        <Image src="/q1.png" alt="Icon" width={480} height={0} className="object-cover rounded-xl" />


                    </div>

                    {/* card 2 */}
                    <div className="flex flex-col gap-2 w-full sm:w-[48%] md:w-[32%] mt-4 sm:mt-0">

                        <Image src="/q2.png" alt="Icon" width={480} height={0} className="object-cover rounded-xl" />


                    </div>

                    {/* card 3   */}
                    <div className="flex flex-col gap-2 w-full sm:w-[48%] md:w-[32%] mt-4 sm:mt-0">

                        <Image src="/q3.png" alt="Icon" width={400} height={0} className="object-cover rounded-xl" />


                    </div>

                    <Image src="/orangebottom.png" alt="Icon" width={900} height={0} className="w-full absolute bottom-0" />


                </div>



            </div>


            <div className="min-h-[80vh] rounded-t-lg bg-[linear-gradient(174deg,#FA6E43_-22.99%,#FFF_94.94%)] flex flex-col items-center justify-center gap-6 px-6 text-center py-20">

                <div className="flex flex-col w-[80%] ">

                    <Image src="/quote.png" alt="Icon" width={60} height={0} className="" />
                    <p className=" pl-5 text-3xl italic">At UCR, we are grounded in vision, trust, and a commitment to excellence. We believe success is measured not just by financial gains but by the positive impact we have on our communities and future generations.We have broadened our investments across various sectors with a clear strategy. As global markets change, we remain focused on responsible growth, continuous innovation, and delivering lasting value.</p>
                     <Image src="/quote.png" alt="Icon" width={60} height={0} className="self-end" />

                </div>

                <div className="flex flex-col justify-center items-center">
                    <Image src='/diamsign.png' alt="Icon" width={150} height={0} className=" " />
                    <h1 className="text-4xl font-medium">Diam O'Sullivan</h1>
                    <p className="text-2xl font-light">Honorable Chairman</p>
                </div>

            </div>
        </div>
    )
}