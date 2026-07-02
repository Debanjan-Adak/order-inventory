import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Ban, ShieldCheck } from "lucide-react";
import { useCustomer, useCustomerOrders } from "../hooks/useCustomers";
import CustomerStatus from "../components/CustomerStatus";
import BanCustomerModal from "../components/BanCustomerModal";
import "./CustomerDetails.css";

function getInitials(fullName = "") {
  const parts = fullName.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    amount ?? 0
  );
}

function OrderStatusPill({ status }) {
  return <span className={`order-status-pill status-${status?.toLowerCase()}`}>{status}</span>;
}

function CustomerDetails() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [showBanModal, setShowBanModal] = useState(false);

  const { data: customer, isLoading } = useCustomer(customerId);
  const { data: orders, isLoading: ordersLoading } = useCustomerOrders(customerId);

  if (isLoading) {
    return <div className="customer-details-loading">Loading customer...</div>;
  }

  if (!customer) {
    return <div className="customer-details-loading">Customer not found.</div>;
  }

  return (
    <div className="customer-details-page">
      <button type="button" className="btn btn-link customer-details-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} strokeWidth={1.75} className="me-1" />
        Back to customers
      </button>

      <div className="customer-details-grid">
        <aside className="customer-profile-card">
          <span className="customer-profile-avatar">{getInitials(customer.full_name)}</span>
          <h2 className="customer-profile-name">{customer.full_name}</h2>
          <p className="customer-profile-email">
            <Mail size={14} strokeWidth={1.75} />
            {customer.email_address}
          </p>
          <div className="customer-profile-status">
            <CustomerStatus isBlocked={customer.isblocked} />
          </div>

          <button
            type="button"
            className={`btn btn-sm w-100 mt-3 ${
              customer.isblocked ? "btn-outline-success" : "btn-outline-danger"
            }`}
            onClick={() => setShowBanModal(true)}
          >
            {customer.isblocked ? (
              <>
                <ShieldCheck size={14} strokeWidth={1.75} className="me-1" />
                Unblock customer
              </>
            ) : (
              <>
                <Ban size={14} strokeWidth={1.75} className="me-1" />
                Block customer
              </>
            )}
          </button>
        </aside>

        <section className="customer-orders-card">
          <h3 className="customer-orders-title">Order history</h3>

          {ordersLoading && <p className="text-muted small">Loading orders...</p>}

          {!ordersLoading && (!orders || orders.length === 0) && (
            <p className="text-muted small mb-0">This customer hasn't placed any orders yet.</p>
          )}

          {!ordersLoading && orders && orders.length > 0 && (
            <div className="table-responsive">
              <table className="table align-middle customer-orders-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Order</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="customer-orders-row"
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                    >
                      <td>#{order.id}</td>
                      <td>{new Date(order.order_date).toLocaleDateString()}</td>
                      <td>
                        <OrderStatusPill status={order.status} />
                      </td>
                      <td className="text-end fw-medium">{formatCurrency(order.total_amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <BanCustomerModal customer={customer} isOpen={showBanModal} onClose={() => setShowBanModal(false)} />
    </div>
  );
}

export default CustomerDetails;
