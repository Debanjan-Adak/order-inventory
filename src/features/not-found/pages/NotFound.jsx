import { Link } from 'react-router-dom';
import { MapPinOff } from 'lucide-react';
import useAuthStore from '../../auth/store/authStore';

const NotFound = () => {
  const role = useAuthStore((state) => state.role);
  const homePath = role === 'admin' ? '/admin' : '/';

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-[var(--surface-base)] px-4 text-center">
      <span className="pointer-events-none absolute select-none text-[160px] font-semibold leading-none text-[var(--text-muted)] opacity-10">
        404
      </span>

      <div className="relative flex flex-col items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--surface-card)] border border-[var(--border-default)]">
          <MapPinOff size={48} strokeWidth={1.75} className="text-[var(--text-muted)]" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[24px] font-semibold text-[var(--text-primary)]">Page not found</h1>
          <p className="max-w-sm text-sm text-[var(--text-secondary)]">
            The page you're looking for doesn't exist or has moved.
          </p>
        </div>

        <Link
          to={homePath}
          className="flex h-10 items-center justify-center rounded-md bg-[var(--brand-accent)] px-5 text-sm font-medium text-white transition-transform duration-100 hover:brightness-[0.92] active:scale-[0.98]"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;