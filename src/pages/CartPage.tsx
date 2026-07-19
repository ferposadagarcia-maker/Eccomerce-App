import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

export const CartPage = () => {
    const { items, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <main className="cart-container" style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
                <h2 style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tu bolsa está vacía</h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Parece que aún no has seleccionado piezas de joyería para tu colección.
                </p>
                <Link to="/" className="btn-jewelry-primary" style={{ display: 'inline-block', marginTop: '2rem' }}>
                    Explorar Catálogo
                </Link>
            </main>
        );
    }

    return (
        <main className="cart-container">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Tu carrito
                </h1>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Revisa y confirma las joyas exclusivas añadidas a tu orden
                </p>
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
                                {/* Detalle del producto */}
                                <td style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <img
                                        src={item.product.imageUrl || 'https://via.placeholder.com/100'}
                                        alt={item.product.name}
                                        style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)' }}
                                    />
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.product.name}</h4>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{item.product.category}</span>
                                    </div>
                                </td>

                                {/* Precio Unitario */}
                                <td style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                                    ${item.product.price.toLocaleString()}
                                </td>

                                {/* Modificador de Cantidad */}
                                <td style={{ textAlign: 'center' }}>
                                    <div className="quantity-control" style={{ justifyContent: 'center' }}>
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                            +
                                        </button>
                                    </div>
                                </td>

                                {/* Subtotal del elemento */}
                                <td style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
                                    ${(item.product.price * item.quantity).toLocaleString()}
                                </td>

                                {/* Botón de Borrar */}
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="cart-delete-btn"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Acciones del carrito y Resumen final */}
            <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                <button onClick={clearCart} className="btn-jewelry-secondary" style={{ maxWidth: '200px' }}>
                    Vaciar bolsa
                </button>

                <div className="cart-summary">
                    <h3>Total de la Orden</h3>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '1.5rem' }}>
                        ${totalItems.toLocaleString()}
                    </p>
                    <button className="btn-jewelry-primary" style={{ width: '100%' }}>
                        Proceder al Pago
                    </button>
                </div>
            </section>
        </main>
    );
};