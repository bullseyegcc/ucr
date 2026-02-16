'use client';

import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "../../../assets/products";
import { Badge, Badgetextwhite } from "../../../common/badge";
import Link from "next/link";
import { useState } from "react";
import { use } from "react";
import { ChevronDown, Package, Wrench, Layers } from "lucide-react";

export default function ProductDetail({ params }) {
    const { slug } = use(params);
    const product = products.find((p) => p.slug === slug);
    if (!product) return notFound();

    const [expandedSections, setExpandedSections] = useState({
        applications: true,
        technical: false,
        packaging: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="flex flex-col gap-7">
            {/* Header */}
            <div className="relative h-[40vh] sm:h-[50vh] md:h-[55vh] max-h-[80vh] font-medium flex items-center justify-center font-sans dark:bg-black overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]"></div>
                <div className="absolute inset-0 z-10 pointer-events-none bg-[url('/productdetailbg.png')] bg-cover bg-center" ></div>
                <h1 className="absolute top-[40%] w-[85%] sm:w-[70%] md:w-[60%] z-20 text-3xl sm:text-4xl md:text-6xl text-white flex flex-col items-center text-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-0">
                    <Badgetextwhite title='products' />
                    {product.name}
                </h1>
            </div>

            {/* Content */}
            <div className="min-h-screen   bg-[#F5F5F5]">
                <div className="w-full  ">
                    <div className="flex flex-col md:flex-row py-8 sm:py-10 px-6 sm:px-10 bg-white  ">

                        <div className="w-full md:w-1/2 p-4 sm:p-8 sm:px-16">

                            <span className="text-lg sm:text-xl text-[#5F5F66]">Description</span>

                            <p className="w-full md:w-[80%] pt-4 text-base sm:text-xl leading-tight">{product.description}</p>

                            <div className="mt-6 sm:mt-8">
                                <span className="text-lg sm:text-xl font-semibold text-[#FF6A00]">Sizes available:</span>
                                <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                                    {product.sizes?.map((size, i) => (
                                        <span key={i} className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8">
                                <span className="text-lg sm:text-xl font-semibold text-[#FF6A00]">Product specification:</span>
                                <p className="mt-2 text-sm sm:text-base text-gray-700">{product.productSpecification}</p>
                            </div>


                            <button className="w-full sm:w-90 bg-[#FE5D0A] text-white rounded-full py-3 mt-4 sm:mt-6 text-sm sm:text-base font-medium hover:bg-[#E04D00] transition-colors">Download Brochure</button>

                        </div>
                        <div className="w-full md:w-1/2 mt-6 md:mt-0">
                            <Image src='/pdetail.png' alt={product.name} width={1200} height={600} className="w-full h-48 sm:h-72 md:h-[420px] object-cover rounded-lg shadow" />
                        </div>
                    </div>

                    {/* Applications Section */}
                    <div className="mb-4 mt-12 sm:mt-20 px-6 sm:px-10">
                        <button onClick={() => toggleSection('applications')} className="w-full bg-white border border-gray-200 rounded-lg flex items-stretch hover:shadow-md transition-shadow">
                            <div className="w-12 sm:w-16 h-auto flex items-center justify-center bg-orange-100 rounded-l-lg">
                                <Layers size={20} className="sm:size-6 text-orange-500" />
                            </div>
                            <div className="flex-1 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Applications</h3>
                                <ChevronDown size={20} className={`sm:size-6 text-gray-400 transition-transform duration-300 ${expandedSections.applications ? 'rotate-180' : ''}`} />
                            </div>
                        </button>

                        {expandedSections.applications && (
                            <div className="bg-[#FbFbFb] relative border border-t-0 border-gray-200 rounded-b-lg p-6 sm:p-8">
                                <p className="text-base sm:text-lg text-gray-500 font-medium mb-6">Most usedfor</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="col-span-1 sm:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                                        {product.applications?.map((app, i) => (
                                            <div key={i} className=" bg-white py-3 px-4 sm:px-5 rounded-xl flex items-center gap-4 sm:gap-6">
                                                <span className="w-2 h-2 bg-orange-500/30 rounded-full flex-shrink-0 "></span>
                                                <p className="text-gray-800 text-base sm:text-lg">{app}</p>
                                            </div>
                                        ))}


                                    </div>


                                </div>
                                <Image src="/applicationsbg.png" alt="Icon" width={900} height={0} className="w-90 absolute bottom-0 right-0 hidden lg:block" />

                            </div>
                        )}
                    </div>

                    {/* Technical Parameters Section */}
                    <div className="mb-4 px-6 sm:px-10">
                        <button onClick={() => toggleSection('technical')} className="w-full bg-white border border-gray-200 rounded-lg flex items-stretch hover:shadow-md transition-shadow">
                            <div className="w-12 sm:w-16 h-auto flex items-center justify-center bg-orange-100 rounded-l-lg">
                                <Wrench size={20} className="sm:size-6 text-orange-500" />
                            </div>
                            <div className="flex-1 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Technical Parameters</h3>
                                <ChevronDown size={20} className={`sm:size-6 text-gray-400 transition-transform duration-300 ${expandedSections.technical ? 'rotate-180' : ''}`} />
                            </div>
                        </button>

                        {expandedSections.technical && (
                            <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg overflow-x-auto">
                                {/* Table Header */}
                                <div className="bg-[#FF6A00] grid grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 text-white font-semibold text-xs sm:text-sm min-w-max sm:min-w-full">
                                    <div>Parameters</div>
                                    <div>Unit</div>
                                    <div className="whitespace-nowrap">ASTM B49/BS-EN 1977</div>
                                    <div>UCR Typical</div>
                                </div>

                                {/* Table Body */}
                                <div>
                                    {product.technicalParameters?.map((param, i) => (
                                        <div key={i} className={`grid grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 text-gray-700 text-xs sm:text-sm min-w-max sm:min-w-full ${i !== product.technicalParameters.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                            <div>{param.parameter}</div>
                                            <div>{param.unit}</div>
                                            <div className="whitespace-nowrap">{param.astm}</div>
                                            <div className="font-semibold">{param.ucr}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Packaging Dimensions Section */}
                    <div className="mb-8 sm:mb-12 px-6 sm:px-10">
                        <button onClick={() => toggleSection('packaging')} className="w-full bg-white border border-gray-200 rounded-lg flex items-stretch hover:shadow-md transition-shadow">
                            <div className="w-12 sm:w-16 h-auto flex items-center justify-center bg-orange-100 rounded-l-lg">
                                <Package size={20} className="sm:size-6 text-orange-500" />
                            </div>
                            <div className="flex-1 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Packaging Dimensions</h3>
                                <ChevronDown size={20} className={`sm:size-6 text-gray-400 transition-transform duration-300 ${expandedSections.packaging ? 'rotate-180' : ''}`} />
                            </div>
                        </button>

                        {expandedSections.packaging && (
                            <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-4 sm:p-6">
                                <div className="space-y-4">
                                    {Object.entries(product.packagingDimensions || {}).map(([key, value], i, arr) => (
                                        <div key={key} className={`flex flex-col sm:flex-row justify-between sm:items-center py-3 sm:py-4 gap-2 sm:gap-0 ${i !== arr.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                            <span className="text-sm sm:text-base text-gray-900 font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <span className="text-sm sm:text-base text-gray-700 font-semibold">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>


                </div>
            </div>

            {/* certifications */}

            <div className="relative md:min-h-screen mt-8">

                {/* header */}
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 items-center justify-center text-center py-8 sm:py-12 md:py-16 lg:py-20 px-6">
                     <Badge title="Core Strength" />
                    <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-2 sm:mt-3 md:mt-4 leading-tight w-full sm:w-[85%] md:w-[75%] lg:w-[60%]">Our products meet global quality and safety standards.</h1>
                </div>


                <div className="w-full sm:w-[90%] md:w-[85%] lg:w-[65%] flex items-center justify-center mx-auto px-6 sm:px-0">


                    <Image src="/certificate.png" alt="Icon" width={900} height={0} className="w-full object-cover  " />
                </div>

            </div>

        </div>
    );
}
