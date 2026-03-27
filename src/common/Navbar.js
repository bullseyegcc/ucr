'use client';

import { Menu, ArrowRight, X, XCircle, ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Scroll detection for navbar opacity and sticky behavior
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Hero section threshold - adjust as needed (80vh or 600px)
                    const heroThreshold = Math.min(window.innerHeight * 0.8, 600);
                    setIsScrolled(window.scrollY > heroThreshold);
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Check initial scroll position
        handleScroll();

        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            {/* Top Navigation Bar - Dynamic opacity and sticky behavior */}
            <div className={`top-0 left-0 w-full h-16 sm:h-20 flex flex-row-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-10 lg:px-12 z-50 transition-all duration-500 ease-in-out ${
                isScrolled 
                    ? 'fixed bg-white shadow-lg backdrop-blur-sm transform translate-y-0 opacity-100' 
                    : 'absolute bg-secondary/20 transform translate-y-0 opacity-100'
            }`}>
                {/* Menu Button - Dynamic color based on scroll state */}
                <div 
                    className={`inline-block p-2 cursor-pointer transition-all duration-300 ${
                        isScrolled 
                            ? 'bg-gray-100 hover:bg-gray-200' 
                            : 'bg-secondary/20 hover:bg-secondary/30'
                    }`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu 
                        size={24} 
                        className="sm:w-7 sm:h-7" 
                        color={isScrolled ? '#1a1a1a' : 'white'} 
                    />
                </div>

                {/* Logo - Centered on mobile, left on desktop */}
                <Image 
                    src={isScrolled ? "/clogo.png" : "/logo.png"}
                    alt="Logo" 
                    width={140} 
                    height={140} 
                    className='object-contain w-20 h-20 sm:w-24 sm:w-36 lg:absolute lg:left-1/2 lg:-translate-x-1/2 transition-all duration-300' 
                />

                {/* Contact Button - Hidden on mobile, dynamic color */}
                <Link href="/contactus" className='hidden lg:block'>
                    <button className={`flex items-center gap-2 w-36 lg:w-40 border rounded-full px-3 py-2 justify-between transition-all duration-300 text-sm lg:text-base ${
                        isScrolled
                            ? 'text-gray-900 border-gray-900 hover:bg-gray-100'
                            : 'text-white border-secondary hover:bg-secondary/10'
                    }`}>
                        Contact Us 
                        <ArrowRight 
                            size={18} 
                            color={isScrolled ? '#1a1a1a' : 'white'} 
                        />
                    </button>
                </Link>
            </div>

            {/* Spacer to prevent content from hiding behind fixed navbar */}
            <div className={`${isScrolled ? 'h-16 sm:h-20 lg:h-40' : 'h-0'}`} />

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
