import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProviders } from './theme/AppProviders';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AdminLayout } from './components/layout/AdminLayout';

import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AdminProductsPage } from './pages/AdminProductPage';
import { ProductFormPage } from './pages/ProductFormPage';
import { CartPage } from './pages/CartPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';

export const App = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />

            <Route element={<ProtectedRoute allowedRoles={['customer', 'admin']} />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/success/:orderId" element={<OrderSuccessPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminProductsPage />} />
                <Route path="/admin/products/new" element={<ProductFormPage />} />
                <Route path="/admin/products/:id/edit" element={<ProductFormPage />} />
              </Route>

            </Route>
          </Route>

        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
};

export default App;