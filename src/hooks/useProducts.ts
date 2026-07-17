import { useContext } from "react";
import { ProductContext } from "../contexts/products/ProductContext";

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts debe ser usado dentro de ProductProvider");
    }
    return context;
};