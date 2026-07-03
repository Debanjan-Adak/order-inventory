// confirmation in pages delete product,del customer, ban customer, cancel order, logout.
import { Button } from "react-bootstrap";
import CustomModal from "./Modal";
function ConfirmDialog({show,isOpen,onClose,onCancel,onConfirm,title = "Confirm Action",message = "Are you sure you want to continue?",
body,confirmText = "Confirm",confirmLabel,cancelText = "Cancel",cancelLabel,confirmVariant = "danger",isDestructive}) 
{
    const isVisible = show !== undefined ? show : isOpen;
    const closeHandler = onClose || onCancel;
    const bodyText = message || body;
    const confirmBtnText = confirmText !== "Confirm" ? confirmText : (confirmLabel || confirmText);
    const cancelBtnText = cancelText !== "Cancel" ? cancelText : (cancelLabel || cancelText);
    const variant = isDestructive ? "danger" : confirmVariant;
    return (

        <CustomModal show={isVisible} onClose={closeHandler} title={title} size="md" footer={
        <>
            <Button variant="secondary" onClick={closeHandler}>{cancelBtnText}</Button>
            <Button variant={variant} onClick={onConfirm}>{confirmBtnText}</Button>
        </>
        }>
        <p className="mb-0">{bodyText}</p>
        </CustomModal>
    );
}
export default ConfirmDialog;