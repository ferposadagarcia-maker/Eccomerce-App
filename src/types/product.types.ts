type Category = 'Men' | 'Women' | 'Children'

export interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
} 