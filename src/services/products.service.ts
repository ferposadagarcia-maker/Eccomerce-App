import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Product } from '../types/product.types';

export const getProductsService = async (category?: string): Promise<Product[]> => {
    const productsRef = collection(db, 'products');


    const snapshot = await getDocs(productsRef);

    const allProducts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.categoryId || data.category || "",
            stock: data.stock,
            imageUrl: data.imageUrl || data.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    });

    const normalizedCategory = category ? category.trim().toLowerCase() : "all";

    if (normalizedCategory && normalizedCategory !== 'all') {
        return allProducts.filter((product) => product.category === normalizedCategory);
    }

    return allProducts;
};
export async function createProduct(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Product> {
    const now = serverTimestamp();

    const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        categoryId: product.category,
        createdAt: now,
        updatedAt: now,
    });

    return {
        ...product,
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

export async function updateProduct(
    productId: string,
    changes: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
        ...changes,
        categoryId: changes.category,
        updatedAt: serverTimestamp(),
    });
}

export async function deleteProduct(productId: string): Promise<void> {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
}
