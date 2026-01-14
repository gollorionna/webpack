import './App.module.scss';
import {AuthPage} from '@/pages/authentication/AuthPage';
import { Route, Routes } from 'react-router-dom';
import { ProductCardPage } from '@/pages/productsCard/ProductCardPage';
import { ProductCardDetails } from '@/pages/productsCard/ProductCardDetails';
import { Layout } from '@/pages/layout/Layout';
import { MainPage } from '@/pages/mainPage/MainPage';
import { ProductsBeauty } from '@/pages/productsCard/ProductsBeauty';
import { ProductsFragrances } from '@/pages/productsCard/ProductsFragrances';
import { ProductsFurniture } from '@/pages/productsCard/ProductsFurniture';
import { ProductsGroceries } from '@/pages/productsCard/ProductsGroceries';
import { LazyCartPage } from '@/pages/cart/CartPage.lazy';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ProtectedRoute } from '@/components/protectedRoutes/ProtectedRoute';

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />

        <Route path="products">
          <Route index element={<ProductCardPage />} />
          <Route path="beauty" element={<ProductsBeauty />} />
          <Route path="fragrances" element={<ProductsFragrances />} />
          <Route path="furniture" element={<ProductsFurniture />} />
          <Route path="groceries" element={<ProductsGroceries />} />

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
