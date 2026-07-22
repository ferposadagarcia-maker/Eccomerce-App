import { AuthContext } from '../contexts/auth/AuthContext';
import { CartContext } from '../contexts/cart/CartContext';
import { WishlistProvider } from '../contexts/wishlist/WishlistContext';
import { OrderProvider } from '../contexts/orders/OrderContext';
import { ProductContext } from '../contexts/products/ProductContext';
import type { AuthUser } from '../types/auth.types';
import type { Product } from '../types/product.types';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { CartState } from '../types/cart.types';

type Options = RenderOptions & {
    preloadedUser?: AuthUser | null;
    preloadedProducts?: Product[];
    preloadedCart?: CartState;
};

function Providers({
    children,
    preloadedUser = null,
    preloadedProducts = [],
    preloadedCart = { items: [], totalItems: 0 }

}: {
    children: ReactNode,
    preloadedUser?: AuthUser | null,
    preloadedProducts?: Product[],
    preloadedCart?: CartState
}) {
    return (
        <MemoryRouter>
            <AuthContext.Provider
                value={{
                    user: preloadedUser,
                    loading: false,
                    login: async () => { },
                    signup: async () => { },
                    signout: async () => { },
                    signinWithGoogle: async () => { },
                }}>
                <ProductContext.Provider
                    value={{
                        products: preloadedProducts,
                        filteredProducts: preloadedProducts,
                        isLoading: false,
                        error: null,
                        filters: { category: 'all', searchQuery: '' },
                        setCategory: async () => { },
                        setSearchQuery: async () => { },
                        refreshProducts: async () => { },
                    }}>
                    <CartContext.Provider
                        value={{
                            items: preloadedCart.items,
                            totalItems: preloadedCart.totalItems,
                            addToCart: async () => { },
                            removeFromCart: async () => { },
                            updateQuantity: async () => { },
                            clearCart: async () => { },
                        }}>
                        <WishlistProvider>
                            <OrderProvider>
                                {children}
                            </OrderProvider>
                        </WishlistProvider>
                    </CartContext.Provider>
                </ProductContext.Provider>
            </AuthContext.Provider>
        </MemoryRouter>
    );
};

export function renderWithProviders(
    ui: ReactNode,
    options?: Options,
) {
    const {
        preloadedProducts,
        preloadedUser,
        ...renderOptions
    } = options ?? {};
    return render(ui, {
        wrapper: ({ children }) => (
            <Providers
                preloadedProducts={preloadedProducts}
                preloadedUser={preloadedUser}
            >
                {children}
            </Providers>
        ),
        ...renderOptions,
    });
};