import { useWishlist } from '../hooks/useWishlist';
import { ProductCard } from '../components/ui/ProductCard';
import { Link } from 'react-router-dom';
import '../styles/wishlist.css';

export const WishlistPage = () => {
    const { wishlistItems } = useWishlist();

    if (wishlistItems.length === 0) {
        return (
            <main className="wishlist-empty-state">
                <h2>Tu Lista de Deseos está vacía</h2>
                <p>
                    Guarda tus piezas favoritas pulsando sobre el corazón.
                </p>
                <Link to="/" className="btn-jewelry-primary">
                    Ver Colecciones
                </Link>
            </main>
        );
    }

    return (
        <main className="catalog-container">
            <header className="wishlist-header">
                <h1>Mis Favoritos</h1>
            </header>

            <section className="catalog-grid">
                {wishlistItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </section>
        </main>
    );
};