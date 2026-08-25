'use client'

import { Badgetextblack, Badge } from "../../common/badge"
import Hero from "@/components/shared/Hero"
import Image from "next/image"
import { ArrowDown } from 'lucide-react';
import UcrLaboratoryToolsSection from "../../components/technology/UcrLaboratoryToolsSection"
import ParallaxSection from "../../animations/ParallaxSection"
import SlideIn from "../../animations/SlideIn"
import FadeIn from "../../animations/FadeIn";
import ScrollReveal from "../../animations/ScrollReveal"
import ProductCard from "../../components/products/ProductCard"

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

                    <Image src='/shared/gradientcircle.png' alt="" width={300} height={300} className="rotate-180 hidden lg:block absolute overflow-hidden left-0 bottom-0" loading="lazy" />

                    <div className="absolute  -left-60 lg:left-[15%] bottom-0  bg-[url('/products/wireshadow.png')] bg-cover bg-center w-[150%] lg:w-[60%]" >

                        <Image src="/products/weproduce.png" alt="We produce" width={900} height={600} className="object-cover w-full h-full" loading="lazy" quality={75} />
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0.5rem] lg:gap-[0.75rem]">
                            {products.map((product, index) => {
                                const productIndex = String(product.id).padStart(2, "0");
                                const isPriority = index < 2;
                                const imageFit = product.imageFit === "contain" ? "object-contain" : "object-cover";

                                return (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        productIndex={productIndex}
                                        isPriority={isPriority}
                                        imageFit={imageFit}
                                    />
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


                        <Image src="/shared/certificate.png" alt="Certifications" width={900} height={600} className="w-full object-cover" loading="lazy" quality={75} />
                    </div>

                </div>
            </ParallaxSection>
            {/* cta */}

            <ParallaxSection index={3}>
                <div className="min-h-[85vh] px-4 pl-4 lg:pl-0 lg:min-h-[60vh] lg:min-h-[70vh] relative bg-[#272A2A] flex lg:flex-row flex-col-reverse  justify-center lg:justify-start   items-center   lg:px-10 lg:py-20 mt-8 rounded-lg overflow-hidden">

                    <Image src='/shared/gradientcircle.png' alt="" width={1200} height={1200} className="h-[90vh] top-[0%] absolute top-[26%] bottom-0 right-20 top-6 left-0 lg:right-0 lg:rotate-180" loading="lazy" />

                    <Image src='/products/ctar.png' alt="CTA" width={900} height={600} className="absolute bottom-0 h-[55%] lg:top-0 -right-30 lg:w-[40%] lg:h-full object-cover" loading="lazy" quality={75} />


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
