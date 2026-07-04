import StatusBadge from '@shared/components/common/StatusBadge';
import './ShipmentStatus.css';

const TONE_MAP = {
  CREATED: 'PENDING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
};

function toTitleCase(value) {
  return value
    .toString()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}


export function ShipmentStatus({ status }) {
  const tone = TONE_MAP[status] ?? 'PENDING';
  const label = toTitleCase(status ?? '');

  return (
    <span className="shipment-status">
      <StatusBadge status={status} tone={tone} label={label} />
    </span>
  );
}

export default ShipmentStatus;
