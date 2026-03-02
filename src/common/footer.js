import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { WhiteBadge } from "./badge";
import { VideoPlayer } from "./video";

export default function Footer() {
    return (
        <div className='relative lg:mb-0 min-h-[50vh] lg:min-h-[90vh] flex flex-col justify-end items-center pt-20 lg:pt-0'>

            <div className='relative w-full h-[40vh] lg:h-full'>
                <VideoPlayer src="/footer.mp4" width={600} height={800} className='w-full h-full object-cover' />
                <div className='absolute inset-0' style={{ background: "linear-gradient(0deg, rgba(250, 110, 67, 0.15) 0%, rgba(250, 110, 67, 0.15) 100%)" }}></div>
            </div>


            <div className='relative md:absolute md:-bottom-[0%] w-full md:w-[80%] bg-[url(/footerbg.png)] bg-cover bg-bottom rounded-t-xl p-6 sm:p-10 md:p-16 flex flex-col gap-8 sm:gap-12'>
                {/* Header Section */}
                <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-6 sm:gap-0'>
                    <div className='flex items-center'>
                        <Image src="/clogo.png" alt="UCR Logo" width={250} height={70} className='sm:w-[300px] sm:h-[90px] object-contain' />
                    </div>
                    <div className='flex gap-4'>
                        <Facebook size={24} className='text-primary cursor-pointer' />
                        <Twitter size={24} className='text-primary cursor-pointer' />
                        <Instagram size={24} className='text-primary cursor-pointer' />
                        <Linkedin size={24} className='text-primary cursor-pointer' />
                    </div>
                </div>

                {/* Info Sections */}
                <div className='hidden lg:grid grid-cols-3 gap-12'>
                    {/* Address */}
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-primary font-bold text-sm uppercase'>Address</h3>
                        <div
                            className="font-['Helvetica Now Display'] font-medium text-gray-700 space-y-1 text-[18px] leading-[29.4px] tracking-[-1.05px] align-middle"
                        >
                            <p>Mussafah,</p>
                            <p>Industrial Area of Abu Dhabi (ICAD1),</p>
                            <p>P.O.Box 112231,</p>
                            <p>Abu Dhabi, UAE</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-primary font-bold text-sm uppercase'>Phone</h3>
                        <div className=' text-gray-700 text-sm'>
                            <p className="font-medium text-[18px]">+971 2 550 3240</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-primary font-bold text-sm uppercase'>Email</h3>
                        <div className='font-medium text-gray-700 text-sm'>
                            <p className="text-[18px]">info@unioncopper.ae</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className='flex flex-col lg:flex-row lg:justify-center gap-4 lg:gap-12 pt-6 lg:pt-8 border-t border-gray-200'>
                    <Link href="/" className='text-center'>
                        <span className="text-primary font-normal text-[24.51px] leading-[37.22px] tracking-[-1.33px] align-middle">Home</span>
                    </Link>
                    <div className='hidden lg:block w-px bg-gray-300'></div>
                    <Link href="/aboutus" className='text-center'>
                        <span className="text-primary font-normal text-[24.51px] leading-[37.22px] tracking-[-1.33px] align-middle">About us</span>
                    </Link>
                    <div className='hidden lg:block w-px bg-gray-300'></div>
                    <Link href="/products" className='text-center'>
                        <span className="text-primary font-normal text-[24.51px] leading-[37.22px] tracking-[-1.33px] align-middle">Products</span>
                    </Link>
                    <div className='hidden lg:block w-px bg-gray-300'></div>
                    <Link href="/logistics" className='text-center'>
                        <span className="text-primary font-normal text-[24.51px] leading-[37.22px] tracking-[-1.33px] align-middle">Logistics</span>
                    </Link>
                    <div className='hidden lg:block w-px bg-gray-300'></div>
                    <Link href="/contactus" className='text-center'>
                        <span className="text-primary font-normal text-[24.51px] leading-[37.22px] tracking-[-1.33px] align-middle">Contact Us</span>
                    </Link>
                </div>

                {/* Info Sections */}
                <div className='flex flex-col gap-3 my-4 lg:hidden '>
                    {/* Address */}
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-primary font-bold text-sm uppercase'>Address</h3>
                        <div
                            className="font-['Helvetica Now Display'] font-medium text-gray-700 space-y-1 text-[18px] leading-[29.4px] tracking-[-1.05px] align-middle"
                        >
                            <p>Mussafah,</p>
                            <p>Industrial Area of Abu Dhabi (ICAD1),</p>
                            <p>P.O.Box 112231,</p>
                            <p>Abu Dhabi, UAE</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-primary font-bold text-sm uppercase'>Phone</h3>
                        <div className=' text-gray-700 text-sm'>
                            <p className="font-medium text-base">+971 2 550 3240</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-primary font-bold text-sm uppercase'>Email</h3>
                        <div className='font-medium text-gray-700 text-sm'>
                            <p className="text-base">info@unioncopper.ae</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
