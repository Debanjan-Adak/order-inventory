import React, { useState, useMemo } from "react";
import { StockBadge } from "./StockBadge";

export const InventoryTable = ({ inventory = [], isLoading, theme, onRestock, onDelete }) => {
  const [search, setSearch] = useState("");
  const [storeFilter, setStoreFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

 
  const storeOptions = useMemo(() => ["ALL", ...new Set(inventory.map(i => i.store_id))], [inventory]);

  const filtered = useMemo(() => {
    return inventory.filter(item => {
      const matchSearch = item.product_id?.toString().includes(search);
      const matchStore = storeFilter === "ALL" || item.store_id?.toString() === storeFilter.toString();
      return matchSearch && matchStore;
    });
  }, [inventory, search, storeFilter]);

  const paginated = useMemo(() => 
    filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
   [filtered, currentPage]);

  return (

    <div className={`card p-4 shadow-sm border border-1 
    ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
      <style>{`
        .table-hover tbody tr { transition: background-color 100ms linear; }
        .table-hover tbody tr:hover { background-color: 
        ${theme === "dark" ? "#1e293b" : "#f8fafc"} !important; }
        .btn-interact { transition: transform 100ms linear; }
        .btn-interact:active { transform: scale(0.98); }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .shimmer { background: linear-gradient(90deg, 
        ${theme === "dark" ? "#0f172a 25%, #1e293b 50%, #0f172a 75%" : 
            "#f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%"}); 
            background-size: 200% 100%; animation: shimmer 1.5s infinite linear; 
            height: 16px; border-radius: 4px; }
      `}</style>
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h5 className="fw-bold mb-0">Global Inventory Matrix</h5>
        </div>
        <div className="d-flex gap-2">
          <input type="text" 
          className="form-control form-control-sm bg-transparent text-reset" 
          placeholder="Search SKU ID..."
           value={search} 
           onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />

          <select 
          className="form-select form-select-sm bg-transparent text-reset" 
          value={storeFilter} 
          onChange={e => { setStoreFilter(e.target.value); setCurrentPage(1); }}>

            {storeOptions.map(store => 
            <option key={store} value={store}>{store === "ALL" ? "All Stores" : `Store #${store}`}</option>)}

          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className={`table align-middle ${theme === "dark" ? "table-dark" : ""}`}>
          <thead>

            <tr className="text-uppercase tracking-wider" style={{ fontSize: "0.75rem" }}>
              <th>Inventory Bridge ID</th>
              <th>Store Node ID</th>
              <th>Product SKU Reference</th>
              <th>Stock Level</th>
              <th className="text-end">Operations</th>
            </tr>

          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>{Array.from({ length: 5 }).map((_, j) => <td key={j}>
                    <div className="shimmer w-75"></div></td>)}</tr>
              ))
            ) : paginated.length > 0 ? (
              paginated.map(item => (
                <tr key={item.id}>
                  <td className="font-monospace text-muted small">#{item.inventory_id}</td>
                  <td className="fw-bold">Node #{item.store_id}</td>
                  <td className="font-monospace fw-bold" 
                  style={{ color: "#4F46E5" }}>SKU_{item.product_id}</td>
                  <td><StockBadge quantity={item.product_inventory} /></td>
                  <td className="text-end">
                    <div className="d-inline-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary btn-interact" 
                      onClick={() => onRestock(item)}>Manage Stock</button>
                      <button className="btn btn-sm btn-outline-danger btn-interact" 
                      onClick={() => onDelete(item.id)}>Delink</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center py-4 text-muted">
                No inventory data available for current matrix.
                </td>
                </tr>

            )}
          </tbody>

        </table>

      </div>
      
    </div>
  );
};