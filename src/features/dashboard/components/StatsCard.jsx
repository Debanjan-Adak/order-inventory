import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function StatsCard({ icon: Icon, label, value, trend, isLoading }) {
  const trendPositive = typeof trend === "number" && trend >= 0;
  const trendNegative = typeof trend === "number" && trend < 0;

  return (
    <div className="card border h-100">
      <div className="card-body d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between">
          <span className="small text-secondary">{label}</span>
          {Icon ? (
            <div
              className="d-flex align-items-center justify-content-center rounded"
              style={{
                height: "32px",
                width: "32px",
                backgroundColor: "rgba(79,70,229,0.1)",
              }}
            >
              <Icon size={18} strokeWidth={1.75} style={{ color: "var(--brand-accent)" }} />
            </div>
          ) : null}
        </div>

        {isLoading ? (
          <div
            className="placeholder-glow"
            style={{ height: "32px", width: "96px" }}
          >
            <span className="placeholder col-12 h-100 rounded"></span>
          </div>
        ) : (
          <div className="d-flex align-items-end gap-2">
            <span
              className="fs-3 fw-semibold"
              style={{ fontVariantNumeric: "tabular-nums", color: "var(--text-primary)" }}
            >
              {value}
            </span>
            {typeof trend === "number" ? (
              <span
                className="d-flex align-items-center gap-1 small fw-medium pb-1"
                style={{
                  fontVariantNumeric: "tabular-nums",
                  color: trendPositive
                    ? "var(--status-delivered)"
                    : trendNegative
                    ? "var(--status-cancelled)"
                    : "var(--text-muted)",
                }}
              >
                {trendPositive ? <ArrowUpRight size={14} /> : null}
                {trendNegative ? <ArrowDownRight size={14} /> : null}
                {Math.abs(trend)}%
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsCard;