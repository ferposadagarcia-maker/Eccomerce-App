import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ProductProvider } from '../contexts/products/ProductContext';

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <AuthProvider>
            <ProductProvider>
                {children}
            </ProductProvider>
        </AuthProvider>
    );
};