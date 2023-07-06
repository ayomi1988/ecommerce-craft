import * as yup from "yup";

const ValidationSchema = yup.object().shape({
 user_name: yup
    .string(),
  password: yup
    .string()
    .required("Required Field"),
});

export default ValidationSchema;
