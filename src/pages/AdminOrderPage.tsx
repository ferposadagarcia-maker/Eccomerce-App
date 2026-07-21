import { useState, useEffect } from "react";
import { getAllOrdersService, updateOrderStatusService } from "../services/order.service";
import type { OrderStatus } from "../types/order.types";
import "../styles/ordersPage.css";

export const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchAllOrders = async () => {
        try {
            const data = await getAllOrdersService();
            setOrders(data);
        } catch (error) {
            console.error("Error al cargar todos los pedidos", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleStatusChange = async (orderId: string, nextStatus: OrderStatus) => {
        try {
            await updateOrderStatusService(orderId, nextStatus);
            alert(" Estado del pedido actualizado con éxito ");
            await fetchAllOrders();
        } catch (error) {
            console.error(error);
            alert(" No se pudo actualizar el estado ");
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return "Procesando...";
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    if (loading) {
        return (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
                <p>Cargando órdenes globales del sistema...</p>
            </div>
        );
    }
    return (
        <div>
            <h2 className="admin-view-title">Gestión de Pedidos</h2>
            <p className="admin-view-subtitle">
                Supervisión de transacciones y control de estado de envío
            </p>

            {orders.length === 0 ? (
                <div className="admin-empty-state">
                    <p>No se han registrado órdenes en la plataforma de ventas.</p>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Cliente (UID)</th>
                                <th>Fecha</th>
                                <th>Monto Total</th>
                                <th>Estado Actual</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                                        {order.userId}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{formatDate(order.createdAt)}</td>
                                    <td style={{ textAlign: 'center', fontWeight: 600 }}>
                                        ${order.total.toLocaleString()}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span className={`status-badge badge-${order.status}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                            style={{
                                                padding: '0.35rem 0.5rem',
                                                fontSize: '0.8rem',
                                                border: '1px solid var(--border)',
                                                borderRadius: 'var(--radius-sm)',
                                                backgroundColor: 'var(--card)',
                                                outline: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="pending">Pendiente</option>
                                            <option value="processing">En Proceso</option>
                                            <option value="completed">Completado</option>
                                            <option value="cancelled">Cancelado</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};