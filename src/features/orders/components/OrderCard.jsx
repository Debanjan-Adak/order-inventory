import React from "react";

export const OrderCard = ({ order, theme, onView }) => {
  const isDark = theme === "dark";
  return (
    <div className={`card p-3 mb-3 border border-1 shadow-sm transition-all h-100 
        ${isDark ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <span className="badge bg-secondary font-monospace mb-2">ID: #{order.order_id}</span>
          <h5 className="card-title fw-bold my-1">Customer Identifier: #{order.customer_id}</h5>
          <p className="card-text text-muted small">Dispatched: {order.order_tms}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className={`badge ${order.order_status === "COMPLETE" ? "bg-success" : 
            order.order_status === "CANCELLED" ? "bg-danger" : "bg-warning"}`}>
            {order.order_status}
          </span>
          <button className="btn btn-sm btn-primary" style={{ backgroundColor: "#4F46E5", border: "none" }} 
          onClick={() => onView(order.id)}>
            Inspect
          </button>
        </div>
      </div>
    </div>
  );
};