import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useCartStore from "../store/cartStore";
import CheckoutSummary from "../components/CheckoutSummary";
import "./Checkout.css";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function getStores() {
  const response = await fetch(`${BASE_URL}/stores`);
  if (!response.ok) throw new Error("Could not load stores");
  return response.json();
}

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

  const {
    data: stores,
    isLoading: storesLoading,
    isError: storesError,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
    staleTime: 5 * 60_000,
  });

  async function handlePlaceOrder() {
    if (!storeId) {
      toast.error("Select a store to fulfil this order.");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const order = await placeOrder({
        store_id: storeId,
        items: items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
        })),
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

  const selectedStore = stores?.find(
    (store) => String(store.store_id) === String(storeId),
  );

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
            disabled={storesLoading || storesError}
            onChange={(event) => setStoreId(event.target.value)}
          >
            <option value="">
              {storesLoading ? "Loading stores..." : "Select a store..."}
            </option>
            {stores?.map((store) => (
              <option key={store.store_id} value={store.store_id}>
                {store.store_name}
                {store.physical_address ? "" : " (ships online)"}
              </option>
            ))}
          </select>

          {storesError && (
            <p className="checkout-store-error">
              Couldn't load stores. Refresh the page and try again.
            </p>
          )}

          {selectedStore && (
            <div className="checkout-store-preview">
              {selectedStore.physical_address ? (
                <p className="checkout-store-address">
                  {selectedStore.physical_address
                    .split("\n")
                    .map((line, index) => (
                      <span key={index}>
                        {line.trim()}
                        <br />
                      </span>
                    ))}
                </p>
              ) : (
                <p className="checkout-store-address">
                  Ships directly to you — no pickup address for this store.
                </p>
              )}
              {selectedStore.web_address && (
                <a
                  href={selectedStore.web_address}
                  target="_blank"
                  rel="noreferrer"
                  className="checkout-store-link"
                >
                  {selectedStore.web_address}
                </a>
              )}
            </div>
          )}
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
