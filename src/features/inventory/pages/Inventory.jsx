import React, { useState } from "react";

export function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1>Inventory</h1>
      
      <button type="button" onClick={() => console.log("Open Modal")}>
        Adjust Stock
      </button>

      <div>
        <input type="text" placeholder="Search..." />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}