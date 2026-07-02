import React from "react";
import { StockBadge } from "./StockBadge";

export const InventoryCard = ({ item, theme, onRestock }) => {
  const isDark = theme === "dark";
  return (
    <div className={`card p-3 mb-3 border border-1 shadow-sm transition-all h-100 
    ${isDark ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>

          <span className="badge bg-secondary font-monospace mb-2">
            Bridge: #{item.inventory_id}</span>
          <h5 className="card-title fw-bold my-1" style={{ color: "#4F46E5" }}>
            SKU_{item.product_id}</h5>
          <p className="card-text text-muted small">Warehouse Node: #{item.store_id}</p>

        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <StockBadge quantity={item.product_inventory} />
          <button className="btn btn-sm btn-outline-primary btn-interact" 
          onClick={() => onRestock(item)}>
            Adjust
          </button>
        </div>
      </div>
    </div>
  );
};