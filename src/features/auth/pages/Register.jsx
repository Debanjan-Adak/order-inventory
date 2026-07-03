import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import useAuthStore from '../store/authStore';

const Register = () => {
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

  return <RegisterForm />;
};

export default Register;