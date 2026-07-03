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

export const OrderForm = ({ onSubmit, isSubmitting }) => {

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
      {({ values }) => (
        <Form>
          <div>
            <label>Customer Node Reference</label>
            <Field name="customer_id" placeholder="E.g. 45" />
            <ErrorMessage name="customer_id" component="div" />
          </div>

          <div>
            <label>Target Inventory Warehouse Node</label>
            <Field name="store_id" placeholder="E.g. 1" />
            <ErrorMessage name="store_id" component="div" />
          </div>

          <h3>Allocation Line Items</h3>
          <ErrorMessage name="items" component="div" />

          <FieldArray name="items">
            {({ push, remove }) => (
              <div>
                {values.items.map((_, index) => (
                  <div key={index}>
                    <Field name={`items.${index}.product_id`} placeholder="Product SKU ID" />
                    <ErrorMessage name={`items.${index}.product_id`} component="div" />

                    <Field name={`items.${index}.quantity`} type="number" placeholder="Quantity" />
                    <ErrorMessage name={`items.${index}.quantity`} component="div" />

                    <Field name={`items.${index}.unit_price`} type="number" step="0.01" placeholder="Unit Price" />
                    <ErrorMessage name={`items.${index}.unit_price`} component="div" />

                    {values.items.length > 1 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => push({ product_id: "", quantity: 1, unit_price: 10.0 })}
                >
                  + Append Item Vector
                </button>
              </div>
            )}
          </FieldArray>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Execute Sequence Dispatch"}
          </button>
        </Form>
      )}
    </Formik>
  );
};