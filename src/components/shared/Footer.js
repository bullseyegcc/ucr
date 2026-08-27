import Image from "next/image";
import Link from "next/link";
import { Linkedin, Youtube } from "lucide-react";
import { VideoPlayer } from "@/common/video";
import { socialLinks } from "@/assets/social-links";

const socialIcons = {
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

export default function Footer() {
  return (
    <div className="relative lg:mb-0 min-h-[50vh] lg:min-h-[90vh] flex flex-col justify-end items-center pt-20 lg:pt-0 overflow-x-hidden overflow-y-visible lg:overflow-hidden">
      <VideoPlayer
        src="/footer.mp4"
        width={600}
        height={800}
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(250, 110, 67, 0.15) 0%, rgba(250, 110, 67, 0.15) 100%)",
        }}
      />

      <div className="relative z-10 lg:absolute lg:bottom-0 w-[90%] md:w-[80%] bg-[url(/shared/footerbg.png)] bg-cover bg-bottom rounded-t-xl p-6 sm:p-10 md:p-16 flex flex-col gap-8 sm:gap-12 pb-10 sm:pb-12 lg:pb-16">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-6 sm:gap-0">
          <div className="flex items-center">
            <Image
              src="/shared/clogo.png"
              alt="UCR Logo"
              width={160}
              height={45}
              className="sm:w-[180px] sm:h-[50px] object-contain"
            />
          </div>
          <div className="flex gap-4">
            {socialLinks.map(({ label, href }) => {
              const Icon = socialIcons[label];
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-none text-primary transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary hover:scale-110"
                >
                  <Icon
                    size={24}
                    className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white group-hover:scale-110"
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-primary font-bold text-sm uppercase">Address</h3>
            <div className="font-['Helvetica Now Display'] font-medium text-gray-700 space-y-1 text-[18px] leading-[29.4px] tracking-[-1.05px] align-middle">
              <p>Mussafah,</p>
              <p>Industrial Area of Abu Dhabi (ICAD1),</p>
              <p>P.O.Box 112231,</p>
              <p>Abu Dhabi, UAE</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-primary font-bold text-sm uppercase">Phone</h3>
            <div className="text-gray-700 text-sm">
              <p className="font-medium text-[18px]">+971 2 550 3241</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-primary font-bold text-sm uppercase">Email</h3>
            <div className="font-medium text-gray-700 text-sm">
              <p className="text-[18px]">info@unioncopper.ae</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 my-2 lg:hidden order-3">
          <div className="flex flex-col gap-4">
            <h3 className="text-primary font-bold text-xs uppercase">Address</h3>
            <div className="font-['Helvetica Now Display'] font-medium text-gray-700 space-y-1 text-[15px] leading-[24px] tracking-[-0.8px] align-middle">
              <p>Mussafah,</p>
              <p>Industrial Area of Abu Dhabi (ICAD1),</p>
              <p>P.O.Box 112231,</p>
              <p>Abu Dhabi, UAE</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-primary font-bold text-xs uppercase">Phone</h3>
            <div className="text-gray-700 text-sm">
              <p className="font-medium text-sm">+971 2 550 3240</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-primary font-bold text-xs uppercase">Email</h3>
            <div className="font-medium text-gray-700 text-sm">
              <p className="text-sm">info@unioncopper.ae</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4 lg:gap-12 pt-6 lg:pt-8 border-t border-gray-200 lg:border-t-0 order-4 lg:order-none">
          <Link href="/" className="text-center">
            <span className="text-primary font-normal text-[20px] leading-[30px] tracking-[-1px] lg:text-[24.51px] lg:leading-[37.22px] lg:tracking-[-1.33px] align-middle">
              Home
            </span>
          </Link>
          <div className="hidden lg:block w-px bg-gray-300"></div>
          <Link href="/aboutus" className="text-center">
            <span className="text-primary font-normal text-[20px] leading-[30px] tracking-[-1px] lg:text-[24.51px] lg:leading-[37.22px] lg:tracking-[-1.33px] align-middle">
              About us
            </span>
          </Link>
          <div className="hidden lg:block w-px bg-gray-300"></div>
          <Link href="/products" className="text-center">
            <span className="text-primary font-normal text-[20px] leading-[30px] tracking-[-1px] lg:text-[24.51px] lg:leading-[37.22px] lg:tracking-[-1.33px] align-middle">
              Products
            </span>
          </Link>
          <div className="hidden lg:block w-px bg-gray-300"></div>
          <Link href="/logistics" className="text-center">
            <span className="text-primary font-normal text-[20px] leading-[30px] tracking-[-1px] lg:text-[24.51px] lg:leading-[37.22px] lg:tracking-[-1.33px] align-middle">
              Logistics
            </span>
          </Link>
          <div className="hidden lg:block w-px bg-gray-300"></div>
          <Link href="/contactus" className="text-center">
            <span className="text-primary font-normal text-[20px] leading-[30px] tracking-[-1px] lg:text-[24.51px] lg:leading-[37.22px] lg:tracking-[-1.33px] align-middle">
              Contact Us
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
