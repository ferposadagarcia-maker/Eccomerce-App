import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product.types";

interface ProductRowProps {
    product: Product;
    isDeleting: boolean;
    onDelete: (id: string) => void;
}

export const ProductRow = ({ product, isDeleting, onDelete }: ProductRowProps) => {
    const navigate = useNavigate();

    return (
        <tr>
            <td>
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/100'}
                    alt={product.name}
                    width={48}
                    height={48}
                    style={{ objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                />
            </td>
            <td style={{ fontWeight: 600 }}>{product.name}</td>
            <td>${product.price.toLocaleString()}</td>
            <td>{product.stock} un.</td>
            <td>
                <div className="admin-actions-cell">
                    <button
                        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                        className="edit-btn"
                        disabled={isDeleting}
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        className="delete-btn"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </td>
        </tr>
    );
};