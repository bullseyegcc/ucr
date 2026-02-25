'use client'

import { Badgetextblack, Badgetextwhite, Badge } from "../../common/badge"
import { VideoPlayer } from "../../common/video"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { products } from "../../assets/products"
import { Menu, ArrowRight, ArrowDown } from 'lucide-react';
import UcrLaboratoryToolsSection from "../../components/technology/UcrLaboratoryToolsSection"
import ParallaxSection from "../../animations/ParallaxSection"
import FadeIn from "../../animations/FadeIn"
import SlideIn from "../../animations/SlideIn"
import TextReveal from "../../animations/TextReveal"

export default function blogs() {
    const router = useRouter();
    return (
        <div>
            <div className="relative max-h-[60vh] min-h-[80vh] font-medium flex items-center justify-center font-sans dark:bg-black overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <VideoPlayer src="/moreabout.mp4" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)" }}></div>
                <h1 className="absolute top-[40%]  lg:w-[60%] w-[95%]  z-20 text-3xl lg:text-6xl text-white flex flex-col items-center text-center gap-4">

                    <SlideIn direction="bottom" duration={0.8} delay={0}>
                        <Badgetextwhite title="Our Products" />
                    </SlideIn>
                    <FadeIn duration={0.4} delay={0}>
                        Premium Copper Products With Precision Engineering
                    </FadeIn>

                </h1>
            </div>


            <ParallaxSection index={0}>
                <div className=" relative overflow-hidden min-h-[80vh] flex flex-col justify-center items-center px-5 lg:px-10 pt-20">
                    <div className="absolute top-16  flex flex-col items-center gap-4">

                        <Badgetextblack title="What we produce" className="" />
                        <TextReveal className="w-full px-5 lg:px-40 lg:w-[85%] text-2xl lg:text-4xl mt-9 text-center leading-tight text-primary">
                            Union Copper Rod's primary products are the 8mm, 12.5mm, copper rods that have at least 99.95% copper content and comply with international standards including BS: EN 1977 and ASTM-B49.
                        </TextReveal>

                    </div>

                    <Image src='/gradientcircle.png' alt="Icon" width={300} height={0} className="rotate-180 hidden lg:block absolute overflow-hidden left-0 bottom-0" />

                    <div className="absolute  -left-60 bottom-0 lg:relative lg:left-0 bg-[url('/wireshadow.png')] bg-cover bg-center w-[150%] lg:w-[60%]" >

                        <Image src="/weproduce.png" alt="Icon" width={900} height={0} className="object-cover w-full h-full" />
                    </div>
                </div>
            </ParallaxSection>


            <ParallaxSection index={1}>
                <div className="bg-[#F5F4F4] min-h-screen flex flex-col items-center justify-center lg:px-10 py-20 gap-10">

                    {/* Header */}
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <Badge title="Collections" />
                        <h1 className=" text-3xl lg:text-5xl mt-4 font-medium text-center">Our Core Products</h1>
                    </div>

                    <div className="w-full px-2 lg:px-10 ">
                        {/* Featured Product */}
                        <Link href={`/products/${products[0].slug}`}>
                            <div className=" bg-[#FF6A00] rounded-lg p-8 mb-12 flex flex-col lg:flex-row items-center justify-between hover:shadow-lg gap-9 lg:gap-6 transition-shadow cursor-pointer">
                                <div className="flex-1 flex flex-col gap-5 lg:w-[50%]">
                                    <p className="text-3xl font-medium text-white    mb-2">{products[0].sku}</p>
                                    <h3 className="text-5xl font-semibold text-white mb-3">{products[0].name}</h3>
                                    <p className="text-white/90 text-xl leading-relaxed ">{products[0].description}</p>
                                       <button
                                    onClick={() => router.push(`/products/${products[0].slug}`)}
                                    className="w-60 flex gap-2 items-center duration-300 bg-white hover:bg-gray-100 text-primary px-6 py-4 rounded-full font-semibold transition-all duration-300 ease-in-out mt-6"
                                >
                                    Details About Product
                                    <ArrowRight size={18} color='#FF6A00' />
                                </button>
                               </div>
                                <div className="w-full lg:w-[22%] lg:ml-8 bg-white rounded-lg ">
                                    <Image src="/drawnwire.png" alt="Icon" width={300} height={300} className="w-full h-full object-cover" />
                                </div>
                              
                            </div>
                        </Link>

                        {/* Products Grid */}
                        <div className="w-full">
                            {products.slice(1).map((product, idx) => (
                                <div
                                    key={product.id}
                                    className={
                                        `relative group text-[#5F5F66] bg-white rounded-lg p-8 mb-12 flex flex-col lg:flex-row items-center justify-between gap-9 lg:gap-6 transition-all duration-700 ease-in-out cursor-pointer overflow-hidden ` +
                                        `hover:bg-[#FF6A00] hover:shadow-lg ` +
                                        `lg:bg-white ` +
                                        `lg:text-[#5F5F66] ` +
                                        `lg:hover:bg-[#FF6A00] lg:hover:shadow-lg ` +
                                        `mobile:bg-[#FF6A00] mobile:shadow-lg mobile:text-white`
                                    }
                                >
                                    <div className="flex-1 flex flex-col gap-5 w-full lg:w-auto">
                                        <p className="text-3xl font-medium mb-2 transition-all duration-700 ease-in-out group-hover:text-white lg:group-hover:text-white mobile:text-white">{product.sku}</p>
                                        <h3 className="text-5xl font-semibold mb-3 transition-all duration-700 ease-in-out group-hover:text-white lg:group-hover:text-white mobile:text-white">{product.name}</h3>
                                        <p className="text-lg leading-relaxed transition-all duration-700 ease-in-out group-hover:text-white/90 lg:group-hover:text-white/90 mobile:text-white/90">{product.description}</p>

                                        <button
                                            onClick={() => router.push(`/products/${product.slug}`)}
                                            className="w-60 flex gap-2 items-center border border-primary lg:border-0 bg-white hover:bg-gray-100 text-primary px-6 py-4 rounded-full font-semibold transition-all duration-700 ease-in-out mt-6 lg:hidden group-hover:flex mobile:flex"
                                        >
                                            Details About Product
                                            <ArrowRight size={18} color='#FF6A00' />
                                        </button>
                                    </div>
                                    <div className="w-full lg:w-[22%] lg:ml-8 bg-white rounded-lg transition-all duration-700 ease-in-out block group-hover:block mobile:block lg:hidden">
                                        <Image src="/drawnwire.png" alt="Icon" width={300} height={300} className="w-full h-full object-cover transition-all duration-700 ease-in-out" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </ParallaxSection>

            {/* certifications */}

            <ParallaxSection index={2}>
                <div className="relative min-h-[60vh] lg:min-h-screen mt-8">

                    {/* header */}
                    <div className="flex flex-col gap-4 sm:gap-5 items-center justify-center text-center py-12 sm:py-16 lg:py-20 px-6">
                        <SlideIn direction="bottom" scrollTrigger={true} duration={0.8}>
                            <Badge title="Core Strength" />
                        </SlideIn>
                        <FadeIn className="font-medium text-3xl sm:text-4xl lg:text-6xl mt-3 sm:mt-4 leading-tight lg:w-[60%]" scrollTrigger={true} duration={0.8}>
                            <h1>Our products meet global quality and safety standards.</h1>
                        </FadeIn>
                    </div>


                    <div className="w-full sm:w-[80%] lg:w-[65%] flex items-center justify-center mx-auto px-6 sm:px-0">


                        <Image src="/certificate.png" alt="Icon" width={900} height={0} className="w-full object-cover  " />
                    </div>

                </div>
            </ParallaxSection>
            {/* cta */}

            <ParallaxSection index={3}>
                <div className="min-h-[85vh] px-4 pl-4 lg:pl-0 lg:min-h-[60vh] lg:min-h-[70vh] relative bg-[#272A2A] flex lg:flex-row flex-col-reverse  justify-center lg:justify-start   items-center   lg:px-10 lg:py-20 mt-8 rounded-lg overflow-hidden">

                    <Image src='/gradientcircle.png' alt="Icon" width={1200} height={0} className="  h-[90vh]  top-[0%]  absolute top-[26%]   bottom-0 right-20  top-6 left-0 lg:right-0 lg:rotate-180" />

                    <Image src='/ctar.png' alt="Icon" width={900} height={0} className=" absolute bottom-0 h-[55%] lg:top-0 -right-30 lg:w-[40%] lg:h-full object-cover" />


                    <SlideIn direction="left" scrollTrigger={true} duration={0.8} className="lg:w-[60%]   p-5 lg:p-9 text-white flex flex-col items-start justify-between lg:justify-center gap-6 relative z-10">
                        <Badge title="Brocher" />
                        <h1 className="text-3xl lg:text-5xl pr-2">Download our brochure to discover our full capabilities, precision technologies, and quality-driven manufacturing approach.</h1>

                        <button className="self-center lg:self-start text-xl text-center w-80  mt-[34vh] lg:mt-6 bg-white hover:bg-gray-100 text-black px-6 py-6 lg:py-4 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center  gap-2">Download Our Brocher<ArrowDown size={24} color='black' /></button>
                    </SlideIn>
                </div>
            </ParallaxSection>

            <ParallaxSection index={4}>
                <UcrLaboratoryToolsSection />
            </ParallaxSection>

        </div>
    )
}
