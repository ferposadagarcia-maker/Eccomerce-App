import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './renderWithProviders';
import { CheckoutPage } from '../pages/CheckoutPage';
import { cartItemFixture, customerUserFixture } from './fixtures';
import { createOrderService } from '../services/order.service';

vi.mock('../services/order.service', () => ({
    createOrderService: vi.fn(() => Promise.resolve('mock-order-123')),
}));
vi.mock('../hooks/useCart', () => ({
    useCart: () => ({
        items: [cartItemFixture],
        totalItems: 1500,
        clearCart: vi.fn(),
    }),
}));

vi.mock('../hooks/useAuth', () => ({
    useAuth: () => ({
        user: customerUserFixture,
        loading: false,
    }),
}));

describe('Prueba de Flujo Completo: Checkout con Mocks', () => {
    it('Simular el flujo completo de checkout con carrito prellenado', async () => {
        const user = userEvent.setup();

        renderWithProviders(<CheckoutPage />);

        expect(screen.getByText(new RegExp(cartItemFixture.product.name))).toBeInTheDocument();

        const confirmButton = screen.getByRole('button', { name: /confirmar/i });
        expect(confirmButton).toBeInTheDocument();

        await user.click(confirmButton);
        await user.click(confirmButton);

        expect(createOrderService).toHaveBeenCalledTimes(1);
    });
});