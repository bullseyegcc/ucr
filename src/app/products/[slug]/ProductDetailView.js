"use client";

import Image from "next/image";
import { Badge, Badgetextwhite } from "../../../common/badge";
import { useState } from "react";
import { ChevronDown, Package } from "lucide-react";
import FadeIn from "../../../animations/FadeIn";
import SlideIn from "../../../animations/SlideIn";

export default function ProductDetailView({ product }) {
  const [expandedSections, setExpandedSections] = useState({
    applications: true,
    technical: false,
    packaging: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const description = product.longDescription || product.description;
  const imageSrc = product.icon || "/pdetail.png";
  const packagingEntries = product.packagingDimensions || [];
  const structuredParams = product.technicalParameters?.some(
    (row) => row.unit || row.astm || row.ucr,
  );

  return (
    <div className="flex flex-col gap-7">
      {/* Header */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[55vh] max-h-[80vh] font-medium flex items-center justify-center   dark:bg-black overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]"></div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-[url('/productdetailbg.png')] bg-cover bg-center"></div>
        <h1 className="absolute top-[40%] w-[85%] sm:w-[70%] lg:w-[60%] z-20 font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-white flex flex-col items-center text-center align-middle capitalize gap-2 sm:gap-3 lg:gap-4 px-4 sm:px-0">
          <Badgetextwhite title="products" />
          <FadeIn>{product.name}</FadeIn>
        </h1>
      </div>

      {/* Content */}
      <div className="min-h-screen   bg-[#F5F5F5] -mb-10">
        <div className="w-full  ">
          <div className="flex flex-col lg:flex-row py-8 sm:py-10 px-6 sm:px-10 bg-white  ">
            <div className="w-full lg:w-1/2 p-4 sm:p-8 sm:px-16">
              <span className="text-lg sm:text-xl text-[#5F5F66]">
                Description
              </span>

              {product.longDescriptionHtml ? (
                <div
                  className="wp-content w-full lg:w-[80%] pt-4 text-base sm:text-xl leading-tight"
                  dangerouslySetInnerHTML={{
                    __html: product.longDescriptionHtml,
                  }}
                />
              ) : (
                <p className="w-full lg:w-[80%] pt-4 text-base sm:text-xl leading-tight">
                  {description}
                </p>
              )}

              {product.sizes?.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <span className="text-lg sm:text-xl font-semibold text-[#FF6A00]">
                    Sizes available:
                  </span>
                  <div className="flex flex-wrap gap-6 mt-3 sm:mt-4">
                    {product.sizes.map((size, i) => (
                      <label
                        key={i}
                        className="flex items-center cursor-pointer gap-2"
                      >
                        <input
                          type="radio"
                          name="product-size"
                          value={size}
                          className="hidden peer"
                          defaultChecked={i === 0}
                        />
                        <span className="w-5 h-5 rounded-full bg-gray-200 peer-checked:bg-orange-400 transition-colors"></span>
                        <span className="text-gray-900 text-base sm:text-lg font-medium">
                          {size}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {product.productSpecification && (
                <div className="mt-6 sm:mt-8">
                  <span className="text-lg sm:text-xl font-semibold text-[#FF6A00]">
                    Product specification:
                  </span>
                  <p className="mt-2 text-sm sm:text-base text-gray-700">
                    {product.productSpecification}
                  </p>
                </div>
              )}

              <button className="w-full sm:w-90 bg-[#FE5D0A] text-white rounded-full py-3 mt-4 sm:mt-20 text-sm sm:text-base font-medium hover:bg-[#E04D00] transition-colors">
                Download Brochure
              </button>
            </div>
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
              <Image
                src={imageSrc}
                alt={product.name}
                width={1200}
                height={600}
                className="w-full h-48 sm:h-72 lg:h-[420px] object-cover rounded-lg shadow"
              />
            </div>
          </div>

          {/* Applications Section */}
          <div className="mb-4 mt-12 sm:mt-20 px-6 sm:px-10">
            <button
              onClick={() => toggleSection("applications")}
              className="w-full bg-white border border-gray-200 rounded-lg flex items-stretch transition-shadow"
            >
              <div
                className={`w-12 sm:w-16 h-auto flex items-center justify-center rounded-l-lg transition-colors duration-300 ${expandedSections.applications ? "bg-orange-100" : "bg-gray-100"}`}
              >
                <Image
                  src="/applications.png"
                  alt="Applications"
                  width={32}
                  height={32}
                  className="sm:w-6 sm:h-6 w-5 h-5 object-contain"
                />
              </div>
              <div className="flex-1 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Applications
                </h3>
                <ChevronDown
                  size={20}
                  className={`sm:size-6 text-gray-400 transition-transform duration-300 ${expandedSections.applications ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            {expandedSections.applications && (
              <div className="bg-[#FbFbFb] relative border border-t-0 border-gray-200 rounded-b-lg p-6 sm:p-8">
                <p className="text-base sm:text-lg text-gray-500 font-medium mb-6">
                  Most used for
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="col-span-1 sm:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                    {product.applications?.map((app, i) => (
                      <div
                        key={i}
                        className=" bg-white py-3 px-4 sm:px-5 rounded-xl flex items-center gap-4 sm:gap-6"
                      >
                        <span className="w-2 h-2 bg-orange-500/30 rounded-full flex-shrink-0 "></span>
                        <p className="text-gray-800 text-base sm:text-lg">
                          {app}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <Image
                  src="/applicationsbg.png"
                  alt="Icon"
                  width={900}
                  height={0}
                  className="w-90 absolute bottom-0 right-0 hidden lg:block"
                />
              </div>
            )}
          </div>

          {/* Technical Parameters Section */}
          <div className="mb-4 px-6 sm:px-10">
            <button
              onClick={() => toggleSection("technical")}
              className="w-full bg-white border border-gray-200 rounded-lg flex items-stretch transition-shadow"
            >
              <div
                className={`w-12 sm:w-16 h-auto flex items-center justify-center rounded-l-lg transition-colors duration-300 ${expandedSections.technical ? "bg-orange-100" : "bg-gray-100"}`}
              >
                <Image
                  src="/technical.png"
                  alt="Technical Parameters"
                  width={32}
                  height={32}
                  className="sm:w-6 sm:h-6 w-5 h-5 object-contain"
                />
              </div>
              <div className="flex-1 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Technical Parameters
                </h3>
                <ChevronDown
                  size={20}
                  className={`sm:size-6 text-gray-400 transition-transform duration-300 ${expandedSections.technical ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            {expandedSections.technical && (
              <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg overflow-x-auto">
                {structuredParams ? (
                  <>
                    <div className="bg-[#FF6A00] grid grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 text-white font-semibold text-xs sm:text-sm min-w-[500px] w-full">
                      <div className="overflow-x-auto overflow-ellipsis whitespace-nowrap">
                        Parameters
                      </div>
                      <div className="overflow-x-auto overflow-ellipsis whitespace-nowrap">
                        Unit
                      </div>
                      <div className="overflow-x-auto overflow-ellipsis whitespace-nowrap">
                        ASTM B49/BS-EN 1977
                      </div>
                      <div className="overflow-x-auto overflow-ellipsis whitespace-nowrap">
                        UCR Typical
                      </div>
                    </div>
                    <div>
                      {product.technicalParameters.map((param, i) => (
                        <div
                          key={i}
                          className={`grid grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 text-gray-700 text-xs sm:text-sm min-w-[500px] w-full ${i !== product.technicalParameters.length - 1 ? "border-b border-gray-200" : ""}`}
                        >
                          <div>{param.parameter}</div>
                          <div>{param.unit}</div>
                          <div className="whitespace-nowrap">{param.astm}</div>
                          <div className="font-semibold">{param.ucr}</div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : product.technicalParametersHtml ? (
                  <div
                    className="wp-content p-4 sm:p-6"
                    dangerouslySetInnerHTML={{
                      __html: product.technicalParametersHtml,
                    }}
                  />
                ) : (
                  <p className="p-4 sm:p-6 text-sm text-gray-500">
                    No technical parameters published for this product.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Packaging Dimensions Section */}
          <div className="mb-8 sm:mb-12 px-6 sm:px-10">
            <button
              onClick={() => toggleSection("packaging")}
              className="w-full bg-white border border-gray-200 rounded-lg flex items-stretch transition-shadow"
            >
              <div
                className={`w-12 sm:w-16 h-auto flex items-center justify-center rounded-l-lg transition-colors duration-300 ${expandedSections.packaging ? "bg-orange-100" : "bg-gray-100"}`}
              >
                <Package size={20} className="sm:size-6 " />
              </div>
              <div className="flex-1 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Packaging Dimensions
                </h3>
                <ChevronDown
                  size={20}
                  className={`sm:size-6 text-gray-400 transition-transform duration-300 ${expandedSections.packaging ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            {expandedSections.packaging && (
              <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-4 sm:p-6">
                <div className="space-y-4">
                  {packagingEntries.map((row, i, arr) => (
                    <div
                      key={`${row.label}-${i}`}
                      className={`flex flex-col sm:flex-row justify-between sm:items-center py-3 sm:py-4 gap-2 sm:gap-0 ${i !== arr.length - 1 ? "border-b border-gray-200" : ""}`}
                    >
                      <span className="text-sm sm:text-base text-gray-900 font-medium">
                        {row.label}
                      </span>
                      {row.value ? (
                        <span className="text-sm sm:text-base text-gray-700 font-semibold">
                          {row.value}
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* certifications */}

      <div className="relative lg:min-h-screen mt-8">
        {/* header */}
        <div className="w-screen flex flex-col gap-3 sm:gap-4 lg:gap-5 items-center justify-center text-center py-8 sm:py-12 lg:py-16 lg:py-20 px-6">
          <SlideIn
            direction="bottom"
            scrollTrigger={true}
            duration={0.8}
            delay={0}
          >
            <Badge title="Core Strength" />
          </SlideIn>

          <FadeIn
            duration={0.4}
            delay={0}
            scrollTrigger={true}
            className="flex justify-center"
          >
            <h1 className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize mt-2 sm:mt-3 lg:mt-4 w-full sm:w-[85%] lg:w-[75%] lg:w-[60%]">
              Our products meet global quality and safety standards.
            </h1>
          </FadeIn>
        </div>

        <div className="w-full sm:w-[90%] lg:w-[85%] lg:w-[65%] flex items-center justify-center mx-auto px-6 sm:px-0">
          <Image
            src="/certificate.png"
            alt="Icon"
            width={900}
            height={0}
            className="w-full object-cover  "
          />
        </div>
      </div>
    </div>
  );
}
