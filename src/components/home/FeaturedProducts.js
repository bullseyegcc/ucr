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
    backgroundImage: "url('/fp2.png')",
  },
  {
    id: 2,
    title: 'Customized components',
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
    <div className="md:min-h-screen md:h-[90vh] rounded-xl mx-4 md:mx-10 flex items-end pb-20 relative">
      {/* Background Slider Container */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
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
      <div className="h-full pt-9 relative top-8 bottom-5 bg-white p-6 md:p-8 flex flex-col gap-5 md:gap-6 md:gap-26 w-full md:w-[45%] md:min-h-[90%] mx-4 md:mx-10 rounded-xl z-10 shadow-2xl transition-all duration-700">
        {/* Header */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 text-white z-300">
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='object-contain' />
            <span className='text-black uppercase'>Featured Products</span>
          </div>

          {/* Product Tabs */}
          <div className="flex flex-col gap-4">
            {PRODUCTS.map((product, index) => (
              <div
                key={product.id}
                onClick={() => handleTabChange(index)}
                className={`cursor-pointer transition-all duration-300 ${
                  activeTab === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                }`}
              >
                {activeTab === index ? (
                  <h1 className="flex items-center text-xl md:text-5xl text-primary mt-5 font-medium">
                    {product.title}
                    {product.icon && (
                      <Image
                        src={product.icon}
                        alt={product.title}
                        width={50}
                        height={50}
                        className='object-contain inline-block md:ml-3'
                      />
                    )}
                  </h1>
                ) : (
                  <h1 className="text-lg md:text-4xl text-secondary my-2 font-medium">
                    {product.title}
                  </h1>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleKnowMore}
          className="w-fit flex gap-2 my-6 md:my-0 items-center text-primary text-sm md:text-base border-2 border-primary rounded-full px-6 py-3 hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
        >
          Know More <ArrowRight size={18} />
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
