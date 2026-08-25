'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '@/animations/FadeIn';

const FONT =
  'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';

const EASE = [0.19, 1, 0.22, 1];

const cardMotion = {
  rest: {
    y: 0,
    backgroundColor: '#FCFCFC',
    borderColor: '#EBEBEB',
    boxShadow: '0 0 0 rgba(0,0,0,0)',
    transition: { duration: 1.05, ease: EASE },
  },
  hover: {
    y: -5,
    backgroundColor: '#FF6A00',
    borderColor: '#FF6A00',
    boxShadow: '0 1rem 2.75rem rgba(0,0,0,0.12)',
    transition: { duration: 1.05, ease: EASE },
  },
};

const titleMotion = {
  rest: {
    y: '-50%',
    scale: 1,
    transition: { duration: 1.05, ease: EASE },
  },
  hover: {
    y: '-108%',
    scale: 0.84,
    transition: { duration: 1.05, ease: EASE },
  },
};

const revealMotion = {
  rest: {
    opacity: 0,
    y: 14,
    transition: { duration: 0.75, ease: EASE },
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: EASE, delay: 0.14 },
  },
};

const imageMotion = {
  rest: {
    scale: 1,
    transition: { duration: 1.15, ease: EASE },
  },
  hover: {
    scale: 1.045,
    transition: { duration: 1.15, ease: EASE },
  },
};

const indexMotion = {
  rest: { color: 'rgba(139, 139, 139, 1)', transition: { duration: 0.9, ease: EASE } },
  hover: { color: 'rgba(255, 255, 255, 0.95)', transition: { duration: 0.9, ease: EASE } },
};

const headingMotion = {
  rest: { color: '#4B4B4B', transition: { duration: 0.9, ease: EASE } },
  hover: { color: '#FFFFFF', transition: { duration: 0.9, ease: EASE } },
};

const descriptionMotion = {
  rest: { color: '#6F6F6F', transition: { duration: 0.9, ease: EASE } },
  hover: { color: 'rgba(255, 255, 255, 0.9)', transition: { duration: 0.9, ease: EASE, delay: 0.08 } },
};

const ctaMotion = {
  rest: { backgroundColor: '#FFFFFF', transition: { duration: 0.9, ease: EASE } },
  hover: { backgroundColor: '#FFF6F0', transition: { duration: 0.9, ease: EASE, delay: 0.12 } },
};

const arrowMotion = {
  rest: { x: 0, transition: { duration: 0.9, ease: EASE } },
  hover: { x: 3, transition: { duration: 0.9, ease: EASE, delay: 0.16 } },
};

export default function ProductCard({ product, productIndex, isPriority, imageFit }) {
  return (
    <Link href={`/products/${product.slug}`} className="block h-[20.5rem]">
      <motion.article
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={cardMotion}
        className="product-card relative h-full overflow-hidden rounded-[0.75rem] border p-[0.75rem] cursor-pointer transform-gpu backface-hidden"
      >
        <div className="grid h-full grid-cols-1 lg:grid-cols-[52%_48%] gap-[0.75rem] lg:gap-[1rem]">
          <div className="relative h-full min-h-0 overflow-hidden px-[0.75rem] lg:px-[1rem]">
            <motion.div
              variants={titleMotion}
              className="absolute inset-x-[0.75rem] top-1/2 z-[1] origin-top-left transform-gpu will-change-transform lg:inset-x-[1rem]"
            >
              <motion.p
                variants={indexMotion}
                className="font-normal text-[0.75rem] leading-[1rem]"
                style={{ fontFamily: FONT }}
              >
                /{productIndex}
              </motion.p>

              <motion.h3
                variants={headingMotion}
                className="mt-[0.75rem] line-clamp-2 min-h-[5rem] font-medium text-[2rem] leading-[2.5rem] tracking-[-0.0875rem] lg:min-h-[6rem] lg:text-[2.375rem] lg:leading-[3rem]"
                style={{ fontFamily: FONT }}
              >
                {product.name}
              </motion.h3>
            </motion.div>

            <motion.div
              variants={revealMotion}
              className="pointer-events-none absolute inset-x-[0.75rem] bottom-[0.75rem] z-[2] lg:inset-x-[1rem] lg:bottom-[1rem]"
            >
              <motion.p
                variants={descriptionMotion}
                className="line-clamp-2 font-normal text-[1rem] leading-[1.625rem] tracking-[-0.01rem]"
                style={{ fontFamily: FONT }}
              >
                {product.description}
              </motion.p>

              <motion.span
                variants={ctaMotion}
                className="pointer-events-auto mt-[0.875rem] inline-flex h-[2.875rem] w-full max-w-[14.5rem] items-center justify-center gap-[0.375rem] rounded-[3.125rem] border border-white px-[1rem] text-[#2D2F33]"
                style={{ fontFamily: FONT }}
              >
                <span className="text-center font-normal text-[0.875rem] leading-[1.2] tracking-[-0.02rem]">
                  Details about product
                </span>
                <motion.span variants={arrowMotion} className="inline-flex">
                  <ArrowRight size={15} color="#FF6A00" />
                </motion.span>
              </motion.span>
            </motion.div>
          </div>

          <div className="relative h-full min-h-0 pt-[0.875rem] pb-[0.875rem] pl-0 pr-[1rem]">
            <div className="relative h-full w-full overflow-hidden rounded-[0.5rem] bg-white transform-gpu">
              <FadeIn scrollTrigger={true} duration={1.2} className="relative h-full w-full">
                <motion.div variants={imageMotion} className="relative h-full w-full transform-gpu will-change-transform">
                  <Image
                    src={product.icon || '/products/drawnwire.png'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 420px"
                    className={imageFit}
                    quality={75}
                    priority={isPriority}
                    loading={isPriority ? undefined : 'lazy'}
                    decoding="async"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNGY0Ii8+PC9zdmc+"
                  />
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
