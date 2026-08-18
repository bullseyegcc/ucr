import { getProducts } from "../../lib/wordpress/products";
import ProductsPageClient from "./ProductsPageClient";

export default async function ProductsPage() {
    const products = await getProducts();
    return <ProductsPageClient products={products} />;
}
