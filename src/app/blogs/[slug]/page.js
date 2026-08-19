import { notFound } from "next/navigation";
import { getPostBySlug, getPosts, getPostSlugs } from "../../../lib/wordpress/posts";
import BlogDetailClient from "../../../components/blogs/BlogDetailClient";
import RelatedBlogs from "../../../components/blogs/RelatedBlogs";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Blog Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
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
      <BlogDetailClient post={post} />
      <RelatedBlogs posts={related} />
    </div>
  );
}
