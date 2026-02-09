import badge_icon from '../../../public/badge.png';
import Image from 'next/image';

export default function Badge({ title }) {
    return (
        <div className="flex gap-3 text-white z-300">   
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='object-contain' />
            <span className='text-lg text-primary uppercase'>{title}</span>
        </div>
    )
}