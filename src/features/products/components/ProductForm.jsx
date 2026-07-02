import { Formik, Form, Field, ErrorMessage } from "formik";
import { productSchema, productInitialValues } from "../validation/productSchema";
import { useCreateProduct, useUpdateProduct } from "../hooks/useProductMutations";
import Modal from "../../../shared/components/common/Modal";

function ProductForm({ isOpen, onClose, product }) {
  const isEditMode = Boolean(product);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const initialValues = isEditMode
    ? {
        product_name: product.product_name,
        unit_price: product.unit_price,
        colour: product.colour,
        brand: product.brand,
        size: product.size,
        rating: product.rating,
      }
    : productInitialValues;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditMode) {
        await updateProduct.mutateAsync({ ...values, product_id: product.product_id });
      } else {
        await createProduct.mutateAsync(values);
      }
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Product" : "Add Product"}>
      <Formik
        initialValues={initialValues}
        validationSchema={productSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="d-flex flex-column gap-3">
            <div>
              <label className="form-label small" htmlFor="product_name">
                Name
              </label>
              <Field
                id="product_name"
                name="product_name"
                type="text"
                className="form-control"
              />
              <ErrorMessage
                name="product_name"
                component="div"
                className="text-danger small mt-1"
              />
            </div>

            <div>
              <label className="form-label small" htmlFor="unit_price">
                Unit price
              </label>
              <Field
                id="unit_price"
                name="unit_price"
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="unit_price"
                component="div"
                className="text-danger small mt-1"
              />
            </div>

            <div className="row g-3">
              <div className="col">
                <label className="form-label small" htmlFor="colour">
                  Colour
                </label>
                <Field id="colour" name="colour" type="text" className="form-control" />
                <ErrorMessage
                  name="colour"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>
              <div className="col">
                <label className="form-label small" htmlFor="brand">
                  Brand
                </label>
                <Field id="brand" name="brand" type="text" className="form-control" />
                <ErrorMessage
                  name="brand"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>
            </div>

            <div className="row g-3">
              <div className="col">
                <label className="form-label small" htmlFor="size">
                  Size
                </label>
                <Field id="size" name="size" type="text" className="form-control" />
                <ErrorMessage
                  name="size"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>
              <div className="col">
                <label className="form-label small" htmlFor="rating">
                  Rating
                </label>
                <Field
                  id="rating"
                  name="rating"
                  as="select"
                  className="form-select"
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 pt-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "var(--brand-accent)", color: "#fff" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : isEditMode ? (
                  "Save"
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default ProductForm;