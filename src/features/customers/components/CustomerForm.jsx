import { Formik, Form, Field, ErrorMessage } from "formik";
import { getCustomerSchema, customerInitialValues } from "../validation/customerSchema";
import "./CustomerForm.css";

// initialValues: pass an existing customer to edit, or omit to create.
// onSubmit(values, formikHelpers) and onCancel() are provided by the page.
function CustomerForm({ initialValues, onSubmit, onCancel, isSubmitting }) {
  const isEdit = Boolean(initialValues);

  const startingValues = isEdit
    ? {
        full_name: initialValues.full_name,
        email_address: initialValues.email_address,
        password: "",
      }
    : customerInitialValues;

  return (
    <Formik
      initialValues={startingValues}
      validationSchema={getCustomerSchema(isEdit)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isValid, dirty }) => (
        <Form className="customer-form" noValidate>
          <div className="mb-3">
            <label htmlFor="full_name" className="form-label">
              Full name
            </label>
            <Field
              id="full_name"
              name="full_name"
              type="text"
              className="form-control"
              placeholder="e.g. Tammy Bryant"
            />
            <ErrorMessage name="full_name" component="div" className="invalid-feedback-text" />
          </div>

          <div className="mb-3">
            <label htmlFor="email_address" className="form-label">
              Email
            </label>
            <Field
              id="email_address"
              name="email_address"
              type="email"
              className="form-control"
              placeholder="name@example.com"
            />
            <ErrorMessage
              name="email_address"
              component="div"
              className="invalid-feedback-text"
            />
          </div>

          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              {isEdit ? "PIN (leave blank to keep current)" : "PIN"}
            </label>
            <Field
              id="password"
              name="password"
              type="text"
              inputMode="numeric"
              maxLength={4}
              className="form-control customer-form-pin"
              placeholder="4-digit PIN"
            />
            <ErrorMessage name="password" component="div" className="invalid-feedback-text" />
          </div>

          <div className="customer-form-actions">
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || !dirty || isSubmitting}
            >
              {isSubmitting ? "Saving..." : isEdit ? "Save changes" : "Add customer"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CustomerForm;
