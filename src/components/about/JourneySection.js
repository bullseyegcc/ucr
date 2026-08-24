"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Badge } from "../../common/badge";

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    year: "2007",
    tag: "The Foundation",
    title: "Union Copper Rod Is Established",
    description:
      "UCR was established in Abu Dhabi with a clear ambition: to build a world-class copper rod manufacturing facility serving the region's growing electrical and industrial needs.",
    image: "/about/2009img.png",
  },
  {
    year: "2009",
    tag: "Production Begins",
    title: "From vision to manufacturing",
    description:
      "UCR commenced commercial production, bringing its advanced copper rod manufacturing capabilities into operation at Industrial City of Abu Dhabi.",
    image: "/about/aboutimg.png",
  },
  {
    year: "2012",
    tag: "Quality Takes Shape",
    title: "International standards from the start",
    description:
      "UCR achieved ISO 9001, ISO 14001 and OHSAS 18001 certifications, establishing quality, environmental management and occupational safety as core operating standards.",
    image: "/home/excellence.png",
  },
  {
    year: "2018",
    tag: "Regional Scale",
    title: "Growing beyond borders",
    description:
      "UCR reached a new level of regional maturity, strengthening its position as the Middle East's largest copper rod production facility and expanding its role in serving customers across the region.",
    image: "/home/moreabout.png",
  },
  {
    year: "2020",
    tag: "Smarter Operations",
    title: "Building a more connected business",
    description:
      "UCR began its SAP implementation, strengthening its operational, financial and supply-chain systems to support a growing manufacturing and distribution network.",
    image: "/about/ourcompany.png",
  },
  {
    year: "2024",
    tag: "A More Sustainable Future",
    title: "Quality meets responsibility",
    description:
      "UCR achieved EPD certification for its ETP Copper Rods and advanced its sustainability journey, providing transparent information on product environmental impact while reinforcing its commitment to responsible manufacturing.",
    image: "/home/recycle.png",
  },
];

const SECTION_BG =
  "linear-gradient(180deg, #FFF8F4 0%, #F6D0C0 55%, #F0A888 100%)";

function DiagonalRays() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 w-[45%] overflow-hidden"
      aria-hidden
    >
      {[
        { top: "2%", width: "55%" },
        { top: "10%", width: "70%" },
        { top: "18%", width: "85%" },
        { top: "26%", width: "68%" },
        { top: "34%", width: "48%" },
      ].map((ray, i) => (
        <span
          key={i}
          className="absolute right-[-10%] h-[clamp(0.5rem,1.2cqi,0.875rem)] rounded-full bg-white/20"
          style={{
            top: ray.top,
            width: ray.width,
            transform: "rotate(36deg)",
            transformOrigin: "right center",
          }}
        />
      ))}
    </div>
  );
}

function JourneyCard({ item, priority = false }) {
  return (
    <article className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] bg-primary shadow-[0_16px_40px_rgba(254,93,10,0.18)] md:flex-row lg:rounded-[2rem]">
      <div className="relative h-[36%] w-full shrink-0 overflow-hidden md:h-full md:w-1/2">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 50vw"
          priority={priority}
        />
      </div>

      {/* @container so type/spacing scale with the orange panel, not the viewport */}
      <div className="@container relative flex min-h-0 w-full flex-1 flex-col justify-between bg-primary p-[clamp(1.15rem,6cqi,2.75rem)] md:w-1/2">
        <DiagonalRays />

        <div className="relative z-10 flex shrink-0 flex-col gap-[clamp(0.5rem,2.4cqi,0.85rem)]">
          <span className="inline-flex w-fit items-center rounded-md bg-white/20 px-[clamp(0.8rem,3cqi,1.15rem)] py-[clamp(0.4rem,1.4cqi,0.6rem)] text-[clamp(0.9375rem,3.2cqi,1.125rem)] font-medium leading-none text-white">
            {item.tag}
          </span>
          <h3 className="font-primary text-[clamp(3.25rem,21cqi,7.5rem)] font-light leading-[0.95] tracking-[-0.04em] text-white">
            {item.year}
          </h3>
        </div>

        <div className="relative z-10 mt-[clamp(0.75rem,4cqi,1.5rem)] flex min-h-0 max-w-[36em] flex-col gap-[clamp(0.6rem,2.8cqi,1rem)] md:mt-0">
          <h4 className="font-primary text-[clamp(1.45rem,6.2cqi,2.4rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
            {item.title}
          </h4>
          <p className="font-primary text-[clamp(1.0625rem,4.2cqi,1.5rem)] font-normal leading-[1.6] text-white/95">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function scrollToY(y, { immediate = false } = {}) {
  if (typeof window === "undefined") return;
  const lenis = window.lenisInstance;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(y, { immediate, duration: immediate ? 0 : 1.1 });
    return;
  }
  window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}

export default function JourneySection() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!section || !pin || !track || !viewport) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(track, { x: 0 });
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    let ctx;

    const setup = () => {
      ctx?.revert();
      scrollTriggerRef.current = null;

      const syncTrackPad = () => {
        const card = track.firstElementChild;
        if (!card) return;
        const pad = Math.max(
          16,
          (viewport.clientWidth - card.getBoundingClientRect().width) / 2
        );
        track.style.paddingLeft = `${pad}px`;
        track.style.paddingRight = `${pad}px`;
      };

      const getTravel = () => {
        syncTrackPad();
        return Math.max(0, track.scrollWidth - viewport.clientWidth);
      };

      ctx = gsap.context(() => {
        gsap.set(track, { x: 0, force3D: true });

        const tween = gsap.to(track, {
          x: () => -getTravel(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.max(
                getTravel() * (isMobile ? 1.35 : 1.55),
                window.innerHeight * 1.4
              )}`,
            pin: pin,
            pinSpacing: true,
            scrub: isMobile ? 0.5 : 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            snap: {
              snapTo: 1 / Math.max(journeyData.length - 1, 1),
              duration: { min: 0.12, max: 0.35 },
              ease: "power1.inOut",
              delay: 0.02,
            },
            onUpdate: (self) => {
              const max = journeyData.length - 1;
              const next = Math.round(self.progress * max);
              setActiveIndex((prev) => (prev === next ? prev : next));
            },
          },
        });

        scrollTriggerRef.current = tween.scrollTrigger;
      }, section);

      ScrollTrigger.refresh();
    };

    const readyTimer = window.setTimeout(setup, 120);
    const onReady = () => {
      setup();
    };

    window.addEventListener("scrollAnimationsReady", onReady);
    window.addEventListener("lenisReady", onReady);

    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("scrollAnimationsReady", onReady);
      window.removeEventListener("lenisReady", onReady);
      ctx?.revert();
      scrollTriggerRef.current = null;
    };
  }, []);

  const goTo = useCallback((index) => {
    const next =
      ((index % journeyData.length) + journeyData.length) % journeyData.length;
    const st = scrollTriggerRef.current;

    if (!st) {
      setActiveIndex(next);
      return;
    }

    const max = journeyData.length - 1;
    const progress = max === 0 ? 0 : next / max;
    const target = st.start + (st.end - st.start) * progress;
    scrollToY(target);
    setActiveIndex(next);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ background: SECTION_BG }}
      aria-label="Our journey"
    >
      <div
        ref={pinRef}
        className="relative flex h-screen w-full flex-col overflow-x-hidden"
        style={{ background: SECTION_BG }}
      >
        <div className="mx-auto w-full max-w-[1600px] shrink-0 px-4 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pt-32 xl:px-12">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-10 lg:mb-12">
            <Badge title="Our Story" />
            <h2 className="mt-[clamp(0.75rem,1.2vw,1.25rem)] font-primary text-[clamp(1.75rem,3.5vw,3.25rem)] font-medium leading-[1.15] tracking-[-0.04em] text-[#1a1a1a] lg:tracking-[-0.06em]">
              Over the years
            </h2>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative flex min-h-0 w-full flex-1 items-center overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex w-max items-center gap-[clamp(1.5rem,3vw,3.5rem)] will-change-transform"
            style={{ touchAction: "pan-y" }}
          >
            {journeyData.map((item, i) => (
              <div
                key={item.year}
                className="relative h-[clamp(22rem,58dvh,34rem)] w-[clamp(18rem,88vw,22rem)] shrink-0 md:h-[clamp(22rem,48dvh,30rem)] md:w-[clamp(40rem,86vw,68rem)]"
                aria-hidden={i !== activeIndex}
              >
                <JourneyCard item={item} priority={i === 0} />
              </div>
            ))}
          </div>

          {activeIndex < journeyData.length - 1 && (
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next milestone"
              className="absolute right-[max(0.75rem,calc((100%-min(86vw,68rem))/2-1.5rem))] top-1/2 z-20 flex h-[clamp(2.5rem,3.5vw,3rem)] w-[clamp(2.5rem,3.5vw,3rem)] -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white bg-transparent text-white transition-colors hover:bg-white/15"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          )}
        </div>

        <div className="relative mx-auto mt-8 w-[90%] max-w-[920px] shrink-0 px-4 pb-8 sm:mt-10 sm:pb-10 lg:mt-12 lg:pb-12">
          <div className="relative mb-3 h-7 sm:mb-4 sm:h-8">
            {journeyData.map((item, i) => {
              const isActive = i === activeIndex;
              const left =
                journeyData.length === 1
                  ? "50%"
                  : `${(i / (journeyData.length - 1)) * 100}%`;

              return (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => goTo(i)}
                  className="absolute top-0 -translate-x-1/2 cursor-pointer"
                  style={{ left }}
                  aria-label={`Go to ${item.year}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={`block whitespace-nowrap font-primary transition-all duration-300 ${
                      isActive
                        ? "text-[clamp(0.9375rem,1.15vw,1.125rem)] font-bold text-white"
                        : "text-[clamp(0.75rem,0.95vw,0.9rem)] font-semibold text-white/50"
                    }`}
                  >
                    {item.year}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative h-11 sm:h-12">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/50" />

            {journeyData.map((item, i) => {
              const isActive = i === activeIndex;
              const left =
                journeyData.length === 1
                  ? "50%"
                  : `${(i / (journeyData.length - 1)) * 100}%`;

              return (
                <button
                  key={`dot-${item.year}`}
                  type="button"
                  onClick={() => goTo(i)}
                  className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left }}
                  aria-label={`Select ${item.year}`}
                >
                  <span
                    className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-10 w-10 bg-primary shadow-[0_0_0_7px_rgba(254,93,10,0.3)] sm:h-11 sm:w-11 sm:shadow-[0_0_0_8px_rgba(254,93,10,0.3)]"
                        : "h-[18px] w-[18px] border border-white/55 bg-white/20 sm:h-5 sm:w-5"
                    }`}
                  >
                    <span
                      className={`rounded-full bg-white transition-all duration-300 ${
                        isActive
                          ? "h-2.5 w-2.5 sm:h-3 sm:w-3"
                          : "h-1.5 w-1.5 opacity-80"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
