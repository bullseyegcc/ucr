'use client';

import { Menu, ArrowRight, X, ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);
    const pathname = usePathname();

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
                { label: 'About', href: '/aboutus' },
                { label: 'Our Team', href: '/team' },
                { label: 'Our Parent Company', href: '/parentCompany' },
                { label: 'Our Values', href: '/OurValues' }
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
            label: 'News', 
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
            {/* Top Navigation Bar - Original Dark Theme */}
            <div className="absolute top-0 left-0 w-full h-16 sm:h-20 bg-secondary/20 flex flex-row-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:px-10 lg:px-12 z-50">
                {/* Menu Button - Always visible */}
                <div 
                    className='inline-block bg-secondary/20 p-2 rounded-lg cursor-pointer hover:bg-secondary/30 transition-all' 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu size={24} className="sm:w-7 sm:h-7" color="white" />
                </div>

                {/* Logo - Centered on mobile, left on desktop */}
                <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    width={140} 
                    height={140} 
                    className='object-contain w-20 h-20 sm:w-24 sm:w-36 md:absolute md:left-1/2 md:-translate-x-1/2' 
                />

                {/* Contact Button - Hidden on mobile */}
                <Link href="/contactus" className='hidden md:block'>
                    <button className='flex items-center gap-2 w-36 lg:w-40 text-white border border-secondary rounded-2xl px-3 py-2 justify-between hover:bg-secondary/10 transition-all text-sm lg:text-base'>
                        Contact Us 
                        <ArrowRight size={18} color='white' />
                    </button>
                </Link>
            </div>

            {/* Slide-in Menu - Fully Responsive */}
            {isMenuOpen && (
                <>
                    {/* Overlay for larger screens */}
                    <div 
                        className="fixed inset-0 bg-black/50 z-[9998] md:block"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    
                    {/* Menu Panel - Light Theme */}
                    <div className="fixed bg-white top-0 left-0 w-full sm:w-[400px] md:w-[420px] lg:w-[450px] h-full z-[9999] bg-white flex flex-col pt-4 sm:pt-6 px-6 sm:px-8 md:px-10 overflow-y-auto shadow-2xl animate-slide-in">
                        {/* Header with Logo and Close Button */}
                        <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10">
                            <Image 
                                src="/clogo.png" 
                                alt="Logo" 
                                width={80} 
                                height={80} 
                                className='object-contain w-16 h-16 sm:w-20 sm:h-20' 
                            />
                            <button 
                                onClick={() => setIsMenuOpen(false)} 
                                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                            >
                                <X size={24} className="sm:w-6 sm:h-6" color="#1a1a1a" />
                            </button>
                        </div>

                        {/* Menu Items - Light Theme */}
                        <div className="flex flex-col gap-3 sm:gap-4 pb-8">
                            {menuStructure.map((item) => (
                                <div key={item.label}>
                                    {item.type === 'simple' ? (
                                        <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                                            <div className={`text-base sm:text-lg md:text-xl font-normal py-2 px-3 rounded-full cursor-pointer transition-colors ${
                                                isActivePage(item.href)
                                                    ? 'bg-primary text-white'
                                                    : 'text-gray-800 hover:text-primary'
                                            }`}>
                                                {item.label}
                                            </div>
                                        </Link>
                                    ) : (
                                        <div>
                                            <button
                                                onClick={() => toggleSection(item.label)}
                                                className={`w-full flex items-center justify-between text-base sm:text-lg md:text-xl font-normal py-2 px-3 rounded-full transition-colors ${
                                                    expandedSection === item.label || menuStructure.find(m => m.label === item.label)?.items?.some(sub => isActivePage(sub.href))
                                                        ? 'bg-primary text-white'
                                                        : 'text-gray-800 hover:text-primary'
                                                }`}
                                            >
                                                <span>{item.label}</span>
                                                <ChevronDown 
                                                    size={20} 
                                                    className={`transform transition-transform duration-300 ${expandedSection === item.label ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                            {/* Expandable Submenu with smooth animation */}
                                            <div className={`overflow-hidden transition-all duration-300 ${expandedSection === item.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="flex flex-col gap-2 sm:gap-3 mt-2 ml-3 sm:ml-4 md:ml-6">
                                                    {item.items.map((subItem) => {
                                                        const isActive = isActivePage(subItem.href);
                                                        return (
                                                            <Link 
                                                                key={subItem.href} 
                                                                href={subItem.href} 
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                <div className={`text-sm sm:text-base font-normal flex items-center gap-2 cursor-pointer py-1 px-3 rounded-full transition-colors ${
                                                                    isActive
                                                                        ? 'bg-primary text-white'
                                                                        : 'text-gray-700 hover:text-primary'
                                                                }`}>
                                                                    <ChevronRight 
                                                                        size={16} 
                                                                        className={`flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`} 
                                                                    />
                                                                    {subItem.label}
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
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
