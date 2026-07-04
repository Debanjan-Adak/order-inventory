import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "@features/auth/store/authStore";
import { useOnClickOutside } from "@shared/hooks/useOnClickOutside";
import { getInitials } from "@shared/utils/helpers";
import { ThemeToggle } from "@shared/components/common/ThemeToggle";
import "./Header.css";

function AdminUserMenu() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-user-menu" ref={menuRef}>
      <button
        type="button"
        className="admin-user-menu__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Account menu"
      >
        <span className="admin-user-menu__avatar">
          {getInitials(user?.fullName)}
        </span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="admin-user-menu__dropdown" role="menu">
          <Link
            to="/profile"
            className="admin-user-menu__item"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/admin"
            className="admin-user-menu__item"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <button
            type="button"
            className="admin-user-menu__item admin-user-menu__item--danger"
            role="menuitem"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export function Header({ title }) {
  return (
    <header className="admin-header">
      <h1 className="admin-header__title">{title}</h1>

      <div className="admin-header__actions">
        <ThemeToggle />
        <AdminUserMenu />
      </div>
    </header>
  );
}

export default Header;
