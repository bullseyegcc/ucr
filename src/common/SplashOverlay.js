'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const SPLASH_SESSION_KEY = 'ucr-splash-done';

const LOGO_PATHS = (
  <g transform="translate(21.82, 18.57) scale(0.55) translate(-21.82, -18.57)">
    <path d="M37.2256 2.54971C38.0078 2.54997 38.6689 3.20385 38.6689 3.95694C38.6689 4.14032 38.6667 4.23403 38.6357 4.3251L38.6299 4.34171L38.627 4.35928C38.5916 4.56658 38.4869 4.78571 38.208 5.01944L38.2021 5.02432C28.7217 13.5479 19.2685 22.1316 9.74414 30.6982L9.74316 30.6991C7.8036 32.4603 5.87981 34.2033 3.96387 35.9413C5.04654 34.8348 6.13067 33.7267 7.21582 32.62C9.04746 30.752 10.8785 28.8829 12.6992 27.0146L12.7002 27.0155C18.5001 21.1242 24.2552 15.2326 30.0098 9.34171L30.0088 9.34073C32.0295 7.27697 34.1018 5.20798 36.082 3.09561L36.0811 3.09464C36.1311 3.04458 36.1784 2.98758 36.1992 2.96378C36.2273 2.93182 36.2381 2.92522 36.2432 2.92276L36.2744 2.90714L36.2998 2.88272L36.3447 2.83878C36.3441 2.83937 36.3478 2.83624 36.3594 2.82803C36.3705 2.82009 36.3837 2.81121 36.4014 2.79971C36.4192 2.78806 36.4459 2.76582 36.4756 2.74307C36.7239 2.62254 36.9582 2.54971 37.2256 2.54971Z" fill="black" />
    <path d="M29.4926 0.351624C30.4098 0.351701 31.1605 1.0935 31.1605 1.97858C31.1605 2.20855 31.1236 2.35625 31.0424 2.55475L31.0375 2.56647C31.0016 2.67179 30.9244 2.82255 30.806 2.97858L30.7777 3.00787L30.7328 3.05182H30.7318L30.723 3.06158C29.4647 4.4459 28.1949 5.83009 26.9252 7.20905L23.1263 11.3253C20.5414 14.1387 17.9566 16.9416 15.3715 19.7442C12.7864 22.5467 10.2008 25.3494 7.6156 28.1631C6.42423 29.46 5.24393 30.7465 4.06384 32.0323C3.57215 32.568 3.07978 33.1032 2.58728 33.6397C5.25894 30.208 7.9519 26.7914 10.6478 23.3467C15.5479 17.1045 20.4943 10.8181 25.3949 4.53131L25.3978 4.5274C26.2497 3.38751 27.1438 2.2947 28.0463 1.14752L28.0511 1.14069L28.056 1.13483C28.3792 0.660982 28.8986 0.351624 29.4926 0.351624Z" fill="black" />
    <path d="M39.3832 8.96823C40.3004 8.9683 41.0511 9.7101 41.0511 10.5952C41.0511 11.1735 40.7353 11.6765 40.3011 11.9467L40.2806 11.9594L40.2631 11.976C40.2313 12.0071 40.2274 12.0114 40.1957 12.0424C40.1835 12.0544 40.1535 12.0831 40.1361 12.1001C38.6347 13.2177 37.1444 14.3358 35.6429 15.4643L31.0687 18.9038C28.0116 21.2118 24.954 23.5206 21.8969 25.8286L12.725 32.7524C11.3318 33.8071 9.9277 34.8624 8.52283 35.9174C8.08361 36.2473 7.64439 36.5778 7.20544 36.9077C8.29179 35.943 9.37679 34.9783 10.4633 34.0151C12.5088 32.2017 14.5551 30.3886 16.601 28.5639C19.5904 25.9044 22.5913 23.2451 25.5922 20.5854C28.5929 17.9258 31.5936 15.2657 34.5834 12.6059L34.5844 12.6049C35.1454 12.1002 35.718 11.595 36.2914 11.0893C36.8589 10.5888 37.427 10.0869 37.9847 9.58542C38.0773 9.53518 38.1339 9.48492 38.1771 9.44284C38.507 9.16064 38.9079 8.96823 39.3832 8.96823Z" fill="black" />
    <path d="M22.3436 0.219727C22.9462 0.219727 23.4276 0.698005 23.4276 1.27539C23.4275 1.5227 23.3171 1.78227 23.163 1.9707L23.1532 1.98438L18.8368 8.18359C15.2853 13.283 11.7336 18.3816 8.1825 23.4365C8.15093 23.4811 8.11933 23.5257 8.08777 23.5703C9.19852 21.6637 10.3048 19.7686 11.4286 17.873L11.4296 17.8711C14.7112 12.2443 18.0383 6.5734 21.3651 0.902344L21.3954 0.850586V0.811523L21.4042 0.793945C21.4077 0.791776 21.4124 0.791431 21.4159 0.789062C21.4572 0.760747 21.4819 0.726792 21.4921 0.711914C21.4974 0.704023 21.5025 0.696 21.5048 0.692383C21.5071 0.688713 21.5077 0.68609 21.5087 0.68457L21.5751 0.620117V0.575195C21.5766 0.573674 21.5728 0.578286 21.5819 0.569336L21.6161 0.535156C21.6168 0.534431 21.6173 0.534907 21.618 0.53418L21.6434 0.508789C21.8282 0.328105 22.0882 0.219864 22.3436 0.219727Z" fill="black" />
    <path d="M16.4097 1.80237C16.6525 1.80237 16.8197 1.97231 16.8198 2.19788V2.32971L16.8062 2.38342L16.7534 2.49377L16.7495 2.50256C16.4801 3.09523 16.2107 3.67776 15.9409 4.26038L15.1304 6.02014C14.5461 7.31654 13.9507 8.62433 13.355 9.93225C13.1682 10.3424 12.9819 10.7529 12.7954 11.1627C13.0797 10.3563 13.3655 9.54882 13.6499 8.73303C14.009 7.7015 14.3795 6.68018 14.7505 5.65784C15.1213 4.63602 15.4928 3.61236 15.853 2.57776L15.854 2.57678C15.8765 2.51089 15.8989 2.44444 15.9214 2.37854C15.9433 2.31414 15.9649 2.24959 15.9868 2.18518C15.9922 2.17816 16.0001 2.17217 16.0054 2.1637C16.0168 2.14501 16.0274 2.12259 16.0347 2.09729C16.0384 2.08438 16.0379 2.07106 16.0396 2.05823L16.0425 2.0592C16.0648 1.92872 16.2165 1.80241 16.4097 1.80237Z" fill="black" />
    <path d="M39.9224 16.7495C40.525 16.7495 41.0063 17.2278 41.0063 17.8052C41.0062 18.191 40.7965 18.5109 40.5063 18.6988C40.5045 18.6993 40.5023 18.7001 40.5005 18.7007C40.4673 18.7116 40.4314 18.7312 40.394 18.7593C39.2926 19.4187 38.1908 20.0784 37.0894 20.7378L33.7856 22.7154C28.3906 25.9247 23.0381 29.1791 17.6899 32.3872L17.688 32.3892C17.5436 32.4781 17.3971 32.564 17.2515 32.6519C17.6652 32.3569 18.0786 32.0612 18.4927 31.7661C19.9424 30.7332 21.3927 29.6998 22.8315 28.6665C25.5287 26.7324 28.2259 24.8086 30.9233 22.8853C33.6208 20.962 36.3193 19.0386 39.0171 17.104L39.0298 17.0943L39.0425 17.0826C39.1044 17.0221 39.1646 16.9907 39.2544 16.9468L39.2622 16.9439L39.27 16.939C39.4675 16.8232 39.6989 16.7496 39.9224 16.7495Z" fill="black" />
  </g>
);

function markSplashDone() {
  try {
    sessionStorage.setItem(SPLASH_SESSION_KEY, '1');
  } catch {
    /* ignore */
  }
  window.__splashCompleted = true;
}

function emitSplashComplete() {
  window.__splashActive = false;
  window.__splashCompleted = true;
  window.dispatchEvent(new CustomEvent('splashComplete'));
}

export default function SplashOverlay() {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const svgRef = useRef(null);
  const maskGroupRef = useRef(null);
  const rectRef = useRef(null);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  // Claim splash before child effects run (HeroHeading / Lenis), but never
  // re-lock after the session splash has already finished.
  if (typeof window !== 'undefined' && isHomepage && !window.__splashCompleted) {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SPLASH_SESSION_KEY) === '1';
    } catch {
      /* ignore */
    }
    if (!alreadyShown) {
      window.__splashActive = true;
    }
  }

  useEffect(() => {
    const overlay = overlayRef.current;
    const container = containerRef.current;
    const svg = svgRef.current;
    const rect = rectRef.current;

    if (!isHomepage) {
      if (overlay) gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
      window.__splashActive = false;
      return;
    }

    let reducedMotion = false;
    let alreadyShown = false;
    try {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      alreadyShown = sessionStorage.getItem(SPLASH_SESSION_KEY) === '1';
    } catch {
      /* ignore */
    }

    const hideAndFinish = () => {
      if (overlay || container) {
        gsap.set([overlay, container].filter(Boolean), {
          display: 'none',
          pointerEvents: 'none',
        });
      }
      markSplashDone();
      emitSplashComplete();
    };

    if (reducedMotion || alreadyShown) {
      hideAndFinish();
      return;
    }

    const isMobile = window.innerWidth < 768;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const listenerOpts = { passive: false, capture: true };
    let unlocked = false;
    let splashTl = null;
    let completed = false;

    // Size SVG once via DOM — no React state → no remount mid-animation
    if (svg) {
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    }
    if (rect) {
      rect.setAttribute('width', String(w));
      rect.setAttribute('height', String(h));
    }
    const maskBg = svg?.querySelector('#logoHoleMask > rect');
    if (maskBg) {
      maskBg.setAttribute('width', String(w));
      maskBg.setAttribute('height', String(h));
    }

    function preventScroll(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    function preventKeyScroll(e) {
      const keys = new Set([' ', 'Spacebar', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowUp', 'ArrowDown']);
      if (keys.has(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    function lockScrollPosition() {
      window.scrollTo(0, 0);
    }

    function unlockScroll() {
      if (unlocked) return;
      unlocked = true;

      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
      // Extra clear — inline '' can leave prior 'none' if set via other paths
      document.body.style.removeProperty('touch-action');
      document.documentElement.style.removeProperty('touch-action');
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');

      window.removeEventListener('wheel', preventScroll, listenerOpts);
      window.removeEventListener('touchmove', preventScroll, listenerOpts);
      window.removeEventListener('keydown', preventKeyScroll, listenerOpts);
      window.removeEventListener('scroll', lockScrollPosition, true);

      window.__pageScrollLocked = false;
      window.lenisInstance?.start?.();
    }

    function complete() {
      if (completed) return;
      completed = true;
      unlockScroll();
      if (overlay || container) {
        gsap.set([overlay, container].filter(Boolean), {
          display: 'none',
          pointerEvents: 'none',
        });
      }
      markSplashDone();
      emitSplashComplete();
    }

    window.__splashActive = true;
    window.lenisInstance?.stop();
    window.scrollTo(0, 0);

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    // position:fixed on iOS often leaves scroll dead if unlock races; desktop only
    if (!isMobile) {
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100vh';
      document.documentElement.style.height = '100vh';
    }
    document.body.style.touchAction = 'none';
    document.documentElement.style.touchAction = 'none';

    window.addEventListener('wheel', preventScroll, listenerOpts);
    window.addEventListener('touchmove', preventScroll, listenerOpts);
    window.addEventListener('keydown', preventKeyScroll, listenerOpts);
    window.addEventListener('scroll', lockScrollPosition, true);

    const failsafe = setTimeout(complete, isMobile ? 1600 : 4200);

    const timer = setTimeout(() => {
      const mask = maskGroupRef.current;
      if (!overlay || !mask) {
        complete();
        return;
      }

      const centerX = w / 2;
      const centerY = h / 2;
      const startScale = isMobile ? 2.5 : 7.5;
      const midScale = isMobile ? 6 : 18.5;
      const finalScale = isMobile ? midScale * 3 : midScale * 8;
      const duration = isMobile ? 0.55 : 1.6;
      const finalDuration = isMobile ? 0.4 : 1.2;

      const tf = (scale) =>
        `translate(${centerX}, ${centerY}) scale(${scale}) translate(-37.5, -19)`;

      gsap.set(mask, {
        opacity: 0,
        attr: { transform: tf(startScale) },
      });
      gsap.set(overlay, { opacity: 1 });

      splashTl = gsap.timeline({
        onComplete: () => {
          clearTimeout(failsafe);
          complete();
        },
      });

      splashTl.to(mask, {
        opacity: 1,
        attr: { transform: tf(midScale) },
        duration,
        ease: 'expo.out',
      });

      splashTl.to(
        mask,
        {
          attr: { transform: tf(finalScale) },
          duration: finalDuration,
          ease: 'expo.in',
        },
        '-=0.05'
      );

      splashTl.to(
        overlay,
        {
          opacity: 0,
          duration: isMobile ? 0.15 : 0.25,
          ease: 'sine.inOut',
        },
        '>-0.08'
      );
    }, 40);

    return () => {
      clearTimeout(timer);
      clearTimeout(failsafe);
      splashTl?.kill();
      unlockScroll();
      if (!completed) {
        completed = true;
        markSplashDone();
        emitSplashComplete();
      }
    };
  }, [isHomepage]);

  if (!isHomepage) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999]"
      style={{ width: '100%', height: '100%', pointerEvents: 'auto', overflow: 'hidden' }}
      aria-hidden="true"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[9999]"
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          transformOrigin: 'center center',
          overflow: 'hidden',
          willChange: 'opacity',
        }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          <defs>
            <mask id="logoHoleMask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <g ref={maskGroupRef} opacity="0">
                {LOGO_PATHS}
                <text
                  x="52"
                  y="18.57"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fontFamily="Arial, sans-serif"
                  fontWeight="700"
                  letterSpacing="1"
                  fill="black"
                >
                  UCR
                </text>
              </g>
            </mask>
          </defs>
          <rect
            ref={rectRef}
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#EF4A2A"
            mask="url(#logoHoleMask)"
          />
        </svg>
      </div>
    </div>
  );
}
