// src/hooks/useCart.ts
import { useContext } from 'react';
import { CartContext } from '../contexts/cart/CartContext';

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart debe de ser usado dentro de un CartProvider');
    }
    return context;
};