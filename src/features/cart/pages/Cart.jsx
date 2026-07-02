import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../store/cartStore";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty-state">
          <ShoppingCart size={48} strokeWidth={1.5} />
          <p className="fw-medium mt-3 mb-1">Your cart is empty</p>
          <p className="text-muted small mb-3">Browse products and add something you like.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate("/")}>
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="page-title mb-4">Your cart</h1>

      <div className="cart-layout">
        <div className="cart-items-card">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        <CartSummary />
      </div>
    </div>
  );
}

export default Cart;
