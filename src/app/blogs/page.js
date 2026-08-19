'use client'

import { blogs } from "../../assets/blogs";
import BlogsListingSection from "../../components/blogs/BlogsListingSection";
import Hero from "@/components/shared/Hero";

export default function BlogsPage() {
    return (
        <div>
            <Hero
                badge="Things to Read"
                title="News"
                titleVariant="blogs"
                titleClassName="w-[80%]"
                titleDirectFade
                badgeSlideClassName="text-[#FA6E43] text-[0.875rem] font-semibold uppercase tracking-[0.1em]"
                className="rounded-b-2xl dark:bg-black"
                background={{
                    type: "image-inline",
                    style: {
                        background:
                            "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/blogsbg.png') lightgray 50% / cover no-repeat",
                    },
                }}
            />

            <BlogsListingSection posts={blogs} />
        </div>
    )
}

