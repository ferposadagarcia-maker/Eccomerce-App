import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { deleteProduct } from '../services/products.service';
import type { Product } from '../types/product.types';

interface ProductRowProps {
    product: Product;
    isDeleting: boolean;
    onDelete: (id: string) => void;
}

const ProductRow = ({ product, isDeleting, onDelete }: ProductRowProps) => {
    const navigate = useNavigate();

    return (
        <tr>
            <td>
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/100'}
                    alt={product.name}
                    width={48}
                    height={48}
                    style={{ objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                />
            </td>
            <td style={{ fontWeight: 600 }}>{product.name}</td>
            <td>${product.price.toLocaleString()}</td>
            <td>{product.stock} un.</td>
            <td>
                <div className="admin-actions-cell">
                    <button
                        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                        className="edit-btn"
                        disabled={isDeleting}
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        className="delete-btn"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </td>
        </tr>
    );
};

interface ProductsTableProps {
    products: Product[];
    deletingId: string | null;
    onDelete: (id: string) => void;
}

const ProductsTable = ({ products, deletingId, onDelete }: ProductsTableProps) => {
    return (
        <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProductRow
                            key={product.id}
                            product={product}
                            isDeleting={deletingId === product.id}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const AdminProductsPage = () => {
    const { products, refreshProducts } = useProducts();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm('¿Está seguro de eliminar esta pieza de joyería del inventario?');
        if (!confirmDelete) return;

        setDeletingId(id);
        try {
            await deleteProduct(id);
            await refreshProducts();
        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al eliminar el producto.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div>
            <h2 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.5rem' }}>
                Inventario de Joyas
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                Control, edición y borrado de piezas exclusivas en catálogo
            </p>

            {products.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed var(--border)', marginTop: '2rem' }}>
                    <p>No hay productos en el catálogo.</p>
                </div>
            ) : (
                <ProductsTable
                    products={products}
                    deletingId={deletingId}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};