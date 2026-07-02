import { NavLink } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import useAuth from "../../../features/auth/hooks/useAuth";

function Navbar() {
  const { isAuthenticated, user, role, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Logo */}
        <NavLink
          className="navbar-brand fw-bold"
          to={role === "admin" ? "/admin" : "/"}
        >
          Order Inventory
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={role === "admin" ? "/admin" : "/"}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>

            {isAuthenticated && role === "admin" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/customers">
                    Customers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/orders">
                    Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/inventory">
                    Inventory
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                {role === "customer" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/orders">
                      My Orders
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {user?.name || user?.full_name || "Profile"}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-2"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item ms-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
