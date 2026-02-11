import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import coppericon from '../../../public/coppericon.png';
import badge_icon from '../../../public/badge.png';

export default function FeaturedProducts() {
  return (
    <div className="h-[90vh] rounded-xl mx-10 bg-[url('/fp.png')] bg-cover">
      <div className="relative top-8 bottom-5 bg-white p-8 flex flex-col gap-26 w-[45%] max-h-[90%] min-h-[90%] mx-10 rounded-xl">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 text-white z-300">
            <Image src={badge_icon} alt="Badge Icon" width={24} height={24} className='object-contain' />
            <span className='text-black uppercase'>Featured Products</span>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl text-primary mt-5">
              Copper Rods and Wires
              <Image src={coppericon} alt="Badge Icon" width={50} height={50} className='object-contain inline-block ml-3' />
            </h1>

            <h1 className="text-4xl text-secondary my-2">Cooper Sheets</h1>
            <h1 className="text-4xl text-secondary my-2">Customized components</h1>
          </div>
        </div>

        <button className="w-50 flex gap-2 justify-between text-primary text-lg items-center border border-primary rounded-full px-5 py-3">Know More <ArrowRight size={18} className="text-primary" /></button>

        <div className="flex gap-2 mt-6 absolute bottom-5 left-5">
          <div className="w-6 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
