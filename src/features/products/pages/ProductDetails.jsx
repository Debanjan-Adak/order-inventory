// for structure

import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import ProductImage from "../components/ProductImage";
import { useProduct } from "../hooks/useProducts";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import Skeleton from "../../../shared/components/common/Skeleton";
import ErrorState from "../../../shared/components/common/ErrorState";
import useCartStore from "../../cart/store/cartStore";
import useAuthStore from "../../auth/store/authStore";

function RatingStars({ rating }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="d-flex align-items-center gap-1">
      {stars.map((value) => (
        <Star
          key={value}
          size={18}
          strokeWidth={1.75}
          className={value <= rating ? "text-warning" : "text-secondary"}
          fill={value <= rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useProduct(id);
  const addItem = useCartStore((state) => state.addItem);
  const role = useAuthStore((state) => state.role);
  const showAddToCart = role !== "admin";

  const product = Array.isArray(data) ? data[0] : data;

  if (isLoading) {
    return <Skeleton rows={6} />;
  }

  if (isError || !product) {
    return (
      <ErrorState
        heading="Something went wrong"
        body="We couldn't load this data. Check your connection and try again."
      />
    );
  }

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-5">
        <div style={{ height: "320px" }}>
          <ProductImage colour={product.colour} size="card" />
        </div>
      </div>

      <div className="col-12 col-lg-7 d-flex flex-column gap-3">
        <h1 className="h3 fw-semibold mb-0" style={{ color: "var(--text-primary)" }}>
          {product.product_name}
        </h1>

        <div className="d-flex align-items-center gap-3">
          <span className="badge rounded-pill text-bg-light border">{product.brand}</span>
          <RatingStars rating={product.rating} />
        </div>

        <span
          className="fs-2 fw-bold"
          style={{ fontVariantNumeric: "tabular-nums", color: "var(--text-primary)" }}
        >
          {formatCurrency(product.unit_price)}
        </span>

        <dl className="row mb-0">
          <dt className="col-4 col-sm-3 small" style={{ color: "var(--text-muted)" }}>
            Colour
          </dt>
          <dd className="col-8 col-sm-9">{product.colour}</dd>

          <dt className="col-4 col-sm-3 small" style={{ color: "var(--text-muted)" }}>
            Size
          </dt>
          <dd className="col-8 col-sm-9">{product.size}</dd>
        </dl>

        {showAddToCart && (
          <div>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 mt-3"
              style={{ backgroundColor: "var(--brand-accent)", borderColor: "var(--brand-accent)", borderRadius: "10px" }}
              onClick={() => {
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;