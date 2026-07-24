export type Category = 'anillos' | 'collares' | 'pulseras';

export interface ProductFormFields {
    name: string;
    price: number;
    description: string;
    category: Category | '';
    stock: number;
    imageUrl: string;
}

export interface ProductFormErrors {
    name?: string;
    price?: string;
    category?: string;
    stock?: string;
}

export interface ProductFormState {
    fields: ProductFormFields;
    errors: ProductFormErrors;
    status: 'editing' | 'submitting' | 'success' | 'error';
    globalError: string | null;
}
