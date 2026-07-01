import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';

const AuthCard = ({ title, subtitle, children, footer }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--surface-base)] px-4 py-12">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
        style={{
          background:
            'radial-gradient(closest-side, var(--brand-accent), transparent)'
        }}
      />

      <div
        className={`relative w-full max-w-[400px] rounded-lg border border-[var(--border-default)] bg-[var(--surface-card)] p-8 shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all duration-[250ms] ease-in-out ${
          mounted ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'
        }`}
      >
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--brand-accent)]/10">
            <Package size={20} strokeWidth={1.75} className="text-[var(--brand-accent)]" />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-[24px] font-semibold leading-tight text-[var(--text-primary)]">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
            ) : null}
          </div>
        </div>

        {children}

        {footer ? (
          <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AuthCard;