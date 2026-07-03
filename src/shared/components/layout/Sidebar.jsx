import { NavLink } from "react-router-dom";
import useAuth from "../../../features/auth/hooks/useAuth";

function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <aside
      className="bg-dark text-white vh-100 p-3 d-flex flex-column"
      style={{ width: "250px" }}
    >
      <div>
        <h4 className="mb-4">Order Inventory</h4>
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/admin">
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/products">
              Products
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/admin/customers">
              Customers
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/admin/orders">
              Orders
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/admin/inventory">
              Inventory
            </NavLink>
          </li>
        </ul>
      </div>

      {isAuthenticated && (
        <div className="mt-auto pt-3 border-top border-secondary">
          <div
            className="mb-2 text-truncate small"
            title={user?.name || user?.full_name}
          >
            👤 {user?.name || user?.full_name || "Admin"}
          </div>
          <button className="btn btn-danger btn-sm w-100" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
