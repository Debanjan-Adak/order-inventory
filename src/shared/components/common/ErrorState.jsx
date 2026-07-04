import { CircleAlert } from 'lucide-react';
import './ErrorState.css';
export function ErrorState({
  icon: Icon = CircleAlert,
  heading = 'Something went wrong',
  body = "We couldn't load this data. Check your connection and try again.",
  onRetry,
}) {
  return (
    <div className="error-state">
      <div className="error-state__icon-backdrop">
        <Icon className="error-state__icon" size={48} strokeWidth={1.75} aria-hidden="true" />
      </div>
      {heading ? <h3 className="error-state__heading">{heading}</h3> : null}
      {body ? <p className="error-state__body">{body}</p> : null}
      <button type="button" className="btn btn-outline-secondary error-state__action" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export default ErrorState;
