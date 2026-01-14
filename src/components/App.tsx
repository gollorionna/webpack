import './App.module.scss';
import {AuthPage} from '@/pages/authentication/AuthPage';
import { Route, Routes } from 'react-router-dom';
import { ProductCardPage } from '@/pages/productsCard/ProductCardPage';
import { ProductCardDetails } from '@/pages/productsCard/ProductCardDetails';
import { Layout } from '@/pages/layout/Layout';
import { MainPage } from '@/pages/mainPage/MainPage';
import { LazyCartPage } from '@/pages/cart/CartPage.lazy';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ProtectedRoute } from '@/components/protectedRoutes/ProtectedRoute';
import { ProductCardList } from '@/pages/productsCard/ProductCardList';

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />

        <Route path="products">
          <Route index element={<ProductCardPage />} />
          <Route path="category/:category" element={<ProductCardList />} />
          <Route path=":id" element={<ProductCardDetails />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="cart"
            element={
              <Suspense fallback={<CircularProgress />}>
                <LazyCartPage />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route path="auth" element={<AuthPage />} />
    </Routes>
  );
};
