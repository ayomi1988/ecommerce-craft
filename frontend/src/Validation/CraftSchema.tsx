import * as yup from "yup";

const ValidationSchema = yup.object().shape({
  product_name: yup
    .string()
    .required("Required Field"),
  price: yup
    .string()
    .required("Required Field"),
  quantity: yup
    .string()
    .required("Required Field"),
  description: yup
    .string()
    .required("Required Field"), 
});

export default ValidationSchema;
