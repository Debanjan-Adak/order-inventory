import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';
import './PublicLayout.css';

export function PublicLayout() {
  return (
    <div className="public-layout">
      <header className="public-layout__header">
        <Link to="/" className="public-layout__logo">
          SmartBuy
        </Link>
      </header>

      <main className="public-layout__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;
