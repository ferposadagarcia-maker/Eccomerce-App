import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { createProduct, updateProduct } from '../services/products.service';


type Category = 'anillos' | 'collares' | 'pulseras';

interface ProductFormFields {
    name: string;
    price: number;
    description: string;
    category: Category | '';
    stock: number;
    imageUrl: string;
}

interface ProductFormErrors {
    name?: string;
    price?: string;
    category?: string;
    stock?: string;
}

interface ProductFormState {
    fields: ProductFormFields;
    errors: ProductFormErrors;
    status: 'editing' | 'submitting' | 'success' | 'error';
    globalError: string | null;
}

export const ProductFormPage = () => {
    const { id } = useParams<{ id: string }>();
    const { products, refreshProducts } = useProducts();
    const navigate = useNavigate();

    const [formState, setFormState] = useState<ProductFormState>({
        fields: {
            name: '',
            price: 0,
            description: '',
            category: '',
            stock: 5,
            imageUrl: ''
        },
        errors: {},
        status: 'editing',
        globalError: null
    });

    useEffect(() => {
        if (id) {
            const productToEdit = products.find((p) => p.id === id);
            if (productToEdit) {
                setFormState((prev) => ({
                    ...prev,
                    fields: {
                        name: productToEdit.name,
                        price: productToEdit.price,
                        description: productToEdit.description,
                        category: productToEdit.category as Category,
                        stock: productToEdit.stock,
                        imageUrl: productToEdit.imageUrl || ''
                    }
                }));
            }
        }
    }, [id, products]);

    const handleInputChange = (field: keyof ProductFormFields, value: any) => {
        setFormState((prev) => ({
            ...prev,
            fields: {
                ...prev.fields,
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState((prev) => ({ ...prev, status: 'submitting', globalError: null }));

        const productPayload = {
            name: formState.fields.name,
            price: Number(formState.fields.price),
            description: formState.fields.description,
            category: formState.fields.category,
            imageUrl: formState.fields.imageUrl,
            stock: Number(formState.fields.stock)
        };

        try {
            if (id) {
                await updateProduct(id, productPayload);
            } else {
                await createProduct(productPayload);
            }

            await refreshProducts();
            setFormState((prev) => ({ ...prev, status: 'success' }));
            navigate('/admin');
        } catch (error: any) {
            console.error(error);

            if (error.code === 'permission-denied') {
                setFormState((prev) => ({
                    ...prev,
                    status: 'error',
                    globalError: 'No tiene permisos de administrador para realizar esta acción de catálogo.'
                }));
            } else {
                setFormState((prev) => ({
                    ...prev,
                    status: 'error',
                    globalError: 'Ocurrió un error al intentar guardar los cambios de la joya.'
                }));
            }
        }
    };

    const isSubmitting = formState.status === 'submitting';

    return (
        <div style={{ maxWidth: '500px' }}>
            <h2 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                {id ? 'Editar Joya Exclusiva' : 'Añadir Nueva Joya'}
            </h2>

            {formState.globalError && <div className="form-error-alert">{formState.globalError}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                    <label htmlFor="prod-name">Nombre de la pieza</label>
                    <input
                        id="prod-name"
                        type="text"
                        required
                        placeholder="Ej. Anillo Étoile Diamante"
                        value={formState.fields.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="prod-category">Colección (Categoría)</label>
                    <select
                        id="prod-category"
                        required
                        value={formState.fields.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        disabled={isSubmitting}
                        style={{
                            border: 'none',
                            borderBottom: '1px solid var(--border)',
                            padding: '0.5rem 0',
                            backgroundColor: 'transparent',
                            color: 'var(--foreground)',
                            outline: 'none',
                            width: '100%'
                        }}
                    >
                        <option value="" disabled>Seleccione una colección...</option>
                        <option value="anillos">Anillos</option>
                        <option value="collares">Collares</option>
                        <option value="pulseras">Pulseras</option>
                    </select>
                </div>

                <div className="auth-field">
                    <label htmlFor="prod-price">Precio (USD)</label>
                    <input
                        id="prod-price"
                        type="number"
                        required
                        value={formState.fields.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="prod-stock">Stock Disponible</label>
                    <input
                        id="prod-stock"
                        type="number"
                        required
                        value={formState.fields.stock}
                        onChange={(e) => handleInputChange('stock', e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="prod-desc">Descripción de Lujo</label>
                    <input
                        id="prod-desc"
                        type="text"
                        required
                        placeholder="Materiales, kilates, acabados..."
                        value={formState.fields.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="prod-img">Enlace de Imagen</label>
                    <input
                        id="prod-img"
                        type="text"
                        placeholder="https://ejemplo.com/joya.jpg"
                        value={formState.fields.imageUrl}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting || formState.fields.category === ''}
                >
                    {isSubmitting ? 'Guardando pieza...' : id ? 'Guardar Cambios' : 'Registrar Joya'}
                </button>
            </form>
        </div>
    );
};