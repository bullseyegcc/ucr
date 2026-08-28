import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:3000/contactus';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForTimeout(3000);

await page.evaluate(() => {
  try { sessionStorage.setItem('ucr-splash-done', '1'); } catch {}
  window.__splashActive = false;
  window.__splashCompleted = true;
  window.__pageScrollLocked = false;
  window.lenisInstance?.start?.();
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.documentElement.style.height = '';
  document.body.style.height = '';
  document.body.style.position = '';
  document.body.style.touchAction = '';
});
await page.waitForTimeout(500);

const metrics = await page.evaluate(async () => {
  // Footer root: ancestor of footer.mp4 video
  const footerVideo = document.querySelector('video[src*="footer"], video[poster*="footer"]')
    || [...document.querySelectorAll('video')].find(v => (v.getAttribute('src')||v.currentSrc||'').includes('footer'))
    || [...document.querySelectorAll('img[src*="footer"]')].at(0);

  let footerRoot = footerVideo;
  while (footerRoot && footerRoot !== document.body) {
    if (footerRoot.parentElement === document.body) break;
    footerRoot = footerRoot.parentElement;
  }
  // Prefer the direct body child that contains the video
  const bodyChildren = [...document.body.children];
  footerRoot = bodyChildren.find(el => el.querySelector?.('video') && el.querySelector?.('h3'))
    || bodyChildren.filter(el => el.tagName === 'DIV').at(-1);

  const mobileAddressH3 = [...footerRoot.querySelectorAll('h3')].find((h) => {
    const t = h.textContent.trim().toUpperCase();
    if (t !== 'ADDRESS') return false;
    const cs = getComputedStyle(h);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && h.offsetParent !== null;
  });

  const mobileBlock = mobileAddressH3?.closest('.flex.flex-col.gap-5, [class*="gap-5"]')
    || mobileAddressH3?.parentElement?.parentElement;
  const whiteCard = mobileAddressH3?.closest('[class*="rounded-t"]');
  const videoEl = footerRoot.querySelector('video');
  const videoPlayer = videoEl?.parentElement;
  const videoWrap = videoPlayer?.parentElement;

  const lenis = window.lenisInstance;
  const viewH = window.innerHeight;
  const docH = document.documentElement.scrollHeight;
  const maxScroll = Math.max(0, docH - viewH);

  if (lenis) lenis.scrollTo(999999, { immediate: true });
  window.scrollTo(0, 999999);
  await new Promise(r => setTimeout(r, 100));

  // force layout
  const afterScrollY = window.scrollY || document.documentElement.scrollTop;

  const addrRect = mobileAddressH3?.getBoundingClientRect();
  const blockRect = mobileBlock?.getBoundingClientRect();
  const cardRect = whiteCard?.getBoundingClientRect();
  const rootRect = footerRoot?.getBoundingClientRect();
  const videoRect = videoPlayer?.getBoundingClientRect();
  const wrapRect = videoWrap?.getBoundingClientRect();

  // All text nodes under mobile address block
  const phone = [...(mobileBlock?.querySelectorAll('h3') || [])].find(h => h.textContent.trim().toUpperCase() === 'PHONE');
  const email = [...(mobileBlock?.querySelectorAll('h3') || [])].find(h => h.textContent.trim().toUpperCase() === 'EMAIL');
  const emailRect = email?.parentElement?.getBoundingClientRect();

  const csRoot = footerRoot ? getComputedStyle(footerRoot) : null;
  const csBody = getComputedStyle(document.body);
  const csHtml = getComputedStyle(document.documentElement);
  const csVideoPlayer = videoPlayer ? getComputedStyle(videoPlayer) : null;

  return {
    viewH,
    docH,
    bodyScrollHeight: document.body.scrollHeight,
    maxScrollNative: maxScroll,
    afterScrollY,
    lenisScroll: lenis?.scroll ?? null,
    lenisLimit: lenis?.limit ?? null,
    lenisStopped: !!lenis?.isStopped,
    htmlOverflow: `${csHtml.overflowX}/${csHtml.overflowY}`,
    bodyOverflow: `${csBody.overflowX}/${csBody.overflowY}`,
    rootOverflow: csRoot ? `${csRoot.overflowX}/${csRoot.overflowY}` : null,
    rootClass: footerRoot?.className?.slice(0, 180) ?? null,
    rootOffsetHeight: footerRoot?.offsetHeight ?? null,
    rootScrollHeight: footerRoot?.scrollHeight ?? null,
    cardOffsetHeight: whiteCard?.offsetHeight ?? null,
    cardScrollHeight: whiteCard?.scrollHeight ?? null,
    videoPlayerH: videoPlayer?.offsetHeight ?? null,
    videoWrapH: videoWrap?.offsetHeight ?? null,
    videoPlayerMinH: csVideoPlayer?.minHeight ?? null,
    videoPlayerOverflow: csVideoPlayer ? `${csVideoPlayer.overflowX}/${csVideoPlayer.overflowY}` : null,
    addrTop: addrRect?.top ?? null,
    addrBottom: addrRect?.bottom ?? null,
    blockTop: blockRect?.top ?? null,
    blockBottom: blockRect?.bottom ?? null,
    emailBottom: emailRect?.bottom ?? null,
    cardTop: cardRect?.top ?? null,
    cardBottom: cardRect?.bottom ?? null,
    rootTop: rootRect?.top ?? null,
    rootBottom: rootRect?.bottom ?? null,
    videoBottom: videoRect?.bottom ?? null,
    wrapBottom: wrapRect?.bottom ?? null,
    pixelsCutOff: emailRect ? Math.max(0, emailRect.bottom - viewH) : null,
    cardExtendsPastRoot: cardRect && rootRect ? cardRect.bottom - rootRect.bottom : null,
    blockExtendsPastRoot: blockRect && rootRect ? blockRect.bottom - rootRect.bottom : null,
    foundAddress: !!mobileAddressH3,
    foundEmail: !!email,
  };
});

console.log(JSON.stringify(metrics, null, 2));
await browser.close();
