'use client';

import CountUp from '../animations/countup';


export default function StatsCard({ mainHeading, subHeading, description }) {
  return (
    <div className="flex flex-col gap-8 px-2 md:px-8 relative mt-10 group cursor-pointer transition-all duration-400 ease-out hover:scale-105">
      <h1 className="text-primary text-6xl font-semibold z-99 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent transition-transform duration-500 ease-out group-hover:rotate-3">
        <CountUp
          from={0}
          to={mainHeading}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
          startCounting={false}
        />

      </h1>
      <hr className="border-t border-secondary shadow-2xl transition-all duration-400 ease-out group-hover:shadow-2xl group-hover:border-primary" />
      <div className="transition-transform duration-400 ease-out group-hover:translate-x-1">
        <h1 className="font-semibold text-lg sm:text-2xl">{subHeading}</h1>
        <p className="text-xs md:text-sm font-light mt-2">{description}</p>
      </div>
    </div>
  );
}
