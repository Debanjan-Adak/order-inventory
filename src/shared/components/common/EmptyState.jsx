import { Inbox } from "lucide-react";
function EmptyState({
  title = "No Data Found",

  message = "Nothing to display.",

  heading,

  body,
}) {
  const displayTitle = heading || title;
  const displayMessage = body || message;

  return (
    <div className="text-center py-5">
      {
            <Inbox
                size={60}
                className="mb-3 text-secondary"
            />
            }
      <h4>{displayTitle}</h4>
      <p className="text-secondary">{displayMessage}</p>
    </div>
  );
}
export default EmptyState;
