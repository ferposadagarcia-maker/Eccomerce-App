import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '../hooks/useCart';
import { CartProvider } from '../contexts/cart/CartContext';
import { productFixture } from './fixtures';

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);

describe('Prueba de Hook: useCart', () => {
    it('Caso feliz: agregar un producto y verificar items y totalItems', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart(productFixture);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.totalItems).toBe(2400);
    });

    it('Edge case: actualizar a cantidad cero y verificar que el item desaparece', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart(productFixture);
        });

        act(() => {
            result.current.updateQuantity(productFixture.id, 0);
        });

        expect(result.current.items).toHaveLength(0);
    });
});