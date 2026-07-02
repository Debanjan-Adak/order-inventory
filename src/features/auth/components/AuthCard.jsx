import { useEffect, useState } from 'react';
import { Package, Boxes, PackageCheck, Users } from 'lucide-react';

const TILE_COLS = 6;
const TILE_ROWS = 4;
const TILE_COUNT = TILE_COLS * TILE_ROWS;
const ACCENT_TILES = new Set([3, 9, 16, 21]);

const FEATURES = [
  { icon: Boxes, text: 'Real-time inventory across every warehouse' },
  { icon: PackageCheck, text: 'Orders tracked from cart to delivery' },
  { icon: Users, text: 'Built for teams that move fast' }
];

const AuthCard = ({ title, subtitle, children, footer }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-[var(--surface-base)]">
      {/* Brand panel */}
      <div
        className="relative hidden w-full max-w-[46%] flex-col justify-between overflow-hidden px-12 py-14 lg:flex"
        style={{
          backgroundImage:
            'linear-gradient(160deg, #1e1b4b 0%, #312e81 45%, #4f46e5 100%)'
        }}
      >
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, #818cf8, transparent)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-16 h-[380px] w-[380px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, #f59e0b, transparent)' }}
        />

        <div className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 backdrop-blur-sm">
            <Package size={18} strokeWidth={1.75} className="text-white" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-white">Order Inventory</span>
        </div>

        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="max-w-[360px] font-serif text-[34px] font-medium leading-[1.15] text-white">
              Stock clarity, order by order.
            </h2>
            <p className="max-w-[340px] text-[15px] leading-relaxed text-indigo-100/80">
              One workspace to track inventory, fulfil orders and keep every customer in the loop.
            </p>
          </div>

          

          <ul className="flex flex-col gap-3.5">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-indigo-50/90">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/10">
                  <Icon size={14} strokeWidth={1.75} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-indigo-200/60">
          Trusted by growing teams to keep stock and orders in sync.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-1 items-center justify-center px-6 py-12 sm:px-10">
        <div
          className={`w-full max-w-[380px] transition-all duration-[300ms] ease-out ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
          }`}
        >
          <div className="mb-8 flex flex-col gap-2 lg:items-start">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-[var(--brand-accent)]/10 lg:hidden">
              <Package size={20} strokeWidth={1.75} className="text-[var(--brand-accent)]" />
            </div>
            <h1 className="font-serif text-[28px] font-medium leading-tight text-[var(--text-primary)]">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
            ) : null}
          </div>

          {children}

          {footer ? (
            <div className="mt-6 text-sm text-[var(--text-secondary)] lg:text-left">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;