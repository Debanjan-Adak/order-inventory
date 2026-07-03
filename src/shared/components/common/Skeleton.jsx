function Skeleton({ height = "20px",width = "100%",className = "",rows}) {
  if (rows) {
    return (
      <div className={`d-flex flex-column gap-3 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="placeholder-glow">
            <span
              className="placeholder col-12"
              style={{
                height,
                width,
                display: "block",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`placeholder-glow ${className}`}>
      <span
        className="placeholder col-12"
        style={{
          height,

          width,

          display: "block",

          borderRadius: "8px",
        }}
      />
    </div>
  );
}

export default Skeleton;
