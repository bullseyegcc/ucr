'use client';

import { useEffect } from 'react';

export default function ScrollDiagnostics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create diagnostic overlay
    const overlay = document.createElement('div');
    overlay.id = 'scroll-diagnostics';
    overlay.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: #00ff00;
      padding: 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 11px;
      max-width: 400px;
      max-height: 300px;
      overflow-y: auto;
      z-index: 9999;
      line-height: 1.4;
      border: 1px solid #00ff00;
    `;

    const diagnostics = {
      isMobile: window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      userAgent: navigator.userAgent.substring(0, 60),
      lenisInitialized: false,
      lenisInstance: null,
      scrollEvents: 0,
      touchEvents: 0,
      wheelEvents: 0,
      virtualScrollEvents: 0,
      lastEventType: 'none',
      lastDeltaY: 0,
      scrollBehavior: window.getComputedStyle(document.documentElement).scrollBehavior,
      htmlOverflow: window.getComputedStyle(document.documentElement).overflow,
      bodyOverflow: window.getComputedStyle(document.body).overflow,
    };

    function updateDiagnostics() {
      overlay.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #00ff00; padding-bottom: 5px;">
          ⚙️ SCROLL DIAGNOSTICS
        </div>
        <div><span style="color: #ffaa00;">Mobile Mode:</span> ${diagnostics.isMobile ? '✅ YES' : '❌ NO'}</div>
        <div><span style="color: #ffaa00;">Viewport:</span> ${diagnostics.innerWidth}x${diagnostics.innerHeight}</div>
        <div><span style="color: #ffaa00;">Lenis Initialized:</span> ${diagnostics.lenisInitialized ? '✅ YES' : '❌ NO'}</div>
        <div><span style="color: #ffaa00;">Scroll Behavior:</span> ${diagnostics.scrollBehavior}</div>
        <div><span style="color: #ffaa00;">HTML Overflow:</span> ${diagnostics.htmlOverflow}</div>
        <div><span style="color: #ffaa00;">Body Overflow:</span> ${diagnostics.bodyOverflow}</div>
        <div style="border-top: 1px solid #00ff00; margin: 8px 0; padding-top: 8px;">
          <div><span style="color: #ffaa00;">Scroll Events:</span> ${diagnostics.scrollEvents}</div>
          <div><span style="color: #ffaa00;">Wheel Events:</span> ${diagnostics.wheelEvents}</div>
          <div><span style="color: #ffaa00;">Touch Events:</span> ${diagnostics.touchEvents}</div>
          <div><span style="color: #ffaa00;">Virtual Scroll Events:</span> ${diagnostics.virtualScrollEvents}</div>
          <div><span style="color: #ffaa00;">Last Event:</span> ${diagnostics.lastEventType}</div>
          <div><span style="color: #ffaa00;">Last Delta Y:</span> ${diagnostics.lastDeltaY.toFixed(2)}</div>
          <div style="margin-top: 5px; font-size: 9px; color: #ffaa00;">Scroll Y: ${window.scrollY.toFixed(0)}</div>
        </div>
      `;
    }

    document.body.appendChild(overlay);
    updateDiagnostics();

    // Monitor scroll events
    const handleScroll = (e) => {
      diagnostics.scrollEvents++;
      diagnostics.lastEventType = 'scroll';
      updateDiagnostics();
    };

    const handleWheel = (e) => {
      diagnostics.wheelEvents++;
      diagnostics.lastDeltaY = e.deltaY;
      diagnostics.lastEventType = 'wheel';
      updateDiagnostics();
    };

    const handleTouch = (e) => {
      diagnostics.touchEvents++;
      diagnostics.lastEventType = 'touch';
      updateDiagnostics();
    };

    // Check for Lenis
    setTimeout(() => {
      if (window.lenisInstance) {
        diagnostics.lenisInitialized = true;
        diagnostics.lenisInstance = window.lenisInstance;

        // Listen for Lenis virtual scroll
        window.lenisInstance.on('virtual-scroll', (data) => {
          diagnostics.virtualScrollEvents++;
          diagnostics.lastDeltaY = data.deltaY;
          diagnostics.lastEventType = 'virtual-scroll';
          updateDiagnostics();
        });

        // Listen for Lenis scroll
        window.lenisInstance.on('scroll', () => {
          updateDiagnostics();
        });
      }
      updateDiagnostics();
    }, 500);

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    // Update periodically
    const interval = setInterval(updateDiagnostics, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      clearInterval(interval);
      overlay.remove();
    };
  }, []);

  return null;
}
