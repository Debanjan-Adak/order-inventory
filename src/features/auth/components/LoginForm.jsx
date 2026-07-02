import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Mail, Lock, Eye, EyeOff, LoaderCircle, CircleAlert } from 'lucide-react';
import AuthCard from './AuthCard';
import useAuth from '../hooks/useAuth';
import useAuthStore from '../store/authStore';
import loginSchema from '../validation/loginSchema';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const setSession = useAuthStore((state) => state.setSession);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    setFormError('');
    try {
      const customer = await login(values);
      setSession({ user: customer, role: 'customer' });
      navigate('/');
    } catch (error) {
      setFormError('Incorrect username or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Sign in to Order Inventory"
      subtitle="Enter your credentials to continue."
      footer={
        <span>
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[var(--brand-accent)] hover:underline">
            Create one
          </Link>
        </span>
      }
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5" noValidate>
            {formError ? (
              <div className="flex items-center gap-2 rounded-xl border border-[var(--status-cancelled)]/30 bg-[var(--status-cancelled)]/10 px-3.5 py-2.5 text-sm text-[var(--status-cancelled)]">
                <CircleAlert size={16} strokeWidth={1.75} />
                <span>{formError}</span>
              </div>
            ) : null}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-[var(--text-secondary)]">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  strokeWidth={1.75}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] py-3 pl-9 pr-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all duration-150 placeholder:text-[var(--text-muted)]/70 hover:border-[var(--text-muted)]/60 focus:border-[var(--brand-accent)] focus:shadow-md focus:ring-4 focus:ring-[var(--brand-accent)]/15"
                />
              </div>
              <ErrorMessage name="email" component="p" className="text-xs text-[var(--status-cancelled)]" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-[var(--text-secondary)]">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  strokeWidth={1.75}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] py-3 pl-9 pr-9 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all duration-150 placeholder:text-[var(--text-muted)]/70 hover:border-[var(--text-muted)]/60 focus:border-[var(--brand-accent)] focus:shadow-md focus:ring-4 focus:ring-[var(--brand-accent)]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors duration-100 hover:text-[var(--text-secondary)]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                </button>
              </div>
              <ErrorMessage name="password" component="p" className="text-xs text-[var(--status-cancelled)]" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--brand-accent)] text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:brightness-[0.94] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={16} strokeWidth={2} className="animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>

            <div className="text-center text-sm">
              <Link to="/admin/login" className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                Sign in as admin instead
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthCard>
  );
};

export default LoginForm;