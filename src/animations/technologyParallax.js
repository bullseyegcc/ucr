import gsap from 'gsap';

/**
 * Premium Technology Parallax Slide Animation
 * Creates sophisticated smooth horizontal slide with depth, scale, and advanced visual enhancements
 */

export const technologyParallaxSlide = (sliderRef, tabIndex, duration = 0.6) => {
  if (!sliderRef?.current) return;

  const translateAmount = -tabIndex * 100;

  gsap.timeline()
    // Main parallax slide with enhanced easing
    .to(
      sliderRef.current,
      {
        xPercent: translateAmount,
        duration: duration,
        ease: 'power2.inOut',
        opacity: 0.9,
        scale: 0.98,
      },
      0
    )
    // Smooth opacity transition in
    .to(
      sliderRef.current,
      {
        opacity: 1,
        duration: duration * 0.6,
        ease: 'sine.inOut',
      },
      duration * 0.3
    )
    // Scale recovery for smooth finish
    .to(
      sliderRef.current,
      {
        scale: 1,
        duration: duration * 0.5,
        ease: 'cubic.out',
      },
      duration * 0.35
    )
    // Subtle rotation for depth perception
    .to(
      sliderRef.current,
      {
        rotationZ: 0,
        duration: duration * 0.4,
        ease: 'sine.inOut',
      },
      duration * 0.3
    );
};
