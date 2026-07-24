import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { ProductGrid } from '../components/ui/ProductGrid';
import { FilterBar } from '../components/ui/FilterBar';
import "../styles/catalogPage.css"

export const CatalogPage = () => {
    const { filteredProducts, isLoading, error, filters, setCategory, setSearchQuery } = useProducts();
    const [searchTerm, setSearchTerm] = useState<string>(filters.searchQuery);

    const [visibleCount, setVisibleCount] = useState<number>(20);
    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    useEffect(() => {
        setSearchQuery(debouncedSearchTerm);
        setVisibleCount(20);
    }, [debouncedSearchTerm]);

    const handleCategoryChange = (catId: string) => {
        setCategory(catId);
        setVisibleCount(20);
    };

    const displayedProducts = filteredProducts.slice(0, visibleCount);

    return (
        <main className="catalog-container">
            <header className="catalog-header">
                <div>
                    <h1 style={{ fontSize: '3.5rem', textTransform: 'none', letterSpacing: '0.1em', margin: 0 }}>
                        Athenea
                    </h1>
                    <p style={{ color: 'var(--muted)', fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>
                        Lo esencial, nunca pasa desapercibido.
                    </p>
                </div>

                <div className="catalog-search-area">
                    <input
                        type="text"
                        placeholder="Buscar una pieza especial..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="catalog-search-input"
                    />
                </div>
            </header>

            <FilterBar
                selectedCategory={filters.category}
                onSelectCategory={handleCategoryChange}
            />

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
                <ProductGrid products={displayedProducts} />
            )}
            {filteredProducts.length > visibleCount && (
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button
                        onClick={() => setVisibleCount((prev) => prev + 20)}
                        className="btn-jewelry-secondary">
                        Cargar más joyas...
                    </button>
                </div>
            )}

        </main>
    );
};