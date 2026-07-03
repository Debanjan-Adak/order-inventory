import React from "react";

export const OrderItems = ({ items = [] }) => {
  return (
    <div>
      <h3>Allocated Product Matrix</h3>

      <table>
        <thead>
          <tr>
            <th>Line Ref</th>
            <th>SKU Reference</th>
            <th>Quantity</th>
            <th>Unit Value</th>
            <th>Aggregate</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id || idx}>
              <td>Line_#{item.line_item_id}</td>
              <td>SKU_#{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>${Number(item.unit_price).toFixed(2)}</td>
              <td>${(item.unit_price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};