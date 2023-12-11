import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../../components/input/Input";

function SendCode() {
  const navigate = useNavigate();
  let emailSchema = () => {
    return yup.object({
      email: yup.string().required("email is required").email(),
    });
  };
  const onSubmit = async ({ email }) => {
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, { email });
    navigate("/forgotPassword");
  };
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit,
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
