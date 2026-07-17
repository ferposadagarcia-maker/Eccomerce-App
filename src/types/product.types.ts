export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    description: string;
    stock: number;
}

export interface CatalogFilters {
    category: string;
    searchQuery: string;
}