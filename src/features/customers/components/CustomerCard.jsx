import { Pencil, Ban, ShieldCheck, Mail } from "lucide-react";
import CustomerStatus from "./CustomerStatus";
import "./CustomerCard.css";

function getInitials(fullName = "") {
  const parts = fullName.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function CustomerCard({ customer, onClick, onEdit, onBanToggle }) {
  return (
    <div className="customer-card" onClick={() => onClick?.(customer)}>
      <div className="customer-card-header">
        <span className="customer-card-avatar">{getInitials(customer.full_name)}</span>
        <CustomerStatus isBlocked={customer.isblocked} />
      </div>

      <h3 className="customer-card-name">{customer.full_name}</h3>

      <p className="customer-card-email">
        <Mail size={14} strokeWidth={1.75} />
        {customer.email_address}
      </p>

      <div className="customer-card-actions" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary flex-fill"
          onClick={() => onEdit?.(customer)}
        >
          <Pencil size={14} strokeWidth={1.75} className="me-1" />
          Edit
        </button>
        <button
          type="button"
          className={`btn btn-sm flex-fill ${
            customer.isblocked ? "btn-outline-success" : "btn-outline-danger"
          }`}
          onClick={() => onBanToggle?.(customer)}
        >
          {customer.isblocked ? (
            <>
              <ShieldCheck size={14} strokeWidth={1.75} className="me-1" />
              Unblock
            </>
          ) : (
            <>
              <Ban size={14} strokeWidth={1.75} className="me-1" />
              Block
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CustomerCard;
