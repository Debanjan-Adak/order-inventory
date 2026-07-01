import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCartStore from "../store/cartStore";
import CheckoutSummary from "../components/CheckoutSummary";
import "./Checkout.css";

// Placeholder — swap for Member 5's real ordersApi.createOrder once it
// exists. Kept local so this page works standalone in the meantime.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function placeOrder(payload) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Order could not be placed");
  return response.json();
}

function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);

  const [storeId, setStoreId] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  async function handlePlaceOrder() {
    if (!storeId) {
      toast.error("Select a store to fulfil this order.");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const order = await placeOrder({
        store_id: storeId,
        items: items.map((item) => ({ product_id: item.productId, quantity: item.quantity })),
      });
      toast.success("Order placed.");
      clearCart();
      navigate(`/orders/${order.id}`);
    } catch {
      toast.error("Couldn't place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  }

  return (
    <div className="checkout-page">
      <h1 className="page-title mb-4">Checkout</h1>

      <div className="checkout-layout">
        <div className="checkout-form-card">
          <label htmlFor="store" className="form-label">
            Fulfil from store
          </label>
          <select
            id="store"
            className="form-select"
            value={storeId}
            onChange={(event) => setStoreId(event.target.value)}
          >
            <option value="">Select a store...</option>
            {/* Replace with real stores once the stores endpoint is wired up */}
            <option value="1">Store 1 — Downtown</option>
            <option value="2">Store 2 — Warehouse District</option>
          </select>
        </div>

        <CheckoutSummary
          items={items}
          subtotal={subtotal}
          onPlaceOrder={handlePlaceOrder}
          isPlacingOrder={isPlacingOrder}
          disabled={items.length === 0}
        />
      </div>
    </div>
  );
}

export default Checkout;
