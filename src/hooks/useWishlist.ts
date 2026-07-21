import { useContext } from 'react';
import { WishlistContext } from '../contexts/wishlist/WishlistContext';

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist debe de ser usado dentro de un WishlistProvider');
    }
    return context;
};