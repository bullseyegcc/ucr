import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { WhiteBadge } from "./badge";

export default function Footer() {
    return (
        <div className='min-h-screen bg-[url("/footer-bg.png")] bg-cover bg-center flex flex-col justify-end items-center '>
            <div className='w-full max-w-6xl bg-white rounded-xl p-16 flex flex-col gap-12'>
                {/* Header Section */}
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <Image src="/logo.png" alt="UCR Logo" width={300} height={90} className='object-contain' />
                    </div>
                    <div className='flex gap-4'>
                        <Facebook size={24} className='text-primary cursor-pointer' />
                        <Twitter size={24} className='text-primary cursor-pointer' />
                        <Instagram size={24} className='text-primary cursor-pointer' />
                        <Linkedin size={24} className='text-primary cursor-pointer' />
                    </div>
                </div>

                {/* Info Sections */}
                <div className='grid grid-cols-3 gap-12'>
                    {/* Address */}
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-primary font-bold text-sm uppercase'>Address</h3>
                        <div className='text-gray-700 text-sm space-y-1'>
                            <p>Mussafah,</p>
                            <p>Industrial Area of Abu Dhabi (ICAD1),</p>
                            <p>P.O.Box 112231,</p>
                            <p>Abu Dhabi, UAE</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-primary font-bold text-sm uppercase'>Phone</h3>
                        <div className='text-gray-700 text-sm'>
                            <p>+971 2 550 3240</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-primary font-bold text-sm uppercase'>Email</h3>
                        <div className='text-gray-700 text-sm'>
                            <p>info@unioncopper.ae</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className='flex justify-center gap-8 pt-6 border-t border-gray-200'>
                    <a href="#" className='text-primary font-medium text-sm hover:text-opacity-80'>Home</a>
                    <a href="#" className='text-primary font-medium text-sm hover:text-opacity-80'>About us</a>
                    <a href="#" className='text-primary font-medium text-sm hover:text-opacity-80'>Products</a>
                    <a href="#" className='text-primary font-medium text-sm hover:text-opacity-80'>Logistics</a>
                    <a href="#" className='text-primary font-medium text-sm hover:text-opacity-80'>Contact Us</a>
                </div>
            </div>
        </div>
    )
}