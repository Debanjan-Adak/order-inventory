import './Loader.css';
export function Loader({ size = 'md' }) {
  const sizeClass = size === 'sm' ? 'loader--sm' : 'loader--md';

  return (
    <span className={`loader ${sizeClass}`} role="status" aria-label="Loading">
      <span className="loader__spinner" aria-hidden="true" />
    </span>
  );
}

export default Loader;
