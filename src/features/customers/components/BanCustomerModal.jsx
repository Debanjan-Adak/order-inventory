// Adjust this import to wherever Member 1's shared ConfirmDialog actually
// lives — assumed interface: { isOpen, title, message, confirmLabel,
// cancelLabel, variant, isLoading, onConfirm, onCancel }
import ConfirmDialog from "../../../shared/components/common/ConfirmDialog";
import { useSetCustomerBlockedStatus } from "../hooks/useCustomerMutations";

function BanCustomerModal({ customer, isOpen, onClose }) {
  const { mutate: setBlockedStatus, isPending } = useSetCustomerBlockedStatus();

  if (!customer) return null;

  const isCurrentlyBlocked = customer.isblocked;

  function handleConfirm() {
    setBlockedStatus(
      { customerId: customer.customer_id, isblocked: !isCurrentlyBlocked },
      { onSuccess: onClose }
    );
  }

  return (
    <ConfirmDialog
      isOpen={isOpen}
      title={isCurrentlyBlocked ? "Unblock this customer?" : "Block this customer?"}
      message={
        isCurrentlyBlocked
          ? `${customer.full_name} will regain the ability to sign in and place orders.`
          : `${customer.full_name} will no longer be able to sign in or place new orders. This can be reversed at any time.`
      }
      confirmLabel={isCurrentlyBlocked ? "Unblock" : "Block customer"}
      cancelLabel="Cancel"
      variant={isCurrentlyBlocked ? "default" : "danger"}
      isLoading={isPending}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
}

export default BanCustomerModal;
