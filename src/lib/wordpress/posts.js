import { wpRequest } from "./client";
import { WP_CACHE_TAGS } from "./tags";
import {
  GET_POSTS,
  GET_POSTS_BASIC,
  GET_POST_BY_SLUG,
  GET_POST_BY_SLUG_BASIC,
  GET_POST_SLUGS,
} from "./queries/posts";
import { mapPost } from "./mappers";

const POST_TAGS = [WP_CACHE_TAGS.POSTS];

const SKIP_SLUGS = new Set(["hello-world"]);

export async function getPosts() {
  try {
    const data = await wpRequest(GET_POSTS, { first: 100 }, POST_TAGS);
    return (data.posts?.nodes || [])
      .map(mapPost)
      .filter((post) => post && !SKIP_SLUGS.has(post.slug));
  } catch {
    try {
      const data = await wpRequest(GET_POSTS_BASIC, { first: 100 }, POST_TAGS);
      return (data.posts?.nodes || [])
        .map(mapPost)
        .filter((post) => post && !SKIP_SLUGS.has(post.slug));
    } catch (error) {
      console.error("Failed to fetch WordPress posts", error);
      return [];
    }
  }
}

export async function getPostBySlug(slug) {
  try {
    if (SKIP_SLUGS.has(slug)) return null;
    try {
      const data = await wpRequest(GET_POST_BY_SLUG, { slug }, POST_TAGS);
      return mapPost(data.post);
    } catch {
      const data = await wpRequest(GET_POST_BY_SLUG_BASIC, { slug }, POST_TAGS);
      return mapPost(data.post);
    }
  } catch (error) {
    console.error("Failed to fetch WordPress post", slug, error);
    return null;
  }
}

export async function getPostSlugs() {
  try {
    const data = await wpRequest(GET_POST_SLUGS, { first: 100 }, POST_TAGS);
    return (data.posts?.nodes || [])
      .map((node) => node.slug)
      .filter((slug) => slug && !SKIP_SLUGS.has(slug));
  } catch (error) {
    console.error("Failed to fetch WordPress post slugs", error);
    return [];
  }
}
