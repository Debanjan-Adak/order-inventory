import React from "react";

export const OrderSummary = ({ items = [], theme }) => {
  const total = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  return (
    <div className={`card p-3 border shadow-sm ${theme === "dark" ? 
    "bg-dark text-light border-secondary" : "bg-light text-dark"}`}>
      <h6 className="fw-bold border-bottom pb-2 text-uppercase tracking-wider font-monospace" 
      style={{ fontSize: "0.8rem" }}>Financial Summary</h6>
      
      <div className="d-flex justify-content-between mb-2 small">
        <span>Accumulated Line Items Valuation:</span>
        <span className="font-monospace fw-bold">${total.toFixed(2)}</span>
      </div>
      
      <div className="d-flex justify-content-between border-top pt-2 fw-bold" 
      style={{ color: "#4F46E5" }}>
        <span>Gross Asset Valuation Total:</span>
        <span className="font-monospace">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};