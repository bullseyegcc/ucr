'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { WhiteBadge } from "../../common/badge.js";
import Link from "next/link";

export default function Articles() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const rightTopRef = useRef(null);
  const rightBotRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Uniform animation profile — all elements animate together, same timing
    const DURATION = 1.6;
    const FROM = 'translateY(50px) scale(0.97)';
    const TO = 'translateY(0px) scale(1)';

    const elements = [
      { el: badgeRef.current },
      { el: headingRef.current },
      { el: leftRef.current },
      { el: rightTopRef.current },
      { el: rightBotRef.current },
    ]
      .filter(({ el }) => el)
      .map((item) => ({ ...item, fromTransform: FROM, toTransform: TO, delay: 0, duration: DURATION }));

    // Apply initial hidden state immediately
    elements.forEach(({ el, fromTransform, duration }) => {
      el.style.opacity = '0';
      el.style.filter = 'blur(10px)';
      el.style.transform = fromTransform;
      el.style.willChange = 'transform, opacity, filter';
      el.style.transition = `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1), filter ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = elements.find(({ el }) => el === entry.target);
          if (!match) return;

          if (entry.isIntersecting) {
            setTimeout(() => {
              match.el.style.opacity = '1';
              match.el.style.filter = 'blur(0px)';
              match.el.style.transform = match.toTransform;
            }, match.delay);
          } else {
            // Smooth exit — reverse back to from state
            match.el.style.opacity = '0';
            match.el.style.filter = 'blur(10px)';
            match.el.style.transform = match.fromTransform;
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(({ el }) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem] py-8 lg:py-10 flex flex-col sm:flex-row gap-5 items-stretch mb-4"
    >
      {/* ── Left feature card ──── */}
      <Link
        ref={leftRef}
        href="/blogs/uae-copper-producer-expands-global-supply"
        className="sm:w-1/2 bg-[#FE5D0A] rounded-xl px-4 sm:px-8 py-6 flex flex-col gap-6"
        style={{ willChange: 'transform, opacity' }}
      >
        <div>
          <div ref={badgeRef} style={{ willChange: 'transform, opacity' }}>
            <WhiteBadge title="Blogs & Articles" className="z-190 mb-5" />
          </div>
          <h1
            ref={headingRef}
            className="text-[2.5rem] lg:text-[3rem] text-white font-semibold mt-3 leading-[1.15]"
            style={{ willChange: 'transform, opacity' }}
          >
            Latest News
          </h1>
        </div>

        <div className="relative flex-1 min-h-[18rem] lg:min-h-[22rem] p-3 flex flex-col justify-start gap-4 rounded-xl bg-[url('/hblog1.png')] bg-cover bg-top bg-no-repeat">
          <div className="relative z-10 px-4 text-white flex justify-between text-sm font-light pt-6">
            <span>Writen by Bruce Sommers's</span>
            <span>Monday,April 28,2026</span>
          </div>
          <h1 className="relative z-10 text-xl sm:text-[1.75rem] lg:text-[2rem] leading-[1.2] pl-4 pr-4 text-white">
            UAE Copper Producer Expands Global Supply Network Across Asia &amp; Europe
          </h1>
          <button className="z-10 flex justify-center items-center gap-2 w-18 text-white border absolute bottom-2 left-4 bg-white rounded-lg px-3 py-2">
            <ArrowRight size={18} color="black" />
          </button>
        </div>
      </Link>

      {/* ── Right column ───────────────────────────────────────────────── */}
      <div className="sm:w-1/2 rounded-xl flex flex-col gap-5">
        <Link
          ref={rightTopRef}
          href="/blogs/high-conductivity-copper-rods-energy-sector"
          className="w-full flex-1 min-h-[14rem] lg:min-h-[16rem] relative bg-[#6A3120] flex flex-col justify-start gap-4 rounded-xl bg-[url('/hblog2.png')] bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="relative z-10 px-4 text-white flex justify-between text-sm font-light pt-9">
            <span>Writen by Bruce Sommers's</span>
            <span>Monday,April 28,2026</span>
          </div>
          <h1 className="relative z-10 text-[1.5rem] lg:text-[1.75rem] leading-[1.2] pl-4 pr-8 text-white">
            Company Launches New High-Conductivity Copper Rods for Energy Sector
          </h1>
          <button className="z-10 flex justify-center items-center gap-2 w-18 text-white border absolute bottom-2 left-4 bg-white rounded-lg px-3 py-2">
            <ArrowRight size={18} color="black" />
          </button>
          <div className="rounded-xl h-24 lg:h-28 absolute top-0 w-full z-0 bg-gradient-to-b from-[#FA6E43] to-transparent" />
        </Link>

        <Link
          ref={rightBotRef}
          className="w-full flex-1 min-h-[14rem] lg:min-h-[16rem] relative bg-[#6A3120] hidden lg:flex flex-col justify-start gap-4 rounded-xl bg-[url('/blog2.png')] bg-cover bg-center bg-no-repeat overflow-hidden"
          href="/blogs/expected-supply-deficit-copper-prices"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="relative z-10 px-4 text-white flex justify-between text-sm font-light pt-9">
            <span>Writen by Bruce Sommers's</span>
            <span>Monday,April 28,2026</span>
          </div>
          <h1 className="relative z-10 text-[1.5rem] lg:text-[1.75rem] leading-[1.2] pl-4 pr-8 text-white">
            Expected Supply Deficit To Upset Copper Prices
          </h1>
          <button className="z-10 flex justify-center items-center gap-2 w-18 text-white border absolute bottom-2 left-4 bg-white rounded-lg px-3 py-2">
            <ArrowRight size={18} color="black" />
          </button>
          <div className="rounded-xl h-24 lg:h-28 absolute top-0 w-full z-0 bg-gradient-to-b from-[#FA6E43] to-transparent" />
        </Link>

        <Link
          href="/blogs"
          className="border my-8 border-primary w-[80%] px-5 py-3 text-primary lg:hidden flex justify-center items-center gap-3 rounded-full text-lg"
        >
          Read more <ArrowRight size={22} className="text-primary" />
        </Link>
      </div>
    </div>
  );
}

