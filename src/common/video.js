'use client';

import { useEffect, useRef, useState } from 'react';

function getPosterSrc(src) {
  if (!src) return '';
  const name = src.replace(/^\//, '').replace(/\.mp4$/i, '');
  return `/posters/${name}.jpg`;
}

function getObjectFit(className) {
  if (className.includes('object-contain')) return 'object-contain';
  return 'object-cover';
}

function markVideoReady(video, setIsReady) {
  if (video.readyState >= 2) {
    setIsReady(true);
  }
}

export function VideoPlayer({
  src,
  poster,
  width = 600,
  height = 800,
  className = '',
  priority = false,
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isReady, setIsReady] = useState(false);

  const posterSrc = poster ?? getPosterSrc(src);
  const objectFit = getObjectFit(className);

  useEffect(() => {
    if (priority) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    setIsReady(false);
  }, [src]);

  useEffect(() => {
    if (!shouldLoad) return;

    const video = videoRef.current;
    if (!video) return;

    markVideoReady(video, setIsReady);
    video.play().catch(() => {});
  }, [shouldLoad, src]);

  const handleReady = () => setIsReady(true);

  return (
    <div
      ref={containerRef}
      className={`grid h-full w-full min-h-full overflow-hidden [&>*]:col-start-1 [&>*]:row-start-1 ${className}`}
    >
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={posterSrc || undefined}
        width={width}
        height={height}
        autoPlay={shouldLoad}
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'none'}
        onLoadedData={handleReady}
        onCanPlay={handleReady}
        onPlaying={handleReady}
        className={`h-full w-full min-h-full ${objectFit}`}
      />
      {posterSrc && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className={`h-full w-full min-h-full ${objectFit} z-[1] transition-opacity duration-500 ${
            isReady ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
}
