import badge_icon from '../../../public/badge.png';
import white_badge_icon from '../../../public/badge-w.png';

import Image from 'next/image';

export  function Badge({ title }) {
    return (
        <div className="flex gap-3 text-white z-300">   
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='object-contain' />
            <span className='text-primary uppercase'>{title}</span>
        </div>
    )
}

export function WhiteBadge({ title }) {
    return (
        <div className="flex gap-3 text-white z-300">   
            <Image src={white_badge_icon} alt="Badge Icon" width={24} height={24} className='object-contain' />
            <span className='text-white uppercase'>{title}</span>
        </div>
    )
}