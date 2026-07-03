import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrderDetails } from "../hooks/useOrders";
import { OrderStatus } from "../components/OrderStatus";
import { OrderItems } from "../components/OrderItems";
import { OrderSummary } from "../components/OrderSummary";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: fullOrder, isLoading, error } = useOrderDetails(id);

  if (isLoading) return <div>Loading...</div>;

  if (error || !fullOrder) return <div>Error loading coordinates.</div>;

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>← Back to Ledger Matrix</button>

        <div>
          <div>
            <div>
              <h4>Detailed Log Sequence Information</h4>
              <p>System UUID Reference: #{fullOrder.order_id}</p>
              <OrderStatus status={fullOrder.order_status} />
            </div>
            <OrderItems items={fullOrder.items} />
          </div>

          <div>
            <OrderSummary items={fullOrder.items} />
          </div>
        </div>
      </div>
    </div>
  );
}