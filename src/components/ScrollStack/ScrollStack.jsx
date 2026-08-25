'use client'

import React, { useLayoutEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'

export function ScrollStackItem({ children, itemClassName = '' }) {
  return (
    <div
      className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  )
}

/** Document Y via offset chain — ignores CSS transforms on the element itself. */
function getDocumentTop(element) {
  let top = 0
  let node = element
  while (node) {
    top += node.offsetTop
    node = node.offsetParent
  }
  return top
}

function readScrollTop() {
  const lenis = window.lenisInstance
  if (lenis && typeof lenis.scroll === 'number') return lenis.scroll
  return window.scrollY || document.documentElement.scrollTop || 0
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  disableStackOnMobile = false,
  onStackComplete,
}) {
  const scrollerRef = useRef(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef(null)
  const lenisRef = useRef(null)
  const ownsLenisRef = useRef(false)
  const cardsRef = useRef([])
  const layoutRef = useRef({ tops: [], endTop: 0, containerHeight: 0 })
  const layoutFrozenRef = useRef(false)
  const hasScrolledRef = useRef(false)
  const lastTransformsRef = useRef(new Map())
  const lastScrollRef = useRef(-1)
  const measureTimerRef = useRef(0)
  const propsRef = useRef({})
  const updateRef = useRef(() => {})

  propsRef.current = {
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    disableStackOnMobile,
    onStackComplete,
  }

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return parseFloat(value)
  }, [])

  const measureLayout = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    const root = scrollerRef.current
    const inner = root?.querySelector('.scroll-stack-inner')
    const { useWindowScroll: windowMode } = propsRef.current

    if (windowMode && inner) {
      const innerTop = getDocumentTop(inner)
      layoutRef.current.tops = cards.map((card) => innerTop + card.offsetTop)
      const endElement = inner.querySelector('.scroll-stack-end')
      layoutRef.current.endTop = endElement
        ? innerTop + endElement.offsetTop
        : innerTop
      layoutRef.current.containerHeight = window.innerHeight
    } else if (inner) {
      layoutRef.current.tops = cards.map((card) => card.offsetTop)
      const endElement = inner.querySelector('.scroll-stack-end')
      layoutRef.current.endTop = endElement ? endElement.offsetTop : 0
      layoutRef.current.containerHeight = root?.clientHeight || 0
    }
  }, [])

  /** @param {number} [scrollOverride] Lenis same-frame scroll value */
  const updateCardTransforms = useCallback(
    (scrollOverride) => {
      const cards = cardsRef.current
      if (!cards.length) return

      const { tops, endTop } = layoutRef.current
      if (!tops.length) return

      const {
        itemScale: iScale,
        itemStackDistance: iStack,
        stackPosition: stackPos,
        scaleEndPosition: scaleEnd,
        baseScale: bScale,
        rotationAmount: rotAmt,
        blurAmount: blurAmt,
        useWindowScroll: windowMode,
        disableStackOnMobile: noMobileStack,
        onStackComplete: onComplete,
      } = propsRef.current

      const isMobileStackOff =
        noMobileStack && typeof window !== 'undefined' && window.innerWidth < 1024

      const scrollTop =
        typeof scrollOverride === 'number'
          ? scrollOverride
          : windowMode
            ? readScrollTop()
            : scrollerRef.current?.scrollTop || 0

      if (Math.abs(scrollTop - lastScrollRef.current) < 0.05) return
      if (Math.abs(scrollTop - lastScrollRef.current) > 1) {
        hasScrolledRef.current = true
      }
      lastScrollRef.current = scrollTop

      const containerHeight = windowMode
        ? window.innerHeight
        : scrollerRef.current?.clientHeight || layoutRef.current.containerHeight

      const stackPositionPx = parsePercentage(stackPos, containerHeight)
      const scaleEndPositionPx = parsePercentage(scaleEnd, containerHeight)
      const pinEnd = endTop - containerHeight / 2

      let topCardIndex = 0
      if (blurAmt) {
        for (let j = 0; j < cards.length; j++) {
          const jTriggerStart = tops[j] - stackPositionPx - iStack * j
          if (scrollTop >= jTriggerStart) topCardIndex = j
        }
      }

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        if (!card) continue

        if (isMobileStackOff) {
          const last = lastTransformsRef.current.get(i)
          if (
            !last ||
            last.translateY !== 0 ||
            last.scale !== 1 ||
            last.rotation !== 0 ||
            last.blur !== 0
          ) {
            card.style.transform = 'translate3d(0,0,0) scale(1) rotate(0deg)'
            if (blurAmt) card.style.filter = 'none'
            lastTransformsRef.current.set(i, {
              translateY: 0,
              scale: 1,
              rotation: 0,
              blur: 0,
            })
          }
          continue
        }

        const cardTop = tops[i]
        const triggerStart = cardTop - stackPositionPx - iStack * i
        const triggerEnd = cardTop - scaleEndPositionPx
        const pinStart = cardTop - stackPositionPx - iStack * i

        let scaleProgress = 0
        if (scrollTop >= triggerEnd) scaleProgress = 1
        else if (scrollTop > triggerStart) {
          scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart)
        }

        const targetScale = bScale + i * iScale
        const scale = 1 - scaleProgress * (1 - targetScale)
        const rotation = rotAmt ? i * rotAmt * scaleProgress : 0
        const blur =
          blurAmt && i < topCardIndex
            ? Math.max(0, (topCardIndex - i) * blurAmt)
            : 0

        let translateY = 0
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPositionPx + iStack * i
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + iStack * i
        }

        const last = lastTransformsRef.current.get(i)
        if (
          last &&
          Math.abs(last.translateY - translateY) < 0.08 &&
          Math.abs(last.scale - scale) < 0.0008 &&
          Math.abs(last.rotation - rotation) < 0.08 &&
          Math.abs(last.blur - blur) < 0.08
        ) {
          continue
        }

        card.style.transform = `translate3d(0,${translateY}px,0) scale(${scale}) rotate(${rotation}deg)`
        if (blurAmt) {
          card.style.filter = blur > 0 ? `blur(${blur}px)` : 'none'
        }

        lastTransformsRef.current.set(i, { translateY, scale, rotation, blur })

        if (i === cards.length - 1) {
          const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
          if (isInView && !stackCompletedRef.current) {
            stackCompletedRef.current = true
            onComplete?.()
          } else if (!isInView && stackCompletedRef.current) {
            stackCompletedRef.current = false
          }
        }
      }
    },
    [parsePercentage],
  )

  updateRef.current = updateCardTransforms

  useLayoutEffect(() => {
    if (!useWindowScroll && !scrollerRef.current) return

    const root = scrollerRef.current
    const cards = Array.from(root?.querySelectorAll('.scroll-stack-card') ?? [])
    cardsRef.current = cards
    const transformsCache = lastTransformsRef.current
    layoutFrozenRef.current = false
    hasScrolledRef.current = false

    const applyCardSpacing = () => {
      const gap =
        disableStackOnMobile && window.innerWidth < 1024 ? 48 : itemDistance
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          card.style.marginBottom = `${gap}px`
        } else {
          card.style.marginBottom = ''
        }
      })
    }

    applyCardSpacing()

    cards.forEach((card, i) => {
      card.style.zIndex = String(i + 1)
      card.style.position = 'relative'
      card.style.willChange = 'transform'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.webkitBackfaceVisibility = 'hidden'
      card.style.transform = 'translate3d(0,0,0)'
    })

    measureLayout()
    lastScrollRef.current = -1
    updateRef.current()

    let detachScroll = () => {}

    if (useWindowScroll) {
      let usingLenis = false
      let scrollRaf = 0

      // Same-frame Lenis sync — pass event scroll, no extra rAF.
      const onLenisScroll = (e) => {
        const scroll =
          typeof e?.scroll === 'number' ? e.scroll : readScrollTop()
        updateRef.current(scroll)
      }

      const onNativeScroll = () => {
        if (usingLenis) return
        if (scrollRaf) return
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0
          updateRef.current()
        })
      }

      const attachLenis = (lenis) => {
        if (usingLenis && lenisRef.current === lenis) return
        lenisRef.current?.off?.('scroll', onLenisScroll)
        lenis.on('scroll', onLenisScroll)
        lenisRef.current = lenis
        ownsLenisRef.current = false
        usingLenis = true
        updateRef.current(lenis.scroll)
      }

      if (window.lenisInstance) {
        attachLenis(window.lenisInstance)
      }

      const onLenisReady = () => {
        if (window.lenisInstance) attachLenis(window.lenisInstance)
      }
      window.addEventListener('lenisReady', onLenisReady)
      window.addEventListener('scroll', onNativeScroll, { passive: true })

      detachScroll = () => {
        window.removeEventListener('lenisReady', onLenisReady)
        window.removeEventListener('scroll', onNativeScroll)
        if (scrollRaf) cancelAnimationFrame(scrollRaf)
        lenisRef.current?.off?.('scroll', onLenisScroll)
      }
    } else {
      const scroller = scrollerRef.current
      if (!scroller) return

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      })

      lenis.on('scroll', (e) => {
        updateRef.current(typeof e?.scroll === 'number' ? e.scroll : undefined)
      })

      const raf = (time) => {
        lenis.raf(time)
        animationFrameRef.current = requestAnimationFrame(raf)
      }
      animationFrameRef.current = requestAnimationFrame(raf)

      lenisRef.current = lenis
      ownsLenisRef.current = true

      detachScroll = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        lenis.destroy()
      }
    }

    const remasure = (force = false) => {
      if (layoutFrozenRef.current && !force) return
      measureLayout()
      lastScrollRef.current = -1
      updateRef.current()
    }

    const onResize = () => {
      window.clearTimeout(measureTimerRef.current)
      measureTimerRef.current = window.setTimeout(() => {
        applyCardSpacing()
        layoutFrozenRef.current = false
        remasure(true)
        layoutFrozenRef.current = true
      }, 100)
    }
    window.addEventListener('resize', onResize, { passive: true })

    const images = root.querySelectorAll('img')
    const onImageLoad = () => {
      if (layoutFrozenRef.current || hasScrolledRef.current) return
      remasure(true)
    }
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onImageLoad, { once: true })
    })

    const settleTimer = window.setTimeout(() => {
      remasure(true)
      layoutFrozenRef.current = true
    }, 350)

    return () => {
      window.clearTimeout(measureTimerRef.current)
      window.clearTimeout(settleTimer)
      detachScroll()
      window.removeEventListener('resize', onResize)
      images.forEach((img) => img.removeEventListener('load', onImageLoad))
      cards.forEach((card) => {
        card.style.zIndex = ''
        card.style.position = ''
        card.style.willChange = ''
        card.style.transform = ''
        card.style.filter = ''
      })
      lenisRef.current = null
      ownsLenisRef.current = false
      stackCompletedRef.current = false
      layoutFrozenRef.current = false
      hasScrolledRef.current = false
      cardsRef.current = []
      layoutRef.current = { tops: [], endTop: 0, containerHeight: 0 }
      transformsCache.clear()
      lastScrollRef.current = -1
    }
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    disableStackOnMobile,
    measureLayout,
  ])

  if (useWindowScroll) {
    return (
      <div ref={scrollerRef} className={`relative z-10 isolate w-full ${className}`.trim()}>
        <div className="scroll-stack-inner pb-[10vh]">
          {children}
          <div className="scroll-stack-end w-full h-16 sm:h-[32vh]" aria-hidden />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position',
      }}
    >
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  )
}
