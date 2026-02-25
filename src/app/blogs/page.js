'use client'

import Image from "next/image";
import Link from "next/link";
import { Badgetextwhite } from "../../common/badge";
import { blogs } from "../../assets/blogs";
import ParallaxSection from "../../animations/ParallaxSection";
import CardAnimation from "../../animations/CardAnimation";
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";

export default function BlogsPage() {
    const featured = blogs.slice(0, 3);
    const others = blogs.slice(3);

    return (
        <div>
            <div className="rouned-b-2xl flex flex-col text-center min-h-[80vh] items-center justify-center font-sans dark:bg-black gap-6" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/blogsbg.png') lightgray 50% / cover no-repeat" }}>
                <SlideIn direction="bottom" duration={0.8} delay={0} className="text-[#FA6E43] text-sm font-semibold uppercase tracking-widest">
                    <Badgetextwhite title="Things to Read" />                
                </SlideIn>
                <FadeIn className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white w-[80%]" duration={0.4} delay={0}>

                    News
                </FadeIn>
            </div>

            <ParallaxSection index={0}>
                <div className="min-h-screen px-10 py-20">

                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 mb-12 lg:mb-16 leading-tight">
                        <div>
                            <p className="uppercase text-[#FA6E43] text-xs lg:text-lg font-medium uppercase tracking-widest mb-3 lg:mb-4">Our Blogs</p>
                            <h2 className="text-3xl lg:text-4xl lg:text-6xl font-medium text-black leading-tight">Latest News & Insights</h2>
                        </div>
                        <div className="flex items-start self-center">
                            <p className="w-[50%] text-gray-700 text-sm lg:text-xl font-light leading-relaxed  lg:text-left max-w-lg leading-tight ml-auto">Dive deep into fresh ideas, expert advice,
                                and behind-the-scenes thinking.</p>
                        </div>
                    </div>

                    {/* Blogs */}
                    <div className="w-full  lg:px-10 pt-20">
                        {/* Desktop-only 4-column grid: left large spans 2 cols x 2 rows; two top-right cards in cols 3-4 */}
                        <div className="grid gap-6 lg:grid-cols-4 lg:auto-rows-min">
                            {featured[0] && (
                                <CardAnimation index={0} className="hidden lg:block lg:col-span-2 lg:row-span-2">
                                    <Link href={`/blogs/${featured[0].slug}`} className="block bg-white rounded-xl overflow-hidden shadow">
                                        <article>
                                            <Image src={featured[0].image} alt={featured[0].title} width={1600} height={1000} className="w-full h-[360px] object-cover" />
                                            <div className="p-6">
                                                <p className="text-sm text-gray-500">{featured[0].date}</p>
                                                <h3 className="text-2xl font-semibold mt-3">{featured[0].title}</h3>
                                                <p className="text-base text-gray-600 mt-3">{featured[0].excerpt}</p>
                                            </div>
                                        </article>
                                    </Link>
                                </CardAnimation>
                            )}

                            {/** two top-right featured cards (desktop) */}
                            {featured.slice(1, 3).map((post, index) => (
                                <CardAnimation index={index + 1} key={post.id} className="hidden lg:block">
                                    <Link href={`/blogs/${post.slug}`} className="block bg-white rounded-xl overflow-hidden shadow">
                                        <article>
                                            <Image src={post.image} alt={post.title} width={1200} height={800} className="w-full h-[320px] object-cover" />
                                            <div className="p-4">
                                                <p className="text-sm text-gray-500">{post.date}</p>
                                                <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
                                                <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>
                                            </div>
                                        </article>
                                    </Link>
                                </CardAnimation>
                            ))}

                            {/* Fallback for smaller screens: stacked featured cards */}
                            <div className="lg:hidden grid gap-6">
                                {featured.map((post) => (
                                    <Link href={`/blogs/${post.slug}`} key={post.id} className="block bg-white rounded-xl overflow-hidden shadow">
                                        <article>
                                            <Image src={post.image} alt={post.title} width={1200} height={700} className="w-full h-56 object-cover" />
                                            <div className="p-4">
                                                <p className="text-xs text-gray-500">{post.date}</p>
                                                <h3 className="text-lg font-semibold mt-1">{post.title}</h3>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Smaller cards row (desktop 3 columns) */}
                        <div className="grid gap-6 lg:grid-cols-3 mt-8">
                            {others.map((post, index) => (
                                <CardAnimation index={index + 3} key={post.id}>
                                    <Link href={`/blogs/${post.slug}`} className="block bg-white rounded-xl overflow-hidden shadow group cursor-pointer transition-all duration-400 ease-out hover:scale-105 hover:shadow-2xl">
                                        <article>
                                            <Image src={post.image} alt={post.title} width={800} height={500} className="w-full h-44 lg:h-[280px] object-cover" />
                                            <div className="p-3">
                                                <p className="text-xs text-gray-500">{post.date}</p>
                                                <h4 className="text-sm lg:text-base font-semibold mt-1">{post.title}</h4>
                                            </div>
                                        </article>
                                    </Link>
                                </CardAnimation>
                            ))}
                        </div>
                    </div>


                </div>
            </ParallaxSection>
        </div>
    )
}
