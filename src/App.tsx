// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProviders } from './theme/AppProviders';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Importación modular de nuestras páginas
import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { CartPage } from './pages/CartPage';

export const App = () => {
  return (
    <BrowserRouter>
      {/* AppProviders inicializa los estados globales de autenticación y catálogo */}
      <AppProviders>
        <Routes>

          {/* Todas las rutas dentro de MainLayout compartirán el Navbar y el Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Rutas protegidas exclusivas para el rol Administrador */}
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