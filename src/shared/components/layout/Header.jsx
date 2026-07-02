import ThemeToggle from "../common/ThemeToggle";
import useAuth from "../../../features/auth/hooks/useAuth";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white border-bottom shadow-sm px-4 py-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="mb-0">Dashboard</h3>

          <small className="text-muted">
            Welcome to Order Inventory Management
          </small>
        </div>

        <div className="d-flex align-items-center gap-3">
          <ThemeToggle />

          {isAuthenticated && (
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {user?.name || user?.full_name || "Admin"}
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
