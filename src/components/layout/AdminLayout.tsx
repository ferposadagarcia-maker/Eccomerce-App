import { Outlet, Link } from 'react-router-dom';

export const AdminLayout = () => {
    return (
        <div className="admin-layout-container">
            <aside className="admin-sidebar">
                <h3>Panel Admin</h3>
                <nav>
                    <Link to="/admin">Ver Inventario</Link>
                    <Link to="/admin/products/new">Nuevo Producto</Link>
                    <Link to="/admin/orders">Gestión de Pedidos</Link>
                    <Link to="/">Ir a la Tienda</Link>
                </nav>
            </aside>

            <main className="admin-main-content">
                <Outlet />
            </main>
        </div>
    );
};