import { Badge } from "../common/badge"
import Image from "next/image"

export default function OurValues() {
    return (
        <div>
            <div className="flex flex-col text-center min-h-[80vh] items-center justify-center bg-[url('/valuebg.png')] bg-cover font-sans dark:bg-black gap-6">
                <Badge title="values" />
                <h1 className="text-6xl font-bold text-white font-inter">Our Values</h1>
            </div>

            {/* Trust & Reliability Section */}
            <div className="min-h-screen bg-gradient-to-b from-white via-[#FDD4BB] to-white px-10 py-20">
                <div className="w-full mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-12 mb-16">
                        <div className="flex-1">
                            <Badge title="Build on integrity, powered by innovation" />
                            <h1 className="text-5xl font-semibold text-black mt-6">Beyond copper, we build trust & reliability</h1>
                        </div>
                        <div className="flex-1 text-sm text-gray-600 pt-12">
                            <p>We don't just produce copper — we shape reliability, innovation, and sustainability into every product we deliver.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-[#FDF5F3] rounded-xl p-8 flex flex-col gap-6">
                            <Image src="/excel.png" alt="Icon" width={80} height={0} />
                            <div>
                                <h1 className="text-2xl font-semibold text-primary">Excel Always</h1>
                                <p className="text-secondary text-sm mt-3">We ensure that every product we make and service we offer reaches our clients with meticulous attention to detail and quality checks.</p>
                            </div>
                        </div>

                        <div className="bg-[#FDF5F3] rounded-xl p-8 flex flex-col gap-6">
                            <Image src="/path.png" alt="Icon" width={80} height={0} />
                            <div>
                                <h1 className="text-2xl font-semibold text-primary">Create New Paths</h1>
                                <p className="text-secondary text-sm mt-3">To ensure the best quality we embrace the best innovation. We aim to redefine industry benchmarks, and lead the way in developing smart, efficient solutions.</p>
                            </div>
                        </div>

                        <div className="bg-[#FDF5F3] rounded-xl p-8 flex flex-col gap-6">
                            <Image src="/reliable.png" alt="Icon" width={80} height={0} />
                            <div>
                                <h1 className="text-2xl font-semibold text-primary">Be Reliable</h1>
                                <p className="text-secondary text-sm mt-3">Our commitment to sustainability enhances our reliability. As trusted partners, we promise only the best in our supply chain and community engagements, fostering collective growth.</p>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    )
}