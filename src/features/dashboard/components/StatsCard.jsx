import './StatsCard.css';

export function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  tone = 'neutral',
  className = '',
  style,
}) {
  return (
    <div className={`stats-card ${className}`.trim()} style={style}>
      <div className="stats-card__icon-wrap">
        {Icon ? (
          <Icon
            className="stats-card__icon"
            size={20}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        ) : null}
      </div>

      <div className="stats-card__body">
        <p className="stats-card__label">{label}</p>

        <p className={`stats-card__value stats-card__value--${tone} tabular-nums`}>
          {value}
        </p>

        {trend ? (
          <span className="stats-card__trend">{trend}</span>
        ) : null}
      </div>
    </div>
  );
}

export default StatsCard;