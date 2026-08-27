import { wpRequest } from "./client";
import { WP_CACHE_TAGS } from "./tags";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCT_SLUGS,
} from "./queries/products";
import { mapProduct } from "./mappers";

const PRODUCT_TAGS = [WP_CACHE_TAGS.PRODUCTS];

/** Leading number from SKU like "01/05" → 1; missing SKU sorts last. */
function skuSortKey(sku) {
  const match = String(sku || "").match(/^(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

export async function getProducts() {
  try {
    const data = await wpRequest(GET_PRODUCTS, { first: 100 }, PRODUCT_TAGS);
    return (data.products?.nodes || [])
      .map(mapProduct)
      .filter(Boolean)
      .sort((a, b) => {
        const bySku = skuSortKey(a.sku) - skuSortKey(b.sku);
        if (bySku !== 0) return bySku;
        return Number(b.featured) - Number(a.featured);
      });
  } catch (error) {
    console.error("Failed to fetch WordPress products", error);
    return [];
  }
}

export async function getProductBySlug(slug) {
  try {
    const data = await wpRequest(GET_PRODUCT_BY_SLUG, { slug }, PRODUCT_TAGS);
    return mapProduct(data.product);
  } catch (error) {
    console.error("Failed to fetch WordPress product", slug, error);
    return null;
  }
}

export async function getProductSlugs() {
  try {
    const data = await wpRequest(GET_PRODUCT_SLUGS, { first: 100 }, PRODUCT_TAGS);
    return (data.products?.nodes || []).map((node) => node.slug).filter(Boolean);
  } catch (error) {
    console.error("Failed to fetch WordPress product slugs", error);
    return [];
  }
}
