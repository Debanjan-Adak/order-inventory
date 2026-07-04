import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@features/auth/store/authStore';
export function ProtectedRoute({ roles }) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    const isAdminOnly = Array.isArray(roles) && roles.length === 1 && roles.includes('admin');
    const loginPath = isAdminOnly ? '/admin/login' : '/login';
    return <Navigate to={loginPath} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
