'use client'

import { Badgetextwhite } from "../../common/badge";
import { blogs } from "../../assets/blogs";
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";
import BlogsListingSection from "../../components/blogs/BlogsListingSection";

export default function BlogsPage() {
    return (
        <div>
            <div className="rounded-b-2xl flex flex-col text-center min-h-[60vh] lg:min-h-[80vh] items-center justify-center   dark:bg-black gap-6" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/blogsbg.png') lightgray 50% / cover no-repeat" }}>
                <SlideIn direction="bottom" duration={0.8} delay={0} className="text-[#FA6E43] text-sm font-semibold uppercase tracking-widest">
                    <Badgetextwhite title="Things to Read" />
                </SlideIn>
                <FadeIn className="font-medium text-[32px] leading-[48px] tracking-[-2.74px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white w-[80%]" duration={0.4} delay={0}>

                    News
                </FadeIn>
            </div>

            <BlogsListingSection posts={blogs} />
        </div>
    )
}
