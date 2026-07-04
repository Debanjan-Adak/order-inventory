import React, { useState, useMemo } from "react";

export const OrderTable = ({ orders = [], isLoading, onView, onCancel, onDelete }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchSearch = o.order_id?.toString().includes(search) || o.customer_id?.toString().includes(search);
      const matchStatus = status === "ALL" || o.order_status === status;
      return matchSearch && matchStatus;
    });
  }, [orders, search, status]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  return (
    <div>
      <div>
        <h5>{onDelete ? "System Order Ledger" : "My Order Ledger"}</h5>
        <p>{onDelete ? "Monitor and inspect historical warehouse logistics dispatches" : 
        "Monitor and track your placed warehouse orders"}</p>

        <div>
          <input 
            type="text" 
            placeholder="Search Reference..." 
            value={search} 
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
          />

          <select value={status} onChange={e => { setStatus(e.target.value); setCurrentPage(1); }}>
            <option value="ALL">All Statuses</option>
            <option value="COMPLETE">Complete</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Timestamp</th>
            <th>Customer Ref</th>
            <th>Store Node ID</th>
            <th>Status State</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr><td colSpan="6">Loading...</td></tr>
          ) : paginated.length > 0 ? (
            paginated.map(order => (
              <tr key={order.id}>
                <td>#{order.order_id}</td>
                <td>{order.order_tms}</td>
                <td>Node #{order.customer_id}</td>
                <td>Store #{order.store_id}</td>
                <td>{order.order_status}</td>
                <td>
                  <button onClick={() => onView(order.id)}>Details</button>
                  {onCancel && order.order_status !== "CANCELLED" && order.order_status !== "COMPLETE" && (
                    <button onClick={() => onCancel(order.id)}>Cancel</button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(order.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6">No transactional ledger data available.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};