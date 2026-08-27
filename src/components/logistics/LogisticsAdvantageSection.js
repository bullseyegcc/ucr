import Image from "next/image";
import SlideIn from "../../animations/SlideIn";
import SequentialSlideIn from "../../animations/SequentialSlideIn";
import LogisticsAdvantageCard from "./LogisticsAdvantageCard";
import { useState } from "react";

const cards = [
  {
    index: 0,
    count: "01",
    title: "Strategic Sourcing",
    description:
      "Reliable sourcing supported by trusted suppliers and strong market access.",
    image: "/products/pdetail.png",
  },
  {
    index: 1,
    count: "02",
    title: "Operational Excellence",
    description:
      "Integrated operations driven by efficiency, consistency, and quality excellence.",
    image: "/blogs/blog6.png",
  },
  {
    index: 2,
    count: "03",
    title: "Global Shipping Network",
    description:
      "Strong partnerships with global shipping lines support reliable international delivery.",
    image: "/blogs/blog8.png",
  },
  {
    index: 3,
    count: "04",
    title: "Government & Semi Government Relations",
    description:
      "Established institutional relationships support smooth trade, compliance, and business continuity.",
    image: "/blogs/blog9.png",
  },
];

export default function LogisticsAdvantageSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);

  const getBgImageUrl = () => {
    const activeIndex = clickedCard ?? hoveredCard;
    const activeCard = cards.find((card) => card.index === activeIndex);
    return activeCard?.image ?? "/home/fp3.png";
  };

  const isActive = (index) => clickedCard === index;

  const toggleClicked = (index) => {
    setClickedCard((prev) => (prev === index ? null : index));
  };

  const renderCard = (card, { enableHover = true } = {}) => (
    <LogisticsAdvantageCard
      key={card.count}
      index={card.index}
      count={card.count}
      title={card.title}
      description={card.description}
      className="h-full"
      borderColor={
        isActive(card.index)
          ? "border-primary"
          : "border-secondary hover:border-primary"
      }
      numberColor={
        isActive(card.index)
          ? "text-primary"
          : "text-secondary group-hover:text-primary"
      }
      titleColor={
        isActive(card.index)
          ? "text-primary"
          : "text-secondary group-hover:text-primary"
      }
      onMouseEnter={
        enableHover ? () => setHoveredCard(card.index) : undefined
      }
      onMouseLeave={enableHover ? () => setHoveredCard(null) : undefined}
      onClick={() => toggleClicked(card.index)}
    />
  );

  return (
    <div className="relative w-full bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/shared/gradientcircle.png"
          alt="Logistics End Image"
          width={900}
          height={200}
          className="absolute -top-80 -right-20 w-[50vw] z-0"
        />
        <Image
          src="/shared/vector.png"
          alt="Logistics End Image"
          width={300}
          height={0}
          className="absolute -top-10 -right-5 z-0"
        />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-start gap-12 px-6 lg:px-10 pt-20 pb-20">
        <SlideIn
          direction="left"
          duration={0.8}
          scrollTrigger={true}
          className="w-full text-left"
        >
          <h1 className="text-sm lg:text-xl lg:text-2xl text-primary uppercase">
            Strength
          </h1>
          <h1 className="text-2xl lg:text-4xl lg:text-5xl font-medium text-black mt-2 lg:mt-4 leading-tight lg:leading-snug">
            Major advantages
          </h1>
        </SlideIn>

        {/* Mobile: image expands below the clicked card */}
        <div className="flex w-full flex-col gap-8 lg:hidden">
          {cards.map((card) => {
            const open = isActive(card.index);

            return (
              <div key={card.count} className="w-full">
                {renderCard(card, { enableHover: false })}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    open
                      ? "mt-4 grid-rows-[1fr] opacity-100"
                      : "pointer-events-none grid-rows-[0fr] opacity-0"
                  }`}
                  aria-hidden={!open}
                >
                  <div className="overflow-hidden">
                    <div
                      className="h-[40vh] w-full rounded-xl bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url('${card.image}')` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: shared side image panel */}
        <SequentialSlideIn
          className="hidden w-full grid-cols-1 items-stretch gap-8 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-8 lg:gap-y-10"
          getItemClassName={(index) =>
            [
              "h-full lg:col-start-1 lg:row-start-1",
              "h-auto lg:col-start-3 lg:row-start-1 lg:row-span-2",
              "h-full lg:col-start-2 lg:row-start-1",
              "h-full lg:col-start-1 lg:row-start-2",
              "h-full lg:col-start-2 lg:row-start-2",
            ][index]
          }
          start="top 85%"
          end="bottom 70%"
        >
          {renderCard(cards[0])}
          <div
            className="h-full min-h-[28rem] w-full bg-cover bg-bottom bg-no-repeat transition-all duration-500"
            style={{ backgroundImage: `url('${getBgImageUrl()}')` }}
          />
          {renderCard(cards[1])}
          {renderCard(cards[2])}
          {renderCard(cards[3])}
        </SequentialSlideIn>
      </div>
    </div>
  );
}
