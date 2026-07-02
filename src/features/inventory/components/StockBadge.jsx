import React from "react";

export const StockBadge = ({ quantity }) => {
  const stock = Number(quantity);

  if (stock === 0) {
    return <span 
    className="badge bg-danger-subtle text-danger border border-danger fw-bold font-monospace">
        OUT OF STOCK</span>;
  }
  
  if (stock < 10) {
    return <span 
    className="badge bg-warning-subtle text-warning border border-warning fw-bold font-monospace">
        LOW STOCK ({stock})</span>;
  }

  return <span 
  className="badge bg-success-subtle text-success border border-success fw-bold font-monospace">
    HEALTHY ({stock})</span>;
};