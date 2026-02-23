import Image from "next/image"
import { Badge } from "../../common/badge"
import SlideIn from "../../animations/SlideIn"
import FadeIn from "../../animations/FadeIn"
import CardAnimation from "../../animations/CardAnimation"

export default function UcrLaboratoryToolsSection() {
  const cards = [
    { title: "Oxygen Analyzers", src: "/tool.jpg", alt: "Oxygen Analyzers" },
    { title: "Thermo ARL Optical Emission Spectrometer", src: "/tool-2.png", alt: "Thermo ARL Optical Emission Spectrometer" },
    { title: "Metallurgical Microscope", src: "/tool-3.png", alt: "Metallurgical Microscope" }
  ]

  return (
    <section className="w-full   px-5 lg:px-10 py-20">
      <div className="flex flex-col gap-5 items-center text-center mb-14">
        <SlideIn direction="bottom" scrollTrigger={true} duration={0.8}>
          <Badge title="UCR Laboratory" />
        </SlideIn>

        <FadeIn className="text-3xl lg:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight lg:max-w-[80%]" scrollTrigger={true} duration={0.8}>
          <h2>Tools that have assisted UCR in upholding its exceptional international standards.</h2>
        </FadeIn>

        <div className="mt-4" />
      </div>

      <div className="mt-16 grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <CardAnimation key={card.title} index={index}>
            <article className="relative text-center h-[35vh] sm:h-[60vh] lg:h-[70vh] group relative overflow-hidden rounded-xl bg-white shadow-sm transition duration-300">
              <Image
                src={card.src}
                alt={card.alt}
                width={1200}
                height={800}
                className="w-full  object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <Image src='/labgrad.png' alt='Gradient Overlay' width={1200} height={800} className="absolute right-0 inset-0 h-full opacity-90" />

              <div className="w-full absolute bottom-0 left-0 right-0 p-6 ">
                <h3 className=" text-white text-center text-lg lg:text-3xl font-medium leading-snug ">{card.title}</h3>
              </div>
            </article>
          </CardAnimation>
        ))}
      </div>
    </section>
  )
}
