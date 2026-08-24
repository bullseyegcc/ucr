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
    date: "Monday, April 28, 2026",
    image: "/blogs/hblog1.png",
  },
  {
    slug: "high-conductivity-copper-rods-energy-sector",
    title: "Company Launches New High-Conductivity Copper Rods for Energy Sector",
    author: "Bruce Sommers",
    date: "Monday, April 28, 2026",
    image: "/blogs/hblog2.png",
  },
  {
    slug: "expected-supply-deficit-copper-prices",
    title: "Expected Supply Deficit To Upset Copper Prices",
    author: "Bruce Sommers",
    date: "Monday, April 28, 2026",
    image: "/blogs/blog2.png",
  },
];

const CARD_FALLBACKS = ["/blogs/hblog1.png", "/blogs/hblog2.png", "/blogs/blog2.png"];

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

function CardMeta({ title, author, date }) {
  return (
    <>
      <div className="relative z-10 px-5 lg:px-6 text-white flex justify-between gap-4 text-xs sm:text-sm font-light pt-5 lg:pt-6">
        <span>Written by {author}</span>
        <span className="shrink-0">{date}</span>
      </div>
      <h2 className="relative z-10 text-xl sm:text-[1.65rem] lg:text-[1.85rem] leading-[1.2] px-5 lg:px-6 pr-8 text-white font-semibold">
        {title}
      </h2>
      <span className="z-10 flex justify-center items-center absolute bottom-4 left-5 lg:left-6 bg-white rounded-lg px-3 py-2">
        <ArrowRight size={18} color="black" />
      </span>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 lg:h-32 z-0 bg-gradient-to-b from-[#FA6E43]/90 via-[#FA6E43]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </>
  );
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
      className="max-w-[1600px] mx-auto w-full px-[1.5rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem] py-8 lg:py-10 mb-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 lg:h-[min(88vh,860px)] lg:min-h-[680px] items-stretch">
        {/* ── Left feature column ──── */}
        <div
          ref={leftRef}
          className="bg-[#FE5D0A] rounded-2xl px-4 sm:px-7 lg:px-8 py-6 lg:py-7 flex flex-col gap-5 lg:gap-6 min-h-[34rem] lg:min-h-0 lg:h-full"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="shrink-0">
            <div ref={badgeRef} style={{ willChange: 'transform, opacity' }}>
              <WhiteBadge title="Blogs & Articles" className="z-190 mb-3 lg:mb-4" />
            </div>
            <h1
              ref={headingRef}
              className="text-[2.25rem] sm:text-[2.5rem] lg:text-[3.25rem] text-white font-semibold leading-[1.1]"
              style={{ willChange: 'transform, opacity' }}
            >
              Latest news
            </h1>
          </div>

          {featured ? (
          <Link
            href={`/blogs/${featured.slug}`}
            className="relative flex-1 min-h-[22rem] lg:min-h-0 overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${featured.image}')` }}
          >
            <CardMeta title={featured.title} author={featured.author} date={featured.date} />
          </Link>
          ) : null}
        </div>

        {/* ── Right column ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 lg:gap-5 lg:h-full">
          {second ? (
          <Link
            ref={rightTopRef}
            href={`/blogs/${second.slug}`}
            className="w-full flex-1 min-h-[16rem] sm:min-h-[18rem] lg:min-h-0 relative flex flex-col justify-start gap-4 rounded-2xl bg-[#6A3120] bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{ willChange: 'transform, opacity', backgroundImage: `url('${second.image}')` }}
          >
            <CardMeta title={second.title} author={second.author} date={second.date} />
          </Link>
          ) : null}

          {third ? (
          <Link
            ref={rightBotRef}
            href={`/blogs/${third.slug}`}
            className="w-full flex-1 min-h-[16rem] lg:min-h-0 relative hidden lg:flex flex-col justify-start gap-4 rounded-2xl bg-[#6A3120] bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{ willChange: 'transform, opacity', backgroundImage: `url('${third.image}')` }}
          >
            <CardMeta title={third.title} author={third.author} date={third.date} />
          </Link>
          ) : null}

          <Link
            href="/blogs"
            className="border my-8 border-primary w-[80%] px-5 py-3 text-primary lg:hidden flex justify-center items-center gap-3 rounded-full text-lg"
          >
            Read more <ArrowRight size={22} className="text-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}
