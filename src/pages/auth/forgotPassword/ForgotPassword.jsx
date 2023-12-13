import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import { forgotPasswordSchema } from "../../../validation/auth";
function ForgotPassword() {
  const navigate = useNavigate();
  const onSubmit = async (user) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, user);
      navigate("/signin");
    } catch (error) {}
  };
  const initialValues = {
    email: "",
    password: "",
    code: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit,
    validateOnMount: true,
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
          errorsDisplay={true}
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
