import BlogsListingSection from "./BlogsListingSection";

export default function RelatedBlogs({ posts }) {
  return <BlogsListingSection posts={posts} limit={3} showViewAll />;
}
