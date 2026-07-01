import { useMemo } from "react";
import { DollarSign } from "lucide-react";
import { useOrders } from "../../orders/hooks/useOrders";
import { useInventoryOrderDetails } from "../../inventory/hooks/useInventory";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import StatsCard from "./StatsCard";

function RevenueCard() {
  const { data: orders, isLoading: ordersLoading } = useOrders();

  const completedOrderIds = useMemo(() => {
    if (!orders) return [];
    return orders
      .filter((order) => order.order_status === "COMPLETE")
      .map((order) => order.order_id);
  }, [orders]);

  const detailQueries = completedOrderIds.map((orderId) =>
    useInventoryOrderDetails(orderId)
  );

  const isLoading = ordersLoading || detailQueries.some((q) => q.isLoading);

  const total = useMemo(() => {
    return detailQueries.reduce((sum, query) => {
      const items = query.data || [];
      const orderTotal = items.reduce(
        (lineSum, item) => lineSum + item.unit_price * item.quantity,
        0
      );
      return sum + orderTotal;
    }, 0);
  }, [detailQueries]);

  return (
    <StatsCard
      icon={DollarSign}
      label="Revenue"
      value={formatCurrency(total)}
      isLoading={isLoading}
    />
  );
}

export default RevenueCard;