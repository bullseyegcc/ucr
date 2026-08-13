import StatsCard from "../../common/StatsCard";

export default function AboutStats() {
  return (
    <div className="overflow-hidden w-full shrink-0 bg-[#F4F4F2]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 px-[1rem] lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem] pt-[1.25rem] pb-[1rem] lg:pt-[2rem] lg:pb-[1.25rem] gap-[0.75rem] lg:gap-[1.25rem]">
        <div className="stat-card-item w-full min-w-0">
          <StatsCard
            displayValue="17"
            showPlus
            subHeading="Years of Excellence Experience"
            description="Delivering trusted copper solutions since 2008."
            index={0}
          />
        </div>
        <div className="stat-card-item w-full min-w-0">
          <StatsCard
            displayValue="200K"
            showPlus
            subHeading="MT/Annual Capacity"
            description="State-of-the-art production facilities ensure consistent high-volume output."
            index={1}
          />
        </div>
        <div className="stat-card-item w-full min-w-0">
          <StatsCard
            displayValue="250"
            showPlus
            subHeading="Skilled Employees"
            description="A dedicated team of experts committed to quality and innovation."
            index={2}
          />
        </div>
        <div className="stat-card-item w-full min-w-0">
          <StatsCard
            displayValue="50"
            showPlus
            subHeading="Global Reach"
            description="Serving customers across more than 50 countries worldwide."
            index={3}
          />
        </div>
      </div>
    </div>
  );
}
