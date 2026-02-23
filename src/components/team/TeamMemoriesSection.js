'use client'


import Image from "next/image";
import { Badge } from "../../common/badge";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function TeamMemoriesSection() {
  // Example gallery data (replace with your real images and captions)
  const galleryItems = [
    { image: "/t1.png", year: "2023", caption: "Team collaboration" },
    { image: "/t2.png", year: "2024", caption: "New year celebration" },
    { image: "/t3.png", year: "2022", caption: "Annual Picnic" },
    { image: "/t4.jpg", year: "2021", caption: "Team moments" },
    { image: "/t5.jpg", year: "2020", caption: "Team building" },
  ];

  const [activeIdx, setActiveIdx] = useState(1); // Start with the second card as active (center)

  // Helper to get the correct indices for left, center, right, far left, far right (circular)
  const getIndices = () => {
    const len = galleryItems.length;
    const centerIdx = activeIdx;
    const leftIdx = (centerIdx - 1 + len) % len;
    const rightIdx = (centerIdx + 1) % len;
    const farLeftIdx = (centerIdx - 2 + len) % len;
    const farRightIdx = (centerIdx + 2) % len;
    return [farLeftIdx, leftIdx, centerIdx, rightIdx, farRightIdx];
  };

  return (
    <section className="w-screen bg-[#f5f5f3] py-[120px] ">
      <div className="Flex flex-col text-center items-center justify-center gap-6 mb-16 ">
        {/* Header */}
        <div className="flex flex-col items-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4"
          >
            <span className="uppercase text-[13px] tracking-[0.22em] text-[#ff6a00] font-semibold">gallery</span>
          </motion.div>
          <motion.h2
            className="text-[56px] md:text-[64px] font-medium text-gray-900 leading-tight flex gap-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 }
              }
            }}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-sans font-medium text-gray-900"
            >Team</motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 } }
              }}
              className="font-serif italic text-[#222] font-normal tracking-tight"
            >Memories</motion.span>
          </motion.h2>
        </div>

        {/* Gallery Grid */}
        <div className="w-screen relative h-[50vh] flex justify-center items-center select-none">
          {/* Side gradients for depth */}
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none" />
          {(() => {
            const [farLeftIdx, leftIdx, centerIdx, rightIdx, farRightIdx] = getIndices();
            return <>
              {/* Mobile: Stack center card only */}
              <div className="block lg:hidden w-full flex justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[90vw] h-[60vw] max-w-[400px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center border border-orange-400 z-2"
                >
                  <motion.div className="w-full h-[72%] relative">
                    <motion.div className="absolute inset-0" initial={{ scale: 1.05 }} whileHover={{ scale: 1.12 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                      <Image src={galleryItems[centerIdx].image} alt={galleryItems[centerIdx].caption} fill className="object-cover rounded-t-lg" />
                    </motion.div>
                  </motion.div>
                  <div className="w-full px-8 py-6 border-t border-orange-400 text-center">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#ff6a00] font-semibold mb-1">{galleryItems[centerIdx].year}</div>
                    <div className="text-xl font-medium text-gray-900 leading-tight">{galleryItems[centerIdx].caption}</div>
                  </div>
                </motion.div>
              </div>

              {/* Tablet: Show left, center, right cards */}
              <div className="hidden md:flex lg:hidden w-full justify-center items-center relative h-[60vw]">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[28vw] h-[50vw] max-w-[260px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center cursor-pointer border border-transparent z-1 scale-[0.93] opacity-90 absolute left-[10%] top-1/2 -translate-y-1/2"
                  onClick={() => setActiveIdx(leftIdx)}
                >
                  <motion.div className="w-full h-[70%] relative">
                    <motion.div className="absolute inset-0" initial={{ scale: 1.05 }} whileHover={{ scale: 1.12 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                      <Image src={galleryItems[leftIdx].image} alt={galleryItems[leftIdx].caption} fill className="object-cover rounded-t-lg" />
                    </motion.div>
                  </motion.div>
                  <div className="w-full px-5 py-3 border-t border-orange-200 text-center">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#ff6a00] font-semibold mb-1">{galleryItems[leftIdx].year}</div>
                    <div className="text-base font-medium text-gray-900 leading-tight">{galleryItems[leftIdx].caption}</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[32vw] h-[60vw] max-w-[320px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center border border-orange-400 z-2 scale-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ zIndex: 2 }}
                >
                  <motion.div className="w-full h-[72%] relative">
                    <motion.div className="absolute inset-0" initial={{ scale: 1.05 }} whileHover={{ scale: 1.12 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                      <Image src={galleryItems[centerIdx].image} alt={galleryItems[centerIdx].caption} fill className="object-cover rounded-t-lg" />
                    </motion.div>
                  </motion.div>
                  <div className="w-full px-8 py-6 border-t border-orange-400 text-center">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#ff6a00] font-semibold mb-1">{galleryItems[centerIdx].year}</div>
                    <div className="text-xl font-medium text-gray-900 leading-tight">{galleryItems[centerIdx].caption}</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[28vw] h-[50vw] max-w-[260px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center cursor-pointer border border-transparent z-1 scale-[0.93] opacity-90 absolute right-[10%] top-1/2 -translate-y-1/2"
                  onClick={() => setActiveIdx(rightIdx)}
                >
                  <motion.div className="w-full h-[70%] relative">
                    <motion.div className="absolute inset-0" initial={{ scale: 1.05 }} whileHover={{ scale: 1.12 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                      <Image src={galleryItems[rightIdx].image} alt={galleryItems[rightIdx].caption} fill className="object-cover rounded-t-lg" />
                    </motion.div>
                  </motion.div>
                  <div className="w-full px-5 py-3 border-t border-orange-200 text-center">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#ff6a00] font-semibold mb-1">{galleryItems[rightIdx].year}</div>
                    <div className="text-base font-medium text-gray-900 leading-tight">{galleryItems[rightIdx].caption}</div>
                  </div>
                </motion.div>
              </div>

              {/* Desktop: 5-card layout */}
              <div className="hidden lg:block w-full h-full">
                {/* ...existing code for desktop cards... */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[8%] top-1/2 -translate-y-1/2 w-[18vw] h-[55vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center cursor-pointer border border-transparent z-0 scale-[0.85] opacity-80"
                  onClick={() => setActiveIdx(farLeftIdx)}
                >
                  <motion.div className="w-full h-[70%] relative">
                    <motion.div className="absolute inset-0" initial={{ scale: 1.05 }} whileHover={{ scale: 1.12 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                      <Image src={galleryItems[farLeftIdx].image} alt={galleryItems[farLeftIdx].caption} fill className="object-cover rounded-t-lg" />
                    </motion.div>
                  </motion.div>
                  <div className="w-full px-4 py-2 border-t border-orange-200 text-center">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#ff6a00] font-semibold mb-1">{galleryItems[farLeftIdx].year}</div>
                    <div className="text-sm font-medium text-gray-900 leading-tight">{galleryItems[farLeftIdx].caption}</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[22%] top-1/2 -translate-y-1/2 w-[22vw] h-[60vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center cursor-pointer border border-transparent z-1 scale-[0.93] opacity-90"
                  onClick={() => setActiveIdx(leftIdx)}
                >
                  <motion.div className="w-full h-[70%] relative">
                    <motion.div className="absolute inset-0" initial={{ scale: 1.05 }} whileHover={{ scale: 1.12 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                      <Image src={galleryItems[leftIdx].image} alt={galleryItems[leftIdx].caption} fill className="object-cover rounded-t-lg" />
                    </motion.div>
                  </motion.div>
                  <div className="w-full px-5 py-3 border-t border-orange-200 text-center">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#ff6a00] font-semibold mb-1">{galleryItems[leftIdx].year}</div>
                    <div className="text-base font-medium text-gray-900 leading-tight">{galleryItems[leftIdx].caption}</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28vw] h-[70vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center border border-orange-400 z-2 scale-100"
                  style={{ zIndex: 2 }}
                >
                  <motion.div className="w-full h-[72%] relative">
                    <motion.div className="absolute inset-0" initial={{ scale: 1.05 }} whileHover={{ scale: 1.12 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                      <Image src={galleryItems[centerIdx].image} alt={galleryItems[centerIdx].caption} fill className="object-cover rounded-t-lg" />
                    </motion.div>
                  </motion.div>
                  <div className="w-full px-8 py-6 border-t border-orange-400 text-center">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#ff6a00] font-semibold mb-1">{galleryItems[centerIdx].year}</div>
                    <div className="text-xl font-medium text-gray-900 leading-tight">{galleryItems[centerIdx].caption}</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[62%] top-1/2 -translate-y-1/2 w-[22vw] h-[60vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center cursor-pointer border border-transparent z-1 scale-[0.93] opacity-90"
                  onClick={() => setActiveIdx(rightIdx)}
                >
                  <motion.div className="w-full h-[70%] relative">
                    <motion.div className="absolute inset-0" initial={{ scale: 1.05 }} whileHover={{ scale: 1.12 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                      <Image src={galleryItems[rightIdx].image} alt={galleryItems[rightIdx].caption} fill className="object-cover rounded-t-lg" />
                    </motion.div>
                  </motion.div>
                  <div className="w-full px-5 py-3 border-t border-orange-200 text-center">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#ff6a00] font-semibold mb-1">{galleryItems[rightIdx].year}</div>
                    <div className="text-base font-medium text-gray-900 leading-tight">{galleryItems[rightIdx].caption}</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[78%] top-1/2 -translate-y-1/2 w-[18vw] h-[55vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center cursor-pointer border border-transparent z-0 scale-[0.85] opacity-80"
                  onClick={() => setActiveIdx(farRightIdx)}
                >
                  <motion.div className="w-full h-[70%] relative">
                    <motion.div className="absolute inset-0" initial={{ scale: 1.05 }} whileHover={{ scale: 1.12 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                      <Image src={galleryItems[farRightIdx].image} alt={galleryItems[farRightIdx].caption} fill className="object-cover rounded-t-lg" />
                    </motion.div>
                  </motion.div>
                  <div className="w-full px-4 py-2 border-t border-orange-200 text-center">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#ff6a00] font-semibold mb-1">{galleryItems[farRightIdx].year}</div>
                    <div className="text-sm font-medium text-gray-900 leading-tight">{galleryItems[farRightIdx].caption}</div>
                  </div>
                </motion.div>
              </div>
            </>;
          })()}
        </div>
      </div>
    </section>
  );
}
