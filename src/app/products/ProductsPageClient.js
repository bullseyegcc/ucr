'use client'

import { Badgetextblack, Badge } from "../../common/badge"
import Hero from "@/components/shared/Hero"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowDown } from 'lucide-react';
import UcrLaboratoryToolsSection from "../../components/technology/UcrLaboratoryToolsSection"
import ParallaxSection from "../../animations/ParallaxSection"
import SlideIn from "../../animations/SlideIn"
import FadeIn from "../../animations/FadeIn";
import ScrollReveal from "../../animations/ScrollReveal"

export default function ProductsPageClient({ products = [] }) {
    return (
        <div>
            <Hero
                badge="Products"
                title="Premium Copper Products With Precision Engineering"
                badgeInTitle
                titleWrapperClass="w-[95%] lg:w-[60%] z-20 flex flex-col items-center gap-4 font-medium"
                className="font-medium flex items-center justify-center dark:bg-black"
                minHeightClass="min-h-[80vh] lg:min-h-[80vh]"
                contentClassName="relative z-20"
                background={{
                    type: "video",
                    src: "/moreabout.mp4",
                    overlay: "gradient-20",
                }}
            />


            <ParallaxSection index={0}>
                <div className=" relative overflow-hidden min-h-screen lg:min-h-[90vh] lg:max-h-[90vh] flex flex-col justify-center lg:justify-start lg:pt-20 items-center px-2 lg:px-0 ">
                    <div className=" flex flex-col items-center gap-4">

                        <Badgetextblack title="What we produce" className="" />
                        <div className="w-full px-5 lg:px-10 lg:w-[85%] mt-9">
                            <ScrollReveal
                                as="h1"
                                baseOpacity={0.5}
                                enableBlur
                                baseRotation={0}
                                blurStrength={0.5}
                                containerClassName="w-full text-center text-primary text-[24px] leading-[40px] tracking-[-1.4px] font-normal lg:text-[42px] lg:leading-[64px] lg:tracking-[-1.4px]"
                            >
                                Union Copper Rod&apos;s primary products are the 8mm, 12.5mm, copper rods that have at least 99.95% copper content and comply with international standards including BS: EN 1977 and ASTM-B49.
                            </ScrollReveal>
                        </div>

                    </div>

                    <Image src='/gradientcircle.png' alt="" width={300} height={300} className="rotate-180 hidden lg:block absolute overflow-hidden left-0 bottom-0" loading="lazy" />

                    <div className="absolute  -left-60 lg:left-[15%] bottom-0  bg-[url('/wireshadow.png')] bg-cover bg-center w-[150%] lg:w-[60%]" >

                        <Image src="/weproduce.png" alt="We produce" width={900} height={600} className="object-cover w-full h-full" loading="lazy" quality={75} />
                    </div>
                </div>
            </ParallaxSection>


            <section className="relative w-full bg-[#F5F4F4] min-h-screen flex flex-col items-center justify-center lg:px-10 py-20 gap-10">

                    {/* Header */}
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <Badge title="Collections" />
                        <h1 className="text-3xl lg:text-5xl mt-4 font-medium text-center">Our core products</h1>
                    </div>

                    <div className="w-full px-2 lg:px-10">
                        {products.length === 0 ? (
                            <p className="text-center text-gray-500">No products published yet.</p>
                        ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0.5rem] lg:gap-[0.75rem] auto-rows-[20.5rem] lg:auto-rows-[20.5rem]">
                            {products.map((product) => {
                                const productIndex = String(product.id).padStart(2, "0");

                                return (
                                    <Link key={product.id} href={`/products/${product.slug}`} className="group block h-full">
                                        <article className="h-full rounded-[0.75rem] border border-[#EBEBEB] bg-[#FCFCFC] p-[0.75rem] cursor-pointer overflow-hidden transition-[transform,box-shadow,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[0.25rem] hover:shadow-[0_0.875rem_2.5rem_rgba(0,0,0,0.14)] hover:bg-[#FF6A00] hover:border-[#FF6A00]">
                                            <div className="grid h-full grid-cols-1 lg:grid-cols-[52%_48%] gap-[0.75rem] lg:gap-[1rem]">
                                                <div className="flex h-full min-h-[10rem] lg:min-h-0 flex-col overflow-hidden px-[0.75rem] pt-[0.75rem] pb-[0.75rem] lg:px-[1rem] lg:pt-[1rem] lg:pb-[1rem]">
                                                    <div className="flex flex-1 items-center transition-[flex] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:flex-[0_0_auto] group-hover:items-start">
                                                        <div className="w-full">
                                                            <p
                                                                className="font-normal text-[0.75rem] leading-[1rem] text-[#8B8B8B] transition-colors duration-500 group-hover:text-white/95"
                                                                style={{ fontFamily: 'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
                                                            >
                                                                /{productIndex}
                                                            </p>

                                                            <h3
                                                                className="mt-[0.75rem] line-clamp-3 font-medium text-[2rem] leading-[2.5rem] tracking-[-0.0875rem] lg:text-[2.375rem] lg:leading-[3rem] text-[#4B4B4B] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-[1.75rem] group-hover:leading-[2rem] lg:group-hover:text-[2rem] lg:group-hover:leading-[2.25rem] group-hover:text-white"
                                                                style={{ fontFamily: 'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
                                                            >
                                                                {product.name}
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
                                                        <div className="overflow-hidden">
                                                            <div className="translate-y-[0.5rem] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                                                                <p
                                                                    className="mt-[0.625rem] line-clamp-3 font-normal text-[1rem] leading-[1.625rem] tracking-[-0.01rem] text-[#6F6F6F] transition-colors duration-500 group-hover:text-white/90"
                                                                    style={{ fontFamily: 'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
                                                                >
                                                                    {product.description}
                                                                </p>

                                                                <span
                                                                    className="mt-[0.875rem] inline-flex h-[2.875rem] w-full max-w-[14.5rem] items-center justify-center gap-[0.375rem] rounded-[3.125rem] border border-white bg-white px-[1rem] text-[#2D2F33] transition-colors duration-500 group-hover:bg-[#FFF6F0]"
                                                                    style={{ fontFamily: 'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
                                                                >
                                                                    <span className="text-center font-normal text-[0.875rem] leading-[1.2] tracking-[-0.02rem]">Details about product</span>
                                                                    <ArrowRight size={15} color="#FF6A00" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="relative h-full min-h-[10rem] pt-[0.875rem] pb-[0.875rem] pl-0 pr-[1rem] transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pt-[1rem] group-hover:pb-[1rem] group-hover:pl-0 group-hover:pr-[1.25rem] lg:group-hover:pr-[1.5rem]">
                                                    <div className="relative h-full w-full overflow-hidden rounded-[0.5rem] bg-white">
                                                        <FadeIn scrollTrigger={true} duration={1.2} className="relative h-full w-full">
                                                            <Image
                                                                src={product.icon || "/drawnwire.png"}
                                                                alt={product.name}
                                                                fill
                                                                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 28vw"
                                                                className="object-cover"
                                                                quality={75}
                                                                loading="lazy"
                                                                placeholder="blur"
                                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNGY0Ii8+PC9zdmc+"
                                                            />
                                                        </FadeIn>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                );
                            })}
                        </div>
                        )}
                    </div>

            </section>

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


                        <Image src="/certificate.png" alt="Certifications" width={900} height={600} className="w-full object-cover" loading="lazy" quality={75} />
                    </div>

                </div>
            </ParallaxSection>
            {/* cta */}

            <ParallaxSection index={3}>
                <div className="min-h-[85vh] px-4 pl-4 lg:pl-0 lg:min-h-[60vh] lg:min-h-[70vh] relative bg-[#272A2A] flex lg:flex-row flex-col-reverse  justify-center lg:justify-start   items-center   lg:px-10 lg:py-20 mt-8 rounded-lg overflow-hidden">

                    <Image src='/gradientcircle.png' alt="" width={1200} height={1200} className="h-[90vh] top-[0%] absolute top-[26%] bottom-0 right-20 top-6 left-0 lg:right-0 lg:rotate-180" loading="lazy" />

                    <Image src='/ctar.png' alt="CTA" width={900} height={600} className="absolute bottom-0 h-[55%] lg:top-0 -right-30 lg:w-[40%] lg:h-full object-cover" loading="lazy" quality={75} />


                    <SlideIn direction="left" scrollTrigger={true} duration={0.8} className="lg:w-[60%]   p-5 lg:p-9 text-white flex flex-col items-start justify-between lg:justify-center gap-6 relative z-10">
                        <Badge title="Brocher" />
                        <h1 className="text-3xl lg:text-5xl pr-2">Download our brochure to discover our full capabilities, precision technologies, and quality-driven manufacturing approach.</h1>

                        <button className="self-center lg:self-start text-xl text-center w-80  mt-[34vh] lg:mt-6 bg-white hover:bg-gray-100 text-black px-6 py-6 lg:py-4 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center  gap-2">Download Our Brocher<ArrowDown size={24} color='black' /></button>
                    </SlideIn>
                </div>
            </ParallaxSection>

            <UcrLaboratoryToolsSection />

        </div>
    )
}
