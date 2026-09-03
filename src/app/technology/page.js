"use client";

import { useLayoutEffect } from "react";
import Image from "next/image";
import { Badgetextblack } from "../../common/badge";
import Hero from "@/components/shared/Hero";
import ParallaxSection from "../../animations/ParallaxSection";
import CardAnimation from "../../animations/CardAnimation";
import ScrollStack, {
  ScrollStackItem,
} from "@/components/ScrollStack/ScrollStack";
import TechnologyLaboratorySection from "../../components/technology/TechnologyLaboratorySection";

/** Document Y via offset chain — ignores CSS transforms (ScrollStack). */
function getDocumentTop(element) {
  let top = 0;
  let node = element;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent;
  }
  return top;
}

function scrollWindowTo(y, { immediate = false } = {}) {
  const lenis = window.lenisInstance;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(y, {
      immediate,
      // Longer + softer ease-in-out so the settle feels gentler
      duration: immediate ? 0 : 1.85,
      easing: (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    });
    return;
  }
  window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}

function getTechnologyScrollY(el) {
  // Match ScrollStack desktop pin so the card arrives from above, not after an overshoot
  const isDesktop = window.innerWidth >= 1024;
  const cards = Array.from(document.querySelectorAll(".scroll-stack-card"));
  const index = Math.max(0, cards.indexOf(el));
  const stackOffset = isDesktop
    ? window.innerHeight * 0.14 + 20 * index
    : 80;
  return Math.max(0, getDocumentTop(el) - stackOffset);
}

/** Prefer data-tech-id so the browser never hard-jumps to a matching #id. */
function findTechnologyCard(techId) {
  if (!techId) return null;
  return (
    document.querySelector(`[data-tech-id="${techId}"]`) ||
    document.getElementById(techId)
  );
}

function getRequestedTechId() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("tech");
  if (fromQuery) return fromQuery;
  const hash = window.location.hash.replace(/^#/, "");
  return hash || null;
}

function scrollToTechnology(techId, { immediate = false } = {}) {
  if (!techId) return false;
  const el = findTechnologyCard(techId);
  if (!el) return false;
  scrollWindowTo(getTechnologyScrollY(el), { immediate });
  return true;
}

function syncTechUrl(techId) {
  if (!techId) return;
  const next = `/technology#${techId}`;
  if (`${window.location.pathname}${window.location.hash}` === next) return;
  // replaceState keeps shareable hash URLs without triggering native scroll
  window.history.replaceState(null, "", next);
}

const TECH_CARDS = [
  {
    id: "ccr-technology",
    title: "CCR Technology",
    number: "01",
    total: "05",
    variant: "light",
    image: "/technology/southwire.webp",
    paragraphs: [
      "Union Copper Rod operates a Southwire SCR® Continuous Casting and Rolling system, engineered to produce premium Electrolytic Tough Pitch (ETP) copper rod with exceptional quality and efficiency. The system integrates charging, melting, casting, rolling, coiling, and packaging into one continuous manufacturing process. High-purity copper cathodes are melted, continuously cast, and immediately hot rolled before passing through the Non-Acid Pickling System (NAPS), wax coating, and automated coiling and packaging. This seamless process improves productivity, ensures consistent product quality, and minimizes material handling.",
      "The SCR® combines advanced automation, precise process control, and integrated quality assurance to manufacture 8 mm, 12.5 mm, and 16 mm ETP copper rod that meets demanding international standards. The system also recycles internally generated copper scrap back into production, supporting resource efficiency and circular manufacturing. Today, UCR supplies high-performance copper rod to customers in more than 50 countries, serving the power, construction, telecommunications, automotive, and industrial sectors.",
    ],
  },
  {
    id: "rod-breakdown",
    title: "Rod Breakdown Technology",
    number: "02",
    total: "05",
    variant: "dark",
    image: "/technology/tech-1.png",
    textWidth: "lg:w-[58%]",
    imageWidth: "lg:w-[42%]",
    paragraphs: [
      "UCR's Rod Breakdown line utilizes Italian state-of-the-art drawing technology to continuously convert 8 mm copper rod into intermediate wire sizes with exceptional dimensional accuracy and surface quality. The line incorporates a multi-capstan drawing system, where the wire is progressively reduced through precision tungsten carbide drawing dies before entering an integrated Continuous Resistance Annealer (CRA), restoring ductility while maintaining excellent mechanical and electrical properties.",
      "Following annealing, the wire passes through integrated cooling, drying, and an automatic take-up system, ensuring consistent winding quality and reliable continuous production. Automated process controls regulate drawing speed, annealing, and wire tension to deliver uniform product quality for downstream fine wire drawing, electrolytic tin plating, bunching, and cable manufacturing.",
    ],
  },
  {
    id: "tin-coating",
    title: "Tin Coating Technology",
    number: "03",
    total: "05",
    variant: "light",
    image: "/technology/tech-2.png",
    paragraphs: [
      "UCR operates a modern continuous electrolytic tin plating line designed to produce consistently coated copper wire for downstream manufacturing. The process begins with a dedicated degreasing stage that removes surface contaminants, ensuring optimum adhesion before the wire enters the electrolytic tin plating section. Following plating, multiple rinsing stages remove residual chemicals, resulting in a clean and uniform finished surface.",
      "The coating process is carefully controlled through parameters such as line speed, electrical current density, chemical concentration, and bath conditions, enabling consistent coating thickness and product quality. The system is capable of applying tin coatings from 1 to 20 microns on copper wire diameters ranging from 1.25 mm to 3.75 mm, supporting a wide range of customer specifications. The finished tinned copper wire offers improved resistance to oxidation and corrosion, enhanced solderability, and reliable long-term electrical performance, making it suitable for solar and instrumentation cable manufacturing, automotive, electronics, and other high-performance electrical applications.",
    ],
  },
  {
    id: "upwards-vertical-casting",
    title: "Upwards Vertical Continuous Casting",
    number: "04",
    total: "05",
    variant: "dark",
    image: "/home/tech4.webp",
    textWidth: "lg:w-[58%]",
    imageWidth: "lg:w-[42%]",
    paragraphs: [
      "Unlike conventional horizontal casting, the Up Cast process solidifies molten copper by drawing it upward through precision graphite dies under carefully controlled conditions. This minimizes oxygen pickup to keep it within 3–5 ppm and produces oxygen-free high conductivity (OFHC) copper with outstanding mechanical and electrical properties.",
      "The Rautomead system installed at Union Copper Rod is capable of producing copper rod in diameters ranging from 8 mm to 30 mm, supporting a wide range of downstream wire drawing and electrical manufacturing applications. The fully integrated plant combines melting, holding, casting, automatic cathode feeding, cooling systems, and automated coiling into one continuous production process.",
    ],
  },
  {
    id: "advanced-copper-recycling",
    title: "Advanced Copper Recycling",
    number: "05",
    total: "05",
    variant: "light",
    image: "/home/tech5.webp",
    paragraphs: [
      "Our advanced copper recycling facility combines proven European recycling technologies to maximize copper recovery and extraction while removing contaminants before the material returns to production. This integrated processing line delivers consistent, high-purity recycled copper feedstock while maximizing material recovery, operational efficiency, and circular resource utilization.",
    ],
  },
];

const STACK_ITEM_CLASS =
  "!mx-3 !my-0 !h-auto !min-h-0 !max-h-none !w-[calc(100%-1.5rem)] !rounded-xl !p-0 !shadow-none sm:!mx-6 sm:!w-[calc(100%-3rem)] lg:!mx-8 lg:!h-[40rem] lg:!min-h-0 lg:!max-h-[40rem] lg:!w-[calc(100%-4rem)]";

function TechnologyCard({ card }) {
  const isDark = card.variant === "dark";
  const titleClass = isDark
    ? "text-white font-medium uppercase text-[clamp(1.375rem,1rem+1.2vw,2.5rem)] leading-[1.3] tracking-[-0.0875rem]"
    : `text-primary font-medium ${
        card.uppercase !== false ? "uppercase" : ""
      } text-[clamp(1.375rem,1rem+1.2vw,2.5rem)] leading-[1.3] tracking-[-0.0875rem]`;

  return (
    <div
      className={[
        "flex max-lg:h-auto h-full min-h-0 w-full flex-col max-lg:overflow-visible overflow-hidden px-5 sm:px-8 lg:px-10",
        isDark ? "text-white bg-[#272A2A]" : "bg-white",
      ].join(" ")}
    >
      <div className="flex shrink-0 flex-col gap-2 border-b border-secondary/40 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-8 lg:py-10">
        <h2 className={titleClass}>{card.title}</h2>
        <p className="text-primary whitespace-nowrap text-base font-semibold leading-tight sm:text-xl lg:text-3xl">
          {card.number}/<span className="text-secondary">{card.total}</span>
        </p>
      </div>

      <div className="flex max-lg:flex-none min-h-0 flex-1 flex-col gap-4 pt-4 pb-6 sm:gap-7 sm:pt-6 sm:pb-9 lg:flex-row lg:items-start lg:gap-10 lg:pt-7 lg:pb-10">
        <div
          className={`flex w-full min-w-0 flex-col justify-start gap-4 max-lg:overflow-visible overflow-hidden sm:gap-6 ${
            card.textWidth || "lg:w-[58%]"
          }`}
        >
          {card.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="font-normal text-[0.9375rem] leading-[1.6] tracking-[-0.028rem] sm:text-[clamp(0.875rem,0.8rem+0.35vw,1.125rem)] sm:leading-[1.65]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div
          className={`flex w-full min-w-0 shrink-0 ${
            card.imageWidth || "lg:w-[42%]"
          }`}
        >
          <div className="relative h-[11.5rem] w-full overflow-hidden rounded-lg sm:h-[14rem] lg:h-[clamp(22rem,44vh,30rem)] lg:min-h-[22rem]">
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              quality={75}
              className="object-cover lg:rounded-r-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Technology() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const techId = getRequestedTechId();
    if (!techId) return;

    let cancelled = false;
    let retryTimer;
    let animateTimer;
    let hasStartedDown = false;
    const prevRestoration = history.scrollRestoration;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const pinToTop = () => {
      scrollWindowTo(0, { immediate: true });
    };

    // Start at hero — no native #id hard-jump possible (cards use data-tech-id)
    pinToTop();
    syncTechUrl(techId);

    const startDownwardScroll = (attempt = 0) => {
      if (cancelled) return;

      const el = findTechnologyCard(techId);
      if (!el) {
        pinToTop();
        if (attempt < 40) {
          retryTimer = window.setTimeout(
            () => startDownwardScroll(attempt + 1),
            50
          );
        }
        return;
      }

      // Hold at the hero for a beat, then smooth-scroll down to the tech card
      pinToTop();
      animateTimer = window.setTimeout(() => {
        if (cancelled) return;
        pinToTop();
        requestAnimationFrame(() => {
          if (cancelled) return;
          hasStartedDown = true;
          scrollToTechnology(techId, { immediate: false });
        });
      }, 1300);
    };

    const onLenisReady = () => {
      if (!cancelled && !hasStartedDown) pinToTop();
    };

    const onHashChange = () => {
      const next = window.location.hash.replace(/^#/, "");
      if (!next || cancelled) return;
      hasStartedDown = false;
      pinToTop();
      window.clearTimeout(animateTimer);
      animateTimer = window.setTimeout(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          hasStartedDown = true;
          scrollToTechnology(next, { immediate: false });
        });
      }, 1300);
    };

    retryTimer = window.setTimeout(() => startDownwardScroll(0), 80);
    window.addEventListener("lenisReady", onLenisReady);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
      window.clearTimeout(animateTimer);
      window.removeEventListener("lenisReady", onLenisReady);
      window.removeEventListener("hashchange", onHashChange);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = prevRestoration || "auto";
      }
    };
  }, []);

  return (
    <div className="bg-[#F2F2F2]">
      <Hero
        badge="Technlogy"
        title="Our Advance Technology"
        titleClassName="w-full px-4"
        titleDirectFade
        titleInH1={false}
        contentLayout="absolute"
        contentPositionClass="absolute top-[35%] lg:top-[40%] z-20 font-medium"
        gapClass="gap-5"
        className="flex justify-center bg-black dark:bg-black font-medium"
        background={{
          type: "video",
          src: "/technologybg.mp4",
          priority: true,
          overlayClassName:
            "bg-[linear-gradient(0deg,rgba(0,0,0,0.35)0%,rgba(0,0,0,0.35)100%)]",
        }}
      />

      <ParallaxSection index={0}>
        <CardAnimation index={0}>
          <div className="overflow-x-hidden relative flex flex-col px-6 sm:px-8 py-12 lg:py-20 lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-8 lg:gap-12 mb-12 lg:mb-16 lg:mb-20">
            <div className="lg:w-[40%] sm:mb-30">
              <Badgetextblack title="Top notch Technology" />
              <h1 className="font-medium text-[32px] leading-[48px] tracking-[-0.7px] align-bottom capitalize mt-4 lg:mt-5 lg:mt-6 lg:text-[52px] lg:leading-[72px] lg:tracking-[-1.4px]">
                Precision Crafted Copper Excellence
              </h1>
            </div>
            <div className="lg:w-[35%] flex lg:justify-end text-xs text-gray-600 lg:pt-8 lg:pt-12">
              <p className="font-normal text-[16px] leading-[30px] tracking-[-0.45px] lg:text-[22px] lg:leading-[40px]">
                Cutting-edge technology meets traditional craftsmanship.
                Discover how we&apos;re reshaping the future of copper
                manufacturing.
              </p>
            </div>
            <Image
              src="/technology/technologyheaderbottom.webp"
              alt=""
              width={1920}
              height={121}
              sizes="100vw"
              quality={75}
              className="w-full absolute bottom-0 pointer-events-none"
            />
          </div>
        </CardAnimation>
      </ParallaxSection>

      <ScrollStack
        useWindowScroll
        className="mt-4 sm:mt-6 lg:mt-8"
        itemDistance={180}
        itemStackDistance={20}
        stackPosition="14%"
        scaleEndPosition="10%"
        baseScale={0.94}
        itemScale={0.015}
        disableStackOnMobile
      >
        {TECH_CARDS.map((card) => (
          <ScrollStackItem
            key={card.id}
            techId={card.id}
            itemClassName={STACK_ITEM_CLASS}
          >
            <TechnologyCard card={card} />
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <TechnologyLaboratorySection />
    </div>
  );
}
