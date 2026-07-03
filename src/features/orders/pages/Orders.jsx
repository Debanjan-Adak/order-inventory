import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { OrderTable } from "../components/OrderTable";
import { useOrders } from "../hooks/useOrders";
import { useOrderMutations } from "../hooks/useOrderMutations";
import useAuthStore from "../../auth/store/authStore";

export default function Orders() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const isAdmin = role === "admin";

  const { data: orders, isLoading } = useOrders();
  const { cancelOrderMutation, deleteOrderMutation } = useOrderMutations();

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    if (isAdmin) return orders;

    const customerId = user?.customer_id || user?.id;
    return orders.filter(
      (order) => Number(order.customer_id) === Number(customerId)
    );
  }, [orders, isAdmin, user]);

  return (
    <div>
      <div>
        <div>
          <h2>
            {isAdmin ? "System Transaction Dispatch Engine" : "My Order Ledger"}
          </h2>
        </div>

        <div>
          {isAdmin && (
            <button onClick={() => navigate("/admin/orders/new")}>
              + Sequence Initiation
            </button>
          )}
        </div>
      </div>

      <OrderTable
        orders={filteredOrders}
        isLoading={isLoading}
        onView={(id) => navigate(isAdmin ? `/admin/orders/${id}` : `/orders/${id}`)}
        onCancel={isAdmin ? (id) => cancelOrderMutation.mutate(id) : undefined}
        onDelete={isAdmin ? (id) => deleteOrderMutation.mutate(id) : undefined}
      />
    </div>
  );
}