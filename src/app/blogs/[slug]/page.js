import Image from "next/image";
import { notFound } from "next/navigation";
import { blogs } from "../../../assets/blogs";
import { Badgetextwhite } from "../../../common/badge";
import Link from "next/link";
import FadeIn from "../../../animations/FadeIn";

export default async function BlogDetail({ params }) {
    const { slug } = await params;
    const post = blogs.find((b) => b.slug === slug);
    if (!post) return notFound();
    const related = blogs.filter((b) => b.slug !== post.slug).slice(0, 6);

    return (
        <div>
            <div className="rouned-b-2xl flex flex-col text-center min-h-[80vh] items-center justify-center   dark:bg-black gap-6" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/blogsbg.png') lightgray 50% / cover no-repeat" }}>
                <Badgetextwhite title="Things to Read" />
                <FadeIn className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white w-[80%]">
                    News Details
                </FadeIn>
            </div>
            <div className="px-8 lg:px-10 py-8 lg:py-12">
                <div className="w-full flex flex-col items-end ">
                    {/* Header Section: Title (left) + Description Box (right) */}
                    <div className="mb-8 flex flex-col lg:flex-row lg:justify-between gap-6 items-start">
                        {/* Left: Title */}
                        <div className="w-full lg:w-[50%]">
                            <p className="text-xs font-semibold text-[#FA6E43] uppercase tracking-widest mb-3">Blog Details</p>
                            <div className=" rounded-lg  mb-4 inline-block">
                                <h1 className="   font-medium text-[32px] lg:text-[72px] leading-[48px] lg:leading-[80px] tracking-[-1.4px] lg:tracking-[-2.88px] align-middle capitalize">
                                    {post.title}
                                </h1>
                            </div>

                        </div>

                        {/* Right: Excerpt Box */}
                        <div className="lg:w-[35%] self-end rounded-3xl lg:p-6 bg-white">
                            <p className="   font-medium text-[20px] leading-[28px] tracking-[-0.2px] text-gray-700 align-middle">
                                {post.excerpt || "Explore the latest insights and stories from our team."}
                            </p>
                        </div>
                    </div>

                    <div className="self-start flex flex-col items-start gap-2 ">
                        <p className="   font-medium text-[16px] leading-[24px] tracking-[0%] text-gray-500 mb-1 mt-8 align-middle">Date: {post.date}</p>
                    </div>

                    {/* Hero Image - Full Width Compact */}
                    {post.image && (
                        <div className="h-[90vh] mb-8 w-full">
                            <Image
                                src={post.image}
                                alt={post.title}
                                width={1400}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <article className="space-y-6 text-gray-700 max-w-3xl">
                        {post.content.map((block, i) => {
                            if (block.type === "heading") {
                                return (
                                    <h2 key={i} className="   font-medium text-[20px] lg:text-[32px] leading-[32px] lg:leading-[40px] tracking-[-0.64px] text-gray-900 align-middle">
                                        {block.text}
                                    </h2>
                                );
                            }
                            if (block.type === "paragraph") {
                                return (
                                    <p key={i} className="   font-normal text-[16px] lg:text-[16px] leading-[24px] lg:leading-[24px] tracking-[-0.16px] text-gray-700 align-middle">
                                        {block.text}
                                    </p>
                                );
                            }
                            if (block.type === "image") {
                                return (
                                    <div key={i} className="rounded-lg overflow-hidden shadow-md my-6">
                                        <Image
                                            src={block.src}
                                            alt={block.alt || post.title}
                                            width={1200}
                                            height={600}
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </article>
                </div>
            </div>


            <section className="my-20">
                <div className="w-full px-10 mx-auto px-8">
                    <div className="flex  flex-col lg:flex-row gap-2 items-start justify-between mb-8">
                        <div>
                            <p className="uppercase text-[#FA6E43] text-xs lg:text-lg font-semibold uppercase tracking-widest mb-3 lg:mb-4">Our Blogs</p>

                            <h2 className="text-4xl lg:text-5xl font-bold">Latest news & insights</h2>
                        </div>
                        <p className="text-gray-500 max-w-sm">Dive deep into fresh ideas, expert advice, and behind-the-scenes thinking.</p>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-6 items-start">
                        {related.slice(0, 3).map((item, i) => {
                            const isHero = i === 0;
                            return (
                                <Link key={item.slug} href={`/blogs/${item.slug}`} className={`${isHero ? 'lg:col-span-2 lg:row-span-2' : 'col-span-1'} group block`}>
                                    <div className={`rounded overflow-hidden shadow-sm bg-white ${isHero ? '' : ''}`}>
                                        <div className={`${isHero ? 'h-72 lg:h-[360px]' : 'h-44 lg:h-48'} w-full overflow-hidden`}>
                                            <Image src={item.image} alt={item.title} width={1200} height={700} className="w-full h-full object-cover transition-transform duration-300" />
                                        </div>
                                        <div className="p-4">
                                            <p className="text-xs text-gray-400 mb-2">{item.date}</p>
                                            <h3 className={`font-semibold ${isHero ? 'text-lg lg:text-xl' : 'text-sm lg:text-base'}`}>{item.title}</h3>
                                            <p className="text-sm text-gray-500 mt-2 hidden lg:block">{item.excerpt}</p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex justify-center mt-10">
                        <Link href="/blogs" className="inline-flex items-center bg-[#FF6A00] hover:bg-[#ff7b2a] text-white px-6 py-3 rounded-full text-sm">
                            View all news
                            <span className="ml-2">→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
