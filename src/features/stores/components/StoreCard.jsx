import { Link } from "react-router-dom";
import { Globe, ArrowRight } from "lucide-react";
import { StoreMap } from "./StoreMap";
import "./StoreCard.css";

export function StoreCard({ store, showDetailsLink = false }) {
  const isOnline = Boolean(store.web_address) && !store.physical_address;

  return (
    <div className="store-card">
      <div className="store-card__header">
        <h3 className="store-card__name">{store.store_name}</h3>
        {isOnline ? (
          <span className="store-card__badge">Online store</span>
        ) : null}
      </div>

      {isOnline ? (
        <a
          href={store.web_address}
          target="_blank"
          rel="noreferrer"
          className="store-card__web-link"
        >
          <Globe size={14} strokeWidth={2} aria-hidden="true" />
          {store.web_address}
        </a>
      ) : (
        <address className="store-card__address">
          {store.physical_address}
        </address>
      )}

      <StoreMap latitude={store.latitude} longitude={store.longitude} />

      {showDetailsLink ? (
        <Link
          to={`/admin/stores/${store.id}`}
          className="store-card__details-link"
        >
          View details
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

export default StoreCard;
