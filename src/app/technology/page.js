import Image from "next/image"
import { VideoPlayer } from "../common/video"
import { Badgetextblack } from "../common/badge"

export default function Technology() {
    return (
        <div className="bg-[#F2F2F2]">
            <div className="relative flex h-[50vh] sm:h-[60vh] md:h-[80vh] max-h-[80vh] font-medium justify-center bg-black font-sans dark:bg-black">
                <VideoPlayer src="/technologybg.mp4" className="absolute inset-0 object-cover w-full h-full z-0" />
                <div className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.35)0%,rgba(0,0,0,0.35)100%)] pointer-events-none" />
                <h1 className="absolute top-[35%] md:top-[40%] z-20 text-3xl md:text-6xl text-white font-inter text-center w-full px-4">UCR shapping the future</h1>
            </div>

            {/* Header */}
            <div className="relative flex flex-col px-6 sm:px-10 py-12 md:py-20 md:flex-row md:justify-between md:items-start gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
                <div className="flex-1 sm:mb-30">
                    <Badgetextblack title="Top notch Technology" />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mt-4 md:mt-5 lg:mt-6 leading-tight md:leading-snug">Precision Crafted
                        Copper Excellence</h1>
                </div>
                <div className="flex-1  flex md:justify-end text-xs md:text-sm text-gray-600 md:pt-8 lg:pt-12">
                    <p className='w-4/5 text-xl'>Cutting-edge technology meets traditional craftsmanship. Discover how we're reshaping the future of copper manufacturing.</p>
                </div>
                <Image src="/technologyheaderbottom.png" alt="Icon" width={900} height={0} className="w-full absolute bottom-0  " />

            </div>

            {/* cards */}

            {/* card one  */}
            <div className="bg-white px-6 sm:px-8 md:px-10 rounded-xl min-h-screen md:min-h-[80vh] mx-6 sm:mx-8 md:mx-10">

                {/* card header */}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8 md:py-12">
                    <h1 className="text-primary text-2xl sm:text-3xl md:text-4xl font-medium uppercase">South Wire Technology</h1>

                    <h1 className="text-secondary text-xl sm:text-2xl md:text-4xl font-semibold text-black leading-tight md:leading-snug whitespace-nowrap">01/<span className="text-secondary">02</span></h1>
                </div>

                {/* content */}

                <div className="w-full flex flex-col md:flex-row border-t border-secondary/40">
                    {/* left side */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-20 py-6 md:py-9">
                        <p className="text-base md:text-xl lg:text-2xl">UCR firmly believes that the primary advantage of any advanced technology lies in its ability to seamlessly enhance operational efficiency, ultimately leading to increased productivity. This boost not only empowers employees but also improves the quality and quantity of products produced.

                        </p>

                        <p className="text-base md:text-xl lg:text-2xl">As the largest facility of its kind in the Middle East, UCR boasts an impressive rod production capacity of over 200,000 metric tons annually. To manufacture its top-tier copper rods, UCR employs the state-of-the-art Southwire Continuous Rod Casting Technology from the United States, ensuring outstanding quality and performance.</p>
                    </div>

                    {/* right side */}
                    <div className="w-full md:w-1/2">
                        <Image src="/southwire.png" alt="Icon" width={500} height={0} className="w-full h-full object-cover rounded-none md:rounded-r-xl p-4 md:p-6 lg:p-8" />
                    </div>
                </div>
            </div>

            {/* card two */}
            <div className="text-white my-2 bg-[#272A2A] px-6 sm:px-8 md:px-10 rounded-xl min-h-screen md:min-h-[80vh] mx-6 sm:mx-8 md:mx-10">

                {/* card header */}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8 md:py-12">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-medium uppercase">Copper treatments </h1>

                    <h1 className="text-secondary text-xl sm:text-2xl md:text-4xl font-semibold text-black leading-tight md:leading-snug whitespace-nowrap">02/<span className="text-secondary">03</span></h1>
                </div>

                {/* content */}

                <div className="w-full flex flex-col md:flex-row border-t border-secondary/40">
                    {/* left side */}
                    <div className="w-full md:w-[60%] flex flex-col gap-6 md:gap-20 py-6 md:py-9">
                        <p className="text-base md:text-xl lg:text-2xl">UCR firmly believes that the primary advantage of any advanced technology lies in its ability to seamlessly enhance operational efficiency, ultimately leading to increased productivity. This boost not only empowers employees but also improves the quality and quantity of products produced.

                        </p>

                        <p className="text-base md:text-xl lg:text-2xl">As the largest facility of its kind in the Middle East, UCR boasts an impressive rod production capacity of over 200,000 metric tons annually. To manufacture its top-tier copper rods, UCR employs the state-of-the-art Southwire Continuous Rod Casting Technology from the United States, ensuring outstanding quality and performance.</p>


                        <h1 className="py-4 text-base md:text-lg text-primary font-medium underline">Read More</h1>
                    </div>

                    {/* right side */}
                    <div className="w-full md:w-[40%]">
                        <Image src="/coppertreatment.png" alt="Icon" width={500} height={0} className="w-full h-full object-cover rounded-none md:rounded-r-xl p-4 md:p-6 lg:p-8" />
                    </div>
                </div>
            </div>

            {/* card three  */}
            <div className="bg-white px-6 sm:px-8 md:px-10 rounded-xl min-h-screen md:min-h-[80vh] mx-6 sm:mx-8 md:mx-10">

                {/* card header */}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8 md:py-12">
                    <h1 className="text-primary text-2xl sm:text-3xl md:text-4xl font-medium ">NexGen Sol</h1>
                    <h1 className="text-secondary text-xl sm:text-2xl md:text-4xl font-semibold text-black leading-tight md:leading-snug whitespace-nowrap">03/<span className="text-secondary">03</span></h1>
                </div>

                {/* content */}

                <div className="w-full flex flex-col md:flex-row border-t border-secondary/40">
                    {/* left side */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-20 py-6 md:py-9">
                        <p className="text-base md:text-xl lg:text-2xl">UCR firmly believes that the primary advantage of any advanced technology lies in its ability to seamlessly enhance operational efficiency, ultimately leading to increased productivity. This boost not only empowers employees but also improves the quality and quantity of products produced.

                        </p>

                        <p className="text-base md:text-xl lg:text-2xl">As the largest facility of its kind in the Middle East, UCR boasts an impressive rod production capacity of over 200,000 metric tons annually. To manufacture its top-tier copper rods, UCR employs the state-of-the-art Southwire Continuous Rod Casting Technology from the United States, ensuring outstanding quality and performance.</p>
                    </div>

                    {/* right side */}
                    <div className="w-full md:w-1/2">
                        <Image src="/nextgensol.png" alt="Icon" width={500} height={0} className="w-full h-full object-cover rounded-none md:rounded-r-xl p-4 md:p-6 lg:p-8" />
                    </div>
                </div>
            </div>

            {/* cards end */}



            {/* laboratory */}

            <div className="flex min-h-[80vh] flex-col px-10 items-center justify-center py-20">

                <Badgetextblack title="UCR Laboratory" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mt-4 md:mt-5 lg:mt-6 leading-tight md:leading-snug">Equipment used in the testing process</h1>


                {/* cards */}
                <div className="flex flex-wrap gap-6 py-8 justify-center">

                    {/* card 1 */}
                    <div className="flex flex-col gap-2 w-full sm:w-[48%] md:w-[32%]">

                        <Image src="/lab1.png" alt="Icon" width={480} height={0} className="object-contain rounded-xl " />
                        <div className="relative">
                            <span aria-hidden="true" className="absolute -left-0 -top-0 w-3 h-3 bg-[#FF6A00] rounded-full shadow-sm" />
                            <h1 className="text-xl font-medium text-gray-500 pl-4 ml-2">LECO Oxygen Analyzer</h1>
                        </div>

                    </div>

                    {/* card 2 */}
                    <div className="flex flex-col gap-2 w-full sm:w-[48%] md:w-[32%] mt-6 sm:mt-8">

                        <Image src="/lab2.png" alt="Icon" width={480} height={0} className="object-contain rounded-xl " />
                        <div className="relative">
                            <span aria-hidden="true" className="absolute -left-0 -top-0 w-3 h-3 bg-[#FF6A00] rounded-full shadow-sm" />
                            <h1 className="text-xl font-medium text-gray-500 pl-4 ml-2">LECO Oxygen Analyzer</h1>
                        </div>

                    </div>

                    {/* card 3   */}
                    <div className="flex flex-col gap-2 w-full sm:w-[48%] md:w-[32%] mt-6 sm:mt-16">

                        <Image src="/lab3.png" alt="Icon" width={400} height={0} className="object-contain rounded-xl " />
                        <div className="relative">
                            <span aria-hidden="true" className="absolute -left-0 -top-0 w-3 h-3 bg-[#FF6A00] rounded-full shadow-sm" />
                            <h1 className="text-xl font-medium text-gray-500 pl-4 ml-2">LECO Oxygen Analyzer</h1>
                        </div>

                    </div>

                </div>



            </div>
        </div>
    )
}