import { Link } from "react-router-dom";
import { Store } from "lucide-react";
import { formatDate } from "@shared/utils/helpers";
import { OrderStatus } from "./OrderStatus";
import "./OrderCard.css";

/**
 * @param {object} props
 * @param {object} props.order 
 * @param {string} [props.storeName]
 * @param {string} props.basePath 
 */
export function OrderCard({ order, storeName, basePath }) {
  return (
    <div className="order-card d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-center gap-2">
        <span className="order-card__id fw-semibold">
          Order #{order.order_id}
        </span>

        <OrderStatus status={order.order_status} />
      </div>

      <div className="d-flex flex-column gap-1">
        <div className="order-card__row d-flex justify-content-between align-items-center">
          <span className="order-card__label d-inline-flex align-items-center gap-1">
            Placed
          </span>

          <span>{formatDate(order.order_tms)}</span>
        </div>

        <div className="order-card__row d-flex justify-content-between align-items-center">
          <span className="order-card__label d-inline-flex align-items-center gap-1">
            <Store size={14} strokeWidth={1.75} aria-hidden="true" />
            Store
          </span>

          <span>{storeName ?? `Store #${order.store_id}`}</span>
        </div>
      </div>

      <Link
        className="btn btn-outline-secondary align-self-start mt-1"
        to={`${basePath}/${order.id}`}
      >
        View Order
      </Link>
    </div>
  );
}

export default OrderCard;
