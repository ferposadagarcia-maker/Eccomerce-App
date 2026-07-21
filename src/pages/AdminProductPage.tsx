import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { deleteProduct } from '../services/products.service';
import { ProductsTable } from '../components/ui/ProductsTable';
import "../styles/adminPage.css"

export const AdminProductsPage = () => {
    const { products, refreshProducts } = useProducts();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>('');

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
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.5rem' }}>
                Inventario de Joyas
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                Control, edición y borrado de piezas exclusivas en catálogo
            </p>

            <div style={{ marginTop: '1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
                <input
                    type="text"
                    placeholder="Buscar joya en inventario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input-jewelry"
                    style={{ maxWidth: '300px' }}
                />
            </div>

            {filteredProducts.length === 0 ? (
                <div className="admin-empty-state">
                    <p>No se encontraron joyas que coincidan con la búsqueda.</p>
                </div>
            ) : (
                <ProductsTable
                    products={filteredProducts}
                    deletingId={deletingId}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};