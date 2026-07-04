import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './AdminLayout.css';
const TITLE_ROUTES = [
  { path: '/admin', title: 'Dashboard', exact: true },
  { path: '/admin/products', title: 'Products' },
  { path: '/admin/customers', title: 'Customers' },
  { path: '/admin/orders', title: 'Orders' },
  { path: '/admin/inventory', title: 'Inventory' },
  { path: '/admin/stores', title: 'Stores' },
  { path: '/admin/shipments', title: 'Shipments' },
];

function getPageTitle(pathname) {
  const exactMatch = TITLE_ROUTES.find((route) => route.exact && route.path === pathname);
  if (exactMatch) return exactMatch.title;

  const prefixMatch = TITLE_ROUTES.filter((route) => !route.exact)
    .sort((a, b) => b.path.length - a.path.length)
    .find((route) => pathname.startsWith(route.path));

  return prefixMatch ? prefixMatch.title : 'Admin';
}

export function AdminLayout() {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-layout__main">
        <Header title={title} />

        <main className="admin-layout__content">
          <div key={location.pathname} className="page-container fade-slide-up-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
