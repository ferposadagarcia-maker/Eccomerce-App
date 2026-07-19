import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { createOrderService } from '../services/order.service';
import '../styles/checkoutPage.css';

export const CheckoutPage = () => {
    const { items, totalItems, clearCart } = useCart();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (!user) return;
        setError(null);

        setIsSubmitting(true);

        try {
            const orderId = await createOrderService(user.uid, items, totalItems);

            clearCart();
            navigate(`/checkout/success/${orderId}`);
        } catch (err) {
            console.error(err);
            setError('No se pudo procesar la compra. Por favor, inténtelo de nuevo.');
            setIsSubmitting(false);
        }
    };

    return (
        <main className="checkout-container">
            <header>
                <h1 style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Confirmar Compra
                </h1>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    Por favor, verifique los elementos de su bolsa antes de concretar la orden
                </p>
            </header>

            {error && <div className="form-error-alert">{error}</div>}

            <section className="checkout-card">
                <h3>Resumen de Bolsa</h3>

                <div className="checkout-list">
                    {items.map((item) => (
                        <div key={item.product.id} className="checkout-row">
                            <span>{item.product.name} (x{item.quantity})</span>
                            <strong>${(item.product.price * item.quantity).toLocaleString()}</strong>
                        </div>
                    ))}
                </div>

                <div className="checkout-total">
                    <span>Monto Total</span>
                    <strong>${totalItems.toLocaleString()}</strong>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    className="btn-jewelry-primary"
                    style={{ width: '100%' }}
                    disabled={isSubmitting || items.length === 0}
                >
                    {isSubmitting ? 'Procesando...' : 'Confirmar compra'}
                </button>
            </section>
        </main>
    );
};