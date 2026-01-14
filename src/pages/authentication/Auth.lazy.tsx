import { lazy } from 'react';

export const LazyAuth = lazy(() =>
  import('./AuthPage').then((module) => ({
    default: module.AuthPage,
  }))
);
