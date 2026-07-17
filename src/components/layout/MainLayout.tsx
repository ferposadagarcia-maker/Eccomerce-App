// src/components/layout/MainLayout.tsx
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const MainLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="app-shell">
            {/* Barra de Navegación de la Joyería */}
            <header className="main-header">
                <div className="header-container">
                    <Link to="/" className="brand-logo">
                        AUREA JOYAS
                    </Link>

                    <nav className="header-nav">
                        <Link to="/">Catálogo</Link>

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