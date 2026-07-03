import * as Yup from "yup";

// isEdit is passed in so the PIN can be optional when editing an existing
// customer (leave blank to keep their current PIN).
export function getCustomerSchema(isEdit = false) {
  return Yup.object({
    full_name: Yup.string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name is too long")
      .required("Full name is required"),

    email_address: Yup.string()
      .trim()
      .email("Enter a valid email address")
      .required("Email is required"),

    password: isEdit
      ? Yup.string().matches(/^\d{4}$/, "PIN must be exactly 4 digits")
      : Yup.string()
          .matches(/^\d{4}$/, "PIN must be exactly 4 digits")
          .required("PIN is required"),
  });
}

export const customerInitialValues = {
  full_name: "",
  email_address: "",
  password: "",
};
