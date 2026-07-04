import "./CustomerStatus.css";

// isBlocked comes straight off the customer record's `isblocked` field.
function CustomerStatus({ isBlocked }) {
  return (
    <span className={`customer-status-badge ${isBlocked ? "is-blocked" : "is-active"}`}>
      <span className="customer-status-dot" aria-hidden="true" />
      {isBlocked ? "Blocked" : "Active"}
    </span>
  );
}

export default CustomerStatus;
