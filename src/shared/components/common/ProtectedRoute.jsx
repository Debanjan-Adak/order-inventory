import { Navigate } from "react-router-dom";
import useAuthStore from "../../../features/auth/store/authStore";

function ProtectedRoute({children,role}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to={userRole === "admin" ? "/admin" : "/"} replace />;
  }
  return children;
}

export default ProtectedRoute;
