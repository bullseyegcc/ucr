'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import coppericon from '../../../public/coppericon.png';
import badge_icon from '../../../public/badge.png';

// Product data structure
const PRODUCTS = [
  {
    id: 0,
    title: 'Copper Rods and Wires',
    icon: coppericon,
    backgroundImage: "url('/fp.png')",
  },
  {
    id: 1,
    title: 'Cooper Sheets',
    icon: coppericon,
    backgroundImage: "url('/fp2.png')",
  },
  {
    id: 2,
    title: 'Customized components',
    icon: coppericon,
    backgroundImage: "url('/fp3.png')",
  },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0);
  const backgroundSliderRef = useRef(null);
  const router = useRouter();

  // Handle tab change with direct parallax slide animation
  const handleTabChange = (tabIndex) => {
    if (tabIndex === activeTab) return;

    setActiveTab(tabIndex);
    
    // Animate the slider to show the correct product
    if (backgroundSliderRef.current) {
      gsap.to(backgroundSliderRef.current, {
        xPercent: -tabIndex * (100 / PRODUCTS.length),
        duration: 0.6,
        ease: 'power2.inOut',
      });
    }
  };

  // Navigate to products page
  const handleKnowMore = () => {
    router.push('/products');
  };

  return (
    <div className="min-h-screen lg:h-[90vh] rounded-xl  lg:mx-10 flex items-end lg:items-center py-10 pt-16 relative">
      {/* Background Slider Container */}
      <div className="absolute inset-0  overflow-hidden rounded-xl">
        <div
          ref={backgroundSliderRef}
          className="flex h-full will-change-transform"
          style={{
            width: '300%',
          }}
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundImage: product.backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '33.333%',
                height: '100%',
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay gradient for better content readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent rounded-xl z-5"></div>

      {/* Content Card */}
      <div className="h-full  relative bg-white p-6 lg:p-8 flex flex-col gap-5 lg:gap-6 lg:gap-26 w-full lg:w-[48%] lg:min-h-[90%] mx-2 lg:mx-10 rounded-xl z-10 shadow-2xl transition-all duration-700">
        {/* Header */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 text-white z-300">
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='object-contain' />
            <span className='text-black uppercase'>Featured Products</span>
          </div>

          {/* Product Tabs */}
          <div className="flex flex-col gap-4 lg:gap-6">
            {PRODUCTS.map((product, index) => (
              <button
                key={product.id}
                onClick={() => handleTabChange(index)}
                className={`cursor-pointer transition-all duration-300 ${
                  activeTab === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                } w-full text-left`}
                type="button"
              >
                <h1
                  className={`flex min-h-[42px] lg:min-h-[66px] items-center text-[28px] leading-[1.1] tracking-[-1.55px] font-normal capitalize align-middle lg:text-5xl lg:font-medium ${
                    activeTab === index ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  <span>{product.title}</span>
                  {activeTab === index && product.icon && (
                    <Image
                      src={product.icon}
                      alt={product.title}
                      width={80}
                      height={80}
                      className='hidden object-contain lg:inline-block ml-5'
                    />
                  )}
                </h1>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleKnowMore}
          className="w-full lg:w-[193px] h-[39.5189px] lg:h-[62px] flex gap-2 my-6 lg:my-0 items-center justify-center text-primary text-sm lg:text-base border-[0.62px] border-primary rounded-[30.95px] lg:rounded-[50px] py-[8px] lg:py-3 pl-[20px] lg:pl-[28px] pr-[20px] lg:pr-[18px] hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
        >
          <span className="font-primary font-normal text-[14px] leading-[18.2px] tracking-[-0.54px] text-center align-middle lg:text-[20px] lg:leading-[29.4px] lg:tracking-[-0.88px]">Know More</span>
          <ArrowRight size={18} />
        </button>

        {/* Indicator Dots */}
        <div className="flex gap-2 mt-6 absolute bottom-2 sm:bottom-5 left-5">
          {PRODUCTS.map((_, index) => (
            <div
              key={index}
              onClick={() => handleTabChange(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeTab === index
                  ? 'w-6 h-3 sm:w-8 sm:h-4 bg-primary'
                  : 'w-3 h-1.5 sm:w-6 sm:h-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
