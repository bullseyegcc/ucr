import { getPosts } from "../../lib/wordpress/posts";
import BlogsPageClient from "./BlogsPageClient";

export default async function BlogsPage() {
    const posts = await getPosts();
    return <BlogsPageClient posts={posts} />;
}
