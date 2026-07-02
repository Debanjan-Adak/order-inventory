import { useMemo } from "react";
import { DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useOrders } from "../../orders/hooks/useOrders";
import axiosClient from "../../../shared/api/axios";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import StatsCard from "./StatsCard";

function RevenueCard() {
  const { data: orders, isLoading: ordersLoading } = useOrders();

  const { data: orderItems, isLoading: itemsLoading } = useQuery({
    queryKey: ["order_items"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/order_items");
      return data;
    }
  });

  const completedOrderIds = useMemo(() => {
    if (!orders) return new Set();
    return new Set(
      orders
        .filter((order) => order.order_status === "COMPLETE" || order.order_status === "complete")
        .map((order) => order.order_id)
    );
  }, [orders]);

  const total = useMemo(() => {
    if (!orderItems || completedOrderIds.size === 0) return 0;
    return orderItems.reduce((sum, item) => {
      if (completedOrderIds.has(item.order_id)) {
        return sum + (Number(item.unit_price) || 0) * (Number(item.quantity) || 0);
      }
      return sum;
    }, 0);
  }, [orderItems, completedOrderIds]);

  const isLoading = ordersLoading || itemsLoading;

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