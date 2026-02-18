"use client"

import Image from "next/image"
import { Badge } from "../common/badge"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const journeyData = [
    {
      year: "2009",
      title: "Founded With Vision",
      description: "Founded with a steadfast dedication to accuracy, quality, and innovation, our journey in copper production began with a clear purpose — to set new benchmarks in the industry. Every process, from sourcing to refinement, reflects our pursuit of perfection and reliability.",
      image: "/2009img.png"
    },
    {
      year: "2013",
      title: "Expansion & Growth",
      description: "Four years into our journey, we expanded our production capacity and established ourselves as a trusted name in the regional copper industry. Our commitment to excellence and customer satisfaction drove unprecedented growth and market recognition.",
      image: "/2009img.png"
    },
    {
      year: "2018",
      title: "Innovation & Technology",
      description: "A decade of dedication led us to integrate cutting-edge technology into our manufacturing processes. We invested heavily in automation and quality control, setting new industry standards for precision and efficiency.",
      image: "/2009img.png"
    },
    {
      year: "2024",
      title: "Global Excellence",
      description: "Today, we stand as a beacon of quality and innovation in the global copper market. Our world-class facilities and commitment to sustainability position us as the partner of choice for enterprises worldwide.",
      image: "/2009img.png"
    }
]

export default function JourneySection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const dotsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getSlideDistance = () => track.scrollWidth - section.offsetWidth

      gsap.to(track, {
        x: () => -getSlideDistance(),
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getSlideDistance()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const activeIndex = Math.round(self.progress * (journeyData.length - 1))
            dotsRef.current.forEach((dot, i) => {
              if (!dot) return
              dot.style.backgroundColor = i === activeIndex ? "#F26522" : "rgba(0,0,0,0.2)"
              dot.style.transform = i === activeIndex ? "scale(1.3)" : "scale(1)"
            })
          },
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen overflow-hidden bg-[linear-gradient(164deg,#FFF_8.84%,#FA6E43_118.41%)] relative"
    >
      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${journeyData.length * 100}vw` }}
      >
        {journeyData.map((item, index) => (
          <div
            key={index}
            className="w-screen h-full flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 lg:px-24 gap-8 lg:gap-20 flex-shrink-0"
          >
            {/* Left: text */}
            <div className="flex flex-col justify-center w-full md:w-1/2 gap-3 sm:gap-5 pt-10 md:pt-0">
              {index === 0 && (
                <div className="mb-1">
                  <Badge title="Our Story" />
                </div>
              )}

              <span className="text-[#F26522] text-xs font-semibold uppercase tracking-widest">
                {String(index + 1).padStart(2, "0")} / {String(journeyData.length).padStart(2, "0")}
              </span>

              <h1 className="text-[70px] sm:text-[100px] lg:text-[130px] font-light leading-none text-black/10 select-none -mb-4">
                {item.year}
              </h1>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1a1a]">
                {item.title}
              </h2>

              <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-md">
                {item.description}
              </p>

              {/* Dot progress */}
              <div className="flex items-center gap-3 mt-2">
                {journeyData.map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => (dotsRef.current[i] = el)}
                    data-active={i === index ? "true" : "false"}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: i === index ? "#F26522" : "rgba(0,0,0,0.2)",
                      transform: i === index ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: image */}
            <div className="w-full md:w-1/2 h-[38vh] md:h-[62vh] relative rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
              <Image
                src={item.image}
                alt={item.year}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-white text-5xl font-light">{item.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-black/30 text-xs pointer-events-none select-none">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
