import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import '../styles/cartPage.css';

export const CartPage = () => {
    const { items, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <main className="cart-empty-state">
                <h2>Tu bolsa está vacía</h2>
                <p>
                    Parece que aún no has seleccionado piezas de joyería para tu colección.
                </p>
                <Link to="/" className="btn-jewelry-primary">
                    Explorar Catálogo
                </Link>
            </main>
        );
    }

    return (
        <main className="cart-container">
            <header className="cart-header">
                <h1>Tu bolsa</h1>
                <p>Revisa y confirma las joyas exclusivas añadidas a tu orden</p>
            </header>

            <section className="cart-table-wrapper">
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>Pieza</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.product.id}>
                                <td>
                                    <div className="cart-product-cell">
                                        <img
                                            src={item.product.imageUrl || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400'}
                                            alt={item.product.name}
                                        />
                                        <div>
                                            <h4>{item.product.name}</h4>
                                            <span>{item.product.category}</span>
                                        </div>
                                    </div>
                                </td>

                                <td className="cart-price-cell">
                                    ${item.product.price.toLocaleString()}
                                </td>
                                <td>
                                    <div className="quantity-control">
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="cart-subtotal-cell">
                                    ${(item.product.price * item.quantity).toLocaleString()}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="cart-delete-btn"
                                    >
                                        ⌫
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="cart-actions-wrapper">
                <button
                    onClick={clearCart}
                    className="btn-jewelry-secondary cart-clear-btn"
                >
                    Vaciar bolsa
                </button>

                <div className="cart-summary">
                    <h3>Total de la Orden</h3>
                    <p>${totalItems.toLocaleString()}</p>

                    <Link to="/checkout" className="btn-jewelry-primary">
                        Proceder al Pago
                    </Link>
                </div>
            </section>
        </main>
    );
};