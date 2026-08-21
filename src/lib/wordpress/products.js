import { wpRequest } from "./client";
import { WP_CACHE_TAGS } from "./tags";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCT_SLUGS,
} from "./queries/products";
import { mapProduct } from "./mappers";

const PRODUCT_TAGS = [WP_CACHE_TAGS.PRODUCTS];

export async function getProducts() {
  try {
    const data = await wpRequest(GET_PRODUCTS, { first: 100 }, PRODUCT_TAGS);
    return (data.products?.nodes || [])
      .map(mapProduct)
      .filter(Boolean)
      .sort((a, b) => Number(b.featured) - Number(a.featured));
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
