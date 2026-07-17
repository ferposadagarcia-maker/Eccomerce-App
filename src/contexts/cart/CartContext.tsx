import { createContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { cartReducer } from "./cartReducer";
import type { CartItem, CartState } from "../../types/cart.types";
import type { Product } from "../../types/product.types";

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;

}

//* Context
export const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
    items: [],
    totalItems: 0,
};

const initCart = (): CartState => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : initialState
};

//* Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState, initCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const removeFromCart = (productId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const value = useMemo(() => ({
        items: state.items,
        totalItems: state.totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    }), [state]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};