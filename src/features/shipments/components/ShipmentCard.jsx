import { ShipmentStatus } from './ShipmentStatus';
import './ShipmentCard.css';

export function ShipmentCard({ shipment }) {
  if (!shipment) {
    return null;
  }

  return (
    <div className="shipment-card">
      <div className="shipment-card__row">
        <span className="shipment-card__label">Delivery address</span>
        <span className="shipment-card__value">{shipment.delivery_address}</span>
      </div>

      <div className="shipment-card__row">
        <span className="shipment-card__label">Status</span>
        <ShipmentStatus status={shipment.shipment_status} />
      </div>

      <div className="shipment-card__row">
        <span className="shipment-card__label">Order reference</span>
        <span className="shipment-card__value shipment-card__value--muted">
          Order reference unavailable
        </span>
      </div>
    </div>
  );
}

export default ShipmentCard;
