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

              // update progress bar width
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${Math.max(3, self.progress * 100)}%`
              }

              dotsRef.current.forEach((dot, index) => {
                if (!dot) return
                const isActive = index === activeIndex
                dot.style.borderColor = isActive ? '#F26522' : 'rgba(255,255,255,0.28)'
                dot.style.background = isActive ? '#F26522' : 'transparent'
                dot.style.boxShadow = isActive ? '0 0 0 6px rgba(242,101,34,0.18)' : 'none'
                dot.style.transform = isActive ? 'scale(1.25)' : 'scale(1)'
                const inner = dot.querySelector && dot.querySelector('.w-2')
                if (inner) inner.style.opacity = isActive ? '1' : '0.9'
              })

              // animate year labels opacity/weight
              yearsRef.current.forEach((yr, idx) => {
                if (!yr) return
                const active = idx === activeIndex
                yr.style.opacity = active ? '1' : '0.55'
                yr.style.transform = active ? 'translateY(-4px) scale(1.02)' : 'translateY(0px) scale(1)'
                yr.style.transition = 'all 0.28s ease'
                yr.style.fontWeight = active ? '600' : '500'
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
              className="w-screen min-h-screen flex flex-col lg:flex-row items-center justify-center flex-shrink-0"
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
              <div className="w-full lg:w-1/2 flex-shrink-0 h-[38vh] lg:h-[62vh] px-8 lg:px-12 lg:px-16 py-4 lg:py-0">
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

        {/* Timeline indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-[700px] flex flex-col items-center z-10">
          {/* Years row */}
          <div className="flex w-full justify-between mb-2">
            {journeyData.map((item, i) => (
              <span
                key={i}
                ref={el => (yearsRef.current[i] = el)}
                className="text-white text-[13px] font-medium transition-all tracking-widest"
                style={{ opacity: i === 0 ? 1 : 0.6, letterSpacing: '0.14em' }}
              >
                {item.year}
              </span>
            ))}
          </div>
          {/* Timeline line and circles */}
          <div className="relative w-full h-8 flex items-center">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#F26522]/60 to-[#FA6E43]/40" />
            <div ref={progressBarRef} className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#F26522] rounded-full" style={{ width: '0%', transition: 'width 0.28s linear' }} />
            {journeyData.map((item, i) => (
              <div
                key={i}
                className="absolute z-10 flex flex-col items-center top-1/2 -translate-y-1/2"
                style={{ left: `calc(${(i / (journeyData.length - 1)) * 100}% - 16px)` }}
              >
                <div
                  ref={el => (dotsRef.current[i] = el)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border-4"
                  style={{
                    borderColor: i === 0 ? '#F26522' : 'rgba(255,255,255,0.18)',
                    background: i === 0 ? '#F26522' : 'transparent',
                    boxShadow: i === 0 ? '0 0 0 8px rgba(242,101,34,0.18)' : 'none',
                    transition: 'all 0.28s ease',
                    backdropFilter: 'saturate(120%) blur(2px)'
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 right-8 flex items-center gap-2 text-black/30 text-xs pointer-events-none select-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
