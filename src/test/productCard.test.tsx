import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './renderWithProviders';
import { ProductCard } from '../components/ui/ProductCard';
import { productFixture, outOfStockProductFixture } from './fixtures';

const mockAddToCart = vi.fn();

vi.mock('../hooks/useCart', () => ({
    useCart: () => ({
        addToCart: mockAddToCart,
    }),
}));

describe('Prueba de Componente: ProductCard', () => {
    it('Click en "Agregar al carrito" y verificar comportamiento', async () => {
        const user = userEvent.setup();
        renderWithProviders(<ProductCard product={productFixture} />);

        const addButton = screen.getByRole('button', { name: /añadir/i });
        expect(addButton).toBeInTheDocument();

        await user.click(addButton);
        expect(mockAddToCart).toHaveBeenCalledWith(productFixture);
    });

    it('Probar producto con stock: 0 y verificar boton deshabilitado', () => {
        renderWithProviders(<ProductCard product={outOfStockProductFixture} />);

        const addButton = screen.getByRole('button', { name: /añadir/i });
        expect(addButton).toBeDisabled();
    });
});