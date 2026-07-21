import { type ReactNode } from 'react';
import { AuthProvider } from '../contexts/auth/AuthProvider';
import { ProductProvider } from '../contexts/products/ProductContext';
import { CartProvider } from '../contexts/cart/CartContext';
import { WishlistProvider } from '../contexts/wishlist/WishlistContext';

interface AppProvidersProps {
    children: ReactNode;
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