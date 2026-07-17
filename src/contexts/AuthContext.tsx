import { createContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getUserProfile, signoutService } from '../services/auth.service';
import type { AuthUser } from '../types/auth.types';

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            setIsLoading(true);
            if (firebaseUser) {
                try {
                    const profile = await getUserProfile(firebaseUser.uid);
                    setUser(profile);
                } catch (error) {
                    console.error("Error al obtener el rol del usuario", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await signoutService();
            setUser(null);
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        } finally {
            setIsLoading(false);
        }
    };

    const value = useMemo(() => ({
        user,
        isLoading,
        logout: handleLogout
    }), [user, isLoading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};