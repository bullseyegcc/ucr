"use client";

import Image from "next/image";
import { Badge, Badgetextwhite, WhiteBadge } from "@/common/badge";
import { VideoPlayer } from "@/common/video";
import FadeIn from "@/animations/FadeIn";
import SlideIn from "@/animations/SlideIn";

const TITLE = {
  default:
    "font-medium text-[2rem] leading-[2.5rem] tracking-[-0.07375rem] sm:text-[4rem] sm:leading-[5rem] sm:tracking-[-0.15625rem] text-center align-middle capitalize text-white",
  blogs:
    "font-medium text-[2rem] leading-[2.5rem] tracking-[-0.17125rem] sm:text-[4rem] sm:leading-[5rem] sm:tracking-[-0.15625rem] text-center align-middle capitalize text-white",
  "parent-company":
    "font-medium text-[2rem] leading-[2.5rem] tracking-[-0.17125rem] sm:text-[4rem] sm:leading-[5rem] sm:tracking-[-0.15625rem] text-center align-middle capitalize text-white",
};

function HeroBadgeContent({ badge, variant, useWhiteBadgeIcon }) {
  if (useWhiteBadgeIcon) return <WhiteBadge title={badge} />;
  if (variant === "primary") return <Badge title={badge} />;
  return <Badgetextwhite title={badge} />;
}

const OVERLAP_MEDIA =
  "absolute left-1/2 -translate-x-1/2 -bottom-[40%] lg:-bottom-[60%] z-20 w-[95%] lg:w-[90%] h-[50vh] lg:h-[70vh] overflow-hidden rounded-xl";

const GRADIENT_OVERLAY =
  "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)";

/** Blog hero entrance: badge slides up, title fades in, overlap media slides up */
const ENTRANCE = {
  badge: { direction: "bottom", duration: 0.8, delay: 0 },
  title: { duration: 0.4, delay: 0 },
  media: { direction: "bottom", duration: 0.8, delay: 0.2 },
};

function titleClass(variant, extra = "") {
  return `${TITLE[variant] || TITLE.default} ${extra}`.trim();
}

function isPrimaryHeroBackground(background, solidClassName) {
  if (background?.type !== "solid") return false;
  if (background.src === "primary" || background.src == null) return true;
  return (solidClassName || "bg-primary").includes("bg-primary");
}

function resolveBadgeVariant(background, badgeVariant, solidClassName) {
  return isPrimaryHeroBackground(background, solidClassName) ? "white" : badgeVariant;
}

function HeroBackgroundLayer({ background }) {
  if (!background) return null;

  const { type, src, overlay, overlayClassName, style, imageClassName = "" } = background;

  if (type === "video") {
    return (
      <>
        <VideoPlayer
          src={src}
          priority={background.priority}
          className={`absolute inset-0 z-0 w-full h-full object-cover ${imageClassName}`}
        />
        {overlayClassName ? (
          <div className={`absolute inset-0 z-10 pointer-events-none ${overlayClassName}`} aria-hidden />
        ) : overlay === "gradient-20" ? (
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: GRADIENT_OVERLAY }} aria-hidden />
        ) : overlay ? (
          <div className={`absolute inset-0 z-10 pointer-events-none ${overlay}`} aria-hidden />
        ) : null}
      </>
    );
  }

  if (type === "image-inline") {
    return <div className="absolute inset-0 z-0" style={style} aria-hidden />;
  }

  if (type === "image") {
    return (
      <div
        className={`absolute inset-0 z-0 bg-cover bg-no-repeat ${imageClassName}`}
        style={{ backgroundImage: `url('${src}')`, ...style }}
        aria-hidden
      />
    );
  }

  if (type === "gradient") {
    return (
      <>
        <div className={`absolute inset-0 z-0 bg-gradient-to-r ${src}`} aria-hidden />
        {background.imageSrc ? (
          <div
            className="absolute inset-0 z-10 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: `url('${background.imageSrc}')` }}
            aria-hidden
          />
        ) : null}
      </>
    );
  }

  return null;
}

function HeroOverlapMedia({ media }) {
  if (!media || (media.layout || "overlap") !== "overlap") return null;

  const {
    type,
    src,
    alt = "",
    className = "",
    videoClassName = "w-full h-full object-cover rounded-xl",
    imageClassName = "object-cover",
    priority = false,
    sizes = "(max-width: 1024px) 95vw, 90vw",
    quality = 90,
  } = media;

  const containerClass = className || OVERLAP_MEDIA;

  const content =
    type === "video" ? (
      <VideoPlayer src={src} className={videoClassName} />
    ) : (
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName}
        priority={priority}
        sizes={sizes}
        quality={quality}
      />
    );

  return (
    <div className={containerClass}>
      <SlideIn
        direction={ENTRANCE.media.direction}
        duration={ENTRANCE.media.duration}
        delay={ENTRANCE.media.delay}
        className="relative w-full h-full"
      >
        {content}
      </SlideIn>
    </div>
  );
}

function HeroBadge({ badge, badgeVariant, badgeSlideClassName, badgeAnimation, useWhiteBadgeIcon }) {
  return (
    <SlideIn
      direction={badgeAnimation.direction}
      duration={badgeAnimation.duration}
      delay={badgeAnimation.delay}
      className={badgeSlideClassName}
    >
      <HeroBadgeContent badge={badge} variant={badgeVariant} useWhiteBadgeIcon={useWhiteBadgeIcon} />
    </SlideIn>
  );
}

function HeroTitle({
  title,
  titleClassName,
  titleVariant,
  titleAnimation,
  titleSlideProps,
  fadeDuration,
  fadeDelay,
  titleInH1,
  titleDirectFade,
}) {
  const styles = titleClass(titleVariant, titleClassName);

  if (titleAnimation === "slide") {
    return (
      <SlideIn direction={titleSlideProps.direction} duration={titleSlideProps.duration} delay={titleSlideProps.delay}>
        {titleInH1 ? <h1 className={styles}>{title}</h1> : <span className={styles}>{title}</span>}
      </SlideIn>
    );
  }

  if (titleDirectFade) {
    return (
      <FadeIn className={styles} duration={fadeDuration} delay={fadeDelay}>
        {title}
      </FadeIn>
    );
  }

  if (titleInH1) {
    return (
      <h1 className={styles}>
        <FadeIn duration={fadeDuration} delay={fadeDelay}>
          {title}
        </FadeIn>
      </h1>
    );
  }

  return (
    <FadeIn className={styles} duration={fadeDuration} delay={fadeDelay}>
      {title}
    </FadeIn>
  );
}

export default function Hero({
  badge,
  title,
  badgeVariant = "white",
  background = { type: "solid", src: "primary" },
  media,
  variant = "default",
  titleVariant = "default",
  titleClassName = "",
  titleAnimation = "fade",
  badgeAnimation = ENTRANCE.badge,
  titleSlideProps = ENTRANCE.badge,
  fadeDuration = ENTRANCE.title.duration,
  fadeDelay = ENTRANCE.title.delay,
  className = "",
  contentClassName = "",
  // Use h-[min(vh,px)] (not min-h alone) so max-height can actually cap tall viewports
  minHeightClass = "h-[min(60vh,720px)] lg:h-[min(80vh,900px)]",
  maxHeightClass = "max-h-[900px]",
  children,
  badgeSlideClassName = "",
  contentLayout = "centered",
  contentPositionClass = "",
  gapClass = "gap-[1.5rem]",
  titleInH1 = false,
  titleDirectFade = true,
  badgeInTitle = false,
  titleWrapperClass = "",
  solidClassName = "",
  animateBadge = true,
}) {
  if (variant === "product-detail") {
    return (
      <div
        className={`relative h-[40vh] sm:h-[50vh] lg:h-[55vh] max-h-[80vh] font-medium flex items-center justify-center dark:bg-black overflow-hidden ${className}`}
      >
        <HeroBackgroundLayer
          background={{
            type: "gradient",
            src: "from-[#FF6A00] to-[#FF8C42]",
            imageSrc: "/products/productdetailbg.png",
          }}
        />
        <h1
          className={`absolute top-[40%] w-[85%] sm:w-[70%] lg:w-[60%] z-20 flex flex-col items-center text-center align-middle capitalize gap-[0.5rem] sm:gap-[0.75rem] lg:gap-[1rem] px-4 sm:px-0 ${TITLE.default}`}
        >
          <SlideIn direction={ENTRANCE.badge.direction} duration={ENTRANCE.badge.duration} delay={ENTRANCE.badge.delay}>
            <WhiteBadge title={badge} />
          </SlideIn>
          <FadeIn duration={ENTRANCE.title.duration} delay={ENTRANCE.title.delay}>{title}</FadeIn>
        </h1>
      </div>
    );
  }

  const hasOverlapMedia = media && (media.layout || "overlap") === "overlap";
  const isSolid = background.type === "solid";
  const useWhiteBadgeIcon = isPrimaryHeroBackground(background, solidClassName);
  const resolvedBadgeVariant = resolveBadgeVariant(background, badgeVariant, solidClassName);

  const sectionClass = [
    "relative",
    hasOverlapMedia ? "overflow-visible" : "overflow-hidden",
    contentLayout === "absolute" ? "" : "flex flex-col items-center justify-center text-center",
    minHeightClass,
    maxHeightClass,
    solidClassName || "bg-primary",
    !isSolid && background.type === "image" ? "bg-black" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textContent = (
    <>
      {animateBadge && !badgeInTitle ? (
        <HeroBadge
          badge={badge}
          badgeVariant={resolvedBadgeVariant}
          badgeSlideClassName={badgeSlideClassName}
          badgeAnimation={badgeAnimation}
          useWhiteBadgeIcon={useWhiteBadgeIcon}
        />
      ) : null}

      {badgeInTitle ? (
        <h1 className={titleClass(titleVariant, titleWrapperClass)}>
          <SlideIn direction={badgeAnimation.direction} duration={badgeAnimation.duration} delay={badgeAnimation.delay}>
            <HeroBadgeContent badge={badge} variant={resolvedBadgeVariant} useWhiteBadgeIcon={useWhiteBadgeIcon} />
          </SlideIn>
          <FadeIn duration={fadeDuration} delay={fadeDelay}>
            {title}
          </FadeIn>
        </h1>
      ) : (
        <HeroTitle
          title={title}
          titleClassName={titleClassName}
          titleVariant={titleVariant}
          titleAnimation={titleAnimation}
          titleSlideProps={titleSlideProps}
          fadeDuration={fadeDuration}
          fadeDelay={fadeDelay}
          titleInH1={titleInH1}
          titleDirectFade={titleDirectFade}
        />
      )}
    </>
  );

  const contentWrapperClass =
    contentLayout === "absolute"
      ? `flex flex-col items-center ${gapClass} ${contentPositionClass} ${contentClassName}`
      : `relative z-10 flex flex-col items-center justify-center text-center ${gapClass} ${contentClassName}`;

  return (
    <div className={sectionClass}>
      {!isSolid ? <HeroBackgroundLayer background={background} /> : null}
      <div className={contentWrapperClass}>{textContent}</div>
      {children}
      <HeroOverlapMedia media={media} />
    </div>
  );
}

