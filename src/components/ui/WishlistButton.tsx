import { useWishlist } from '../../hooks/useWishlist';
import type { Product } from '../../types/product.types';

interface WishlistButtonProps {
    product: Product;
}

export const WishlistButton = ({ product }: WishlistButtonProps) => {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isFavorite = isInWishlist(product.id);

    return (
        <button
            onClick={() => toggleWishlist(product)}
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            style={{
                fontSize: '1.2rem',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
            }}
        >
            {isFavorite ? "♥️" : "💛"}
        </button>
    );
};