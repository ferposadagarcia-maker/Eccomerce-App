import type { Product } from "./product.types"

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    totalItems: number;
}

export type CartActions =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
    | { type: 'CLEAR_CART' };