"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { VideoPlayer } from "../../common/video";
import { WhiteBadge } from "../../common/badge.js";

const CARDS = [
  {
    title: "Recycle & Reuse",
    desc: "Maximizing resource efficiency by recycling copper and reducing waste.",
    img: "/home/recycle.png",
  },
  {
    title: "Sustainable Packaging",
    desc: "Using responsibly sourced materials and ethical supply chains.",
    img: "/home/recycle.png",
  },
  {
    title: "Energy conservation",
    desc: "Reducing our carbon footprint through efficient operations.",
    img: "/home/recycle.png",
  },
];

const CARD_WIDTH = 280;
const CARD_GAP = 16;
const SIDE_PAD = `calc(50% - ${CARD_WIDTH / 2}px)`;

export default function WeCareSection() {
  const sectionRef = useRef(null);
  const mobileCardsRef = useRef([]);
  const desktopCardsRef = useRef([]);
  const headingRef = useRef(null);
  const scrollViewportRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobile = window.innerWidth < 1024;
    const cards = mobile
      ? mobileCardsRef.current.filter(Boolean)
      : desktopCardsRef.current.filter(Boolean);

    // On mobile: cards visible immediately so user can swipe to see all
    if (mobile && cards.length) {
      cards.forEach((card) => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        card.style.filter = "blur(0)";
      });
      return;
    }

    // Desktop: same animation style as WhyChooseUs
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(80px)";
      card.style.filter = "blur(6px)";
      card.style.transition =
        "opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          const i = cards.indexOf(card);

          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0px)";
              card.style.filter = "blur(0px)";
            }, i * 150);
          } else {
            const exitingAbove = entry.boundingClientRect.top > 0;
            card.style.opacity = "0";
            card.style.filter = "blur(6px)";
            card.style.transform = exitingAbove
              ? "translateY(80px)"
              : "translateY(-50px)";
          }
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto my-5 w-full max-w-[1600px] px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem]">
      <div
        ref={sectionRef}
        className="relative flex h-[min(75vh,640px)] max-h-[640px] flex-col justify-between overflow-hidden rounded-xl bg-[url('/home/care.jpg')] bg-cover bg-center pt-8 lg:h-[min(90vh,900px)] lg:max-h-[1000px]"
      >
        <VideoPlayer
          src="/sustain.mp4"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        <div
          ref={headingRef}
          className="pointer-events-none absolute top-6 z-10 px-4 lg:top-15 lg:px-10"
        >
          <WhiteBadge title="What we Care" />
          <h1 className="mt-3 text-2xl font-medium text-white lg:mt-5 lg:text-4xl">
            Sustainability
          </h1>
        </div>

        <div className="absolute bottom-4 left-0 right-0 z-20">
          {/* Mobile: native horizontal scroll only — no custom drag animation */}
          <div
            ref={scrollViewportRef}
            role="region"
            aria-label="Sustainability cards - swipe to view all"
            className="scrollbar-hide flex w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden lg:hidden"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x pan-y",
              overscrollBehaviorX: "contain",
              scrollPaddingInline: SIDE_PAD,
              minHeight: 260,
              maxWidth: "100%",
            }}
          >
            <div
              className="inline-flex w-max pb-2"
              style={{
                paddingLeft: SIDE_PAD,
                paddingRight: SIDE_PAD,
                gap: CARD_GAP,
              }}
            >
              {CARDS.map((card, i) => (
                <div
                  key={card.title}
                  ref={(el) => {
                    if (el) mobileCardsRef.current[i] = el;
                  }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    router.push("/sustainability");
                  }}
                  className="flex flex-none cursor-pointer snap-center flex-col items-center gap-3 rounded-xl bg-white/20 px-5 py-10 text-center shadow-lg backdrop-blur-sm transition-colors duration-300 hover:bg-white/30"
                  style={{
                    width: CARD_WIDTH,
                    minWidth: CARD_WIDTH,
                  }}
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={154}
                    height={84}
                    className="h-[84px] w-[154px] lg:h-[124px] lg:w-[226px]"
                  />
                  <h1 className="font-primary text-[24.42px] font-normal leading-[27.13px] tracking-[-1.02px] text-white capitalize">
                    {card.title}
                  </h1>
                  <p className="font-primary text-[10.85px] font-normal leading-[18.99px] text-secondary">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: grid cards */}
          <div className="hidden w-full gap-6 px-10 lg:grid lg:grid-cols-3">
            {CARDS.map((card, i) => (
              <div
                key={card.title}
                ref={(el) => {
                  if (el) desktopCardsRef.current[i] = el;
                }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  router.push("/sustainability");
                }}
                className="mx-2 flex cursor-pointer flex-none flex-col items-center gap-3 rounded-xl bg-white/20 px-10 py-12 text-center shadow-lg backdrop-blur-sm transition-colors duration-300 hover:bg-white/30 lg:min-w-0"
                style={{ willChange: "transform, opacity" }}
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  width={226}
                  height={124}
                  className="h-[84px] w-[154px] lg:h-[124px] lg:w-[226px]"
                />
                <h1 className="font-primary text-[24.42px] font-normal leading-[27.13px] tracking-[-1.02px] text-white capitalize lg:text-[36px] lg:leading-[40px] lg:tracking-[-1.5px]">
                  {card.title}
                </h1>
                <p className="font-primary text-[10.85px] font-normal leading-[18.99px] text-secondary lg:text-[16px] lg:leading-[28px]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
