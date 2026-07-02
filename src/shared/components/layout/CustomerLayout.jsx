import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

function CustomerLayout() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {/* Top navigation */}
      <Navbar />
      {/* Main content */}

      <main className="container-fluid flex-grow-1 py-4">
        <Outlet />
      </main>

      {/* footer */}

      <Footer />
    </div>
  );
}

export default CustomerLayout;
