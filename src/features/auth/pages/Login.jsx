import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import useAuthStore from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(role === 'admin' ? '/admin' : '/', { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return <LoginForm />;
};

export default Login;