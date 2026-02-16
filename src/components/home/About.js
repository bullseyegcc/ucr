import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import { Badge } from "../../common/badge.js";
import StatsCard from "../StatsCard.js";

export default function About() {
  return (
    <>
      <div className="overflow-x-hidden pb-16 relative h-auto md:min-h-[55vh] flex flex-col md:flex-row px-6 md:px-10 pt-12 md:pt-20 gap-6 md:gap-6">
        {/* left */}
        <div className="w-full md:w-[80%] flex flex-col gap-8 md:gap-10">
          <Badge title="About Us" />

          <h1 className="text-primary text-2xl md:text-5xl leading-snug md:leading-tight">Our UAE factory combines Advanced technology with global <span className="text-secondary">experties to produce hight-quality copper product that meet international standards</span></h1>

          <button className="bg-primary w-44 md:w-60 px-5 md:px-8 py-3 text-white md:text-xl flex justify-between items-center gap-3 rounded-full">Know more <ArrowRight size={24} color='white' /></button>
        </div>
         {/* right */}
        <div className=" absolute -bottom-0 md:relative -right-16 md:block w-[80%] md:w-[50%]">
          <Image src="/aboutside.png" alt="Factory Image" width={900} height={800} className="w-full object-contain" />
        </div>
      </div>


        {/* cards row */}

      <div className="grid grid-cols-2 md:grid-cols-4 px-2  md:px-10 py-12 md:py-2 md:pb-10 gap-4 md:gap-6">
        <StatsCard
          mainHeading="2009"
          subHeading="Established In"
          description="Since then, our excellence has made us a trusted name in copper manufacturing."
        />
        <StatsCard
          mainHeading="20K+"
          subHeading="MT/Annum"
          description="Produces 20,000 metric tons of copper per year."
        />
        <StatsCard
          mainHeading="150+"
          subHeading="Employees"
          description="With over 150 experienced employees, we deliver quality and reliability every day."
        />
        <StatsCard
          mainHeading="50+"
          subHeading="Global sales"
          description="With a presence in 50+ countries, we serve clients on every continent."
        />
      </div>
    </>
  );
}
