import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { restockSchema } from "../validation/restockSchema";

export const InventoryForm = ({ initialValues, onSubmit, isSubmitting, theme }) => {
  const isDark = theme === "dark";

  return (

    <Formik
      initialValues={initialValues || { store_id: "", product_id: "", product_inventory: 0 }}
      validationSchema={restockSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form className={`p-4 rounded border shadow-sm 
        ${isDark ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold text-uppercase" 
              style={{ fontSize: "0.75rem" }}>
                Store Node ID
            </label>
              
              <Field 
                name="store_id" 
                placeholder="E.g. 10"
                className={`form-control form-control-sm bg-transparent text-reset 
                    ${errors.store_id && touched.store_id ? "is-invalid" : ""}`} 
                disabled={!!initialValues?.id} 
              />
              <ErrorMessage name="store_id" 
              component="div" 
              className="invalid-feedback fw-bold" 
              style={{fontSize: "0.7rem"}} />
            </div>
            
            <div className="col-md-6">
              <label className="form-label small fw-bold text-uppercase" 
              style={{ fontSize: "0.75rem" }}>
                Product SKU Reference
                </label>

              <Field 
                name="product_id" 
                placeholder="E.g. 33"
                className={`form-control form-control-sm bg-transparent text-reset ${errors.product_id && touched.product_id ? "is-invalid" : ""}`} 
                disabled={!!initialValues?.id} 
              />

              <ErrorMessage 
              name="product_id" 
              component="div" 
              className="invalid-feedback fw-bold" 
              style={{fontSize: "0.7rem"}} />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-uppercase" 
            style={{ fontSize: "0.75rem", color: "#4F46E5" }}>Total Stock Quantity Allocation</label>
            <Field 
              name="product_inventory" 
              type="number"
              className={`form-control form-control-lg bg-transparent text-reset font-monospace fw-bold 
                ${errors.product_inventory && touched.product_inventory ? "is-invalid" : ""}`} 
            />
            <ErrorMessage 
            name="product_inventory" 
            component="div" 
            className="invalid-feedback fw-bold" />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 transition-all btn-interact d-flex justify-content-center 
            align-items-center" 
            disabled={isSubmitting} 
            style={{ backgroundColor: "#4F46E5", border: "none" }}
          >
            {isSubmitting ? 
            <span className="spinner-border spinner-border-sm me-2"></span> : 
            "Confirm Stock Allocation"}
          </button>

        </Form>

      )}
    </Formik>
    
  );
};