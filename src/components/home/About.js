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
    <div className="relative w-full shrink-0 overflow-visible bg-white pt-[4.75rem] sm:pt-[5.25rem] lg:pt-[clamp(4.5rem,8vh,6rem)] pb-1 sm:pb-2 lg:pb-0">
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col px-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-[3rem] xl:gap-10 xl:px-[4rem] 2xl:px-[5rem]">
        <div className="relative w-full lg:max-w-[56%] xl:max-w-[58%]">
          <div className="flex flex-col items-center text-center gap-[0.5rem] sm:gap-[0.625rem] lg:items-start lg:text-left lg:gap-[clamp(0.75rem,1.5vh,1.25rem)]">
            <div className="relative z-20 flex items-center justify-center gap-[0.625rem] lg:justify-start">
              <Image src={badgeIcon} alt="" width={20} height={20} className="shrink-0 object-contain" />
              <span className="font-medium uppercase tracking-[0.14em] text-primary text-[0.75rem]">
                About Us
              </span>
            </div>

            <h1
              ref={headingRef}
              className="font-primary font-medium w-full max-w-none mt-1 text-[1.5rem] leading-[1.3] tracking-[-0.03em] text-primary sm:text-[1.625rem] lg:mt-0 lg:max-w-[48rem] lg:text-[clamp(2rem,1.2rem+1.7vw,3.75rem)] lg:leading-[1.24] xl:max-w-[52rem] 2xl:max-w-[56rem]"
            >
              {HEADING_TEXT}
            </h1>

            <div className="relative z-10 flex w-full items-center justify-center min-h-[3.25rem] sm:min-h-[4rem] lg:min-h-0 lg:justify-start">
              <Link href="/aboutus" className="relative z-10">
                <button className="inline-flex h-[2.5rem] min-w-[8.75rem] items-center justify-between gap-[0.625rem] rounded-full border border-white/30 bg-primary px-[1.125rem] text-[0.875rem] text-white lg:h-[3rem] lg:min-w-[11.25rem] lg:px-[1.5rem] lg:text-[1rem]">
                  <span className="font-primary font-normal tracking-[-0.025em]">Know more</span>
                  <ArrowRight size={18} color="white" className="shrink-0" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop: copper icon beside the heading */}
        <div className="pointer-events-none relative z-0 hidden w-full shrink-0 lg:flex lg:w-[40%] xl:w-[38%] 2xl:w-[36%] lg:items-center lg:justify-end">
          <Image
            src="/home/aboutside.png"
            alt=""
            width={900}
            height={800}
            priority
            className="h-auto w-full max-h-[min(42vh,28rem)] object-contain object-right xl:max-h-[min(48vh,32rem)] 2xl:max-h-[min(50vh,34rem)]"
          />
        </div>
      </div>
    </div>
  );
}
