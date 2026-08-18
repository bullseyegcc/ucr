'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { WhiteBadge } from "../../common/badge.js";
import Link from "next/link";

const FALLBACK_POSTS = [
  {
    slug: "uae-copper-producer-expands-global-supply",
    title: "UAE Copper Producer Expands Global Supply Network Across Asia & Europe",
    author: "Bruce Sommers",
    date: "Apr 28, 2026",
    image: "/hblog1.png",
  },
  {
    slug: "high-conductivity-copper-rods-energy-sector",
    title: "Company Launches New High-Conductivity Copper Rods for Energy Sector",
    author: "Bruce Sommers",
    date: "Apr 28, 2026",
    image: "/hblog2.png",
  },
  {
    slug: "expected-supply-deficit-copper-prices",
    title: "Expected Supply Deficit To Upset Copper Prices",
    author: "Bruce Sommers",
    date: "Apr 28, 2026",
    image: "/blog2.png",
  },
];

const CARD_FALLBACKS = ["/hblog1.png", "/hblog2.png", "/blog2.png"];

function mapHomePosts(posts) {
  if (!posts?.length) return FALLBACK_POSTS;
  return posts.slice(0, 3).map((post, index) => ({
    slug: post.slug,
    title: post.title,
    author: post.author || "UCR",
    date: post.date,
    image: post.image || CARD_FALLBACKS[index],
  }));
}

export default function Articles({ posts }) {
  const items = mapHomePosts(posts);
  const featured = items[0];
  const second = items[1];
  const third = items[2];

  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const rightTopRef = useRef(null);
  const rightBotRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Uniform animation profile — all elements animate together, same timing
    const DURATION = 1.6;
    const FROM = 'translateY(50px) scale(0.97)';
    const TO = 'translateY(0px) scale(1)';

    const elements = [
      { el: badgeRef.current },
      { el: headingRef.current },
      { el: leftRef.current },
      { el: rightTopRef.current },
      { el: rightBotRef.current },
    ]
      .filter(({ el }) => el)
      .map((item) => ({ ...item, fromTransform: FROM, toTransform: TO, delay: 0, duration: DURATION }));

    // Apply initial hidden state immediately
    elements.forEach(({ el, fromTransform, duration }) => {
      el.style.opacity = '0';
      el.style.filter = 'blur(10px)';
      el.style.transform = fromTransform;
      el.style.willChange = 'transform, opacity, filter';
      el.style.transition = `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1), filter ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = elements.find(({ el }) => el === entry.target);
          if (!match) return;

          if (entry.isIntersecting) {
            setTimeout(() => {
              match.el.style.opacity = '1';
              match.el.style.filter = 'blur(0px)';
              match.el.style.transform = match.toTransform;
            }, match.delay);
          } else {
            // Smooth exit — reverse back to from state
            match.el.style.opacity = '0';
            match.el.style.filter = 'blur(10px)';
            match.el.style.transform = match.fromTransform;
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(({ el }) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-[60vh] py-4 lg:py-8 sm:min-h-screen flex flex-col items-center sm:flex-row gap-5 sm:mx-10 items-start mb-4"
    >
      {/* ── Left feature card ──── */}
      <Link
        ref={leftRef}
        href={featured ? `/blogs/${featured.slug}` : "/blogs"}
        className="lg:min-h-[60vh] max-h-screen sm:w-1/2 bg-[#FE5D0A] rounded-xl px-2 sm:px-10 py-4 flex flex-col gap-8"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="mt-6">
          <div ref={badgeRef} style={{ willChange: 'transform, opacity' }}>
            <WhiteBadge title="Blogs & Articles" className="z-190 mb-5" />
          </div>
          <h1
            ref={headingRef}
            className="text-5xl my-3 text-white font-semibold mt-5"
            style={{ willChange: 'transform, opacity' }}
          >
            Latest News
          </h1>
        </div>

        {featured && (
        <div
          className="w-[95%] lg:w-full h-[500px] sm:h-[900px] relative p-3 flex flex-col justify-start mx-2 gap-5 rounded-xl bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${featured.image})` }}
        >
          <div className="z-500 px-4 text-white flex justify-between text-sm font-light pt-9">
            <span>Written by {featured.author}</span>
            <span>{featured.date}</span>
          </div>
          <h1 className="z-500 text-xl sm:text-4xl pl-4 text-white">
            {featured.title}
          </h1>
          <button className="z-90 flex justify-center items-center gap-2 w-18 text-white border absolute bottom-2 left-4 bg-white rounded-lg px-3 py-2">
            <ArrowRight size={18} color="black" />
          </button>
        </div>
        )}
      </Link>

      {/* ── Right column ───────────────────────────────────────────────── */}
      <div className="px-1 lg:px-0 min-h-[60vh] sm:h-screen sm:w-1/2 rounded-xl flex flex-col items-center lg:justify-between">
        {second && (
        <Link
          ref={rightTopRef}
          href={`/blogs/${second.slug}`}
          className="w-full h-[45vh] sm:h-1/2 lg:mb-5 relative bg-[#6A3120] flex flex-col gap-16 lg:gap-6 lg:justify-start gap-5 rounded-xl bg-cover bg-center bg-no-repeat"
          style={{ willChange: 'transform, opacity', backgroundImage: `url(${second.image})` }}
        >
          <div className="z-500 px-4 text-white flex justify-between text-sm font-light pt-9">
            <span>Written by {second.author}</span>
            <span>{second.date}</span>
          </div>
          <h1 className="z-500 text-3xl lg:text-3xl pl-4 text-white">
            {second.title}
          </h1>
          <button className="z-90 flex justify-center items-center gap-2 w-18 text-white border absolute bottom-2 left-4 bg-white rounded-lg px-3 py-2">
            <ArrowRight size={18} color="black" />
          </button>
          <div className="rounded-xl h-90 lg:h-26 pl-0 absolute top-0 w-full z-0 bg-gradient-to-b from-[#FA6E43] to-transparent" />
        </Link>
        )}

        {third && (
        <Link
          ref={rightBotRef}
          className="w-full h-[45vh] lg:h-1/2 relative bg-[#6A3120] hidden lg:flex flex-col justify-start gap-16 lg:gap-6 rounded-xl bg-cover bg-center bg-no-repeat"
          href={`/blogs/${third.slug}`}
          style={{ willChange: 'transform, opacity', backgroundImage: `url(${third.image})` }}
        >
          <div className="z-500 px-4 text-white flex justify-between text-sm font-light pt-9">
            <span>Written by {third.author}</span>
            <span>{third.date}</span>
          </div>
          <h1 className="z-500 text-3xl pl-4 text-white">
            {third.title}
          </h1>
          <button className="z-90 flex justify-center items-center gap-2 w-18 text-white border absolute bottom-2 left-4 bg-white rounded-lg px-3 py-2">
            <ArrowRight size={18} color="black" />
          </button>
          <div className="rounded-xl h-90 lg:h-26 pl-0 absolute top-0 w-full z-0 bg-gradient-to-b from-[#FA6E43] to-transparent" />
        </Link>
        )}

        <Link
          href="/blogs"
          className="border my-8 border-primary w-[80%] px-5 py-3 text-primary lg:hidden flex justify-center items-center gap-3 rounded-full text-lg"
        >
          Read more <ArrowRight size={22} className="text-primary" />
        </Link>
      </div>
    </div>
  );
}
