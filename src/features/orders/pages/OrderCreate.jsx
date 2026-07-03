import React from "react";
import { useNavigate } from "react-router-dom";
import { OrderForm } from "../components/OrderForm";
import { useOrderMutations } from "../hooks/useOrderMutations";
import { useOrderStore } from "../hooks/useOrders";

export default function OrderCreate() {
  const navigate = useNavigate();
  const theme = useOrderStore((state) => state.theme);
  const { createOrderMutation } = useOrderMutations();

  const handleFormSubmission = (values, { setSubmitting }) => {
    const payload = {
      order: {
        order_id: Math.floor(1000 + Math.random() * 9000),
        order_tms: new Date().toISOString().slice(0, 19).replace("T", " "),
        customer_id: Number(values.customer_id),
        store_id: Number(values.store_id),
        order_status: "PENDING"
      },
      items: values.items.map((item, idx) => ({
        line_item_id: idx + 1,
        product_id: Number(item.product_id),
        unit_price: Number(item.unit_price),
        quantity: Number(item.quantity),
        shipment_id: null
      }))
    };

    createOrderMutation.mutate(payload, {
      onSuccess: () => {
        setSubmitting(false);
        navigate("/orders");
      },
      onError: () => setSubmitting(false)
    });
  };

  return (
    <div>
      <div>
        <h3>Initiate Order Sequence Vector</h3>
      </div>

      <OrderForm 
        onSubmit={handleFormSubmission} 
        isSubmitting={createOrderMutation.isPending} 
      />
    </div>
  );
}