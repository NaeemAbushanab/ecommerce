import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/Cart";
import axios from "axios";
import { useFormik } from "formik";
import { signinSchema } from "../../../validation/auth";
import { UserContext } from "../../../context/User";
import Input from "../../../components/input/Input";
import { ErrorToast, SuccessToast, WarningToast } from "../../../components/toast/Toast";

function Login() {
  const navigate = useNavigate();
  const { notifyUserContext } = useContext(UserContext);
  const { notifyCartContext } = useContext(CartContext);
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (user) => {
    await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signin`, user)
      .catch((error) => {
        ErrorToast(error.response.data.message);
      })
      .then(({ data }) => {
        if (data.message == "success") {
          localStorage.setItem("userToken", data.token);
          notifyUserContext(data.token);
          notifyCartContext(data.token);
          SuccessToast("log in sucessfully");
          navigate("/");
        }
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: signinSchema,
  });
  const inputs = [
    { id: "email", name: "email", type: "email", title: "Email", value: formik.values.email },
    {
      id: "password",
      name: "password",
      type: "password",
      title: "Password",
      value: formik.values.password,
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
    <div className="my-4">
      <h2>Sign in</h2>
      <form className="form" onSubmit={formik.handleSubmit}>
        {renderInput()}
        <div className="text-center">
          <button type="submit" className="form-control btn btn-primary" disabled={!formik.isValid}>
            Sign in
          </button>
        </div>
      </form>
      <div className="d-flex mt-4 column-gap-5">
        <div>
          <Link to={"/sendCode"} className="text-reset">
            Forgot password?
          </Link>
        </div>
        <div>
          <Link to={"/register"} className="text-reset">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
