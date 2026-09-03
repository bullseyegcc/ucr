"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import StatsCard from "../../common/StatsCard";

const STATS = [
  {
    mainHeading: 2009,
    showPlus: false,
    subHeading: "Established in",
    description:
      "Since then, our excellence has made us a trusted name in copper manufacturing.",
  },
  {
    mainHeading: 20,
    suffix: "k",
    showPlus: true,
    subHeading: "MT/Annum",
    description: "Produces 20,000 metric tons of copper per year.",
  },
  {
    mainHeading: 150,
    showPlus: true,
    subHeading: "Employees",
    description:
      "With over 150 experienced employees, we deliver quality and reliability every day.",
  },
  {
    mainHeading: 50,
    showPlus: true,
    subHeading: "Global sales",
    description:
      "With a presence in 50+ countries, we serve clients on every continent.",
  },
];

/** About near navbar — start card cascade earlier in the dock. */
const PLAY_AT = 0.55;
const RESET_BELOW = 0.35;

export default function AboutStats() {
  const rowRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const items = rowRef.current?.querySelectorAll(".stat-card-item");
    if (!items?.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const distance = isMobile ? 32 : 56;
    const stagger = isMobile ? 0.1 : 0.15;
    const duration = isMobile ? 0.45 : 0.55;

    let played = false;
    let tl;

    gsap.set(items, { opacity: 0, y: distance, force3D: true });

    const play = () => {
      if (played) return;
      played = true;
      tl?.kill();
      if (prefersReduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      tl = gsap.timeline();
      items.forEach((item, index) => {
        tl.to(
          item,
          {
            opacity: 1,
            y: 0,
            duration,
            ease: "power2.out",
            overwrite: true,
          },
          index * stagger
        );
      });
    };

    const reset = () => {
      played = false;
      tl?.kill();
      gsap.set(items, { opacity: 0, y: distance });
    };

    const syncFromProgress = (raw) => {
      const p = Math.max(0, Math.min(1, raw ?? 0));
      if (p >= PLAY_AT || window.__heroAboutPlaced) play();
      else if (p < RESET_BELOW) reset();
    };

    const onAboutProgress = (e) => {
      const p =
        typeof e?.detail?.progress === "number"
          ? e.detail.progress
          : window.__heroAboutProgress ?? 0;
      syncFromProgress(p);
    };

    const onAboutPlaced = (e) => {
      if (e.detail?.placed) play();
      else syncFromProgress(window.__heroAboutProgress ?? 0);
    };

    syncFromProgress(window.__heroAboutProgress ?? 0);
    window.addEventListener("heroAboutProgress", onAboutProgress);
    window.addEventListener("heroAboutPlaced", onAboutPlaced);

    return () => {
      window.removeEventListener("heroAboutProgress", onAboutProgress);
      window.removeEventListener("heroAboutPlaced", onAboutPlaced);
      tl?.kill();
      gsap.killTweensOf(items);
    };
  }, []);

  return (
    <div className="w-full shrink-0 bg-white">
      <div
        ref={rowRef}
        className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-[0.75rem] gap-y-[1.5rem] px-[1rem] pt-2 pb-[0.75rem] lg:grid-cols-4 lg:gap-x-[1.25rem] lg:gap-y-[1.25rem] lg:px-[3rem] lg:pt-0 lg:pb-[clamp(0.75rem,2vh,1.5rem)] xl:px-[4rem] 2xl:px-[5rem]"
      >
        {STATS.map((stat, index) => (
          <div
            key={stat.subHeading}
            className="stat-card-item w-full min-w-0"
            style={{ opacity: 0 }}
          >
            <StatsCard
              {...stat}
              index={index}
              skipEntrance
            />
          </div>
        ))}
      </div>
    </div>
  );
}
