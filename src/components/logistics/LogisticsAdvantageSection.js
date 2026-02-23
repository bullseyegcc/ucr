
import Image from "next/image";
import SlideIn from "../../animations/SlideIn";
import LogisticsAdvantageCard from "./LogisticsAdvantageCard";
import { useState } from "react";

export default function LogisticsAdvantageSection() {

  // Track which card is hovered or clicked (null, 8, 9, or 10)
  const [hoveredCard, setHoveredCard] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);

  // Map card index to background image
  const bgImages = {
    8: "/pdetail.png",
    9: "/blog8.png",
    10: "/blog9.png",
    default: "/fp3.png",
  };

  // Get background image URL based on clicked or hovered card
  const getBgImageUrl = () => {
    if (clickedCard && bgImages[clickedCard]) {
      return bgImages[clickedCard];
    }
    if (hoveredCard && bgImages[hoveredCard]) {
      return bgImages[hoveredCard];
    }
    return bgImages.default;
  };

  // Helper to determine active state: clicked overrides hover
  const isActive = (index) => (clickedCard ? clickedCard === index : hoveredCard === index);

  // Toggle clicked state on card click
  const toggleClicked = (index) => {
    setClickedCard((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/gradientcircle.png" alt="Logistics End Image" width={900} height={200} className="absolute -top-80 -right-20 w-[50vw] z-0" />
        <Image src="/vector.png" alt="Logistics End Image" width={300} height={0} className="absolute -top-10 -right-5 z-0" />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-12 px-6 lg:px-10 pt-20 pb-20">
        <SlideIn direction="left" duration={0.8} scrollTrigger={true} className="w-full text-left">
          <h1 className='text-sm lg:text-xl lg:text-2xl text-primary uppercase'>Global Presence</h1>
          <h1 className="text-2xl lg:text-4xl lg:text-5xl font-semibold text-black mt-2 lg:mt-4 leading-tight lg:leading-snug">Global Reach</h1>
        </SlideIn>
        {/* wrapper */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
          {/* column 1 */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8 lg:gap-10 ">
            <LogisticsAdvantageCard
              index={6}
              count={"01"}
              title="Higher Delivery Capacity"
              description="UCR's state-of-the-art facility is Middle East's largest independent copper rod-producing mill with a capacity exceeding 200,000 metric tons per annum."
              borderColor={isActive(6) ? "border-primary" : "border-primary"}
              hoverBorderColor="hover:border-primary"
              numberColor={isActive(6) ? "text-primary" : ""}
              onMouseEnter={() => setHoveredCard(6)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => toggleClicked(6)}
            />
            <div className="block lg:hidden w-full  h-[40vh] lg:h-[80vh] bg-[url('/advantagecol3.png')] bg-cover  bg-bottom bg-no-repeat"></div>
            <LogisticsAdvantageCard
              index={7}
              count={"03"}
              title="Higher Delivery Capacity"
              description="UCR's state-of-the-art facility is Middle East's largest independent copper rod-producing mill with a capacity exceeding 200,000 metric tons per annum."
              borderColor={isActive(7) ? "border-primary" : "border-secondary"}
              hoverBorderColor="hover:border-primary"
              numberColor={isActive(7) ? "text-primary" : "text-secondary hover:text-primary"}
              className="hidden lg:flex"
              onMouseEnter={() => setHoveredCard(7)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => toggleClicked(7)}
            />
          </div>
          {/* column 2 */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8 lg:gap-10 ">
            <LogisticsAdvantageCard
              index={8}
              count={"02"}
              title="Higher Delivery Capacity"
              description="UCR's state-of-the-art facility is Middle East's largest independent copper rod-producing mill with a capacity exceeding 200,000 metric tons per annum."
              borderColor={isActive(8) ? "border-primary" : "border-primary"}
              hoverBorderColor="hover:border-primary"
              numberColor={isActive(8) ? "text-primary" : ""}
              onMouseEnter={() => setHoveredCard(8)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => toggleClicked(8)}
            />
            <LogisticsAdvantageCard
              index={9}
              count={"03"}
              title="Higher Delivery Capacity"
              description="UCR's state-of-the-art facility is Middle East's largest independent copper rod-producing mill with a capacity exceeding 200,000 metric tons per annum."
              borderColor={isActive(9) ? "border-primary" : "border-secondary"}
              hoverBorderColor="hover:border-primary"
              numberColor={isActive(9) ? "text-primary" : "text-secondary hover:text-primary"}
              className="lg:hidden"
              onMouseEnter={() => setHoveredCard(9)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => toggleClicked(9)}
            />
            <LogisticsAdvantageCard
              index={10}
              count={"04"}
              title="Higher Delivery Capacity"
              description="UCR's state-of-the-art facility is Middle East's largest independent copper rod-producing mill with a capacity exceeding 200,000 metric tons per annum."
              borderColor={isActive(10) ? "border-primary" : "border-secondary"}
              hoverBorderColor="hover:border-primary"
              numberColor={isActive(10) ? "text-primary" : "text-secondary hover:text-primary"}
              onMouseEnter={() => setHoveredCard(10)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => toggleClicked(10)}
            />
          </div>
          {/* Third column background container */}
          <div
            className={"hidden lg:block w-full lg:w-1/3 h-[40vh] lg:h-auto lg:h-[80vh] bg-cover bg-bottom bg-no-repeat transition-all duration-500"}
            style={{ backgroundImage: `url('${getBgImageUrl()}')` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
