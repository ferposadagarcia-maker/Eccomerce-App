export type Category = "anillos" | "collares" | "pulseras";

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    category: string;
    description: string;
    stock: number;
    createdAt?: any;
    updatedAt?: any;
}

export interface CatalogFilters {
    category: string;
    searchQuery: string;
}