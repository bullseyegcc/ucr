'use client'

import Image from "next/image"
import { Badge } from "../common/badge"
import CircularGallery from "./CircularGallery"

export default function TeamMemoriesSection() {
  const galleryItems = [
    { image: "/t1.png", text: "Team collaboration" },
    { image: "/t2.png", text: "2024 celebration" },
    { image: "/t3.png", text: "Team moments" },
    { image: "/t4.jpg", text: "Annual Picnic" },
    { image: "/t5.jpg", text: "Team building" },
  ];

  return (
    <section className="w-full mx-auto px-6 py-20">
      <header className="flex flex-col items-center mb-14">
        <Badge title="Gallery" />

        <h2 className="text-[40px] font-semibold text-gray-900">
          <span className="font-semibold">Team</span>{" "}
          <span className="font-serif italic font-medium text-gray-700">Memories</span>
        </h2>
      </header>

      {/* Circular Gallery */}
      <div className="mt-12 w-full h-[600px] relative">
        <CircularGallery 
          items={galleryItems}
          className='text-primary'
          bend={3} 
          textColor="text-primary" 
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
    </section>
  )
}
