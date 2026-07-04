import './Skeleton.css';

export function Skeleton({ variant = 'text', width, height, count = 1 }) {
  const items = Array.from({ length: count }, (_, index) => index);

  return (
    <>
      {items.map((index) => (
        <span
          key={index}
          className={`skeleton skeleton--${variant} skeleton-shimmer`}
          style={{
            width: width ?? undefined,
            height: height ?? undefined,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
export function SkeletonRow({ columns = 4, height = 16 }) {
  return (
    <tr className="skeleton-row">
      {Array.from({ length: columns }, (_, index) => (
        <td key={index}>
          <span
            className="skeleton skeleton--text skeleton-shimmer"
            style={{ height }}
            aria-hidden="true"
          />
        </td>
      ))}
    </tr>
  );
}
export function SkeletonCard({ height = 120 }) {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <span className="skeleton skeleton--rect skeleton-shimmer" style={{ height }} />
      <span className="skeleton skeleton--text skeleton-shimmer" style={{ width: '70%' }} />
      <span className="skeleton skeleton--text skeleton-shimmer" style={{ width: '40%' }} />
    </div>
  );
}

export default Skeleton;
