import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../../components/input/Input";
import { sendCodeSchema } from "../../../validation/auth";

function SendCode() {
  const navigate = useNavigate();
  const onSubmit = async ({ email }) => {
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, { email });
    navigate("/forgotPassword");
  };
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: sendCodeSchema,
    onSubmit,
    validateOnMount: true,
  });
  let inputs = [
    { id: "email", name: "email", type: "email", title: "Email", value: formik.values.email },
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
        Send code
      </button>
    </form>
  );
}

export default SendCode;
