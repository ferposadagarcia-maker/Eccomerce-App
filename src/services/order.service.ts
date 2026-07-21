import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import type { OrderStatus } from '../types/order.types';
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

export const getUserOrderService = async (userId: string) => {
    const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data(),
    }));
};

export const getAllOrdersService = async () => {
    const q = query(
        collection(db, 'orders'),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
};
export const updateOrderStatusService = async (orderId: string, status: OrderStatus) => {
    const docRef = doc(db, 'orders', orderId);
    await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp()
    });
};