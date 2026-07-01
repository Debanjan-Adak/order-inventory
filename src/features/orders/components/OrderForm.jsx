import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const orderSchema = Yup.object().shape({
  customer_id: Yup.number()
    .typeError("Customer ID must be a valid number")
    .required("Customer ID is required")
    .positive("Must be a positive number")
    .integer("Must be an integer"),

  store_id: Yup.number()
    .typeError("Store Node ID must be a valid number")
    .required("Store Node ID is required")
    .positive("Must be a positive number")
    .integer("Must be an integer"),

  items: Yup.array()
    .of(
      Yup.object().shape({
        product_id: Yup.number()
          .typeError("Product SKU must be a number")
          .required("SKU is required")
          .positive("Must be positive")
          .integer("Must be an integer"),

        quantity: Yup.number()
          .typeError("Quantity must be a number")
          .required("Quantity is required")
          .min(1, "Min qty is 1")
          .integer("Must be a whole number"),

        unit_price: Yup.number()
          .typeError("Price must be a number")
          .required("Price is required")
          .min(0.01, "Price cannot be zero or negative")
      })
    )
    .min(1, "An order must contain at least 1 product line item")
    .required("Line items are required")
});

export const OrderForm = ({ onSubmit, isSubmitting, theme }) => {
  const isDark = theme === "dark";

  return (
    <Formik
      initialValues={{
        customer_id: "",
        store_id: "",
        items: [{ product_id: "", quantity: 1, unit_price: 10.0 }]
      }}
      validationSchema={orderSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched }) => (
        <Form className={`p-4 rounded border shadow-sm 
        ${isDark ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Customer Node Reference</label>
              <Field
                name="customer_id"
                placeholder="E.g. 45"
                className={`form-control ${errors.customer_id && touched.customer_id ? "is-invalid" : ""}
                 bg-transparent text-reset`}
              />
              <ErrorMessage name="customer_id" component="div" className="invalid-feedback fw-bold" />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">Target Inventory Warehouse Node</label>
              <Field
                name="store_id"
                placeholder="E.g. 1"
                className={`form-control ${errors.store_id && touched.store_id ? "is-invalid" : ""} 
                bg-transparent text-reset`}
              />
              <ErrorMessage name="store_id" component="div" className="invalid-feedback fw-bold" />
            </div>
          </div>

          <h6 className="fw-bold my-3 border-bottom pb-2 text-uppercase font-monospace tracking-wider" 
          style={{ color: "#4F46E5", fontSize: "0.8rem" }}>
            Allocation Line Items
          </h6>

          {typeof errors.items === "string" && (
            <div className="alert alert-danger p-2 small">{errors.items}</div>
          )}

          <FieldArray name="items">
            {({ push, remove }) => (
              <div>
                {values.items.map((item, index) => {
                  const itemErrors = errors.items?.length ? errors.items[index] : null;
                  const itemTouched = touched.items?.length ? touched.items[index] : null;

                  return (
                    <div className="row g-2 align-items-start mb-3" key={index}>
                      <div className="col-md-4">
                        <Field
                          name={`items.${index}.product_id`}
                          placeholder="Product SKU ID"
                          className={`form-control form-control-sm bg-transparent text-reset 
                            ${itemErrors?.product_id && itemTouched?.product_id ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name={`items.${index}.product_id`} 
                        component="div" 
                        className="invalid-feedback" 
                        style={{ fontSize: "0.7rem" }} />
                      </div>

                      <div className="col-md-3">
                        <Field
                          name={`items.${index}.quantity`}
                          type="number"
                          placeholder="Quantity"
                          className={`form-control form-control-sm bg-transparent text-reset 
                            ${itemErrors?.quantity && itemTouched?.quantity ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name={`items.${index}.quantity`} 
                        component="div" 
                        className="invalid-feedback" 
                        style={{ fontSize: "0.7rem" }} />
                      </div>

                      <div className="col-md-3">
                        <Field
                          name={`items.${index}.unit_price`}
                          type="number"
                          step="0.01"
                          placeholder="Unit Price"
                          className={`form-control form-control-sm bg-transparent text-reset 
                            ${itemErrors?.unit_price && itemTouched?.unit_price ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name={`items.${index}.unit_price`} 
                        component="div" 
                        className="invalid-feedback" 
                        style={{ fontSize: "0.7rem" }} />
                      </div>

                      <div className="col-md-2">
                        {values.items.length > 1 && (
                          <button type="button" className="btn btn-sm btn-outline-danger w-100" 
                          onClick={() => remove(index)}>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  className="btn btn-sm btn-secondary mt-2"
                  onClick={() => push({ product_id: "", quantity: 1, unit_price: 10.0 })}
                >
                  + Append Item Vector
                </button>
              </div>
            )}
          </FieldArray>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-4 d-flex justify-content-center align-items-center"
            disabled={isSubmitting}
            style={{ backgroundColor: "#4F46E5", border: "none" }}
          >
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : (
              "Execute Sequence Dispatch"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};