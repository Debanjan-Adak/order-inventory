import { Modal } from './Modal';
import { Loader } from './Loader';
import './ConfirmDialog.css';
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
  isPending = false,
}) {
  const footer = (
    <div className="confirm-dialog__actions">
      <button
        type="button"
        className="btn btn-outline-secondary confirm-dialog__cancel"
        onClick={onClose}
        disabled={isPending}
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        className={`btn confirm-dialog__confirm ${
          isDestructive ? 'confirm-dialog__confirm--destructive' : 'btn-primary'
        }`}
        onClick={onConfirm}
        disabled={isPending}
      >
        {isPending ? <Loader size="sm" /> : null}
        {confirmLabel}
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" footer={footer}>
      <p className="confirm-dialog__body">{body}</p>
    </Modal>
  );
}

export default ConfirmDialog;
