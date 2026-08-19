import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts, getPostSlugs } from "../../../lib/wordpress/posts";
import { Badgetextwhite } from "../../../common/badge";
import Link from "next/link";
import FadeIn from "../../../animations/FadeIn";
import { ArrowRight, Calendar } from "lucide-react";
import BlogShare from "./BlogShare";

const FALLBACK_IMAGE = "/blogsbg.png";

export async function generateStaticParams() {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: "News" };
    return {
        title: post.title,
        description: post.excerpt,
    };
}

function authorInitials(name) {
    const parts = (name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "U";
    return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default async function BlogDetail({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return notFound();

    const related = (await getPosts())
        .filter((item) => item.slug !== post.slug)
        .slice(0, 3);

    return (
        <div>
            <div className="rouned-b-2xl flex flex-col text-center min-h-[80vh] items-center justify-center   dark:bg-black gap-6" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/blogsbg.png') lightgray 50% / cover no-repeat" }}>
                <Badgetextwhite title="Things to Read" />
                <FadeIn className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white w-[80%]">
                    News Details
                </FadeIn>
            </div>
            <div className="px-8 lg:px-10 py-8 lg:py-12">
                <div className="w-full flex flex-col items-center">
                    <div className="w-full mb-8 flex flex-col lg:flex-row lg:justify-between gap-6 items-start">
                        <div className="w-full lg:w-[50%]">
                            <p className="text-xs font-semibold text-[#FA6E43] uppercase tracking-widest mb-3">Blog Details</p>
                            <div className=" rounded-lg  mb-4 inline-block">
                                <h1 className="   font-medium text-[32px] lg:text-[72px] leading-[48px] lg:leading-[80px] tracking-[-1.4px] lg:tracking-[-2.88px] align-middle capitalize">
                                    {post.title}
                                </h1>
                            </div>

                        </div>

                        <div className="lg:w-[35%] self-end rounded-3xl lg:p-6 bg-white">
                            <p className="   font-medium text-[20px] leading-[28px] tracking-[-0.2px] text-gray-700 align-middle">
                                {post.excerpt || "Explore the latest insights and stories from our team."}
                            </p>
                        </div>
                    </div>

                    <div className="w-full max-w-3xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2 mb-8">
                        <div className="flex flex-wrap items-center gap-5">
                            <div className="flex items-center gap-3">
                                {post.authorImage ? (
                                    <Image
                                        src={post.authorImage}
                                        alt={post.author || "Author"}
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6A00] text-sm font-medium text-white">
                                        {authorInitials(post.author)}
                                    </div>
                                )}
                                <span className="font-medium text-[16px] leading-[24px] text-[#4B4B4B]">
                                    {post.author || "UCR"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-[#6F6F6F]">
                                <Calendar size={18} />
                                <span className="font-medium text-[16px] leading-[24px]">{post.date}</span>
                            </div>
                        </div>
                        <BlogShare title={post.title} />
                    </div>

                    {post.image && (
                        <div className="mb-10 w-full max-w-4xl overflow-hidden rounded-2xl">
                            <Image
                                src={post.image}
                                alt={post.title}
                                width={1400}
                                height={600}
                                className="w-full h-auto max-h-[70vh] object-cover"
                            />
                        </div>
                    )}

                    <article
                        className="wp-content w-full max-w-3xl"
                        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />
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
                        {related.map((item, i) => {
                            const isHero = i === 0;
                            return (
                                <Link key={item.slug} href={`/blogs/${item.slug}`} className={`${isHero ? 'lg:col-span-2 lg:row-span-2' : 'col-span-1'} group block`}>
                                    <div className={`rounded overflow-hidden shadow-sm bg-white ${isHero ? '' : ''}`}>
                                        <div className={`${isHero ? 'h-72 lg:h-[360px]' : 'h-44 lg:h-48'} w-full overflow-hidden`}>
                                            <Image src={item.image || FALLBACK_IMAGE} alt={item.title} width={1200} height={700} className="w-full h-full object-cover transition-transform duration-300" />
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
                        <Link href="/blogs" className="inline-flex items-center justify-center gap-2 bg-[#FA6E43] hover:bg-[#ff8a5c] text-white w-[207px] h-[70px] px-6 py-3 rounded-full  font-normal text-[20px] leading-[29.4px] tracking-[-0.88px] text-center align-middle">
                            View all news
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
