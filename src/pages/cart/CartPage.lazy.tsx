import { lazy } from 'react';

export const LazyCartPage = lazy(() =>
  import('./CartPage').then((module) => ({
    default: module.CartPage,
  }))
);
