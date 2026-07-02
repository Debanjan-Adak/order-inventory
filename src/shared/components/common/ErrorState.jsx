import { TriangleAlert } from "lucide-react";
function ErrorState({
  title = "Something Went Wrong",

  message = "Please try again later.",

  heading,

  body,

  onRetry,
}) {
  const displayTitle = heading || title;
  const displayMessage = body || message;

  return (
    <div className="text-center py-5">
      <TriangleAlert size={60} className="text-danger mb-3"/>    
      <h4>{displayTitle}</h4>
      <p className="text-secondary">{displayMessage}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;
