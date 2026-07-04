import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "@features/auth/store/authStore";
import { useCreateOrder } from "@features/orders/hooks/useOrderMutations";
import { Loader } from "@shared/components/common/Loader";
import formatCurrency from "@shared/utils/formatCurrency";
import "./CheckoutSummary.css";

const ONLINE_STORE_ID = 1;

export function CheckoutSummary() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);
  const createOrder = useCreateOrder();

  const subtotal = getSubtotal();
  const total = subtotal;

  async function handlePlaceOrder() {
    try {
      const createdOrder = await createOrder.mutateAsync({
        customerId: user.id,
        storeId: ONLINE_STORE_ID,
        items: items.map((item) => ({
          productId: item.productId,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
        })),
      });
      navigate(`/my-orders/${createdOrder.id}`);
      setTimeout(() => clearCart(), 0);
    } catch {}
  }

  return (
    <div className="checkout-summary">
      <h2 className="checkout-summary__heading">Review Your Order</h2>

      <ul className="checkout-summary__list">
        {items.map((item) => (
          <li key={item.productId} className="checkout-summary__item">
            <span
              className="checkout-summary__colour-dot"
              style={{ background: item.colour }}
              aria-hidden="true"
            />
            <span className="checkout-summary__item-name">
              {item.productName}
            </span>
            <span className="checkout-summary__item-qty tabular-nums">
              x{item.quantity}
            </span>
            <span className="checkout-summary__item-total tabular-nums">
              {formatCurrency(item.unitPrice * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="checkout-summary__divider" />

      <div className="checkout-summary__row">
        <span>Subtotal</span>
        <span className="tabular-nums">{formatCurrency(subtotal)}</span>
      </div>
      <div className="checkout-summary__row checkout-summary__row--total">
        <span>Total</span>
        <span className="tabular-nums">{formatCurrency(total)}</span>
      </div>

      <button
        type="button"
        className="btn btn-primary checkout-summary__place-order-btn"
        onClick={handlePlaceOrder}
        disabled={createOrder.isPending}
      >
        {createOrder.isPending ? <Loader size="sm" /> : null}
        Place Order
      </button>
    </div>
  );
}

export default CheckoutSummary;
