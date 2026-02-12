'use client'

import { Badgetextblack, Badgetextwhite, Badge } from "../common/badge"
import { VideoPlayer } from "../common/video"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { products } from "../../assets/products"
import { Menu, ArrowRight, ArrowDown } from 'lucide-react';

export default function blogs() {
    const router = useRouter();
    return (
        <div>
            <div className="relative h-[80vh] max-h-[80vh] font-medium flex items-center justify-center font-sans dark:bg-black overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <VideoPlayer src="/moreabout.mp4" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)" }}></div>
                <h1 className="absolute top-[40%] w-[60%] z-20 text-6xl text-white font-inter flex flex-col items-center text-center gap-4">

                    <Badgetextwhite title="Our Products" />
                    Premium Copper Products With Precision Engineering

                </h1>
            </div>


            <div className=" relative overflow-hidden min-h-[70vh] flex flex-col justify-center items-center px-10 pt-20">
                <div className="absolute top-16  flex flex-col items-center gap-4">

                    <Badgetextblack title="What we produce" className="" />
                    <h1 className="flex flex-col justify-center items-center w-[85%] text-4xl mt-9  text-center leading-tight">
                        <span className="bg-gradient-to-r from-[#FF7A5C] to-[#8A8A8A] bg-clip-text text-transparent"> Union Copper Rod’s primary products are the 8mm, 12.5mm, copper rods </span>
                        <span className="text-[#8A8A8A]">that have at least 99.95% copper content and comply with international standards including BS: EN 1977 and ASTM-B49.</span>

                    </h1>

                </div>

                <Image src='/gradientcircle.png' alt="Icon" width={300} height={0} className="rotate-180 absolute overflow-hidden left-0 bottom-0" />

                <div className="relative bg-[url('/wireshadow.png')] bg-cover bg-center w-[60%]" >

                    <Image src="/weproduce.png" alt="Icon" width={900} height={0} className="object-cover w-full h-full" />
                </div>
            </div>


            <div className="bg-[#F5F4F4] min-h-screen flex flex-col items-center justify-center px-10 py-20 gap-10">

                {/* Header */}
                <div className="flex flex-col gap-1 items-center justify-center">
                    <Badge title="Collections" />
                    <h1 className="text-4xl font-bold  font-inter">Our Core Products</h1>
                </div>

                <div className="w-full px-10 ">
                    {/* Featured Product */}
                    <Link href={`/products/${products[0].slug}`}>
                        <div className="bg-[#FF6A00] rounded-lg p-8 mb-12 flex items-center justify-between hover:shadow-lg gap-6 transition-shadow cursor-pointer">
                            <div className="flex-1">
                                <p className="text-3xl font-medium text-white    mb-2">{products[0].sku}</p>
                                <h3 className="text-5xl font-semibold text-white mb-3">{products[0].name}</h3>
                                <p className="text-white/90 text-xl leading-relaxed ">{products[0].description}</p>
                            </div>
                            <div className="w-[22%] ml-8 bg-white rounded-lg ">
                                <Image src="/drawnwire.png" alt="Icon" width={300} height={300} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </Link>

                    {/* Products Grid */}
                    <div className="w-full">
                        {products.slice(1).map((product, idx) => (
                            <div key={product.id} className="text-[#5F5F66] bg-white rounded-xl p-8 mb-12 flex items-center justify-between hover:shadow-lg gap-6 transition-shadow cursor-pointer group">
                                <div className="w-[75%] py-7 ">
                                    <p className="text-3xl font-medium mb-2 group-hover:text-4xl transition-all duration-300 ease-in-out">{product.sku}</p>
                                    <h3 className="text-5xl font-semibold mb-3 group-hover:text-[#FE5D0A] leading-relaxed transition-all duration-600 ease-in-out">{product.name}</h3>
                                    <p className="text-lg group-hover:text-xl leading-relaxed transition-all duration-300 ease-in-out">{product.description}</p>

                                    <button onClick={() => router.push(`/products/${product.slug}`)} className="hidden group-hover:flex gap-2 items-center duration-300 bg-[#ff6e1a] hover:bg-[#FE5D0A] text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 ease-in-out mt-6">
                                        Details About Product
                                        <ArrowRight size={18} color='white' />
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* certifications */}

            <div className="relative min-h-screen mt-8">

                {/* header */}
                <div className="flex flex-col gap-4 sm:gap-5 items-center justify-center text-center py-12 sm:py-16 md:py-20 px-6">
                    <Badge title="Core Strength" />
                    <h1 className="font-medium text-3xl sm:text-4xl md:text-6xl mt-3 sm:mt-4 leading-tight w-[60%]">Our products meet global quality and safety standards.</h1>
                </div>


                <div className="w-full sm:w-[80%] md:w-[65%] flex items-center justify-center mx-auto px-6 sm:px-0">


                    <Image src="/certificate.png" alt="Icon" width={900} height={0} className="w-full object-cover  " />
                </div>

            </div>
            {/* cta */}

            <div className="min-h-[70vh] relative bg-[#272A2A] flex items-center  px-10 py-20 mt-8 rounded-lg overflow-hidden">

                <Image src='/gradientcircle.png' alt="Icon" width={900} height={0} className=" postion absolute top-6 left-0 rotate-180" />

                <Image src='/ctar.png' alt="Icon" width={900} height={0} className=" postion absolute top-0 right-0 w-[40%] object-contain" />


                <div className="w-[60%] p-9 text-white flex flex-col items-start justify-center gap-6 relative z-10">
                    <Badge title="Brocher" />
                    <h1 className="text-5xl">Download our brochure to discover our full capabilities, precision technologies, and quality-driven manufacturing approach.</h1>

                    <button className="mt-6 bg-white hover:bg-gray-100 text-black px-6 py-4 rounded-full font-semibold transition-all duration-300 ease-in-out flex items-center gap-2">Download Our Brocher<ArrowDown size={20} color='black' /></button>
                </div>
            </div>
        </div>
    )
}