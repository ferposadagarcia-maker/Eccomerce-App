import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useOrder } from '../hooks/useOrder';
import '../styles/orderPage.css';

export const OrderPage = () => {
    const { user } = useAuth();
    const { orders, loading, error, fetchUserOrders } = useOrder();

    useEffect(() => {
        if (user) {
            fetchUserOrders(user.uid);
        }
    }, [user]);

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'Procesando...';
        const date = timestamp.toDate ? timestamp.toDate() : timestamp
        return date.toLocaleDateString('es-MX', {
            day: "numeric",
            mont: "short",
            year: "numeric"
        });
    };

    const getStatusBadgeClass = (status: string): string => {
        switch (status) {
            case "pending": return "status-pending";
            case "processing": return "status-processing";
            case "shipped": return "status-shipped";
            case "delivered": return "status-delivered";
            case "cancelled": return "status-cancelled";
            default: return "";
        }
    };

    if (loading) {
        return (
            <main className="orders-container" style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
                <p>Cargando su historial de compras...</p>
            </main>
        );
    }

    return (
        <main className="orders-container">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Mis Pedidos
                </h1>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Consulta el estado y detalle de tus productos
                </p>
            </header>

            {error && <div className="form-error-alert">{error}</div>}

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)' }}>
                    <p>No tienes órdenes registradas.</p>
                </div>
            ) : (
                <section className="orders-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Número de Orden</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td style={{ fontWeight: 600 }}>{order.id}</td>
                                    <td style={{ textAlign: 'center' }}>{formatDate(order.createdAt)}</td>
                                    <td style={{ textAlign: 'center', fontWeight: 600 }}>
                                        ${order.total.toLocaleString()}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
        </main>
    );
};