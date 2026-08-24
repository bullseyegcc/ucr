import gsap from 'gsap';

/**
 * Smooth horizontal slide for the technology image panel.
 * Avoids scale transforms — they shrink the track and peek the next slide.
 */
export const technologyParallaxSlide = (sliderRef, tabIndex, duration = 0.55) => {
  if (!sliderRef?.current) return;

  gsap.to(sliderRef.current, {
    xPercent: -tabIndex * 100,
    duration,
    ease: 'power2.inOut',
    overwrite: true,
  });
};
