import { addDoc, collection, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import type { Product } from "../types/product.types";

export async function createProduct(
    product: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<Product> {
    const now = serverTimestamp();

    const docRef = await addDoc(collection(db, "products"), {
        ...product,
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
    changes: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
): Promise<void> {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
        ...changes,
        updatedAt: serverTimestamp(),
    });
}

export async function deleteProduct(productId: string): Promise<void> {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
}