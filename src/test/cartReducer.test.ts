import { describe, test, expect } from 'vitest';
import { cartReducer, initialState } from '../contexts/cart/cartReducer';
import { productFixture, cartItemFixture } from './fixtures';


describe('Pruebas Unitarias: cartReducer', () => {
    test("ADD_ITEM agrega un producto nuevo", () => {
        const next = cartReducer(initialState, {
            type: "ADD_ITEM",
            payload: productFixture
        });
        expect(next.items).toHaveLength(1);
        expect(next.items[0].product.id).toBe(productFixture.id);
        expect(next.items[0].quantity).toBe(1);
    });

    test('ADD_ITEM Incrementa la cantidad si el producto ya existe', () => {
        const stateWithItem = {
            items: [cartItemFixture],
            totalItems: 1500,
        };
        const next = cartReducer(stateWithItem, {
            type: 'ADD_ITEM',
            payload: productFixture
        });
        expect(next.items).toHaveLength(1)
        expect(next.items[0].quantity).toBe(2)
    });

    test('REMOVE_ITEM elimina el item del carrito', () => {
        const stateWithItem = {
            items: [cartItemFixture],
            totalItems: 1500,
        };
        const next = cartReducer(stateWithItem, {
            type: 'REMOVE_ITEM',
            payload: productFixture.id
        });
        expect(next.items).toHaveLength(0)
    });

    test('UPDATE_QUANTITY actualiza la cantidad', () => {
        const stateWithItem = {
            items: [cartItemFixture],
            totalItems: 1500,
        };
        const next = cartReducer(stateWithItem, {
            type: 'UPDATE_QUANTITY',
            payload: { productId: productFixture.id, quantity: 2 }
        });
        expect(next.items[0].quantity).toBe(2)
    });

    test('CLEAR_CART vacia el carrito', () => {
        const stateWithItem = {
            items: [cartItemFixture],
            totalItems: 0,
        };
        const next = cartReducer(stateWithItem, {
            type: 'CLEAR_CART',
        });
        expect(next.items).toHaveLength(0)
        expect(stateWithItem.totalItems).toBe(0)
    });
});