import { revalidatePath, revalidateTag } from "next/cache";
import { WP_CACHE_TAGS } from "../../../lib/wordpress/tags";

function unauthorized() {
  return Response.json({ message: "Unauthorized" }, { status: 401 });
}

function getProvidedSecret(request, body) {
  const header = request.headers.get("authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const fromQuery = new URL(request.url).searchParams.get("secret") || "";
  return bearer || body?.secret || fromQuery;
}

export async function POST(request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return Response.json(
      { message: "REVALIDATE_SECRET is not set" },
      { status: 500 }
    );
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (getProvidedSecret(request, body) !== expected) {
    return unauthorized();
  }

  const contentType = body.contentType === "product" ? "product" : "post";
  const slug = typeof body.slug === "string" ? body.slug : "";

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
