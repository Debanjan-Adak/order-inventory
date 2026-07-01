import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../orders/hooks/useOrders";
import StatusBadge from "../../../shared/components/common/StatusBadge";
import Skeleton from "../../../shared/components/common/Skeleton";
import EmptyState from "../../../shared/components/common/EmptyState";

function RecentOrders() {
  const { data: orders, isLoading } = useOrders();

  const recentOrders = useMemo(() => {
    if (!orders) return [];
    return [...orders]
      .sort((a, b) => new Date(b.order_tms) - new Date(a.order_tms))
      .slice(0, 5);
  }, [orders]);

  return (
    <div className="card border h-100">
      <div className="card-body d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="h6 fw-semibold mb-0" style={{ color: "var(--text-primary)" }}>
            Recent Orders
          </h3>
          <Link to="/admin/orders" className="small text-decoration-none">
            View all
          </Link>
        </div>

        {isLoading ? (
          <Skeleton rows={5} />
        ) : recentOrders.length === 0 ? (
          <EmptyState
            heading="No orders yet"
            body="Orders will appear here once customers start ordering."
          />
        ) : (
          <div className="table-responsive">
            <table className="table table-sm align-middle mb-0">
              <thead>
                <tr style={{ color: "var(--text-muted)" }}>
                  <th className="fw-medium">Order</th>
                  <th className="fw-medium">Customer</th>
                  <th className="fw-medium">Date</th>
                  <th className="fw-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.order_id}>
                    <td>
                      <Link
                        to={`/admin/orders/${order.order_id}`}
                        className="text-decoration-none"
                        style={{ color: "var(--brand-accent)" }}
                      >
                        #{order.order_id}
                      </Link>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      {order.customer_id}
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>
                      {new Date(order.order_tms).toLocaleDateString()}
                    </td>
                    <td>
                      <StatusBadge status={order.order_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentOrders;