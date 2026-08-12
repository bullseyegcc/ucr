'use client'

import { Badgetextblack, Badgetextwhite, Badge } from "../../common/badge"
import { VideoPlayer } from "../../common/video"
import Image from "next/image"
import Link from "next/link"
import { products } from "../../assets/products"
import { ArrowRight, ArrowDown } from 'lucide-react';
import UcrLaboratoryToolsSection from "../../components/technology/UcrLaboratoryToolsSection"
import ParallaxSection from "../../animations/ParallaxSection"
import FadeIn from "../../animations/FadeIn"
import SlideIn from "../../animations/SlideIn"
import TextReveal from "../../animations/TextReveal"

export default function blogs() {
    return (
        <div>
            <div className="relative min-h-[80vh] lg:min-h-[80vh] font-medium flex items-center justify-center   dark:bg-black overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <VideoPlayer src="/moreabout.mp4" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)" }}></div>
                <h1 className="w-[95%] lg:w-[60%] z-20 flex flex-col items-center gap-4 font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle text-white">

                    <SlideIn direction="bottom" duration={0.8} delay={0}>
                        <Badgetextwhite title="Products" />
                    </SlideIn>
                    <FadeIn duration={0.4} delay={0}>
                        Premium Copper Products With Precision Engineering
                    </FadeIn>

                </h1>
            </div>


            <ParallaxSection index={0}>
                <div className=" relative overflow-hidden min-h-screen lg:min-h-[90vh] lg:max-h-[90vh] flex flex-col justify-center lg:justify-start lg:pt-20 items-center px-2 lg:px-0 ">
                    <div className=" flex flex-col items-center gap-4">

                        <Badgetextblack title="What we produce" className="" />
                        <TextReveal className="w-full px-5 lg:px-10 lg:w-[85%] text-2xl lg:text-4xl mt-9 text-center leading-tight text-primary">
                            <h1 className="text-[24px] leading-[40px] tracking-[-1.4px] text-center font-normal lg:text-[42px] lg:leading-[64px] lg:tracking-[-1.4px]" style={{ fontFamily: 'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
                                Union Copper Rod's primary products are the 8mm, 12.5mm, copper rods that have at least 99.95% copper content and comply with international standards including BS: EN 1977 and ASTM-B49.
                            </h1>
                        </TextReveal>

                    </div>

                    <Image src='/gradientcircle.png' alt="Icon" width={300} height={0} className="rotate-180 hidden lg:block absolute overflow-hidden left-0 bottom-0" />

                    <div className="absolute  -left-60 lg:left-[15%] bottom-0  bg-[url('/wireshadow.png')] bg-cover bg-center w-[150%] lg:w-[60%]" >

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

                    <div className="w-full  px-2 lg:px-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                            {products.map((product) => {
                                return (
                                    <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                                        <article className="rounded-lg border border-[#EBEBEB] bg-[#FCFCFC] p-3 lg:p-[12px] min-h-[300px] transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,0,0,0.14)] hover:bg-[#FF6A00] hover:border-[#FF6A00]">
                                            <div className="h-full flex flex-col lg:flex-row items-stretch gap-5 lg:gap-4">
                                                <div className="flex-1 lg:w-[52%] px-3 pt-3 pb-4 lg:px-4 lg:pt-4 lg:pb-4 flex flex-col">
                                                    <p
                                                        className="font-normal text-[12px] leading-[16px] tracking-[0px] text-[#8B8B8B] transition-colors duration-300 group-hover:text-white/95"
                                                        style={{ fontFamily: 'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
                                                    >
                                                        {product.sku}
                                                    </p>

                                                    <h3
                                                        className="mt-4 font-medium text-[32px] leading-[40px] tracking-[-1.4px] lg:text-[38px] lg:leading-[48px] text-[#4B4B4B] transition-colors duration-300 group-hover:text-white"
                                                        style={{ fontFamily: 'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
                                                    >
                                                        {product.name}
                                                    </h3>

                                                    <p
                                                        className="mt-4 font-normal text-[16px] leading-[30px] tracking-[-0.25px] text-[#6F6F6F] transition-colors duration-300 group-hover:text-white/90"
                                                        style={{ fontFamily: 'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
                                                    >
                                                        {product.description}
                                                    </p>

                                                    <span
                                                        className="mt-6 inline-flex h-[70px] w-[278px] max-w-full items-center justify-center gap-2 rounded-[50px] border border-white bg-white text-[#2D2F33] opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:bg-[#FFF6F0]"
                                                        style={{ fontFamily: 'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
                                                    >
                                                        <span className="text-center font-normal text-[20px] leading-[29.4px] tracking-[-0.88px]">Details about product</span>
                                                        <ArrowRight size={18} color="#FF6A00" />
                                                    </span>
                                                </div>

                                                <div className="w-full lg:w-[48%] rounded-md overflow-hidden bg-white">
                                                    <FadeIn scrollTrigger={true} duration={1.2}>
                                                        <Image
                                                            src={product.icon || "/drawnwire.png"}
                                                            alt={product.name}
                                                            width={560}
                                                            height={360}
                                                            className="w-full h-full object-cover min-h-[190px] lg:min-h-[290px]"
                                                        />
                                                    </FadeIn>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                );
                            })}
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
