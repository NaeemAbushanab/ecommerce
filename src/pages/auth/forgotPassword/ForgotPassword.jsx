import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";

function ForgotPassword() {
  const navigate = useNavigate();
  let emailSchema = () => {
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
  const onSubmit = async (user) => {
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, user);
    navigate("/signin");
  };
  const initialValues = {
    email: "",
    password: "",
    code: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: emailSchema,
    onSubmit,
  });
  let inputs = [
    { id: "email", name: "email", type: "email", title: "Email", value: formik.values.email },
    {
      id: "password",
      name: "password",
      type: "password",
      title: "Password",
      value: formik.values.password,
    },
    {
      id: "code",
      name: "code",
      type: "text",
      title: "Code",
      value: formik.values.code,
    },
  ];
  const renderInput = () =>
    inputs.map((input, index) => {
      return (
        <Input
          key={index}
          {...input}
          onChange={formik.handleChange}
          errors={formik.errors}
          onBlur={formik.handleBlur}
          touched={formik.touched}
        />
      );
    });

  return (
    <form onSubmit={formik.handleSubmit}>
      {renderInput()}
      <button type="submit" className=" btn btn-primary" disabled={!formik.isValid}>
        Change password
      </button>
    </form>
  );
}

export default ForgotPassword;
