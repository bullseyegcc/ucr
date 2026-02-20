'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '../../common/badge';
import { WhiteBadge } from '../../common/badge';

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

    const timer = setTimeout(() => {
      // Create timeline with scroll lock
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'center center',
          end: 'bottom center',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          markers: false,
        },
      });

      // Animate Values card to move up and fade in, becoming adjacent to Mission
      tl.fromTo(
        values,
        {
          y: 200,
          opacity: 1,
        },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.inOut',
        },
        0
      );

      // On desktop, also animate to move horizontally and become adjacent
      tl.fromTo(
        values,
        {
          x: 0,
        },
        {
          x: 0,
          ease: 'power2.inOut',
        },
        0
      );

      // Add scale animation for polish
      tl.fromTo(
        values,
        {
          scale: 0.95,
        },
        {
          scale: 1,
          ease: 'back.out',
        },
        0
      );

      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[60vh] w-full flex items-center justify-center my-8 px-2 lg:px-10"
    >
      <div className=" w-full flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Mission Card */}
        <div
          ref={missionRef}
          className="w-full lg:w-1/2 min-h-96 rounded-3xl text-white px-10 py-8 flex flex-col justify-between"
          style={{
            backgroundImage: "url('/missionbg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'top',
          }}
        >
          <WhiteBadge title="our mission" className="mb-6" />
          <h1 className="text-2xl lg:text-4xl font-medium  leading-tight">
            To deliver premium copper product and services that power progress and add value to a sustainable future
          </h1>
        </div>

        {/* Values Card */}
        <div
          ref={valuesRef}
          className="w-full lg:w-1/2 min-h-96 rounded-3xl bg-[#F5F5F5] px-10 py-8 flex flex-col justify-between"
        >
          <Badge title="our values" className="mb-6" />
          <h1 className="text-2xl lg:text-4xl font-medium text-black leading-tight">
            To deliver premium copper product and services that power progress and add value to a sustainable future
          </h1>
        </div>
      </div>
    </div>
  );
}
