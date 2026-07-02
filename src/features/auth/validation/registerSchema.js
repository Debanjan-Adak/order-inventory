import * as Yup from "yup";

const registerSchema = Yup.object({
  fullName: Yup.string().required("This field is required."),
  email: Yup.string().email("Enter a valid email address.").required("This field is required."),
  password: Yup.string().min(4, "Password must be at least 4 characters.").required("This field is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match.")
    .required("This field is required.")
});

export default registerSchema;