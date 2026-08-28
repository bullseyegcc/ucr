"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Youtube } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoPlayer } from "@/common/video";
import { socialLinks } from "@/assets/social-links";

gsap.registerPlugin(ScrollTrigger);

const socialIcons = {
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

function syncScrollMetrics() {
  window.lenisInstance?.resize?.();
  ScrollTrigger.refresh();
}

export default function Footer() {
  const rootRef = useRef(null);

  // Mobile: keep Lenis scroll limit in sync with fluid footer height
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    syncScrollMetrics();

    const ro = new ResizeObserver(() => syncScrollMetrics());
    ro.observe(el);

    const t = window.setTimeout(syncScrollMetrics, 300);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-full max-lg:grid lg:min-h-[90vh] lg:overflow-hidden"
    >
      {/* Mobile: grid cell stretches with content. Desktop: absolute fill of 90vh. */}
      <div
        className="pointer-events-none relative col-start-1 row-start-1 min-h-full self-stretch overflow-hidden lg:absolute lg:inset-0"
        aria-hidden
      >
        <VideoPlayer
          src="/footer.mp4"
          width={600}
          height={800}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(250, 110, 67, 0.15) 0%, rgba(250, 110, 67, 0.15) 100%)",
          }}
        />
      </div>

      {/* Mobile: in-flow → drives footer height. Desktop: bottom-aligned in 90vh. */}
      <div className="relative z-10 col-start-1 row-start-1 flex w-full flex-col items-center pt-20 lg:absolute lg:inset-x-0 lg:bottom-0 lg:min-h-[90vh] lg:justify-end lg:pt-0">
        <div className="flex w-[90%] md:w-[80%] flex-col gap-6 rounded-t-xl bg-[url(/shared/footerbg.png)] bg-cover bg-bottom p-6 pb-16 sm:gap-12 sm:p-10 sm:pb-12 md:p-16 lg:gap-12 lg:pb-16">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-0">
            <div className="flex items-center">
              <Image
                src="/shared/clogo.png"
                alt="UCR Logo"
                width={160}
                height={45}
                className="object-contain sm:h-[50px] sm:w-[180px]"
              />
            </div>
            <div className="flex gap-4">
              {socialLinks.map(({ label, href }) => {
                const Icon = socialIcons[label];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-10 w-10 items-center justify-center rounded-none text-primary transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:bg-primary"
                  >
                    <Icon
                      size={24}
                      className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:text-white"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="hidden grid-cols-3 gap-12 lg:grid">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase text-primary">
                Address
              </h3>
              <div className="space-y-1 align-middle font-['Helvetica Now Display'] text-[18px] font-medium leading-[29.4px] tracking-[-1.05px] text-gray-700">
                <p>Mussafah,</p>
                <p>Industrial Area of Abu Dhabi (ICAD1),</p>
                <p>P.O.Box 112231,</p>
                <p>Abu Dhabi, UAE</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase text-primary">Phone</h3>
              <div className="text-sm text-gray-700">
                <p className="text-[18px] font-medium">+971 2 550 3241</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase text-primary">Email</h3>
              <div className="text-sm font-medium text-gray-700">
                <p className="text-[18px]">info@unioncopper.ae</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-3 border-t border-gray-200 pt-4 lg:flex-row lg:justify-center lg:gap-12 lg:border-t-0 lg:pt-8">
            <Link href="/" className="text-center">
              <span className="align-middle text-[20px] font-normal leading-[30px] tracking-[-1px] text-primary lg:text-[24.51px] lg:leading-[37.22px] lg:tracking-[-1.33px]">
                Home
              </span>
            </Link>
            <div className="hidden w-px bg-gray-300 lg:block" />
            <Link href="/aboutus" className="text-center">
              <span className="align-middle text-[20px] font-normal leading-[30px] tracking-[-1px] text-primary lg:text-[24.51px] lg:leading-[37.22px] lg:tracking-[-1.33px]">
                About us
              </span>
            </Link>
            <div className="hidden w-px bg-gray-300 lg:block" />
            <Link href="/products" className="text-center">
              <span className="align-middle text-[20px] font-normal leading-[30px] tracking-[-1px] text-primary lg:text-[24.51px] lg:leading-[37.22px] lg:tracking-[-1.33px]">
                Products
              </span>
            </Link>
            <div className="hidden w-px bg-gray-300 lg:block" />
            <Link href="/logistics" className="text-center">
              <span className="align-middle text-[20px] font-normal leading-[30px] tracking-[-1px] text-primary lg:text-[24.51px] lg:leading-[37.22px] lg:tracking-[-1.33px]">
                Logistics
              </span>
            </Link>
            <div className="hidden w-px bg-gray-300 lg:block" />
            <Link href="/contactus" className="text-center">
              <span className="align-middle text-[20px] font-normal leading-[30px] tracking-[-1px] text-primary lg:text-[24.51px] lg:leading-[37.22px] lg:tracking-[-1.33px]">
                Contact Us
              </span>
            </Link>
          </nav>

          <div className="flex flex-col gap-5 lg:hidden">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase text-primary">
                Address
              </h3>
              <div className="space-y-1 align-middle font-['Helvetica Now Display'] text-[15px] font-medium leading-[24px] tracking-[-0.8px] text-gray-700">
                <p>Mussafah,</p>
                <p>Industrial Area of Abu Dhabi (ICAD1),</p>
                <p>P.O.Box 112231,</p>
                <p>Abu Dhabi, UAE</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase text-primary">Phone</h3>
              <div className="text-sm text-gray-700">
                <p className="text-sm font-medium">+971 2 550 3240</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase text-primary">Email</h3>
              <div className="text-sm font-medium text-gray-700">
                <p className="text-sm">info@unioncopper.ae</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
