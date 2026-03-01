"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Badge } from "../../common/badge"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const journeyData = [
    {
      year: "2009",
      title: "Founded With Vision",
      description: "Founded with a steadfast dedication to accuracy, quality, and innovation, our journey in copper production began with a clear purpose — to set new benchmarks in the industry. Every process, from sourcing to refinement, reflects our pursuit of perfection and reliability.",
      image: "/2009img.png",
      milestone: "Copper Excellence Begins"
    },
    {
      year: "2013",
      title: "Expansion & Growth",
      description: "Four years into our journey, we expanded our production capacity and established ourselves as a trusted name in the regional copper industry. Our commitment to excellence and customer satisfaction drove unprecedented growth and market recognition.",
      image: "/2009img.png",
      milestone: "Regional Recognition"
    },
    {
      year: "2018",
      title: "Innovation & Technology",
      description: "A decade of dedication led us to integrate cutting-edge technology into our manufacturing processes. We invested heavily in automation and quality control, setting new industry standards for precision and efficiency.",
      image: "/2009img.png",
      milestone: "Tech Innovation"
    },
    {
      year: "2024",
      title: "Global Excellence",
      description: "Today, we stand as a beacon of quality and innovation in the global copper market. Our world-class facilities and commitment to sustainability position us as the partner of choice for enterprises worldwide.",
      image: "/2009img.png",
      milestone: "Global Leader"
    }
]

export default function JourneySection() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const dotsRef = useRef([])
  const yearsRef = useRef([])
  const progressBarRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const track = trackRef.current

    if (!section || !pin || !track) return

    const timer = setTimeout(() => {
      gsap.fromTo(
        pin,
        {
          clipPath: "inset(6% 3% round 12px)",
          opacity: 0.2,
          scale: 0.93,
        },
        {
          clipPath: "inset(0% 0% round 0px)",
          opacity: 1,
          scale: 1,
          ease: "sine.out",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 10%",
            scrub: 0.8,
          },
        }
      )

      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const activeIndex = Math.round(
                self.progress * (journeyData.length - 1)
              )

              // update progress bar background position
              if (progressBarRef.current) {
                const progress = self.progress * 100
                progressBarRef.current.style.width = `${progress}%`
              }

              dotsRef.current.forEach((dot, index) => {
                if (!dot) return
                const isActive = index <= activeIndex
                
                // Clean minimal dot styling
                dot.style.borderColor = isActive ? '#FA6E43' : 'rgba(255,255,255,0.4)'
                dot.style.background = isActive ? '#FA6E43' : 'rgba(255,255,255,0.15)'
                dot.style.transform = isActive ? 'scale(1.1)' : 'scale(1)'
              })

              // animate year labels opacity
              yearsRef.current.forEach((yr, idx) => {
                if (!yr) return
                const active = idx <= activeIndex
                const isMobile = window.innerWidth < 640

                yr.style.opacity = active ? '1' : '0.5'
                yr.style.fontSize = active ? (isMobile ? '16px' : '18px') : (isMobile ? '12px' : '14px')
                yr.style.fontWeight = active ? '700' : '600'
                yr.style.transform = active ? 'scale(1.05)' : 'scale(1)'
                yr.style.transition = 'all 0.3s ease-out'
              })
            },
          },
        }
      )

      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section || st.trigger === pin) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full">
      <div
        ref={pinRef}
        className="w-screen min-h-screen overflow-hidden bg-[linear-gradient(164deg,#FFF_8.84%,#FA6E43_118.41%)] relative"
        style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
      >
        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${journeyData.length * 100}vw`, willChange: "transform" }}
        >
          {journeyData.map((item, index) => (
            <div
              key={index}
              className="w-screen min-h-screen flex flex-col lg:flex-row items-center justify-center flex-shrink-0 pb-28 lg:pb-0"
            >
              {/* Left: text */}
              <div className="flex flex-col justify-center w-full lg:w-1/2 h-full">
                <div className="flex flex-col gap-3 sm:gap-5 pt-10 lg:pt-0 px-8 lg:px-12 lg:px-16">
                  {index === 0 && (
                    <div className="mb-1">
                      <Badge title="Our Story" />
                    </div>
                  )}

                  <span className="text-[#F26522] text-xs font-semibold uppercase tracking-widest">
                    {String(index + 1).padStart(2, "0")} / {String(journeyData.length).padStart(2, "0")}
                  </span>

                  <h1 className="text-[70px] sm:text-[100px] lg:text-[130px] font-light leading-none text-white select-none -mb-4">
                    {item.year}
                  </h1>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1a1a]">
                    {item.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right: image */}
              <div className="w-full lg:w-1/2 flex-shrink-0 h-[30vh] sm:h-[38vh] lg:h-[62vh] px-8 lg:px-12 lg:px-16 py-4 lg:py-0">
                <div className="h-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full w-full">
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
              </div>
            </div>
          ))}
        </div>

        {/* REDESIGNED Timeline indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex flex-col items-center z-10 px-4 w-full">

          {/* Years row - above timeline */}
          <div className="relative w-[90%] mb-6 sm:mb-8 h-7">
            {journeyData.map((item, i) => (
              <div
                key={i}
                className="absolute top-0 flex justify-center w-12"
                style={{
                  left: `calc(${(i / (journeyData.length - 1)) * 100}% - 24px)`,
                }}
              >
                <span
                  ref={el => (yearsRef.current[i] = el)}
                  className="text-white text-[12px] sm:text-[14px] font-bold tracking-wider transition-all whitespace-nowrap"
                  style={{
                    opacity: i === 0 ? 1 : 0.5,
                    fontWeight: i === 0 ? '700' : '600',
                    letterSpacing: '0.03em',
                  }}
                >
                  {item.year}
                </span>
              </div>
            ))}
          </div>

          {/* Timeline line and circles */}
          <div className="relative w-[90%] my-5 flex items-center">
            {/* Background timeline track - Gray base line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 sm:h-px bg-white rounded-full" style={{ opacity: 0.3 }} />
            
            {/* Progress bar - Pure white, clean */}
            <div
              ref={progressBarRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 sm:h-px rounded-full"
              style={{
                width: '0%',
                background: 'white',
                transition: 'width 0.3s ease-out',
              }}
            />

            {/* Milestone dots */}
            {journeyData.map((item, i) => (
              <div
                key={i}
                className="absolute z-20 flex justify-center top-1/2 -translate-y-1/2"
                style={{ left: `calc(${(i / (journeyData.length - 1)) * 100}% - 28px)` }}
              >
                {/* Main dot container - Minimal clean design */}
                <div
                  ref={el => (dotsRef.current[i] = el)}
                  className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border-2 relative z-10"
                  style={{
                    borderColor: i === 0 ? '#FA6E43' : 'rgba(255,255,255,0.4)',
                    background: i === 0 ? '#FA6E43' : 'rgba(255,255,255,0.15)',
                    transition: 'all 0.3s ease-out',
                    transform: i === 0 ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {/* Inner white dot */}
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white"
                    style={{
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
  