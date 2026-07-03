import React from "react";

export const OrderStatus = ({ status }) => {
  const stepMap = { PENDING: 1, PROCESSING: 2, SHIPPED: 3, COMPLETE: 4, CANCELLED: 0 };
  const currentStep = stepMap[status] || 1;
  const steps = ["Pending", "Processing", "Shipped", "Settled"];

  if (status === "CANCELLED") {
    return <div>⚠️ Vector Sequence CANCELLED</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {steps.map((label, idx) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                border: "2px solid black",
                backgroundColor: currentStep >= idx + 1 ? "black" : "white",
                color: currentStep >= idx + 1 ? "white" : "black",
              }}
            >
              {idx + 1}
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};