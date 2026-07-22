import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOrder } from '../hooks/useOrder';
import { OrderProvider } from '../contexts/orders/OrderContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <OrderProvider>{children}</OrderProvider>
);

describe('Pruebas del Contexto de Órdenes (Orders)', () => {
    it('Debe iniciar con un listado de pedidos vacío y sin cargas activas', () => {
        const { result } = renderHook(() => useOrder(), { wrapper });

        expect(result.current.orders).toHaveLength(0);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });
});