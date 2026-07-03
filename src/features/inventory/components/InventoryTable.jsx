import React, { useState, useMemo } from "react";
import { StockBadge } from "./StockBadge";

export const InventoryTable = ({ inventory = [], isLoading, onRestock, onDelete }) => {
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
    <div>
      <div>
        <h5>Global Inventory Matrix</h5>
        
        <div>
          <input 
            type="text" 
            placeholder="Search SKU ID..."
            value={search} 
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
          />

          <select value={storeFilter} onChange={e => { setStoreFilter(e.target.value); setCurrentPage(1); }}>
            {storeOptions.map(store => (
              <option key={store} value={store}>
                {store === "ALL" ? "All Stores" : `Store #${store}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Inventory Bridge ID</th>
            <th>Store Node ID</th>
            <th>Product SKU Reference</th>
            <th>Stock Level</th>
            <th>Operations</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr><td colSpan="5">Loading...</td></tr>
          ) : paginated.length > 0 ? (
            paginated.map(item => (
              <tr key={item.id}>
                <td>#{item.inventory_id}</td>
                <td>Node #{item.store_id}</td>
                <td>SKU_{item.product_id}</td>
                <td><StockBadge quantity={item.product_inventory} /></td>
                <td>
                  <button onClick={() => onRestock(item)}>Manage Stock</button>
                  <button onClick={() => onDelete(item.id)}>Delink</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No inventory data available for current matrix.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};