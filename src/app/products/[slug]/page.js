import { notFound } from "next/navigation";
import { getProductBySlug, getProductSlugs } from "../../../lib/wordpress/products";
import ProductDetailView from "./ProductDetailView";

export async function generateStaticParams() {
    const slugs = await getProductSlugs();
    return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return { title: "Products" };
    return {
        title: product.name,
        description: product.description,
    };
}

export default async function ProductDetail({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return notFound();
    return <ProductDetailView product={product} />;
}
