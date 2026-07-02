import React from "react";
import { InventoryForm } from "./InventoryForm";

export const RestockModal = ({ isOpen, onClose, item, onSubmit, isSubmitting, theme }) => {
  if (!isOpen) return null;

  return (
    <>
      
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50" 
        style={{ zIndex: 1040 }} 
        onClick={onClose}
      ></div>

      
      <div className="position-fixed top-50 start-50 translate-middle w-100" 
        style={{ maxWidth: "500px", zIndex: 1050 }}>
        <div className={`card shadow border-0
           ${theme === "dark" ? "bg-dark border-secondary" : "bg-white"}`}>
          <div className={`card-header d-flex justify-content-between align-items-center border-bottom 
            ${theme === "dark" ? "border-secondary" : ""}`}>
            <h6 className={`mb-0 fw-bold 
              ${theme === "dark" ? "text-light" : "text-dark"}`}>
              {item ? "Adjust Stock Levels" : "Allocate New Inventory Matrix"}
            </h6>

            <button 
              type="button" 
              className={`btn-close ${theme === "dark" ? "btn-close-white" : ""}`} 
              onClick={onClose}
              aria-label="Close"
            ></button>

          </div>
          
          <div className="card-body p-0">
            <InventoryForm 
              initialValues={item} 
              onSubmit={onSubmit} 
              isSubmitting={isSubmitting} 
              theme={theme} 
            />
          </div>
        </div>
      </div>
    </>
  );
};