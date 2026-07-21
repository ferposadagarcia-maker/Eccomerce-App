import { createContext, useState, useMemo, type ReactNode } from "react";
import { getUserOrderService, getAllOrdersService, updateOrderStatusService } from "../../services/order.service";
import type { OrderStatus } from "../../types/order.types";

interface OrderContextType {
    orders: any[];
    loading: boolean;
    error: string | null;
    fetchUserOrders: (userId: string) => Promise<void>;
    fetchAllOrders: () => Promise<void>;
    updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserOrders = async (userId: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUserOrderService(userId);
            setOrders(data);
        } catch (error) {
            console.error(error);
            setError("Error al cargar los pedidos");
        } finally {
            setLoading(false);
        }
    };

    const fetchAllOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllOrdersService();
            setOrders(data);
        } catch (error) {
            console.error(error);
            setError("Error al cargar todos los pedidos");
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
        try {
            await updateOrderStatusService(orderId, status);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status } : order
                )
            );
        } catch (error) {
            console.error(error);
            throw new Error("Error al actualizar el pedido");
        }
    };

    const value = useMemo(() => ({
        orders,
        loading,
        error,
        fetchUserOrders,
        fetchAllOrders,
        updateOrderStatus,
    }), [orders, loading, error]);

    return (
        <OrderContext.Provider
            value={value}>
            {children}
        </OrderContext.Provider>
    );
};