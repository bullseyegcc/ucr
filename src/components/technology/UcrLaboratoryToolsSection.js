
import Image from "next/image";
import { Badge } from "../../common/badge";
import SlideIn from "../../animations/SlideIn";
import FadeIn from "../../animations/FadeIn";
import CardAnimation from "../../animations/CardAnimation";
import { useState } from "react";

export default function UcrLaboratoryToolsSection() {

  const cards = [
    { title: "Oxygen Analyzers", src: "/tool.jpg", alt: "Oxygen Analyzers" },
    { title: "Thermo ARL Optical Emission Spectrometer", src: "/tool-2.png", alt: "Thermo ARL Optical Emission Spectrometer" },
    { title: "Metallurgical Microscope", src: "/tool-3.png", alt: "Metallurgical Microscope" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Translate so the active card's center is at 50vw. Offsets include gap-4 (1rem) between cards.
  // Index 0: track = [card0 90][gap][card1 70] → center at 45vw
  // Index 1: track = [card0 70][gap][card1 90][gap][card2 70] → center at 70vw + 1rem + 45vw
  // Index 2: track = [card1 70][gap][card2 90] → center at 70vw + 1rem + 45vw
  const translateXValue =
    currentIndex === 0
      ? "5vw"
      : "calc(50vw - 115vw - 1rem)"; // -65vw - 1rem

  return (
    <section className="w-full px-5 lg:px-10 py-20">
      <div className="flex flex-col gap-5 items-center text-center mb-14">
        <SlideIn direction="bottom" scrollTrigger={true} duration={0.8}>
          <Badge title="UCR Laboratory" />
        </SlideIn>

        <FadeIn className="text-3xl lg:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight lg:max-w-[80%]" scrollTrigger={true} duration={0.8}>
          <h2>Tools that have assisted UCR in upholding its exceptional international standards.</h2>
        </FadeIn>

        <div className="mt-4" />
      </div>

      {/* Mobile Slider: active card (including first and last) is centered via transform */}
      <div className="block sm:hidden w-full max-w-[100vw] flex flex-col items-center overflow-x-clip">
        <div className="relative w-full max-w-[100vw] flex flex-col items-stretch overflow-x-clip">
          <div className="w-full max-w-[100vw] min-w-0 overflow-x-clip">
            <div
              className="flex flex-row items-center gap-4 transition-[transform] duration-300 ease-in-out"
              style={{ transform: `translateX(${translateXValue})`, willChange: 'transform' }}
            >
              {cards.map((card, idx) => {
                const isActive = idx === currentIndex;
                const isVisible = Math.abs(currentIndex - idx) <= 1;
                const style = {
                  flex: isActive ? '0 0 90vw' : '0 0 70vw',
                  maxWidth: isActive ? '500px' : '350px',
                  minWidth: 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                };
                return (
                  <div
                    key={card.title}
                    className={`transition-[transform,opacity] duration-300 ease-in-out shrink-0 ${isActive ? 'z-10 scale-100' : 'z-0 scale-95 opacity-60'} ${!isVisible ? 'hidden' : 'block'}`}
                    style={style}
                  >
                    <article className="relative text-center h-[55vw] min-h-[340px] max-h-[420px] w-full group overflow-hidden rounded-xl bg-white shadow-sm">
                      <Image
                        src={card.src}
                        alt={card.alt}
                        width={1200}
                        height={800}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center' }}
                      />
                      <Image src='/labgrad.png' alt='Gradient Overlay' width={1200} height={800} className="absolute right-0 inset-0 h-full opacity-90 pointer-events-none" />
                      <div className="w-full absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-center text-lg font-medium leading-snug">{card.title}</h3>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Chevron navigation centered below card */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full border bg-white disabled:opacity-30"
              style={{
                borderColor: '#FA6E43',
                zIndex: 20,
              }}
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              <svg width="18" height="18" fill="none" stroke="#FA6E43" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full border bg-white disabled:opacity-30"
              style={{
                borderColor: '#D9D9D9',
                zIndex: 20,
              }}
              onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1))}
              disabled={currentIndex === cards.length - 1}
              aria-label="Next slide"
            >
              <svg width="18" height="18" fill="none" stroke="#D9D9D9" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid mt-16 gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <CardAnimation key={card.title} index={index}>
            <article className="relative text-center h-[35vh] sm:h-[60vh] lg:h-[70vh] group overflow-hidden rounded-xl bg-white shadow-sm transition duration-300">
              <Image
                src={card.src}
                alt={card.alt}
                width={1200}
                height={800}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Image src='/labgrad.png' alt='Gradient Overlay' width={1200} height={800} className="absolute right-0 inset-0 h-full opacity-90 pointer-events-none" />
              <div className="w-full absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-center text-lg lg:text-3xl font-medium leading-snug">{card.title}</h3>
              </div>
            </article>
          </CardAnimation>
        ))}
      </div>
    </section>
  );
}
