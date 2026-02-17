import gsap from 'gsap';

/**
 * Premium Parallax Slide Animation
 * Creates sophisticated smooth horizontal slide with depth, scale, and advanced visual enhancements
 */

export const parallaxSlideAnimation = (sliderRef, tabIndex, duration = 0.6, itemsCount = 3) => {
  if (!sliderRef?.current) return;

  const translateAmount = -tabIndex * (100 / itemsCount);

  // Create a premium parallax animation with multiple sophisticated layers
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

/**
 * Initialize parallax background
 * Sets up the initial background position and state
 */
export const initParallaxBackground = (backgroundRef) => {
  if (!backgroundRef?.current) return;

  gsap.set(backgroundRef.current, {
    backgroundPosition: '0% center',
    scale: 1,
    opacity: 1,
    rotationZ: 0,
  });
};
