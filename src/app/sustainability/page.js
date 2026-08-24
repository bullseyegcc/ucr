'use client'

import { useEffect, useRef, useState } from "react"
import { Badge } from "../../common/badge"
import Image from "next/image"
import badge_icon from "../../../public/shared/badge.png"
import FadeIn from "../../animations/FadeIn"
import SlideIn from "../../animations/SlideIn"
import SequentialSlideIn from "../../animations/SequentialSlideIn"
import CardAnimation from "../../animations/CardAnimation"
import Hero from "@/components/shared/Hero"
import { VideoPlayer } from "@/common/video"
import gsap from "gsap"

const SDG_GOALS = [
  {
    number: "03",
    titleLines: ["GOOD HEALTH", "AND WELL BEING"],
    cardClass: "bg-[#289A48]",
    badgeClass: "bg-[#1E7536]/70",
    icon: "/sustainability/card1.svg",
  },
  {
    number: "07",
    titleLines: ["AFFORDABLE AND", "CLEAN ENERGY"],
    cardClass: "bg-[#F9B713]",
    badgeClass: "bg-[#C48A0A]/70",
    icon: "/sustainability/card2.svg",
  },
  {
    number: "08",
    titleLines: ["DECENT WORK AND", "ECONOMIC GROWTH"],
    cardClass: "bg-[#8F1739]",
    badgeClass: "bg-[#6B112B]/70",
    icon: "/sustainability/card3.svg",
  },
  {
    number: "12",
    titleLines: ["RESPONSIBLE CONSUMPTION", "AND PRODUCTION"],
    cardClass: "bg-[#CD8E28]",
    badgeClass: "bg-[#9A6A1E]/70",
    icon: "/sustainability/card4.svg",
  },
  {
    number: "13",
    titleLines: ["CLIMATE", "ACTION"],
    cardClass: "bg-[#457740]",
    badgeClass: "bg-[#345A30]/70",
    icon: "/sustainability/card5.svg",
  },
]

const CERTIFICATIONS = [
  {
    src: "/sustainability/certifications/cert1.svg",
    alt: "ISO 9001 — Quality management",
    label: "Quality management",
  },
  {
    src: "/sustainability/certifications/cert2.svg",
    alt: "ISO 14001 — Environment management",
    label: "Environment management",
  },
  {
    src: "/sustainability/certifications/cert3.svg",
    alt: "ISO 45001 — Health & safety management",
    label: "Health & safety management",
  },
  {
    src: "/sustainability/certifications/cert4.svg",
    alt: "ISO 50001 — Energy management",
    label: "Energy management",
  },
  {
    src: "/sustainability/certifications/cert5.svg",
    alt: "UKAS Management Systems 0015",
    label: "0015",
  },
]

const PILLARS = [
  {
    image: "/sustainability/eco1.png",
    title: "Environmental Stewardship",
    body: "Managing environmental impacts through responsible resource use, energy and water stewardship, pollution prevention, waste management, and continual improvement.",
  },
  {
    image: "/sustainability/eco3.png",
    title: "People & Safety",
    body: "Supporting people, communities, ethical business practices, stakeholder engagement, and responsible governance across our operations.",
  },
  {
    image: "/sustainability/eco2.png",
    title: "Circular Economy",
    body: "Promoting resource efficiency, material recovery, recycling, reuse, and circular manufacturing practices throughout our value chain.",
  },
]

const KNOW_MORE_ITEMS = [
  {
    id: 0,
    title: "Environmental Stewardship",
    body: "At Union Copper Rod, environmental stewardship is integrated into our operations and management systems. We manage the environmental impacts of manufacturing through efficient energy and water use, pollution prevention, and responsible waste management, while maintaining environmental compliance. Guided by ongoing monitoring, risk-based decision-making, and continual improvement, we work to strengthen resource efficiency and support long-term environmental resilience and sustainable industrial growth.",
    backgroundImage: "/sustainability/knowmore1.svg",
  },
  {
    id: 1,
    title: "People, Communities & Governance",
    body: "We put people first through safe workplaces, fair labour practices, and ethical conduct across our operations. By engaging communities and stakeholders openly, and embedding responsible governance in every decision, we build trust, protect wellbeing, and strengthen the social foundation of sustainable growth.",
    backgroundImage: "/sustainability/knowmore2.svg",
  },
  {
    id: 2,
    title: "Circular Economy & Resource Efficiency",
    body: "We advance circular manufacturing by recovering materials, reducing waste, and improving resource efficiency across our value chain. Through recycling, reuse, and smarter process design, we minimise environmental impact while delivering reliable copper products that support a more sustainable industrial future.",
    backgroundImage: "/sustainability/knowmore3.svg",
  },
]

const ELEMENTS = [
  {
    id: "responsible-sourcing",
    icon: "/sustainability/ecofeature1.png",
    title: "Responsible Sourcing",
    body: "Responsible Materials. Trusted Partners.",
    modalBody:
      "Responsible sourcing and supply chain engagement extend our sustainability commitment beyond direct operations. We promote transparency, ethical conduct, and responsible practices across supplier and business relationships, considering environmental and social factors alongside operational needs. Through supplier engagement, risk-based due diligence, and continual improvement, we work to strengthen sustainability performance throughout our value chain.",
    ctaLabel: "Responsible Sourcing Policy · Code Of Conduct →",
    ctaHref: "/ourPolicies",
    modalImage: "/sustainability/modal-responsible.png",
  },
  {
    id: "energy-conscious",
    icon: "/sustainability/ecofeature2.png",
    title: "Energy-Conscious Operations",
    body: "Smarter Energy. Better Performance.",
    modalBody:
      "Energy efficiency is embedded in our operational strategy through continual monitoring, process optimization, and investment in efficient technologies. We regularly evaluate opportunities to improve energy performance across production and supporting activities. By maintaining certified energy management systems, enhancing equipment performance, and tracking energy use, we drive initiatives that reduce unnecessary consumption and support long-term energy efficiency.",
    modalImage: "/sustainability/modal-energy.png",
  },
  {
    id: "community-stakeholder",
    icon: "/sustainability/ecofeature3.png",
    title: "Community & Stakeholder Engagement",
    body: "Listening, collaborating, growing together",
    modalBody:
      "At Union Copper Rod, open and responsive stakeholder engagement supports transparency, accountability, and long-term sustainability. We maintain communication with employees, customers, suppliers, contractors, communities, and authorities to understand expectations, address concerns, and build trust. Through community relations, accessible feedback and grievance mechanisms, awareness initiatives, and continual improvement, we strengthen relationships and support informed decision-making.",
    ctaLabel: "Grievance Mechanism →",
    ctaHref: "/ourPolicies",
    modalImage: "/sustainability/modal-community.png",
  },
  {
    id: "governance-ethics",
    icon: "/sustainability/ecofeature4.png",
    title: "Governance & Ethical Business Practices",
    body: "Integrating in every decision",
    modalBody:
      "Strong governance underpins transparency, accountability, and responsible decision-making across our operations. At Union Copper Rod, it provides the foundation for managing risk, maintaining regulatory compliance, and supporting sustainable long-term performance. Guided by business integrity, robust policies and management systems, risk-based approaches, and continual improvement, we promote ethical conduct and responsible leadership throughout our activities.",
    ctaLabel: "Business Integrity Policy · Code Of Conduct →",
    ctaHref: "/ourPolicies",
    modalImage: "/sustainability/modal-governance.png",
  },
]

function ElementsModal({ item, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="elements-modal-title"
    >
      <div
        className="relative max-h-[min(92vh,880px)] w-full max-w-[720px] overflow-y-auto rounded-[28px] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8 lg:rounded-[32px] lg:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3
            id="elements-modal-title"
            className="pr-4 text-xl font-bold leading-snug tracking-[-0.03em] text-[#111111] sm:text-2xl lg:text-[28px]"
          >
            {item.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5476A] text-[#E5476A] transition-opacity hover:opacity-80 sm:h-10 sm:w-10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 border-t border-dotted border-[#C8C8C8] lg:mt-5" />

        <p className="mt-5 text-sm leading-relaxed text-[#1A1A1A] sm:text-[15px] lg:mt-6 lg:text-base lg:leading-7">
          {item.modalBody}
        </p>

        {item.ctaLabel ? (
          <a
            href={item.ctaHref || "/ourPolicies"}
            className="mt-4 inline-flex text-sm font-medium text-primary transition-opacity hover:opacity-80 sm:text-[15px] lg:mt-5 lg:text-base"
          >
            {item.ctaLabel}
          </a>
        ) : null}

        <div className="relative mt-6 aspect-[16/7] w-full overflow-hidden rounded-2xl lg:mt-8 lg:rounded-[22px]">
          <Image
            src={item.modalImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

function KnowMoreSection() {
  const [activeTab, setActiveTab] = useState(0)
  const backgroundSliderRef = useRef(null)

  const handleTabChange = (tabIndex) => {
    if (tabIndex === activeTab) return
    setActiveTab(tabIndex)

    if (backgroundSliderRef.current) {
      gsap.to(backgroundSliderRef.current, {
        xPercent: -tabIndex * (100 / KNOW_MORE_ITEMS.length),
        duration: 0.6,
        ease: "power2.inOut",
      })
    }
  }

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-2 lg:px-10">
        <div className="relative h-[min(100vh,920px)] max-h-[920px] lg:h-[min(90vh,900px)]">
          <div className="absolute inset-0 overflow-hidden rounded-xl lg:rounded-2xl">
            <div
              ref={backgroundSliderRef}
              className="flex h-full will-change-transform"
              style={{ width: `${KNOW_MORE_ITEMS.length * 100}%` }}
            >
              {KNOW_MORE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="h-full shrink-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    width: `${100 / KNOW_MORE_ITEMS.length}%`,
                    backgroundImage: `url(${item.backgroundImage})`,
                  }}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 flex h-full items-end p-4 sm:p-5 lg:items-stretch lg:p-6 lg:pr-0">
            <div className="relative flex h-auto w-full flex-col justify-between gap-8 rounded-xl bg-white px-7 py-8 shadow-2xl transition-all duration-700 sm:px-8 sm:py-10 lg:h-full lg:w-[58%] lg:gap-10 lg:rounded-2xl lg:px-12 lg:py-12 xl:w-[54%] xl:px-14 xl:py-14">
              <div className="flex shrink-0 items-center gap-3">
                <Image
                  src={badge_icon}
                  alt=""
                  width={24}
                  height={24}
                  className="h-5 w-5 shrink-0 object-contain lg:h-6 lg:w-6"
                />
                <span className="text-sm uppercase leading-5 tracking-[0.08em] text-[#212225] lg:text-base">
                  Know more
                </span>
              </div>

              <div className="flex flex-col gap-5 lg:gap-7">
                {KNOW_MORE_ITEMS.map((item, index) => {
                  const isActive = activeTab === index
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabChange(index)}
                      className="w-full cursor-pointer text-left transition-all duration-300"
                    >
                      <h2
                        className={`font-primary leading-[1.15] tracking-[-0.04em] transition-colors duration-300 ${isActive
                            ? "text-primary text-[1.5rem] font-medium sm:text-[1.75rem] lg:text-[2.35rem] xl:text-[2.65rem]"
                            : "text-[1.35rem] font-normal text-[#D0D0D0] sm:text-[1.5rem] lg:text-[2.1rem] xl:text-[2.35rem]"
                          }`}
                      >
                        {item.title}
                      </h2>
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isActive
                            ? "mt-3 grid-rows-[1fr] opacity-100 lg:mt-4"
                            : "grid-rows-[0fr] opacity-0"
                          }`}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-xl text-sm leading-relaxed text-[#4A4A4A] sm:text-[15px] lg:text-base lg:leading-7">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="flex shrink-0 gap-2 pt-1">
                {KNOW_MORE_ITEMS.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Show ${KNOW_MORE_ITEMS[index].title}`}
                    onClick={() => handleTabChange(index)}
                    className={`cursor-pointer rounded-full transition-all duration-300 ${activeTab === index
                        ? "h-3 w-6 bg-primary sm:h-4 sm:w-8"
                        : "h-1.5 w-3 bg-gray-300 hover:bg-gray-400 sm:h-3 sm:w-6"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Sustainability() {
  const [activeElement, setActiveElement] = useState(null)

  return (
    <div>
      <Hero
        badge="Sustainability"
        title="A Greener Tomorrow"
        titleClassName="w-full max-w-[18rem] sm:max-w-none px-4 capitalize"
        titleDirectFade
        titleInH1={false}
        className="rounded-b-2xl dark:bg-black px-4 lg:px-0"
        minHeightClass="h-[min(70vh,720px)] lg:h-[min(85vh,900px)]"
        gapClass="gap-4 lg:gap-5"
        background={{
          type: "image-inline",
          style: {
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%), url('/sustainability/sustainbg.svg') lightgray 50% / cover no-repeat",
          },
        }}
      >
        <FadeIn
          duration={0.5}
          delay={0.15}
          className="relative z-10 mx-auto max-w-xl px-6 lg:max-w-2xl"
        >
          <p className="text-center text-sm font-normal leading-relaxed text-white/95 sm:text-base lg:text-xl lg:leading-8">
            We strive to minimise our environmental impact, ensuring that our
            operations contribute positively to our communities and the world.
          </p>
        </FadeIn>
      </Hero>

      {/* Our Sustainability Approach */}
      <section className="bg-[#F5F5F5] py-14 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-2 lg:px-10">
          <SlideIn direction="bottom" scrollTrigger duration={0.7}>
            <Badge title="Our Approach" />
          </SlideIn>

          <FadeIn scrollTrigger duration={0.7} className="mt-5 lg:mt-7">
            <h2 className="text-center text-[28px] font-medium leading-tight tracking-[-1px] text-[#212225] sm:text-[36px] lg:text-[52px] lg:leading-[60px] lg:tracking-[-1.4px]">
              Our Sustainability Approach
            </h2>
          </FadeIn>

          <FadeIn scrollTrigger duration={0.7} delay={0.1} className="mt-5 max-w-4xl lg:mt-7">
            <p className="text-center text-[15px] font-normal leading-7 text-[#212225] sm:text-base lg:text-lg lg:leading-8">
              Sustainability is embedded in Union Copper Rod&apos;s management
              systems, operations, and decisionmaking. Guided by internationally
              recognized principles and continuous improvement, our approach spans
              environmental stewardship, occupational health and safety, human
              rights and workforce wellbeing, ethical conduct, responsible
              sourcing, community engagement, and risk management.
            </p>
          </FadeIn>

          <FadeIn scrollTrigger duration={0.7} delay={0.15} className="mt-8 lg:mt-10">
            <p className="text-center text-xs font-medium uppercase tracking-[0.12em] text-primary sm:text-xs lg:text-sm">
              Aligned with leading international standards &amp; frameworks
            </p>
          </FadeIn>

          <SequentialSlideIn
            className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-5 lg:gap-4 xl:gap-5"
            itemClassName="min-w-0 h-full"
            start="top 85%"
            end="bottom 70%"
            stagger={0.12}
          >
            {SDG_GOALS.map((goal) => (
              <div
                key={goal.number}
                className={`flex h-full min-h-[260px] flex-col rounded-[28px] px-5 pb-6 pt-5 text-white sm:min-h-[280px] lg:min-h-[320px] lg:rounded-[32px] lg:px-6 lg:pb-7 lg:pt-6 ${goal.cardClass}`}
              >
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium tracking-wide text-white lg:text-xs ${goal.badgeClass}`}
                >
                  SDG goals
                </span>

                <div className="mt-6 flex flex-1 flex-col items-center lg:mt-8">
                  <span className="text-[48px] font-bold leading-none tracking-[-0.06em] text-white/45 sm:text-[48px] lg:text-[36px]">
                    {goal.number}
                  </span>
                  <h3 className="mt-3 text-center text-base font-bold uppercase leading-[1.15] tracking-[-0.04em] text-white sm:text-base lg:mt-4 lg:text-[24px] lg:leading-[1.2]">
                    {goal.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                </div>

                <div className="mt-5 flex justify-center lg:mt-6">
                  <Image
                    src={goal.icon}
                    alt=""
                    width={153}
                    height={88}
                    className="h-14 w-auto object-contain sm:h-16 lg:h-[4.5rem]"
                  />
                </div>
              </div>
            ))}
          </SequentialSlideIn>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-[#F5F5F5] pb-14 lg:pb-20">
        <div className="mx-auto w-full max-w-[1600px] px-2 lg:px-10">
          <div className="rounded-[28px] bg-white px-4 py-8 sm:px-6 sm:py-10 lg:rounded-[32px] lg:px-8 lg:py-12">
            <SequentialSlideIn
              className="grid grid-cols-2 items-end justify-items-center gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5 lg:gap-6 xl:gap-10"
              itemClassName="flex w-full max-w-[220px] flex-col items-center"
              start="top 90%"
              end="bottom 75%"
              stagger={0.12}
            >
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.src}
                  className="flex w-full flex-col items-center text-center"
                >
                  <div className="relative aspect-[262/329] w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[220px]">
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      fill
                      sizes="(max-width: 1024px) 40vw, 220px"
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-3 text-sm font-normal leading-snug text-[#212225] sm:text-[15px] lg:mt-4 lg:text-base">
                    {cert.label}
                  </p>
                </div>
              ))}
            </SequentialSlideIn>
          </div>
        </div>
      </section>

      {/* Our Sustainability Impact */}
      <section
        id="sustainability-impact"
        className="bg-white py-14 lg:py-20"
      >
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-2 lg:px-10">
          <SlideIn direction="bottom" scrollTrigger duration={0.7}>
            <Badge title="Since2020" />
          </SlideIn>

          <FadeIn scrollTrigger duration={0.7} className="mt-5 lg:mt-7">
            <h2 className="text-center text-[28px] font-medium leading-tight tracking-[-1px] text-[#212225] sm:text-[36px] lg:text-[52px] lg:leading-[60px] lg:tracking-[-1.4px]">
              Our Sustainability Impact
            </h2>
          </FadeIn>

          <FadeIn scrollTrigger duration={0.7} delay={0.1} className="mt-5 max-w-4xl lg:mt-7">
            <p className="text-center text-[15px] font-normal leading-7 text-[#212225] sm:text-base lg:text-lg lg:leading-8">
              Sustainability is built into our strategy and daily operations. As a
              copper manufacturer, we balance economic performance with
              environmental responsibility, workforce wellbeing, and ethical
              conduct, promoting responsible resource use, environmental
              stewardship, and safety across our value chain.
            </p>
          </FadeIn>

          <div className="mt-10 grid w-full grid-cols-2 gap-4 lg:mt-14 lg:h-[min(68vh,620px)] lg:grid-cols-3 lg:grid-rows-[3fr_2fr] lg:gap-5">
            <CardAnimation
              index={0}
              className="relative col-span-2 min-h-[360px] overflow-hidden rounded-[28px] lg:col-span-1 lg:row-span-2 lg:min-h-0 lg:rounded-[32px]"
            >
              <Image
                src="/sustainability/energyefficient.png"
                alt="Electricity savings"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <span className="inline-block rounded-full bg-black/45 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white lg:text-xs">
                  Electricity
                </span>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white lg:text-[42px] lg:leading-none">
                  600,000+ KWH
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/90 lg:text-base">
                  reduced, equivalent to powering 54,500 hours.
                </p>
              </div>
            </CardAnimation>

            <CardAnimation
              index={1}
              className="relative col-span-2 min-h-[260px] overflow-hidden rounded-[28px] lg:col-span-2 lg:min-h-[220px] lg:rounded-[32px]"
            >
              <Image
                src="/sustainability/water.png"
                alt="Water savings"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <span className="inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white lg:text-xs">
                  Water
                </span>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white lg:text-[42px] lg:leading-none">
                  6.1M Liters
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/90 lg:text-base">
                  annually, equivalent to 8,000 people drinking for a year.
                </p>
              </div>
            </CardAnimation>

            <CardAnimation
              index={2}
              className="relative flex min-h-[200px] flex-col justify-center overflow-hidden rounded-[28px] p-6 lg:min-h-0 lg:rounded-[32px] lg:p-8"
            >
              <Image
                src="/sustainability/cardbg.svg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/55" />
              <div className="relative z-10">
                <span className="inline-block w-fit rounded-full border border-[#D0D0D0] bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:text-xs">
                  Natural Gas
                </span>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[#3F7E44] lg:text-[40px] lg:leading-none">
                  9% reduced
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#4A4A4A] lg:text-base">
                  equivalent to 550+ tons of CO2 emissions.
                </p>
              </div>
            </CardAnimation>

            <CardAnimation
              index={3}
              className="relative flex min-h-[200px] flex-col justify-center overflow-hidden rounded-[28px] p-6 lg:min-h-0 lg:rounded-[32px] lg:p-8"
            >
              <Image
                src="/sustainability/cardbg.svg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/55" />
              <div className="relative z-10">
                <span className="inline-block w-fit rounded-full border border-[#D0D0D0] bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:text-xs">
                  GHG Reduced
                </span>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[#3F7E44] lg:text-[40px] lg:leading-none">
                  800+ tons
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#4A4A4A] lg:text-base">
                  of CO2 annually, equivalent to planting 20,000 trees for 10 years
                </p>
              </div>
            </CardAnimation>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="bg-[#F5F5F5] py-14 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-5 sm:px-8 lg:px-10">
          <SlideIn direction="bottom" scrollTrigger duration={0.7}>
            <Badge title="Pillars" />
          </SlideIn>

          <FadeIn scrollTrigger duration={0.7} className="mt-5 lg:mt-7">
            <h2 className="max-w-3xl text-center text-[28px] font-medium leading-tight tracking-[-1px] text-[#212225] sm:text-[36px] lg:text-[52px] lg:leading-[60px] lg:tracking-[-1.4px]">
              Three Pillars. One Sustainable Future.
            </h2>
          </FadeIn>

          <div className="mt-10 grid w-full grid-cols-1 place-items-center gap-8 lg:mt-16 lg:grid-cols-3 lg:place-items-stretch lg:gap-8">
            {PILLARS.map((pillar, index) => (
              <CardAnimation
                key={pillar.title}
                index={index}
                className="flex w-full max-w-[300px] flex-col gap-4 group sm:max-w-[340px] lg:max-w-none"
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl sm:aspect-[4/3] lg:rounded-3xl">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1024px) 340px, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="text-xl font-medium text-primary lg:text-2xl">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4A4A4A] lg:text-base lg:leading-7">
                  {pillar.body}
                </p>
              </CardAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Know More — FeaturedProducts pattern */}
      <KnowMoreSection />

      {/* Core Strength / Elements */}
      <section className="bg-[#F5F5F5] py-14 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-2 lg:px-10">
          <SlideIn direction="bottom" scrollTrigger duration={0.7}>
            <Badge title="Core Strength" />
          </SlideIn>

          <FadeIn scrollTrigger duration={0.7} className="mt-5 lg:mt-7">
            <h2 className="max-w-4xl text-center text-[28px] font-medium leading-tight tracking-[-1px] text-[#212225] sm:text-[36px] lg:text-[52px] lg:leading-[60px] lg:tracking-[-1.4px]">
              Our Elements For Sustainable Production
            </h2>
          </FadeIn>

          <SequentialSlideIn
            className="mt-10 grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:mt-14 lg:h-[min(72vh,760px)] lg:grid-cols-3 lg:grid-rows-2 lg:gap-5"
            getItemClassName={(index) =>
              [
                "min-h-[48vh] sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:ml-10 lg:min-h-0 lg:h-full",
                "min-h-0 min-w-0 h-full",
                "min-h-0 min-w-0 h-full",
                "min-h-0 min-w-0 h-full",
                "min-h-0 min-w-0 h-full",
              ][index]
            }
            start="top 85%"
            end="bottom 70%"
            stagger={0.12}
          >
            <div className="relative h-full min-h-[48vh] overflow-hidden rounded-xl group transition-all duration-400 lg:min-h-0">
              <VideoPlayer
                src="/wecarethenature.mp4"
                width={600}
                height={800}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <h1 className="absolute bottom-4 left-4 text-xl text-white lg:bottom-9 lg:left-6 lg:text-3xl">
                We care the Nature
              </h1>
            </div>

            {ELEMENTS.map((item) => (
              <div
                key={item.id}
                className="flex h-full min-h-[220px] flex-col rounded-[28px] bg-white p-6 lg:min-h-0 lg:rounded-[32px] lg:p-7"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="h-12 w-12 object-contain lg:h-14 lg:w-14"
                />
                <h3 className="mt-5 text-xl font-semibold leading-snug tracking-[-0.03em] text-[#212225] lg:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#6B6B6B] lg:text-[17px] lg:leading-7">
                  {item.body}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveElement(item)}
                  className="mt-auto cursor-pointer pt-6 text-left text-base font-medium text-primary transition-opacity hover:opacity-80 lg:text-lg"
                >
                  Explore →
                </button>
              </div>
            ))}
          </SequentialSlideIn>
        </div>
      </section>

      <ElementsModal
        item={activeElement}
        onClose={() => setActiveElement(null)}
      />
    </div>
  )
}
