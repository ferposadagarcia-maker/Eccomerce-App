import { ProductCard } from "./ProductCard";
import type { Product } from "../../types/product.types";

interface ProductGridProps {
    products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <section className="catalog-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </section>
    );
};