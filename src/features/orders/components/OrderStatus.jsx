import React from "react";

export const OrderStatus = ({ status }) => {
  const stepMap = { PENDING: 1, PROCESSING: 2, SHIPPED: 3, COMPLETE: 4, CANCELLED: 0 };
  const currentStep = stepMap[status] || 1;

  if (status === "CANCELLED") {
    return <div 
    className="alert alert-danger text-center fw-bold font-monospace border-danger border-1">
      ⚠️ Vector Sequence CANCELLED</div>;
  }

  return (
    <div className="py-3 px-1 my-3 bg-light rounded border border-light-subtle shadow-inner">
      <div className="position-relative d-flex justify-content-between align-items-center w-75 mx-auto">
        <div className="position-absolute bg-secondary opacity-25 start-0 end-0" 
        style={{ height: "4px", top: "12px", zIndex: 0 }}></div>
        <div className="position-absolute start-0 bg-primary transition-all" 
        style={{ height: "4px", top: "12px", 
                width: `${((currentStep - 1) / 3) * 100}%`, 
                zIndex: 0, backgroundColor: "#4F46E5" }}>

          </div>
        
        {["Pending", "Processing", "Shipped", "Settled"].map((label, idx) => (
          <div key={label} 
          className="d-flex flex-column align-items-center position-relative" 
          style={{ zIndex: 1 }}>

            <div className="rounded-circle d-flex align-items-center 
            justify-content-center fw-bold transition-all" 
                 style={{ width: "28px", height: "28px", fontSize: "0.75rem", 
                 backgroundColor: currentStep >= idx + 1 ? "#4F46E5" : "#fff", 
                 color: currentStep >= idx + 1 ? "#fff" : "#000", border: "2px solid #E2E8F0" }}>
              {idx + 1}

            </div>

            <span 
            className="small mt-2 fw-bold text-muted font-monospace" 
            style={{ fontSize: "0.65rem" }}>{label}
            </span>

          </div>

        ))}

      </div>
      
    </div>
  );
};