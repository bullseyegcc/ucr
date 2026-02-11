export default function StatsCard({ mainHeading, subHeading, description }) {
  return (
    <div className="flex flex-col gap-8 px-8 relative mt-10">
      <h1 className="text-primary text-6xl font-semibold z-99 bg-gradient-to-l from-white via-gray-200 to-primary bg-clip-text text-transparent">
        {mainHeading}
      </h1>
      <hr className="border-t border-secondary shadow-2xl" />
      <div>
        <h1 className="font-semibold text-2xl">{subHeading}</h1>
        <p className="text-sm font-light mt-2">{description}</p>
      </div>
    </div>
  );
}
