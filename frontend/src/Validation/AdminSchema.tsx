import * as yup from "yup";

const ValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(6, "should be 5 characters")
    .max(10, "should be 10 characters")
    .required("Required Field"),
    user_name: yup
    .string()
    .required("Required Field"),
  email: yup.string().email("Invalid Email").required("Required Field"),
  password: yup
    .string()
    .required("Required Field")
});

export default ValidationSchema;
