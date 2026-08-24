'use client';

import Image from "next/image";
import { useRef, useState } from "react";
import { Badge } from "../../common/badge";
import SlideIn from "../../animations/SlideIn";
import FadeIn from "../../animations/FadeIn";
import SequentialSlideIn from "../../animations/SequentialSlideIn";

const cards = [
  { title: "Oxygen Analyzers", src: "/technology/tool.jpg", alt: "Oxygen Analyzers" },
  { title: "Thermo ARL Optical Emission Spectrometer", src: "/technology/tool-2.png", alt: "Thermo ARL Optical Emission Spectrometer" },
  { title: "Metallurgical Microscope", src: "/technology/tool-3.png", alt: "Metallurgical Microscope" },
];

function LaboratoryCard({ card, className = "", priority = false }) {
  return (
    <article
      className={`relative overflow-hidden rounded-xl bg-[#1a1a1a] shadow-sm ${className}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={card.src}
          alt={card.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
          className="object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(255,106,0,0.45) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 z-[2] p-6">
        <h3 className="text-center text-lg font-medium leading-snug text-white lg:text-3xl">
          {card.title}
        </h3>
      </div>
    </article>
  );
}

export default function UcrLaboratoryToolsSection() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateXValue =
    currentIndex === 0
      ? "5vw"
      : currentIndex === 1
        ? "calc(50vw - 115vw - 1rem)"
        : "calc(50vw - 185vw - 2rem)";

  return (
    <section ref={sectionRef} className="relative z-10 w-full bg-white px-5 py-20 lg:px-10">
      <div className="mb-14 flex flex-col items-center gap-5 text-center">
        <SlideIn direction="bottom" scrollTrigger={true} duration={0.8}>
          <Badge title="UCR Laboratory" />
        </SlideIn>

        <FadeIn
          className="text-3xl font-medium leading-tight text-gray-900 lg:max-w-[80%] lg:text-4xl lg:text-5xl"
          scrollTrigger={true}
          duration={0.8}
        >
          <h2>Tools that have assisted UCR in upholding its exceptional international standards.</h2>
        </FadeIn>
      </div>

      <div className="block flex w-full max-w-[100vw] flex-col items-center overflow-x-clip sm:hidden">
        <div className="relative flex w-full max-w-[100vw] flex-col items-stretch overflow-x-clip">
          <div className="w-full min-w-0 max-w-[100vw] overflow-x-clip">
            <div
              className="flex flex-row items-center gap-4 transition-[transform] duration-300 ease-in-out"
              style={{ transform: `translateX(${translateXValue})`, willChange: "transform" }}
            >
              {cards.map((card, idx) => {
                const isActive = idx === currentIndex;
                const isVisible = Math.abs(currentIndex - idx) <= 1;

                return (
                  <div
                    key={card.title}
                    className={`shrink-0 transition-[transform,opacity] duration-300 ease-in-out ${isActive ? "z-10 scale-100" : "z-0 scale-95 opacity-60"} ${!isVisible ? "hidden" : "block"}`}
                    style={{
                      flex: isActive ? "0 0 90vw" : "0 0 70vw",
                      maxWidth: isActive ? "500px" : "350px",
                      minWidth: 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <LaboratoryCard
                      card={card}
                      priority={idx === 0}
                      className="h-[55vw] min-h-[340px] max-h-[420px] w-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border bg-white disabled:opacity-30"
              style={{ borderColor: "#FA6E43", zIndex: 20 }}
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              <svg width="18" height="18" fill="none" stroke="#FA6E43" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border bg-white disabled:opacity-30"
              style={{ borderColor: "#D9D9D9", zIndex: 20 }}
              onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1))}
              disabled={currentIndex === cards.length - 1}
              aria-label="Next slide"
            >
              <svg width="18" height="18" fill="none" stroke="#D9D9D9" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      <SequentialSlideIn
        scrollTriggerRef={sectionRef}
        className="mt-16 hidden grid-cols-1 gap-4 sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        itemClassName="h-full min-h-[35vh] sm:min-h-[60vh] lg:min-h-[70vh]"
        start="top 90%"
        end="top 40%"
        stagger={0.15}
        direction="bottom"
      >
        {cards.map((card, index) => (
          <LaboratoryCard
            key={card.title}
            card={card}
            priority={index === 0}
            className="h-full w-full"
          />
        ))}
      </SequentialSlideIn>
    </section>
  );
}
