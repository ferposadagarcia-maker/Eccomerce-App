import type { CartItem, CartState } from "../types/cart.types";
import type { AuthUser } from "../types/auth.types"
import type { Order, OrderItemSnapshot } from "../types/order.types"
import type { Product } from "../types/product.types"
import { Timestamp } from "firebase/firestore";

export const productFixture: Product = {
    id: 'joya_01',
    name: 'Gargantilla Gota de Zafiro',
    price: 2400,
    description: 'Gargantilla de lujo',
    category: 'collares',
    stock: 5,
    imageUrl: 'https://example.com/gargantilla.jpg',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
};

export const outOfStockProductFixture: Product = {
    id: 'joya_02',
    name: 'Collar Agotado',
    price: 800,
    description: 'Collar sin inventario',
    category: 'collares',
    stock: 0,
};

export const cartItemFixture: CartItem = {
    product: productFixture,
    quantity: 1,
};

export const cartStateFixture: CartState = {
    totalItems: 0,
    items: [],
};

export const adminUserFixture: AuthUser = {
    uid: 'admin_01',
    email: 'admin@test.com',
    role: 'admin',
};

export const customerUserFixture: AuthUser = {
    uid: 'customer_01',
    email: 'customer@test.com',
    role: 'customer',
};

export const orderItemSnapshotFixture: OrderItemSnapshot = {
    productId: productFixture.id,
    name: productFixture.name,
    priceAtPurchase: productFixture.price,
    quantity: 1,
};

export const orderFixture: Order = {
    id: 'order_001',
    userId: customerUserFixture.uid,
    items: [orderItemSnapshotFixture],
    total: 2400,
    status: 'pendiente',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
};