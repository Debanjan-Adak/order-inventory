import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrderDetails, useOrderStore } from "../hooks/useOrders";
import { OrderStatus } from "../components/OrderStatus";
import { OrderItems } from "../components/OrderItems";
import { OrderSummary } from "../components/OrderSummary";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useOrderStore((state) => state.theme);
  const { data: fullOrder, isLoading, error } = useOrderDetails(id);

  if (isLoading) 
    return 
    <div className="container-fluid p-5 text-center min-vh-100 d-flex 
    justify-content-center align-items-center">
      <div className="spinner-border text-primary" 
      style={{ color: "#4F46E5" }}>
        </div>
        </div>;
  
  if (error || !fullOrder) 
    return 
    <div className="container p-5">
      <div className="alert alert-danger font-monospace">
        Error loading coordinates.
        </div></div>;

  return (

    <div className={`container-fluid py-4 min-vh-100 
    ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>

      <div className="container">
        <button className="btn btn-sm btn-outline-secondary mb-3 font-monospace" 
        onClick={() => navigate(-1)}>← Back to Ledger Matrix
        </button>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className={`card p-4 mb-4 border shadow-sm 
              ${theme === "dark" ? "bg-secondary-subtle border-secondary" : "bg-white"}`}>
              <h4 className="fw-bold mb-1">Detailed Log Sequence Information</h4>
              <span className="text-muted font-monospace small">
                System UUID Reference: #{fullOrder.order_id}</span>
              <OrderStatus status={fullOrder.order_status} />
            </div>
            <OrderItems items={fullOrder.items} theme={theme} />
          </div>
          <div className="col-lg-4">
            <OrderSummary items={fullOrder.items} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}