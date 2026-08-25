import FadeIn from "@/animations/FadeIn";
import SlideIn from "../../animations/SlideIn";

export default function SuccessStrengthSection() {
  const stats = [
    {
      number: "07",
      label: "Departments dedicated to achieving excellence.",
    },
    {
      number: "08",
      label: "Teams dedicated to achieving excellence.",
    },
    {
      number: "09",
      label: "Types of employee dedicated to achieving excellence.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1600px] px-5 lg:px-10 py-30 flex flex-col justify-center">
      {/* Top Row */}
      <div className="flex w-full flex-col items-center justify-center gap-16 lg:flex-row lg:gap-20">
        {/* Left Side - Orange Circle Stat */}
        <div className="flex flex-col items-center gap-6 lg:items-start lg:basis-1/2">
          <div className="flex items-center gap-10 lg:gap-12">
            {/* Circle with Number */}
            <div className="relative w-[220px] aspect-square shrink-0 rounded-full bg-[#F26101] flex items-center justify-center">
              <span className="text-8xl text-white mt-4">150</span>

              {/* Plus Icon */}
              <div className="absolute top-2 right-2 w-[44px] h-[44px] rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-xl font-bold">+</span>
              </div>
            </div>

            {/* Text Next to Circle */}
            <div className="lg:block hidden">
              <h3 className="text-4xl text-gray-900 mb-2">
                Dedicated employees
              </h3>
              <p className="text-lg text-gray-500 leading-relaxed pr-10 max-w-md text-left">
                Every strand of copper wire products reflects the dedication of
                our skilled engineers and technicians to precision and
                excellence.
              </p>
            </div>
          </div>

          {/* Mobile/Tablet Text */}
          <div className="lg:hidden text-center">
            <h3 className="text-[18px] font-semibold text-gray-900 mb-2">
              Dedicated employees
            </h3>
            <p className="text-[14px] text-gray-500 leading-relaxed">
              Every strand of copper wire products reflects the dedication of
              our skilled engineers and technicians to precision and excellence.
            </p>
          </div>
        </div>

        {/* Center Divider - Hidden on Mobile */}
        <div className="hidden lg:block w-px h-[120px] bg-gray-200"></div>

        {/* Right Side - Heading Block */}
        <div className="flex flex-col items-start justify-center lg:basis-1/2">
          <span className=" text-sm lg:text-xl uppercase tracking-[2px] font-medium text-[#F26101] mb-4">
            THE STRENGTH BEHIND OUR SUCCESS
          </span>
          <h2 className="max-w-[520px] text-4xl font-medium leading-[1.2] text-gray-900 lg:text-left lg:text-6xl">
            Built by people who build with pride
          </h2>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-16 flex justify-center pt-10">
        <div className="flex w-full flex-col items-start justify-between gap-10 lg:flex-row lg:gap-4">
          {stats.map((stat, index) => (
            <FadeIn
              key={index}
              direction="left"
              duration={0.8}
              scrollTrigger={true}
              className="flex-1"
            >
              <div className="flex gap-4 border-t border-gray-200 pt-10">
                <p className="text-4xl  text-gray-400 font-medium mb-3">
                  {stat.number}
                </p>
                <p className="text-xl lg:text-2xl font-medium leading-tight px-5">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
