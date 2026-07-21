import { useState, useEffect, useMemo, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import {
    signupService,
    loginService,
    signinWithGoogleService,
    signoutService,
    getUserProfile
} from "../../services/auth.service";
import type { AuthUser } from "../../types/auth.types";
import { AuthContext } from "./AuthContext";

interface Props {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(null);
                setLoading(false);
                return;
            }
            try {
                const profile = await getUserProfile(firebaseUser.uid);
                setUser(profile);
            } catch (error) {
                console.error("Error al obtener el rol del usuario", error);
                setUser(null);
            } finally {
                setLoading(false)
            }
        });

        return () => unsubscribe();
    }, []);

    const signup = async (email: string, password: string) => {
        await signupService(email, password);
        setUser(null);
    };

    const login = async (email: string, password: string) => {
        await loginService(email, password);
    };

    const signout = async () => {
        await signoutService();
    };

    const signinWithGoogle = async () => {
        await signinWithGoogleService();
    };

    const value = useMemo(() => ({
        user,
        loading,
        signup,
        login,
        signout,
        signinWithGoogle,
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};