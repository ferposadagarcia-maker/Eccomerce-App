import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { CartItem } from '../types/cart.types';

export const createOrderService = async (userId: string, items: CartItem[], total: number): Promise<string> => {
    const itemsSnapshot = items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        priceAtPurchase: item.product.price,
        quantity: item.quantity,
    }));

    const ordersRef = collection(db, 'orders');

    const docRef = await addDoc(ordersRef, {
        userId,
        items: itemsSnapshot,
        total,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return docRef.id;
};