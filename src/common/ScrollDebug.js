'use client';

import { useEffect } from 'react';

export default function ScrollDebug() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create simple debug overlay
    const debug = document.createElement('div');
    debug.id = 'scroll-debug';
    debug.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #000;
      color: #0f0;
      padding: 10px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      border: 1px solid #0f0;
      width: 300px;
    `;
    document.body.appendChild(debug);

    // Log key info
    const update = () => {
      const isMobile = window.innerWidth < 768;
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const lenisY = window.lenisInstance?.scrollY || 'N/A';
      
      debug.innerHTML = `
        Mobile: ${isMobile ? 'YES' : 'NO'}<br>
        DocHeight: ${docHeight}<br>
        ViewHeight: ${viewHeight}<br>
        ScrollY: ${scrollY.toFixed(1)}<br>
        LenisY: ${lenisY.toFixed ? lenisY.toFixed(1) : lenisY}<br>
        CanScroll: ${docHeight > viewHeight ? 'YES' : 'NO'}<br>
        <br>
        <small>Try scrolling with trackpad</small>
      `;
    };

    update();
    
    // Update on scroll
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('wheel', update, { passive: true });
    
    // Update every 500ms
    const interval = setInterval(update, 500);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('wheel', update);
      clearInterval(interval);
      debug.remove();
    };
  }, []);

  return null;
}
