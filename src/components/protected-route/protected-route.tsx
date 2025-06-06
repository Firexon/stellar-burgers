import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

interface ProtectedRouteProps {
  requireAuth?: boolean;
  children?: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  requireAuth = true,
  children
}) => {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  if (isLoading) {
    return null;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (!requireAuth && isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
