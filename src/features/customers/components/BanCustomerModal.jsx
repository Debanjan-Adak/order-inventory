import { ConfirmDialog } from "@shared/components/common/ConfirmDialog";
import { useUpdateCustomer } from "../hooks/useCustomerMutations";
import "./BanCustomerModal.css";

export function BanCustomerModal({ isOpen, onClose, customer }) {
  const updateCustomer = useUpdateCustomer();

  async function handleConfirm() {
    if (!customer) return;
    try {
      await updateCustomer.mutateAsync({ id: customer.id, isblocked: true });
      onClose();
    } catch {}
  }

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Ban this customer?"
      body={`This will prevent ${customer?.full_name ?? "this customer"} from placing new orders.`}
      confirmLabel="Ban"
      cancelLabel="Cancel"
      isDestructive
      isPending={updateCustomer.isPending}
    />
  );
}

export function UnbanButton({ customer, className = "" }) {
  const updateCustomer = useUpdateCustomer();

  function handleUnban(event) {
    event.stopPropagation();
    if (!customer) return;
    updateCustomer.mutate({ id: customer.id, isblocked: false });
  }

  return (
    <button
      type="button"
      className={`btn btn-outline-secondary unban-button ${className}`}
      onClick={handleUnban}
      disabled={updateCustomer.isPending}
    >
      Unban
    </button>
  );
}

export default BanCustomerModal;
