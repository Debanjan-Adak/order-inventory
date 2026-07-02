// src/features/orders/components/OrderItems.jsx
import React from "react";

export const OrderItems = ({ items = [], theme }) => {
  return (
    <div className={`card p-4 border shadow-sm 
    ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
      <h6 className="fw-bold mb-3 font-monospace text-uppercase" 
      style={{ fontSize: "0.85rem" }}>Allocated Product Matrix</h6>

      <div className="table-responsive">
        <table className={`table align-middle ${theme === "dark" ? "table-dark" : ""}`}>

          <thead>
            <tr style={{ fontSize: "0.75rem" }} className="text-uppercase text-muted">
              <th>Line Ref</th>
              <th>SKU Reference</th>
              <th className="text-center">Quantity</th>
              <th className="text-end">Unit Value</th>
              <th className="text-end">Aggregate</th>
            </tr>
          </thead>

          <tbody>

            {items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="text-muted font-monospace">Line_#{item.line_item_id}</td>
                <td className="fw-bold">SKU_#{item.product_id}</td>
                <td className="text-center font-monospace text-indigo" 
                style={{ color: "#4F46E5" }}>{item.quantity}</td>
                <td className="text-end font-monospace">
                  ${Number(item.unit_price).toFixed(2)}</td>
                <td className="text-end font-monospace fw-bold">
                  ${(item.unit_price * item.quantity).toFixed(2)}</td>
              </tr>

            ))}
          </tbody>

        </table>
        
      </div>
    </div>
  );
};