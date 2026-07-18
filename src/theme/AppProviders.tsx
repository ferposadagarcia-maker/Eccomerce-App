import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ProductProvider } from '../contexts/products/ProductContext';
import { CartProvider } from '../contexts/cart/CartContext';
import { WishlistProvider } from '../contexts/wishlist/wishlistContext';

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <WishlistProvider>
                        {children}
                    </WishlistProvider>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
};