//  dynamic {title, footer , body}
import { Modal, Button } from "react-bootstrap";
function CustomModal({show,onClose,title,children,footer,size = "lg",centered = true,}) {
  return (
    <Modal show={show} onHide={onClose} size={size} centered={centered} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
    {footer ? (footer) : (
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
