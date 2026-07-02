//dashboard and products page
function PageHeader({ title, actionLabel, onAction }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h2 className="fw-semibold mb-0" style={{ color: "var(--text-primary)" }}>
        {title}
      </h2>

      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default PageHeader;
