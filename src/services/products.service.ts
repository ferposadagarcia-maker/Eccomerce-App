import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import type { Product } from "../types/product.types";

export const getProductsService = async (category?: string): Promise<Product[]> => {
    const productsRef = collection(db, "products");

    const q = category && category !== "all"
        ? query(productsRef, where("category", "==", category))
        : productsRef;

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            price: data.price,
            imageUrl: data.image,
            category: data.category,
            stock: data.stock,
            description: data.description,
        };
    });
};