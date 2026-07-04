// for structure
import * as Yup from "yup";

export const productSchema = Yup.object({
  product_name: Yup.string().trim().required("This field is required."),
  unit_price: Yup.number()
    .typeError("This field is required.")
    .moreThan(0, "Price must be greater than 0.")
    .required("This field is required."),
  colour: Yup.string().trim().required("This field is required."),
  brand: Yup.string().trim().required("This field is required."),
  size: Yup.string().trim().required("This field is required."),
  rating: Yup.number()
    .typeError("This field is required.")
    .min(1, "This field is required.")
    .max(5, "This field is required.")
    .required("This field is required."),
});

export const productInitialValues = {
  product_name: "",
  unit_price: "",
  colour: "",
  brand: "",
  size: "",
  rating: "",
};