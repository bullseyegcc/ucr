"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "../../common/badge";
import { WhiteBadge } from "../../common/badge";
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";

gsap.registerPlugin(ScrollTrigger);

export default function MissionValuesSection() {
  const containerRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const mission = missionRef.current;
    const values = valuesRef.current;

    if (!container || !mission || !values) return;

    // smoother pinning & responsive adjustments using matchMedia
    const tlRef = { current: null };
    const mm = gsap.matchMedia();

    // GPU-accelerated transforms for jank-free rendering
    gsap.set([mission, values], {
      willChange: "transform, opacity",
      force3D: true,
      backfaceVisibility: "hidden",
    });

    mm.add({ isDesktop: "(min-width: 1024px)" }, (context) => {
      const { isDesktop } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "center center",
          end: () => `+=${Math.max(window.innerHeight * 0.8, 500)}`,
          scrub: 1.8,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          markers: false,
        },
      });

      // Values: lift and fade in
      tl.fromTo(
        values,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", force3D: true },
        0
      );

      // on desktop give a subtle horizontal entrance
      if (isDesktop) {
        tl.fromTo(
          values,
          { x: 40 },
          { x: 0, ease: "power2.out", force3D: true },
          0
        );
      }

      // polish scale
      tl.fromTo(values, { scale: 0.98 }, { scale: 1, ease: "power2.out" }, 0);

      tlRef.current = tl;
      return () => {
        if (tlRef.current) tlRef.current.kill();
      };
    });

    // cleanup
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto min-h-[60vh] w-full max-w-[1600px] flex items-center justify-center my-8 px-2 lg:px-10"
    >
      <div className=" w-full flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Mission Card */}
        <SlideIn
          direction="left"
          scrollTrigger={true}
          duration={0.8}
          className="w-full lg:w-1/2"
        >
          <div
            ref={missionRef}
            className="min-h-96 rounded-3xl text-white px-10 py-8 flex flex-col justify-between"
            style={{
              backgroundImage: "url('/about/missionbg.png')",
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          >
            <WhiteBadge title="our mission" className="mb-6" />
            <FadeIn
              duration={0.4}
              stagger={0.015}
              delay={0.08}
              scrollTrigger={true}
              scrub={false}
              start="top 92%"
            >
              <h1 className="text-2xl lg:text-4xl font-medium  leading-tight">
                To deliver premium copper product and services that power
                progress and add value to a sustainable future
              </h1>
            </FadeIn>
          </div>
        </SlideIn>

        {/* Values Card */}
        <div
          ref={valuesRef}
          className="w-full lg:w-1/2 min-h-96 rounded-3xl bg-[#F5F5F5] px-10 py-8 flex flex-col justify-between"
        >
          <SlideIn direction="left" scrollTrigger={true} duration={0.8}>
            <Badge title="our values" className="mb-6" />
          </SlideIn>
          <FadeIn
            duration={0.4}
            stagger={0.015}
            delay={0.12}
            scrollTrigger={true}
            scrub={false}
            start="top 92%"
          >
            <h1 className="text-2xl lg:text-4xl font-medium text-black leading-tight">
              To elevate industry standards with superior, customised copper
              solutions and environmental responsibility.
            </h1>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
