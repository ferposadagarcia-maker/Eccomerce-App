export type OrderStatus = 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado'

export interface OrderItemSnapshot {
    productId: string;
    name: string;
    priceAtPurchase: number;
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItemSnapshot[];
    total: number;
    status: OrderStatus;
    createdAt: any;
    updatedAt: any;
}
