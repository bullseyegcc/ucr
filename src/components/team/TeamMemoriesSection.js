"use client";

// ...existing imports...
import Image from "next/image";
import { Badge } from "../../common/badge";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function TeamMemoriesSection() {
  const galleryItems = [
    { image: "/team/t2-22.png", year: "2023", caption: "Team collaboration" },
    { image: "/team/t1-11.png", year: "2024", caption: "New year celebration" },
    { image: "/team/t3-33.png", year: "2022", caption: "Annual Picnic" },
  ];

  const [activeIdx, setActiveIdx] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);
  const memoriesRef = useRef(null);

  // Initial page load animations - run only once
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

  // Track mobile vs desktop to tweak card layout responsively
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to get the correct indices for left, center, right, far left, far right (circular)
  const getIndices = () => {
    const len = galleryItems.length;
    const centerIdx = activeIdx;
    const leftIdx = (centerIdx - 1 + len) % len;
    const rightIdx = (centerIdx + 1) % len;
    const farLeftIdx = (centerIdx - 2 + len) % len;
    const farRightIdx = (centerIdx + 2) % len;
    return [farLeftIdx, leftIdx, centerIdx, rightIdx, farRightIdx];
  };

  return (
    <section className="w-full bg-white py-[8vw]">
      <div className="flex flex-col text-center items-center justify-center gap-6 mb-[4vw]">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div ref={headerRef} className="mb-3">
            <Badge title="Gallery" />
          </div>
          <h2
            ref={memoriesRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight flex gap-2"
          >
            <span className="  font-medium text-gray-900">Team</span>
            <span className="font-serif italic text-[#222] font-normal tracking-tight">
              Memories
            </span>
          </h2>
        </div>
        {/* Gallery Grid */}
        <div className="w-full flex justify-center items-center select-none overflow-hidden">
          {(() => {
            const [farLeftIdx, leftIdx, centerIdx, rightIdx, farRightIdx] =
              getIndices();
            return (
              <div className="w-full flex justify-center items-center gap-[2vw]">
                {/* Far left blurred card - only 20% visible */}
                <div
                  className="flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden border border-orange-200 transition-all duration-500"
                  style={{
                    width: isMobile ? "40vw" : "18vw",
                    aspectRatio: isMobile ? "3/3.8" : "1/1.1",
                    height: "auto",
                    filter: "blur(6px)",
                    opacity: 0.7,
                    marginLeft: isMobile ? "-32vw" : "-14.4vw",
                  }}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={galleryItems[farLeftIdx].image}
                      alt={galleryItems[farLeftIdx].caption}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 18vw, 200px"
                    />
                  </div>
                </div>
                {/* Left, Center, Right cards */}
                {[leftIdx, centerIdx, rightIdx].map((idx, i) => (
                  <div
                    key={`${idx}-${i}`}
                    className={`relative bg-white rounded-lg shadow-lg border overflow-hidden ${
                      i === 1 ? "border-orange-400" : "border-orange-200"
                    } transition-all duration-500 ease-out`}
                    style={{
                      flex: isMobile ? "0 0 auto" : "1 1 0",
                      maxWidth: isMobile
                        ? i === 1
                          ? "76vw"
                          : "64vw"
                        : i === 1
                          ? "32vw"
                          : "24vw",
                      minWidth: isMobile
                        ? i === 1
                          ? "76vw"
                          : "64vw"
                        : i === 1
                          ? "32vw"
                          : "21vw",
                      aspectRatio:
                        i === 1
                          ? isMobile
                            ? "3/3.3"
                            : "1/1.05"
                          : isMobile
                            ? "3/3.8"
                            : "1/1.1",
                      height: "auto",
                    }}
                    onMouseEnter={(e) =>
                      gsap.to(e.currentTarget, {
                        scale: 1.04,
                        duration: 0.7,
                        ease: "power2.out",
                      })
                    }
                    onMouseLeave={(e) =>
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.7,
                        ease: "power2.out",
                      })
                    }
                    onClick={() => i !== 1 && setActiveIdx(idx)}
                  >
                    <Image
                      src={galleryItems[idx].image}
                      alt={galleryItems[idx].caption}
                      fill
                      className="object-cover transition-opacity duration-500"
                      sizes="(max-width: 1200px) 33vw, 400px"
                    />
                  </div>
                ))}
                {/* Far right blurred card - only 20% visible */}
                <div
                  className="flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden border border-orange-200 transition-all duration-500"
                  style={{
                    width: isMobile ? "40vw" : "18vw",
                    aspectRatio: isMobile ? "3/3.8" : "1/1.1",
                    height: "auto",
                    filter: "blur(6px)",
                    opacity: 0.7,
                    marginRight: isMobile ? "-32vw" : "-14.4vw",
                  }}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={galleryItems[farRightIdx].image}
                      alt={galleryItems[farRightIdx].caption}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 18vw, 200px"
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
