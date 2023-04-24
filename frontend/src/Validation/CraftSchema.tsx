import * as yup from "yup";

const ValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(6, "should be 6 characters")
    .max(10, "should be 10 characters")
    .required("Required Field"),
  last_name: yup
    .string()
    .min(6, "should be 6 characters")
    .max(10, "should be 10 characters")
    .required("Required Field"),
  email: yup.string().email("Invalid Email").required("Required Field"),
  number: yup
    .string()
    .required("Required Field")
    .matches(
      /^(?:\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/,
      "Invalid phone number"
    ),
});

export default ValidationSchema;
