'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import { Badge } from "../../common/badge.js";
import AboutStats from './AboutStats.js';
import TextReveal from "../../animations/TextReveal.js";
import gsap from 'gsap';
import CardAnimation from '../../animations/CardAnimation.js';

export default function About({ lockProgressRef = null }) {
  const headingRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !lockProgressRef) return;
    let colorTl;
    const timerId = setTimeout(() => {
      const h1 = headingRef.current;
      if (!h1) return;
      const wordSpans = Array.from(h1.querySelectorAll('.word-span'));
      if (!wordSpans.length) return;
      wordSpans.forEach((span) => { span.style.webkitTextFillColor = ''; });
      const targetColor = '#FA6E43';
      colorTl = gsap.timeline({ paused: true });
      wordSpans.forEach((span, i) => {
        colorTl.to(span, { color: targetColor, duration: 1, ease: 'none' }, i);
      });
      lockProgressRef.current = (p) => colorTl.progress(p);
    }, 300);
    return () => {
      clearTimeout(timerId);
      colorTl?.kill();
      lockProgressRef.current = null;
    };
  }, [lockProgressRef]);

  return (
    <div className="w-full h-auto bg-white flex flex-col relative z-50">
      <div className="relative flex flex-col lg:flex-row px-6 lg:px-10 pt-10 lg:pt-14 gap-6 lg:gap-6">
        <div className="w-full lg:w-[60%] flex flex-col gap-5 lg:gap-8 z-10">
          <Badge title="About Us" />
          <TextReveal>
            <h1 ref={headingRef} className="text-primary font-primary font-medium text-[20px] leading-[32px] tracking-[-0.53px] lg:text-[48px] lg:leading-[69.32px] lg:tracking-[-1.39px]">
              Our UAE factory combines Advanced technology with global{' '}
              <span className="text-gray-100">
                expertise to produce high-quality copper products that meet international standards
              </span>
            </h1>
          </TextReveal>

          <CardAnimation> <button className="bg-primary text-[14px] lg:text-xl w-[143px] lg:w-[199px] h-[41.4px] lg:h-[62px] px-[18px] lg:px-[26px] py-2 lg:py-3 text-white flex justify-between items-center gap-3 rounded-[33.42px] lg:rounded-[50px] [border:0.67px_solid_white] lg:[border:1px_solid_white]">
            <span className="font-primary font-normal  leading-[19.65px] tracking-[-0.59px] text-center align-middle">Know more</span> <ArrowRight size={22} color="white" />
          </button></CardAnimation>
         
        </div>
        <div className="w-80 lg:w-[45%] lg:static  absolute top-[70%] left-[20%] flex items-end justify-end pointer-events-none z-90 lg:z-0">
          <Image
            src="/aboutside.png"
            alt="Factory Image"
            width={900}
            height={800}
            className="w-[75%] lg:w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
