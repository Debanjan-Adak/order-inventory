import React, { useState, useMemo } from "react";

export const OrderTable = ({ orders = [], isLoading, theme = "light", onView, onCancel, onDelete }) => {
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
    <div className={`card p-4 shadow-sm border border-1
     ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
      <style>{`
        .table-hover tbody tr { transition: background-color 100ms linear; }
        .table-hover tbody tr:hover { background-color: ${theme === "dark" ? "#1e293b" : "#f8fafc"} !important; }
        .btn-interact { transition: transform 100ms linear; }
        .btn-interact:active { transform: scale(0.98); }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .shimmer { background: linear-gradient(90deg, 
        ${theme === "dark" ? "#0f172a 25%, #1e293b 50%, #0f172a 75%" : "#f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%"}); 
        background-size: 200% 100%; animation: shimmer 1.5s infinite linear; height: 16px; border-radius: 4px; }
      `}</style>
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h5 className="fw-bold mb-0">
            {onDelete ? "System Order Ledger" : "My Order Ledger"}</h5>

          <small className="text-muted">
            {onDelete ? "Monitor and inspect historical warehouse logistics dispatches" :
            "Monitor and track your placed warehouse orders"}
          </small>

        </div>

        <div className="d-flex gap-2">
          <input type="text" className="form-control form-control-sm bg-transparent text-reset" 
            placeholder="Search Reference..." 
            value={search} 
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); 
          }} />

          <select className="form-select form-select-sm bg-transparent text-reset" 
          value={status} 
            onChange={e => { setStatus(e.target.value); setCurrentPage(1); }}>
            <option value="ALL">All Statuses</option>
            <option value="COMPLETE">Complete</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className={`table align-middle ${theme === "dark" ? "table-dark" : ""}`}>
          <thead>

            <tr className="text-uppercase tracking-wider" style={{ fontSize: "0.75rem" }}>
              <th>Order ID</th>
              <th>Timestamp</th>
              <th>Customer Ref</th>
              <th>Store Node ID</th>
              <th>Status State</th>
              <th className="text-end">Actions</th>
            </tr>

          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }).map((_, j) => 
                  <td key={j}><div className="shimmer w-75"></div></td>)}
                </tr>
              ))

            ) : paginated.length > 0 ? (
              paginated.map(order => (

                <tr key={order.id}>
                  <td className="font-monospace fw-bold text-indigo" 
                    style={{ color: "#4F46E5" }}>#{order.order_id}</td>
                  <td className="text-muted" 
                    style={{ fontSize: "0.85rem" }}>{order.order_tms}</td>
                  <td>Node #{order.customer_id}</td>
                  <td>Store #{order.store_id}</td>
                  <td>
                    <span className={`badge ${order.order_status === "COMPLETE" ? 
                        "bg-success-subtle text-success border border-success" : 
                        order.order_status === "CANCELLED" ? "bg-danger-subtle text-danger border border-danger" : 
                        "bg-warning-subtle text-warning border border-warning"}`}>
                      {order.order_status}
                    </span>
                  </td>

                  <td className="text-end">
                    <div className="d-inline-flex gap-2">
                      <button className="btn btn-sm btn-outline-secondary btn-interact" 
                      onClick={() => onView(order.id)}>
                        Details
                      </button>
                      {onCancel && order.order_status !== "CANCELLED" && order.order_status !== "COMPLETE" && (
                        <button className="btn btn-sm btn-outline-warning btn-interact" 
                        onClick={() => onCancel(order.id)}>
                            Cancel
                        </button>
                      )}
                      {onDelete && (
                        <button className="btn btn-sm btn-outline-danger btn-interact" 
                        onClick={() => onDelete(order.id)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))

            ) : (
              <tr><td colSpan="6" className="text-center py-4 text-muted">No transactional ledger data available.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};