import { useParams, Link } from 'react-router-dom';
import '../styles/checkoutPage.css';

export const OrderSuccessPage = () => {
    const { orderId } = useParams<{ orderId: string }>();

    return (
        <main className="success-container">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
            <h1>¡Compra confirmada!</h1>
            <p>Su pedido ha sido procesado de forma segura.</p>
            <p>Número de orden:</p>
            <strong className="order-code">{orderId}</strong>

            <Link to="/" className="btn-jewelry-primary">
                Volver a la Tienda
            </Link>
        </main>
    );
};