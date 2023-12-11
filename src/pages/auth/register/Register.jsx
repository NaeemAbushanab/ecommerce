import axios from "axios";
import React from "react";
import { useFormik } from "formik";
import { registerSchema } from "../../../validation/auth";
import Input from "../../../components/input/Input";
import { ErrorToast, SuccessToast, WarningToast } from "../../../components/toast/Toast";

function Register() {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    image: "",
  };

  const onSubmit = (user) => {
    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image);
    axios
      .post(`https://ecommerce-node4.vercel.app/auth/signup`, formData)
      .then(({ data }) => {
        if (data.message == "success") {
          SuccessToast(`${data.message}, please go to your email to confirm`);
        } else {
          WarningToast(data.message);
        }
      })
      .catch((error) => {
        ErrorToast(error.response.data.message);
      });
  };
  const handleImagePath = (e) => {
    formik.setFieldValue("image", e.target.files[0]);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: registerSchema,
  });
  const inputs = [
    {
      id: "userName",
      name: "userName",
      type: "text",
      title: "User name",
      value: formik.values.userName,
    },
    { id: "email", name: "email", type: "email", title: "Email", value: formik.values.email },
    {
      id: "password",
      name: "password",
      type: "password",
      title: "Password",
      value: formik.values.password,
    },
    {
      id: "image",
      name: "image",
      type: "file",
      title: "Profile Image",
      onChange: handleImagePath,
    },
  ];
  const renderInput = () =>
    inputs.map((input, index) => {
      return (
        <Input
          key={index}
          {...input}
          onChange={input.onChange || formik.handleChange}
          errors={formik.errors}
          onBlur={formik.handleBlur}
          touched={formik.touched}
        />
      );
    });

  return (
    <div className="my-4">
      <h2>Create account</h2>
      <form className="form" onSubmit={formik.handleSubmit} encType="mltipart/form-data">
        {renderInput()}
        <div className="text-center">
          <button type="submit" className="form-control btn btn-primary" disabled={!formik.isValid}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
