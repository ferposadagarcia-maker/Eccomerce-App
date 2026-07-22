import { createContext, useState, useEffect, useMemo, type ReactNode } from "react";
import type { Product } from "../../types/product.types";

interface WishlistContextType {
    wishlistItems: any[];
    toggleWishlist: (productId: any) => void;
    isInWishlist: (productId: string) => boolean;
    wishlistCount: number;
    clearWishlist: () => void
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlistItems, setWishlistItems] = useState<any[]>(() => {
        const localData = localStorage.getItem('athenea_wishlist');
        return localData ? JSON.parse(localData) : []
    })

    useEffect(() => {
        localStorage.setItem('athenea_wishlist', JSON.stringify(wishlistItems))
    }, [wishlistItems])

    const toggleWishlist = (product: Product) => {
        setWishlistItems((prevItems) => {
            const exists = prevItems.some((item) => item.id === product.id);
            if (exists) {
                return prevItems.filter((item) => item.id !== product.id);
            } else {
                return [...prevItems, product];
            }
        });
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    const clearWishlist = () => setWishlistItems([]);
    const wishlistCount = wishlistItems.length;

    const value = useMemo(() => ({
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        clearWishlist,
    }), [wishlistItems, toggleWishlist, isInWishlist, wishlistCount, clearWishlist]);

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
