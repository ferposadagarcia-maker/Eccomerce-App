// src/contexts/cart/cartReducer.ts
import type { CartState, CartActions, CartItem } from "../../types/cart.types";

// Función auxiliar para calcular la cantidad de artículos o el total
const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
};

// NOTA: Asegúrate de usar CartActions (con S) en el segundo parámetro
export const cartReducer = (state: CartState, action: CartActions): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const product = action.payload;
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.id === product.id
            );

            let newItems: CartItem[];

            if (existingItemIndex > -1) {
                newItems = [...state.items];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + 1,
                };
            } else {
                newItems = [...state.items, { product, quantity: 1 }];
            }

            return {
                items: newItems,
                totalItems: calculateTotal(newItems), // <--- Correcto: totalItems
            };
        }

        case 'REMOVE_ITEM': {
            // CORRECCIÓN: Al ser un string plano, se asigna directo sin llaves {}
            const productId = action.payload;

            const newItems = state.items.filter((item) => item.product.id !== productId);

            return {
                items: newItems,
                totalItems: calculateTotal(newItems), // <--- Correcto: totalItems
            };
        }

        case 'UPDATE_QUANTITY': {
            const { productId, quantity } = action.payload;

            if (quantity <= 0) {
                const newItems = state.items.filter((item) => item.product.id !== productId);
                return {
                    items: newItems,
                    totalItems: calculateTotal(newItems), // <--- Correcto: totalItems
                };
            }

            const newItems = state.items.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            );

            return {
                items: newItems,
                totalItems: calculateTotal(newItems), // <--- Correcto: totalItems
            };
        }

        case 'CLEAR_CART': {
            return {
                items: [],
                totalItems: 0, // <--- Correcto: totalItems
            };
        }

        default:
            return state;
    }
};