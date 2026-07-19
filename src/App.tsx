import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProviders } from './theme/AppProviders';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AdminPage } from './pages/AdminPage';
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
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>

        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
};

export default App;