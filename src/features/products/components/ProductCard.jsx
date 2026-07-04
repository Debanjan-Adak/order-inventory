import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Pencil, Trash2 } from "lucide-react";
import ProductImage from "./ProductImage";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import useCartStore from "../../cart/store/cartStore";
import useAuthStore from "../../auth/store/authStore";

function RatingStars({ rating }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="d-flex align-items-center gap-1">
      {stars.map((value) => (
        <Star
          key={value}
          size={14}
          strokeWidth={1.75}
          className={value <= rating ? "text-warning" : "text-secondary"}
          fill={value <= rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const role = useAuthStore((state) => state.role);
  const showAddToCart = role !== "admin";

  return (
    <div
      className="card border h-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        borderColor: hovered ? "var(--border-default)" : undefined,
        transition: "transform 150ms ease-out",
      }}
    >
      <div className="position-relative p-3 pb-0">
        <ProductImage colour={product.colour} size="card" />

        {(onEdit || onDelete) && (
          <div
            className="position-absolute top-0 end-0 mt-2 me-2 d-flex gap-1"
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 100ms ease-out",
            }}
          >
            {onEdit ? (
              <button
                type="button"
                className="btn btn-sm btn-light border rounded-circle d-flex align-items-center justify-content-center p-1"
                aria-label="Edit product"
                onClick={() => onEdit(product)}
              >
                <Pencil size={14} strokeWidth={1.75} />
              </button>
            ) : null}
            {onDelete ? (
              <button
                type="button"
                className="btn btn-sm btn-light border rounded-circle d-flex align-items-center justify-content-center p-1"
                aria-label="Delete product"
                onClick={() => onDelete(product)}
              >
                <Trash2 size={14} strokeWidth={1.75} className="text-danger" />
              </button>
            ) : null}
          </div>
        )}
      </div>

      <div className="card-body d-flex flex-column gap-2">
        <Link
          to={`/products/${product.product_name}`}
          className="text-decoration-none"
          style={{ color: "var(--text-primary)" }}
        >
          <span className="fw-semibold">{product.product_name}</span>
        </Link>

        <div className="d-flex align-items-center justify-content-between">
          <span className="badge rounded-pill text-bg-light border">
            {product.brand}
          </span>
          <RatingStars rating={product.rating} />
        </div>

        <div className="d-flex align-items-center justify-content-between mt-auto">
          <span
            className="fs-4 fw-bold"
            style={{ fontVariantNumeric: "tabular-nums", color: "var(--text-primary)" }}
          >
            {formatCurrency(product.unit_price)}
          </span>

          {showAddToCart && (
            <button
              type="button"
              className="btn btn-primary btn-sm px-2 py-1"
              style={{ backgroundColor: "var(--brand-accent)", borderColor: "var(--brand-accent)" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({
                  id: product.id || product.product_id,
                  name: product.product_name,
                  unitPrice: product.unit_price,
                  colour: product.colour
                });
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;