'use client';

import { Menu, ArrowRight, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/aboutus' },
        { label: 'Products', href: '/products' },
        { label: 'Supply Chain', href: '/logistics' },
        { label: 'Sustainability', href: '/sustainability' },
        { label: 'News', href: '/blogs' },
        { label: 'Contact Us', href: '/contactus' }
    ];

    return(
        <>
            <div className="absolute top-0 left-0 w-full h-20 bg-secondary/20 flex flex-row-reverse md:flex-row items-center justify-between px-9 md:px-10 z-50">
<div className='inline-block bg-secondary/20 p-2 rounded-lg cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu size={28} color="white" />
                </div>

                <Image src="/logo.png" alt="Logo" width={100} height={100} className='object-contain md:absolute left-1/2 md:-translate-x-1/2' />

                <button className='z-90 hidden md:flex items-center gap-2 w-40 text-white border border-secondary rounded-2xl px-3 py-2 justify-between'>Contact Us <ArrowRight size={18} color='white' /></button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-[#272A2A] flex flex-col pt-6 px-8 overflow-y-auto">
                    {/* Header with Logo and Close Button */}
                    <div className="flex items-center justify-between mb-12">
                        <Image src="/logo.png" alt="Logo" width={100} height={100} className='object-contain' />
                        <button onClick={() => setIsMenuOpen(false)} className="p-2">
                            <X size={28} color="white" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-8">
                        {menuItems.map((item) => (
                            <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                                <div className="text-white text-2xl font-medium hover:text-orange-500 transition-colors">
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}