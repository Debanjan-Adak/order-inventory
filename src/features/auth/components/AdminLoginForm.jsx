import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Mail, Lock, Eye, EyeOff, LoaderCircle, CircleAlert, ShieldCheck } from 'lucide-react';
import AuthCard from './AuthCard';
import useAuth from '../hooks/useAuth';
import useAuthStore from '../store/authStore';
import loginSchema from '../validation/loginSchema';

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const setSession = useAuthStore((state) => state.setSession);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    setFormError('');
    try {
      const admin = await adminLogin(values);
      setSession({ user: admin, role: 'admin' });
      navigate('/admin');
    } catch (error) {
      setFormError('Incorrect username or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Admin sign in"
      subtitle="Sign in with your administrator credentials."
      footer={
        <Link to="/login" className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
          Back to customer sign in
        </Link>
      }
    >
      <div className="mb-5 flex items-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--surface-base)] px-3 py-2 text-xs text-[var(--text-muted)]">
        <ShieldCheck size={16} strokeWidth={1.75} />
        <span>This console is restricted to authorized store operators.</span>
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5" noValidate>
            {formError ? (
              <div className="flex items-center gap-2 rounded-md border border-[var(--status-cancelled)]/30 bg-[var(--status-cancelled)]/10 px-3 py-2 text-sm text-[var(--status-cancelled)]">
                <CircleAlert size={16} strokeWidth={1.75} />
                <span>{formError}</span>
              </div>
            ) : null}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-email" className="text-sm font-medium text-[var(--text-secondary)]">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  strokeWidth={1.75}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <Field
                  id="admin-email"
                  name="email"
                  type="email"
                  placeholder="admin@company.com"
                  className="w-full rounded-md border border-[var(--border-default)] bg-[var(--surface-base)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none transition-shadow duration-100 focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)]/30"
                />
              </div>
              <ErrorMessage name="email" component="p" className="text-xs text-[var(--status-cancelled)]" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-password" className="text-sm font-medium text-[var(--text-secondary)]">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  strokeWidth={1.75}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <Field
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-[var(--border-default)] bg-[var(--surface-base)] py-2.5 pl-9 pr-9 text-sm text-[var(--text-primary)] outline-none transition-shadow duration-100 focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)]/30"
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
              className="mt-1 flex h-10 items-center justify-center gap-2 rounded-md bg-[var(--brand-accent)] text-sm font-medium text-white transition-transform duration-100 hover:brightness-[0.92] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
          </Form>
        )}
      </Formik>
    </AuthCard>
  );
};

export default AdminLoginForm;