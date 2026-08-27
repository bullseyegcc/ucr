'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import badgeIcon from '../../../public/shared/badge.png';
import gsap from 'gsap';

const HEADING_ORANGE =
  'Our UAE factory combines advanced technology with global';
const HEADING_GREY =
  'expertise to produce high-quality copper products that meet international standards.';
const HEADING_TEXT = `${HEADING_ORANGE} ${HEADING_GREY}`;
const ORANGE_WORD_COUNT = HEADING_ORANGE.trim().split(/\s+/).length;

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

  useEffect(() => {
    if (typeof window === 'undefined' || !lockProgressRef) return;

    let colorTl;
    const timerId = setTimeout(() => {
      const heading = headingRef.current;
      if (!heading) return;

      const wordSpans = splitIntoWordSpans(heading);
      if (!wordSpans.length) return;

      wordSpans.forEach((span, i) => {
        span.style.color = i < ORANGE_WORD_COUNT ? '#FA6E43' : '#C8C8C8';
      });

      const targetColor = '#FA6E43';
      colorTl = gsap.timeline({ paused: true });

      wordSpans.forEach((span, i) => {
        if (i < ORANGE_WORD_COUNT) return;
        colorTl.to(span, { color: targetColor, duration: 1, ease: 'none' }, i - ORANGE_WORD_COUNT);
      });

      lockProgressRef.current = (progress) => colorTl.progress(progress);
    }, 250);

    return () => {
      clearTimeout(timerId);
      colorTl?.kill();
      lockProgressRef.current = null;
    };
  }, [lockProgressRef]);

  return (
    <div className="relative w-full shrink-0 overflow-visible bg-white pt-0 sm:pt-1 lg:pt-[5.5rem] pb-6 sm:pb-8 lg:pb-0">
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-3 lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem]">
        <div className="relative w-full lg:max-w-[58%] xl:max-w-[62%]">
          <div className="flex flex-col items-center text-center gap-[0.625rem] sm:gap-[0.75rem] lg:items-start lg:text-left lg:gap-[1rem]">
            <div className="flex items-center justify-center gap-[0.625rem] lg:justify-start">
              <Image src={badgeIcon} alt="" width={20} height={20} className="shrink-0 object-contain" />
              <span className="font-medium uppercase tracking-[0.14em] text-primary text-[0.6875rem] lg:text-[0.75rem]">
                About Us
              </span>
            </div>

            <h1
              ref={headingRef}
              className="font-primary font-medium w-full max-w-none text-[1.75rem] leading-[1.32] tracking-[-0.03em] text-primary lg:max-w-[46rem] lg:text-[clamp(1.75rem,1.05rem+1.4vw,3.375rem)] lg:leading-[1.28] xl:max-w-[50rem] 2xl:max-w-[54rem]"
            >
              {HEADING_TEXT}
            </h1>

            <div className="relative z-10 flex w-full items-center justify-center min-h-[3.75rem] sm:min-h-[4.5rem] lg:min-h-0 lg:justify-start">
              <Link href="/aboutus" className="relative z-10">
                <button className="inline-flex h-[2.5rem] min-w-[8.75rem] items-center justify-between gap-[0.625rem] rounded-full border border-white/30 bg-primary px-[1.125rem] text-[0.875rem] text-white lg:h-[3rem] lg:min-w-[11.25rem] lg:px-[1.5rem] lg:text-[1rem]">
                  <span className="font-primary font-normal tracking-[-0.025em]">Know more</span>
                  <ArrowRight size={18} color="white" className="shrink-0" />
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile / tablet: sit beside Know more (circled spot). Desktop: right of copy. */}
          <div className="pointer-events-none absolute right-[-1.25rem] bottom-[-0.25rem] z-0 w-[48%] max-w-[11.5rem] sm:right-[-0.5rem] sm:bottom-[-0.5rem] sm:max-w-[14rem] lg:right-[-42%] lg:top-[10%] lg:bottom-auto lg:w-[78%] lg:max-w-[28rem] xl:right-[-48%] xl:max-w-[34rem]">
            <Image
              src="/home/aboutside.png"
              alt=""
              width={900}
              height={800}
              priority
              className="h-auto w-full object-contain object-right max-h-[9.5rem] sm:max-h-[12rem] lg:max-h-[min(48vh,30rem)] xl:max-h-[min(52vh,34rem)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
