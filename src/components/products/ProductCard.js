'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '@/animations/FadeIn';

const FONT =
  'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';

const EASE = [0.19, 1, 0.22, 1];
const CARD_HEIGHT_EXPANDED = '32rem';

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

function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return canHover;
}

function DetailsCta({ asLink, href, onNavigate }) {
  const content = (
    <>
      <span className="text-center font-normal text-[0.875rem] leading-[1.2] tracking-[-0.02rem]">
        Details about product
      </span>
      <motion.span variants={arrowMotion} className="inline-flex">
        <ArrowRight size={15} color="#FF6A00" />
      </motion.span>
    </>
  );

  const className =
    'pointer-events-auto mt-[0.875rem] inline-flex h-[2.875rem] w-fit max-w-full items-center justify-center gap-[0.5rem] rounded-full bg-white px-[1.25rem] text-[#2D2F33]';

  if (asLink) {
    return (
      <motion.div variants={ctaMotion} className={className}>
        <Link
          href={href}
          data-product-cta="true"
          onClick={onNavigate}
          className="inline-flex items-center justify-center gap-[0.5rem]"
          style={{ fontFamily: FONT }}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.span variants={ctaMotion} className={className} style={{ fontFamily: FONT }}>
      {content}
    </motion.span>
  );
}

function ProductImage({ product, imageFit, isPriority }) {
  return (
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
  );
}

export default function ProductCard({
  product,
  productIndex,
  isPriority,
  imageFit,
}) {
  const canHover = useCanHover();
  const href = `/products/${product.slug}`;

  // Desktop: original row hover layout
  if (canHover) {
    return (
      <Link href={href} className="block h-[20.5rem]">
        <motion.article
          initial="rest"
          animate="rest"
          whileHover="hover"
          variants={cardMotion}
          className="product-card relative h-full overflow-hidden rounded-[0.75rem] border p-[0.75rem] cursor-pointer transform-gpu backface-hidden"
        >
          <div className="grid h-full grid-cols-[52%_48%] gap-[1rem]">
            <div className="relative h-full min-h-0 overflow-hidden px-[1rem]">
              <motion.div
                variants={titleMotion}
                className="absolute inset-x-[1rem] top-1/2 z-[1] origin-top-left transform-gpu will-change-transform"
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
                  className="mt-[0.75rem] line-clamp-2 min-h-[6rem] font-medium text-[2.375rem] leading-[3rem] tracking-[-0.0875rem]"
                  style={{ fontFamily: FONT }}
                >
                  {product.name}
                </motion.h3>
              </motion.div>

              <motion.div
                variants={revealMotion}
                className="pointer-events-none absolute inset-x-[1rem] bottom-[1rem] z-[2]"
              >
                <motion.p
                  variants={descriptionMotion}
                  className="line-clamp-2 font-normal text-[1rem] leading-[1.625rem] tracking-[-0.01rem]"
                  style={{ fontFamily: FONT }}
                >
                  {product.description}
                </motion.p>
                <DetailsCta asLink={false} href={href} />
              </motion.div>
            </div>

            <div className="relative h-full min-h-0 pt-[0.875rem] pb-[0.875rem] pl-0 pr-[1rem]">
              <ProductImage product={product} imageFit={imageFit} isPriority={isPriority} />
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  // Mobile: column layout — always expanded (active)
  return (
    <motion.div
      className="block overflow-hidden"
      initial={false}
      animate={{ height: CARD_HEIGHT_EXPANDED }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <motion.article
        initial="hover"
        animate="hover"
        variants={cardMotion}
        className="product-card relative flex h-full flex-col overflow-hidden rounded-[0.75rem] border p-[0.75rem] transform-gpu backface-hidden"
      >
        <div className="relative z-[1] flex shrink-0 flex-col px-[0.75rem] pt-2">
          <motion.p
            variants={indexMotion}
            className="font-normal text-[0.75rem] leading-[1rem]"
            style={{ fontFamily: FONT }}
          >
            /{productIndex}
          </motion.p>
          <motion.h3
            variants={headingMotion}
            className="mt-[0.5rem] line-clamp-2 font-medium text-[2.05rem] leading-[2.45rem] tracking-[-0.0875rem]"
            style={{ fontFamily: FONT }}
          >
            {product.name}
          </motion.h3>

          <div className="overflow-hidden">
            <p
              className="mt-3 py-3 line-clamp-3 font-normal text-[0.9375rem] leading-[1.45rem] tracking-[-0.01rem] text-white/90"
              style={{ fontFamily: FONT }}
            >
              {product.description}
            </p>
            <DetailsCta asLink href={href} />
          </div>
        </div>

        <div className="relative mt-6 h-[10.5rem] shrink-0 px-1 pb-1">
          <ProductImage product={product} imageFit={imageFit} isPriority={isPriority} />
        </div>
      </motion.article>
    </motion.div>
  );
}
