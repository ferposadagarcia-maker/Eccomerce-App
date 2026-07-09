import type { CartItem } from "../types/cartItem.types";
import type { Product } from "../types/product.types";
import { createContext, useContext, useMemo, useState } from "react";

//* types
interface CartContextType {
    items: CartItem[];
    addTooCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;

}

//* Context
export const CartContext = createContext<CartContextType | undefined>(
    undefined,
);

//* Provider
export const CartProvider = () => {

    //state
    const [items, setItems] = useState([]);

    const clearCart = () => {
        setItems([]);
    }
}

//* Custom hook

export const useCart = () => {

    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

useMemo