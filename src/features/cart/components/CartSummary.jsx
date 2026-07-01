import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import "./CartSummary.css";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
}

function CartSummary() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <aside className="cart-summary">
      <h3 className="cart-summary-title">Order summary</h3>

      <div className="cart-summary-row">
        <span>Items ({itemCount})</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div className="cart-summary-row cart-summary-total">
        <span>Total</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <button
        type="button"
        className="btn btn-primary w-100 mt-3"
        disabled={items.length === 0}
        onClick={() => navigate("/checkout")}
      >
        Proceed to checkout
      </button>
    </aside>
  );
}

export default CartSummary;
