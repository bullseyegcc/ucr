import { notFound } from "next/navigation";
import { blogs } from "../../../assets/blogs";
import BlogDetailClient from "../../../components/blogs/BlogDetailClient";
import RelatedBlogs from "../../../components/blogs/RelatedBlogs";

export async function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogs.find((item) => item.slug === slug);

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
  const post = blogs.find((item) => item.slug === slug);

  if (!post) return notFound();

  const related = blogs.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div>
      <BlogDetailClient post={post} />
      <RelatedBlogs posts={related} />
    </div>
  );
}
