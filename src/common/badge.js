import badge_icon from '../../public/badge.png';
import white_badge_icon from '../../public/badge-w.png';

import Image from 'next/image';

export  function Badge({ title }) {
    return (
        <div className="flex items-start gap-3 text-white z-0">   
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='object-contain' />
            <span className='text-primary uppercase'>{title}</span>
        </div>
    )
}

export function WhiteBadge({ title, className = '' }) {
    return (
        <div className={`flex items-center gap-2.5 text-white z-10 ${className}`}>   
            <Image src={white_badge_icon} alt="" width={20} height={20} className='object-contain shrink-0' />
            <span className='text-white uppercase text-xs sm:text-sm tracking-[0.08em] font-normal'>{title}</span>
        </div>
    )
}

export function Badgetextwhite({ title }) {
    return (
        <div className="inline-flex items-center gap-3 text-white z-300">   
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='object-contain' />
            <span className='text-white uppercase font-medium text-sm lg:text-base'>{title}</span>
        </div>
    )
}

export function Badgetextblack({ title }) {
    return (
        <div className="inline-flex gap-3 text-black z-300">   
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='object-contain' />
            <span className=' uppercase font-medium'>{title}</span>
        </div>
    )
}
