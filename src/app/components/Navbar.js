import { Menu,  ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const Navbar = () => {
    return(
        <div className="absolute top-0 left-0 w-full h-20 bg-secondary/20  flex flex-row-reverse md:flex-row items-center justify-between px-9 md:px-10 z-50">

            <div className='inline-block  bg-secondary/20 p-2 rounded-lg' >
                <Menu size={28} color="white" />
            </div>

            <Image src="/logo.png" alt="Logo" width={100} height={100} className='object-contain md:absolute left-1/2 md:-translate-x-1/2' />

            <button className=' z-90 hidden  md:flex items-center gap-2 w-40 text-white border  border-secondary rounded-2xl px-3 py-2 justify-between'>Contact Us <ArrowRight size={18} color='white' /></button>
        </div>
    )
}