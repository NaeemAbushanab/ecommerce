import * as yup from "yup";
let registerSchema = () => {
  return yup.object({
    userName: yup
      .string()
      .required("userName is required")
      .min(3, "must be at least 3 char")
      .max(30, "max is 30 char"),

    email: yup.string().required("email is required").email(),
    password: yup
      .string()
      .required("password is required")
      .min(3, "must be at least 3 char")
      .max(30, "max is 30 char"),
  });
};
let loginSchema = () => {
  return yup.object({
    email: yup.string().required("email is required").email("invalid email"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "must be at least 6 char")
      .max(30, "max is 30 char"),
  });
};
let sendCodeSchema = () => {
  return yup.object({
    email: yup.string().required("email is required").email(),
  });
};
let forgotPasswordSchema = () => {
  return yup.object({
    email: yup.string().required("email is required").email(),
    password: yup
      .string()
      .required("password is required")
      .min(3, "must be at least 3 char")
      .max(30, "max is 30 char"),
    code: yup.string().required("code is required").length(4, "must be 4 char"),
  });
};
export { registerSchema, loginSchema, sendCodeSchema, forgotPasswordSchema };
