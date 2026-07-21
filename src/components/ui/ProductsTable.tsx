import type { Product } from "../../types/product.types";
import { ProductRow } from "./ProductRow";

interface ProductsTableProps {
    products: Product[];
    deletingId: string | null;
    onDelete: (id: string) => void;
}

export const ProductsTable = ({ products, deletingId, onDelete }: ProductsTableProps) => {
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