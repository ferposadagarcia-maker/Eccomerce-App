import { collection, writeBatch, increment, getDocs, query, where, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { CartItem } from '../types/cart.types';
import type { OrderStatus } from '../types/order.types';

export const createOrderService = async (userId: string, items: CartItem[], total: number): Promise<string> => {
    const batch = writeBatch(db);
    const ordersRef = collection(db, 'orders');
    const orderId = doc(ordersRef).id;
    const orderRef = doc(ordersRef, orderId);

    const itemsSnapshot = items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        priceAtPurchase: item.product.price,
        quantity: item.quantity,
    }));
    batch.set(orderRef, {
        userId,
        items: itemsSnapshot,
        total,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    items.forEach((item) => {
        const productRef = doc(db, 'products', item.product.id);
        batch.update(productRef, {
            stock: increment(-item.quantity),
        });
    });

    await batch.commit();

    return orderId;
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