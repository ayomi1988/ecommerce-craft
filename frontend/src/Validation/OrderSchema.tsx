import * as yup from "yup";

const ValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("Required Field"),
  email: yup.string().email("Invalid Email").required("Required Field"),
  order_number: yup
    .string()
    .required("Required Field"),
  price: yup
    .string()
    .required("Required Field"),
  product_name: yup
    .string()
    .required("Required Field"),
  quantity: yup
    .string()
    .required("Required Field"),
  total: yup
    .string(),
 

});

export default ValidationSchema;
