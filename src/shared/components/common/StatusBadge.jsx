import Badge from "react-bootstrap/Badge";

function StatusBadge({ status }) {
  if (!status) {
    return <Badge bg="secondary">Unknown</Badge>;
  }

  const currentStatus = status.toString().toUpperCase();

  let variant = "secondary";

  let text = status;

  switch (currentStatus) {
    case "PENDING":
      variant = "warning";
      text = "Pending";
      break;

    case "PROCESSING":
      variant = "primary";
      text = "Processing";
      break;

    case "SHIPPED":
      variant = "info";
      text = "Shipped";
      break;

    case "DELIVERED":
    case "COMPLETE":
      variant = "success";
      text = "Delivered";
      break;

    case "CANCELLED":
      variant = "danger";
      text = "Cancelled";
      break;

    case "ACTIVE":
      variant = "success";
      text = "Active";
      break;

    case "BLOCKED":
      variant = "danger";
      text = "Blocked";
      break;

    case "LOW STOCK":
    case "LOW_STOCK":
      variant = "warning";
      text = "Low Stock";
      break;

    case "IN STOCK":
    case "IN_STOCK":
      variant = "success";
      text = "In Stock";
      break;

    default:
      variant = "secondary";
      text = status;
  }

  return (
    <Badge bg={variant} pill className="px-3 py-2 fw-semibold">
      {text}
    </Badge>
  );
}

export default StatusBadge;
