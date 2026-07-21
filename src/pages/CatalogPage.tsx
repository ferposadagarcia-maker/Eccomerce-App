import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { ProductGrid } from '../components/ui/ProductGrid';
import { FilterBar } from '../components/ui/FilterBar';

export const CatalogPage = () => {
    const { filteredProducts, isLoading, error, filters, setCategory, setSearchQuery } = useProducts();
    const [searchTerm, setSearchTerm] = useState<string>(filters.searchQuery);

    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    useEffect(() => {
        setSearchQuery(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <main className="catalog-container">
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Colecciones Exclusivas
                </h1>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Alta joyería fina diseñada para perdurar
                </p>
            </header>

            {/* Controles de Búsqueda y Filtros */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Buscar una pieza especial..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: '400px' }}
                />

                <FilterBar
                    selectedCategory={filters.category}
                    onSelectCategory={setCategory}
                />
            </section>

            {/* Controladores de Estados de Carga o Errores */}
            {isLoading && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p>Cargando piezas exclusivas...</p>
                </div>
            )}

            {error && (
                <div style={{ textAlign: 'center', color: 'var(--destructive)', padding: '2rem' }}>
                    <p>{error}</p>
                </div>
            )}

            {!isLoading && !error && filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', border: '1px dashed var(--border)' }}>
                    <p>No se encontraron piezas en esta categoría.</p>
                </div>
            )}

            {!isLoading && !error && filteredProducts.length > 0 && (
                <ProductGrid products={filteredProducts} />
            )}
        </main>
    );
};