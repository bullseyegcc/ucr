'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import badgeIcon from '../../../public/badge.png';
import gsap from 'gsap';
import CardAnimation from '../../animations/CardAnimation.js';

const HEADING_TEXT =
  'Shaping the Future With Copper From the UAE to global markets, we deliver premium copper solutions engineered for performance, reliability, and sustainable progress.';

function splitIntoWordSpans(element) {
  const wordSpans = [];

  function processElement(node) {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent;
        if (!text.trim()) return;
        const fragment = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((word) => {
          if (word.trim()) {
            const span = document.createElement('span');
            span.textContent = word;
            span.className = 'word-span';
            span.style.color = '#C8C8C8';
            fragment.appendChild(span);
            wordSpans.push(span);
          } else if (word) {
            fragment.appendChild(document.createTextNode(word));
          }
        });
        child.parentNode.replaceChild(fragment, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        processElement(child);
      }
    });
  }

  processElement(element);
  return wordSpans;
}

export default function About({ lockProgressRef = null }) {
  const headingRef = useRef(null);
  const smoothedProgressRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !headingRef.current) return;

    let colorTl;
    let rafId;
    const timerId = setTimeout(() => {
      const h1 = headingRef.current;
      if (!h1) return;

      const wordSpans = splitIntoWordSpans(h1);
      if (!wordSpans.length) return;

      const targetColor = '#FA6E43';
      colorTl = gsap.timeline({ paused: true });
      colorTl.to(wordSpans, {
        color: targetColor,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.06,
      });

      if (lockProgressRef) {
        lockProgressRef.current = (p) => {
          const target = gsap.utils.clamp(0, 1, p);
          const tick = () => {
            const current = smoothedProgressRef.current;
            const next = current + (target - current) * 0.12;
            smoothedProgressRef.current = Math.abs(target - next) < 0.001 ? target : next;
            colorTl.progress(smoothedProgressRef.current);
            if (smoothedProgressRef.current !== target) {
              rafId = requestAnimationFrame(tick);
            }
          };
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(tick);
        };
      }
    }, 200);

    return () => {
      clearTimeout(timerId);
      if (rafId) cancelAnimationFrame(rafId);
      colorTl?.kill();
      if (lockProgressRef) lockProgressRef.current = null;
    };
  }, [lockProgressRef]);

  return (
    <div className="w-full shrink-0 max-h-[1000px] overflow-hidden pt-[4.5rem] sm:pt-[5rem] lg:pt-[5.5rem] pb-[1.25rem] lg:pb-[1.75rem]">
      <div className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem]">
        <div className="relative w-full">
          <div className="hidden lg:block absolute right-0 top-[4.5rem] lg:top-[5rem] w-[38%] max-w-[42rem] pointer-events-none z-0">
            <Image
              src="/aboutside.png"
              alt="Copper coil"
              width={900}
              height={800}
              priority
              className="w-full h-auto object-contain object-right max-h-[min(52vh,34rem)] xl:max-h-[min(56vh,36rem)]"
            />
          </div>

          <div className="relative z-10 flex flex-col gap-[0.625rem] sm:gap-[0.75rem] lg:gap-[1rem] w-full lg:max-w-[58%] xl:max-w-[62%]">
            <div className="flex items-center gap-[0.625rem]">
              <Image src={badgeIcon} alt="" width={20} height={20} className="object-contain shrink-0" />
              <span className="text-[#9A9A9A] uppercase text-[0.6875rem] lg:text-[0.75rem] tracking-[0.14em] font-medium">
                About Us
              </span>
            </div>

            <div className="lg:hidden flex justify-center">
              <Image
                src="/aboutside.png"
                alt="Copper coil"
                width={900}
                height={800}
                priority
                className="w-full max-w-[18rem] sm:max-w-[20rem] h-auto object-contain max-h-[28vh]"
              />
            </div>

            <h1
              ref={headingRef}
              className="font-primary font-medium w-full max-w-[40rem] sm:max-w-[42rem] lg:max-w-[46rem] xl:max-w-[50rem] 2xl:max-w-[54rem] text-[clamp(1.75rem,1.2rem+1.55vw,3.375rem)] leading-[1.28] tracking-[-0.03em]"
            >
              {HEADING_TEXT}
            </h1>

            <CardAnimation>
              <Link href="/aboutus">
                <button className="bg-primary text-[0.875rem] lg:text-[1rem] min-w-[8.75rem] lg:min-w-[11.25rem] h-[2.5rem] lg:h-[3rem] px-[1.125rem] lg:px-[1.5rem] text-white inline-flex justify-between items-center gap-[0.625rem] rounded-full border border-white/30 hover:brightness-105 transition-all duration-300">
                  <span className="font-primary font-normal tracking-[-0.025em]">Know more</span>
                  <ArrowRight size={18} color="white" className="shrink-0" />
                </button>
              </Link>
            </CardAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}
