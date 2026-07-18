import type { Product } from '../../types/product.types';
import { WishlistButton } from './WishlistButton';
import { useCart } from '../../hooks/useCart';


interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <WishlistButton product={product} />

                        <button onClick={() => addToCart(product)}>
                            Añadir
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};  