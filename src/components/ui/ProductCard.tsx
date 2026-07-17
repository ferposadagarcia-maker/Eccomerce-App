// src/components/ui/ProductCard.tsx
import type { Product } from '../../types/product.types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <article className="product-card">
            <img
                src={product.imageUrl || 'https://via.placeholder.com/300'}
                alt={product.name}
            />
            <div className="product-card-body">
                <div>
                    <span>{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                </div>

                <div className="product-card-footer">
                    <strong>${product.price.toLocaleString()}</strong>
                    <button>Añadir</button>
                </div>
            </div>
        </article>
    );
};