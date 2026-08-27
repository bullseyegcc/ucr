import badge_icon from '../../public/shared/badge.png';
import white_badge_icon from '../../public/shared/badge-w.png';

import Image from 'next/image';

export  function Badge({ title }) {
    return (
        <div className="flex items-start gap-2 text-white z-0 lg:gap-[0.75rem]">   
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='h-4 w-4 shrink-0 object-contain lg:h-[1.5rem] lg:w-[1.5rem]' />
            <span className='text-primary uppercase text-sm lg:text-[1.125rem] tracking-[0.1em]'>{title}</span>
        </div>
    )
}

export function WhiteBadge({ title, className = '' }) {
    return (
        <div className={`inline-flex max-w-full items-start gap-2 text-white z-10 lg:gap-2.5 ${className}`}>   
            <Image src={white_badge_icon} alt="" width={20} height={20} className='mt-0.5 h-4 w-4 shrink-0 object-contain lg:h-5 lg:w-5' />
            <span className='text-left text-white uppercase text-sm lg:text-base tracking-[0.1em] font-normal leading-snug'>{title}</span>
        </div>
    )
}

export function Badgetextwhite({ title }) {
    return (
        <div className="inline-flex items-center gap-2 text-white z-300 lg:gap-[0.75rem]">   
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='h-4 w-4 shrink-0 object-contain lg:h-[1.5rem] lg:w-[1.5rem]' />
            <span className='text-white uppercase font-medium text-sm lg:text-[1.125rem] tracking-[0.1em]'>{title}</span>
        </div>
    )
}

export function Badgetextblack({ title }) {
    return (
        <div className="inline-flex gap-2 text-black z-300 lg:gap-3">   
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='h-4 w-4 shrink-0 object-contain lg:h-[1.5rem] lg:w-[1.5rem]' />
            <span className='uppercase font-medium text-sm lg:text-lg tracking-[0.1em]'>{title}</span>
        </div>
    )
}
