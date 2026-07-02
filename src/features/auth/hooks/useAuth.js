import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as authApi from "../api/authApi";
import useAuthStore from "../store/authStore";

const useAuth = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearSession = useAuthStore((state) => state.clearSession);

  const login = useCallback((values) => authApi.loginCustomer(values), []);

  const adminLogin = useCallback((values) => authApi.loginAdmin(values), []);

  const register = useCallback((values) => authApi.registerCustomer(values), []);

  const logout = useCallback(() => {
    clearSession();
    navigate("/login", { replace: true });
  }, [clearSession, navigate]);

  return {
    user,
    role,
    isAuthenticated,
    login,
    adminLogin,
    register,
    logout
  };
};

export default useAuth;