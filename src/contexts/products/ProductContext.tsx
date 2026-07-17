import { createContext, useState, useEffect, useMemo, type ReactNode } from "react";
import type { Product, CatalogFilters } from "../../types/product.types";
import { getProductsService } from "../../services/products.service";

interface ProductContextType {
    products: Product[];
    filteredProducts: Product[]
    isLoading: boolean;
    error: string | null;
    filters: CatalogFilters;
    setSearchQuery: (query: string) => void;
    setCategory: (category: string) => void;
    refreshProducts: () => Promise<void>;

}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<CatalogFilters>({
        category: "all",
        searchQuery: ""
    });

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getProductsService(filters.category);
            setProducts(data);
        } catch (error) {
            console.error(error)
            setError("Ocurrió un error al obtener los productos.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters.category]);

    const setCategory = (category: string) => {
        setFilters(prev => ({ ...prev, category }));
    };

    const setSearchQuery = (searchQuery: string) => {
        setFilters(prev => ({ ...prev, searchQuery }));
    };

    const filteredProducts = useMemo(() => {
        if (!filters.searchQuery.trim) {
            return products;
        }

        const queryLower = filters.searchQuery.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(queryLower)
        );
    }, [products, filters]);

    const value = useMemo(() => ({
        products,
        filteredProducts,
        isLoading,
        error,
        filters,
        setSearchQuery,
        setCategory,
        refreshProducts: fetchProducts
    }), [products, filteredProducts, isLoading, error, filters]);

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}
