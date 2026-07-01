import { Routes, Route } from "react-router-dom";

const Placeholder = ({ title }) => (
  <div className="container py-5 text-center">
    <h2>{title}</h2>
    <p>🚧 Under Development</p>
  </div>
);

function AppRoutes() {
  return (
    <Routes>

      {/* Debanjan's part */}

      <Route path="/login" element={<Placeholder title="Customer Login" />} />
      <Route path="/register" element={<Placeholder title="Register" />} />
      <Route path="/admin/login" element={<Placeholder title="Admin Login" />} />

      {/*Anurag's part*/}

      <Route path="/" element={<Placeholder title="Home" />} />
      <Route path="/products" element={<Placeholder title="Products" />} />
      <Route path="/products/:id" element={<Placeholder title="Product Details" />}/>

      {/* Ayon's part*/}

      <Route path="/profile" element={<Placeholder title="Customer Profile" />}/>

      <Route path="/admin/customers" element={<Placeholder title="Customer Management" />}/>

      {/* Chandrima's part */}

      <Route path="/cart" element={<Placeholder title="Shopping Cart" />} />
      <Route path="/checkout" element={<Placeholder title="Checkout" />}/>
      <Route path="/orders" element={<Placeholder title="Orders" />} />
      <Route path="/orders/:id" element={<Placeholder title="Order Details" />}/>
      <Route path="/admin/orders" element={<Placeholder title="Order Management" />}/>

      {/*Indrava's part*/}
      <Route path="/admin" element={<Placeholder title="Admin Dashboard" />}/>
      <Route path="/admin/inventory" element={<Placeholder title="Inventory Management" />}/>

      {/* Not found page */}
      <Route path="*" element={<Placeholder title="404 - Page Not Found" />}/>
    </Routes>
  );
}

export default AppRoutes;