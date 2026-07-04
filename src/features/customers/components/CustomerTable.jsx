import { Pencil, Ban, ShieldCheck, Trash2, SearchX } from "lucide-react";
import CustomerStatus from "./CustomerStatus";
import "./CustomerTable.css";

function getInitials(fullName = "") {
  const parts = fullName.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function SkeletonRows({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <tr key={index} className="customer-table-skeleton-row">
          <td colSpan={5}>
            <div className="customer-skeleton-bar" />
          </td>
        </tr>
      ))}
    </>
  );
}

function CustomerTable({
  customers = [],
  isLoading = false,
  onRowClick,
  onEdit,
  onBanToggle,
  onDelete,
}) {
  return (
    <div className="customer-table-wrapper table-responsive">
      <table className="table align-middle customer-table mb-0">
        <thead>
          <tr>
            <th scope="col">Customer</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col" className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <SkeletonRows />}

          {!isLoading && customers.length === 0 && (
            <tr>
              <td colSpan={4} className="border-0">
                <div className="customer-table-empty">
                  <SearchX size={32} strokeWidth={1.5} />
                  <p className="mb-0 mt-2 fw-medium">No customers found</p>
                  <p className="text-muted small mb-0">
                    Try a different search term or clear your filters.
                  </p>
                </div>
              </td>
            </tr>
          )}

          {!isLoading &&
            customers.map((customer) => (
              <tr
                key={customer.customer_id}
                className="customer-table-row"
                onClick={() => onRowClick?.(customer)}
              >
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <span className="customer-avatar">{getInitials(customer.full_name)}</span>
                    <span className="fw-medium">{customer.full_name}</span>
                  </div>
                </td>
                <td className="text-secondary">{customer.email_address}</td>
                <td>
                  <CustomerStatus isBlocked={customer.isblocked} />
                </td>
                <td className="text-end">
                  <div
                    className="customer-table-actions d-inline-flex gap-1"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="btn btn-sm btn-icon"
                      title="Edit customer"
                      aria-label="Edit customer"
                      onClick={() => onEdit?.(customer)}
                    >
                      <Pencil size={16} strokeWidth={1.75} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-icon"
                      title={customer.isblocked ? "Unblock customer" : "Block customer"}
                      aria-label={customer.isblocked ? "Unblock customer" : "Block customer"}
                      onClick={() => onBanToggle?.(customer)}
                    >
                      {customer.isblocked ? (
                        <ShieldCheck size={16} strokeWidth={1.75} />
                      ) : (
                        <Ban size={16} strokeWidth={1.75} />
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-icon btn-icon-danger"
                      title="Delete customer"
                      aria-label="Delete customer"
                      onClick={() => onDelete?.(customer)}
                    >
                      <Trash2 size={16} strokeWidth={1.75} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
