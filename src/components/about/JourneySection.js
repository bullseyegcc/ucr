"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "../../common/badge";

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    year: "2007",
    tag: "The Foundation",
    title: "Union Copper Rod Is Established",
    description:
      "UCR was established in Abu Dhabi with a clear ambition: to build a world-class copper rod manufacturing facility serving the region's growing electrical and industrial needs.",
    image: "/about/story-1.png",
  },
  {
    year: "2009",
    tag: "Production Begins",
    title: "From vision to manufacturing",
    description:
      "UCR commenced commercial production, bringing its advanced copper rod manufacturing capabilities into operation at Industrial City of Abu Dhabi.",
    image: "/about/story-2.png",
  },
  {
    year: "2012",
    tag: "Quality Takes Shape",
    title: "International standards from the start",
    description:
      "UCR achieved ISO 9001, ISO 14001 and OHSAS 18001 certifications, establishing quality, environmental management and occupational safety as core operating standards.",
    image: "/about/story-3.png",
  },
  {
    year: "2018",
    tag: "Regional Scale",
    title: "Growing beyond borders",
    description:
      "UCR reached a new level of regional maturity, strengthening its position as the Middle East's largest copper rod production facility and expanding its role in serving customers across the region.",
    image: "/about/story-4.png",
  },
  {
    year: "2020",
    tag: "Smarter Operations",
    title: "Building a more connected business",
    description:
      "UCR began its SAP implementation, strengthening its operational, financial and supply-chain systems to support a growing manufacturing and distribution network.",
    image: "/about/story-5.png",
  },
  {
    year: "2024",
    tag: "A More Sustainable Future",
    title: "Quality meets responsibility",
    description:
      "UCR achieved EPD certification for its ETP Copper Rods and advanced its sustainability journey, providing transparent information on product environmental impact while reinforcing its commitment to responsible manufacturing.",
    image: "/about/story-6.png",
  },
];

const SECTION_BG =
  "linear-gradient(180deg, #FFF8F4 0%, #F6D0C0 55%, #F0A888 100%)";

/** Mid peach — mobile fill so bottom matches the color between cards */
const MOBILE_SECTION_FILL = "#F6D0C0";

const SECTION_BG_CLASS =
  "bg-[#F6D0C0] md:bg-[linear-gradient(180deg,#FFF8F4_0%,#F6D0C0_55%,#F0A888_100%)]";

/** Soft side fades — horizontal + vertical so top/corners blend into the section */
const EDGE_FADE_LEFT =
  "linear-gradient(to right, black 0%, rgba(0,0,0,0.7) 40%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)";
const EDGE_FADE_RIGHT =
  "linear-gradient(to left, black 0%, rgba(0,0,0,0.7) 40%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)";
const EDGE_FADE_MASK = {
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

const ARROW_BTN =
  "absolute top-1/2 z-30 flex h-[clamp(2.25rem,3.2vw,3rem)] w-[clamp(2.25rem,3.2vw,3rem)] -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] transition-colors";

/** Shared card width — track items + timeline stay aligned */
const CARD_WIDTH =
  "w-[min(88vw,21rem)] md:w-[min(76vw,54rem)] lg:w-[min(72vw,56rem)]";

const CARD_SHELL = `h-[min(61dvh,25.5rem)] shrink-0 self-start md:h-full md:max-h-[min(74dvh,34rem)] md:self-center lg:max-h-[min(78dvh,36rem)] ${CARD_WIDTH}`;

const CARD_GAP = "gap-[clamp(4.5rem,11vw,10.5rem)]";

/** Settle zones at pin start/end — no card movement during this portion of scroll */
const PIN_BUFFER_RATIO = 0.075;

function cardProgressToTimeline(cardProgress) {
  return PIN_BUFFER_RATIO + cardProgress * (1 - 2 * PIN_BUFFER_RATIO);
}

function timelineProgressToCard(timelineProgress) {
  if (timelineProgress <= PIN_BUFFER_RATIO) return 0;
  if (timelineProgress >= 1 - PIN_BUFFER_RATIO) return 1;
  return (timelineProgress - PIN_BUFFER_RATIO) / (1 - 2 * PIN_BUFFER_RATIO);
}

function getTimelineState(index, activeIndex) {
  if (index < activeIndex) return "completed";
  if (index === activeIndex) return "active";
  return "upcoming";
}

function getTimelineProgress(activeIndex, total) {
  if (total <= 1) return 100;
  return (activeIndex / (total - 1)) * 100;
}

/** Shared horizontal inset — arrows + timeline use the same rail */
const TIMELINE_X_PAD = "clamp(1rem, 5vw, 3.75rem)";

/** Mobile timeline step — wider than viewport so track scrolls with progress */
const MOBILE_TIMELINE_STEP_REM = 6.25;

const CORNER_SVG = "/about/corner%20svg.svg";
const CORNER_SIZE =
  "pointer-events-none absolute z-20 h-[clamp(3.25rem,14cqi,6.5rem)] w-[clamp(3.25rem,14cqi,6.5rem)] select-none object-contain";

function JourneyCard({ item, priority = false }) {
  return (
    <article className="relative isolate flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[1.5rem] bg-[#FA6E43] shadow-[0_18px_48px_rgba(250,110,67,0.28)] md:flex-row lg:rounded-[1.75rem]">
      {/* Image side — narrower than content */}
      <div className="relative h-[clamp(8.5rem,34%,12rem)] w-full shrink-0 overflow-hidden md:h-auto md:min-h-0 md:w-[42%] md:self-stretch">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 92vw, 38vw"
          priority={priority}
        />
      </div>

      {/* Orange content — size container so type scales with both width & height */}
      <div className="relative flex min-h-0 w-full flex-1 flex-col justify-between bg-[#FA6E43] px-[clamp(0.85rem,3.5cqmin,2rem)] py-[clamp(0.9rem,3.8cqmin,2.25rem)] [container-type:size] md:w-[58%]">
        {/* Top block — badge + year */}
        <div className="relative z-10 flex min-w-0 shrink-0 flex-col gap-[clamp(0.4rem,2.2cqmin,1.1rem)]">
          <span className="inline-flex w-fit max-w-full items-center bg-white/10 px-[clamp(0.7rem,3.2cqmin,1.2rem)] py-[clamp(0.4rem,1.6cqmin,0.6rem)] text-[clamp(0.8125rem,3cqmin,1.0625rem)] font-medium leading-none tracking-[-0.01em] text-white">
            {item.tag}
          </span>

          <h3 className="min-w-0 font-primary text-[clamp(2.75rem,min(19cqi,30cqb),6.75rem)] font-extralight leading-[0.92] tracking-[-0.04em] text-white">
            {item.year}
          </h3>
        </div>

        {/* Bottom block — title + description */}
        <div className="relative z-10 mt-[clamp(0.5rem,2.5cqmin,1.25rem)] flex min-h-0 min-w-0 flex-col gap-[clamp(0.45rem,2cqmin,0.9rem)]">
          <h4 className="font-primary text-[clamp(1.35rem,5.5vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.02em] text-white md:text-[clamp(1.2rem,min(6cqi,7.5cqb),2.35rem)]">
            {item.title}
          </h4>
          <p className="font-primary text-[clamp(0.875rem,min(3.7cqi,4.5cqb),1.125rem)] font-normal leading-[1.55] text-white/95">
            {item.description}
          </p>
        </div>
      </div>

      {/* Decorative corner — top right */}
      <Image
        src={CORNER_SVG}
        alt=""
        width={141}
        height={146}
        aria-hidden
        className={`${CORNER_SIZE} right-0 top-0`}
      />
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
    // Desktop uses Lenis (native window scroll). Fixed pins reflow the document
    // at engage/release and fight Lenis momentum — transform pin avoids that.
    let ctx;

    const setup = () => {
      // Rebuild only once; later ready events just refresh + sync Lenis size
      if (scrollTriggerRef.current) {
        ScrollTrigger.refresh();
        window.lenisInstance?.resize?.();
        return;
      }

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

      /** Horizontal distance: first card center → last card center (both centered in viewport) */
      const getTravel = () => {
        syncTrackPad();
        const cards = Array.from(track.children);
        if (cards.length < 2) return 0;

        const first = cards[0];
        const last = cards[cards.length - 1];
        const firstCenter = first.offsetLeft + first.offsetWidth / 2;
        const lastCenter = last.offsetLeft + last.offsetWidth / 2;

        return Math.max(0, lastCenter - firstCenter);
      };

      /** Active card-scroll distance (~17% longer than before for smoother pacing) */
      const getActiveScrollDistance = () => {
        const steps = Math.max(journeyData.length - 1, 1);
        const vhStep = isMobile ? 0.36 : 0.41;
        return Math.max(
          steps * window.innerHeight * vhStep,
          window.innerHeight * 0.45
        );
      };

      /** Total pinned scroll = active distance + start/end settle buffers */
      const getTotalScrollDistance = () =>
        getActiveScrollDistance() / (1 - 2 * PIN_BUFFER_RATIO);

      ctx = gsap.context(() => {
        gsap.set(track, { x: 0, force3D: true });

        const activeDuration = 1 - 2 * PIN_BUFFER_RATIO;

        const tl = gsap.timeline({
          scrollTrigger: {
            // Outer section owns the trigger/spacer; inner pin is the visual lock
            trigger: section,
            pin: pin,
            start: "top top",
            end: () => `+=${getTotalScrollDistance()}`,
            pinSpacing: true,
            // Mobile: fixed pin is reliable without Lenis. Desktop: transform
            // avoids Lenis engage/release jolt — leave desktop unchanged.
            pinType: isMobile ? "fixed" : "transform",
            anticipatePin: isMobile ? 0 : 1,
            scrub: isMobile ? 0.45 : 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            // No ScrollTrigger snap — it fights Lenis scroll position and
            // amplifies pin boundary jolts. Card index still tracks progress;
            // arrows/dots use lenis.scrollTo.
            onUpdate: (self) => {
              const cardProgress = timelineProgressToCard(self.progress);
              const max = journeyData.length - 1;
              const next = Math.round(cardProgress * max);
              setActiveIndex((prev) => (prev === next ? prev : next));
            },
            onLeaveBack: () => {
              gsap.set(track, { x: 0 });
              setActiveIndex(0);
            },
            onRefresh: (self) => {
              const spacer = self.pin?.parentElement;
              if (spacer?.classList?.contains("pin-spacer")) {
                // Mobile: solid bottom tone so leftover viewport matches section.
                // Desktop: keep full gradient (unchanged).
                spacer.style.background = isMobile
                  ? MOBILE_SECTION_FILL
                  : SECTION_BG;
                spacer.style.boxSizing = "border-box";
              }
              window.lenisInstance?.resize?.();
            },
          },
        });

        tl.to(track, { x: 0, duration: PIN_BUFFER_RATIO, ease: "none" })
          .to(track, {
            x: () => -getTravel(),
            duration: activeDuration,
            ease: "none",
          })
          .to(track, {
            x: () => -getTravel(),
            duration: PIN_BUFFER_RATIO,
            ease: "none",
          });

        scrollTriggerRef.current = tl.scrollTrigger;
      }, section);

      ScrollTrigger.refresh();
      window.lenisInstance?.resize?.();
    };

    const onReady = () => {
      setup();
    };

    // Prefer building after Lenis on desktop so pin metrics match live scroll
    const readyTimer = window.setTimeout(() => {
      if (!isMobile && !window.lenisInstance) return;
      setup();
    }, 120);

    window.addEventListener("scrollAnimationsReady", onReady);
    window.addEventListener("lenisReady", onReady);

    // Mobile browser chrome changes visible height — refresh pin metrics only
    let vvTimer = 0;
    const onVisualViewport = () => {
      if (!isMobile || !scrollTriggerRef.current) return;
      window.clearTimeout(vvTimer);
      vvTimer = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    };
    window.visualViewport?.addEventListener("resize", onVisualViewport);
    window.visualViewport?.addEventListener("scroll", onVisualViewport);

    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(vvTimer);
      window.removeEventListener("scrollAnimationsReady", onReady);
      window.removeEventListener("lenisReady", onReady);
      window.visualViewport?.removeEventListener("resize", onVisualViewport);
      window.visualViewport?.removeEventListener("scroll", onVisualViewport);
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
    const cardProgress = max === 0 ? 0 : next / max;
    const timelineProgress = cardProgressToTimeline(cardProgress);
    const target = st.start + (st.end - st.start) * timelineProgress;
    scrollToY(target);
    setActiveIndex(next);
  }, []);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === journeyData.length - 1;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full ${SECTION_BG_CLASS}`}
      aria-label="Our journey"
    >
      <div
        ref={pinRef}
        className={`relative grid w-full grid-rows-[auto_auto_auto] md:h-screen md:min-h-screen md:grid-rows-[auto_minmax(0,1fr)_auto] ${SECTION_BG_CLASS}`}
      >
        {/* Header — slightly lower on mobile; desktop padding unchanged */}
        <div className="mx-auto w-full max-w-[72rem] shrink-0 px-[clamp(1rem,4vw,2.5rem)] pt-[clamp(5rem,9vh,6.25rem)] md:pt-[clamp(5.5rem,10.5vh,9rem)]">
          <div className="mb-[clamp(0.35rem,1vh,0.85rem)] flex flex-col items-center text-center md:mb-[clamp(0.65rem,1.8vh,2rem)]">
            <Badge title="Our Story" />
            <h2 className="mt-[clamp(0.4rem,1vh,1rem)] font-primary text-[clamp(1.5rem,min(3.5vw,5vh),3.25rem)] font-medium leading-[1.15] tracking-[-0.04em] text-[#1a1a1a] md:mt-[clamp(0.5rem,1.2vh,1.25rem)] lg:tracking-[-0.06em]">
              Over the years
            </h2>
          </div>
        </div>

        {/* Cards track — start higher on mobile so timeline stays visible */}
        <div
          ref={viewportRef}
          className="relative flex min-h-0 w-full items-start overflow-hidden pt-[clamp(0.15rem,0.8vh,0.5rem)] md:items-center md:py-[clamp(0.25rem,1vh,0.75rem)]"
        >
          <div
            ref={trackRef}
            className={`flex w-max items-start ${CARD_GAP} will-change-transform md:h-full md:items-center`}
            style={{ touchAction: "pan-y" }}
          >
            {journeyData.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={item.year}
                  className={`relative ${CARD_SHELL} ${
                    isActive ? "z-10" : "z-0"
                  }`}
                  aria-hidden={!isActive}
                >
                  <JourneyCard item={item} priority={i === 0} />
                </div>
              );
            })}
          </div>

          {/* Soft blur fades — narrower on mobile */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[clamp(1.75rem,7vw,3rem)] bg-gradient-to-r from-[#F6D0C0]/40 via-[#F6D0C0]/15 to-transparent backdrop-blur-[8px] md:w-[clamp(5rem,16vw,11rem)]"
            style={{
              ...EDGE_FADE_MASK,
              WebkitMaskImage: EDGE_FADE_LEFT,
              maskImage: EDGE_FADE_LEFT,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[clamp(1.75rem,7vw,3rem)] bg-gradient-to-l from-[#F6D0C0]/40 via-[#F6D0C0]/15 to-transparent backdrop-blur-[8px] md:w-[clamp(5rem,16vw,11rem)]"
            style={{
              ...EDGE_FADE_MASK,
              WebkitMaskImage: EDGE_FADE_RIGHT,
              maskImage: EDGE_FADE_RIGHT,
            }}
            aria-hidden
          />

          {/* Arrows aligned to timeline rail (first/last year positions) */}
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={isFirst}
            aria-label="Previous milestone"
            aria-disabled={isFirst}
            className={`${ARROW_BTN} border-white ${
              isFirst
                ? "cursor-not-allowed border-white/40 text-white/40 opacity-40"
                : "cursor-pointer border-white bg-transparent text-white hover:bg-white/15"
            }`}
            style={{ left: TIMELINE_X_PAD }}
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={isLast}
            aria-label="Next milestone"
            aria-disabled={isLast}
            className={`${ARROW_BTN} border-white ${
              isLast
                ? "cursor-not-allowed border-white/40 text-white/40 opacity-40"
                : "cursor-pointer border-white bg-transparent text-white hover:bg-white/15"
            }`}
            style={{ right: TIMELINE_X_PAD }}
          >
            <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Timeline — mobile (pans with progress) */}
        <div className="relative z-10 w-full shrink-0 overflow-hidden px-0 pb-5 pt-4 md:hidden">
          <div
            className="relative flex items-start transition-transform duration-[400ms] ease-out"
            style={{
              width: `${journeyData.length * MOBILE_TIMELINE_STEP_REM}rem`,
              transform: (() => {
                const max = Math.max(journeyData.length - 1, 1);
                const t = activeIndex / max;
                return `translate3d(calc(${t} * (100vw - ${MOBILE_TIMELINE_STEP_REM}rem) - ${
                  activeIndex * MOBILE_TIMELINE_STEP_REM
                }rem), 0, 0)`;
              })(),
            }}
          >
            {/* Line through exact center of the 2rem (h-8) dot slots:
                year h-5 (1.25rem) + mt-2 (0.5rem) + half slot (1rem) = 2.75rem */}
            <div
              className="pointer-events-none absolute inset-x-0 top-[2.75rem] z-0 h-px -translate-y-1/2 bg-white/40"
              aria-hidden
            >
              <div
                className="h-full bg-white transition-[width] duration-[400ms] ease-out"
                style={{
                  width: `${getTimelineProgress(
                    activeIndex,
                    journeyData.length
                  )}%`,
                }}
              />
            </div>

            {journeyData.map((item, i) => {
              const state = getTimelineState(i, activeIndex);
              const isActive = state === "active";
              const isCompleted = state === "completed";

              return (
                <button
                  key={`m-${item.year}`}
                  type="button"
                  onClick={() => goTo(i)}
                  className="relative z-10 flex shrink-0 cursor-pointer flex-col items-center"
                  style={{ width: `${MOBILE_TIMELINE_STEP_REM}rem` }}
                  aria-label={`Go to ${item.year}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={`h-5 whitespace-nowrap font-primary text-[0.9375rem] leading-none tracking-[-0.02em] transition-opacity duration-[400ms] ${
                      isActive
                        ? "font-bold text-white"
                        : "font-semibold text-white/55"
                    }`}
                  >
                    {item.year}
                  </span>

                  <span className="mt-2 flex h-8 w-8 items-center justify-center">
                    <span
                      className={`flex items-center justify-center rounded-full transition-all duration-[400ms] ${
                        isActive
                          ? "h-8 w-8 bg-[#FA6E43] shadow-[0_0_0_6px_rgba(250,140,90,0.35)]"
                          : isCompleted
                            ? "h-2.5 w-2.5 bg-white"
                            : "h-2 w-2 bg-white/55"
                      }`}
                    >
                      {isActive ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      ) : null}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline — desktop (all years fit in viewport) */}
        <div
          className="relative z-10 mx-auto hidden w-full shrink-0 pb-[clamp(1.15rem,3.5vh,2.75rem)] pt-[clamp(0.65rem,1.8vh,1.15rem)] md:block"
          style={{
            paddingLeft: TIMELINE_X_PAD,
            paddingRight: TIMELINE_X_PAD,
          }}
        >
          <div className="relative flex w-full items-start justify-between">
            <div
              className="pointer-events-none absolute inset-x-0 bottom-[clamp(1.125rem,2.6vh,1.625rem)] z-0 h-[1.5px] -translate-y-1/2 overflow-hidden rounded-full bg-white/35"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-white transition-[width] duration-[400ms] ease-out"
                style={{
                  width: `${getTimelineProgress(
                    activeIndex,
                    journeyData.length
                  )}%`,
                }}
              />
            </div>

            {journeyData.map((item, i) => {
              const state = getTimelineState(i, activeIndex);
              const isActive = state === "active";
              const isCompleted = state === "completed";

              return (
                <button
                  key={`d-${item.year}`}
                  type="button"
                  onClick={() => goTo(i)}
                  className="relative z-10 flex min-w-0 cursor-pointer flex-col items-center gap-[clamp(0.7rem,1.9vh,1.15rem)]"
                  aria-label={`Go to ${item.year}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={`whitespace-nowrap font-primary text-[clamp(0.875rem,1.85vw,1.375rem)] font-bold leading-none tracking-[-0.02em] transition-[color,opacity] duration-[400ms] ease-out ${
                      state === "upcoming" ? "text-white/55" : "text-white"
                    }`}
                  >
                    {item.year}
                  </span>

                  <span className="relative flex h-[clamp(2.25rem,5.2vh,3.25rem)] w-[clamp(2.25rem,5.2vh,3.25rem)] items-center justify-center">
                    <span
                      className={`flex items-center justify-center rounded-full transition-all duration-[400ms] ease-out ${
                        isActive
                          ? "h-[clamp(2.25rem,5.2vh,3.25rem)] w-[clamp(2.25rem,5.2vh,3.25rem)] bg-[#FA6E43] shadow-[0_0_0_clamp(6px,1.2vh,16px)_rgba(250,140,90,0.42),0_0_clamp(14px,2.8vh,32px)_clamp(3px,0.6vh,8px)_rgba(250,110,67,0.2)]"
                          : isCompleted
                            ? "h-[clamp(1rem,2.3vh,1.25rem)] w-[clamp(1rem,2.3vh,1.25rem)] bg-white"
                            : "h-[clamp(0.875rem,2.1vh,1.125rem)] w-[clamp(0.875rem,2.1vh,1.125rem)] bg-white/50"
                      }`}
                    >
                      {isActive ? (
                        <span className="h-[clamp(0.5rem,1.1vh,0.6875rem)] w-[clamp(0.5rem,1.1vh,0.6875rem)] rounded-full bg-white" />
                      ) : null}
                    </span>
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
