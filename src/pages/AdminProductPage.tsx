import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { deleteProduct } from '../services/products.service';
import { ProductsTable } from '../components/ui/ProductsTable';
import "../styles/adminPage.css"

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