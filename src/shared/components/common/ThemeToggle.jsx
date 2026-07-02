import useTheme from "../../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <button
      className="btn btn-outline-light d-flex align-items-center justify-content-center p-2"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{ borderRadius: "50%", border: "none" }}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

export default ThemeToggle;
