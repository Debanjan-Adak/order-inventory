import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

function AdminLayout() {
  return (
    <div className="d-flex">
      <Sidebar />

{/* Page content */}

      <div
        className="flex-grow-1 d-flex flex-column"
        style={{
          minHeight: "100vh",
        }}
      >
        <Header />
        <main className="flex-grow-1 bg-light p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
