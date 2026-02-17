"use client"

import Image from "next/image"
import { Badge } from "../common/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function JourneySection() {
  const [activeYear, setActiveYear] = useState(0)
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const chevronLeftRef = useRef(null)
  const chevronRightRef = useRef(null)

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

  const currentData = journeyData[activeYear]

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0.85,
          scale: 0.95,
          blur: 12
        },
        {
          opacity: 1,
          scale: 1,
          blur: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1.8,
            markers: false
          }
        }
      )

      // Main parallax movement on card
      gsap.to(
        cardRef.current,
        {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 2.2,
            markers: false
          }
        }
      )

      // Chevron animations
      gsap.to(
        [chevronLeftRef.current, chevronRightRef.current],
        {
          y: -20,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 2.2,
            markers: false
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-24 bg-[linear-gradient(164deg,#FFF_8.84%,#FA6E43_118.41%)] flex flex-col items-center px-4 sm:px-6">

      {/* Top Small Label */}
       <Badge title="Our Story " className="mb-2 md:mb-4" />

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-black mb-8 sm:mb-12 md:mb-16 mt-4 sm:mt-6 text-center">
        Over the years
      </h2>

      {/* Main Timeline Card with Navigation */}
      <div className="w-[85%] max-w-6xl flex items-center gap-2 sm:gap-4 justify-center">
        {/* Left Chevron */}
        <button
          ref={chevronLeftRef}
          onClick={() => setActiveYear(activeYear === 0 ? journeyData.length - 1 : activeYear - 1)}
          className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 border border-white/30 flex-shrink-0"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Main Card */}
      <div ref={cardRef} className="h-auto min-h-[500px] sm:min-h-[420px] md:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden flex md:flex-row flex-col shadow-xl flex-grow">

        {/* Left Image */}
        <div className="w-full h-48 sm:h-64 md:h-auto md:w-1/2 relative overflow-hidden">
          <Image
            src={currentData.image}
            alt={currentData.year}
            fill
            className="object-cover transition-all duration-500"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 bg-[#F26522] text-white relative px-6 py-8 sm:px-10 sm:py-10 md:px-16 md:py-14 flex flex-col justify-center">

          {/* Decorative Top Right Lines */}
          <div className="absolute top-10 sm:top-20 right-4 sm:right-6 opacity-20">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full blur-3xl"></div>
          </div>

          {/* Year */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-light leading-none mb-4 sm:mb-6 md:mb-8 transition-all duration-500">
            {currentData.year}
          </h1>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 transition-all duration-500">
            {currentData.title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed max-w-lg opacity-90 transition-all duration-500">
            {currentData.description}
          </p>
        </div>
      </div>

        {/* Right Chevron */}
        <button
          ref={chevronRightRef}
          onClick={() => setActiveYear(activeYear === journeyData.length - 1 ? 0 : activeYear + 1)}
          className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 border border-white/30 flex-shrink-0"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Timeline Navigation */}
      <div className="w-[85%] max-w-6xl mt-12 sm:mt-16 md:mt-20 relative flex flex-col items-center gap-8 sm:gap-12">

        {/* Horizontal Line */}

        <div className="flex justify-between items-center relative w-full px-2 sm:px-4">
                   <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-10 right-4 sm:right-10 h-[2px] bg-white/40 z-0"></div>

          {/* Timeline Points */}
          {journeyData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center z-90 cursor-pointer transition-all duration-300 hover:opacity-100"
              onClick={() => setActiveYear(index)}
            >
              <span className={`text-base sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4 transition-all duration-300 ${
                index === activeYear ? "text-white font-medium" : "text-white/60"
              }`}>
                {item.year}
              </span>
              <div className={`rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                index === activeYear
                  ? "w-10 h-10 sm:w-12 sm:h-12 bg-[#F26522]"
                  : "w-8 h-8 sm:w-10 sm:h-10 bg-white/30 hover:bg-white/40"
              }`}>
                <div className={`rounded-full transition-all duration-300 ${
                  index === activeYear
                    ? "w-3 h-3 sm:w-4 sm:h-4 bg-white"
                    : "w-2 h-2 sm:w-3 sm:h-3 bg-white"
                }`}></div>
              </div>
            </div>
          ))}

        </div>

        {/* End of timeline */}
      </div>

    </section >
  )
}
