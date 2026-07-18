import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

export const MainLayout = () => {
    const { user, logout } = useAuth();
    const { items } = useCart();
    const { wishlistItems } = useWishlist();

    const totalQuantityCart = items.reduce((total, item) => total + item.quantity, 0);
    const totalFavorites = wishlistItems.length;

    return (
        <div className="app-shell">
            <header className="main-header">
                <div className="header-container">
                    <Link to="/" className="brand-logo">
                        AUREA JOYAS
                    </Link>

                    <nav className="header-nav">
                        <Link to="/">Catálogo</Link>
                        <Link to="/cart" style={{ fontWeight: 500 }}>
                            🛒 ({totalQuantityCart})
                        </Link>
                        <Link to="/wishlist" style={{ fontWeight: 500 }}>
                            ♡ ({totalFavorites})
                        </Link>

                        {user ? (
                            <div className="user-menu">
                                <span>{user.email}</span>
                                <button onClick={logout} className="logout-btn">
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="login-btn-link">
                                Iniciar Sesión
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            {/* Aquí es donde React Router inyectará las páginas (CatalogPage, LoginPage, etc.) */}
            <div className="main-content">
                <Outlet />
            </div>

            {/* Pie de página */}
            <footer className="main-footer">
                <p>© {new Date().getFullYear()} Aurea Joyas. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};