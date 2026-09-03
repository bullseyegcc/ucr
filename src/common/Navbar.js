'use client';

import { Menu, ArrowRight, X, XCircle, ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
    motion,
    useMotionTemplate,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'motion/react';

/** Distance over which the bar eases from glass to solid (non-homepage). */
const FADE_DISTANCE_PX = 280;
/**
 * Homepage: start fading to solid when About's top is this close to the
 * viewport top (slide progress 0–1). Completes at 1 = About fully docked.
 */
const ABOUT_NAV_FADE_START = 0.86;

const SPRING = {
    stiffness: 48,
    damping: 22,
    mass: 1.05,
    restDelta: 0.001,
    restSpeed: 0.001,
};

function getScrollY() {
    return window.lenisInstance?.scroll ?? window.scrollY ?? 0;
}

function scrollToProgress(y) {
    const t = Math.min(1, Math.max(0, y / FADE_DISTANCE_PX));
    return t * t * (3 - 2 * t);
}

/** Map About slide progress → navbar solid as About's top reaches the bar. */
function aboutSlideToNavProgress(aboutProgress) {
    if (typeof window !== 'undefined' && window.__heroAboutPlaced) return 1;
    const p = Math.max(0, Math.min(1, aboutProgress ?? 0));
    if (p <= ABOUT_NAV_FADE_START) return 0;
    return (p - ABOUT_NAV_FADE_START) / (1 - ABOUT_NAV_FADE_START);
}

function isSolidNavbarPath(pathname) {
    return Boolean(pathname?.startsWith('/blogs/'));
}

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);
    const pathname = usePathname();
    const solidByDefault = isSolidNavbarPath(pathname);
    const [isScrolled, setIsScrolled] = useState(solidByDefault);
    const reducedMotion = useReducedMotion();
    const progress = useSpring(solidByDefault ? 1 : 0, SPRING);

    const backgroundColor = useTransform(
        progress,
        [0, 1],
        ['rgba(192,192,192,0.2)', 'rgba(255,255,255,1)']
    );
    const shadowOpacity = useTransform(progress, [0.35, 1], [0, 0.08]);
    const boxShadow = useMotionTemplate`0 10px 15px -3px rgba(0,0,0,${shadowOpacity}), 0 4px 6px -4px rgba(0,0,0,${shadowOpacity})`;
    const fgColor = useTransform(progress, [0, 1], ['#ffffff', '#1a1a1a']);
    const borderColor = useTransform(progress, [0, 1], ['#C0C0C0', '#1a1a1a']);
    const menuBg = useTransform(
        progress,
        [0, 1],
        ['rgba(192,192,192,0.2)', 'rgb(243,244,246)']
    );
    const logoLightOpacity = useTransform(progress, [0, 0.8], [1, 0]);
    const logoDarkOpacity = useTransform(progress, [0.2, 1], [0, 1]);

    const applyOpaqueFlag = useCallback((value) => {
        const opaque = solidByDefault || value > 0.45;
        setIsScrolled((prev) => (prev === opaque ? prev : opaque));
    }, [solidByDefault]);

    const syncProgress = useCallback((instant = false) => {
        let next = solidByDefault ? 1 : 0;

        if (!solidByDefault) {
            if (pathname === '/') {
                // Drive from About slide progress so navbar eases with the panel dock.
                const aboutP = window.__heroAboutProgress ?? 0;
                const aboutPlaced = window.__heroAboutPlaced === true;
                if (aboutPlaced || aboutP > 0) {
                    next = aboutSlideToNavProgress(aboutP);
                } else {
                    next = scrollToProgress(getScrollY());
                }
            } else {
                next = scrollToProgress(getScrollY());
            }
        }

        if (instant || reducedMotion) {
            progress.jump(next);
        } else {
            progress.set(next);
        }
    }, [pathname, progress, reducedMotion, solidByDefault]);

    useEffect(() => progress.on('change', applyOpaqueFlag), [applyOpaqueFlag, progress]);

    useLayoutEffect(() => {
        syncProgress(true);
    }, [pathname, syncProgress]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                syncProgress();
                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        let attachedLenis = null;
        const attachLenis = () => {
            const next = window.lenisInstance;
            if (!next || attachedLenis === next) return;
            attachedLenis?.off('scroll', handleScroll);
            attachedLenis = next;
            attachedLenis.on('scroll', handleScroll);
        };
        attachLenis();
        window.addEventListener('lenisReady', attachLenis);

        const onHeroAboutProgress = (e) => {
            if (typeof e?.detail?.progress === 'number') {
                window.__heroAboutProgress = e.detail.progress;
            }
            syncProgress();
        };
        const onHeroAboutPlaced = (e) => {
            if (typeof e?.detail?.placed === 'boolean') {
                window.__heroAboutPlaced = e.detail.placed;
            }
            // Never jump — keep easing with About’s settle.
            syncProgress();
        };
        window.addEventListener('heroAboutProgress', onHeroAboutProgress);
        window.addEventListener('heroAboutPlaced', onHeroAboutPlaced);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('lenisReady', attachLenis);
            attachedLenis?.off('scroll', handleScroll);
            window.removeEventListener('heroAboutProgress', onHeroAboutProgress);
            window.removeEventListener('heroAboutPlaced', onHeroAboutPlaced);
        };
    }, [syncProgress]);

    const isActivePage = (href) => {
        return pathname === href || pathname.startsWith(href + '/');
    };

    const menuStructure = [
        { 
            label: 'Home', 
            href: '/',
            type: 'simple'
        },
        { 
            label: 'About Us',
            type: 'section',
            items: [
                { label: 'Our Company', href: '/aboutus' },
                { label: 'Our Values', href: '/OurValues' },
                { label: 'Our People', href: '/team' },
                { label: 'Our Parents Company', href: '/parentCompany' },
                { label: 'Our Policies', href: '/ourPolicies' },
            ]
        },
        { 
            label: 'Products',
            type: 'section',
            items: [
                { label: 'Products', href: '/products' },
                { label: 'Technology', href: '/technology' },
                { label: 'Quality Assurance', href: '/quality' }
            ]
        },
        { 
            label: 'Supply Chain',
            type: 'section',
            items: [
                { label: 'Logistics', href: '/logistics' }
            ]
        },
        { 
            label: 'Sustainability',
            type: 'section',
            items: [
                { label: 'Overview', href: '/sustainability' }
            ]
        },
        { 
            label: 'Blogs', 
            href: '/blogs',
            type: 'simple'
        },
        { 
            label: 'Contact Us', 
            href: '/contactus',
            type: 'simple'
        }
    ];

    const toggleSection = (label) => {
        setExpandedSection(expandedSection === label ? null : label);
    };

    return(
        <>
            {/* Top Navigation Bar — live transparent → opaque, Bullseye-style */}
            <motion.div
                className="fixed top-0 left-0 z-50 h-16 w-full backdrop-blur-sm sm:h-20"
                style={{
                    backgroundColor,
                    boxShadow,
                }}
            >
                <div className="relative mx-auto flex h-full w-full max-w-[1600px] flex-row-reverse items-center justify-between px-4 sm:px-6 lg:flex-row lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem]">
                {/* Menu Button - Dynamic color based on scroll state */}
                <motion.div
                    className={`group inline-block cursor-pointer p-2 transition-all duration-300 ease-out ${
                        isScrolled
                            ? 'hover:!bg-primary'
                            : 'hover:!bg-white'
                    }`}
                    style={{ backgroundColor: menuBg }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <motion.span
                        style={{ color: fgColor }}
                        className={`block transition-colors duration-300 ease-out ${
                            isScrolled
                                ? 'group-hover:!text-white'
                                : 'group-hover:!text-primary'
                        }`}
                    >
                        <Menu size={24} className="sm:h-7 sm:w-7" />
                    </motion.span>
                </motion.div>

                {/* Logo — both assets are 209×60; shared box keeps crossfade size-stable */}
                <Link
                    href="/"
                    aria-label="Go to homepage"
                    onClick={() => setIsMenuOpen(false)}
                    className="relative h-9 w-[125px] sm:h-12 sm:w-[167px] lg:absolute lg:left-1/2 lg:-translate-x-1/2"
                >
                    <motion.div className="absolute inset-0" style={{ opacity: logoLightOpacity }}>
                        <Image
                            src="/shared/logo.png"
                            alt="Logo"
                            width={209}
                            height={60}
                            priority
                            sizes="167px"
                            className="h-full w-full object-contain object-center"
                        />
                    </motion.div>
                    <motion.div className="absolute inset-0" style={{ opacity: logoDarkOpacity }}>
                        <Image
                            src="/shared/clogo.png"
                            alt=""
                            width={209}
                            height={60}
                            sizes="167px"
                            className="h-full w-full object-contain object-center"
                        />
                    </motion.div>
                </Link>

                {/* Contact Button - Hidden on mobile, dynamic color */}
                <Link href="/contactus" className="group hidden lg:block">
                    <motion.button
                        className={`flex w-36 items-center justify-between gap-2 rounded-full border px-3 py-2 text-sm transition-all duration-300 ease-out lg:w-40 lg:text-base ${
                            isScrolled
                                ? 'hover:!bg-primary hover:!border-primary hover:!text-white'
                                : 'hover:!bg-white hover:!border-transparent hover:!text-primary'
                        }`}
                        style={{ color: fgColor, borderColor }}
                    >
                        Contact Us
                        <motion.span
                            style={{ color: fgColor }}
                            className={`block transition-transform duration-300 ease-out group-hover:translate-x-1 ${
                                isScrolled
                                    ? 'group-hover:!text-white'
                                    : 'group-hover:!text-primary'
                            }`}
                        >
                            <ArrowRight size={18} />
                        </motion.span>
                    </motion.button>
                </Link>
                </div>
            </motion.div>

            {/* Slide-in Menu - Fully Responsive */}
            {isMenuOpen && (
                <>
                    {/* Overlay for larger screens */}
                    <div 
                        className="fixed inset-0 bg-black/50 z-[9998] lg:block"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    
                    {/* Menu Panel */}
                    <div className="fixed bg-white top-0 left-0 w-full sm:w-[390px] lg:w-[430px] h-full z-[9999] flex flex-col pt-5 px-7 lg:px-9 overflow-y-auto shadow-2xl animate-slide-in">

                        {/* ── Header: MEGA MENU | ⊗ CLOSE ── */}
                        <div className="flex items-center justify-between mb-6 pb-1">
                            <span className="text-[11px] font-semibold tracking-[0.22em] text-gray-400 uppercase">Mega Menu</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-1.5 group"
                            >
                                <XCircle size={17} className="text-primary" />
                                <span className="text-[11px] font-semibold text-primary uppercase tracking-[0.22em] group-hover:opacity-75 transition-opacity">Close</span>
                            </button>
                        </div>

                        {/* ── Menu Items ── */}
                        <nav className="flex flex-col pb-10">
                            {menuStructure.map((item, idx) => (
                                <div key={item.label} className={idx > 0 ? 'mt-1' : ''}>
                                    {item.type === 'simple' ? (
                                        /* Simple link — Home, Blogs, Contact Us */
                                        <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                                            <div className={`text-[22px] lg:text-[24px] font-normal py-3 cursor-pointer transition-colors leading-tight ${
                                                isActivePage(item.href) ? 'text-primary' : 'text-[#1a1a1a] hover:text-primary'
                                            }`}>
                                                {item.label}
                                            </div>
                                        </Link>
                                    ) : (
                                        /* Expandable section */
                                        <div>
                                            {/* Section header button */}
                                            <button
                                                onClick={() => toggleSection(item.label)}
                                                className={`w-full flex items-center justify-between py-3 text-[22px] lg:text-[24px] font-normal transition-colors leading-tight ${
                                                    expandedSection === item.label
                                                        ? 'text-primary'
                                                        : 'text-[#1a1a1a] hover:text-primary'
                                                }`}
                                            >
                                                <span>{item.label}</span>
                                                <ChevronDown
                                                    size={20}
                                                    className={`flex-shrink-0 transition-transform duration-300 ${
                                                        expandedSection === item.label ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </button>

                                            {/* Divider line shown when section is open */}
                                            {expandedSection === item.label && (
                                                <div className="w-full h-px bg-gray-200 mb-2" />
                                            )}

                                            {/* Expandable sub-items */}
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                expandedSection === item.label ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                                <div className="flex flex-col gap-1 pb-3 pl-1">
                                                    {item.items.map((subItem) => {
                                                        const isActive = isActivePage(subItem.href);
                                                        return (
                                                            <Link
                                                                key={subItem.href}
                                                                href={subItem.href}
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                <div className={`flex items-center gap-3 py-[7px] cursor-pointer transition-colors group ${
                                                                    isActive ? 'text-primary' : 'text-[#1a1a1a] hover:text-primary'
                                                                }`}>
                                                                    {/* Square icon — no border-radius */}
                                                                    <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center transition-colors duration-200 ${
                                                                        isActive
                                                                            ? 'bg-primary'
                                                                            : 'bg-[#d4d4d4] group-hover:bg-primary'
                                                                    }`}>
                                                                        <ChevronRight size={14} className="text-white" />
                                                                    </span>
                                                                    <span className={`text-[15px] lg:text-[16px] font-normal leading-snug transition-colors duration-200 ${
                                                                        isActive ? 'text-primary font-medium' : 'text-[#2a2a2a] group-hover:text-primary'
                                                                    }`}>
                                                                        {subItem.label}
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </>
            )}
        </>
    )
}
