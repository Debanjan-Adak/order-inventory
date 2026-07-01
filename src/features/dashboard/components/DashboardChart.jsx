import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useOrderStatusCount } from "../../orders/hooks/useOrders";
import { useShipmentStatusCount } from "../../customers/hooks/useCustomers";

const STATUS_COLORS = {
  PENDING: "#F59E0B",
  PROCESSING: "#3B82F6",
  SHIPPED: "#8B5CF6",
  DELIVERED: "#22C55E",
  COMPLETE: "#22C55E",
  CANCELLED: "#EF4444",
};

function toChartData(counts) {
  if (!counts) return [];
  return Object.entries(counts).map(([status, count]) => ({
    name: status.charAt(0) + status.slice(1).toLowerCase(),
    value: count,
    color: STATUS_COLORS[status] || "#94A3B8",
  }));
}

function DashboardChart() {
  const { data: orderStatusCounts, isLoading: orderLoading } = useOrderStatusCount();
  const { data: shipmentStatusCounts, isLoading: shipmentLoading } = useShipmentStatusCount();

  const orderData = useMemo(() => toChartData(orderStatusCounts), [orderStatusCounts]);
  const shipmentData = useMemo(() => toChartData(shipmentStatusCounts), [shipmentStatusCounts]);

  const isLoading = orderLoading || shipmentLoading;

  return (
    <div className="card border">
      <div className="card-body row g-4">
        <div className="col-12 col-lg-6 d-flex flex-column gap-3">
          <h3 className="h6 fw-semibold mb-0" style={{ color: "var(--text-primary)" }}>
            Orders by Status
          </h3>
          {isLoading ? (
            <div className="placeholder-glow">
              <span className="placeholder col-12 rounded" style={{ height: "220px" }}></span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={orderData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  isAnimationActive
                  animationDuration={500}
                >
                  {orderData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="col-12 col-lg-6 d-flex flex-column gap-3">
          <h3 className="h6 fw-semibold mb-0" style={{ color: "var(--text-primary)" }}>
            Shipments by Status
          </h3>
          {isLoading ? (
            <div className="placeholder-glow">
              <span className="placeholder col-12 rounded" style={{ height: "220px" }}></span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={shipmentData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  isAnimationActive
                  animationDuration={500}
                >
                  {shipmentData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardChart;