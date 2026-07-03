import "./CheckoutSummary.css";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

function CheckoutSummary({
  items,
  subtotal,
  onPlaceOrder,
  isPlacingOrder,
  disabled,
}) {
  return (
    <aside className="checkout-summary">
      <h3 className="checkout-summary-title">Review order</h3>

      <ul className="checkout-summary-list">
        {items.map((item) => (
          <li key={item.productId} className="checkout-summary-item">
            <span className="checkout-summary-item-name">
              {item.name} <span className="text-muted">x{item.quantity}</span>
            </span>
            <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="checkout-summary-total">
        <span>Total</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <button
        type="button"
        className="btn btn-primary w-100 mt-3"
        disabled={disabled || isPlacingOrder}
        onClick={onPlaceOrder}
      >
        {isPlacingOrder ? "Placing order..." : "Place order"}
      </button>
    </aside>
  );
}

export default CheckoutSummary;
