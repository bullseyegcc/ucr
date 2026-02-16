import { Badgetextwhite, Badge } from "../../common/badge"
import Image from "next/image"
import SuccessStrengthSection from "../../components/SuccessStrengthSection"
import TeamMemoriesSection from "../../components/TeamMemoriesSection"

export default function Team() {

    return (
        <div >
            <div className="relative flex min-h-[55vh] lg:min-h-[120vh] items-center pt-40 bg-black font-sans bg-primary flex flex-col gap-6 lg:gap-8 lg:gap-10 ">
                <Badgetextwhite title="Our Team " />
                <h1 className=" max-w-[80%] text-center text-3xl lg:text-5xl lg:text-7xl font-medium text-white">Meet the People Behind the Power of Copper</h1>
                <Image src='/vector.png' alt='Vector Image' width={1200} height={900} className="rotate-180 opacity-70 absolute bottom-10 left-1/2 transform -translate-x-1/2  object-contain w-1/3" />
                <Image src="/teamhero.png" alt="Team Image" width={1920} height={1080} className="w-full absolute bottom-0 object-center lg:object-cover rounded-lg " />
            </div>

            <div>
            </div>


            <div className="relative w-full overflow-x-hidden bg-[#F5F5F5]">

                <Image src="/gradientcircle.png" alt="Wave Image" width={1920} height={1080} className="w-[40%] absolute  top-80  right-0 opacity-70 z-0" />
                <div className="relative z-10">
                    <SuccessStrengthSection />
                </div>

                {/* our people */}
                <div className="px-5 lg:px-10 relative z-10">
                    {/* Header */}
                    <div className="flex py-12 flex-col  lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-28 mb-12 lg:mb-16">
                        <div className="flex-1">
                            <Badge title="Core Strength" />
                            <h1 className="text-4xl lg:text-5xl font-semibold text-black mt-4 lg:mt-6 leading-tight lg:leading-snug">Our people</h1>
                        </div>
                        <div className="flex-1 lg:w-1/2 text-xs lg:text-sm text-gray-600 lg:pt-12">
                            <p className="w-full text-xl">Our team represents decades of industrial mastery and modern innovation. Each member contributes deep technical knowledge, precision, and a shared commitment to sustainable growth. </p>
                        </div>
                    </div>


                    {/* Team Members Grid */}
                    {/* cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  py-8 justify-center">

                        {/* card 1 */}
                        <div className="h-full">
                            <Image src="/chairman.png" alt="Team member" width={1000} height={1000} className="w-full rounded-lg object-contain" />

                            <h1 className="text-2xl lg:text-3xl mt-2 font-medium">Diam O'Sullivan</h1>
                            <p className="text-primary lg:text-2xl font-light">Honorable Chairman</p>
                        </div>

                        {/* card 2 */}
                        <div className="h-full items-center">
                            <Image src="/cofounder.png" alt="Team member" width={1000} height={1000} className=" w-full rounded-lg object-contain" />

                            <h1 className="text-2xl lg:text-3xl mt-2 font-medium">Diam O'Sullivan</h1>
                            <p className="text-primary lg:text-2xl font-light">Honorable Chairman</p>
                        </div>

                        {/* card 2 */}
                        <div className="h-full">
                            <Image src="/cheftechnology.png" alt="Team member" width={1000} height={1000} className=" w-full rounded-lg object-contain" />

                            <h1 className="text-2xl lg:text-3xl mt-2 font-medium">Diam O'Sullivan</h1>
                            <p className="text-primary lg:text-2xl font-light">Honorable Chairman</p>
                        </div>
                    </div>





                </div>



            </div>
            {/* quote section  */}

            <div className="min-h-[60vh] lg:min-h-[80vh] rounded-t-lg bg-[linear-gradient(174deg,#FA6E43_-22.99%,#FFF_94.94%)] flex flex-col items-center justify-center gap-4 lg:gap-6 px-6 text-center py-12 lg:py-20">

                <div className="flex flex-col w-full lg:w-[80%]">

                    <Image src="/quote.png" alt="Icon" width={40} height={0} className="w-8 lg:w-[60px]" />
                    <p className="pl-3 lg:pl-5 text-lg lg:text-3xl italic leading-relaxed">At UCR, we are grounded in vision, trust, and a commitment to excellence. We believe success is measured not just by financial gains but by the positive impact we have on our communities and future generations.We have broadened our investments across various sectors with a clear strategy. As global markets change, we remain focused on responsible growth, continuous innovation, and delivering lasting value.</p>
                    <Image src="/quote.png" alt="Icon" width={40} height={0} className="self-end w-8 lg:w-[60px]" />

                </div>

                <div className="flex flex-col justify-center items-center gap-2 lg:gap-4">
                    <Image src='/diamsign.png' alt="Icon" width={150} height={0} className="w-24 lg:w-[150px]" />
                    <h1 className="text-2xl lg:text-4xl font-medium">Diam O'Sullivan</h1>
                    <p className="text-base lg:text-2xl font-light">Honorable Chairman</p>
                </div>



            </div>

            <TeamMemoriesSection />
        </div>
    )
}
