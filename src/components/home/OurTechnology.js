'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import { Badge } from "../../common/badge.js";
import { WhiteBadge } from "../../common/badge.js";
import { VideoPlayer } from "../../common/video";
import { technologyParallaxSlide } from '../../animations/technologyParallax';
import ParallaxSection from '../../animations/ParallaxSection';

// Technology data structure
const TECHNOLOGIES = [
  {
    id: 0,
    title: 'Southwire Technology',
    description: 'UCR always maintains that the foremost benefit of any latest technology, if applied to an efficient operation, will automatically magnify the efficiency. This in turn will empower people and will bring out the best in quality as well as productivity.',
    backgroundImage: "url('/technology.png')",
  },
  {
    id: 1,
    title: 'Cooper treatments',
    description: 'Advanced copper treatment processes designed to enhance durability and performance. Our innovative approach ensures superior quality in every product we manufacture.',
    backgroundImage: "url('/technology2.png')",
  },
  {
    id: 2,
    title: 'NexGen Solutions',
    description: 'Next-generation solutions for modern manufacturing challenges. We combine cutting-edge technology with proven expertise to deliver exceptional results.',
    backgroundImage: "url('/technology3.png')",
  },
];

export default function OurTechnology() {
  const [activeTab, setActiveTab] = useState(0);
  const backgroundSliderRef = useRef(null);
  const router = useRouter();

  const handleTabChange = (tabIndex) => {
    if (tabIndex === activeTab) return;

    technologyParallaxSlide(backgroundSliderRef, tabIndex);
    setActiveTab(tabIndex);
  };

  const currentTech = TECHNOLOGIES[activeTab];
  return (
    <ParallaxSection index={0}>
      <div className="min-h-[70vh]  sm:min-h-screen flex flex-col  sm:flex-row gap-1 sm:mx-10 overflow-hidden">
        <div className="min-h-[60vh] pt-20  lg:min-h-screen sm:w-1/2 bg-[#FA6E43] rounded-xl px-3 lg:px-8 py-10 flex flex-col gap-12 ">
          <div className="mt-8">
            <div className="animate-reveal">
              <WhiteBadge title="Core Strength" className='z-190' />
            </div>
            <h1 className="font-primary font-medium text-[32px] leading-[36.09px] tracking-[-0.79px] lg:text-[64px] lg:leading-[64px] lg:tracking-[-1.4px] text-white mt-4 animate-reveal">Our technology</h1>
          </div>

          <div>
            {/* All Tabs - Active gets white bg with description */}
            <div className="flex flex-col gap-6 mt-10">
              {TECHNOLOGIES.map((tech, index) => (
                <div
                  key={tech.id}
                  onClick={() => handleTabChange(index)}
                  className={`cursor-pointer transition-all duration-300 animate-reveal ${
                    activeTab === index
                      ? 'rounded-xl !bg-white opacity-100 px-5 py-9 border-l-4 border-primary shadow-lg'
                      : ''
                  }`}
                >
                  {activeTab === index ? (
                    <div className="flex flex-col gap-4 w-full !bg-white">
                      <h1 className="font-primary font-normal text-[28px] leading-[36.09px] tracking-[-1.41px] text-primary lg:text-[48px] lg:leading-[64px] lg:tracking-[-2.5px]">
                        {tech.title}
                      </h1>
                      <p className="font-primary font-normal text-[12px] leading-[20px] tracking-[-0.41px] text-black lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.72px]">{tech.description}</p>
                      <button
                        onClick={() => router.push('/technology')}
                        className="w-full h-[40px] lg:w-[193px] lg:h-[62px] flex items-center justify-center gap-2 text-primary border-[0.62px] lg:border border-primary rounded-[30.95px] lg:rounded-[50px] py-[8px] lg:py-[12px] px-[20px] lg:pl-[28px] lg:pr-[18px] hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        <span className="font-primary font-normal text-[14px] leading-[18.2px] tracking-[-0.54px] lg:text-[20px] lg:leading-[29.4px] lg:tracking-[-0.88px]">Know More</span>
                        <ArrowRight size={18} className="text-primary" />
                      </button>
                    </div>
                  ) : (
                    <h1 className="font-primary font-normal text-[24px] leading-[55.82px] tracking-[-1.41px] lg:text-[40px] lg:leading-[99px] lg:tracking-[-2.5px] text-white hover:text-white/80 flex items-center gap-4">
                      <ArrowRight size={30} className="text-white" />
                      {tech.title}
                    </h1>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Parallax Background Slider */}
        <div className="min-h-[60vh] sm:min-h-screen sm:w-1/2 rounded-xl overflow-hidden relative">
          <div
            ref={backgroundSliderRef}
            className="absolute inset-0 flex w-full h-full transition-all duration-700 will-change-transform"
          >
            {TECHNOLOGIES.map((tech) => (
              <div
                key={tech.id}
                className="w-full h-full flex-shrink-0 rounded-xl"
                style={{
                  backgroundImage: tech.backgroundImage,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
}
