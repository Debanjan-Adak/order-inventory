import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@stores/themeStore';
import './ThemeToggle.css';

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle__icon-wrapper" key={theme}>
        {isDark ? (
          <Moon size={18} strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Sun size={18} strokeWidth={1.75} aria-hidden="true" />
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;
