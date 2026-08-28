"use client";

import Image from "next/image";
import { Badge } from "../../common/badge";
import { useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { gsap } from "gsap";

const GALLERY_ITEMS = [
  { image: "/team/t2-22.png", year: "2023", caption: "Team collaboration" },
  { image: "/team/t1-11.png", year: "2024", caption: "New year celebration" },
  { image: "/team/t3-33.png", year: "2022", caption: "Annual Picnic" },
];

const COPIES = 5;

export default function TeamMemoriesSection() {
  const n = GALLERY_ITEMS.length;
  const slides = Array.from({ length: n * COPIES }, (_, i) => ({
    ...GALLERY_ITEMS[i % n],
    id: i,
  }));
  const origin = Math.floor(COPIES / 2) * n;
  const activeRef = useRef(origin + 1);

  const headerRef = useRef(null);
  const memoriesRef = useRef(null);
  const viewportRef = useRef(null);
  const cardRefs = useRef([]);
  const timelineRef = useRef(null);
  const busyRef = useRef(false);
  const draggedRef = useRef(false);

  const getMetrics = useCallback(() => {
    const vw = window.innerWidth;
    const mobile = vw < 768;
    return {
      gap: vw * 0.02,
      centerW: mobile ? vw * 0.76 : vw * 0.32,
      sideW: mobile ? vw * 0.64 : vw * 0.24,
      farW: mobile ? vw * 0.4 : vw * 0.18,
      centerAspect: mobile ? 3 / 3.3 : 1 / 1.05,
    };
  }, []);

  const applyLayout = useCallback(
    (index, { animate = true, onComplete } = {}) => {
      const viewport = viewportRef.current;
      const cards = cardRefs.current;
      if (!viewport || cards.length === 0) return;

      const m = getMetrics();
      const viewportW = viewport.clientWidth;
      const baseW = m.centerW;
      const baseH = m.centerW / m.centerAspect;
      viewport.style.height = `${baseH}px`;

      const absDist = (i) => Math.abs(i - index);
      const scaleOf = (i) => {
        const a = absDist(i);
        if (a === 0) return 1;
        if (a === 1) return m.sideW / m.centerW;
        return m.farW / m.centerW;
      };

      const xs = [];
      let cursor = 0;
      for (let i = 0; i < cards.length; i++) {
        const visW = baseW * scaleOf(i);
        xs[i] = cursor + visW / 2 - baseW / 2;
        cursor += visW + m.gap;
      }
      const shift = viewportW / 2 - (xs[index] + baseW / 2);

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const shouldAnimate = animate && !reduced;

      timelineRef.current?.kill();

      const applyCardChrome = (card, i) => {
        const a = absDist(i);
        const visible = a <= 2;
        card.style.zIndex = String(20 - a);
        card.style.borderColor = a === 0 ? "#fb923c" : "#fed7aa";
        card.style.pointerEvents = visible ? "auto" : "none";
        card.dataset.center = a === 0 ? "true" : "false";
        card.dataset.peek = a === 2 ? "true" : "false";
      };

      const varsFor = (i) => {
        const a = absDist(i);
        return {
          x: xs[i] + shift,
          yPercent: -50,
          scale: scaleOf(i),
          opacity: a > 2 ? 0 : a === 2 ? 0.72 : 1,
          filter: `blur(${a === 2 ? 6 : 0}px)`,
          force3D: true,
        };
      };

      cards.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          width: baseW,
          height: baseH,
          transformOrigin: "50% 50%",
        });
      });

      if (!shouldAnimate) {
        cards.forEach((card, i) => {
          if (!card) return;
          gsap.set(card, varsFor(i));
          applyCardChrome(card, i);
        });
        onComplete?.();
        return;
      }

      const tl = gsap.timeline({
        defaults: {
          duration: 0.85,
          ease: "power3.inOut",
          overwrite: "auto",
          force3D: true,
        },
        onComplete,
      });
      timelineRef.current = tl;

      cards.forEach((card, i) => {
        if (!card) return;
        applyCardChrome(card, i);
        tl.to(card, varsFor(i), 0);
      });
    },
    [getMetrics]
  );

  const goTo = useCallback(
    (nextIndex) => {
      if (busyRef.current) return;
      if (nextIndex < 0 || nextIndex >= slides.length) return;
      if (nextIndex === activeRef.current) return;

      busyRef.current = true;
      viewportRef.current?.classList.add("is-animating");
      activeRef.current = nextIndex;

      applyLayout(nextIndex, {
        animate: true,
        onComplete: () => {
          const normalized = origin + (((nextIndex % n) + n) % n);
          if (normalized !== nextIndex) {
            activeRef.current = normalized;
            applyLayout(normalized, { animate: false });
          }
          busyRef.current = false;
          viewportRef.current?.classList.remove("is-animating");
        },
      });
    },
    [applyLayout, n, origin, slides.length]
  );

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
    if (memoriesRef.current) {
      gsap.fromTo(
        memoriesRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.12 }
      );
    }
  }, []);

  useLayoutEffect(() => {
    applyLayout(activeRef.current, { animate: false });

    const onResize = () => applyLayout(activeRef.current, { animate: false });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      timelineRef.current?.kill();
    };
  }, [applyLayout]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    let startX = 0;
    let tracking = false;

    const pointerX = (e) =>
      e.touches?.[0]?.clientX ?? e.changedTouches?.[0]?.clientX ?? e.clientX;

    const onDown = (e) => {
      tracking = true;
      draggedRef.current = false;
      startX = pointerX(e);
    };

    const onMove = (e) => {
      if (!tracking) return;
      if (Math.abs(pointerX(e) - startX) > 8) draggedRef.current = true;
    };

    const onUp = (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = pointerX(e) - startX;
      if (Math.abs(dx) > 48) {
        goTo(activeRef.current + (dx < 0 ? 1 : -1));
      }
    };

    vp.addEventListener("pointerdown", onDown);
    vp.addEventListener("pointermove", onMove);
    vp.addEventListener("pointerup", onUp);
    vp.addEventListener("pointercancel", () => {
      tracking = false;
    });
    return () => {
      vp.removeEventListener("pointerdown", onDown);
      vp.removeEventListener("pointermove", onMove);
      vp.removeEventListener("pointerup", onUp);
    };
  }, [goTo]);

  return (
    <section className="w-full bg-white py-[8vw]">
      <div className="mb-[4vw] flex flex-col items-center justify-center gap-6 text-center">
        <div className="mb-10 flex flex-col items-center">
          <div ref={headerRef} className="mb-3">
            <Badge title="Gallery" />
          </div>
          <h2
            ref={memoriesRef}
            className="flex gap-2 text-3xl leading-tight font-medium text-gray-900 sm:text-4xl lg:text-5xl"
          >
            <span className="font-medium text-gray-900">Team</span>
            <span className="font-serif font-normal tracking-tight text-[#222] italic">
              Memories
            </span>
          </h2>
        </div>

        <div className="flex w-full select-none items-center justify-center overflow-hidden">
          <div
            ref={viewportRef}
            className="relative w-full touch-pan-y overflow-hidden [&.is-animating_.memory-card-inner]:!scale-100"
          >
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                aria-label={item.caption}
                className="memory-card group absolute top-1/2 left-0 cursor-pointer appearance-none overflow-hidden rounded-lg border border-solid bg-white p-0 shadow-lg will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb923c] data-[center=true]:cursor-default"
                style={{ width: 1, height: 1, opacity: 0 }}
                onClick={() => {
                  if (draggedRef.current) return;
                  const delta = i - activeRef.current;
                  if (Math.abs(delta) === 1) goTo(i);
                }}
              >
                <div className="memory-card-inner relative h-full w-full origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-data-[center=true]:group-hover:scale-[1.025] group-data-[peek=true]:group-hover:scale-100">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    draggable={false}
                    className="pointer-events-none object-cover"
                    sizes="(max-width: 768px) 76vw, 32vw"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
