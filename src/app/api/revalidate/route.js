import { timingSafeEqual } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { WP_CACHE_TAGS } from "../../../lib/wordpress/tags";

const SLUG_PATTERN = /^[a-z0-9-]+$/;

function unauthorized() {
  return Response.json({ message: "Unauthorized" }, { status: 401 });
}

function secretsMatch(provided, expected) {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  if (providedBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export async function POST(request) {
  const expected = process.env.REVALIDATE_SECRET || "";
  const header = request.headers.get("authorization") || "";
  const provided = header.startsWith("Bearer ") ? header.slice(7).trim() : "";

  if (!expected || !provided || !secretsMatch(provided, expected)) {
    console.error(expected ? "revalidate_unauthorized" : "revalidate_secret_unset");
    return unauthorized();
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const contentType = body.contentType === "product" ? "product" : "post";
  const slug = typeof body.slug === "string" && SLUG_PATTERN.test(body.slug) ? body.slug : "";

  revalidateTag(WP_CACHE_TAGS.ALL, "max");
  revalidatePath("/");

  if (contentType === "product") {
    revalidateTag(WP_CACHE_TAGS.PRODUCTS, "max");
    revalidatePath("/products");
    revalidatePath("/products/[slug]", "page");
    if (slug) revalidatePath(`/products/${slug}`);
  } else {
    revalidateTag(WP_CACHE_TAGS.POSTS, "max");
    revalidatePath("/blogs");
    revalidatePath("/blogs/[slug]", "page");
    if (slug) revalidatePath(`/blogs/${slug}`);
  }

  return Response.json({
    revalidated: true,
    contentType,
    slug: slug || null,
  });
}

export function GET() {
  return Response.json({ message: "Method not allowed" }, { status: 405 });
}
