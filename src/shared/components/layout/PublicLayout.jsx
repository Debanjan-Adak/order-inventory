import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

function PublicLayout() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>

      <Navbar />
      <main className="container-fluid flex-grow-1 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
