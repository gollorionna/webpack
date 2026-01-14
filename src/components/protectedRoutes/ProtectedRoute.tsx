import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux.hook';
import { selectIsAuth } from '@/store/auth';

export const ProtectedRoute = () => {
  const isAuth = useAppSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
