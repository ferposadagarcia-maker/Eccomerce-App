import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWishlist } from '../hooks/useWishlist';
import { WishlistProvider } from '../contexts/wishlist/WishlistContext';
import { productFixture } from './fixtures';

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <WishlistProvider>{children}</WishlistProvider>
);

describe('Pruebas de la Lista de Deseos (Wishlist)', () => {
    it('Debe iniciar con una lista de deseos vacía', () => {
        const { result } = renderHook(() => useWishlist(), { wrapper });
        expect(result.current.wishlistItems).toHaveLength(0);
    });

    it('Debe alternar (toggle) un producto en la lista de deseos', () => {
        const { result } = renderHook(() => useWishlist(), { wrapper });

        act(() => {
            result.current.toggleWishlist(productFixture);
        });
        expect(result.current.wishlistItems).toHaveLength(1);
        expect(result.current.isInWishlist(productFixture.id)).toBe(true);

        act(() => {
            result.current.toggleWishlist(productFixture);
        });
        expect(result.current.wishlistItems).toHaveLength(0);
        expect(result.current.isInWishlist(productFixture.id)).toBe(false);
    });
});