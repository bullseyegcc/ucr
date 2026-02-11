import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { WhiteBadge } from "./badge";
import { VideoPlayer } from "./video";

export default function Footer() {
    return (
        <div className='relative min-h-[90vh] flex flex-col justify-end items-center '>
           
            <div className='relative w-full'>
                <VideoPlayer src="/footer.mp4" width={600} height={800} className='w-full h-full' />
                <div className='absolute inset-0' style={{ background: "linear-gradient(0deg, rgba(250, 110, 67, 0.15) 0%, rgba(250, 110, 67, 0.15) 100%)" }}></div>
            </div>


            <div className='absolute w-[80%] bg-white rounded-xl p-16 flex flex-col gap-12'>
                {/* Header Section */}
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <Image src="/clogo.png" alt="UCR Logo" width={300} height={90} className='object-contain' />
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
                <div className='flex justify-center gap-12 pt-8 border-t border-gray-200'>
                    <Link href="/" className='text-primary font-medium text-sm hover:text-opacity-80 transition-opacity'>Home</Link>
                    <div className='w-px bg-gray-300'></div>
                    <Link href="/aboutus" className='text-primary font-medium text-sm hover:text-opacity-80 transition-opacity'>About us</Link>
                    <div className='w-px bg-gray-300'></div>
                    <Link href="/OurValues" className='text-primary font-medium text-sm hover:text-opacity-80 transition-opacity'>Values</Link>
                    <div className='w-px bg-gray-300'></div>
                    <Link href="#" className='text-primary font-medium text-sm hover:text-opacity-80 transition-opacity'>Products</Link>
                    <div className='w-px bg-gray-300'></div>
                    <Link href="#" className='text-primary font-medium text-sm hover:text-opacity-80 transition-opacity'>Logistics</Link>
                    <div className='w-px bg-gray-300'></div>
                    <Link href="#" className='text-primary font-medium text-sm hover:text-opacity-80 transition-opacity'>Contact Us</Link>
                </div>
            </div>
        </div>
    )
}