import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { OrderTable } from "../components/OrderTable";
import { useOrders, useOrderStore } from "../hooks/useOrders";
import { useOrderMutations } from "../hooks/useOrderMutations";
import useAuthStore from "../../auth/store/authStore";

export default function Orders() {
  const navigate = useNavigate();
  const theme = useOrderStore((state) => state.theme);
  const toggleTheme = useOrderStore((state) => state.toggleTheme);
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
    <div className={`container-fluid py-4 min-vh-100 
    ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold tracking-tight mb-0">
            {isAdmin ? "System Transaction Dispatch Engine" : "My Order Ledger"}
          </h2>
        </div>

        <div className="d-flex gap-2">
          <button className={`btn btn-sm border fw-semibold 
            ${theme === "dark" ? "btn-light text-dark" : "btn-dark text-light"}`} 
            onClick={toggleTheme}>
            Toggle Theme
          </button>

          {isAdmin && (
            <button className="btn text-white px-3 fw-bold" 
            style={{ backgroundColor: "#4F46E5", border: "none" }} 
            onClick={() => navigate("/admin/orders/new")}>
              + Sequence Initiation
            </button>

          )}
        </div>

      </div>
      
      <OrderTable 
        orders={filteredOrders} 
        isLoading={isLoading} 
        theme={theme} 
        onView={(id) => navigate(isAdmin ? `/admin/orders/${id}` : `/orders/${id}`)} 
        onCancel={isAdmin ? (id) => cancelOrderMutation.mutate(id) : undefined} 
        onDelete={isAdmin ? (id) => deleteOrderMutation.mutate(id) : undefined} 
      />
    </div>
  );
}