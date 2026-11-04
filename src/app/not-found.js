import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      data-solid-nav
      className="flex min-h-[100svh] flex-col items-center justify-center bg-white px-5 pb-24 pt-24 text-center sm:px-8 sm:pt-28"
    >
      <Image
        src="/404.png"
        alt="404"
        width={3836}
        height={1828}
        priority
        className="h-auto w-full max-w-[280px] sm:max-w-[480px] lg:max-w-[640px]"
      />
      <p className="mt-8 font-primary text-xl font-medium tracking-[-0.02em] text-[#1a1a1a] sm:mt-10 sm:text-2xl lg:text-[28px]">
        Sorry! This page can&apos;t be found
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#ff7a33] sm:mt-10 sm:px-7 sm:py-3 sm:text-base"
      >
        Back to homepage
        <ArrowRight size={18} aria-hidden />
      </Link>
    </main>
  );
}
