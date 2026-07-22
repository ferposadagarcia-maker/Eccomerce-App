import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import "../../styles/layout.css";

export const MainLayout = () => {
    const { user, signout } = useAuth();
    const { items } = useCart();
    const { wishlistItems } = useWishlist();

    const totalQuantityCart = items.reduce((total, item) => total + item.quantity, 0);
    const totalFavorites = wishlistItems.length;

    return (
        <div className="app-shell">
            <header className="main-header">
                <div className="header-container">
                    <Link to="/" className="brand-logo">
                        Joyería
                    </Link>

                    <nav className="header-nav">
                        <Link to="/">Catálogo</Link>
                        <Link to="/cart" style={{ fontWeight: 500 }}>
                            🛒 ({totalQuantityCart})
                        </Link>
                        <Link to="/wishlist" style={{ fontWeight: 500 }}>
                            ♡ ({totalFavorites})
                        </Link>
                        {user && user.role === 'admin' && (
                            <Link to="/admin" style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
                                Administrar
                            </Link>
                        )}
                        {user ? (
                            <div className="user-menu">
                                <span>{user.email}</span>
                                <button onClick={signout} className="logout-btn">
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

            <div className="main-content">
                <Outlet />
            </div>

            <footer className="main-footer">
                <p>© {new Date().getFullYear()} Aurea Joyas. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};