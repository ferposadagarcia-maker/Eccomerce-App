import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProviders } from './theme/AppProviders';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminRoute } from './routes/AdminRoute';

import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AdminProductsPage } from './pages/AdminProductPage';
import { ProductFormPage } from './pages/ProductFormPage';
import { CartPage } from './pages/CartPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';

export const AppRoutes = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>

          {/* Rutas públicas */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="wishlist" element={<WishlistPage />} />

            {/* Rutas protegidas para usuarios autenticados */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/success/:orderId" element={<OrderSuccessPage />} />
            </Route>

            {/* Rutas protegidas para administradores */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              {/* Al entrar a /admin redirige por defecto a la subruta de productos (/admin/products) */}
              <Route index element={<Navigate to="products" replace />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="products/new" element={<ProductFormPage />} />
              <Route path="products/:id/edit" element={<ProductFormPage />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter >
    </AppProviders >
  );
};

export default AppRoutes;