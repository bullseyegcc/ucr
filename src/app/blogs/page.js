import { getPosts } from "../../lib/wordpress/posts";
import BlogsListingSection from "../../components/blogs/BlogsListingSection";
import Hero from "@/components/shared/Hero";

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <div>
      <Hero
        badge="Things to Read"
        title="News"
        titleVariant="blogs"
        titleDirectFade
        badgeSlideClassName="text-[#FA6E43] text-[0.875rem] font-semibold uppercase tracking-[0.1em]"
        className="rounded-b-2xl dark:bg-black"
        background={{
          type: "image-inline",
          style: {
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/blogs/blogsbg.png') lightgray 50% / cover no-repeat",
          },
        }}
      />

      <BlogsListingSection posts={posts} />
    </div>
  );
}
