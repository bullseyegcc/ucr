'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import { Badge } from "../../common/badge.js";
import StatsCard from "../StatsCard.js";
import TextReveal from "../TextReveal.js";
import gsap from 'gsap';

export default function About({ lockProgressRef = null }) {
  const statsRef   = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cards = statsRef.current?.querySelectorAll('.stat-card-item');
    if (!cards?.length) return;
    gsap.set(cards, { y: 50, opacity: 0, scale: 0.92 });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(cards, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'expo.out', stagger: 0.1 });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

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
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden relative flex flex-col md:flex-row px-6 md:px-10 pt-10 md:pt-14 gap-6 md:gap-6">
        <div className="w-full md:w-[60%] flex flex-col gap-5 md:gap-8 z-10">
          <Badge title="About Us" />
          <TextReveal>
            <h1 ref={headingRef} className="text-primary text-2xl md:text-4xl lg:text-5xl leading-snug md:leading-tight">
              Our UAE factory combines Advanced technology with global{' '}
              <span className="text-secondary">
                expertise to produce high-quality copper products that meet international standards
              </span>
            </h1>
          </TextReveal>
          <button className="bg-primary w-44 md:w-56 px-5 md:px-8 py-3 text-white md:text-lg flex justify-between items-center gap-3 rounded-full">
            Know more <ArrowRight size={22} color="white" />
          </button>
        </div>
        <div className="absolute bottom-0 right-0 md:relative md:w-[45%] flex items-end justify-end pointer-events-none">
          <Image
            src="/aboutside.png"
            alt="Factory Image"
            width={900}
            height={800}
            className="w-[75%] md:w-full object-contain"
          />
        </div>
      </div>
      <div ref={statsRef} className="shrink-0 bg-white grid grid-cols-2 md:grid-cols-4 px-2 md:px-10 py-4 md:py-6 gap-4 md:gap-6">
        <div className="stat-card-item"><StatsCard mainHeading="2009" subHeading="Established In" description="Since then, our excellence has made us a trusted name in copper manufacturing." /></div>
        <div className="stat-card-item"><StatsCard mainHeading="20K+" subHeading="MT/Annum" description="Produces 20,000 metric tons of copper per year." /></div>
        <div className="stat-card-item"><StatsCard mainHeading="150+" subHeading="Employees" description="With over 150 experienced employees, we deliver quality and reliability every day." /></div>
        <div className="stat-card-item"><StatsCard mainHeading="50+" subHeading="Global sales" description="With a presence in 50+ countries, we serve clients on every continent." /></div>
      </div>
    </div>
  );
}
