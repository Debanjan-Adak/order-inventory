import './StatusBadge.css';

const STATUS_COLOR_KEYS = [
  'PENDING',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'LOWSTOCK',
];
const SEMANTIC_TONE_MAP = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  LOWSTOCK: 'LOWSTOCK',
  LOW_STOCK: 'LOWSTOCK',

  ACTIVE: 'DELIVERED',
  ENABLED: 'DELIVERED',
  APPROVED: 'DELIVERED',
  IN_STOCK: 'DELIVERED',
  COMPLETED: 'DELIVERED',
  PAID: 'DELIVERED',

  BANNED: 'CANCELLED',
  DISABLED: 'CANCELLED',
  REJECTED: 'CANCELLED',
  OUT_OF_STOCK: 'CANCELLED',
  FAILED: 'CANCELLED',
  REFUNDED: 'CANCELLED',

  INACTIVE: 'PENDING',
  DRAFT: 'PENDING',
  ON_HOLD: 'PENDING',
};

function resolveTone(status, tone) {
  const key = (tone ?? status ?? '').toString().toUpperCase();
  if (STATUS_COLOR_KEYS.includes(key)) {
    return key;
  }
  return SEMANTIC_TONE_MAP[key] ?? 'PENDING';
}

function toTitleCase(value) {
  return value
    .toString()
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
export function StatusBadge({ status, label, tone }) {
  const resolvedTone = resolveTone(status, tone);
  const text = label ?? toTitleCase(status ?? '');

  return (
    <span className={`status-badge status-badge--${resolvedTone.toLowerCase()}`}>
      {text}
    </span>
  );
}

export default StatusBadge;
