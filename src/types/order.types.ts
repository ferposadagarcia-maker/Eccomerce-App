import type { CartItem } from "./cart.types"
export type OrderStatus = 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado'

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
}
