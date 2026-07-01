import { Minus, Plus, Trash2 } from "lucide-react";
import useCartStore from "../store/cartStore";
import "./CartItem.css";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
}

function CartItem({ item }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="cart-item">
      <span
        className="cart-item-swatch"
        style={{ backgroundColor: item.colour || "var(--border-default)" }}
        aria-hidden="true"
      />

      <div className="cart-item-info">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">{formatCurrency(item.unitPrice)} each</p>
      </div>

      <div className="cart-item-stepper">
        <button
          type="button"
          className="cart-stepper-btn"
          aria-label="Decrease quantity"
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
        >
          <Minus size={14} strokeWidth={2} />
        </button>
        <span className="cart-stepper-value">{item.quantity}</span>
        <button
          type="button"
          className="cart-stepper-btn"
          aria-label="Increase quantity"
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
        >
          <Plus size={14} strokeWidth={2} />
        </button>
      </div>

      <p className="cart-item-total">{formatCurrency(lineTotal)}</p>

      <button
        type="button"
        className="cart-item-remove"
        aria-label="Remove from cart"
        onClick={() => removeItem(item.productId)}
      >
        <Trash2 size={16} strokeWidth={1.75} />
      </button>
    </div>
  );
}

export default CartItem;
