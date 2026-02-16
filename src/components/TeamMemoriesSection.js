import Image from "next/image"
import { Badge } from "../common/badge"

export default function TeamMemoriesSection() {
  return (
    <section className="w-full mx-auto px-6 py-20">
      <header className="flex flex-col items-center mb-14">
        <Badge title="Gallery" />

        <h2 className="text-[40px] font-semibold text-gray-900">
          <span className="font-semibold">Team</span>{" "}
          <span className="font-serif italic font-medium text-gray-700">Memories</span>
        </h2>
      </header>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {/* Left card */}
        <article className="rounded-xl overflow-hidden relative bg-white md:order-2 lg:order-none">
          <Image
            src="/t1.png"
            alt="Team 1"
            width={600}
            height={800}
            className="w-full h-[320px] md:h-[420px] object-cover rounded-xl"
          />
        </article>

        {/* Center featured card */}
        <article className="rounded-xl overflow-hidden relative bg-white border border-[#F26101] shadow-sm md:order-1 lg:order-none">
          <Image
            src="/t2.png"
            alt="Team 2"
            width={600}
            height={800}
            className="w-full h-[320px] md:h-[420px] object-cover rounded-xl"
          />

          <div className="text-center py-6 px-6 bg-white">
            <p className="text-[12px] text-[#F26101] mb-2">2024</p>
            <h3 className="text-[20px] font-medium text-gray-900">New year celebration</h3>
          </div>
        </article>

        {/* Right card */}
        <article className="rounded-xl overflow-hidden relative bg-white md:order-3 lg:order-none">
          <Image
            src="/t3.png"
            alt="Team 3"
            width={600}
            height={800}
            className="w-full h-[320px] md:h-[420px] object-cover rounded-xl"
          />
        </article>
      </div>
    </section>
  )
}
