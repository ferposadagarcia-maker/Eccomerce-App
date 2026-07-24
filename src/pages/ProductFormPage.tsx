import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { createProduct, updateProduct } from '../services/products.service';
import { uploadImage } from '../services/upload.service';
import type { Category, ProductFormFields, ProductFormState } from '../types/productForm.types';
import '../styles/adminPage.css';

export const ProductFormPage = () => {
    const { id } = useParams<{ id: string }>();
    const { products, refreshProducts } = useProducts();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
            fields: { ...prev.fields, [field]: value }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState((prev) => ({ ...prev, status: 'submitting', globalError: null }));

        try {
            let s3Url = formState.fields.imageUrl;

            if (selectedFile) {
                s3Url = await uploadImage(selectedFile);
            }

            const productPayload = {
                name: formState.fields.name,
                price: Number(formState.fields.price),
                description: formState.fields.description,
                category: formState.fields.category,
                imageUrl: s3Url,
                stock: Number(formState.fields.stock)
            };
            if (id) {
                await updateProduct(id, productPayload);
            } else {
                await createProduct(productPayload);
            }
            await refreshProducts();
            navigate('/admin');
        } catch (error: any) {
            console.error(error);
            setFormState((prev) => ({
                ...prev,
                status: 'error',
                globalError: 'Ocurrió un error al procesar la imagen o guardar la joya.'
            }));
        }
    };

    const isSubmitting = formState.status === 'submitting';

    return (
        <div className="admin-form-container">
            <h2 className="admin-form-title">
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
                        placeholder="Ej. Anillo Solitario Oro"
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
                        className="admin-select-field"
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
                        value={formState.fields.price || ''}
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
                        value={formState.fields.stock || ''}
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
                        placeholder="Materiales, quilates, detalles..."
                        value={formState.fields.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="admin-file-field">
                    <label>Fotografía de la Joya</label>

                    <label htmlFor="prod-file" className="admin-file-upload-label">
                        {selectedFile ? `✓ ${selectedFile.name.slice(0, 15)}...` : 'Seleccionar Imagen'}
                    </label>

                    <input
                        id="prod-file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                        disabled={isSubmitting}
                        style={{ display: 'none' }}
                    />
                    {id && formState.fields.imageUrl && !selectedFile && (
                        <span className="admin-file-help">
                            Dejar vacío para conservar la imagen actual.
                        </span>
                    )}
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