import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};